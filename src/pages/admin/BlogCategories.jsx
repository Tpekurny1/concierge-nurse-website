import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { slugify } from '../../lib/blogUtils';

export default function BlogCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  async function load() {
    const { data } = await supabase.from('blog_categories').select('*').order('name');
    setCategories(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    await supabase.from('blog_categories').insert({
      name: newName.trim(),
      slug: slugify(newName),
      description: newDesc.trim() || null,
    });
    setNewName('');
    setNewDesc('');
    setSaving(false);
    load();
  }

  async function handleDelete(id) {
    await supabase.from('blog_post_categories').delete().eq('category_id', id);
    await supabase.from('blog_categories').delete().eq('id', id);
    setDeletingId(null);
    load();
  }

  return (
    <div>
      <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-navy no-underline mb-6">
        <ArrowLeft size={14} /> Back to blog
      </Link>

      <h1 className="font-heading text-2xl font-bold text-navy mb-8">Blog Categories</h1>

      {/* New category form */}
      <form onSubmit={handleCreate} className="bg-white border border-cream-dark p-5 mb-8">
        <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-3">New Category</h3>
        <div className="grid sm:grid-cols-[1fr_2fr_auto] gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name"
            required
            className="px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
          />
          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description (optional)"
            className="px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
          />
          <button type="submit" disabled={saving} className="btn-primary text-sm flex items-center gap-2 disabled:opacity-40">
            <Plus size={14} /> {saving ? 'Adding…' : 'Add'}
          </button>
        </div>
        {newName && (
          <p className="text-[0.6rem] text-charcoal/40 mt-2">
            URL will be <code className="bg-cream px-1">/blog/category/{slugify(newName)}</code>
          </p>
        )}
      </form>

      {/* Categories list */}
      <div className="bg-white border border-cream-dark">
        {loading ? (
          <div className="p-10 text-center">
            <p className="text-slate text-sm">Loading...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-slate text-sm">No categories yet. Create one above.</p>
          </div>
        ) : (
          <div className="divide-y divide-cream-dark">
            {categories.map((cat) => (
              <div key={cat.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy">{cat.name}</p>
                  {cat.description && <p className="text-xs text-slate mt-0.5">{cat.description}</p>}
                  <p className="text-[0.6rem] text-charcoal/40 mt-1 font-mono">/blog/category/{cat.slug}</p>
                </div>
                {deletingId === cat.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="px-2 py-1 bg-red-600 text-white text-xs hover:bg-red-700"
                    >
                      Confirm delete
                    </button>
                    <button
                      onClick={() => setDeletingId(null)}
                      className="px-2 py-1 text-charcoal/60 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeletingId(cat.id)}
                    className="p-2 text-charcoal/60 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
