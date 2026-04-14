import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Mail, TrendingUp, RefreshCw, Eye, BarChart3, Globe, GitBranch } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const RANGE_OPTIONS = [
  { label: '7 Days', value: 7 },
  { label: '30 Days', value: 30 },
  { label: '90 Days', value: 90 },
];

function daysAgo(n) {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, thisWeek: 0, subscribers: 0, consulting: 0 });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasLoaded = useRef(false);

  // Pipeline state
  const [pipelineSummary, setPipelineSummary] = useState([]);

  // Analytics state
  const [range, setRange] = useState(7);
  const [viewStats, setViewStats] = useState({ today: 0, period: 0, unique: 0 });
  const [chartData, setChartData] = useState([]);
  const [topPages, setTopPages] = useState([]);

  const loadLeads = useCallback(async () => {
    if (!hasLoaded.current) setLoading(true);
    const weekAgo = daysAgo(7);

    const [
      { count: total },
      { count: thisWeek },
      { data: recent },
    ] = await Promise.all([
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase.from('contacts').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
      supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(10),
    ]);

    const { data: tagCounts } = await supabase
      .from('contact_tags')
      .select('tag_id, tags(name)')
      .order('created_at', { ascending: false });

    const subscriberCount = tagCounts?.filter(
      (t) => t.tags?.name === 'Newsletter Subscriber' || t.tags?.name === 'Community Signup'
    ).length || 0;

    const consultingCount = tagCounts?.filter(
      (t) => t.tags?.name === 'Consulting Inquiry'
    ).length || 0;

    setStats({ total: total || 0, thisWeek: thisWeek || 0, subscribers: subscriberCount, consulting: consultingCount });
    setRecentLeads(recent || []);
    setLoading(false);
    hasLoaded.current = true;
  }, []);

  const loadAnalytics = useCallback(async () => {
    const periodStart = daysAgo(range);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Fetch page views for the period
    const { data: views } = await supabase
      .from('page_views')
      .select('path, created_at')
      .gte('created_at', periodStart)
      .order('created_at', { ascending: true });

    if (!views) {
      setViewStats({ today: 0, period: 0, unique: 0 });
      setChartData([]);
      setTopPages([]);
      return;
    }

    // Today count
    const todayCount = views.filter((v) => new Date(v.created_at) >= todayStart).length;

    // Unique paths (rough unique visitors proxy — unique path+day combos)
    const uniqueDays = new Set();
    views.forEach((v) => {
      const day = new Date(v.created_at).toDateString();
      uniqueDays.add(day);
    });

    setViewStats({
      today: todayCount,
      period: views.length,
      unique: uniqueDays.size,
    });

    // Build chart data — group by day
    const dayMap = {};
    // Pre-fill all days in range
    for (let i = range - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().slice(0, 10);
      dayMap[key] = { date: key, count: 0 };
    }
    views.forEach((v) => {
      const key = v.created_at.slice(0, 10);
      if (dayMap[key]) dayMap[key].count++;
    });
    setChartData(Object.values(dayMap));

    // Top pages
    const pageCounts = {};
    views.forEach((v) => {
      pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
    });
    const sorted = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([path, count]) => ({ path, count }));
    setTopPages(sorted);
  }, [range]);

  useEffect(() => {
    loadLeads();

    const channel = supabase
      .channel('dashboard-contacts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => {
        loadLeads();
      })
      .subscribe();

    const interval = setInterval(() => loadLeads(), 10000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [loadLeads]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  // Load pipeline summary
  useEffect(() => {
    async function loadPipelines() {
      const { data: pipelines } = await supabase.from('pipelines').select('id, name, stages').order('created_at');
      if (!pipelines) return;

      const { data: allPc } = await supabase.from('pipeline_contacts').select('pipeline_id, stage');

      const summary = pipelines.map((p) => {
        const stages = typeof p.stages === 'string' ? JSON.parse(p.stages) : p.stages;
        const contacts = (allPc || []).filter((pc) => pc.pipeline_id === p.id);
        const stageCounts = {};
        stages.forEach((s) => { stageCounts[s] = 0; });
        contacts.forEach((pc) => {
          if (stageCounts[pc.stage] !== undefined) stageCounts[pc.stage]++;
        });
        return { id: p.id, name: p.name, stages, stageCounts, total: contacts.length };
      });

      setPipelineSummary(summary);
    }
    loadPipelines();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Loading dashboard...</p>
      </div>
    );
  }

  const maxChart = Math.max(...chartData.map((d) => d.count), 1);

  const leadCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-navy' },
    { label: 'New This Week', value: stats.thisWeek, icon: UserPlus, color: 'text-green-600' },
    { label: 'Subscribers', value: stats.subscribers, icon: Mail, color: 'text-blue-600' },
    { label: 'Consulting', value: stats.consulting, icon: TrendingUp, color: 'text-gold' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-navy">Dashboard</h1>
        <button onClick={() => { loadLeads(); loadAnalytics(); }} className="flex items-center gap-2 text-sm text-charcoal/40 hover:text-navy transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Lead stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {leadCards.map((s) => (
          <div key={s.label} className="bg-white border border-cream-dark p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">
                {s.label}
              </span>
              <s.icon size={18} className={s.color} />
            </div>
            <p className="font-heading text-3xl font-bold text-navy">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Website Analytics ── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-gold" />
            <h2 className="font-heading text-lg font-bold text-navy">Website Traffic</h2>
          </div>
          <div className="flex border border-cream-dark">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRange(opt.value)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  range === opt.value
                    ? 'bg-navy text-gold'
                    : 'bg-white text-charcoal/50 hover:text-charcoal'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visitor stat cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-cream-dark p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Today</span>
              <Eye size={16} className="text-green-500" />
            </div>
            <p className="font-heading text-2xl font-bold text-navy">{viewStats.today}</p>
            <p className="text-[0.65rem] text-charcoal/30 mt-1">page views</p>
          </div>
          <div className="bg-white border border-cream-dark p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Last {range} Days</span>
              <BarChart3 size={16} className="text-blue-500" />
            </div>
            <p className="font-heading text-2xl font-bold text-navy">{viewStats.period}</p>
            <p className="text-[0.65rem] text-charcoal/30 mt-1">total page views</p>
          </div>
          <div className="bg-white border border-cream-dark p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Active Days</span>
              <Globe size={16} className="text-gold" />
            </div>
            <p className="font-heading text-2xl font-bold text-navy">{viewStats.unique}</p>
            <p className="text-[0.65rem] text-charcoal/30 mt-1">days with traffic</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bar chart */}
          <div className="lg:col-span-2 bg-white border border-cream-dark p-6">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">Daily Page Views</h3>
            {chartData.length === 0 ? (
              <p className="text-slate text-sm py-8 text-center">No data yet. Views will appear as visitors browse the site.</p>
            ) : (
              <div className="flex items-end gap-[2px] h-44">
                {chartData.map((d) => {
                  const height = maxChart > 0 ? (d.count / maxChart) * 100 : 0;
                  return (
                    <div key={d.date} className="flex-1 flex flex-col items-center group relative">
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                        <div className="bg-navy text-white text-[0.6rem] px-2 py-1 whitespace-nowrap">
                          {formatDate(d.date)}: {d.count} views
                        </div>
                      </div>
                      <div
                        className="w-full bg-gold/70 hover:bg-gold transition-colors rounded-t-sm min-h-[2px]"
                        style={{ height: `${Math.max(height, 1)}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {chartData.length > 0 && (
              <div className="flex justify-between mt-2">
                <span className="text-[0.6rem] text-charcoal/30">{formatDate(chartData[0]?.date)}</span>
                <span className="text-[0.6rem] text-charcoal/30">{formatDate(chartData[chartData.length - 1]?.date)}</span>
              </div>
            )}
          </div>

          {/* Top pages */}
          <div className="bg-white border border-cream-dark p-6">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">Top Pages</h3>
            {topPages.length === 0 ? (
              <p className="text-slate text-sm">No data yet.</p>
            ) : (
              <div className="space-y-3">
                {topPages.map((p, i) => {
                  const pct = viewStats.period > 0 ? (p.count / viewStats.period) * 100 : 0;
                  return (
                    <div key={p.path}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-charcoal truncate max-w-[70%]" title={p.path}>
                          {p.path === '/' ? 'Homepage' : p.path}
                        </span>
                        <span className="text-xs text-charcoal/50 shrink-0 ml-2">{p.count}</span>
                      </div>
                      <div className="w-full bg-cream h-1.5">
                        <div
                          className="h-full bg-gold/60 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Pipeline Summary ── */}
      {pipelineSummary.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <GitBranch size={18} className="text-gold" />
              <h2 className="font-heading text-lg font-bold text-navy">Pipelines</h2>
            </div>
            <Link to="/admin/pipelines" className="text-gold text-sm font-semibold no-underline hover:underline">
              View Board
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {pipelineSummary.map((p) => (
              <div key={p.id} className="bg-white border border-cream-dark p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-base font-bold text-navy">{p.name}</h3>
                  <span className="text-[0.65rem] font-semibold text-charcoal/30">{p.total} total</span>
                </div>
                <div className="space-y-2">
                  {p.stages.map((stage) => {
                    const count = p.stageCounts[stage] || 0;
                    const pct = p.total > 0 ? (count / p.total) * 100 : 0;
                    return (
                      <div key={stage} className="flex items-center gap-3">
                        <span className="text-xs text-charcoal/50 w-28 shrink-0 truncate">{stage}</span>
                        <div className="flex-1 bg-cream h-2">
                          <div className="h-full bg-gold/60 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-charcoal/40 w-6 text-right shrink-0">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent leads */}
      <div className="bg-white border border-cream-dark">
        <div className="px-6 py-4 border-b border-cream-dark flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-navy">Recent Leads</h2>
          <Link to="/admin/leads" className="text-gold text-sm font-semibold no-underline hover:underline">
            View All
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-slate text-sm">No leads yet. They will appear here once someone submits a form.</p>
          </div>
        ) : (
          <div className="divide-y divide-cream-dark">
            {recentLeads.map((lead) => (
              <Link
                key={lead.id}
                to={`/admin/leads/${lead.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-cream/50 transition-colors no-underline"
              >
                <div>
                  <p className="text-navy font-semibold text-sm">
                    {lead.first_name || ''} {lead.last_name || ''}
                    {!lead.first_name && !lead.last_name && <span className="text-slate italic">No name</span>}
                  </p>
                  <p className="text-slate text-xs">{lead.email}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase bg-cream text-charcoal/60 border border-cream-dark">
                    {lead.lifecycle_stage || 'Explorer'}
                  </span>
                  <p className="text-slate text-[0.65rem] mt-1">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
