import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Play, Pause, Trash2, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const STATUS_COLORS = {
  draft: 'bg-cream text-charcoal/60 border-cream-dark',
  active: 'bg-green-50 text-green-700 border-green-200',
  paused: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function SequenceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sequence, setSequence] = useState(null);
  const [emails, setEmails] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [contacts, setContacts] = useState({});
  const [sendCounts, setSendCounts] = useState({});
  const [triggerTagName, setTriggerTagName] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionPending, setActionPending] = useState(false);
  const [actionError, setActionError] = useState('');

  async function load() {
    setLoading(true);
    const { data: seq } = await supabase.from('sequences').select('*').eq('id', id).single();
    if (!seq) {
      setLoading(false);
      return;
    }
    setSequence(seq);

    const [{ data: seqEmails }, { data: seqEnrollments }, { data: tag }] = await Promise.all([
      supabase.from('sequence_emails').select('*').eq('sequence_id', id).order('position', { ascending: true }),
      supabase.from('sequence_enrollments').select('*').eq('sequence_id', id).order('enrolled_at', { ascending: false }),
      seq.trigger_tag_id
        ? supabase.from('tags').select('name').eq('id', seq.trigger_tag_id).single()
        : Promise.resolve({ data: null }),
    ]);

    setEmails(seqEmails || []);
    setEnrollments(seqEnrollments || []);
    setTriggerTagName(tag?.name || '');

    // Load contacts for enrollments
    const contactIds = [...new Set((seqEnrollments || []).map((e) => e.contact_id))];
    if (contactIds.length > 0) {
      const { data: contactList } = await supabase
        .from('contacts')
        .select('id, email, first_name, last_name')
        .in('id', contactIds);
      const map = {};
      (contactList || []).forEach((c) => { map[c.id] = c; });
      setContacts(map);
    }

    // Load send counts per email
    const emailIds = (seqEmails || []).map((e) => e.id);
    if (emailIds.length > 0) {
      const { data: sends } = await supabase
        .from('sequence_sends')
        .select('sequence_email_id')
        .in('sequence_email_id', emailIds);
      const counts = {};
      (sends || []).forEach((s) => {
        counts[s.sequence_email_id] = (counts[s.sequence_email_id] || 0) + 1;
      });
      setSendCounts(counts);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function setStatus(newStatus) {
    if (!sequence) return;
    setActionPending(true);
    setActionError('');
    const { error } = await supabase
      .from('sequences')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', sequence.id);
    if (error) {
      setActionError(error.message);
    } else {
      setSequence({ ...sequence, status: newStatus });
    }
    setActionPending(false);
  }

  async function handleDelete() {
    if (!sequence) return;
    if (!window.confirm(`Delete "${sequence.name}" and all its emails/enrollments? This cannot be undone.`)) return;
    setActionPending(true);
    setActionError('');
    const { error } = await supabase.from('sequences').delete().eq('id', sequence.id);
    if (error) {
      setActionError(error.message);
      setActionPending(false);
      return;
    }
    navigate('/admin/sequences');
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Loading…</p>
      </div>
    );
  }

  if (!sequence) {
    return (
      <div>
        <p className="text-slate text-sm mb-4">Sequence not found.</p>
        <Link to="/admin/sequences" className="text-gold text-sm">Back to sequences</Link>
      </div>
    );
  }

  const active = enrollments.filter((e) => e.status === 'active').length;
  const completedCount = enrollments.filter((e) => e.status === 'completed').length;
  const totalSends = Object.values(sendCounts).reduce((sum, n) => sum + n, 0);

  return (
    <div>
      <Link to="/admin/sequences" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-navy no-underline mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to sequences
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">{sequence.name}</h1>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className={`inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase border ${STATUS_COLORS[sequence.status] || STATUS_COLORS.draft}`}>
              {sequence.status}
            </span>
            {triggerTagName && (
              <span className="text-slate text-xs">Trigger tag: <span className="text-navy font-semibold">{triggerTagName}</span></span>
            )}
          </div>
          {sequence.description && (
            <p className="text-sm text-charcoal/70 mt-3 max-w-2xl">{sequence.description}</p>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link
            to={`/admin/sequences/${sequence.id}/edit`}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider uppercase border border-cream-dark text-charcoal/70 hover:border-gold hover:text-navy transition-colors no-underline"
          >
            <Edit3 size={14} /> Edit
          </Link>
          {sequence.status !== 'active' ? (
            <button
              type="button"
              onClick={() => setStatus('active')}
              disabled={actionPending}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider uppercase border border-green-300 text-green-700 hover:bg-green-50 transition-colors disabled:opacity-50"
            >
              <Play size={14} /> Activate
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStatus('paused')}
              disabled={actionPending}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider uppercase border border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors disabled:opacity-50"
            >
              <Pause size={14} /> Pause
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={actionPending}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider uppercase border border-red-300 text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {actionError && (
        <div className="bg-red-50 border border-red-200 p-3 text-red-700 text-sm mb-6">{actionError}</div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-cream-dark p-4">
          <p className="text-2xl font-bold text-navy">{enrollments.length}</p>
          <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Total Enrolled</p>
        </div>
        <div className="bg-white border border-cream-dark p-4">
          <p className="text-2xl font-bold text-navy">{active}</p>
          <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Active</p>
        </div>
        <div className="bg-white border border-cream-dark p-4">
          <p className="text-2xl font-bold text-navy">{completedCount}</p>
          <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Completed</p>
        </div>
        <div className="bg-white border border-cream-dark p-4">
          <p className="text-2xl font-bold text-navy">{totalSends}</p>
          <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Emails Sent</p>
        </div>
      </div>

      {/* Emails */}
      <div className="bg-white border border-cream-dark p-6 mb-8">
        <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">Email Timeline</h3>
        {emails.length === 0 ? (
          <p className="text-slate text-sm">No emails in this sequence yet. Edit to add some.</p>
        ) : (
          <div className="space-y-3">
            {emails.map((email, idx) => (
              <div key={email.id} className="flex items-center gap-4 border border-cream-dark p-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-navy text-white text-xs font-semibold shrink-0">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy truncate">{email.subject || <span className="text-charcoal/40">Untitled</span>}</p>
                  <p className="text-xs text-charcoal/50">
                    {idx === 0
                      ? `Day ${email.delay_days || 0} — after enrollment`
                      : `+${email.delay_days || 0} days after previous`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="inline-flex items-center gap-1 text-sm text-charcoal">
                    <Mail size={14} className="text-charcoal/40" /> {sendCounts[email.id] || 0} sent
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enrollments */}
      <div className="bg-white border border-cream-dark">
        <div className="px-6 py-4 border-b border-cream-dark">
          <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Enrolled Contacts</h3>
        </div>
        {enrollments.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-slate text-sm">No one enrolled yet. Contacts enter the sequence when they get the trigger tag.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark text-left">
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Contact</th>
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Status</th>
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Progress</th>
                  <th className="px-5 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Enrolled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark">
                {enrollments.map((enrollment) => {
                  const contact = contacts[enrollment.contact_id];
                  return (
                    <tr key={enrollment.id} className="hover:bg-cream/30 transition-colors">
                      <td className="px-5 py-3">
                        {contact ? (
                          <Link to={`/admin/leads/${contact.id}`} className="text-navy font-semibold no-underline hover:text-gold">
                            {[contact.first_name, contact.last_name].filter(Boolean).join(' ') || contact.email}
                          </Link>
                        ) : (
                          <span className="text-slate">Unknown contact</span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase border ${
                          enrollment.status === 'active'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : enrollment.status === 'completed'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-cream text-charcoal/60 border-cream-dark'
                        }`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate">
                        Email {Math.min(enrollment.current_position + 1, emails.length)} of {emails.length}
                      </td>
                      <td className="px-5 py-3 text-slate text-xs">
                        {new Date(enrollment.enrolled_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
