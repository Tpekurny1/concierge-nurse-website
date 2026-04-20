import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Building2, DollarSign, Tag, Clock, FileText, Pencil, Phone, Flame, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getIntentMeta, getTemperature } from '../../lib/leadScoring';

export default function LeadDetail() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  async function load() {
    const [
      { data: contactData },
      { data: tagData },
      { data: noteData },
      { data: activityData },
    ] = await Promise.all([
      supabase.from('contacts').select('*').eq('id', id).single(),
      supabase.from('contact_tags').select('tags(name)').eq('contact_id', id),
      supabase.from('notes').select('*').eq('contact_id', id).order('created_at', { ascending: false }),
      supabase.from('activity_log').select('*').eq('contact_id', id).order('created_at', { ascending: false }),
    ]);

    setContact(contactData);
    setTags(tagData?.map((t) => t.tags?.name).filter(Boolean) || []);
    setNotes(noteData || []);
    setActivity(activityData || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleAddNote(e) {
    e.preventDefault();
    if (!noteText.trim()) return;
    setAddingNote(true);

    await supabase.from('notes').insert({ contact_id: id, content: noteText.trim() });

    setNoteText('');
    setAddingNote(false);

    // Refresh notes
    const { data } = await supabase.from('notes').select('*').eq('contact_id', id).order('created_at', { ascending: false });
    setNotes(data || []);
  }

  function startEdit() {
    setEditForm({
      first_name: contact.first_name || '',
      last_name: contact.last_name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      business_name: contact.business_name || '',
      annual_revenue: contact.annual_revenue || '',
      interest: contact.interest || '',
      lifecycle_stage: contact.lifecycle_stage || 'Explorer',
      status: contact.status || 'new',
    });
    setEditing(true);
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    await supabase.from('contacts').update(editForm).eq('id', id);
    setContact({ ...contact, ...editForm });
    setEditing(false);
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Loading...</p>
      </div>
    );
  }

  if (!contact) {
    return (
      <div>
        <p className="text-slate text-sm mb-4">Lead not found.</p>
        <Link to="/admin/leads" className="text-gold text-sm">Back to leads</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/admin/leads" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-navy no-underline mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to leads
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">
            {contact.first_name || ''} {contact.last_name || ''}
            {!contact.first_name && !contact.last_name && <span className="text-slate italic">No name</span>}
          </h1>
          <p className="text-slate text-sm mt-1">{contact.email}</p>
        </div>
        <div className="flex items-center gap-3">
          {!editing && (
            <button onClick={startEdit} className="btn-navy text-sm flex items-center gap-2">
              <Pencil size={14} /> Edit
            </button>
          )}
          <span className="inline-block px-3 py-1 text-[0.65rem] font-semibold tracking-wider uppercase bg-navy text-gold">
            {contact.lifecycle_stage || 'Explorer'}
          </span>
        </div>
      </div>

      {/* Scoring summary card */}
      <ScoringCard contact={contact} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column — Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact info */}
          <div className="bg-white border border-cream-dark p-6">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">Details</h3>
            {editing ? (
              <form onSubmit={handleSaveEdit} className="space-y-3">
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">First Name</label>
                  <input type="text" value={editForm.first_name} onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Last Name</label>
                  <input type="text" value={editForm.last_name} onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Email</label>
                  <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Phone</label>
                  <input type="text" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Business Name</label>
                  <input type="text" value={editForm.business_name} onChange={(e) => setEditForm({ ...editForm, business_name: e.target.value })} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Annual Revenue</label>
                  <input type="text" value={editForm.annual_revenue} onChange={(e) => setEditForm({ ...editForm, annual_revenue: e.target.value })} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Interest</label>
                  <input type="text" value={editForm.interest} onChange={(e) => setEditForm({ ...editForm, interest: e.target.value })} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Lifecycle Stage</label>
                  <select value={editForm.lifecycle_stage} onChange={(e) => setEditForm({ ...editForm, lifecycle_stage: e.target.value })} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold">
                    <option value="Explorer">Explorer</option>
                    <option value="DIYer">DIYer</option>
                    <option value="Builder">Builder</option>
                    <option value="Established Owner">Established Owner</option>
                  </select>
                </div>
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider text-charcoal/40 block mb-1">Status</label>
                  <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full px-3 py-2 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold">
                    <option value="new">New</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="unsubscribed">Unsubscribed</option>
                    <option value="bounced">Bounced</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary text-sm">Save</button>
                  <button type="button" onClick={() => setEditing(false)} className="btn-navy text-sm">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={14} className="text-gold mt-0.5" />
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-wider text-charcoal/40">Email</p>
                    <p className="text-charcoal text-sm">{contact.email}</p>
                  </div>
                </div>
                {contact.phone && (
                  <div className="flex items-start gap-3">
                    <Phone size={14} className="text-gold mt-0.5" />
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-wider text-charcoal/40">Phone</p>
                      <p className="text-charcoal text-sm">{contact.phone}</p>
                    </div>
                  </div>
                )}
                {contact.business_name && (
                  <div className="flex items-start gap-3">
                    <Building2 size={14} className="text-gold mt-0.5" />
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-wider text-charcoal/40">Business</p>
                      <p className="text-charcoal text-sm">{contact.business_name}</p>
                    </div>
                  </div>
                )}
                {contact.annual_revenue && (
                  <div className="flex items-start gap-3">
                    <DollarSign size={14} className="text-gold mt-0.5" />
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-wider text-charcoal/40">Revenue</p>
                      <p className="text-charcoal text-sm">{contact.annual_revenue}</p>
                    </div>
                  </div>
                )}
                {contact.interest && (
                  <div className="flex items-start gap-3">
                    <Tag size={14} className="text-gold mt-0.5" />
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-wider text-charcoal/40">Interest</p>
                      <p className="text-charcoal text-sm">{contact.interest.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white border border-cream-dark p-6">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">Tags</h3>
            {tags.length === 0 ? (
              <p className="text-slate text-sm">No tags</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-block px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider uppercase bg-cream text-charcoal/60 border border-cream-dark">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* UTM data */}
          {(contact.utm_source || contact.utm_medium || contact.utm_campaign) && (
            <div className="bg-white border border-cream-dark p-6">
              <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-4">Attribution</h3>
              <div className="space-y-2 text-sm">
                {contact.utm_source && <p className="text-slate"><span className="text-charcoal/60">Source:</span> {contact.utm_source}</p>}
                {contact.utm_medium && <p className="text-slate"><span className="text-charcoal/60">Medium:</span> {contact.utm_medium}</p>}
                {contact.utm_campaign && <p className="text-slate"><span className="text-charcoal/60">Campaign:</span> {contact.utm_campaign}</p>}
                {contact.referrer && <p className="text-slate"><span className="text-charcoal/60">Referrer:</span> {contact.referrer}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Right column — Notes & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notes */}
          <div className="bg-white border border-cream-dark">
            <div className="px-6 py-4 border-b border-cream-dark flex items-center gap-2">
              <FileText size={16} className="text-gold" />
              <h3 className="font-heading text-base font-bold text-navy">Notes</h3>
            </div>

            {/* Add note form */}
            <form onSubmit={handleAddNote} className="px-6 py-4 border-b border-cream-dark">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors resize-none mb-3"
              />
              <button type="submit" disabled={addingNote || !noteText.trim()} className="btn-primary text-sm">
                {addingNote ? 'Adding...' : 'Add Note'}
              </button>
            </form>

            {notes.length === 0 ? (
              <div className="p-6">
                <p className="text-slate text-sm">No notes yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-cream-dark">
                {notes.map((note) => (
                  <div key={note.id} className="px-6 py-4">
                    <p className="text-charcoal text-sm whitespace-pre-wrap">{note.content}</p>
                    <p className="text-slate text-[0.65rem] mt-2">
                      {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity timeline */}
          <div className="bg-white border border-cream-dark">
            <div className="px-6 py-4 border-b border-cream-dark flex items-center gap-2">
              <Clock size={16} className="text-gold" />
              <h3 className="font-heading text-base font-bold text-navy">Activity</h3>
            </div>
            {activity.length === 0 ? (
              <div className="p-6">
                <p className="text-slate text-sm">No activity yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-cream-dark">
                {activity.map((item) => (
                  <div key={item.id} className="px-6 py-4">
                    <div className="flex items-start justify-between">
                      <p className="text-charcoal text-sm">{item.description}</p>
                      <span className="text-slate text-[0.65rem] shrink-0 ml-4">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </div>
                    {item.metadata?.page_url && (
                      <p className="text-charcoal/40 text-xs mt-1">from {item.metadata.page_url}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoringCard({ contact }) {
  const [showReasons, setShowReasons] = useState(false);
  const intentMeta = getIntentMeta(contact.intent);
  const temp = getTemperature(contact.lead_score || 0);
  const reasons = Array.isArray(contact.score_reasons) ? contact.score_reasons : [];

  return (
    <div className="bg-white border border-cream-dark mb-8">
      <div className="px-6 py-5 flex flex-col md:flex-row md:items-center gap-5">
        {/* Intent */}
        <div className="flex-1">
          <p className="text-[0.65rem] uppercase tracking-[0.15em] text-charcoal/40 mb-2">Intent</p>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold ${intentMeta.chipClass}`}>
            <span>{intentMeta.emoji}</span>
            <span>{intentMeta.label}</span>
          </div>
        </div>

        {/* Temperature */}
        <div className="flex-1">
          <p className="text-[0.65rem] uppercase tracking-[0.15em] text-charcoal/40 mb-2 flex items-center gap-1.5">
            <Flame size={11} className="text-gold" /> Temperature
          </p>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold ${temp.chipClass}`}>
            <span className={`w-2 h-2 rounded-full ${temp.dotClass}`} />
            <span>{temp.label}</span>
          </div>
        </div>

        {/* Score */}
        <div className="flex-1">
          <p className="text-[0.65rem] uppercase tracking-[0.15em] text-charcoal/40 mb-2 flex items-center gap-1.5">
            <TrendingUp size={11} className="text-gold" /> Score
          </p>
          <div className="flex items-end gap-2">
            <span className="font-heading text-3xl font-bold text-navy leading-none">
              {contact.lead_score || 0}
            </span>
            <span className="text-slate text-xs mb-0.5">/ 100</span>
          </div>
        </div>

        {/* Why this score toggle */}
        <div className="md:border-l md:border-cream-dark md:pl-5">
          <button
            onClick={() => setShowReasons((s) => !s)}
            className="text-[0.7rem] uppercase tracking-wider text-charcoal/60 hover:text-gold transition-colors"
          >
            {showReasons ? 'Hide' : 'Why this score?'}
          </button>
        </div>
      </div>

      {showReasons && (
        <div className="border-t border-cream-dark px-6 py-5 bg-cream/30">
          {reasons.length === 0 ? (
            <p className="text-slate text-sm italic">
              No scoring signals recorded yet. Score was backfilled or lead predates the scoring system.
            </p>
          ) : (
            <div className="space-y-2">
              {reasons.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/80">{r.signal}</span>
                  <span className="font-mono font-semibold text-navy">
                    +{r.points}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between text-sm pt-3 mt-2 border-t border-cream-dark">
                <span className="text-charcoal font-semibold">Total</span>
                <span className="font-mono font-bold text-navy">
                  {contact.lead_score || 0}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
