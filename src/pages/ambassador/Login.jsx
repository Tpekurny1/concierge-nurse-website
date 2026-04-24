import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Star, ArrowRight, Mail, Lock } from 'lucide-react';
import SEO from '../../components/SEO';
import StandaloneHeader from '../../components/StandaloneHeader';

export default function AmbassadorLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/ambassador/portal';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (signInError) {
      setError('Invalid email or password.');
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', data.user.id)
      .maybeSingle();

    if (profile?.role === 'admin') {
      navigate('/admin');
      return;
    }

    navigate(next);
  }

  return (
    <>
      <SEO title="Ambassador Sign In — Concierge Nurse Business Society" canonical="/ambassador/login" />
      <section className="min-h-screen bg-navy flex items-center justify-center px-6 pt-24 pb-16 relative">
        <StandaloneHeader />
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Star size={22} className="text-navy" fill="currentColor" />
            </div>
            <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-3">Ambassador Pathway</p>
            <h1 className="font-heading text-3xl font-bold text-white mb-2">Sign in</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-5">
            <label className="block">
              <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 block mb-1.5">Email</span>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3 bg-navy/40 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 block mb-1.5">Password</span>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full pl-11 pr-4 py-3 bg-navy/40 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors"
                />
              </div>
            </label>

            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-xs text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold text-navy px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/90 disabled:opacity-70 transition-colors"
            >
              {loading ? 'Signing in…' : (<>Sign In <ArrowRight size={14} /></>)}
            </button>

            <p className="text-center text-white/40 text-xs pt-2">
              New ambassador?{' '}
              <Link to="/ambassador/signup" className="text-gold hover:text-gold/80 no-underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
