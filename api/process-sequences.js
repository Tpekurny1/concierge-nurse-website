import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { personalizeText, buildSequenceEmailHtml } from './_email-helpers.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export default async function handler(req, res) {
  let processed = 0;
  let sent = 0;
  let skipped = 0;
  let completed = 0;
  const errors = [];

  const { data: enrollments, error: enrollErr } = await supabase
    .from('sequence_enrollments')
    .select('*')
    .eq('status', 'active');

  if (enrollErr) {
    return res.status(500).json({ error: enrollErr.message });
  }

  if (!enrollments || enrollments.length === 0) {
    return res.status(200).json({ processed: 0, sent: 0, skipped: 0, completed: 0 });
  }

  const sequenceIds = [...new Set(enrollments.map((e) => e.sequence_id))];
  const contactIds = [...new Set(enrollments.map((e) => e.contact_id))];

  const [{ data: sequences }, { data: sequenceEmails }, { data: contacts }] = await Promise.all([
    supabase.from('sequences').select('*').in('id', sequenceIds),
    supabase.from('sequence_emails').select('*').in('sequence_id', sequenceIds).order('position', { ascending: true }),
    supabase.from('contacts').select('id, email, first_name, last_name, status').in('id', contactIds),
  ]);

  const sequenceMap = new Map((sequences || []).map((s) => [s.id, s]));
  const contactMap = new Map((contacts || []).map((c) => [c.id, c]));
  const emailsBySequence = new Map();
  for (const e of sequenceEmails || []) {
    if (!emailsBySequence.has(e.sequence_id)) emailsBySequence.set(e.sequence_id, []);
    emailsBySequence.get(e.sequence_id).push(e);
  }
  for (const list of emailsBySequence.values()) {
    list.sort((a, b) => a.position - b.position);
  }

  const now = Date.now();

  for (const enrollment of enrollments) {
    processed++;
    const sequence = sequenceMap.get(enrollment.sequence_id);
    const contact = contactMap.get(enrollment.contact_id);
    const emails = emailsBySequence.get(enrollment.sequence_id) || [];

    if (!sequence || !contact || emails.length === 0) {
      skipped++;
      continue;
    }

    if (sequence.status !== 'active') {
      skipped++;
      continue;
    }

    if (contact.status === 'unsubscribed' || !contact.email) {
      skipped++;
      continue;
    }

    // Find the email to send next (by position matching current_position)
    const nextEmail = emails.find((e) => e.position === enrollment.current_position);

    if (!nextEmail) {
      // No more emails at or past this position — mark completed
      await supabase
        .from('sequence_enrollments')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', enrollment.id);
      completed++;
      continue;
    }

    // Determine the reference time for delay
    let referenceTime;
    if (enrollment.current_position === 0) {
      referenceTime = new Date(enrollment.enrolled_at).getTime();
    } else {
      const previousEmail = emails.find((e) => e.position === enrollment.current_position - 1);
      if (!previousEmail) {
        skipped++;
        continue;
      }
      const { data: lastSend } = await supabase
        .from('sequence_sends')
        .select('sent_at')
        .eq('sequence_email_id', previousEmail.id)
        .eq('contact_id', contact.id)
        .maybeSingle();
      if (!lastSend) {
        // Shouldn't happen, but guard anyway
        skipped++;
        continue;
      }
      referenceTime = new Date(lastSend.sent_at).getTime();
    }

    const dueAt = referenceTime + (nextEmail.delay_days || 0) * MS_PER_DAY;
    if (now < dueAt) {
      skipped++;
      continue;
    }

    // Send the email
    try {
      const html = buildSequenceEmailHtml({
        body: nextEmail.body || '',
        contact,
        sequenceId: sequence.id,
      });

      await resend.emails.send({
        from: `${sequence.from_name || 'Concierge Nurse Business Society'} <${sequence.from_email || 'hello@conciergenursesociety.com'}>`,
        to: contact.email,
        subject: personalizeText(nextEmail.subject, contact),
        html,
      });

      // Record the send
      await supabase.from('sequence_sends').insert({
        sequence_email_id: nextEmail.id,
        contact_id: contact.id,
      });

      // Activity log
      await supabase.from('activity_log').insert({
        contact_id: contact.id,
        type: 'sequence_send',
        description: `Received sequence email: ${sequence.name} — ${nextEmail.subject}`,
        metadata: {
          sequence_id: sequence.id,
          sequence_email_id: nextEmail.id,
          position: nextEmail.position,
        },
      });

      // Advance the enrollment
      const newPosition = enrollment.current_position + 1;
      const hasMore = emails.some((e) => e.position === newPosition);
      if (hasMore) {
        await supabase
          .from('sequence_enrollments')
          .update({ current_position: newPosition })
          .eq('id', enrollment.id);
      } else {
        await supabase
          .from('sequence_enrollments')
          .update({ status: 'completed', completed_at: new Date().toISOString(), current_position: newPosition })
          .eq('id', enrollment.id);
        completed++;
      }

      sent++;
    } catch (err) {
      errors.push({ enrollment_id: enrollment.id, error: err.message });
    }
  }

  return res.status(200).json({
    processed,
    sent,
    skipped,
    completed,
    errors: errors.length > 0 ? errors : undefined,
  });
}
