import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { id, campaign } = req.query;

  if (!id) {
    return res.status(400).send(renderPage({
      heading: 'Invalid link',
      message: 'This unsubscribe link is missing required information.',
    }));
  }

  try {
    await supabase
      .from('contacts')
      .update({ status: 'unsubscribed', updated_at: new Date().toISOString() })
      .eq('id', id);

    if (campaign) {
      const { data: stats } = await supabase
        .from('campaign_stats')
        .select('unsubscribed')
        .eq('campaign_id', campaign)
        .single();

      if (stats) {
        await supabase
          .from('campaign_stats')
          .update({ unsubscribed: (stats.unsubscribed || 0) + 1 })
          .eq('campaign_id', campaign);
      }
    }

    await supabase.from('activity_log').insert({
      contact_id: id,
      type: 'unsubscribe',
      description: 'Unsubscribed from emails',
      metadata: campaign ? { campaign_id: campaign } : {},
    });
  } catch (err) {
    // Still return the success page — we don't want to leak errors to recipients
    console.error('Unsubscribe error:', err);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(renderPage({
    heading: "You've been unsubscribed",
    message: 'You will no longer receive marketing emails from Concierge Nurse Business Society.',
  }));
}

function renderPage({ heading, message }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Unsubscribed — Concierge Nurse Business Society</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    background: #FAF7F2;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1F2937;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .card {
    background: #fff;
    border: 1px solid #F0EBE1;
    max-width: 480px;
    width: 100%;
    padding: 48px 32px;
    text-align: center;
  }
  h1 {
    color: #0A1628;
    font-family: Georgia, serif;
    font-size: 28px;
    margin: 0 0 16px;
  }
  p {
    color: #4B5563;
    font-size: 15px;
    line-height: 1.6;
    margin: 0 0 32px;
  }
  .divider {
    width: 32px;
    height: 2px;
    background: #C9A84C;
    margin: 0 auto 24px;
  }
  a.link {
    color: #C9A84C;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 600;
  }
  a.link:hover { color: #0A1628; }
</style>
</head>
<body>
  <div class="card">
    <div class="divider"></div>
    <h1>${escapeHtml(heading)}</h1>
    <p>${escapeHtml(message)}</p>
    <a class="link" href="https://www.conciergenursesociety.com">Return to website</a>
  </div>
</body>
</html>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
