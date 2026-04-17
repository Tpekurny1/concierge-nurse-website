import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import EmailBodyEditor from '../../components/admin/EmailBodyEditor';

const DEFAULT_META = {
  name: '',
  description: '',
  trigger_tag_id: '',
  from_name: 'Concierge Nurse Business Society',
  from_email: 'hello@conciergenursesociety.com',
  status: 'draft',
};

function newDraftEmail(position) {
  return {
    _draftKey: `draft-${Math.random().toString(36).slice(2)}`,
    id: null,
    position,
    subject: '',
    body: '',
    delay_days: position === 0 ? 0 : 3,
  };
}

export default function SequenceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [tags, setTags] = useState([]);
  const [meta, setMeta] = useState(DEFAULT_META);
  const [emails, setEmails] = useState([]);
  const [expandedKey, setExpandedKey] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const { data: tagData } = await supabase.from('tags').select('*').order('name');
      setTags(tagData || []);

      if (isNew) return;

      const { data: seq } = await supabase.from('sequences').select('*').eq('id', id).single();
      if (!seq) {
        setError('Sequence not found');
        setLoading(false);
        return;
      }

      setMeta({
        name: seq.name || '',
        description: seq.description || '',
        trigger_tag_id: seq.trigger_tag_id || '',
        from_name: seq.from_name || DEFAULT_META.from_name,
        from_email: seq.from_email || DEFAULT_META.from_email,
        status: seq.status || 'draft',
      });

      const { data: seqEmails } = await supabase
        .from('sequence_emails')
        .select('*')
        .eq('sequence_id', id)
        .order('position', { ascending: true });

      setEmails((seqEmails || []).map((e) => ({ ...e, _draftKey: e.id })));
      setLoading(false);
    }
    load();
  }, [id, isNew]);

  function updateEmail(draftKey, patch) {
    setEmails((list) => list.map((e) => (e._draftKey === draftKey ? { ...e, ...patch } : e)));
  }

  function addEmail() {
    setEmails((list) => {
      const next = [...list, newDraftEmail(list.length)];
      setExpandedKey(next[next.length - 1]._draftKey);
      return next;
    });
  }

  function removeEmail(draftKey) {
    if (!window.confirm('Remove this email from the sequence?')) return;
    setEmails((list) => list.filter((e) => e._draftKey !== draftKey).map((e, i) => ({ ...e, position: i })));
  }

  function moveEmail(draftKey, direction) {
    setEmails((list) => {
      const idx = list.findIndex((e) => e._draftKey === draftKey);
      if (idx === -1) return list;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= list.length) return list;
      const next = [...list];
      [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
      return next.map((e, i) => ({ ...e, position: i }));
    });
  }

  async function handleSave() {
    if (!meta.name.trim()) {
      setError('Sequence name is required');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      name: meta.name.trim(),
      description: meta.description.trim() || null,
      trigger_tag_id: meta.trigger_tag_id || null,
      from_name: meta.from_name.trim() || DEFAULT_META.from_name,
      from_email: meta.from_email.trim() || DEFAULT_META.from_email,
      status: meta.status,
      updated_at: new Date().toISOString(),
    };

    let sequenceId = id;

    if (isNew) {
      const { data, error: insErr } = await supabase
        .from('sequences')
        .insert(payload)
        .select()
        .single();
      if (insErr || !data) {
        setError(insErr?.message || 'Failed to create sequence');
        setSaving(false);
        return;
      }
      sequenceId = data.id;
    } else {
      const { error: updErr } = await supabase
        .from('sequences')
        .update(payload)
        .eq('id', sequenceId);
      if (updErr) {
        setError(updErr.message || 'Failed to update sequence');
        setSaving(false);
        return;
      }
    }

    // Replace sequence_emails: delete all existing, insert current list
    await supabase.from('sequence_emails').delete().eq('sequence_id', sequenceId);
    if (emails.length > 0) {
      const rows = emails.map((e, i) => ({
        sequence_id: sequenceId,
        position: i,
        subject: e.subject || '',
        body: e.body || '',
        delay_days: Number.isFinite(+e.delay_days) ? +e.delay_days : 0,
      }));
      const { error: emailErr } = await supabase.from('sequence_emails').insert(rows);
      if (emailErr) {
        setError(emailErr.message || 'Failed to save emails');
        setSaving(false);
        return;
      }
    }

    navigate(`/admin/sequences/${sequenceId}`);
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        to={isNew ? '/admin/sequences' : `/admin/sequences/${id}`}
        className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-navy no-underline mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Back
      </Link>

      <h1 className="font-heading text-2xl font-bold text-navy mb-8">
        {isNew ? 'New Sequence' : 'Edit Sequence'}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 p-3 text-red-700 text-sm mb-6">{error}</div>
      )}

      {/* Meta */}
      <div className="bg-white border border-cream-dark p-6 space-y-4 mb-8">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Sequence Name *</label>
            <input
              type="text"
              value={meta.name}
              onChange={(e) => setMeta({ ...meta, name: e.target.value })}
              className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Status</label>
            <select
              value={meta.status}
              onChange={(e) => setMeta({ ...meta, status: e.target.value })}
              className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Description</label>
          <input
            type="text"
            value={meta.description}
            onChange={(e) => setMeta({ ...meta, description: e.target.value })}
            className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Trigger Tag</label>
            <select
              value={meta.trigger_tag_id}
              onChange={(e) => setMeta({ ...meta, trigger_tag_id: e.target.value })}
              className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="">— No trigger —</option>
              {tags.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <p className="text-[0.65rem] text-charcoal/40 mt-1">When a contact gets this tag, they enter the sequence.</p>
          </div>
          <div>
            <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">From Name</label>
            <input
              type="text"
              value={meta.from_name}
              onChange={(e) => setMeta({ ...meta, from_name: e.target.value })}
              className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">From Email</label>
            <input
              type="email"
              value={meta.from_email}
              onChange={(e) => setMeta({ ...meta, from_email: e.target.value })}
              className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-bold text-navy">Emails</h2>
          <p className="text-xs text-charcoal/50">{emails.length} email{emails.length === 1 ? '' : 's'} in sequence</p>
        </div>

        <div className="space-y-4">
          {emails.map((email, index) => (
            <div key={email._draftKey} className="bg-white border border-cream-dark">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-cream-dark">
                <GripVertical size={14} className="text-charcoal/30" />
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveEmail(email._draftKey, 'up')}
                    disabled={index === 0}
                    className="text-charcoal/40 hover:text-navy disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveEmail(email._draftKey, 'down')}
                    disabled={index === emails.length - 1}
                    className="text-charcoal/40 hover:text-navy disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
                <span className="inline-flex items-center justify-center w-7 h-7 bg-navy text-white text-xs font-semibold">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy truncate">
                    {email.subject || <span className="text-charcoal/40">Untitled email</span>}
                  </p>
                  <p className="text-xs text-charcoal/50">
                    {index === 0
                      ? `Day ${email.delay_days || 0} — sent ${email.delay_days || 0} days after enrollment`
                      : `Day +${email.delay_days || 0} — ${email.delay_days || 0} days after previous`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedKey(expandedKey === email._draftKey ? null : email._draftKey)}
                  className="p-1.5 text-charcoal/50 hover:text-navy transition-colors"
                  aria-label={expandedKey === email._draftKey ? 'Collapse' : 'Expand'}
                >
                  {expandedKey === email._draftKey ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button
                  type="button"
                  onClick={() => removeEmail(email._draftKey)}
                  className="p-1.5 text-charcoal/40 hover:text-red-600 transition-colors"
                  aria-label="Delete email"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {expandedKey === email._draftKey && (
                <div className="p-6 space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Subject</label>
                      <input
                        type="text"
                        value={email.subject}
                        onChange={(e) => updateEmail(email._draftKey, { subject: e.target.value })}
                        className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">
                        {index === 0 ? 'Days After Enrollment' : 'Days After Previous'}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={email.delay_days}
                        onChange={(e) => updateEmail(email._draftKey, { delay_days: e.target.value })}
                        className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>
                  <EmailBodyEditor
                    value={email.body}
                    onChange={(next) => updateEmail(email._draftKey, { body: next })}
                    rows={10}
                  />
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addEmail}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-cream-dark text-sm text-charcoal/60 hover:border-gold hover:text-navy transition-colors"
          >
            <Plus size={14} /> Add Email
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Link
          to={isNew ? '/admin/sequences' : `/admin/sequences/${id}`}
          className="btn-navy text-sm no-underline"
        >
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={saving || !meta.name.trim()}
          className="btn-primary text-sm"
        >
          {saving ? 'Saving…' : 'Save Sequence'}
        </button>
      </div>
    </div>
  );
}
