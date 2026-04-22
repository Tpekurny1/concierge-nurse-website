import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

export default function BlogCategory() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: cat } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!cat) {
        setLoading(false);
        return;
      }

      setCategory(cat);

      const { data: pcData } = await supabase
        .from('blog_post_categories')
        .select('blog_posts!inner(*)')
        .eq('category_id', cat.id);

      const allPosts = (pcData || [])
        .map((r) => r.blog_posts)
        .filter((p) => p && p.status === 'published')
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

      setPosts(allPosts);
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

  if (!category) {
    return (
      <section className="bg-cream min-h-[60vh] flex items-center">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-heading text-2xl font-bold text-navy mb-4">Category not found</h1>
          <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={14} /> Back to the blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title={`${category.name} — Blog — Concierge Nurse Business Society`}
        description={category.description || `Posts tagged ${category.name} on the Concierge Nurse Business Society blog.`}
        canonical={`/blog/category/${category.slug}`}
      />

      <section className="bg-navy pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold no-underline mb-6">
            <ArrowLeft size={14} /> All posts
          </Link>
          <p className="section-label mb-4">Category</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-3">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-white/60 text-lg max-w-2xl">{category.description}</p>
          )}
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {posts.length === 0 ? (
            <p className="text-center text-slate">No posts in this category yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="bg-white border border-cream-dark no-underline group flex flex-col">
                  <div className="aspect-[16/10] bg-cream overflow-hidden">
                    {post.cover_image_url ? (
                      <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-navy to-navy/80" />
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
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
