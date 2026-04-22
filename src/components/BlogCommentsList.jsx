import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function BlogCommentsList({ postId, refreshKey }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('blog_comments')
        .select('id, author_name, author_website, content, submitted_at')
        .eq('post_id', postId)
        .eq('status', 'approved')
        .order('submitted_at', { ascending: true });
      setComments(data || []);
      setLoading(false);
    }
    load();
  }, [postId, refreshKey]);

  if (loading) {
    return <p className="mt-10 text-slate text-sm text-center">Loading comments…</p>;
  }

  if (comments.length === 0) {
    return (
      <p className="mt-10 text-slate text-sm text-center italic">
        No comments yet. Be the first to share your thoughts.
      </p>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="font-heading text-xl font-bold text-navy mb-6">
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </h3>
      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="bg-white border-l-2 border-gold pl-5 py-3">
            <div className="flex items-baseline gap-2 mb-2">
              {c.author_website ? (
                <a
                  href={c.author_website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-semibold text-navy hover:text-gold no-underline"
                >
                  {c.author_name}
                </a>
              ) : (
                <span className="font-semibold text-navy">{c.author_name}</span>
              )}
              <span className="text-[0.65rem] text-charcoal/40">
                {new Date(c.submitted_at).toLocaleDateString(undefined, {
                  year: 'numeric', month: 'short', day: 'numeric',
                })}
              </span>
            </div>
            <p className="text-charcoal text-sm whitespace-pre-wrap leading-relaxed">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
