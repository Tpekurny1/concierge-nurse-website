import { createClient } from '@supabase/supabase-js';

const SITE_URL = 'https://www.conciergenursesociety.com';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    const { data: categories } = await supabase
      .from('blog_categories')
      .select('slug');

    const now = new Date().toISOString().slice(0, 10);

    const urls = [];

    // Blog index
    urls.push({
      loc: `${SITE_URL}/blog`,
      lastmod: posts && posts[0] ? posts[0].updated_at?.slice(0, 10) : now,
      changefreq: 'weekly',
      priority: '0.9',
    });

    // Individual posts
    (posts || []).forEach((p) => {
      urls.push({
        loc: `${SITE_URL}/blog/${p.slug}`,
        lastmod: (p.updated_at || p.published_at || '').slice(0, 10) || now,
        changefreq: 'monthly',
        priority: '0.8',
      });
    });

    // Category pages
    (categories || []).forEach((c) => {
      urls.push({
        loc: `${SITE_URL}/blog/category/${c.slug}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: '0.7',
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).send(`<!-- error: ${err.message} -->`);
  }
}
