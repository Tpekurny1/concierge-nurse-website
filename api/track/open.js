import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const PIXEL = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

export default async function handler(req, res) {
  const { rid } = req.query;

  try {
    if (rid) {
      const { data: recipient } = await supabase
        .from('campaign_recipients')
        .select('id, campaign_id, opened_at')
        .eq('id', rid)
        .single();

      if (recipient && !recipient.opened_at) {
        await supabase
          .from('campaign_recipients')
          .update({ opened_at: new Date().toISOString() })
          .eq('id', rid);

        const { data: stats } = await supabase
          .from('campaign_stats')
          .select('opened')
          .eq('campaign_id', recipient.campaign_id)
          .single();

        if (stats) {
          await supabase
            .from('campaign_stats')
            .update({ opened: (stats.opened || 0) + 1 })
            .eq('campaign_id', recipient.campaign_id);
        }
      }
    }
  } catch (err) {
    console.error('Open tracking error:', err);
  }

  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  return res.status(200).send(PIXEL);
}
