import { supabase } from './supabase';

// ── Shared helpers ──────────────────────────────────────────

function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || null,
    utm_medium: params.get('utm_medium') || null,
    utm_campaign: params.get('utm_campaign') || null,
  };
}

function getMetadata(source) {
  return {
    source,
    page_url: window.location.pathname,
    ...getUTMParams(),
    referrer: document.referrer || null,
  };
}

// Only the fields that exist as columns on the contacts table
function getContactAttribution() {
  return {
    ...getUTMParams(),
    referrer: document.referrer || null,
  };
}

const LIFECYCLE_RANK = {
  Explorer: 1,
  DIYer: 2,
  Builder: 3,
  'Established Owner': 4,
};

function shouldUpgradeLifecycle(current, proposed) {
  return (LIFECYCLE_RANK[proposed] || 0) > (LIFECYCLE_RANK[current] || 0);
}

async function getOrCreateTag(tagName) {
  const { data: existing } = await supabase
    .from('tags')
    .select('id')
    .eq('name', tagName)
    .single();

  if (existing) return existing.id;

  const { data: created } = await supabase
    .from('tags')
    .insert({ name: tagName })
    .select('id')
    .single();

  return created.id;
}

async function assignTag(contactId, tagName) {
  const tagId = await getOrCreateTag(tagName);

  const { data: existing } = await supabase
    .from('contact_tags')
    .select('contact_id')
    .eq('contact_id', contactId)
    .eq('tag_id', tagId)
    .single();

  if (!existing) {
    await supabase.from('contact_tags').insert({ contact_id: contactId, tag_id: tagId });
  }
}

async function addNote(contactId, content) {
  if (!content) return;
  await supabase.from('notes').insert({ contact_id: contactId, content });
}

async function assignPipeline(contactId, pipelineName) {
  // Find pipeline
  const { data: pipeline } = await supabase
    .from('pipelines')
    .select('id, stages')
    .eq('name', pipelineName)
    .single();

  if (!pipeline) return;

  // Check if already in this pipeline
  const { data: existing } = await supabase
    .from('pipeline_contacts')
    .select('id')
    .eq('pipeline_id', pipeline.id)
    .eq('contact_id', contactId)
    .single();

  if (existing) return; // Already in pipeline, don't reset their stage

  const firstStage = pipeline.stages?.[0] || 'New';

  await supabase.from('pipeline_contacts').insert({
    pipeline_id: pipeline.id,
    contact_id: contactId,
    stage: firstStage,
  });
}

async function logActivity(contactId, description, metadata) {
  await supabase.from('activity_log').insert({
    contact_id: contactId,
    type: 'form_submission',
    description,
    metadata,
  });
}

async function findContactByEmail(email) {
  const { data } = await supabase
    .from('contacts')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();
  return data;
}

function parseName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  return {
    first_name: parts[0] || '',
    last_name: parts.slice(1).join(' ') || '',
  };
}

// ── Form submission functions ───────────────────────────────

export async function submitContactForm({ first_name, last_name, email, interest, message }) {
  const meta = getMetadata('contact_form');
  const emailLower = email.toLowerCase();
  const existing = await findContactByEmail(emailLower);

  let contactId;

  if (existing) {
    const updates = { updated_at: new Date().toISOString() };
    if (!existing.first_name && first_name) updates.first_name = first_name;
    if (!existing.last_name && last_name) updates.last_name = last_name;
    if (interest) updates.interest = interest;

    await supabase.from('contacts').update(updates).eq('id', existing.id);
    contactId = existing.id;
  } else {
    const { data, error } = await supabase
      .from('contacts')
      .insert({
        first_name,
        last_name,
        email: emailLower,
        interest,
        status: 'new',
        source: 'form_submission',
        lifecycle_stage: 'Explorer',
        ...getContactAttribution(),
      })
      .select('id')
      .single();

    if (error) throw new Error(error.message);
    contactId = data.id;
  }

  await assignTag(contactId, 'Contact Form Lead');
  await addNote(contactId, message);
  await logActivity(contactId, `Submitted contact form — interest: ${interest}`, meta);
  await assignPipeline(contactId, 'General');

  return { contact_id: contactId, status: existing ? 'updated' : 'created' };
}

export async function submitConsultingInquiry({ full_name, email, business_name, annual_revenue, biggest_challenge }) {
  const meta = getMetadata('consulting_inquiry');
  const emailLower = email.toLowerCase();
  const { first_name, last_name } = parseName(full_name);
  const existing = await findContactByEmail(emailLower);

  let contactId;

  if (existing) {
    const updates = { updated_at: new Date().toISOString() };
    if (!existing.first_name && first_name) updates.first_name = first_name;
    if (!existing.last_name && last_name) updates.last_name = last_name;
    if (!existing.business_name && business_name) updates.business_name = business_name;
    if (!existing.annual_revenue && annual_revenue) updates.annual_revenue = annual_revenue;
    if (shouldUpgradeLifecycle(existing.lifecycle_stage, 'Established Owner')) {
      updates.lifecycle_stage = 'Established Owner';
    }

    await supabase.from('contacts').update(updates).eq('id', existing.id);
    contactId = existing.id;
  } else {
    const { data, error } = await supabase
      .from('contacts')
      .insert({
        first_name,
        last_name,
        email: emailLower,
        business_name: business_name || null,
        annual_revenue: annual_revenue || null,
        status: 'new',
        source: 'form_submission',
        lifecycle_stage: 'Established Owner',
        ...getContactAttribution(),
      })
      .select('id')
      .single();

    if (error) throw new Error(error.message);
    contactId = data.id;
  }

  await assignTag(contactId, 'Consulting Inquiry');
  await addNote(contactId, biggest_challenge);
  await logActivity(contactId, 'Submitted consulting inquiry', meta);
  await assignPipeline(contactId, 'Consulting');

  return { contact_id: contactId, status: existing ? 'updated' : 'created' };
}

export async function submitAcceleratorWaitlist({ full_name, email }) {
  const meta = getMetadata('accelerator_waitlist');
  const emailLower = email.toLowerCase();
  const { first_name, last_name } = parseName(full_name);
  const existing = await findContactByEmail(emailLower);

  let contactId;

  if (existing) {
    const updates = { updated_at: new Date().toISOString() };
    if (!existing.first_name && first_name) updates.first_name = first_name;
    if (!existing.last_name && last_name) updates.last_name = last_name;
    if (shouldUpgradeLifecycle(existing.lifecycle_stage, 'Builder')) {
      updates.lifecycle_stage = 'Builder';
    }

    await supabase.from('contacts').update(updates).eq('id', existing.id);
    contactId = existing.id;
  } else {
    const { data, error } = await supabase
      .from('contacts')
      .insert({
        first_name,
        last_name,
        email: emailLower,
        status: 'new',
        source: 'form_submission',
        lifecycle_stage: 'Builder',
        ...getContactAttribution(),
      })
      .select('id')
      .single();

    if (error) throw new Error(error.message);
    contactId = data.id;
  }

  await assignTag(contactId, 'Accelerator Waitlist');
  await logActivity(contactId, 'Joined accelerator waitlist', meta);
  await assignPipeline(contactId, 'Accelerator');

  return { contact_id: contactId, status: existing ? 'updated' : 'created' };
}

export async function submitSubscribe({ email, first_name, source }) {
  const meta = getMetadata(source);
  const emailLower = email.toLowerCase();
  const existing = await findContactByEmail(emailLower);

  const tagName = source === 'footer_newsletter' ? 'Newsletter Subscriber' : 'Community Signup';

  let contactId;

  if (existing) {
    const updates = { updated_at: new Date().toISOString() };
    if (!existing.first_name && first_name) updates.first_name = first_name;

    await supabase.from('contacts').update(updates).eq('id', existing.id);
    contactId = existing.id;
  } else {
    const { data, error } = await supabase
      .from('contacts')
      .insert({
        first_name: first_name || null,
        email: emailLower,
        status: 'new',
        source: 'form_submission',
        lifecycle_stage: 'Explorer',
        ...getContactAttribution(),
      })
      .select('id')
      .single();

    if (error) throw new Error(error.message);
    contactId = data.id;
  }

  await assignTag(contactId, tagName);
  await logActivity(contactId, `Subscribed via ${source.replace(/_/g, ' ')}`, meta);
  await assignPipeline(contactId, 'General');

  return { contact_id: contactId, status: existing ? 'updated' : 'created' };
}
