import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Copy, Check, Star, ExternalLink, LogOut, ArrowLeft, Plus,
  Loader2, ShieldAlert, DollarSign, Award, TrendingUp,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthContext';
import SEO from '../../components/SEO';
import {
  AMBASSADOR_SCRIPTS, renderScript, buildEnrollmentLink, TRACY_EMAIL,
} from '../../lib/ambassadorScripts';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'referrals', label: 'My Referrals' },
  { id: 'toolkit', label: 'My Toolkit' },
  { id: 'payouts', label: 'My Payouts' },
  { id: 'account', label: 'My Account' },
];

const dollars = (cents) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

export default function AmbassadorPortal() {
  const { session, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [ambassador, setAmbassador] = useState(null);
  const [activeCycle, setActiveCycle] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const loadAll = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setLoadError('');

    let [ambRes, cycleRes] = await Promise.all([
      supabase.from('ambassadors').select('*').eq('user_id', session.user.id).maybeSingle(),
      supabase.from('cohort_cycles').select('*').eq('is_active', true).maybeSingle(),
    ]);

    if (ambRes.error) {
      setLoadError(ambRes.error.message);
      setLoading(false);
      return;
    }

    // First-login auto-create: if there's no ambassador row yet, try to
    // recover the signup details from user_metadata (signup stashed them
    // there via options.data). The session.user is sometimes stale right
    // after email confirmation — always fetch a fresh user first.
    if (!ambRes.data) {
      let freshUser = session.user;
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) freshUser = userData.user;
      } catch { /* fall back to cached session.user */ }

      const meta = freshUser.user_metadata || {};

      if (meta.ambassador_full_name) {
        const { data: inserted, error: insertErr } = await supabase
          .from('ambassadors')
          .insert({
            user_id: freshUser.id,
            email: freshUser.email,
            full_name: meta.ambassador_full_name,
            phone: meta.ambassador_phone || null,
            venmo_handle: meta.ambassador_venmo_handle || null,
            cohort_graduated: meta.ambassador_cohort_graduated || null,
            status: 'pending',
          })
          .select('*')
          .maybeSingle();

        if (!insertErr && inserted) {
          ambRes = { data: inserted, error: null };
          try {
            await fetch('/api/notify/new-ambassador', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                full_name: inserted.full_name,
                email: inserted.email,
                phone: inserted.phone,
                cohort_graduated: inserted.cohort_graduated,
              }),
            });
          } catch { /* non-blocking */ }
        } else if (insertErr?.code === '23505') {
          // Row already exists for this user (possibly from a prior attempt).
          // Re-fetch and treat as success.
          const { data: existing } = await supabase
            .from('ambassadors')
            .select('*')
            .eq('user_id', freshUser.id)
            .maybeSingle();
          if (existing) ambRes = { data: existing, error: null };
        }
      }
    }

    setAmbassador(ambRes.data);
    setActiveCycle(cycleRes.data || null);

    if (ambRes.data) {
      const [refsRes, payRes] = await Promise.all([
        supabase.from('referrals').select('*').eq('ambassador_id', ambRes.data.id).order('created_at', { ascending: false }),
        supabase.from('payouts').select('*').eq('ambassador_id', ambRes.data.id).order('created_at', { ascending: false }),
      ]);
      setReferrals(refsRes.data || []);
      setPayouts(payRes.data || []);
    }
    setLoading(false);
  }, [session]);

  useEffect(() => { loadAll(); }, [loadAll]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/ambassador');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 size={28} className="text-gold animate-spin" />
      </div>
    );
  }

  // Admin preview — redirect admins to their own dashboard.
  if (isAdmin && !ambassador) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-charcoal/80 mb-5">You're signed in as an admin. The Ambassador Portal is for referring members.</p>
          <Link to="/admin" className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase no-underline hover:bg-navy/85 transition-colors">
            Go to Admin Dashboard <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    );
  }

  // Logged in but no ambassador row — finish setup. Pre-fill from whatever
  // signup stashed on user_metadata so, at worst, the user just clicks Submit.
  if (!ambassador) {
    const meta = session.user.user_metadata || {};
    return (
      <FinishSetup
        userId={session.user.id}
        email={session.user.email}
        initial={{
          full_name: meta.ambassador_full_name || '',
          phone: meta.ambassador_phone || '',
          venmo_handle: meta.ambassador_venmo_handle || '',
          cohort_graduated: meta.ambassador_cohort_graduated || '',
        }}
        onDone={loadAll}
        error={loadError}
      />
    );
  }

  return (
    <>
      <SEO title="Ambassador Portal — Concierge Nurse Business Society" canonical="/ambassador/portal" />

      {/* Top bar */}
      <header className="bg-navy sticky top-0 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/ambassador" className="flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-[0.18em] no-underline transition-colors">
            <ArrowLeft size={14} /> <span className="hidden sm:inline">Back to site</span>
          </Link>
          <div className="flex flex-col items-center leading-none text-center gap-1">
            <span className="font-heading text-sm font-bold text-white tracking-wide">Ambassador Portal</span>
            <span className="text-gold text-[0.55rem] tracking-[0.3em] uppercase">
              {ambassador.status === 'active' ? 'Active' : ambassador.status === 'pending' ? 'Pending Approval' : ambassador.status}
            </span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-[0.18em] transition-colors">
            <LogOut size={14} /> <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>

        {/* Tab nav */}
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-5 py-3 text-[0.7rem] md:text-xs font-semibold tracking-[0.2em] uppercase whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id ? 'text-gold border-gold' : 'text-white/55 border-transparent hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Body */}
      <main className="bg-cream min-h-screen">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 md:py-14">
          {ambassador.status === 'pending' && <PendingBanner />}
          {ambassador.status === 'paused' && <PausedBanner />}

          {activeTab === 'dashboard' && <DashboardTab ambassador={ambassador} cycle={activeCycle} referrals={referrals} payouts={payouts} onGoto={setActiveTab} />}
          {activeTab === 'referrals' && <ReferralsTab ambassador={ambassador} cycle={activeCycle} referrals={referrals} reload={loadAll} />}
          {activeTab === 'toolkit' && <ToolkitTab refCode={ambassador.referral_code} status={ambassador.status} />}
          {activeTab === 'payouts' && <PayoutsTab payouts={payouts} referrals={referrals} />}
          {activeTab === 'account' && <AccountTab ambassador={ambassador} reload={loadAll} />}
        </div>
      </main>
    </>
  );
}

/* ────────────────────────── status banners ────────────────────────── */

function PendingBanner() {
  return (
    <div className="bg-gold/15 border-l-2 border-gold p-4 mb-8 flex items-start gap-3">
      <ShieldAlert size={18} className="text-gold shrink-0 mt-0.5" />
      <div>
        <p className="text-navy font-semibold text-sm mb-1">Pending Tracy's approval</p>
        <p className="text-charcoal/75 text-xs leading-relaxed">
          Your account is created. Tracy reviews new Ambassadors and activates your referral code. Until then, you can explore the portal but cannot log referrals yet.
        </p>
      </div>
    </div>
  );
}

function PausedBanner() {
  return (
    <div className="bg-cream-dark border-l-2 border-charcoal/30 p-4 mb-8">
      <p className="text-charcoal text-sm">Your Ambassador status is currently paused. Reach out to Tracy for details.</p>
    </div>
  );
}

/* ────────────────────────── Dashboard tab ────────────────────────── */

function DashboardTab({ ambassador, cycle, referrals, payouts, onGoto }) {
  const cycleId = cycle?.id ?? null;
  const cycleRefs = useMemo(() => referrals.filter((r) => r.cohort_cycle_id === cycleId), [referrals, cycleId]);
  const paidThisCycle = cycleRefs.filter((r) => r.status === 'paid').length;
  const pendingThisCycle = cycleRefs.filter((r) => r.status === 'pending').length;
  const enrolledThisCycle = cycleRefs.filter((r) => r.status === 'enrolled').length;

  const paidPayoutTotal = payouts.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount_cents, 0);
  const duePayoutTotal = payouts.filter((p) => p.status === 'due').reduce((s, p) => s + p.amount_cents, 0);

  const tier = paidThisCycle >= 3 ? 3 : paidThisCycle >= 2 ? 2 : paidThisCycle >= 1 ? 1 : 0;
  const nextBump = tier === 0 ? 300 : tier === 1 ? 400 : tier === 2 ? 500 : null;

  return (
    <div className="space-y-8">
      {/* Hero card */}
      <div className="bg-navy p-8 md:p-10 relative overflow-hidden">
        <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-3">
          Current Cycle · {cycle?.label || '—'}
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
          {paidThisCycle >= 3 ? 'You hit the top tier.' : `${paidThisCycle} of 3 paid this cycle.`}
        </h1>
        <p className="text-white/60 text-sm md:text-base mb-7 leading-relaxed max-w-2xl">
          {paidThisCycle >= 3
            ? "You've unlocked the full $1,200 reward and earned the Founding Ambassador badge. This badge is permanent."
            : nextBump
              ? `One more paid referral brings $${nextBump} on top of what you've already earned this cycle.`
              : `Log your first referral to start the cycle.`}
        </p>

        {/* Tier progress */}
        <div className="grid grid-cols-3 gap-2 mb-3 max-w-md">
          {[1, 2, 3].map((t) => (
            <div key={t} className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className={`h-full transition-all ${paidThisCycle >= t ? 'bg-gold' : ''}`} style={{ width: paidThisCycle >= t ? '100%' : '0%' }} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-white/50 max-w-md">
          <span>Tier 1 · $300</span>
          <span>Tier 2 · $700</span>
          <span>Tier 3 · $1,200</span>
        </div>

        {ambassador.founding_ambassador && (
          <div className="mt-6 inline-flex items-center gap-2 bg-gold/15 border border-gold/30 px-4 py-2">
            <Star size={14} className="text-gold" fill="currentColor" />
            <span className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase">Founding Ambassador</span>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Paid This Cycle" value={paidThisCycle} sub={`${enrolledThisCycle} enrolled, ${pendingThisCycle} pending`} />
        <StatCard icon={DollarSign} label="Earned Lifetime" value={dollars(ambassador.lifetime_earned_cents)} sub={`${ambassador.lifetime_referrals} referrals all-time`} />
        <StatCard icon={DollarSign} label="Payouts Due" value={dollars(duePayoutTotal)} sub={duePayoutTotal > 0 ? 'Tracy sends via Venmo' : 'Nothing queued'} />
        <StatCard icon={Award} label="Paid Out" value={dollars(paidPayoutTotal)} sub="Cleared to Venmo" />
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => onGoto('referrals')}
          disabled={ambassador.status !== 'active'}
          className="bg-white border border-cream-dark hover:border-gold transition-colors p-6 text-left group disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Plus size={20} className="text-gold mb-3" />
          <p className="font-heading text-lg font-bold text-navy mb-1">Log a referral</p>
          <p className="text-charcoal/60 text-sm">Capture a nurse you've just talked to so credit is locked in.</p>
        </button>
        <button
          onClick={() => onGoto('toolkit')}
          className="bg-white border border-cream-dark hover:border-gold transition-colors p-6 text-left"
        >
          <Copy size={20} className="text-gold mb-3" />
          <p className="font-heading text-lg font-bold text-navy mb-1">Your scripts</p>
          <p className="text-charcoal/60 text-sm">Copy text, email, and social templates — your referral link is baked in.</p>
        </button>
      </div>

      {/* Referral code card */}
      {ambassador.referral_code && (
        <div className="bg-cream-dark border-l-2 border-gold p-5">
          <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-2">Your Referral Code</p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-heading text-2xl font-bold text-navy tracking-wider">{ambassador.referral_code}</p>
            <CopyInline text={buildEnrollmentLink(ambassador.referral_code)} label="Copy link" />
          </div>
          <p className="text-charcoal/65 text-xs mt-3 leading-relaxed break-all">
            Share this link with nurses — clicking <span className="text-navy font-mono">{buildEnrollmentLink(ambassador.referral_code)}</span> attributes the enrollment to you automatically.
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-white border border-cream-dark p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-charcoal/55 text-[0.6rem] font-semibold tracking-[0.2em] uppercase">{label}</p>
        <Icon size={14} className="text-gold" />
      </div>
      <p className="font-heading text-2xl font-bold text-navy mb-1">{value}</p>
      <p className="text-charcoal/55 text-[0.7rem]">{sub}</p>
    </div>
  );
}

/* ────────────────────────── Referrals tab ────────────────────────── */

function ReferralsTab({ ambassador, cycle, referrals, reload }) {
  const [showForm, setShowForm] = useState(false);
  const canLog = ambassador.status === 'active';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-1">Your referrals</h1>
          <p className="text-charcoal/60 text-sm">{referrals.length} total · {referrals.filter((r) => r.status === 'paid').length} paid</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          disabled={!canLog}
          className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-navy/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={14} /> Log a referral
        </button>
      </div>

      {showForm && canLog && (
        <LogReferralForm ambassador={ambassador} cycle={cycle} onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); reload(); }} />
      )}

      {referrals.length === 0 ? (
        <div className="bg-white border border-cream-dark p-10 text-center">
          <p className="text-charcoal/70 text-sm">No referrals yet. Log your first one above.</p>
        </div>
      ) : (
        <div className="bg-white border border-cream-dark">
          <div className="hidden md:grid grid-cols-[1.4fr_1.4fr_1fr_0.9fr_0.9fr] gap-4 px-5 py-3 bg-cream-dark/60 border-b border-cream-dark text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-charcoal/55">
            <div>Nurse</div>
            <div>Contact</div>
            <div>Cycle</div>
            <div>Logged</div>
            <div>Status</div>
          </div>
          <ul className="divide-y divide-cream-dark">
            {referrals.map((r) => (
              <li key={r.id} className="px-5 py-4 grid md:grid-cols-[1.4fr_1.4fr_1fr_0.9fr_0.9fr] gap-4 items-center">
                <div>
                  <p className="text-navy font-semibold text-sm">{r.referred_name}</p>
                  <p className="text-charcoal/55 text-xs md:hidden">{r.referred_email}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-charcoal/75 text-sm">{r.referred_email}</p>
                  {r.referred_phone && <p className="text-charcoal/50 text-xs">{r.referred_phone}</p>}
                </div>
                <div className="text-charcoal/70 text-xs">{r.cohort_cycle_label || '—'}</div>
                <div className="text-charcoal/55 text-xs">{new Date(r.created_at).toLocaleDateString()}</div>
                <div>
                  <StatusPill status={r.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    pending: { label: 'Pending', cls: 'bg-cream-dark text-charcoal/70' },
    enrolled: { label: 'Enrolled', cls: 'bg-blue-100 text-blue-800' },
    paid: { label: 'Paid', cls: 'bg-green-100 text-green-800' },
    declined: { label: 'Declined', cls: 'bg-red-100 text-red-800' },
    no_response: { label: 'No response', cls: 'bg-cream-dark text-charcoal/50' },
  };
  const { label, cls } = map[status] || { label: status, cls: 'bg-cream-dark text-charcoal/70' };
  return <span className={`inline-flex px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.1em] uppercase ${cls}`}>{label}</span>;
}

function LogReferralForm({ ambassador, cycle, onClose, onSaved }) {
  const [form, setForm] = useState({
    referred_name: '',
    referred_email: '',
    referred_phone: '',
    preferred_contact: 'text',
    source_channel: 'text',
    notes: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ambassador_id: ambassador.id,
      cohort_cycle_id: cycle?.id || null,
      referred_name: form.referred_name.trim(),
      referred_email: form.referred_email.trim().toLowerCase(),
      referred_phone: form.referred_phone.trim() || null,
      preferred_contact: form.preferred_contact,
      source_channel: form.source_channel,
      notes: form.notes.trim() || null,
      status: 'pending',
    };

    const { error: insertError } = await supabase.from('referrals').insert(payload);
    if (insertError) {
      if (insertError.code === '23505') {
        setError("Someone already logged this email for the current cycle. If you referred them first, reach out to Tracy.");
      } else {
        setError(insertError.message);
      }
      setSaving(false);
      return;
    }

    onSaved();
  }

  return (
    <div className="bg-white border border-cream-dark p-6 md:p-8 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-navy">Log a new referral</h2>
        <button onClick={onClose} className="text-charcoal/50 hover:text-charcoal text-xs uppercase tracking-[0.2em]">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Nurse's name" required value={form.referred_name} onChange={update('referred_name')} />
          <FormField label="Email" type="email" required value={form.referred_email} onChange={update('referred_email')} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Phone" type="tel" value={form.referred_phone} onChange={update('referred_phone')} />
          <SelectField label="How they prefer to be contacted" value={form.preferred_contact} onChange={update('preferred_contact')}
            options={[['text', 'Text'], ['email', 'Email'], ['call', 'Phone call']]} />
        </div>
        <SelectField label="How you reached them" value={form.source_channel} onChange={update('source_channel')}
          options={[['text', 'Personal text'], ['email', 'Email'], ['social', 'Social post'], ['dm', 'DM response'], ['in_person', 'In person'], ['qr', 'QR code'], ['other', 'Other']]} />

        <label className="block">
          <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-charcoal/60 block mb-1.5">Notes <span className="text-charcoal/40">(optional)</span></span>
          <textarea
            rows={3}
            value={form.notes}
            onChange={update('notes')}
            className="w-full px-4 py-2.5 bg-cream-dark border border-cream-dark rounded-none text-charcoal text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </label>

        {error && (
          <div className="p-3 bg-red-50 border-l-2 border-red-400">
            <p className="text-red-700 text-xs">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="text-charcoal/60 hover:text-charcoal text-xs uppercase tracking-[0.2em] px-4 py-2.5">Cancel</button>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/90 disabled:opacity-70 transition-colors">
            {saving ? 'Saving…' : 'Save referral'}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ label, ...rest }) {
  return (
    <label className="block">
      <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-charcoal/60 block mb-1.5">{label}</span>
      <input {...rest} className="w-full px-4 py-2.5 bg-cream-dark border border-cream-dark rounded-none text-charcoal text-sm focus:outline-none focus:border-gold transition-colors" />
    </label>
  );
}

function SelectField({ label, options, ...rest }) {
  return (
    <label className="block">
      <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-charcoal/60 block mb-1.5">{label}</span>
      <select {...rest} className="w-full px-4 py-2.5 bg-cream-dark border border-cream-dark rounded-none text-charcoal text-sm focus:outline-none focus:border-gold transition-colors">
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}

/* ────────────────────────── Toolkit tab ────────────────────────── */

function ToolkitTab({ refCode, status }) {
  return (
    <div className="space-y-8">
      <div className="bg-white border border-cream-dark p-6 md:p-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-2">Your toolkit</h1>
        <p className="text-charcoal/70 leading-relaxed">
          {refCode
            ? 'Every script below uses your personal referral link automatically. Copy, personalize, send.'
            : 'Scripts are available to review. Once Tracy activates your account and assigns your referral code, copied links will include it automatically.'}
        </p>
        {refCode && (
          <div className="mt-5 bg-cream-dark border-l-2 border-gold p-4">
            <p className="text-gold text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-1">Your Referral Link</p>
            <p className="text-charcoal text-sm break-all font-mono">{buildEnrollmentLink(refCode)}</p>
          </div>
        )}
      </div>

      <ScriptSection title="Text Messages" subtitle="One genuine text to the right person outperforms a post that reaches 500 strangers." scripts={AMBASSADOR_SCRIPTS.texts} refCode={refCode} />
      <ScriptSection title="Email" subtitle="For colleagues you don't text with regularly. More room to paint the full picture." scripts={[AMBASSADOR_SCRIPTS.email]} refCode={refCode} />
      <ScriptSection title="Social Media Posts" subtitle="Add your own story. The more real it sounds, the more it resonates." scripts={AMBASSADOR_SCRIPTS.social} refCode={refCode} />
      <ScriptSection title="DM Responses" subtitle="When someone responds to your post or asks questions." scripts={AMBASSADOR_SCRIPTS.dms} refCode={refCode} />
    </div>
  );
}

function ScriptSection({ title, subtitle, scripts, refCode }) {
  return (
    <div className="bg-white border border-cream-dark p-6 md:p-8">
      <h2 className="font-heading text-xl font-bold text-navy mb-1">{title}</h2>
      <p className="text-charcoal/60 italic text-sm mb-6">{subtitle}</p>
      {scripts.map((s) => (
        <ScriptCard key={s.title} title={s.title} body={renderScript(s.body, refCode)} />
      ))}
    </div>
  );
}

function ScriptCard({ title, body }) {
  return (
    <div className="bg-cream-dark border-l-2 border-gold p-5 mb-4">
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase">{title}</p>
        <CopyInline text={body} label="Copy" />
      </div>
      <p className="text-charcoal/85 text-sm leading-relaxed whitespace-pre-wrap">{body}</p>
    </div>
  );
}

function CopyInline({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);
  async function doCopy() {
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button onClick={doCopy} className="inline-flex items-center gap-1.5 bg-navy text-white px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase hover:bg-navy/85 transition-colors shrink-0">
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

/* ────────────────────────── Payouts tab ────────────────────────── */

function PayoutsTab({ payouts, referrals }) {
  const refById = useMemo(() => Object.fromEntries(referrals.map((r) => [r.id, r])), [referrals]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-1">Your payouts</h1>
        <p className="text-charcoal/60 text-sm">
          Paid out via Venmo within 1 week of the referred nurse's payment clearing.
        </p>
      </div>

      {payouts.length === 0 ? (
        <div className="bg-white border border-cream-dark p-10 text-center">
          <p className="text-charcoal/70 text-sm">No payouts yet. Payouts show up automatically when a referral's payment clears.</p>
        </div>
      ) : (
        <div className="bg-white border border-cream-dark">
          <div className="hidden md:grid grid-cols-[1fr_1.4fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 px-5 py-3 bg-cream-dark/60 border-b border-cream-dark text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-charcoal/55">
            <div>Amount</div>
            <div>For Referral</div>
            <div>Tier</div>
            <div>Cycle</div>
            <div>Status</div>
            <div>Paid On</div>
          </div>
          <ul className="divide-y divide-cream-dark">
            {payouts.map((p) => {
              const ref = refById[p.referral_id];
              return (
                <li key={p.id} className="px-5 py-4 grid md:grid-cols-[1fr_1.4fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 items-center">
                  <div className="font-heading text-lg font-bold text-navy">{dollars(p.amount_cents)}</div>
                  <div className="text-charcoal/75 text-sm">{ref?.referred_name || '—'}</div>
                  <div className="text-charcoal/70 text-xs">{p.tier ? `Tier ${p.tier}` : '—'}</div>
                  <div className="text-charcoal/70 text-xs">{p.cohort_cycle_label || '—'}</div>
                  <div><PayoutStatusPill status={p.status} /></div>
                  <div className="text-charcoal/55 text-xs">{p.paid_at ? new Date(p.paid_at).toLocaleDateString() : '—'}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function PayoutStatusPill({ status }) {
  const map = {
    due: { label: 'Due', cls: 'bg-gold/20 text-navy' },
    paid: { label: 'Paid', cls: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Cancelled', cls: 'bg-cream-dark text-charcoal/60' },
  };
  const { label, cls } = map[status] || { label: status, cls: 'bg-cream-dark text-charcoal/70' };
  return <span className={`inline-flex px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.1em] uppercase ${cls}`}>{label}</span>;
}

/* ────────────────────────── Account tab ────────────────────────── */

function AccountTab({ ambassador, reload }) {
  const [form, setForm] = useState({
    full_name: ambassador.full_name || '',
    phone: ambassador.phone || '',
    venmo_handle: ambassador.venmo_handle || '',
    cohort_graduated: ambassador.cohort_graduated || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [emailForm, setEmailForm] = useState({ new_email: '' });
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailMsg, setEmailMsg] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const [pwForm, setPwForm] = useState({ new_password: '', confirm_password: '' });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState('');
  const [pwErr, setPwErr] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    const { error: updErr } = await supabase
      .from('ambassadors')
      .update({
        full_name: form.full_name.trim(),
        phone: form.phone.trim() || null,
        venmo_handle: form.venmo_handle.trim() || null,
        cohort_graduated: form.cohort_graduated.trim() || null,
      })
      .eq('id', ambassador.id);

    if (updErr) {
      setError(updErr.message);
      setSaving(false);
      return;
    }
    setMessage('Saved.');
    setSaving(false);
    reload();
  }

  async function handleEmailChange(e) {
    e.preventDefault();
    setEmailSaving(true);
    setEmailMsg('');
    setEmailErr('');

    const newEmail = emailForm.new_email.trim().toLowerCase();
    if (!newEmail) {
      setEmailErr('Enter a new email.');
      setEmailSaving(false);
      return;
    }

    const { error: authErr } = await supabase.auth.updateUser({ email: newEmail });
    if (authErr) {
      setEmailErr(authErr.message);
      setEmailSaving(false);
      return;
    }

    // Keep the ambassador row's contact email in sync so Tracy's admin view
    // matches what they actually log in with. Auth.users won't flip until the
    // confirmation link is clicked, but the contact email can update now.
    await supabase.from('ambassadors').update({ email: newEmail }).eq('id', ambassador.id);

    setEmailMsg('Confirmation link sent to your new email. Click it to finish the change — until then, keep signing in with your current email.');
    setEmailForm({ new_email: '' });
    setEmailSaving(false);
    reload();
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setPwSaving(true);
    setPwMsg('');
    setPwErr('');

    if (pwForm.new_password.length < 8) {
      setPwErr('Use at least 8 characters.');
      setPwSaving(false);
      return;
    }
    if (pwForm.new_password !== pwForm.confirm_password) {
      setPwErr('Passwords do not match.');
      setPwSaving(false);
      return;
    }

    const { error: authErr } = await supabase.auth.updateUser({ password: pwForm.new_password });
    if (authErr) {
      setPwErr(authErr.message);
      setPwSaving(false);
      return;
    }

    setPwMsg('Password updated. Use the new password next time you sign in.');
    setPwForm({ new_password: '', confirm_password: '' });
    setPwSaving(false);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-1">Your account</h1>
        <p className="text-charcoal/60 text-sm">Update your details. Status, referral code, and lifetime totals are managed by Tracy.</p>
      </div>

      {/* Read-only info */}
      <div className="bg-cream-dark border-l-2 border-gold p-5 grid sm:grid-cols-2 gap-4">
        <Readonly label="Email" value={ambassador.email} />
        <Readonly label="Status" value={ambassador.status} />
        <Readonly label="Referral Code" value={ambassador.referral_code || 'Assigned on approval'} />
        <Readonly label="Founding Ambassador" value={ambassador.founding_ambassador ? 'Yes' : 'Not yet'} />
      </div>

      {/* Editable profile */}
      <form onSubmit={handleSave} className="bg-white border border-cream-dark p-6 md:p-8 space-y-4">
        <FormField label="Full name" value={form.full_name} onChange={update('full_name')} required />
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="Phone" type="tel" value={form.phone} onChange={update('phone')} />
          <FormField label="Venmo handle" value={form.venmo_handle} onChange={update('venmo_handle')} />
        </div>
        <FormField label="Cohort graduated from" value={form.cohort_graduated} onChange={update('cohort_graduated')} />

        {message && <p className="text-green-700 text-xs">{message}</p>}
        {error && <p className="text-red-700 text-xs">{error}</p>}

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="bg-navy text-white px-6 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-navy/85 disabled:opacity-70 transition-colors">
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>

      {/* Login & Security */}
      <div>
        <h2 className="font-heading text-xl font-bold text-navy mb-1">Login & Security</h2>
        <p className="text-charcoal/60 text-sm">If someone set this account up for you, change your email and password here so only you can access it.</p>
      </div>

      <form onSubmit={handleEmailChange} className="bg-white border border-cream-dark p-6 md:p-8 space-y-4">
        <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-charcoal/60">Login email</p>
        <p className="text-charcoal/70 text-sm">
          Currently signed in as <span className="font-mono text-navy break-all">{ambassador.email}</span>. Enter a new email below — we'll send a confirmation link to that address. Until you click it, keep signing in with your current email.
        </p>
        <FormField
          label="New email"
          type="email"
          value={emailForm.new_email}
          onChange={(e) => setEmailForm({ new_email: e.target.value })}
          required
        />
        {emailMsg && <p className="text-green-700 text-xs">{emailMsg}</p>}
        {emailErr && <p className="text-red-700 text-xs">{emailErr}</p>}
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={emailSaving} className="bg-navy text-white px-6 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-navy/85 disabled:opacity-70 transition-colors">
            {emailSaving ? 'Sending…' : 'Send confirmation link'}
          </button>
        </div>
      </form>

      <form onSubmit={handlePasswordChange} className="bg-white border border-cream-dark p-6 md:p-8 space-y-4">
        <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-charcoal/60">Password</p>
        <p className="text-charcoal/70 text-sm">Set a new password (at least 8 characters). The change is immediate.</p>
        <FormField
          label="New password"
          type="password"
          value={pwForm.new_password}
          onChange={(e) => setPwForm((f) => ({ ...f, new_password: e.target.value }))}
          required
          minLength={8}
          autoComplete="new-password"
        />
        <FormField
          label="Confirm new password"
          type="password"
          value={pwForm.confirm_password}
          onChange={(e) => setPwForm((f) => ({ ...f, confirm_password: e.target.value }))}
          required
          minLength={8}
          autoComplete="new-password"
        />
        {pwMsg && <p className="text-green-700 text-xs">{pwMsg}</p>}
        {pwErr && <p className="text-red-700 text-xs">{pwErr}</p>}
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={pwSaving} className="bg-navy text-white px-6 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-navy/85 disabled:opacity-70 transition-colors">
            {pwSaving ? 'Updating…' : 'Update password'}
          </button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-charcoal/60 text-xs">
          Questions? Reach Tracy at{' '}
          <a href={`mailto:${TRACY_EMAIL}`} className="text-navy font-semibold underline decoration-gold/60 underline-offset-2 hover:decoration-gold">
            {TRACY_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
}

function Readonly({ label, value }) {
  return (
    <div>
      <p className="text-charcoal/55 text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-1">{label}</p>
      <p className="text-charcoal text-sm break-all">{value}</p>
    </div>
  );
}

/* ────────────────────────── Finish setup (edge case) ────────────────────────── */

function FinishSetup({ userId, email, initial, onDone, error: initialError }) {
  const [form, setForm] = useState({
    full_name: initial?.full_name || '',
    phone: initial?.phone || '',
    venmo_handle: initial?.venmo_handle || '',
    cohort_graduated: initial?.cohort_graduated || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(initialError || '');
  const prefilled = !!initial?.full_name;

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const { error: insertError } = await supabase.from('ambassadors').insert({
      user_id: userId,
      email: email,
      full_name: form.full_name.trim(),
      phone: form.phone.trim() || null,
      venmo_handle: form.venmo_handle.trim() || null,
      cohort_graduated: form.cohort_graduated.trim() || null,
      status: 'pending',
    });

    // Duplicate key means a row already exists for this user — just reload
    // and land on the dashboard instead of erroring.
    if (insertError && insertError.code !== '23505') {
      setError(insertError.message);
      setSaving(false);
      return;
    }
    onDone();
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full bg-white border border-cream-dark p-8">
        <h1 className="font-heading text-2xl font-bold text-navy mb-1">
          {prefilled ? 'Confirm your details' : 'Finish setting up'}
        </h1>
        <p className="text-charcoal/65 text-sm mb-6">
          {prefilled
            ? 'We pre-filled this from your signup — just hit Submit to send it to Tracy for approval.'
            : 'Just a few more details so Tracy can approve your Ambassador account.'}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Full name" value={form.full_name} onChange={update('full_name')} required />
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Phone" type="tel" value={form.phone} onChange={update('phone')} />
            <FormField label="Venmo handle" value={form.venmo_handle} onChange={update('venmo_handle')} />
          </div>
          <FormField label="Cohort graduated from" value={form.cohort_graduated} onChange={update('cohort_graduated')} />

          {error && <p className="text-red-700 text-xs">{error}</p>}
          <button type="submit" disabled={saving} className="w-full bg-gold text-navy px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/90 disabled:opacity-70 transition-colors">
            {saving ? 'Saving…' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
