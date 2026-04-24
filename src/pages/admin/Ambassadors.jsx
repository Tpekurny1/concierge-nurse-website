import { useCallback, useEffect, useState } from 'react';
import { Search, Check, Pause, Play, Star, Award, UserCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const dollars = (cents) => `$${((cents ?? 0) / 100).toLocaleString('en-US')}`;

export default function AdminAmbassadors() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    let q = supabase.from('ambassadors').select('*').order('created_at', { ascending: false });
    if (statusFilter !== 'all') q = q.eq('status', statusFilter);
    if (search) q = q.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,referral_code.ilike.%${search}%`);
    const { data } = await q;
    setRows(data || []);
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id, next) {
    await supabase.from('ambassadors').update({ status: next }).eq('id', id);
    load();
  }

  async function toggleFounding(id, current) {
    const patch = { founding_ambassador: !current };
    if (!current) patch.founding_ambassador_at = new Date().toISOString();
    await supabase.from('ambassadors').update(patch).eq('id', id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Ambassadors</h1>
          <p className="text-charcoal/60 text-sm mt-1">{rows.length} total · {rows.filter((r) => r.status === 'pending').length} pending approval</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
          <input
            type="text"
            placeholder="Search name, email, or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="removed">Removed</option>
        </select>
      </div>

      <div className="bg-white border border-cream-dark">
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-charcoal/60 text-sm">Loading…</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-charcoal/60">No ambassadors match.</p>
          </div>
        ) : (
          <ul className="divide-y divide-cream-dark">
            {rows.map((a) => (
              <li key={a.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold text-navy">{a.full_name}</p>
                      <StatusBadge status={a.status} />
                      {a.founding_ambassador && (
                        <span className="inline-flex items-center gap-1 bg-gold/20 text-navy px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.1em] uppercase">
                          <Star size={10} fill="currentColor" /> Founding
                        </span>
                      )}
                    </div>
                    <p className="text-charcoal/70 text-sm">{a.email}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-charcoal/55 text-xs">
                      <span>Code: <span className="font-mono text-charcoal">{a.referral_code || '—'}</span></span>
                      <span>Cohort: {a.cohort_graduated || '—'}</span>
                      <span>Venmo: {a.venmo_handle || '—'}</span>
                      <span>Ref: {a.lifetime_referrals}</span>
                      <span>Earned: {dollars(a.lifetime_earned_cents)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {a.status === 'pending' && (
                      <button onClick={() => updateStatus(a.id, 'active')} className="inline-flex items-center gap-1.5 bg-navy text-white px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase hover:bg-navy/85 transition-colors">
                        <UserCheck size={12} /> Approve
                      </button>
                    )}
                    {a.status === 'active' && (
                      <button onClick={() => updateStatus(a.id, 'paused')} className="inline-flex items-center gap-1.5 border border-cream-dark text-charcoal px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase hover:bg-cream-dark transition-colors">
                        <Pause size={12} /> Pause
                      </button>
                    )}
                    {a.status === 'paused' && (
                      <button onClick={() => updateStatus(a.id, 'active')} className="inline-flex items-center gap-1.5 bg-navy text-white px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase hover:bg-navy/85 transition-colors">
                        <Play size={12} /> Unpause
                      </button>
                    )}
                    <button
                      onClick={() => toggleFounding(a.id, a.founding_ambassador)}
                      className="inline-flex items-center gap-1.5 border border-cream-dark text-charcoal px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase hover:bg-cream-dark transition-colors"
                      title="Toggle Founding Ambassador badge"
                    >
                      <Award size={12} /> {a.founding_ambassador ? 'Remove Badge' : 'Grant Badge'}
                    </button>
                    <button
                      onClick={() => setSelectedId(selectedId === a.id ? null : a.id)}
                      className="text-charcoal/60 hover:text-charcoal text-[0.65rem] font-semibold tracking-[0.15em] uppercase px-2"
                    >
                      {selectedId === a.id ? 'Close' : 'Edit'}
                    </button>
                  </div>
                </div>

                {selectedId === a.id && <InlineEditor ambassador={a} onSaved={() => { setSelectedId(null); load(); }} />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: 'bg-gold/20 text-navy',
    active: 'bg-green-100 text-green-800',
    paused: 'bg-cream-dark text-charcoal/70',
    removed: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.1em] uppercase ${map[status] || 'bg-cream-dark'}`}>
      {status}
    </span>
  );
}

function InlineEditor({ ambassador, onSaved }) {
  const [form, setForm] = useState({
    referral_code: ambassador.referral_code || '',
    venmo_handle: ambassador.venmo_handle || '',
    cohort_graduated: ambassador.cohort_graduated || '',
    notes: ambassador.notes || '',
    featured_in_directory: !!ambassador.featured_in_directory,
  });
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await supabase.from('ambassadors').update({
      referral_code: form.referral_code.trim() || null,
      venmo_handle: form.venmo_handle.trim() || null,
      cohort_graduated: form.cohort_graduated.trim() || null,
      notes: form.notes.trim() || null,
      featured_in_directory: form.featured_in_directory,
    }).eq('id', ambassador.id);
    setSaving(false);
    onSaved();
  }

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  return (
    <div className="mt-4 pt-4 border-t border-cream-dark grid md:grid-cols-2 gap-4">
      <AdminField label="Referral Code" value={form.referral_code} onChange={upd('referral_code')} placeholder="Auto-assigns on approval" />
      <AdminField label="Venmo Handle" value={form.venmo_handle} onChange={upd('venmo_handle')} />
      <AdminField label="Cohort Graduated" value={form.cohort_graduated} onChange={upd('cohort_graduated')} />
      <label className="flex items-center gap-2 text-sm text-charcoal pt-6">
        <input type="checkbox" checked={form.featured_in_directory} onChange={upd('featured_in_directory')} className="accent-gold" />
        Featured in Directory
      </label>
      <label className="block md:col-span-2">
        <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-charcoal/55 block mb-1.5">Notes</span>
        <textarea rows={2} value={form.notes} onChange={upd('notes')} className="w-full px-3 py-2 border border-cream-dark bg-cream text-sm focus:outline-none focus:border-gold" />
      </label>
      <div className="md:col-span-2 flex justify-end">
        <button onClick={handleSave} disabled={saving} className="bg-navy text-white px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-navy/85 disabled:opacity-70 transition-colors">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
}

function AdminField({ label, ...rest }) {
  return (
    <label className="block">
      <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-charcoal/55 block mb-1.5">{label}</span>
      <input {...rest} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
    </label>
  );
}
