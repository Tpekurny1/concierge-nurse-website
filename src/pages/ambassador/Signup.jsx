import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../../components/SEO';

export default function AmbassadorSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm: '',
    phone: '',
    venmo_handle: '',
    cohort_graduated: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [doneMessage, setDoneMessage] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    const emailLc = form.email.trim().toLowerCase();
    const ambassadorProfile = {
      ambassador_full_name: form.full_name.trim(),
      ambassador_phone: form.phone.trim() || null,
      ambassador_venmo_handle: form.venmo_handle.trim() || null,
      ambassador_cohort_graduated: form.cohort_graduated.trim() || null,
    };

    // Stash signup fields on the auth user so the Portal can auto-create the
    // ambassador row after email confirmation — without re-asking for them.
    // emailRedirectTo sends the user straight to the portal after confirming.
    const redirectTo = typeof window !== 'undefined'
      ? `${window.location.origin}/ambassador/portal`
      : undefined;

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: emailLc,
      password: form.password,
      options: {
        data: ambassadorProfile,
        emailRedirectTo: redirectTo,
      },
    });

    if (signUpError) {
      setError(signUpError.message || 'Could not create your account.');
      setLoading(false);
      return;
    }

    const user = signUpData.user;
    if (!user) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    async function notifyTracy() {
      try {
        await fetch('/api/notify/new-ambassador', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: ambassadorProfile.ambassador_full_name,
            email: emailLc,
            phone: ambassadorProfile.ambassador_phone,
            cohort_graduated: ambassadorProfile.ambassador_cohort_graduated,
          }),
        });
      } catch {
        /* non-blocking */
      }
    }

    if (signUpData.session) {
      const { error: insertError } = await supabase.from('ambassadors').insert({
        user_id: user.id,
        email: emailLc,
        full_name: ambassadorProfile.ambassador_full_name,
        phone: ambassadorProfile.ambassador_phone,
        venmo_handle: ambassadorProfile.ambassador_venmo_handle,
        cohort_graduated: ambassadorProfile.ambassador_cohort_graduated,
        status: 'pending',
      });

      if (insertError) {
        setError(`Account created, but we could not save your profile: ${insertError.message}`);
        setLoading(false);
        return;
      }

      notifyTracy();
      navigate('/ambassador/portal');
      return;
    }

    // Email-confirmation mode: the row will be auto-created on first login
    // from user_metadata. Fire the Tracy notification now so she sees the
    // signup even before they confirm.
    notifyTracy();

    setDoneMessage(
      "Check your email to confirm your address. Once confirmed, sign in and you'll land straight in your portal — no re-entering details. Tracy will approve your Ambassador status from there."
    );
    setLoading(false);
  }

  if (doneMessage) {
    return (
      <>
        <SEO title="Check Your Email — Ambassador Pathway" canonical="/ambassador/signup" />
        <section className="min-h-screen bg-navy flex items-center justify-center px-6 pt-24 pb-16">
          <div className="max-w-md w-full bg-white/[0.03] border border-white/10 rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={26} className="text-gold" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-white mb-4">Almost there</h1>
            <p className="text-white/70 text-sm leading-relaxed mb-8">{doneMessage}</p>
            <Link
              to="/ambassador/login"
              className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase no-underline hover:bg-gold/90 transition-colors"
            >
              Go to Sign In <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Become an Ambassador — Concierge Nurse Business Society"
        description="Sign up for the Ambassador Pathway. Earn up to $1,200 per cohort cycle by referring nurses to the Concierge Nurse Business Society Method Accelerator."
        canonical="/ambassador/signup"
      />
      <section className="min-h-screen bg-navy pt-24 pb-16 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Star size={22} className="text-navy" fill="currentColor" />
            </div>
            <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-3">Ambassador Pathway</p>
            <h1 className="font-heading text-3xl font-bold text-white mb-3">Become an Ambassador</h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
              Takes about 2 minutes. You'll create your portal login, then Tracy will review and activate your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-5"
          >
            <Field label="Full Name" required value={form.full_name} onChange={update('full_name')} autoComplete="name" />
            <Field label="Email" type="email" required value={form.email} onChange={update('email')} autoComplete="email" />

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Password"
                type="password"
                required
                value={form.password}
                onChange={update('password')}
                autoComplete="new-password"
                hint="8+ characters"
              />
              <Field
                label="Confirm Password"
                type="password"
                required
                value={form.confirm}
                onChange={update('confirm')}
                autoComplete="new-password"
              />
            </div>

            <Field label="Phone" type="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" />
            <Field
              label="Venmo Handle"
              value={form.venmo_handle}
              onChange={update('venmo_handle')}
              placeholder="@your-handle"
              hint="How you'll be paid"
            />
            <Field
              label="Which Accelerator cohort did you graduate from?"
              value={form.cohort_graduated}
              onChange={update('cohort_graduated')}
              placeholder="e.g., Pilot 2025, May 2025"
            />

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
              {loading ? 'Creating account…' : (<>Create Account <ArrowRight size={14} /></>)}
            </button>

            <p className="text-center text-white/40 text-xs pt-2">
              Already have an account?{' '}
              <Link to="/ambassador/login" className="text-gold hover:text-gold/80 no-underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, hint, ...rest }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50">{label}</span>
        {hint && <span className="text-white/30 text-[0.6rem]">{hint}</span>}
      </div>
      <input
        {...rest}
        className="w-full px-4 py-3 bg-navy/40 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors"
      />
    </label>
  );
}
