import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import EmailBodyEditor from './EmailBodyEditor';

const DEFAULT_FORM = {
  name: '',
  subject: '',
  from_name: 'Concierge Nurse Business Society',
  from_email: 'hello@conciergenursesociety.com',
  body: '',
};

export default function EmailCampaignForm({ mode = 'new', existingCampaign = null }) {
  const navigate = useNavigate();
  const isEdit = mode === 'edit';

  const [tags, setTags] = useState([]);
  const [tagCounts, setTagCounts] = useState({});

  const [form, setForm] = useState(() => {
    if (existingCampaign) {
      return {
        name: existingCampaign.name || '',
        subject: existingCampaign.subject || '',
        from_name: existingCampaign.from_name || DEFAULT_FORM.from_name,
        from_email: existingCampaign.from_email || DEFAULT_FORM.from_email,
        body: existingCampaign.body || '',
      };
    }
    return DEFAULT_FORM;
  });
  const [selectedTags, setSelectedTags] = useState(existingCampaign?.recipient_tag_ids || []);
  const [schedule, setSchedule] = useState(existingCampaign?.scheduled_at ? 'later' : 'now');
  const [scheduledAt, setScheduledAt] = useState(
    existingCampaign?.scheduled_at ? toLocalInput(existingCampaign.scheduled_at) : ''
  );

  const [showTestForm, setShowTestForm] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testStatus, setTestStatus] = useState({ state: 'idle', message: '' });

  const [saving, setSaving] = useState(false);
  const [sendError, setSendError] = useState('');

  useEffect(() => {
    async function load() {
      const { data: tagData } = await supabase.from('tags').select('*').order('name');
      setTags(tagData || []);

      const { data: ctData } = await supabase.from('contact_tags').select('tag_id');
      const counts = {};
      (ctData || []).forEach((r) => {
        counts[r.tag_id] = (counts[r.tag_id] || 0) + 1;
      });
      setTagCounts(counts);
    }
    load();
  }, []);

  function toggleTag(id) {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function totalRecipients() {
    return selectedTags.reduce((sum, id) => sum + (tagCounts[id] || 0), 0);
  }

  function handleTemplateApplied(tpl) {
    setForm((f) => ({
      ...f,
      subject: f.subject.trim() ? f.subject : tpl.subject,
    }));
  }

  async function handleSendTest() {
    if (!testEmail.trim()) {
      setTestStatus({ state: 'error', message: 'Enter a test email address' });
      return;
    }
    setTestStatus({ state: 'sending', message: '' });
    try {
      const res = await fetch('/api/send-test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testEmail.trim(),
          subject: form.subject || form.name || 'Test email',
          from_name: form.from_name,
          from_email: form.from_email,
          body: form.body,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setTestStatus({ state: 'error', message: result.error || 'Failed to send test email' });
        return;
      }
      setTestStatus({ state: 'success', message: `Test sent to ${testEmail.trim()}` });
    } catch (err) {
      setTestStatus({ state: 'error', message: 'Network error sending test email' });
    }
  }

  async function handleSubmit(asDraft = false) {
    if (!form.name.trim()) return;
    setSaving(true);
    setSendError('');

    const sendNow = !asDraft && schedule === 'now';
    const targetStatus = asDraft ? 'draft' : sendNow ? 'sending' : 'scheduled';

    const payload = {
      name: form.name.trim(),
      type: 'email',
      status: targetStatus,
      subject: form.subject.trim(),
      from_name: form.from_name.trim(),
      from_email: form.from_email.trim(),
      body: form.body,
      recipient_tag_ids: selectedTags,
      recipient_count: totalRecipients(),
      scheduled_at: !asDraft && schedule === 'later' ? scheduledAt || null : null,
    };

    let campaignId;

    if (isEdit && existingCampaign) {
      const { data, error } = await supabase
        .from('campaigns')
        .update(payload)
        .eq('id', existingCampaign.id)
        .select()
        .single();

      if (!data) {
        console.error('Error updating campaign:', error);
        setSaving(false);
        return;
      }
      campaignId = data.id;
    } else {
      const { data, error } = await supabase
        .from('campaigns')
        .insert({ ...payload, sent_at: null })
        .select()
        .single();

      if (!data) {
        console.error('Error creating campaign:', error);
        setSaving(false);
        return;
      }
      campaignId = data.id;
      await supabase.from('campaign_stats').insert({ campaign_id: campaignId });
    }

    if (sendNow) {
      try {
        const res = await fetch('/api/send-campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaign_id: campaignId }),
        });
        const result = await res.json();
        if (!res.ok) {
          setSendError(result.error || 'Failed to send campaign');
          await supabase.from('campaigns').update({ status: 'draft' }).eq('id', campaignId);
          setSaving(false);
          return;
        }
      } catch (err) {
        setSendError('Network error sending campaign. It was saved as a draft.');
        await supabase.from('campaigns').update({ status: 'draft' }).eq('id', campaignId);
        setSaving(false);
        return;
      }
    }

    navigate(`/admin/campaigns/${campaignId}`);
  }

  return (
    <div>
      <Link
        to={existingCampaign ? `/admin/campaigns/${existingCampaign.id}` : '/admin/campaigns'}
        className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-navy no-underline mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> {existingCampaign ? 'Back to campaign' : 'Back to campaigns'}
      </Link>

      <h1 className="font-heading text-2xl font-bold text-navy mb-8">
        {isEdit ? 'Edit Email Campaign' : 'New Email Campaign'}
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left — Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-cream-dark p-6 space-y-4">
            <div>
              <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">
                Campaign Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">
                Subject Line
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">
                  From Name
                </label>
                <input
                  type="text"
                  value={form.from_name}
                  onChange={(e) => setForm({ ...form, from_name: e.target.value })}
                  className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">
                  From Email
                </label>
                <input
                  type="email"
                  value={form.from_email}
                  onChange={(e) => setForm({ ...form, from_email: e.target.value })}
                  className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <EmailBodyEditor
              value={form.body}
              onChange={(next) => setForm((f) => ({ ...f, body: next }))}
              onTemplateApplied={handleTemplateApplied}
            />
          </div>
        </div>

        {/* Right — Sidebar */}
        <div className="space-y-6">
          {/* Recipients */}
          <div className="bg-white border border-cream-dark p-6">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">
              Recipients
            </h3>
            {tags.length === 0 ? (
              <p className="text-slate text-sm">No segments created yet.</p>
            ) : (
              <div className="space-y-2">
                {tags.map((tag) => (
                  <label key={tag.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => toggleTag(tag.id)}
                      className="accent-gold"
                    />
                    <span className="text-sm text-charcoal">{tag.name}</span>
                    <span className="text-[0.65rem] text-charcoal/40 ml-auto">{tagCounts[tag.id] || 0}</span>
                  </label>
                ))}
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-cream-dark">
              <p className="text-sm text-charcoal font-semibold">{totalRecipients()} recipients</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white border border-cream-dark p-6">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">
              Schedule
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="schedule"
                  value="now"
                  checked={schedule === 'now'}
                  onChange={() => setSchedule('now')}
                  className="accent-gold"
                />
                <span className="text-sm text-charcoal">Send Now</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="schedule"
                  value="later"
                  checked={schedule === 'later'}
                  onChange={() => setSchedule('later')}
                  className="accent-gold"
                />
                <span className="text-sm text-charcoal">Schedule</span>
              </label>
              {schedule === 'later' && (
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                />
              )}
            </div>
          </div>

          {/* Test email */}
          <div className="bg-white border border-cream-dark p-6">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">
              Send Test Email
            </h3>
            {!showTestForm ? (
              <button
                type="button"
                onClick={() => setShowTestForm(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase border border-cream-dark text-charcoal/70 hover:border-gold hover:text-navy transition-colors"
              >
                <Send size={14} /> Test this email
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSendTest}
                    disabled={testStatus.state === 'sending'}
                    className="flex-1 px-3 py-2 text-xs font-semibold tracking-wider uppercase bg-navy text-white hover:bg-navy/90 transition-colors disabled:opacity-50"
                  >
                    {testStatus.state === 'sending' ? 'Sending…' : 'Send'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowTestForm(false);
                      setTestStatus({ state: 'idle', message: '' });
                    }}
                    className="px-3 py-2 text-xs font-semibold tracking-wider uppercase border border-cream-dark text-charcoal/60 hover:text-navy transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                {testStatus.state === 'error' && (
                  <p className="text-xs text-red-600">{testStatus.message}</p>
                )}
                {testStatus.state === 'success' && (
                  <p className="text-xs text-green-600">{testStatus.message}</p>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {sendError && (
              <div className="bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{sendError}</div>
            )}
            <button
              onClick={() => handleSubmit(false)}
              disabled={saving || !form.name.trim()}
              className="btn-primary text-sm w-full"
            >
              {saving ? 'Saving…' : schedule === 'now' ? (isEdit ? 'Send Campaign' : 'Send Campaign') : 'Schedule Campaign'}
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={saving || !form.name.trim()}
              className="btn-navy text-sm w-full"
            >
              {isEdit ? 'Save Draft' : 'Save as Draft'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function toLocalInput(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60 * 1000);
  return local.toISOString().slice(0, 16);
}
