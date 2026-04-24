import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import ImageUpload from '../../components/admin/ImageUpload';
import StripeSettings from '../../components/admin/StripeSettings';

const DEFAULT_BRAND_FORM = {
  business_name: 'Concierge Nurse Business Society',
  logo_url: '',
  photo_url: '',
  from_name: 'Concierge Nurse Business Society',
  from_email: 'info@conciergenursesociety.com',
  brand_color: '#C9A84C',
  footer_text: 'Concierge Nurse Business Society',
  website_url: 'https://www.conciergenursesociety.com',
  social_facebook: '',
  social_instagram: '',
  social_linkedin: '',
};

export default function Settings() {
  const [brand, setBrand] = useState(DEFAULT_BRAND_FORM);
  const [brandRowId, setBrandRowId] = useState(null);
  const [brandLoading, setBrandLoading] = useState(true);
  const [brandSaving, setBrandSaving] = useState(false);
  const [brandError, setBrandError] = useState('');

  // Blog / comments settings (single row in blog_settings)
  const [blog, setBlog] = useState(null);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogError, setBlogError] = useState('');

  const [saved, setSaved] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function loadBrand() {
      const { data } = await supabase.from('brand_settings').select('*').limit(1).maybeSingle();
      if (data) {
        setBrandRowId(data.id);
        setBrand({
          business_name: data.business_name || DEFAULT_BRAND_FORM.business_name,
          logo_url: data.logo_url || '',
          photo_url: data.photo_url || '',
          from_name: data.from_name || DEFAULT_BRAND_FORM.from_name,
          from_email: data.from_email || DEFAULT_BRAND_FORM.from_email,
          brand_color: data.brand_color || DEFAULT_BRAND_FORM.brand_color,
          footer_text: data.footer_text || DEFAULT_BRAND_FORM.footer_text,
          website_url: data.website_url || DEFAULT_BRAND_FORM.website_url,
          social_facebook: data.social_facebook || '',
          social_instagram: data.social_instagram || '',
          social_linkedin: data.social_linkedin || '',
        });
      }
      setBrandLoading(false);
    }
    loadBrand();

    async function loadBlog() {
      const { data } = await supabase.from('blog_settings').select('*').eq('id', 1).maybeSingle();
      setBlog(data || null);
      setBlogLoading(false);
    }
    loadBlog();
  }, []);

  function setBlogField(patch) {
    setBlog((b) => ({ ...b, ...patch }));
  }

  async function saveBlog() {
    setBlogSaving(true);
    setBlogError('');
    const payload = {
      signoff_closing_line: blog.signoff_closing_line || null,
      signoff_name: blog.signoff_name,
      signoff_title: blog.signoff_title || null,
      signoff_photo_url: blog.signoff_photo_url || null,
      comments_enabled: blog.comments_enabled,
      auto_approve: blog.auto_approve,
      profanity_filter_on: blog.profanity_filter_on,
      max_links: blog.max_links,
      disposable_email_blocked: blog.disposable_email_blocked,
      all_caps_filter: blog.all_caps_filter,
      repeat_char_filter: blog.repeat_char_filter,
      min_comment_length: blog.min_comment_length,
      max_comment_length: blog.max_comment_length,
      rate_limit_per_hour: blog.rate_limit_per_hour,
      blacklisted_words: splitLines(blog.blacklisted_words_text),
      whitelist_words: splitLines(blog.whitelist_words_text),
      blocked_email_domains: splitLines(blog.blocked_email_domains_text),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('blog_settings').update(payload).eq('id', 1);
    if (error) setBlogError(error.message);
    else {
      setSaved((s) => ({ ...s, blog: true }));
      setTimeout(() => setSaved((s) => ({ ...s, blog: false })), 2000);
    }
    setBlogSaving(false);
  }

  async function saveBrand() {
    setBrandSaving(true);
    setBrandError('');
    const payload = {
      ...brand,
      logo_url: brand.logo_url || null,
      photo_url: brand.photo_url || null,
      social_facebook: brand.social_facebook || null,
      social_instagram: brand.social_instagram || null,
      social_linkedin: brand.social_linkedin || null,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (brandRowId) {
      result = await supabase.from('brand_settings').update(payload).eq('id', brandRowId).select().single();
    } else {
      result = await supabase.from('brand_settings').insert(payload).select().single();
      if (result.data) setBrandRowId(result.data.id);
    }

    if (result.error) {
      setBrandError(result.error.message);
    } else {
      setSaved((s) => ({ ...s, brand: true }));
      setTimeout(() => setSaved((s) => ({ ...s, brand: false })), 2000);
    }
    setBrandSaving(false);
  }

  async function handleExport() {
    setExporting(true);
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    const contacts = data || [];

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
    a.download = `contacts-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
  }

  async function handleDeleteAll() {
    setDeleting(true);
    await supabase.from('activity_log').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('notes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('contact_tags').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('contacts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    setDeleting(false);
    setDeleteConfirm(false);
  }

  function setBrandField(patch) {
    setBrand((b) => ({ ...b, ...patch }));
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy mb-8">Settings</h1>

      <div className="space-y-8 max-w-2xl">
        {/* Branding */}
        <div className="bg-white border border-cream-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Branding</h3>
            <span className="text-[0.6rem] text-charcoal/40">Used in every email you send</span>
          </div>

          {brandLoading ? (
            <div className="py-8 text-center">
              <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-slate text-xs">Loading brand settings…</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Business Name</label>
                <input
                  type="text"
                  value={brand.business_name}
                  onChange={(e) => setBrandField({ business_name: e.target.value })}
                  className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <ImageUpload
                  label="Logo"
                  shape="square"
                  currentUrl={brand.logo_url}
                  onUpload={(url) => setBrandField({ logo_url: url })}
                  onClear={() => setBrandField({ logo_url: '' })}
                  helpText="Displayed at the top of every email (max ~240×60)."
                />
                <ImageUpload
                  label="Profile Photo"
                  shape="circle"
                  currentUrl={brand.photo_url}
                  onUpload={(url) => setBrandField({ photo_url: url })}
                  onClear={() => setBrandField({ photo_url: '' })}
                  helpText="Shown in the email signature (square crop works best)."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Default From Name</label>
                  <input
                    type="text"
                    value={brand.from_name}
                    onChange={(e) => setBrandField({ from_name: e.target.value })}
                    className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Default From Email</label>
                  <input
                    type="email"
                    value={brand.from_email}
                    onChange={(e) => setBrandField({ from_email: e.target.value })}
                    className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Brand Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brand.brand_color || '#C9A84C'}
                      onChange={(e) => setBrandField({ brand_color: e.target.value })}
                      className="h-[46px] w-14 border border-cream-dark cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brand.brand_color}
                      onChange={(e) => setBrandField({ brand_color: e.target.value })}
                      className="flex-1 px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Website URL</label>
                  <input
                    type="url"
                    value={brand.website_url}
                    onChange={(e) => setBrandField({ website_url: e.target.value })}
                    className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Footer Text</label>
                <input
                  type="text"
                  value={brand.footer_text}
                  onChange={(e) => setBrandField({ footer_text: e.target.value })}
                  className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                />
                <p className="text-[0.65rem] text-charcoal/40 mt-1">Small line of text shown next to your signature at the bottom of every email.</p>
              </div>

              <div className="pt-2">
                <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40 mb-2">Social Links (optional)</p>
                <div className="space-y-3">
                  <input
                    type="url"
                    placeholder="Facebook URL"
                    value={brand.social_facebook}
                    onChange={(e) => setBrandField({ social_facebook: e.target.value })}
                    className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="url"
                    placeholder="Instagram URL"
                    value={brand.social_instagram}
                    onChange={(e) => setBrandField({ social_instagram: e.target.value })}
                    className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={brand.social_linkedin}
                    onChange={(e) => setBrandField({ social_linkedin: e.target.value })}
                    className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              {brandError && (
                <div className="bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{brandError}</div>
              )}

              <button onClick={saveBrand} disabled={brandSaving} className="btn-primary text-sm">
                {brandSaving ? 'Saving…' : saved.brand ? 'Saved!' : 'Save Branding'}
              </button>
            </div>
          )}
        </div>

        {/* Blog Sign-Off */}
        <div className="bg-white border border-cream-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Blog Sign-Off</h3>
            <span className="text-[0.6rem] text-charcoal/40">Default sign-off for every blog post</span>
          </div>
          {blogLoading || !blog ? (
            <div className="py-8 text-center"><p className="text-slate text-xs">Loading…</p></div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Closing Line</label>
                <input
                  type="text"
                  value={blog.signoff_closing_line || ''}
                  onChange={(e) => setBlogField({ signoff_closing_line: e.target.value })}
                  placeholder="Keep building —"
                  className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
                <p className="text-[0.65rem] text-charcoal/40 mt-1">Appears italic above the name. Optional.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Sign-Off Name *</label>
                  <input
                    type="text"
                    value={blog.signoff_name || ''}
                    onChange={(e) => setBlogField({ signoff_name: e.target.value })}
                    placeholder="Tracy Pekurny, RN"
                    className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Title (optional)</label>
                  <input
                    type="text"
                    value={blog.signoff_title || ''}
                    onChange={(e) => setBlogField({ signoff_title: e.target.value })}
                    placeholder="Founder, Concierge Nurse Business Society"
                    className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">Photo URL (optional)</label>
                <input
                  type="url"
                  value={blog.signoff_photo_url || ''}
                  onChange={(e) => setBlogField({ signoff_photo_url: e.target.value })}
                  placeholder="https://i.ibb.co/..."
                  className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
                <p className="text-[0.65rem] text-charcoal/40 mt-1">Square crop. Upload to ImgBB and paste the URL here.</p>
              </div>

              {/* Preview */}
              <div className="bg-cream/50 border border-cream-dark p-4">
                <p className="text-[0.6rem] uppercase tracking-widest text-charcoal/40 mb-3">Preview</p>
                <div className="gold-divider mb-3" />
                {blog.signoff_closing_line && <p className="italic text-charcoal/70 mb-2">{blog.signoff_closing_line}</p>}
                <div className="flex items-center gap-3">
                  {blog.signoff_photo_url && (
                    <img src={blog.signoff_photo_url} alt="" className="w-12 h-12 rounded-full object-cover" />
                  )}
                  <div>
                    <p className="font-semibold text-navy">{blog.signoff_name || 'Your name here'}</p>
                    {blog.signoff_title && <p className="text-xs text-slate">{blog.signoff_title}</p>}
                  </div>
                </div>
              </div>

              {blogError && <div className="bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{blogError}</div>}
              <button onClick={saveBlog} disabled={blogSaving} className="btn-primary text-sm">
                {blogSaving ? 'Saving…' : saved.blog ? 'Saved!' : 'Save Blog Settings'}
              </button>
            </div>
          )}
        </div>

        {/* Comments Moderation */}
        {blog && (
          <div className="bg-white border border-cream-dark p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">Comments Moderation</h3>
              <span className="text-[0.6rem] text-charcoal/40">Auto-filters + approval rules</span>
            </div>
            <div className="space-y-4">
              <ToggleRow
                label="Enable comments on blog posts"
                checked={blog.comments_enabled}
                onChange={(v) => setBlogField({ comments_enabled: v })}
              />
              <ToggleRow
                label="Auto-approve all comments"
                description="Skip manual approval. Filters below still apply."
                checked={blog.auto_approve}
                onChange={(v) => setBlogField({ auto_approve: v })}
              />
              <ToggleRow
                label="Profanity filter"
                description="Uses the bad-words library plus your custom blacklist below."
                checked={blog.profanity_filter_on}
                onChange={(v) => setBlogField({ profanity_filter_on: v })}
              />
              <ToggleRow
                label="Block disposable emails"
                description="Mailinator, guerrillamail, 10minutemail, etc."
                checked={blog.disposable_email_blocked}
                onChange={(v) => setBlogField({ disposable_email_blocked: v })}
              />
              <ToggleRow
                label="Reject all-caps comments"
                description="Over 70% uppercase — strict, can be noisy."
                checked={blog.all_caps_filter}
                onChange={(v) => setBlogField({ all_caps_filter: v })}
              />
              <ToggleRow
                label="Reject excessive repeated characters"
                description={`"aaaaaaa" or "!!!!!" patterns.`}
                checked={blog.repeat_char_filter}
                onChange={(v) => setBlogField({ repeat_char_filter: v })}
              />

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <NumberField
                  label="Max links per comment"
                  value={blog.max_links}
                  onChange={(v) => setBlogField({ max_links: v })}
                />
                <NumberField
                  label="Rate limit (per email per hour)"
                  value={blog.rate_limit_per_hour}
                  onChange={(v) => setBlogField({ rate_limit_per_hour: v })}
                />
                <NumberField
                  label="Min comment length"
                  value={blog.min_comment_length}
                  onChange={(v) => setBlogField({ min_comment_length: v })}
                />
                <NumberField
                  label="Max comment length"
                  value={blog.max_comment_length}
                  onChange={(v) => setBlogField({ max_comment_length: v })}
                />
              </div>

              <TextareaField
                label="Blacklisted words (one per line)"
                value={(blog.blacklisted_words_text !== undefined ? blog.blacklisted_words_text : (blog.blacklisted_words || []).join('\n'))}
                onChange={(v) => setBlogField({ blacklisted_words_text: v })}
              />
              <TextareaField
                label="Whitelist words (one per line — reduce profanity false positives)"
                value={(blog.whitelist_words_text !== undefined ? blog.whitelist_words_text : (blog.whitelist_words || []).join('\n'))}
                onChange={(v) => setBlogField({ whitelist_words_text: v })}
              />
              <TextareaField
                label="Blocked email domains (one per line)"
                value={(blog.blocked_email_domains_text !== undefined ? blog.blocked_email_domains_text : (blog.blocked_email_domains || []).join('\n'))}
                onChange={(v) => setBlogField({ blocked_email_domains_text: v })}
              />

              <button onClick={saveBlog} disabled={blogSaving} className="btn-primary text-sm">
                {blogSaving ? 'Saving…' : saved.blog ? 'Saved!' : 'Save Moderation Settings'}
              </button>
            </div>
          </div>
        )}

        {/* Stripe */}
        <StripeSettings />

        {/* Data Management */}
        <div className="bg-white border border-cream-dark p-6">
          <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">Data Management</h3>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleExport} disabled={exporting} className="btn-navy text-sm">
              {exporting ? 'Exporting...' : 'Export All Contacts'}
            </button>
            {deleteConfirm ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-red-600">Are you sure? This cannot be undone.</span>
                <button onClick={handleDeleteAll} disabled={deleting} className="px-4 py-2.5 bg-red-600 text-white text-sm hover:bg-red-700 transition-colors">
                  {deleting ? 'Deleting...' : 'Yes, Delete All'}
                </button>
                <button onClick={() => setDeleteConfirm(false)} className="btn-navy text-sm">Cancel</button>
              </div>
            ) : (
              <button onClick={() => setDeleteConfirm(true)} className="px-4 py-2.5 border border-red-300 text-red-600 text-sm hover:bg-red-50 transition-colors">
                Delete All Contacts
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function splitLines(text) {
  return (text || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer py-2 border-b border-cream-dark last:border-none">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-gold mt-0.5"
      />
      <div>
        <p className="text-sm text-charcoal font-medium">{label}</p>
        {description && <p className="text-[0.65rem] text-charcoal/50 mt-0.5">{description}</p>}
      </div>
    </label>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">{label}</label>
      <input
        type="number"
        min="0"
        value={value ?? ''}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
        className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">{label}</label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold font-mono"
      />
    </div>
  );
}
