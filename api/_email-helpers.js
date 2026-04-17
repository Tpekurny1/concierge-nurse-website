// Shared email-building helpers. Prefixed with `_` so Vercel treats it as
// private (not exposed as a route).

const SITE_ORIGIN = process.env.PUBLIC_SITE_ORIGIN || 'https://www.conciergenursesociety.com';

export function personalizeText(text, contact) {
  if (!text) return '';
  return String(text)
    .replace(/\{firstName\}/g, contact.first_name || 'there')
    .replace(/\{lastName\}/g, contact.last_name || '')
    .replace(/\{email\}/g, contact.email || '');
}

export function buildCampaignEmailHtml({ body, contact, campaignId, recipientId }) {
  const personalized = personalizeText(body || '', contact);
  const withTrackedLinks = wrapLinksForTracking(personalized, { recipientId });
  const withFooter = withTrackedLinks + unsubscribeFooter({ contactId: contact.id, campaignId });
  const pixel = `<img src="${SITE_ORIGIN}/api/track/open?rid=${recipientId}" width="1" height="1" alt="" style="display:none;border:0;" />`;
  return withFooter + pixel;
}

export function buildSequenceEmailHtml({ body, contact, sequenceId }) {
  const personalized = personalizeText(body || '', contact);
  // Sequence emails don't have a campaign_recipients row, so no pixel/click tracking
  // through the campaign_stats path. We still attach the unsubscribe footer.
  return personalized + unsubscribeFooter({ contactId: contact.id, sequenceId });
}

export function unsubscribeFooter({ contactId, campaignId, sequenceId }) {
  const params = [`id=${contactId}`];
  if (campaignId) params.push(`campaign=${campaignId}`);
  if (sequenceId) params.push(`sequence=${sequenceId}`);
  const url = `${SITE_ORIGIN}/api/unsubscribe?${params.join('&')}`;
  return `<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center;">
  <p style="color: #999; font-size: 12px; line-height: 1.5;">
    Concierge Nurse Business Society<br>
    <a href="${url}" data-skip-tracking="1" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</div>`;
}

export function wrapLinksForTracking(html, { recipientId }) {
  if (!html || !recipientId) return html || '';
  return html.replace(/<a\b([^>]*?)href=(["'])([^"']+)\2([^>]*)>/gi, (match, pre, quote, url, post) => {
    if (/data-skip-tracking=/i.test(pre + post)) return match;
    if (/^(mailto:|tel:|#)/i.test(url)) return match;
    if (url.includes('/api/unsubscribe') || url.includes('/api/track/')) return match;
    const wrapped = `${SITE_ORIGIN}/api/track/click?rid=${recipientId}&url=${encodeURIComponent(url)}`;
    return `<a${pre}href=${quote}${wrapped}${quote}${post}>`;
  });
}
