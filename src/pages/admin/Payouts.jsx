import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const dollars = (cents) => `$${((cents ?? 0) / 100).toLocaleString('en-US')}`;

export default function AdminPayouts() {
  const [payouts, setPayouts] = useState([]);
  const [ambassadors, setAmbassadors] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('due');

  const ambassadorById = useMemo(() => Object.fromEntries(ambassadors.map((a) => [a.id, a])), [ambassadors]);
  const referralById = useMemo(() => Object.fromEntries(referrals.map((r) => [r.id, r])), [referrals]);

  const load = useCallback(async () => {
    setLoading(true);
    const [pRes, aRes, rRes] = await Promise.all([
      (async () => {
        let q = supabase.from('payouts').select('*').order('created_at', { ascending: false });
        if (statusFilter !== 'all') q = q.eq('status', statusFilter);
        return q;
      })(),
      supabase.from('ambassadors').select('id, full_name, email, venmo_handle, referral_code'),
      supabase.from('referrals').select('id, referred_name, referred_email'),
    ]);
    setPayouts(pRes.data || []);
    setAmbassadors(aRes.data || []);
    setReferrals(rRes.data || []);
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  async function markPaid(id, txn) {
    await supabase.from('payouts').update({
      status: 'paid',
      venmo_transaction_id: txn || null,
      paid_at: new Date().toISOString(),
    }).eq('id', id);
    load();
  }

  async function cancel(id) {
    await supabase.from('payouts').update({ status: 'cancelled' }).eq('id', id);
    load();
  }

  const dueTotal = payouts.filter((p) => p.status === 'due').reduce((s, p) => s + p.amount_cents, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Payouts</h1>
          <p className="text-charcoal/60 text-sm mt-1">
            {payouts.length} shown · <span className="text-navy font-semibold">{dollars(dueTotal)}</span> due
          </p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold"
        >
          <option value="due">Due</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="bg-white border border-cream-dark">
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          </div>
        ) : payouts.length === 0 ? (
          <div className="p-16 text-center"><p className="text-charcoal/60">No payouts {statusFilter === 'due' ? 'due' : ''} at the moment.</p></div>
        ) : (
          <ul className="divide-y divide-cream-dark">
            {payouts.map((p) => {
              const amb = ambassadorById[p.ambassador_id];
              const ref = referralById[p.referral_id];
              return (
                <PayoutRow key={p.id} payout={p} ambassador={amb} referral={ref} onMarkPaid={markPaid} onCancel={cancel} />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function PayoutRow({ payout, ambassador, referral, onMarkPaid, onCancel }) {
  const [showForm, setShowForm] = useState(false);
  const [txn, setTxn] = useState('');

  return (
    <li className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <p className="font-heading text-xl font-bold text-navy">{dollars(payout.amount_cents)}</p>
            <PayoutStatusPill status={payout.status} />
            {payout.tier && <span className="text-charcoal/60 text-xs">Tier {payout.tier}</span>}
          </div>
          <p className="text-charcoal/80 text-sm">
            <span className="font-semibold">{ambassador?.full_name || 'Unknown ambassador'}</span>
            {ambassador?.venmo_handle && <> · Venmo <span className="font-mono text-charcoal">{ambassador.venmo_handle}</span></>}
          </p>
          <p className="text-charcoal/55 text-xs mt-1">
            For referral of {referral?.referred_name || '—'}
            {' · '}{payout.cohort_cycle_label || 'No cycle'}
            {payout.paid_at && <> · Paid {new Date(payout.paid_at).toLocaleDateString()}</>}
            {payout.venmo_transaction_id && <> · Txn <span className="font-mono">{payout.venmo_transaction_id}</span></>}
          </p>
        </div>

        {payout.status === 'due' && !showForm && (
          <div className="flex items-center gap-2">
            <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-1.5 bg-navy text-white px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase hover:bg-navy/85 transition-colors">
              <Check size={12} /> Mark Paid
            </button>
            <button onClick={() => onCancel(payout.id)} className="inline-flex items-center gap-1.5 border border-cream-dark text-charcoal/70 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase hover:bg-cream-dark transition-colors">
              <X size={12} /> Cancel
            </button>
          </div>
        )}
      </div>

      {showForm && payout.status === 'due' && (
        <div className="mt-4 pt-4 border-t border-cream-dark flex flex-wrap items-end gap-3">
          <label className="flex-1 min-w-[220px] block">
            <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-charcoal/55 block mb-1.5">Venmo Transaction ID <span className="text-charcoal/40">(optional)</span></span>
            <input value={txn} onChange={(e) => setTxn(e.target.value)} placeholder="Paste the Venmo txn ID" className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold" />
          </label>
          <button onClick={() => onMarkPaid(payout.id, txn)} className="bg-navy text-white px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-navy/85 transition-colors">
            Confirm Paid
          </button>
          <button onClick={() => setShowForm(false)} className="text-charcoal/60 hover:text-charcoal px-2 py-2 text-xs uppercase tracking-[0.2em]">Cancel</button>
        </div>
      )}
    </li>
  );
}

function PayoutStatusPill({ status }) {
  const map = {
    due: 'bg-gold/20 text-navy',
    paid: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.1em] uppercase ${map[status] || 'bg-cream-dark'}`}>
      {status}
    </span>
  );
}
