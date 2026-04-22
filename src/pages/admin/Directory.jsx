import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, ExternalLink, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Directory() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [specialties, setSpecialties] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    let query = supabase
      .from('directory_members')
      .select('*')
      .order('display_order', { ascending: true })
      .order('name', { ascending: true });

    if (statusFilter !== 'all') query = query.eq('status', statusFilter);
    if (specialtyFilter !== 'all') query = query.eq('specialty', specialtyFilter);
    if (search) {
      query = query.or(`name.ilike.%${search}%,business_name.ilike.%${search}%,location.ilike.%${search}%`);
    }

    const { data } = await query;
    setMembers(data || []);

    // Collect distinct specialties for the filter dropdown
    const { data: specialtyData } = await supabase
      .from('directory_members')
      .select('specialty')
      .not('specialty', 'is', null);
    const distinct = [...new Set((specialtyData || []).map((r) => r.specialty).filter(Boolean))].sort();
    setSpecialties(distinct);

    setLoading(false);
  }, [search, statusFilter, specialtyFilter]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleStatus(id, current) {
    const next = current === 'active' ? 'hidden' : 'active';
    await supabase.from('directory_members').update({ status: next }).eq('id', id);
    load();
  }

  async function moveOrder(id, direction) {
    const idx = members.findIndex((m) => m.id === id);
    if (idx < 0) return;
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= members.length) return;
    const a = members[idx];
    const b = members[target];
    await supabase.from('directory_members').update({ display_order: b.display_order }).eq('id', a.id);
    await supabase.from('directory_members').update({ display_order: a.display_order }).eq('id', b.id);
    load();
  }

  async function handleDelete(id) {
    await supabase.from('directory_members').delete().eq('id', id);
    setDeletingId(null);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-navy">Directory</h1>
        <Link to="/admin/directory/new" className="btn-primary text-sm flex items-center gap-2 no-underline">
          <Plus size={14} /> Add Member
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
          <input
            type="text"
            placeholder="Search by name, business, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
          className="px-4 py-2.5 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold"
        >
          <option value="all">All Specialties</option>
          {specialties.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>

      {/* List */}
      <div className="bg-white border border-cream-dark">
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate text-sm">Loading...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-slate text-sm mb-4">No directory members yet.</p>
            <Link to="/admin/directory/new" className="btn-primary text-sm inline-flex items-center gap-2 no-underline">
              <Plus size={14} /> Add your first member
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-cream-dark">
            {members.map((m, idx) => (
              <div key={m.id} className="px-5 py-4 hover:bg-cream/30 transition-colors flex items-start gap-4">
                <div className="flex flex-col gap-1 pt-1">
                  <button
                    onClick={() => moveOrder(m.id, 'up')}
                    disabled={idx === 0}
                    className="p-1 text-charcoal/40 hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    onClick={() => moveOrder(m.id, 'down')}
                    disabled={idx === members.length - 1}
                    className="p-1 text-charcoal/40 hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <Link
                      to={`/admin/directory/${m.id}/edit`}
                      className="font-heading text-base font-bold text-navy hover:text-gold no-underline"
                    >
                      {m.name}
                    </Link>
                    {m.credentials && (
                      <span className="text-[0.65rem] text-gold font-semibold tracking-wider">{m.credentials}</span>
                    )}
                    {m.status === 'hidden' && (
                      <span className="inline-block px-2 py-0.5 text-[0.55rem] font-semibold tracking-wider uppercase bg-slate-100 text-slate-600 border border-slate-200">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-charcoal mb-1">{m.business_name || <span className="italic text-slate">No business name</span>}</p>
                  {m.specialty && (
                    <span className="inline-block text-[0.6rem] uppercase tracking-wider text-gold font-semibold">
                      {m.specialty}
                    </span>
                  )}
                  <p className="text-[0.65rem] text-charcoal/40 mt-1">{m.location || '—'}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleStatus(m.id, m.status)}
                    className="p-2 text-charcoal/60 hover:text-gold transition-colors"
                    title={m.status === 'active' ? 'Hide from public' : 'Show on public directory'}
                  >
                    {m.status === 'active' ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  {m.website_url && (
                    <a
                      href={m.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-charcoal/60 hover:text-gold transition-colors"
                      title="Visit website"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <Link
                    to={`/admin/directory/${m.id}/edit`}
                    className="p-2 text-charcoal/60 hover:text-gold transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </Link>
                  {deletingId === m.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="px-2 py-1 bg-red-600 text-white text-[0.65rem] hover:bg-red-700 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="px-2 py-1 text-charcoal/60 text-[0.65rem] hover:text-charcoal"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeletingId(m.id)}
                      className="p-2 text-charcoal/60 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
