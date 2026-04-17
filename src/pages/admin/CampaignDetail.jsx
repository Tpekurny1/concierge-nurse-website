import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Edit3, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const STATUS_COLORS = {
  draft: 'bg-cream text-charcoal/60 border-cream-dark',
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  sending: 'bg-amber-50 text-amber-700 border-amber-200',
  sent: 'bg-green-50 text-green-700 border-green-200',
};

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [stats, setStats] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionPending, setActionPending] = useState(false);
  const [actionError, setActionError] = useState('');
  const [retryResult, setRetryResult] = useState('');

  useEffect(() => {
    async function load() {
      const [
        { data: campaignData },
        { data: statsData },
        { data: tagData },
      ] = await Promise.all([
        supabase.from('campaigns').select('*').eq('id', id).single(),
        supabase.from('campaign_stats').select('*').eq('campaign_id', id).single(),
        supabase.from('tags').select('*'),
      ]);

      setCampaign(campaignData);
      setStats(statsData);
      setTags(tagData || []);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleDuplicate() {
    if (!campaign) return;
    setActionPending(true);
    setActionError('');

    const { data, error } = await supabase
      .from('campaigns')
      .insert({
        name: `${campaign.name} (Copy)`,
        type: campaign.type,
        status: 'draft',
        subject: campaign.subject,
        from_name: campaign.from_name,
        from_email: campaign.from_email,
        body: campaign.body,
        recipient_tag_ids: campaign.recipient_tag_ids || [],
        recipient_count: campaign.recipient_count || 0,
      })
      .select()
      .single();

    if (error || !data) {
      setActionError('Failed to duplicate campaign');
      setActionPending(false);
      return;
    }

    await supabase.from('campaign_stats').insert({ campaign_id: data.id });
    navigate(`/admin/campaigns/${data.id}`);
  }

  async function handleDelete() {
    if (!campaign) return;
    if (!window.confirm('Are you sure? This cannot be undone.')) return;

    setActionPending(true);
    setActionError('');

    await supabase.from('campaign_recipients').delete().eq('campaign_id', campaign.id);
    await supabase.from('campaign_stats').delete().eq('campaign_id', campaign.id);
    const { error } = await supabase.from('campaigns').delete().eq('id', campaign.id);

    if (error) {
      setActionError('Failed to delete campaign');
      setActionPending(false);
      return;
    }

    navigate('/admin/campaigns');
  }

  async function handleRetryFailed() {
    if (!campaign) return;
    if (!window.confirm('Resend this campaign to contacts who did not receive it?')) return;

    setActionPending(true);
    setActionError('');
    setRetryResult('');

    try {
      const res = await fetch('/api/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign_id: campaign.id, retry_failed: true }),
      });
      const result = await res.json();
      if (!res.ok) {
        setActionError(result.error || 'Retry failed');
      } else {
        setRetryResult(`Retried — sent: ${result.sent}, failed: ${result.failed}`);
        const { data: freshStats } = await supabase
          .from('campaign_stats')
          .select('*')
          .eq('campaign_id', campaign.id)
          .single();
        setStats(freshStats);
      }
    } catch (err) {
      setActionError('Network error during retry');
    }

    setActionPending(false);
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Loading...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div>
        <p className="text-slate text-sm mb-4">Campaign not found.</p>
        <Link to="/admin/campaigns" className="text-gold text-sm">Back to campaigns</Link>
      </div>
    );
  }

  const isEmail = campaign.type === 'email';
  const isDraft = campaign.status === 'draft';
  const s = stats || {};

  function rate(num, denom) {
    if (!denom || denom === 0) return '0%';
    return ((num / denom) * 100).toFixed(1) + '%';
  }

  const recipientTagNames = (campaign.recipient_tag_ids || [])
    .map((tid) => tags.find((t) => t.id === tid)?.name)
    .filter(Boolean);

  return (
    <div>
      <Link to="/admin/campaigns" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-navy no-underline mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to campaigns
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">{campaign.name}</h1>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className={`inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase border ${
              isEmail ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              {campaign.type}
            </span>
            <span className={`inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase border ${STATUS_COLORS[campaign.status] || STATUS_COLORS.draft}`}>
              {campaign.status}
            </span>
            {campaign.sent_at && (
              <span className="text-slate text-xs">Sent {new Date(campaign.sent_at).toLocaleString()}</span>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {isDraft && isEmail && (
            <Link
              to={`/admin/campaigns/email/${campaign.id}/edit`}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider uppercase border border-cream-dark text-charcoal/70 hover:border-gold hover:text-navy transition-colors no-underline"
            >
              <Edit3 size={14} /> Edit
            </Link>
          )}
          <button
            type="button"
            onClick={handleDuplicate}
            disabled={actionPending}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider uppercase border border-cream-dark text-charcoal/70 hover:border-gold hover:text-navy transition-colors disabled:opacity-50"
          >
            <Copy size={14} /> Duplicate
          </button>
          {isEmail && campaign.status === 'sent' && (s.bounced || 0) > 0 && (
            <button
              type="button"
              onClick={handleRetryFailed}
              disabled={actionPending}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider uppercase border border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} /> Retry Failed
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
      {retryResult && (
        <div className="bg-green-50 border border-green-200 p-3 text-green-700 text-sm mb-6">{retryResult}</div>
      )}

      {/* Stats grid */}
      <div className={`grid ${isEmail ? 'sm:grid-cols-3 lg:grid-cols-6' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-4 mb-8`}>
        <div className="bg-white border border-cream-dark p-4">
          <p className="text-2xl font-bold text-navy">{s.sent || 0}</p>
          <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Sent</p>
        </div>
        <div className="bg-white border border-cream-dark p-4">
          <p className="text-2xl font-bold text-navy">{s.delivered || 0}</p>
          <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Delivered</p>
        </div>
        {isEmail ? (
          <>
            <div className="bg-white border border-cream-dark p-4">
              <p className="text-2xl font-bold text-navy">{s.opened || 0}</p>
              <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Opened</p>
            </div>
            <div className="bg-white border border-cream-dark p-4">
              <p className="text-2xl font-bold text-navy">{s.clicked || 0}</p>
              <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Clicked</p>
            </div>
            <div className="bg-white border border-cream-dark p-4">
              <p className="text-2xl font-bold text-navy">{s.bounced || 0}</p>
              <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Bounced</p>
            </div>
            <div className="bg-white border border-cream-dark p-4">
              <p className="text-2xl font-bold text-navy">{s.unsubscribed || 0}</p>
              <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Unsubscribed</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white border border-cream-dark p-4">
              <p className="text-2xl font-bold text-navy">{s.bounced || 0}</p>
              <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Failed</p>
            </div>
            <div className="bg-white border border-cream-dark p-4">
              <p className="text-2xl font-bold text-navy">{s.unsubscribed || 0}</p>
              <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Unsubscribed</p>
            </div>
          </>
        )}
      </div>

      {/* Metrics */}
      {isEmail && (
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-cream-dark p-4">
            <p className="text-xl font-bold text-gold">{rate(s.opened, s.delivered)}</p>
            <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Open Rate</p>
          </div>
          <div className="bg-white border border-cream-dark p-4">
            <p className="text-xl font-bold text-gold">{rate(s.clicked, s.delivered)}</p>
            <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Click Rate</p>
          </div>
          <div className="bg-white border border-cream-dark p-4">
            <p className="text-xl font-bold text-gold">{rate(s.delivered, s.sent)}</p>
            <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40">Delivery Rate</p>
          </div>
        </div>
      )}

      {/* Info section */}
      <div className="bg-white border border-cream-dark p-6">
        <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">Campaign Details</h3>
        <div className="space-y-3 text-sm">
          {isEmail && campaign.subject && (
            <div>
              <span className="text-charcoal/40">Subject:</span>{' '}
              <span className="text-charcoal">{campaign.subject}</span>
            </div>
          )}
          {isEmail && campaign.from_email && (
            <div>
              <span className="text-charcoal/40">From:</span>{' '}
              <span className="text-charcoal">{campaign.from_name} &lt;{campaign.from_email}&gt;</span>
            </div>
          )}
          {!isEmail && campaign.body && (
            <div>
              <span className="text-charcoal/40">Message:</span>{' '}
              <span className="text-charcoal">{campaign.body}</span>
            </div>
          )}
          <div>
            <span className="text-charcoal/40">Recipients:</span>{' '}
            <span className="text-charcoal">{campaign.recipient_count || 0} contacts</span>
          </div>
          {recipientTagNames.length > 0 && (
            <div>
              <span className="text-charcoal/40">Segments:</span>{' '}
              <span className="flex flex-wrap gap-2 mt-1">
                {recipientTagNames.map((name) => (
                  <span key={name} className="inline-block px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase bg-cream text-charcoal/60 border border-cream-dark">
                    {name}
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
