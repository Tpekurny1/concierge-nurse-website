import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'enrolled', label: 'Enrolled' },
  { value: 'paid', label: 'Paid' },
  { value: 'declined', label: 'Declined' },
  { value: 'no_response', label: 'No response' },
];

export default function AdminReferrals() {
  const [rows, setRows] = useState([]);
  const [ambassadors, setAmbassadors] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cycleFilter, setCycleFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const ambassadorById = useMemo(() => Object.fromEntries(ambassadors.map((a) => [a.id, a])), [ambassadors]);

  const load = useCallback(async () => {
    setLoading(true);
    const [refsRes, ambRes, cycleRes] = await Promise.all([
      (async () => {
        let q = supabase.from('referrals').select('*').order('created_at', { ascending: false });
        if (statusFilter !== 'all') q = q.eq('status', statusFilter);
        if (cycleFilter !== 'all') q = q.eq('cohort_cycle_id', cycleFilter);
        if (search) q = q.or(`referred_name.ilike.%${search}%,referred_email.ilike.%${search}%`);
        return q;
      })(),
      supabase.from('ambassadors').select('id, full_name, email, referral_code'),
      supabase.from('cohort_cycles').select('*').order('created_at', { ascending: false }),
    ]);
    setRows(refsRes.data || []);
    setAmbassadors(ambRes.data || []);
    setCycles(cycleRes.data || []);
    setLoading(false);
  }, [search, statusFilter, cycleFilter]);

  useEffect(() => { load(); }, [load]);

  async function patchRow(id, patch) {
    await supabase.from('referrals').update(patch).eq('id', id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Referrals</h1>
          <p className="text-charcoal/60 text-sm mt-1">
            {rows.length} shown · {rows.filter((r) => r.status === 'pending').length} awaiting verification
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <select
          value={cycleFilter}
          onChange={(e) => setCycleFilter(e.target.value)}
          className="px-4 py-2.5 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold"
        >
          <option value="all">All Cycles</option>
          {cycles.map((c) => (
            <option key={c.id} value={c.id}>{c.label}{c.is_active ? ' (active)' : ''}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold"
        >
          <option value="all">All Statuses</option>
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div className="bg-white border border-cream-dark">
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          </div>
        ) : rows.length === 0 ? (
          <div className="p-16 text-center"><p className="text-charcoal/60">No referrals match.</p></div>
        ) : (
          <ul className="divide-y divide-cream-dark">
            {rows.map((r) => {
              const amb = ambassadorById[r.ambassador_id];
              const expanded = expandedId === r.id;
              return (
                <li key={r.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-semibold text-navy">{r.referred_name}</p>
                        <StatusPill status={r.status} />
                      </div>
                      <p className="text-charcoal/70 text-sm">{r.referred_email}{r.referred_phone ? ` · ${r.referred_phone}` : ''}</p>
                      <p className="text-charcoal/55 text-xs mt-1">
                        Referred by <span className="text-charcoal">{amb?.full_name || '—'}</span>
                        {amb?.referral_code && <span className="font-mono"> ({amb.referral_code})</span>}
                        {' · '}{r.cohort_cycle_label || 'No cycle'} · Logged {new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedId(expanded ? null : r.id)}
                      className="inline-flex items-center gap-1.5 text-charcoal/60 hover:text-charcoal text-[0.65rem] font-semibold tracking-[0.15em] uppercase"
                    >
                      {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />} {expanded ? 'Collapse' : 'Manage'}
                    </button>
                  </div>

                  {expanded && <ReferralEditor referral={r} onSave={patchRow} />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function ReferralEditor({ referral, onSave }) {
  const [status, setStatus] = useState(referral.status);
  const [enrollmentDate, setEnrollmentDate] = useState(referral.enrollment_date || '');
  const [paymentClearedDate, setPaymentClearedDate] = useState(referral.payment_cleared_date || '');
  const [paymentPlan, setPaymentPlan] = useState(referral.payment_plan);
  const [notes, setNotes] = useState(referral.notes || '');
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await onSave(referral.id, {
      status,
      enrollment_date: enrollmentDate || null,
      payment_cleared_date: paymentClearedDate || null,
      payment_plan: paymentPlan,
      notes: notes.trim() || null,
    });
    setSaving(false);
  }

  return (
    <div className="mt-4 pt-4 border-t border-cream-dark grid md:grid-cols-2 gap-4">
      <label className="block">
        <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-charcoal/55 block mb-1.5">Status</span>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold">
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm text-charcoal pt-6">
        <input type="checkbox" checked={paymentPlan} onChange={(e) => setPaymentPlan(e.target.checked)} className="accent-gold" />
        Payment plan
      </label>
      <label className="block">
        <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-charcoal/55 block mb-1.5">Enrollment Date</span>
        <input type="date" value={enrollmentDate} onChange={(e) => setEnrollmentDate(e.target.value)} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold" />
      </label>
      <label className="block">
        <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-charcoal/55 block mb-1.5">Payment Cleared Date</span>
        <input type="date" value={paymentClearedDate} onChange={(e) => setPaymentClearedDate(e.target.value)} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold" />
      </label>
      <label className="block md:col-span-2">
        <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-charcoal/55 block mb-1.5">Notes</span>
        <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 border border-cream-dark bg-cream text-sm focus:outline-none focus:border-gold" />
      </label>
      <p className="text-charcoal/55 text-xs md:col-span-2">
        Setting status to <strong>Paid</strong> auto-creates a due payout ($300 / $400 / $500 based on cycle tier) and awards the Founding Ambassador badge on the 3rd paid referral.
      </p>
      <div className="md:col-span-2 flex justify-end">
        <button onClick={save} disabled={saving} className="bg-navy text-white px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-navy/85 disabled:opacity-70 transition-colors">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    pending: 'bg-gold/20 text-navy',
    enrolled: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    declined: 'bg-red-100 text-red-800',
    no_response: 'bg-cream-dark text-charcoal/70',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.1em] uppercase ${map[status] || 'bg-cream-dark'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
