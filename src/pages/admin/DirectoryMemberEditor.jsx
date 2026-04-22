import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Upload, X, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const DEFAULT_MEMBER = {
  name: '',
  credentials: '',
  business_name: '',
  specialty: '',
  tagline: '',
  location: '',
  email: '',
  phone: '',
  website_url: '',
  linkedin_url: '',
  facebook_url: '',
  instagram_url: '',
  tiktok_url: '',
  photo_url: '',
  bio: '',
  display_order: 0,
  status: 'active',
};

export default function DirectoryMemberEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [member, setMember] = useState(DEFAULT_MEMBER);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [existingSpecialties, setExistingSpecialties] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    async function load() {
      // Load distinct specialties so Tracy can reuse existing ones
      const { data: spec } = await supabase
        .from('directory_members')
        .select('specialty')
        .not('specialty', 'is', null);
      const distinct = [...new Set((spec || []).map((r) => r.specialty).filter(Boolean))].sort();
      setExistingSpecialties(distinct);

      if (!isNew) {
        const { data } = await supabase
          .from('directory_members')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (data) {
          setMember({ ...DEFAULT_MEMBER, ...data });
        }
        setLoading(false);
      }
    }
    load();
  }, [id, isNew]);

  function set(field) {
    return (e) => setMember((m) => ({ ...m, [field]: e.target.value }));
  }

  async function handleSave(e) {
    if (e) e.preventDefault();
    setSaving(true);
    setError('');

    const payload = { ...member };
    // Normalize empty strings to null for optional fields
    for (const key of Object.keys(payload)) {
      if (payload[key] === '' && key !== 'status') payload[key] = null;
    }
    // Name is required
    if (!payload.name) {
      setError('Name is required.');
      setSaving(false);
      return;
    }
    payload.name = member.name.trim();
    payload.display_order = parseInt(member.display_order, 10) || 0;

    try {
      if (isNew) {
        const { data, error: err } = await supabase
          .from('directory_members')
          .insert(payload)
          .select('id')
          .single();
        if (err) throw err;
        navigate(`/admin/directory/${data.id}/edit`, { replace: true });
      } else {
        const { error: err } = await supabase
          .from('directory_members')
          .update(payload)
          .eq('id', id);
        if (err) throw err;
      }
      setSaving(false);
    } catch (err) {
      setError(err.message || 'Save failed.');
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    await supabase.from('directory_members').delete().eq('id', id);
    navigate('/admin/directory');
  }

  async function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: err } = await supabase.storage
        .from('blog-images')
        .upload(`directory/${safeName}`, file, { cacheControl: '3600', upsert: false });
      if (err) throw err;
      const { data } = supabase.storage.from('blog-images').getPublicUrl(`directory/${safeName}`);
      setMember((m) => ({ ...m, photo_url: data.publicUrl }));
    } catch (err) {
      setError(`Photo upload failed: ${err.message}`);
    }
    setUploadingPhoto(false);
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link to="/admin/directory" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-navy no-underline">
          <ArrowLeft size={14} /> Back to directory
        </Link>
        <div className="flex items-center gap-3">
          {!isNew && member.status === 'active' && (
            <a
              href="/directory"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy text-sm flex items-center gap-2 no-underline"
            >
              <Eye size={14} /> View Public Directory
            </a>
          )}
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm flex items-center gap-2 disabled:opacity-60">
            <Save size={14} /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <h1 className="font-heading text-2xl font-bold text-navy mb-8">
        {isNew ? 'Add Directory Member' : 'Edit Directory Member'}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 p-3 text-red-700 text-sm mb-6">{error}</div>
      )}

      <form onSubmit={handleSave} className="grid lg:grid-cols-[2fr_1fr] gap-6 max-w-5xl">
        {/* Left column — main fields */}
        <div className="space-y-6">
          <Card title="Identity">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name *">
                <input
                  type="text"
                  required
                  value={member.name}
                  onChange={set('name')}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
              </Field>
              <Field label="Credentials">
                <input
                  type="text"
                  placeholder="RN, BSN, MSN"
                  value={member.credentials || ''}
                  onChange={set('credentials')}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
              </Field>
            </div>
            <Field label="Business Name">
              <input
                type="text"
                value={member.business_name || ''}
                onChange={set('business_name')}
                className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
              />
            </Field>
            <Field label="Specialty" hint="Type a new one or pick one you have used before.">
              <input
                list="specialty-options"
                type="text"
                value={member.specialty || ''}
                onChange={set('specialty')}
                placeholder="Post-Operative Concierge Nursing"
                className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
              />
              <datalist id="specialty-options">
                {existingSpecialties.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </Field>
            <Field label="Tagline" hint="The italic quote describing their service.">
              <textarea
                rows={2}
                value={member.tagline || ''}
                onChange={set('tagline')}
                placeholder="Specialized post-operative recovery nursing care delivered in the comfort of your home."
                className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold resize-none"
              />
            </Field>
            <Field label="Location">
              <input
                type="text"
                placeholder="New York, NY"
                value={member.location || ''}
                onChange={set('location')}
                className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
              />
            </Field>
          </Card>

          <Card title="Contact & Links">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Email">
                <input
                  type="email"
                  value={member.email || ''}
                  onChange={set('email')}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={member.phone || ''}
                  onChange={set('phone')}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
              </Field>
            </div>
            <Field label="Website">
              <input
                type="url"
                placeholder="https://..."
                value={member.website_url || ''}
                onChange={set('website_url')}
                className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
              />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="LinkedIn URL">
                <input
                  type="url"
                  value={member.linkedin_url || ''}
                  onChange={set('linkedin_url')}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
              </Field>
              <Field label="Facebook URL">
                <input
                  type="url"
                  value={member.facebook_url || ''}
                  onChange={set('facebook_url')}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
              </Field>
              <Field label="Instagram URL">
                <input
                  type="url"
                  value={member.instagram_url || ''}
                  onChange={set('instagram_url')}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
              </Field>
              <Field label="TikTok URL">
                <input
                  type="url"
                  value={member.tiktok_url || ''}
                  onChange={set('tiktok_url')}
                  className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
                />
              </Field>
            </div>
          </Card>

          <Card title="Bio (optional)">
            <textarea
              rows={5}
              value={member.bio || ''}
              onChange={set('bio')}
              placeholder="A longer description if the member wants one."
              className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold resize-none"
            />
          </Card>
        </div>

        {/* Right column — photo, status, order, delete */}
        <div className="space-y-6">
          <Card title="Photo">
            {member.photo_url ? (
              <div className="relative">
                <img src={member.photo_url} alt="" className="w-full aspect-square object-cover border border-cream-dark" />
                <button
                  type="button"
                  onClick={() => setMember((m) => ({ ...m, photo_url: '' }))}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1.5 hover:bg-black/80"
                  title="Remove"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 py-10 border border-dashed border-cream-dark text-slate text-sm cursor-pointer hover:bg-cream/50 transition-colors">
                <Upload size={14} />
                {uploadingPhoto ? 'Uploading…' : 'Upload photo'}
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            )}
          </Card>

          <Card title="Visibility">
            <Field label="Status">
              <select
                value={member.status}
                onChange={set('status')}
                className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
              >
                <option value="active">Active — shown publicly</option>
                <option value="hidden">Hidden — only in admin</option>
              </select>
            </Field>
            <Field label="Display order" hint="Lower numbers appear first. Default 0.">
              <input
                type="number"
                value={member.display_order}
                onChange={set('display_order')}
                className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
              />
            </Field>
          </Card>

          {!isNew && (
            <Card title="Danger Zone">
              {confirmDelete ? (
                <div className="space-y-3">
                  <p className="text-sm text-red-700">This cannot be undone.</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white text-sm hover:bg-red-700"
                    >
                      Yes, delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="px-4 py-2 border border-cream-dark text-sm hover:bg-cream"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="w-full px-4 py-2 border border-red-300 text-red-600 text-sm hover:bg-red-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} /> Delete member
                </button>
              )}
            </Card>
          )}
        </div>
      </form>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white border border-cream-dark p-5 space-y-4">
      <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">{label}</label>
      {children}
      {hint && <p className="text-[0.6rem] text-charcoal/40 mt-1">{hint}</p>}
    </div>
  );
}
