import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Download, Trash2, Tag, X, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PAGE_SIZE = 25;

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(new Set());
  const [exporting, setExporting] = useState(false);
  const [tags, setTags] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [sortCol, setSortCol] = useState('created_at');
  const [sortAsc, setSortAsc] = useState(false);

  function handleSort(col) {
    if (sortCol === col) {
      setSortAsc((prev) => !prev);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
    setPage(0);
  }

  const hasLoaded = useRef(false);

  const load = useCallback(async () => {
    if (!hasLoaded.current) setLoading(true);

    let query = supabase
      .from('contacts')
      .select('*', { count: 'exact' })
      .order(sortCol, { ascending: sortAsc })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (search) {
      query = query.or(`email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
    }

    if (filter !== 'all') {
      query = query.eq('lifecycle_stage', filter);
    }

    const { data, count } = await query;

    setLeads(data || []);
    setTotal(count || 0);
    setLoading(false);
    hasLoaded.current = true;
  }, [page, search, filter, sortCol, sortAsc]);

  useEffect(() => {
    load();

    const channel = supabase
      .channel('leads-contacts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => {
        load();
      })
      .subscribe();

    const interval = setInterval(() => load(), 10000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [load]);

  useEffect(() => {
    supabase.from('tags').select('*').order('name').then(({ data }) => setTags(data || []));
  }, []);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === leads.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(leads.map((l) => l.id)));
    }
  }

  function getSelectedLeads() {
    return leads.filter((l) => selected.has(l.id));
  }

  function downloadCSV(contacts, filename) {
    const headers = ['first_name', 'last_name', 'email', 'phone', 'lifecycle_stage', 'status', 'source', 'business_name', 'annual_revenue', 'created_at'];
    const csvRows = [headers.join(',')];
    contacts.forEach((c) => {
      csvRows.push(headers.map((h) => {
        const val = c[h] || '';
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleExportAll() {
    setExporting(true);
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    downloadCSV(data || [], `contacts-export-${new Date().toISOString().slice(0, 10)}.csv`);
    setExporting(false);
  }

  function handleExportSelected() {
    downloadCSV(getSelectedLeads(), `contacts-selected-${new Date().toISOString().slice(0, 10)}.csv`);
  }

  async function handleTagSelected(tagId) {
    const ids = [...selected];
    const rows = ids.map((contact_id) => ({ contact_id, tag_id: tagId }));
    await supabase.from('contact_tags').upsert(rows, { onConflict: 'contact_id,tag_id', ignoreDuplicates: true });
    setSelected(new Set());
  }

  async function handleDeleteSelected() {
    const ids = [...selected];
    await supabase.from('activity_log').delete().in('contact_id', ids);
    await supabase.from('notes').delete().in('contact_id', ids);
    await supabase.from('contact_tags').delete().in('contact_id', ids);
    await supabase.from('contacts').delete().in('id', ids);
    setSelected(new Set());
    setDeleteConfirm(false);
    load();
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy mb-8">Leads</h1>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-10 pr-4 py-2.5 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(0); }}
          className="px-4 py-2.5 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold"
        >
          <option value="all">All Stages</option>
          <option value="Explorer">Explorer</option>
          <option value="DIYer">DIYer</option>
          <option value="Builder">Builder</option>
          <option value="Established Owner">Established Owner</option>
        </select>
        <button
          onClick={handleExportAll}
          disabled={exporting}
          className="btn-navy text-sm flex items-center gap-2 shrink-0"
        >
          <Download size={14} />
          {exporting ? 'Exporting...' : 'Export CSV'}
        </button>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-4 mb-4 px-5 py-3 bg-navy text-white text-sm">
          <span className="font-semibold">{selected.size} selected</span>
          <div className="flex items-center gap-3 ml-auto">
            {/* Tag dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm">
                <Tag size={14} /> Tag
              </button>
              <div className="absolute top-full right-0 mt-1 bg-white border border-cream-dark shadow-lg z-10 min-w-[160px] hidden group-hover:block">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagSelected(tag.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream transition-colors"
                  >
                    {tag.name}
                  </button>
                ))}
                {tags.length === 0 && (
                  <p className="px-4 py-2 text-sm text-slate">No tags yet</p>
                )}
              </div>
            </div>
            <button onClick={handleExportSelected} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm">
              <Download size={14} /> Export
            </button>
            {deleteConfirm ? (
              <div className="flex items-center gap-2">
                <button onClick={handleDeleteSelected} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 transition-colors text-sm">Confirm Delete</button>
                <button onClick={() => setDeleteConfirm(false)} className="px-2 py-1.5 hover:bg-white/20 transition-colors">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button onClick={() => setDeleteConfirm(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-red-600 transition-colors text-sm">
                <Trash2 size={14} /> Delete
              </button>
            )}
            <button onClick={() => setSelected(new Set())} className="px-2 py-1.5 hover:bg-white/20 transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-cream-dark overflow-hidden">
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate text-sm">Loading...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-slate text-sm">No leads found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cream-dark text-left">
                    <th className="px-3 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={selected.size === leads.length && leads.length > 0}
                        onChange={toggleAll}
                        className="accent-gold"
                      />
                    </th>
                    {[
                      { key: 'first_name', label: 'Name' },
                      { key: 'email', label: 'Email' },
                      { key: 'lifecycle_stage', label: 'Stage' },
                      { key: 'source', label: 'Source' },
                      { key: 'created_at', label: 'Date' },
                    ].map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 cursor-pointer select-none hover:text-charcoal transition-colors group"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {col.label}
                          {sortCol === col.key ? (
                            sortAsc ? <ArrowUp size={12} className="text-gold" /> : <ArrowDown size={12} className="text-gold" />
                          ) : (
                            <ArrowUpDown size={12} className="text-charcoal/20 group-hover:text-charcoal/40 transition-colors" />
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-dark">
                  {leads.map((lead) => (
                    <tr key={lead.id} className={`hover:bg-cream/30 transition-colors ${selected.has(lead.id) ? 'bg-cream/50' : ''}`}>
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(lead.id)}
                          onChange={() => toggleSelect(lead.id)}
                          className="accent-gold"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <Link to={`/admin/leads/${lead.id}`} className="text-navy font-semibold no-underline hover:text-gold">
                          {lead.first_name || ''} {lead.last_name || ''}
                          {!lead.first_name && !lead.last_name && <span className="text-slate italic">No name</span>}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-slate">{lead.email}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase bg-cream text-charcoal/60 border border-cream-dark">
                          {lead.lifecycle_stage || 'Explorer'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate">{lead.source || '—'}</td>
                      <td className="px-5 py-3 text-slate text-xs">{new Date(lead.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-cream-dark">
                <p className="text-slate text-xs">{total} total leads</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="p-1.5 hover:bg-cream transition-colors disabled:opacity-30"
                  >
                    <ChevronLeft size={16} className="text-charcoal" />
                  </button>
                  <span className="text-xs text-charcoal">
                    {page + 1} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="p-1.5 hover:bg-cream transition-colors disabled:opacity-30"
                  >
                    <ChevronRight size={16} className="text-charcoal" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
