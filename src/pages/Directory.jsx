import { useEffect, useMemo, useState } from 'react';
import { Search, MapPin, Mail, Globe, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

function TikTokIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.971-1.165-1.956-1.282-2.645h.004C16.365 1.128 16.4 0 16.4 0h-3.392v13.126c0 .176 0 .35-.007.522l-.007.065-.003.027v.007a3.64 3.64 0 0 1-5.427 3.09 3.64 3.64 0 0 1 .79-6.8c.432-.08.876-.098 1.314-.054V6.527a7.046 7.046 0 0 0-5.788 2.005 7.427 7.427 0 0 0-1.613 2.441c-.172.425-.835 2.247-.523 4.966.196 1.544.713 2.496.713 2.496a7.646 7.646 0 0 0 1.785 2.287 7.503 7.503 0 0 0 4.32 1.83h.006c1.028.086 2.063-.01 3.055-.285 5.105-1.415 6.345-6.4 6.345-6.4.05-.172.09-.347.124-.523a9.79 9.79 0 0 0 .216-2.057V6.98c.146.087.303.173.46.252.392.202.806.37 1.236.5 1.032.31 2.11.466 3.19.46v-3.41c-.342.01-1.044-.095-1.773-.463-.417-.211-.804-.466-1.152-.758z"/>
    </svg>
  );
}

function LinkedInIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function FacebookIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
    </svg>
  );
}

function InstagramIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function Directory() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('all');

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('directory_members')
        .select('*')
        .eq('status', 'active')
        .order('display_order', { ascending: true })
        .order('name', { ascending: true });
      setMembers(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const specialties = useMemo(() => {
    const set = new Set();
    members.forEach((m) => { if (m.specialty) set.add(m.specialty); });
    return [...set].sort();
  }, [members]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return members.filter((m) => {
      if (specialty !== 'all' && m.specialty !== specialty) return false;
      if (!q) return true;
      return (
        (m.name || '').toLowerCase().includes(q) ||
        (m.business_name || '').toLowerCase().includes(q) ||
        (m.location || '').toLowerCase().includes(q) ||
        (m.specialty || '').toLowerCase().includes(q)
      );
    });
  }, [members, search, specialty]);

  return (
    <>
      <SEO
        title="Member Directory — Concierge Nurse Business Society"
        description="Find a concierge nurse business owner trained by the Concierge Nurse Business Society. Search by specialty, name, or location to connect with a nurse in your area."
        canonical="/directory"
      />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-4">Member Directory</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-5">
            Find a <span className="text-gold-gradient">Concierge Nurse</span>
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            Every nurse listed here completed the Concierge Nurse Business Method Accelerator and runs an independent private-pay concierge nursing practice.
          </p>
        </div>
      </section>

      {/* Search + specialty chips */}
      <section className="bg-cream border-b border-cream-dark py-6 sticky top-[114px] z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="relative max-w-2xl mx-auto mb-5">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
            <input
              type="text"
              placeholder="Search by name, specialty, or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold"
            />
          </div>
          {specialties.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSpecialty('all')}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                  specialty === 'all'
                    ? 'bg-navy text-gold border border-navy'
                    : 'bg-white text-charcoal border border-cream-dark hover:bg-navy hover:text-gold hover:border-navy'
                }`}
              >
                All
              </button>
              {specialties.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpecialty(s)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                    specialty === s
                      ? 'bg-navy text-gold border border-navy'
                      : 'bg-white text-charcoal border border-cream-dark hover:bg-navy hover:text-gold hover:border-navy'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <p className="text-center text-[0.65rem] uppercase tracking-[0.2em] text-charcoal/50 mt-4">
            {filtered.length} {filtered.length === 1 ? 'member' : 'members'}
          </p>
        </div>
      </section>

      {/* Member cards */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate text-sm">Loading directory…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate">No members match your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h3 className="font-heading text-2xl font-bold text-white mb-3">Are you a nurse looking to join this directory?</h3>
          <p className="text-white/60 text-base mb-8 max-w-lg mx-auto">
            This directory is exclusive to graduates of the Concierge Nurse Business Method Accelerator.
          </p>
          <a href="/accelerator" className="btn-primary inline-flex items-center gap-2 no-underline">
            Learn About the Accelerator →
          </a>
        </div>
      </section>
    </>
  );
}

function MemberCard({ member }) {
  const actions = [
    member.email && { label: 'Email', href: `mailto:${member.email}`, icon: Mail },
    member.website_url && { label: 'Website', href: member.website_url, icon: Globe, external: true },
    member.phone && { label: member.phone, href: `tel:${member.phone.replace(/[^\d+]/g, '')}`, icon: Phone },
    member.linkedin_url && { label: 'LinkedIn', href: member.linkedin_url, icon: LinkedInIcon, external: true },
    member.facebook_url && { label: 'Facebook', href: member.facebook_url, icon: FacebookIcon, external: true },
    member.instagram_url && { label: 'Instagram', href: member.instagram_url, icon: InstagramIcon, external: true },
    member.tiktok_url && { label: 'TikTok', href: member.tiktok_url, icon: TikTokIcon, external: true },
  ].filter(Boolean);

  return (
    <article className="bg-white border border-cream-dark flex flex-col shadow-sm">
      {/* Navy header */}
      <header className="bg-navy text-white px-6 py-5">
        <h2 className="font-heading text-xl font-bold leading-tight">{member.name}</h2>
        {member.credentials && (
          <p className="text-gold text-xs font-semibold tracking-[0.15em] uppercase mt-1">{member.credentials}</p>
        )}
        {member.business_name && (
          <p className="text-white/90 text-sm mt-3">{member.business_name}</p>
        )}
      </header>

      {/* White body */}
      <div className="p-6 flex-1 flex flex-col">
        {member.specialty && (
          <span className="inline-block self-start px-3 py-1 text-[0.6rem] font-semibold tracking-[0.1em] uppercase bg-gold/15 text-navy border border-gold/40 mb-4">
            {member.specialty}
          </span>
        )}
        {member.tagline && (
          <p className="italic text-charcoal/80 text-sm leading-relaxed mb-4">
            &ldquo;{member.tagline}&rdquo;
          </p>
        )}
        {member.location && (
          <p className="text-slate text-xs flex items-center gap-1.5 mb-5">
            <MapPin size={12} className="text-gold shrink-0" />
            <span>{member.location}</span>
          </p>
        )}

        {actions.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2">
            {actions.map((a) => {
              const Icon = a.icon;
              return (
                <a
                  key={a.label}
                  href={a.href}
                  target={a.external ? '_blank' : undefined}
                  rel={a.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[0.7rem] border border-cream-dark text-charcoal hover:bg-navy hover:text-gold hover:border-navy transition-colors no-underline"
                >
                  <Icon size={12} />
                  <span>{a.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
