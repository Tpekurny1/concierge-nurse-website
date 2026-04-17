import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { personalizeText, buildCampaignEmailHtml } from './_email-helpers.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { campaign_id, retry_failed } = req.body;

  if (!campaign_id) {
    return res.status(400).json({ error: 'campaign_id is required' });
  }

  const { data: campaign, error: campErr } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', campaign_id)
    .single();

  if (campErr || !campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const tagIds = campaign.recipient_tag_ids || [];
  if (tagIds.length === 0) {
    return res.status(400).json({ error: 'No recipient segments selected' });
  }

  const { data: contactTags } = await supabase
    .from('contact_tags')
    .select('contact_id')
    .in('tag_id', tagIds);

  let contactIds = [...new Set((contactTags || []).map((ct) => ct.contact_id))];

  if (retry_failed) {
    const { data: alreadySent } = await supabase
      .from('campaign_recipients')
      .select('contact_id')
      .eq('campaign_id', campaign.id)
      .eq('status', 'sent');
    const sentSet = new Set((alreadySent || []).map((r) => r.contact_id));
    contactIds = contactIds.filter((id) => !sentSet.has(id));
  }

  if (contactIds.length === 0) {
    return res
      .status(400)
      .json({ error: retry_failed ? 'No pending contacts to retry' : 'No contacts in selected segments' });
  }

  const { data: contacts } = await supabase
    .from('contacts')
    .select('id, email, first_name, last_name')
    .in('id', contactIds)
    .not('email', 'is', null)
    .neq('status', 'unsubscribed');

  if (!contacts || contacts.length === 0) {
    return res.status(400).json({ error: 'No valid email addresses found' });
  }

  let sent = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < contacts.length; i += 10) {
    const batch = contacts.slice(i, i + 10);

    const promises = batch.map(async (contact) => {
      try {
        const { data: recipientRow, error: recipientErr } = await supabase
          .from('campaign_recipients')
          .insert({
            campaign_id: campaign.id,
            contact_id: contact.id,
            status: 'sending',
          })
          .select('id')
          .single();

        if (recipientErr || !recipientRow) {
          throw new Error(recipientErr?.message || 'Failed to create recipient row');
        }

        const html = buildCampaignEmailHtml({
          body: campaign.body,
          contact,
          campaignId: campaign.id,
          recipientId: recipientRow.id,
        });

        await resend.emails.send({
          from: `${campaign.from_name} <${campaign.from_email}>`,
          to: contact.email,
          subject: personalizeText(campaign.subject || campaign.name, contact),
          html,
        });

        sent++;

        await supabase
          .from('campaign_recipients')
          .update({ status: 'sent' })
          .eq('id', recipientRow.id);
      } catch (err) {
        failed++;
        errors.push({ email: contact.email, error: err.message });
        await supabase
          .from('campaign_recipients')
          .update({ status: 'failed' })
          .eq('campaign_id', campaign.id)
          .eq('contact_id', contact.id)
          .eq('status', 'sending');
      }
    });

    await Promise.all(promises);
  }

  const { data: existingStats } = await supabase
    .from('campaign_stats')
    .select('*')
    .eq('campaign_id', campaign.id)
    .single();

  if (retry_failed && existingStats) {
    // On retry, original failures were already counted in `bounced`. Successful
    // retries move out of bounced into sent/delivered; remaining failures stay
    // counted from the previous bounced total.
    await supabase
      .from('campaign_stats')
      .update({
        sent: (existingStats.sent || 0) + sent,
        delivered: (existingStats.delivered || 0) + sent,
        bounced: Math.max(0, (existingStats.bounced || 0) - sent),
      })
      .eq('campaign_id', campaign.id);
  } else {
    await supabase
      .from('campaign_stats')
      .update({
        sent,
        delivered: sent,
        bounced: failed,
      })
      .eq('campaign_id', campaign.id);
  }

  if (!retry_failed) {
    await supabase
      .from('campaigns')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
        recipient_count: contacts.length,
      })
      .eq('id', campaign.id);
  }

  const activityRows = contacts.slice(0, sent).map((c) => ({
    contact_id: c.id,
    type: 'campaign_sent',
    description: `Received email campaign: ${campaign.name}`,
    metadata: { campaign_id: campaign.id, campaign_name: campaign.name, retry: !!retry_failed },
  }));

  if (activityRows.length > 0) {
    await supabase.from('activity_log').insert(activityRows);
  }

  return res.status(200).json({
    success: true,
    sent,
    failed,
    total: contacts.length,
    errors: errors.length > 0 ? errors : undefined,
  });
}
