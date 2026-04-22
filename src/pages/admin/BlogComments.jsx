import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Trash2, ExternalLink, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const STATUS_TABS = [
  { key: 'pending',   label: 'Pending',   chipClass: 'bg-gold/20 text-navy border border-gold/40' },
  { key: 'approved',  label: 'Approved',  chipClass: 'bg-green-50 text-green-700 border border-green-200' },
  { key: 'rejected',  label: 'Rejected',  chipClass: 'bg-red-50 text-red-700 border border-red-200' },
  { key: 'spam',      label: 'Spam',      chipClass: 'bg-slate-100 text-slate-600 border border-slate-200' },
  { key: 'all',       label: 'All',       chipClass: 'bg-cream text-charcoal/70 border border-cream-dark' },
];

export default function BlogComments() {
  const [tab, setTab] = useState('pending');
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState({});
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0, spam: 0 });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    let q = supabase.from('blog_comments').select('*').order('submitted_at', { ascending: false });
    if (tab !== 'all') q = q.eq('status', tab);
    const { data: commentData } = await q;
    setComments(commentData || []);

    // Fetch titles of posts referenced
    const postIds = [...new Set((commentData || []).map((c) => c.post_id).filter(Boolean))];
    if (postIds.length > 0) {
      const { data: postData } = await supabase.from('blog_posts').select('id, title, slug').in('id', postIds);
      const map = {};
      (postData || []).forEach((p) => { map[p.id] = p; });
      setPosts(map);
    }

    // Counts per status
    const statuses = ['pending', 'approved', 'rejected', 'spam'];
    const counts = {};
    for (const s of statuses) {
      const { count } = await supabase
        .from('blog_comments')
        .select('id', { count: 'exact', head: true })
        .eq('status', s);
      counts[s] = count || 0;
    }
    setCounts(counts);
    setLoading(false);
  }, [tab]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id, newStatus) {
    await supabase
      .from('blog_comments')
      .update({ status: newStatus, reviewed_at: new Date().toISOString() })
      .eq('id', id);
    load();
  }

  async function handleDelete(id) {
    await supabase.from('blog_comments').delete().eq('id', id);
    setDeletingId(null);
    load();
  }

  return (
    <div>
      <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-navy no-underline mb-6">
        <ArrowLeft size={14} /> Back to blog
      </Link>

      <h1 className="font-heading text-2xl font-bold text-navy mb-6">Comments</h1>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-cream-dark">
        {STATUS_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.key
                ? 'border-gold text-navy'
                : 'border-transparent text-charcoal/50 hover:text-navy'
            }`}
          >
            {t.label}
            {counts[t.key] !== undefined && t.key !== 'all' && (
              <span className="ml-2 text-[0.65rem] px-1.5 py-0.5 bg-cream text-charcoal/60">{counts[t.key]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Comments list */}
      <div className="bg-white border border-cream-dark">
        {loading ? (
          <div className="p-10 text-center"><p className="text-slate text-sm">Loading...</p></div>
        ) : comments.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-slate text-sm">
              {tab === 'pending' ? 'No comments waiting for review. 🎉' : `No ${tab} comments.`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-cream-dark">
            {comments.map((c) => {
              const post = posts[c.post_id];
              return (
                <div key={c.id} className="px-5 py-4">
                  {/* Header line: post + meta */}
                  <div className="flex flex-wrap items-center gap-3 text-[0.65rem] text-charcoal/50 mb-2">
                    {post && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-navy hover:text-gold no-underline font-semibold"
                      >
                        {post.title} <ExternalLink size={10} />
                      </a>
                    )}
                    <span>· {new Date(c.submitted_at).toLocaleString()}</span>
                    {c.flagged_by_filter && (
                      <span className="inline-flex items-center gap-1 text-red-600">
                        <AlertTriangle size={11} /> flagged: {c.flagged_by_filter}
                      </span>
                    )}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-semibold text-navy text-sm">{c.author_name}</span>
                    <a href={`mailto:${c.author_email}`} className="text-charcoal/50 text-xs no-underline hover:text-gold inline-flex items-center gap-1">
                      <Mail size={10} /> {c.author_email}
                    </a>
                    {c.author_website && (
                      <a href={c.author_website} target="_blank" rel="noopener noreferrer" className="text-charcoal/50 text-xs underline">
                        website
                      </a>
                    )}
                  </div>

                  {/* Body */}
                  <p className="text-charcoal text-sm whitespace-pre-wrap mb-3 leading-relaxed">{c.content}</p>

                  {c.rejection_reason && (
                    <p className="text-xs italic text-red-600/80 mb-3">Reason: {c.rejection_reason}</p>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {c.status !== 'approved' && (
                      <button
                        onClick={() => updateStatus(c.id, 'approved')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[0.7rem] transition-colors"
                      >
                        <CheckCircle2 size={12} /> Approve
                      </button>
                    )}
                    {c.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(c.id, 'rejected')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy hover:bg-navy/80 text-white text-[0.7rem] transition-colors"
                      >
                        <XCircle size={12} /> Reject
                      </button>
                    )}
                    {c.status !== 'spam' && (
                      <button
                        onClick={() => updateStatus(c.id, 'spam')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white text-[0.7rem] transition-colors"
                      >
                        <AlertTriangle size={12} /> Spam
                      </button>
                    )}
                    {deletingId === c.id ? (
                      <span className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="px-2 py-1.5 bg-red-600 text-white text-[0.7rem] hover:bg-red-700"
                        >
                          Confirm delete
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="px-2 py-1.5 text-charcoal/60 text-[0.7rem]"
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setDeletingId(c.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-charcoal/60 hover:text-red-600 text-[0.7rem] transition-colors"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    )}
                    {c.contact_id && (
                      <Link
                        to={`/admin/leads/${c.contact_id}`}
                        className="ml-auto text-[0.7rem] text-gold underline no-underline hover:text-navy"
                      >
                        View as lead →
                      </Link>
                    )}
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
