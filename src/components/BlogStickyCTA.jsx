import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { submitSubscribe } from '../lib/api';

// Sticky newsletter CTA that slides up from the bottom once the reader
// has scrolled past 60% of the page. Dismissible per-session.

export default function BlogStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('blog_sticky_dismissed') === '1'
  );
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (dismissed) return;

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = window.scrollY / scrollable;
      if (progress > 0.6) setVisible(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  function dismiss() {
    try { sessionStorage.setItem('blog_sticky_dismissed', '1'); } catch {}
    setDismissed(true);
    setVisible(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitSubscribe({ email, source: 'blog_sticky' });
      setStatus('success');
      setTimeout(() => dismiss(), 3000);
    } catch {
      setStatus('error');
    }
  }

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-navy text-white border-t-4 border-gold shadow-2xl animate-slide-up">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center sm:text-left">
          <p className="font-heading text-base font-bold text-white">Want more like this in your inbox?</p>
          <p className="text-white/60 text-xs">Get Tracy's insights for building a concierge nursing business — free, no spam.</p>
        </div>

        {status === 'success' ? (
          <p className="text-gold text-sm font-semibold">Subscribed — welcome!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 sm:w-64 px-3 py-2 text-sm bg-white/10 border border-white/30 text-white placeholder-white/40 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-4 py-2 bg-gold text-navy text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-60"
            >
              {status === 'submitting' ? '...' : 'Subscribe'}
            </button>
          </form>
        )}

        <button
          onClick={dismiss}
          className="text-white/50 hover:text-white p-1 transition-colors"
          title="Dismiss"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
