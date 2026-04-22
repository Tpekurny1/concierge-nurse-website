import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, FolderOpen, MessageSquare, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const STATUS_META = {
  draft:      { label: 'Draft',      chipClass: 'bg-cream text-charcoal/60 border border-cream-dark' },
  published:  { label: 'Published',  chipClass: 'bg-green-50 text-green-700 border border-green-200' },
  scheduled:  { label: 'Scheduled',  chipClass: 'bg-blue-50 text-blue-700 border border-blue-200' },
  archived:   { label: 'Archived',   chipClass: 'bg-slate-100 text-slate-600 border border-slate-200' },
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [pendingComments, setPendingComments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('updated_at', { ascending: false });

    if (statusFilter !== 'all') query = query.eq('status', statusFilter);
    if (search) query = query.ilike('title', `%${search}%`);

    const { data } = await query;
    setPosts(data || []);

    const { count } = await supabase
      .from('blog_comments')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending');
    setPendingComments(count || 0);

    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id) {
    await supabase.from('blog_post_categories').delete().eq('post_id', id);
    await supabase.from('blog_comments').delete().eq('post_id', id);
    await supabase.from('blog_posts').delete().eq('id', id);
    setDeletingId(null);
    load();
  }

  const countsByStatus = posts.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-navy">Blog</h1>
        <div className="flex items-center gap-3">
          <Link to="/admin/blog/comments" className="btn-navy text-sm flex items-center gap-2 no-underline relative">
            <MessageSquare size={14} /> Comments
            {pendingComments > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-navy text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full">
                {pendingComments}
              </span>
            )}
          </Link>
          <Link to="/admin/blog/categories" className="btn-navy text-sm flex items-center gap-2 no-underline">
            <FolderOpen size={14} /> Categories
          </Link>
          <Link to="/admin/blog/new" className="btn-primary text-sm flex items-center gap-2 no-underline">
            <Plus size={14} /> New Post
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
          <input
            type="text"
            placeholder="Search posts by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold"
        >
          <option value="all">All Statuses</option>
          <option value="draft">Drafts</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Status counts */}
      {statusFilter === 'all' && posts.length > 0 && (
        <div className="flex gap-3 mb-6 text-xs">
          {Object.entries(STATUS_META).map(([key, meta]) => (
            <span key={key} className={`inline-flex items-center gap-2 px-2.5 py-1 ${meta.chipClass}`}>
              {meta.label} · <span className="font-semibold">{countsByStatus[key] || 0}</span>
            </span>
          ))}
        </div>
      )}

      {/* Posts list */}
      <div className="bg-white border border-cream-dark">
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate text-sm">Loading...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-slate text-sm mb-4">No posts yet.</p>
            <Link to="/admin/blog/new" className="btn-primary text-sm inline-flex items-center gap-2 no-underline">
              <Plus size={14} /> Write your first post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-cream-dark">
            {posts.map((post) => {
              const meta = STATUS_META[post.status] || STATUS_META.draft;
              return (
                <div key={post.id} className="px-5 py-4 hover:bg-cream/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase ${meta.chipClass}`}>
                          {meta.label}
                        </span>
                        {post.status === 'scheduled' && post.scheduled_for && (
                          <span className="text-[0.65rem] text-slate">
                            → {new Date(post.scheduled_for).toLocaleString()}
                          </span>
                        )}
                        {post.published_at && post.status === 'published' && (
                          <span className="text-[0.65rem] text-slate">
                            {new Date(post.published_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/admin/blog/${post.id}/edit`}
                        className="font-heading text-base font-bold text-navy hover:text-gold no-underline block"
                      >
                        {post.title || <span className="italic text-slate">Untitled</span>}
                      </Link>
                      {post.excerpt && (
                        <p className="text-slate text-xs mt-1 line-clamp-2">{post.excerpt}</p>
                      )}
                      <p className="text-charcoal/40 text-[0.65rem] mt-1.5">
                        /blog/{post.slug} · updated {new Date(post.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {post.status === 'published' && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-charcoal/60 hover:text-gold transition-colors"
                          title="View live"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <Link
                        to={`/admin/blog/${post.id}/edit`}
                        className="p-2 text-charcoal/60 hover:text-gold transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </Link>
                      {deletingId === post.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-2 py-1 bg-red-600 text-white text-[0.65rem] hover:bg-red-700 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="px-2 py-1 text-charcoal/60 text-[0.65rem] hover:text-charcoal"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(post.id)}
                          className="p-2 text-charcoal/60 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
