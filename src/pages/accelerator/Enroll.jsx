import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, Check, Lock, ArrowRight, Shield, CalendarClock } from 'lucide-react';
import SEO from '../../components/SEO';
import StandaloneHeader from '../../components/StandaloneHeader';
import { supabase } from '../../lib/supabase';

export default function AcceleratorEnroll() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref') || '';

  const [plan, setPlan] = useState('full');
  const [form, setForm] = useState({ nurse_name: '', nurse_email: '', nurse_phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [referrer, setReferrer] = useState(null); // {full_name, referral_code} if ref resolves
  const [cycle, setCycle] = useState(null);

  // Resolve referrer + active cycle for a nicer UI.
  useEffect(() => {
    (async () => {
      const { data: cy } = await supabase
        .from('cohort_cycles')
        .select('id, label, starts_on, ends_on')
        .eq('is_active', true)
        .maybeSingle();
      setCycle(cy || null);

      if (ref) {
        const { data: amb } = await supabase
          .from('ambassadors')
          .select('full_name, referral_code, status')
          .eq('referral_code', ref)
          .maybeSingle();
        if (amb && amb.status === 'active') setReferrer(amb);
      }
    })();
  }, [ref]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          nurse_name: form.nurse_name,
          nurse_email: form.nurse_email,
          nurse_phone: form.nurse_phone,
          ref: ref || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Could not start checkout. Please try again.');
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <SEO
        title="Enroll — Method Accelerator Cohort"
        description="Enroll in the Concierge Nurse Business Society Method Accelerator Cohort. Six weeks, your business built from the ground up."
        canonical="/accelerator/enroll"
      />

      <section className="bg-navy pt-24 pb-16 px-6 min-h-screen relative">
        <StandaloneHeader />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Star size={22} className="text-navy" fill="currentColor" />
            </div>
            <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-3">
              Concierge Nurse Business Society
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
              Method Accelerator Cohort
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
              Six weeks. One business. Built from the ground up with the structure, strategy, and legal protection you need to launch with confidence.
            </p>
            {cycle?.label && (
              <div className="inline-flex items-center gap-2 mt-5 bg-white/[0.04] border border-white/10 px-4 py-1.5">
                <CalendarClock size={12} className="text-gold" />
                <span className="text-white/70 text-[0.7rem] tracking-[0.2em] uppercase">
                  Enrolling for {cycle.label}
                </span>
              </div>
            )}
          </div>

          {/* Referrer banner */}
          {referrer && (
            <div className="bg-gold/15 border-l-2 border-gold p-4 mb-8 flex items-center gap-3">
              <Star size={16} className="text-gold shrink-0" fill="currentColor" />
              <p className="text-white text-sm">
                Referred by <span className="font-semibold">{referrer.full_name}</span>{' '}
                <span className="text-white/50 font-mono text-xs">({referrer.referral_code})</span>
              </p>
            </div>
          )}

          {/* Plan selector */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <PlanCard
              selected={plan === 'full'}
              onClick={() => setPlan('full')}
              label="Pay in Full"
              bonus="Best value"
              description="One payment, the whole program, full access."
            />
            <PlanCard
              selected={plan === 'payment_plan'}
              onClick={() => setPlan('payment_plan')}
              label="Payment Plan"
              bonus="Spread it out"
              description="Monthly installments — start now, pay over time."
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-5">
            <h2 className="font-heading text-xl font-bold text-white mb-1">Your Info</h2>
            <p className="text-white/50 text-xs mb-4">Takes 30 seconds. You'll be handed off to our secure payment processor next.</p>

            <Field label="Full Name" required value={form.nurse_name} onChange={update('nurse_name')} autoComplete="name" />
            <Field label="Email" type="email" required value={form.nurse_email} onChange={update('nurse_email')} autoComplete="email" />
            <Field label="Phone" type="tel" value={form.nurse_phone} onChange={update('nurse_phone')} autoComplete="tel" />

            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-xs text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold text-navy px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/90 disabled:opacity-70 transition-colors"
            >
              {loading ? 'Opening secure checkout…' : (<>Continue to Payment <ArrowRight size={14} /></>)}
            </button>

            <div className="flex items-center justify-center gap-2 text-white/40 text-xs pt-2">
              <Lock size={12} />
              <span>Secured by Stripe · your card details never touch our servers</span>
            </div>
          </form>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
            <Assurance icon={Shield} text="Secure checkout" />
            <Assurance icon={Check} text="Access starts on enrollment" />
            <Assurance icon={CalendarClock} text="6-week live cohort" />
          </div>

          <p className="text-center mt-8">
            <Link to="/accelerator" className="text-white/50 hover:text-gold text-xs no-underline transition-colors">
              ← See the full program details
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

function PlanCard({ selected, onClick, label, bonus, description }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-5 border transition-colors ${
        selected
          ? 'bg-gold/10 border-gold'
          : 'bg-white/[0.03] border-white/10 hover:border-white/30'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <p className="font-heading text-lg font-bold text-white">{label}</p>
        <span className={`text-[0.6rem] tracking-[0.15em] uppercase font-semibold ${selected ? 'text-gold' : 'text-white/40'}`}>
          {bonus}
        </span>
      </div>
      <p className={`text-sm ${selected ? 'text-white/80' : 'text-white/55'}`}>{description}</p>
    </button>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="block">
      <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 block mb-1.5">{label}</span>
      <input
        {...rest}
        className="w-full px-4 py-3 bg-navy/40 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors"
      />
    </label>
  );
}

function Assurance({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center gap-2 text-white/50 text-xs">
      <Icon size={16} className="text-gold/70" />
      <span>{text}</span>
    </div>
  );
}
