// Shared brand-email template. Pure JS — no Node or browser APIs — so it can
// be imported from both Vercel serverless functions (api/) and the admin UI.

export const DEFAULT_BRAND = {
  business_name: 'Concierge Nurse Business Society',
  logo_url: null,
  photo_url: null,
  from_name: 'Concierge Nurse Business Society',
  from_email: 'info@conciergenursesociety.com',
  brand_color: '#C9A84C',
  footer_text: 'Concierge Nurse Business Society',
  website_url: 'https://www.conciergenursesociety.com',
  social_facebook: null,
  social_instagram: null,
  social_linkedin: null,
};

export function mergeBrand(brand) {
  return { ...DEFAULT_BRAND, ...(brand || {}) };
}

export function wrapInBrandTemplate({ body, brand, unsubscribeUrl }) {
  const b = mergeBrand(brand);
  const gold = b.brand_color || '#C9A84C';
  const navy = '#0A1628';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(b.business_name)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F3EF;font-family:Georgia,'Times New Roman',serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<!-- Outer wrapper -->
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F5F3EF;">
<tr><td style="padding:32px 16px;">

<!-- Main card -->
<table role="presentation" cellpadding="0" cellspacing="0" width="600" align="center" style="max-width:600px;width:100%;background-color:#FFFFFF;border-collapse:collapse;">

  <!-- Top accent bar -->
  <tr>
    <td style="height:4px;background:linear-gradient(90deg, ${escapeAttr(navy)}, ${escapeAttr(gold)}, ${escapeAttr(navy)});font-size:0;line-height:0;">&nbsp;</td>
  </tr>

  <!-- Header -->
  <tr>
    <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid #F0EBE1;">
      ${b.logo_url
        ? `<img src="${escapeAttr(b.logo_url)}" alt="${escapeAttr(b.business_name)}" style="max-height:50px;max-width:220px;display:inline-block;border:0;" />`
        : `<h1 style="margin:0;font-size:22px;font-weight:700;color:${escapeAttr(navy)};letter-spacing:0.5px;">${escapeHtml(b.business_name)}</h1>`
      }
    </td>
  </tr>

  <!-- Body content -->
  <tr>
    <td style="padding:36px 40px 40px;font-size:16px;line-height:1.65;color:#333333;">
      ${body || ''}
    </td>
  </tr>

  <!-- Signature block -->
  <tr>
    <td style="padding:0 40px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #F0EBE1;padding-top:24px;border-collapse:collapse;">
        <tr>
          ${b.photo_url
            ? `<td style="width:64px;vertical-align:top;padding-top:24px;padding-right:16px;">
                <img src="${escapeAttr(b.photo_url)}" width="56" height="56" alt="" style="border-radius:50%;display:block;border:2px solid ${escapeAttr(gold)};" />
              </td>`
            : ''
          }
          <td style="vertical-align:top;padding-top:24px;">
            <p style="margin:0;font-size:15px;font-weight:700;color:${escapeAttr(navy)};">${escapeHtml(b.from_name || b.business_name)}</p>
            <p style="margin:3px 0 0;font-size:13px;color:#6B7280;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(b.footer_text)}</p>
            ${b.website_url
              ? `<p style="margin:3px 0 0;font-size:12px;font-family:Arial,Helvetica,sans-serif;">
                  <a href="${escapeAttr(b.website_url)}" data-skip-tracking="1" style="color:${escapeAttr(gold)};text-decoration:none;">${escapeHtml(stripProtocol(b.website_url))}</a>
                </p>`
              : ''
            }
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Bottom accent bar -->
  <tr>
    <td style="height:3px;background-color:${escapeAttr(gold)};font-size:0;line-height:0;">&nbsp;</td>
  </tr>

</table>
<!-- End main card -->

<!-- Footer area (outside card) -->
<table role="presentation" cellpadding="0" cellspacing="0" width="600" align="center" style="max-width:600px;width:100%;border-collapse:collapse;">
  <tr>
    <td style="padding:24px 40px;text-align:center;">

      <!-- Social links -->
      ${buildSocialLinks(b)}

      <!-- Business name -->
      <p style="margin:16px 0 0;font-size:12px;color:#9CA3AF;font-family:Arial,Helvetica,sans-serif;">
        ${escapeHtml(b.business_name)}
      </p>

      ${b.website_url
        ? `<p style="margin:4px 0 0;font-size:12px;font-family:Arial,Helvetica,sans-serif;">
            <a href="${escapeAttr(b.website_url)}" data-skip-tracking="1" style="color:#9CA3AF;text-decoration:none;">${escapeHtml(stripProtocol(b.website_url))}</a>
          </p>`
        : ''
      }

      <!-- Unsubscribe -->
      ${unsubscribeUrl
        ? `<p style="margin:16px 0 0;font-size:11px;">
            <a href="${escapeAttr(unsubscribeUrl)}" data-skip-tracking="1" style="color:#BCBCBC;text-decoration:underline;">Unsubscribe from these emails</a>
          </p>`
        : ''
      }

    </td>
  </tr>
</table>

</td></tr>
</table>
<!-- End outer wrapper -->

</body>
</html>`;
}

function buildSocialLinks(b) {
  const entries = [
    ['Facebook', b.social_facebook, 'FB'],
    ['Instagram', b.social_instagram, 'IG'],
    ['LinkedIn', b.social_linkedin, 'LI'],
  ].filter(([, url]) => !!url);
  if (entries.length === 0) return '';
  const gold = b.brand_color || '#C9A84C';
  const links = entries
    .map(([label, url, abbr]) =>
      `<a href="${escapeAttr(url)}" data-skip-tracking="1" style="display:inline-block;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;background-color:#0A1628;color:${escapeAttr(gold)};font-size:11px;font-weight:700;text-decoration:none;font-family:Arial,Helvetica,sans-serif;margin:0 4px;" title="${label}">${abbr}</a>`
    )
    .join('');
  return `<p style="margin:0;">${links}</p>`;
}

function stripProtocol(url) {
  return String(url || '').replace(/^https?:\/\//i, '').replace(/\/$/, '');
}

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s) {
  return escapeHtml(s);
}
