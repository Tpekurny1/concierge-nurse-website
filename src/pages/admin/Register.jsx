import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, ArrowRight, UserPlus } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  }

  return (
    <div className="min-h-screen bg-navy relative flex items-center justify-center p-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gold/10 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }}></div>
      </div>

      <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ease-out transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full border border-gold/30 bg-navy-light/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(196,162,101,0.15)]">
            <UserPlus className="w-8 h-8 text-gold" />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>

          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl font-bold text-white mb-3">Create Account</h1>
            <p className="text-gold/70 text-xs tracking-[0.2em] uppercase font-semibold">Concierge Nurse Business Society</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-gold transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-navy/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/50 focus:bg-navy-light/40 focus:ring-1 focus:ring-gold/50 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-gold transition-colors duration-300">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-navy/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/50 focus:bg-navy-light/40 focus:ring-1 focus:ring-gold/50 transition-all duration-300"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 ml-1">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-gold transition-colors duration-300">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-navy/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/50 focus:bg-navy-light/40 focus:ring-1 focus:ring-gold/50 transition-all duration-300"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/20 rounded-lg text-center">
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-muted via-gold to-gold-light text-navy font-semibold text-sm hover:shadow-[0_0_20px_rgba(196,162,101,0.4)] disabled:opacity-70 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link to="/admin/login" className="text-white/40 hover:text-gold text-sm no-underline transition-colors">
            Already have an account? Sign in
          </Link>
        </div>

        <div className="mt-6 text-center text-white/30 text-xs">
          <p>&copy; {new Date().getFullYear()} Concierge Nurse Business Society. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
