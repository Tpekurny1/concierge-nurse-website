import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { moderateComment } from '../lib/moderation';
import { scoreLead, mergeScoring } from '../lib/leadScoring';

const CONTACT_EMAIL = 'info@conciergenursesociety.com';

export default function BlogCommentForm({ postId, onSubmitted }) {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', website: '', content: '', honeypot: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const loadTime = useRef(Date.now());

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('blog_settings').select('*').eq('id', 1).maybeSingle();
      setSettings(data);
    }
    load();
  }, []);

  if (settings && !settings.comments_enabled) {
    return null;
  }

  function update(field) {
    return (e) => setForm((p) => ({ ...p, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'submitting', message: '' });

    // Count recent comments from same email (rate limit)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: recentCount } = await supabase
      .from('blog_comments')
      .select('id', { count: 'exact', head: true })
      .eq('author_email', form.email.toLowerCase())
      .gte('submitted_at', oneHourAgo);

    const moderation = moderateComment({
      name: form.name,
      email: form.email,
      website: form.website,
      content: form.content,
      settings,
      context: {
        honeypot: form.honeypot,
        loadTime: loadTime.current,
        now: Date.now(),
      },
      recentCountFromSameEmail: recentCount || 0,
    });

    // Honeypot — show success, don't actually insert
    if (moderation.filter === 'honeypot') {
      setStatus({
        state: 'success',
        message: 'Your comment has been submitted.',
      });
      return;
    }

    // Handle rejected (not inserting, showing reason)
    if (moderation.outcome === 'rejected') {
      setStatus({
        state: 'error',
        message: `${moderation.reason} If you believe this is a mistake, email us at ${CONTACT_EMAIL}.`,
      });
      return;
    }

    // Insert comment
    const insertPayload = {
      post_id: postId,
      author_name: form.name.trim(),
      author_email: form.email.toLowerCase().trim(),
      author_website: form.website.trim() || null,
      content: form.content.trim(),
      status: moderation.outcome === 'auto_approved' ? 'approved'
            : moderation.outcome === 'spam' ? 'spam'
            : 'pending',
      rejection_reason: moderation.reason,
      flagged_by_filter: moderation.filter,
      user_agent: navigator.userAgent,
    };

    const { data: commentRow, error } = await supabase
      .from('blog_comments')
      .insert(insertPayload)
      .select('id')
      .single();

    if (error) {
      setStatus({ state: 'error', message: 'Something went wrong. Please try again.' });
      return;
    }

    // Auto-lead capture: upsert the commenter as a contact.
    // Only for non-spam comments — don't pollute the CRM with bot junk.
    if (moderation.outcome !== 'spam') {
      try {
        const emailLower = form.email.toLowerCase().trim();
        const [firstName, ...rest] = form.name.trim().split(/\s+/);
        const lastName = rest.join(' ');

        const { data: existing } = await supabase
          .from('contacts')
          .select('*')
          .eq('email', emailLower)
          .maybeSingle();

        let contactId;
        if (existing) {
          const updates = { updated_at: new Date().toISOString() };
          if (!existing.first_name && firstName) updates.first_name = firstName;
          if (!existing.last_name && lastName) updates.last_name = lastName;
          await supabase.from('contacts').update(updates).eq('id', existing.id);
          contactId = existing.id;
        } else {
          const { data: created } = await supabase
            .from('contacts')
            .insert({
              first_name: firstName || null,
              last_name: lastName || null,
              email: emailLower,
              status: 'new',
              source: 'blog_comment',
              lifecycle_stage: 'Explorer',
            })
            .select('id')
            .single();
          contactId = created?.id;
        }

        // Tag as Blog Commenter
        if (contactId) {
          const { data: existingTag } = await supabase
            .from('tags')
            .select('id')
            .eq('name', 'Blog Commenter')
            .maybeSingle();
          let tagId = existingTag?.id;
          if (!tagId) {
            const { data: created } = await supabase
              .from('tags')
              .insert({ name: 'Blog Commenter' })
              .select('id')
              .single();
            tagId = created?.id;
          }
          if (tagId) {
            await supabase
              .from('contact_tags')
              .upsert({ contact_id: contactId, tag_id: tagId }, { onConflict: 'contact_id,tag_id', ignoreDuplicates: true });
          }

          // Attach contact to the comment row
          await supabase.from('blog_comments').update({ contact_id: contactId }).eq('id', commentRow.id);

          // Score the lead — commenters have some intent, treat as newsletter-level signal
          const scoring = scoreLead({
            formType: 'newsletter',
            lifecycle: existing?.lifecycle_stage || 'Explorer',
            profile: {
              hasBusinessName: Boolean(existing?.business_name),
              hasRevenue: Boolean(existing?.annual_revenue),
              hasPhone: Boolean(existing?.phone),
            },
            message: form.content,
            context: { pagePath: window.location.pathname, utm_campaign: null },
          });
          const merged = existing ? mergeScoring(existing, scoring) : scoring;
          await supabase
            .from('contacts')
            .update({
              intent: merged.intent,
              lead_score: merged.score,
              score_reasons: merged.reasons,
            })
            .eq('id', contactId);
        }
      } catch (err) {
        // Never let lead-capture failure break the comment flow
        console.error('Lead capture on comment failed:', err);
      }
    }

    // Surface success message
    if (moderation.outcome === 'auto_approved') {
      setStatus({
        state: 'success',
        message: 'Thanks for commenting! Your comment is now live below.',
      });
    } else if (moderation.outcome === 'spam') {
      setStatus({
        state: 'error',
        message: `Your comment couldn't be accepted. If you believe this is a mistake, email us at ${CONTACT_EMAIL}.`,
      });
    } else {
      setStatus({
        state: 'success',
        message: `Thanks! Your comment has been submitted. Tracy will review it shortly and it'll appear here once approved.`,
      });
    }

    setForm({ name: '', email: '', website: '', content: '', honeypot: '' });
    if (onSubmitted) onSubmitted();
  }

  return (
    <div className="mt-12 bg-white border border-cream-dark p-6 sm:p-8">
      <h3 className="font-heading text-xl font-bold text-navy mb-2">Join the conversation</h3>
      <p className="text-slate text-sm mb-6">
        Your email stays private — it's only used so Tracy can reply if needed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={update('name')}
            className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
          />
          <input
            type="email"
            required
            placeholder="Your email"
            value={form.email}
            onChange={update('email')}
            className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <input
          type="url"
          placeholder="Your website (optional)"
          value={form.website}
          onChange={update('website')}
          className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
        />
        <textarea
          required
          rows={5}
          placeholder="Share your thoughts…"
          value={form.content}
          onChange={update('content')}
          className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors resize-none"
        />

        {/* Honeypot — invisible to humans, tempting to bots */}
        <input
          type="text"
          name="website_confirm"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={update('honeypot')}
          style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
          aria-hidden="true"
        />

        {status.state === 'success' && (
          <div className="bg-green-50 border border-green-200 p-3 text-green-800 text-sm">{status.message}</div>
        )}
        {status.state === 'error' && (
          <div className="bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{status.message}</div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-[0.65rem] text-charcoal/40">
            Comments are moderated. First-time comments may take a moment to appear.
          </p>
          <button
            type="submit"
            disabled={status.state === 'submitting'}
            className="btn-primary text-sm disabled:opacity-60"
          >
            {status.state === 'submitting' ? 'Submitting…' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  );
}
