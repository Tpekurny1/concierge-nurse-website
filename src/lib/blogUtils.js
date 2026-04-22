// ── Slug generation ─────────────────────────────────────────
export function slugify(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ── Reading time estimate ───────────────────────────────────
// 225 words per minute is the average adult reading speed.
export function computeReadingTime(textOrHtml) {
  const text = (textOrHtml || '').replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

// ── Excerpt from content ────────────────────────────────────
// If the editor didn't write one, derive a 180-character excerpt
// from the first paragraph of rendered HTML.
export function deriveExcerpt(html) {
  if (!html) return '';
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= 180) return text;
  return text.slice(0, 177).replace(/\s\S*$/, '') + '...';
}

// ── Tag → Resource page mapping ─────────────────────────────
// When a blog post is tagged with one of these, we show a
// "Learn more" link at the bottom to the matching resource page.
// Keys are normalized (lowercase, kebab-case).
export const TAG_TO_RESOURCE = {
  'post-op-recovery': {
    label: 'Post-Op Recovery Concierge Nursing',
    path: '/resources/niches/post-op-recovery-nursing-business',
  },
  'postpartum': {
    label: 'Postpartum Concierge Nursing',
    path: '/resources/niches/postpartum-concierge-nursing-business',
  },
  'geriatric': {
    label: 'Geriatric Concierge Nursing',
    path: '/resources/niches/geriatric-concierge-nursing-business',
  },
  'iv-therapy': {
    label: 'IV Therapy Nursing Business',
    path: '/resources/niches/iv-therapy-nursing-business',
  },
  'pricing': {
    label: 'Concierge Nurse Pricing Guide',
    path: '/resources/concierge-nurse-pricing-guide',
  },
  'hipaa': {
    label: 'HIPAA Compliance for Concierge Nurses',
    path: '/resources/hipaa-compliance-for-concierge-nurses',
  },
  'business-plan': {
    label: 'Concierge Nurse Business Plan',
    path: '/resources/concierge-nurse-business-plan',
  },
  'marketing': {
    label: 'Concierge Nursing Business Marketing',
    path: '/resources/marketing/concierge-nursing-business-marketing',
  },
  'client-acquisition': {
    label: 'How to Get Concierge Nursing Clients',
    path: '/resources/how-to-get-concierge-nursing-clients',
  },
  'startup-costs': {
    label: 'Concierge Nursing Startup Costs',
    path: '/resources/concierge-nursing-startup-costs',
  },
};

export function getResourceForTag(tag) {
  const key = slugify(tag || '');
  return TAG_TO_RESOURCE[key] || null;
}

// ── Sign-off resolution ─────────────────────────────────────
// Given a post + blog_settings, return the effective sign-off object.
export function resolveSignoff(post, settings) {
  if (!post) return null;
  if (!post.use_default_signoff) {
    return {
      closing_line: post.signoff_closing_line || '',
      name: post.signoff_name || '',
      title: post.signoff_title || '',
      photo_url: post.signoff_photo_url || '',
    };
  }
  return {
    closing_line: settings?.signoff_closing_line || '',
    name: settings?.signoff_name || '',
    title: settings?.signoff_title || '',
    photo_url: settings?.signoff_photo_url || '',
  };
}

// ── Supabase Storage helper ─────────────────────────────────
// Returns the public URL of an uploaded blog image.
export async function uploadBlogImage(supabase, file) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from('blog-images')
    .upload(safeName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from('blog-images').getPublicUrl(safeName);
  return data.publicUrl;
}
