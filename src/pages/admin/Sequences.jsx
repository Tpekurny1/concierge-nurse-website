import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Workflow } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const STATUS_COLORS = {
  draft: 'bg-cream text-charcoal/60 border-cream-dark',
  active: 'bg-green-50 text-green-700 border-green-200',
  paused: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function Sequences() {
  const [sequences, setSequences] = useState([]);
  const [tagMap, setTagMap] = useState({});
  const [counts, setCounts] = useState({ emails: {}, enrolled: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: seqs }, { data: tags }, { data: emails }, { data: enrollments }] = await Promise.all([
        supabase.from('sequences').select('*').order('created_at', { ascending: false }),
        supabase.from('tags').select('id, name'),
        supabase.from('sequence_emails').select('sequence_id'),
        supabase.from('sequence_enrollments').select('sequence_id'),
      ]);

      setSequences(seqs || []);
      const tm = {};
      (tags || []).forEach((t) => { tm[t.id] = t.name; });
      setTagMap(tm);

      const emailCount = {};
      (emails || []).forEach((e) => { emailCount[e.sequence_id] = (emailCount[e.sequence_id] || 0) + 1; });
      const enrolledCount = {};
      (enrollments || []).forEach((e) => { enrolledCount[e.sequence_id] = (enrolledCount[e.sequence_id] || 0) + 1; });
      setCounts({ emails: emailCount, enrolled: enrolledCount });

      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Sequences</h1>
          <p className="text-slate text-sm mt-1">Automated email workflows triggered by tags.</p>
        </div>
        <Link to="/admin/sequences/new" className="btn-primary text-sm no-underline flex items-center gap-2">
          <Plus size={16} /> New Sequence
        </Link>
      </div>

      {loading ? (
        <div className="p-10 text-center bg-white border border-cream-dark">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate text-sm">Loading...</p>
        </div>
      ) : sequences.length === 0 ? (
        <div className="p-10 text-center bg-white border border-cream-dark">
          <Workflow size={32} className="mx-auto text-charcoal/30 mb-4" />
          <p className="text-slate text-sm mb-2">No sequences yet.</p>
          <p className="text-charcoal/40 text-xs">Create a sequence to automatically send a series of emails to contacts based on a tag.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sequences.map((seq) => (
            <Link
              key={seq.id}
              to={`/admin/sequences/${seq.id}`}
              className="bg-white border border-cream-dark p-6 no-underline hover:border-gold transition-colors block"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-heading font-bold text-navy text-lg">{seq.name}</h3>
                <span className={`inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase border shrink-0 ${STATUS_COLORS[seq.status] || STATUS_COLORS.draft}`}>
                  {seq.status}
                </span>
              </div>
              {seq.description && (
                <p className="text-sm text-charcoal/70 mb-4 line-clamp-2">{seq.description}</p>
              )}
              <div className="flex items-center justify-between text-xs pt-4 border-t border-cream-dark">
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Trigger Tag</p>
                  <p className="text-charcoal">
                    {seq.trigger_tag_id ? (tagMap[seq.trigger_tag_id] || '—') : '—'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Emails</p>
                  <p className="text-charcoal">{counts.emails[seq.id] || 0}</p>
                </div>
                <div className="text-right">
                  <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Enrolled</p>
                  <p className="text-charcoal">{counts.enrolled[seq.id] || 0}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
