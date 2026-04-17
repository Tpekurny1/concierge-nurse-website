import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const STATUS_COLORS = {
  draft: 'bg-cream text-charcoal/60 border-cream-dark',
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  sending: 'bg-amber-50 text-amber-700 border-amber-200',
  sent: 'bg-green-50 text-green-700 border-green-200',
};

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    const { data } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });
    setCampaigns(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load(true);
  }, [load]);

  async function handleDelete(e, campaign) {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Delete "${campaign.name}"? This cannot be undone.`)) return;

    setDeletingId(campaign.id);
    await supabase.from('campaign_recipients').delete().eq('campaign_id', campaign.id);
    await supabase.from('campaign_stats').delete().eq('campaign_id', campaign.id);
    await supabase.from('campaigns').delete().eq('id', campaign.id);
    setDeletingId(null);
    await load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-navy">Campaigns</h1>
        <div className="flex gap-3">
          <Link to="/admin/campaigns/sms/new" className="btn-navy text-sm no-underline flex items-center gap-2">
            <Plus size={16} /> New SMS
          </Link>
          <Link to="/admin/campaigns/email/new" className="btn-primary text-sm no-underline flex items-center gap-2">
            <Plus size={16} /> New Email
          </Link>
        </div>
      </div>

      <div className="bg-white border border-cream-dark overflow-hidden">
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate text-sm">Loading...</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-slate text-sm">No campaigns yet. Create your first campaign to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark text-left">
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Name</th>
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Type</th>
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Status</th>
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Recipients</th>
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Sent</th>
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Created</th>
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-5 py-3">
                      <Link to={`/admin/campaigns/${c.id}`} className="text-navy font-semibold no-underline hover:text-gold">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase border ${
                        c.type === 'email' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {c.type}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase border ${STATUS_COLORS[c.status] || STATUS_COLORS.draft}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate">{c.recipient_count || 0}</td>
                    <td className="px-5 py-3 text-slate text-xs">
                      {c.sent_at ? new Date(c.sent_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-3 text-slate text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, c)}
                        disabled={deletingId === c.id}
                        aria-label={`Delete campaign ${c.name}`}
                        className="p-1.5 text-charcoal/40 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
