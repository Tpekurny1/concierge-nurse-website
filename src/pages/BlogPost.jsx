import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Tag as TagIcon, ArrowRight, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import BlogSignoff from '../components/BlogSignoff';
import BlogShareButtons from '../components/BlogShareButtons';
import BlogStickyCTA from '../components/BlogStickyCTA';
import BlogCommentForm from '../components/BlogCommentForm';
import BlogCommentsList from '../components/BlogCommentsList';
import { supabase } from '../lib/supabase';
import { resolveSignoff, getResourceForTag } from '../lib/blogUtils';

const SITE_URL = 'https://www.conciergenursesociety.com';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState(null);
  const [related, setRelated] = useState([]);
  const [commentsKey, setCommentsKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setNotFound(false);

      const { data: postData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (!postData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPost(postData);

      const [{ data: catData }, { data: settingsData }] = await Promise.all([
        supabase
          .from('blog_post_categories')
          .select('blog_categories(id, name, slug)')
          .eq('post_id', postData.id),
        supabase.from('blog_settings').select('*').eq('id', 1).maybeSingle(),
      ]);
      setCategories((catData || []).map((r) => r.blog_categories).filter(Boolean));
      setSettings(settingsData);

      // Related posts by shared tags
      if (postData.tags && postData.tags.length > 0) {
        const { data: relatedData } = await supabase
          .from('blog_posts')
          .select('id, slug, title, excerpt, cover_image_url, published_at, reading_time_minutes')
          .eq('status', 'published')
          .neq('id', postData.id)
          .overlaps('tags', postData.tags)
          .limit(3);
        setRelated(relatedData || []);
      }

      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <section className="bg-cream min-h-[60vh] flex items-center">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="section-label mb-4">Not Found</p>
          <h1 className="font-heading text-3xl font-bold text-navy mb-4">This post doesn't exist</h1>
          <p className="text-slate mb-8">It may have been removed or the URL is wrong.</p>
          <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={14} /> Back to the blog
          </Link>
        </div>
      </section>
    );
  }

  const signoff = resolveSignoff(post, settings);
  const fullUrl = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo_description || post.excerpt,
    image: post.cover_image_url ? [post.cover_image_url] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { '@type': 'Person', name: signoff?.name || 'Tracy Pekurny' },
    publisher: {
      '@type': 'Organization',
      name: 'Concierge Nurse Business Society',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-default.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
  };

  // Tag → resource mapping
  const resourceLinks = (post.tags || [])
    .map((t) => getResourceForTag(t))
    .filter(Boolean)
    .filter((r, i, arr) => arr.findIndex((x) => x.path === r.path) === i);

  return (
    <>
      <SEO
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt || `Read ${post.title} on the Concierge Nurse Business Society blog.`}
        canonical={`/blog/${post.slug}`}
        type="article"
        image={post.cover_image_url || '/og-default.jpg'}
        schema={articleSchema}
      />

      {/* Cover image */}
      {post.cover_image_url && (
        <div className="w-full aspect-[16/7] bg-cream overflow-hidden">
          <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Header */}
      <header className="pt-16 pb-10 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-navy no-underline mb-8">
            <ArrowLeft size={14} /> All posts
          </Link>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/blog/category/${c.slug}`}
                  className="text-[0.65rem] uppercase tracking-[0.2em] text-gold hover:text-navy no-underline"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}

          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-navy leading-[1.1] mb-5">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-slate text-xl italic mb-6 leading-snug">{post.subtitle}</p>
          )}
          <div className="flex items-center gap-5 text-xs text-charcoal/50">
            <span>{new Date(post.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.reading_time_minutes} min read</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />

          {/* Sign-off */}
          <BlogSignoff signoff={signoff} />

          {/* Related resource pages (tag-based) */}
          {resourceLinks.length > 0 && (
            <div className="mt-12 bg-cream/50 border border-cream-dark p-6">
              <p className="section-label mb-3">Learn more</p>
              <div className="space-y-2">
                {resourceLinks.map((r) => (
                  <Link
                    key={r.path}
                    to={r.path}
                    className="flex items-center gap-2 text-navy hover:text-gold no-underline text-sm font-semibold"
                  >
                    <TagIcon size={12} className="text-gold" /> {r.label} <ArrowRight size={12} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share buttons */}
          <BlogShareButtons title={post.title} url={fullUrl} />
        </div>
      </article>

      {/* Newsletter CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h3 className="font-heading text-2xl font-bold text-white mb-3">Want more like this?</h3>
          <p className="text-white/60 text-base mb-8 max-w-lg mx-auto">
            Get Tracy's writing in your inbox. No fluff, no spam — just the frameworks and real-business thinking that actually moves the needle.
          </p>
          <NewsletterInline />
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <p className="section-label mb-4">Keep Reading</p>
            <h3 className="font-heading text-2xl font-bold text-navy mb-8">Related posts</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="bg-white border border-cream-dark no-underline group">
                  {r.cover_image_url && (
                    <div className="aspect-[16/10] bg-cream overflow-hidden">
                      <img src={r.cover_image_url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="font-heading text-base font-bold text-navy group-hover:text-gold transition-colors leading-tight mb-2">
                      {r.title}
                    </h4>
                    {r.excerpt && <p className="text-xs text-charcoal/60 line-clamp-3">{r.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comments */}
      <section className="py-16 bg-white border-t border-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <BlogCommentsList postId={post.id} refreshKey={commentsKey} />
          <BlogCommentForm postId={post.id} onSubmitted={() => setCommentsKey((k) => k + 1)} />
        </div>
      </section>

      {/* Sticky newsletter bar */}
      <BlogStickyCTA />
    </>
  );
}

function NewsletterInline() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const { submitSubscribe } = await import('../lib/api');
      await submitSubscribe({ email, source: 'blog_inline' });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <p className="text-gold text-lg font-semibold">Welcome — you're in.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 bg-white/10 border border-white/30 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="px-6 py-3 bg-gold text-navy text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? '...' : 'Subscribe'}
      </button>
    </form>
  );
}
