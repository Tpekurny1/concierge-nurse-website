import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const FALLBACK_REDIRECT = 'https://www.conciergenursesociety.com';

export default async function handler(req, res) {
  const { rid, url } = req.query;

  let target = FALLBACK_REDIRECT;
  try {
    if (url) {
      const decoded = decodeURIComponent(url);
      if (/^https?:\/\//i.test(decoded)) {
        target = decoded;
      }
    }
  } catch (err) {
    console.error('Click URL decode error:', err);
  }

  try {
    if (rid) {
      const { data: recipient } = await supabase
        .from('campaign_recipients')
        .select('id, campaign_id, clicked_at')
        .eq('id', rid)
        .single();

      if (recipient && !recipient.clicked_at) {
        await supabase
          .from('campaign_recipients')
          .update({ clicked_at: new Date().toISOString() })
          .eq('id', rid);

        const { data: stats } = await supabase
          .from('campaign_stats')
          .select('clicked')
          .eq('campaign_id', recipient.campaign_id)
          .single();

        if (stats) {
          await supabase
            .from('campaign_stats')
            .update({ clicked: (stats.clicked || 0) + 1 })
            .eq('campaign_id', recipient.campaign_id);
        }
      }
    }
  } catch (err) {
    console.error('Click tracking error:', err);
  }

  res.setHeader('Location', target);
  return res.status(302).end();
}
