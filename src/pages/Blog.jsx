import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

const PAGE_SIZE = 12;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: postData }, { data: catData }] = await Promise.all([
        supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(PAGE_SIZE),
        supabase.from('blog_categories').select('*').order('name'),
      ]);
      setPosts(postData || []);
      setCategories(catData || []);
      setLoading(false);
    }
    load();
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <SEO
        title="Blog — Concierge Nurse Business Society"
        description="Tracy Pekurny's writing on building and running an independent concierge nursing business — frameworks, strategy, and lessons from the work itself."
        canonical="/blog"
        type="website"
      />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-4">The Blog</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-5">
            Notes from the <span className="text-gold-gradient">Build</span>
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            Frameworks, decisions, and real-business thinking for nurses building independent concierge nursing practices. Written by Tracy, for the lane she helps build.
          </p>
        </div>
      </section>

      {/* Category chips */}
      {categories.length > 0 && (
        <section className="bg-cream border-b border-cream-dark py-5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap gap-2">
            <Link
              to="/blog"
              className="px-3 py-1.5 text-xs uppercase tracking-wider border border-navy text-navy bg-white no-underline hover:bg-navy hover:text-gold transition-colors"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/blog/category/${cat.slug}`}
                className="px-3 py-1.5 text-xs uppercase tracking-wider border border-cream-dark text-charcoal bg-white no-underline hover:bg-navy hover:text-gold hover:border-navy transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {loading ? (
            <p className="text-slate text-sm text-center">Loading…</p>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate text-base">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && <FeaturedCard post={featured} />}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                  {rest.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function FeaturedCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="grid lg:grid-cols-2 gap-10 items-center bg-white border border-cream-dark no-underline group">
      <div className="aspect-[16/10] bg-cream overflow-hidden">
        {post.cover_image_url ? (
          <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center">
            <span className="font-heading text-white/20 text-5xl">CNBS</span>
          </div>
        )}
      </div>
      <div className="p-10">
        <p className="section-label mb-3">Latest</p>
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy mb-4 leading-tight group-hover:text-gold transition-colors">
          {post.title}
        </h2>
        {post.subtitle && <p className="italic text-slate text-lg mb-4">{post.subtitle}</p>}
        {post.excerpt && <p className="text-charcoal/70 text-base leading-relaxed mb-6">{post.excerpt}</p>}
        <div className="flex items-center gap-4 text-xs text-charcoal/50 mb-6">
          <span>{new Date(post.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.reading_time_minutes} min read</span>
        </div>
        <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest">
          Read <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="bg-white border border-cream-dark no-underline group flex flex-col">
      <div className="aspect-[16/10] bg-cream overflow-hidden">
        {post.cover_image_url ? (
          <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center">
            <span className="font-heading text-white/10 text-3xl">CNBS</span>
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-heading text-xl font-bold text-navy mb-2 leading-tight group-hover:text-gold transition-colors">
          {post.title}
        </h3>
        {post.excerpt && <p className="text-charcoal/70 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>}
        <div className="flex items-center gap-3 text-[0.65rem] text-charcoal/50 mt-auto">
          <span>{new Date(post.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Clock size={10} /> {post.reading_time_minutes} min</span>
        </div>
      </div>
    </Link>
  );
}
