import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TipTapLink from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { generateHTML } from '@tiptap/html';
import {
  ArrowLeft, Save, Eye, Send, Image as ImageIcon, X,
  CheckCircle2, AlertCircle, Loader,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import BlogEditorToolbar from '../../components/admin/BlogEditorToolbar';
import { slugify, computeReadingTime, deriveExcerpt, uploadBlogImage } from '../../lib/blogUtils';

const DEFAULT_POST = {
  title: '',
  subtitle: '',
  slug: '',
  excerpt: '',
  cover_image_url: '',
  content_json: { type: 'doc', content: [{ type: 'paragraph' }] },
  content_html: '',
  status: 'draft',
  published_at: null,
  scheduled_for: null,
  seo_title: '',
  seo_description: '',
  reading_time_minutes: 1,
  tags: [],
  use_default_signoff: true,
  signoff_closing_line: '',
  signoff_name: '',
  signoff_title: '',
  signoff_photo_url: '',
};

// TipTap extension list must be identical everywhere we generate HTML from JSON
const EDITOR_EXTENSIONS = [
  StarterKit.configure({}),
  Underline,
  TipTapLink.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener', target: '_blank' } }),
  Image.configure({ inline: false, HTMLAttributes: { class: 'blog-image' } }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Placeholder.configure({ placeholder: 'Write your post here…' }),
  CharacterCount,
];

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [post, setPost] = useState(DEFAULT_POST);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [blogSettings, setBlogSettings] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [saveError, setSaveError] = useState('');
  const [sendingCampaign, setSendingCampaign] = useState(false);
  const saveTimer = useRef(null);

  const editor = useEditor({
    extensions: EDITOR_EXTENSIONS,
    content: post.content_json || DEFAULT_POST.content_json,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-8 py-8',
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setPost((p) => ({ ...p, content_json: json }));
    },
  });

  // ── Load ──
  useEffect(() => {
    async function load() {
      const [{ data: cats }, { data: settings }] = await Promise.all([
        supabase.from('blog_categories').select('*').order('name'),
        supabase.from('blog_settings').select('*').eq('id', 1).maybeSingle(),
      ]);
      setCategories(cats || []);
      setBlogSettings(settings);

      if (!isNew) {
        const { data: postData } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (postData) {
          setPost({ ...DEFAULT_POST, ...postData });
          editor?.commands.setContent(postData.content_json || DEFAULT_POST.content_json, false);
        }

        const { data: pcData } = await supabase
          .from('blog_post_categories')
          .select('category_id')
          .eq('post_id', id);
        setSelectedCategories(new Set((pcData || []).map((r) => r.category_id)));
        setSlugManuallyEdited(true); // don't auto-regenerate slug for existing posts
      }

      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, editor]);

  // ── Auto-slug from title ──
  useEffect(() => {
    if (!slugManuallyEdited && post.title) {
      setPost((p) => ({ ...p, slug: slugify(post.title) }));
    }
  }, [post.title, slugManuallyEdited]);

  // ── Save logic ──
  const savePost = useCallback(async (showToast = false) => {
    if (!editor) return;

    setSaving(true);
    setSaveError('');

    const contentJson = editor.getJSON();
    const contentHtml = generateHTML(contentJson, EDITOR_EXTENSIONS);
    const excerpt = post.excerpt || deriveExcerpt(contentHtml);
    const readingTime = computeReadingTime(contentHtml);

    const payload = {
      title: post.title || 'Untitled',
      subtitle: post.subtitle || null,
      slug: post.slug || slugify(post.title) || `draft-${Date.now()}`,
      excerpt,
      cover_image_url: post.cover_image_url || null,
      content_json: contentJson,
      content_html: contentHtml,
      status: post.status,
      published_at: post.published_at,
      scheduled_for: post.scheduled_for,
      seo_title: post.seo_title || null,
      seo_description: post.seo_description || null,
      reading_time_minutes: readingTime,
      tags: post.tags || [],
      use_default_signoff: post.use_default_signoff !== false,
      signoff_closing_line: post.signoff_closing_line || null,
      signoff_name: post.signoff_name || null,
      signoff_title: post.signoff_title || null,
      signoff_photo_url: post.signoff_photo_url || null,
    };

    try {
      let savedId = id;

      if (isNew && !savedId) {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(payload)
          .select('id')
          .single();
        if (error) throw error;
        savedId = data.id;

        // Save category links
        if (selectedCategories.size > 0) {
          await supabase.from('blog_post_categories').insert(
            [...selectedCategories].map((cid) => ({ post_id: savedId, category_id: cid }))
          );
        }

        navigate(`/admin/blog/${savedId}/edit`, { replace: true });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .update(payload)
          .eq('id', savedId);
        if (error) throw error;

        // Reset category links
        await supabase.from('blog_post_categories').delete().eq('post_id', savedId);
        if (selectedCategories.size > 0) {
          await supabase.from('blog_post_categories').insert(
            [...selectedCategories].map((cid) => ({ post_id: savedId, category_id: cid }))
          );
        }
      }

      setLastSaved(new Date());
      setSaving(false);
      if (showToast) {
        // nothing — the "Saved Xs ago" indicator is enough
      }
      return savedId;
    } catch (err) {
      setSaving(false);
      setSaveError(err.message || 'Save failed.');
      return null;
    }
  }, [editor, id, isNew, navigate, post, selectedCategories]);

  // ── Autosave 3s after last change ──
  useEffect(() => {
    if (!editor || loading) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      savePost(false);
    }, 3000);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, selectedCategories]);

  async function handleImageUpload(file) {
    return uploadBlogImage(supabase, file);
  }

  async function handleCoverUpload(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const url = await uploadBlogImage(supabase, file);
      setPost((p) => ({ ...p, cover_image_url: url }));
    } catch (err) {
      alert(`Cover upload failed: ${err.message}`);
    }
  }

  async function handlePublish() {
    const next = {
      ...post,
      status: 'published',
      published_at: post.published_at || new Date().toISOString(),
    };
    setPost(next);
    setTimeout(() => savePost(true), 50);
  }

  async function handleUnpublish() {
    setPost((p) => ({ ...p, status: 'draft' }));
    setTimeout(() => savePost(true), 50);
  }

  async function handleSchedule() {
    if (!post.scheduled_for) {
      alert('Pick a schedule date first.');
      return;
    }
    setPost((p) => ({ ...p, status: 'scheduled' }));
    setTimeout(() => savePost(true), 50);
  }

  async function handleSendAsCampaign() {
    if (!id) {
      alert('Save the post first.');
      return;
    }
    setSendingCampaign(true);

    const postUrl = `https://www.conciergenursesociety.com/blog/${post.slug}`;
    const coverBlock = post.cover_image_url
      ? `<img src="${post.cover_image_url}" alt="${post.title}" style="width:100%;max-width:600px;height:auto;margin-bottom:24px;" />`
      : '';
    const excerpt = post.excerpt || deriveExcerpt(post.content_html);

    const body = `
${coverBlock}
<h1 style="font-family:serif;font-size:28px;color:#1a2b4a;margin:0 0 12px 0;">${post.title}</h1>
${post.subtitle ? `<p style="color:#555;font-size:16px;font-style:italic;margin:0 0 24px 0;">${post.subtitle}</p>` : ''}
<p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 32px 0;">${excerpt}</p>
<p style="margin:32px 0;">
  <a href="${postUrl}" style="display:inline-block;background:#d4a24c;color:#1a2b4a;padding:14px 28px;text-decoration:none;font-weight:bold;letter-spacing:0.1em;text-transform:uppercase;font-size:12px;">Read the full post →</a>
</p>
    `.trim();

    const campaignPayload = {
      name: `Blog: ${post.title}`,
      subject: post.title,
      from_name: blogSettings?.signoff_name || 'Concierge Nurse Business Society',
      from_email: 'info@conciergenursesociety.com',
      body,
      status: 'draft',
    };

    const { data, error } = await supabase
      .from('email_campaigns')
      .insert(campaignPayload)
      .select('id')
      .single();

    setSendingCampaign(false);

    if (error) {
      alert(`Could not create campaign: ${error.message}`);
      return;
    }
    navigate(`/admin/campaigns/email/${data.id}/edit`);
  }

  function toggleCategory(categoryId) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  }

  function setTagsFromString(str) {
    const tags = (str || '').split(',').map((t) => t.trim()).filter(Boolean);
    setPost((p) => ({ ...p, tags }));
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Loading...</p>
      </div>
    );
  }

  const wordCount = editor?.storage.characterCount.words() || 0;
  const charCount = editor?.storage.characterCount.characters() || 0;

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-navy no-underline">
          <ArrowLeft size={14} /> Back to blog
        </Link>
        <div className="flex items-center gap-3">
          <SaveStatus saving={saving} lastSaved={lastSaved} error={saveError} />
          {post.status === 'published' && (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy text-sm flex items-center gap-2 no-underline"
            >
              <Eye size={14} /> Preview Live
            </a>
          )}
          {!isNew && (
            <button
              onClick={handleSendAsCampaign}
              disabled={sendingCampaign || post.status !== 'published'}
              className="btn-navy text-sm flex items-center gap-2 disabled:opacity-40"
              title={post.status !== 'published' ? 'Publish the post before sending as a campaign' : ''}
            >
              <Send size={14} /> {sendingCampaign ? 'Creating…' : 'Send as Campaign'}
            </button>
          )}
          <button onClick={() => savePost(true)} className="btn-navy text-sm flex items-center gap-2">
            <Save size={14} /> Save Draft
          </button>
          {post.status === 'published' ? (
            <button onClick={handleUnpublish} className="btn-primary text-sm">
              Unpublish
            </button>
          ) : (
            <button onClick={handlePublish} className="btn-primary text-sm">
              Publish Now
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Main editor column */}
        <div>
          {/* Cover image */}
          <div className="mb-5 bg-white border border-cream-dark">
            {post.cover_image_url ? (
              <div className="relative">
                <img src={post.cover_image_url} alt="" className="w-full aspect-[16/9] object-cover" />
                <button
                  onClick={() => setPost((p) => ({ ...p, cover_image_url: '' }))}
                  className="absolute top-3 right-3 bg-black/60 text-white p-1.5 hover:bg-black/80"
                  title="Remove cover"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 py-12 text-slate text-sm cursor-pointer hover:bg-cream/50 transition-colors">
                <ImageIcon size={16} />
                Upload cover image
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
              </label>
            )}
          </div>

          {/* Title */}
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost((p) => ({ ...p, title: e.target.value }))}
            placeholder="Post title"
            className="w-full text-4xl font-heading font-bold text-navy bg-transparent border-none focus:outline-none mb-3 placeholder:text-charcoal/20"
          />

          {/* Subtitle */}
          <input
            type="text"
            value={post.subtitle || ''}
            onChange={(e) => setPost((p) => ({ ...p, subtitle: e.target.value }))}
            placeholder="Subtitle (optional)"
            className="w-full text-lg italic text-slate bg-transparent border-none focus:outline-none mb-6 placeholder:text-charcoal/20"
          />

          {/* Editor */}
          <div className="bg-white border border-cream-dark">
            <BlogEditorToolbar editor={editor} onUploadImage={handleImageUpload} />
            <EditorContent editor={editor} />
          </div>

          {/* Word count */}
          <div className="mt-2 text-[0.65rem] text-charcoal/40 text-right">
            {wordCount} words · {charCount} characters
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-5">
          {/* Status + schedule */}
          <SidebarCard title="Publishing">
            <div className="space-y-3 text-sm">
              <div>
                <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Status</label>
                <select
                  value={post.status}
                  onChange={(e) => setPost((p) => ({ ...p, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              {post.status === 'scheduled' && (
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Publish at</label>
                  <input
                    type="datetime-local"
                    value={post.scheduled_for ? post.scheduled_for.slice(0, 16) : ''}
                    onChange={(e) => setPost((p) => ({ ...p, scheduled_for: e.target.value ? new Date(e.target.value).toISOString() : null }))}
                    className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                  />
                  <button onClick={handleSchedule} className="btn-navy text-xs mt-2 w-full">Schedule</button>
                </div>
              )}
            </div>
          </SidebarCard>

          {/* Slug */}
          <SidebarCard title="URL Slug">
            <div className="flex items-center gap-1">
              <span className="text-charcoal/40 text-xs">/blog/</span>
              <input
                type="text"
                value={post.slug}
                onChange={(e) => { setSlugManuallyEdited(true); setPost((p) => ({ ...p, slug: slugify(e.target.value) })); }}
                className="flex-1 px-2 py-1.5 border border-cream-dark bg-white text-xs font-mono focus:outline-none focus:border-gold"
              />
            </div>
            <p className="text-[0.6rem] text-charcoal/40 mt-2">
              {slugManuallyEdited ? 'Custom slug' : 'Auto-generated from title'}
            </p>
          </SidebarCard>

          {/* Excerpt */}
          <SidebarCard title="Excerpt">
            <textarea
              value={post.excerpt || ''}
              onChange={(e) => setPost((p) => ({ ...p, excerpt: e.target.value }))}
              placeholder="Short summary for the blog index. Auto-generated if blank."
              rows={3}
              className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold resize-none"
            />
          </SidebarCard>

          {/* Categories */}
          <SidebarCard title="Categories">
            {categories.length === 0 ? (
              <p className="text-xs text-slate">
                <Link to="/admin/blog/categories" className="text-gold underline">Create categories</Link> to organize posts.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.has(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                      className="accent-gold"
                    />
                    <span className="text-charcoal">{cat.name}</span>
                  </label>
                ))}
              </div>
            )}
          </SidebarCard>

          {/* Tags */}
          <SidebarCard title="Tags">
            <input
              type="text"
              value={(post.tags || []).join(', ')}
              onChange={(e) => setTagsFromString(e.target.value)}
              placeholder="post-op-recovery, pricing, hipaa"
              className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
            />
            <p className="text-[0.6rem] text-charcoal/40 mt-2">
              Comma-separated. Some tags auto-link to related resource pages.
            </p>
          </SidebarCard>

          {/* SEO */}
          <SidebarCard title="SEO">
            <div className="space-y-3">
              <div>
                <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">SEO title</label>
                <input
                  type="text"
                  value={post.seo_title || ''}
                  onChange={(e) => setPost((p) => ({ ...p, seo_title: e.target.value }))}
                  placeholder={post.title}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Meta description</label>
                <textarea
                  value={post.seo_description || ''}
                  onChange={(e) => setPost((p) => ({ ...p, seo_description: e.target.value }))}
                  placeholder="Falls back to excerpt."
                  rows={3}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold resize-none"
                />
              </div>
            </div>
          </SidebarCard>

          {/* Sign-off */}
          <SidebarCard title="Sign-Off">
            <label className="flex items-center gap-2 text-sm cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={post.use_default_signoff !== false}
                onChange={(e) => setPost((p) => ({ ...p, use_default_signoff: e.target.checked }))}
                className="accent-gold"
              />
              <span className="text-charcoal">Use default sign-off</span>
            </label>

            {post.use_default_signoff !== false ? (
              <div className="bg-cream/50 border border-cream-dark p-3 text-xs">
                {blogSettings?.signoff_closing_line && (
                  <p className="italic text-charcoal/70 mb-1">{blogSettings.signoff_closing_line}</p>
                )}
                <p className="font-semibold text-navy">{blogSettings?.signoff_name || '(Set in Settings)'}</p>
                {blogSettings?.signoff_title && <p className="text-slate">{blogSettings.signoff_title}</p>}
                <Link to="/admin/settings" className="text-gold text-[0.65rem] underline mt-2 inline-block">
                  Edit in Settings →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={post.signoff_closing_line || ''}
                  onChange={(e) => setPost((p) => ({ ...p, signoff_closing_line: e.target.value }))}
                  placeholder="Closing line (e.g. Keep building —)"
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
                <input
                  type="text"
                  value={post.signoff_name || ''}
                  onChange={(e) => setPost((p) => ({ ...p, signoff_name: e.target.value }))}
                  placeholder="Sign-off name"
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
                <input
                  type="text"
                  value={post.signoff_title || ''}
                  onChange={(e) => setPost((p) => ({ ...p, signoff_title: e.target.value }))}
                  placeholder="Sign-off title (optional)"
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
                <input
                  type="text"
                  value={post.signoff_photo_url || ''}
                  onChange={(e) => setPost((p) => ({ ...p, signoff_photo_url: e.target.value }))}
                  placeholder="Photo URL (optional)"
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
              </div>
            )}
          </SidebarCard>
        </aside>
      </div>
    </div>
  );
}

function SidebarCard({ title, children }) {
  return (
    <div className="bg-white border border-cream-dark p-5">
      <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function SaveStatus({ saving, lastSaved, error }) {
  if (error) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-red-600">
        <AlertCircle size={13} /> {error}
      </span>
    );
  }
  if (saving) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-slate">
        <Loader size={13} className="animate-spin" /> Saving…
      </span>
    );
  }
  if (lastSaved) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-slate">
        <CheckCircle2 size={13} className="text-green-600" />
        Saved at {lastSaved.toLocaleTimeString()}
      </span>
    );
  }
  return null;
}
