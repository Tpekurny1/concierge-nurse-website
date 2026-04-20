import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, Scale, Briefcase, TrendingUp, MapPin, Users, Heart, FileText, Lightbulb, Award, Calendar, BarChart3, Layers } from 'lucide-react';
import SEO from '../components/SEO';

const categories = [
  { key: 'all', label: 'All Resources' },
  { key: 'getting-started', label: 'Getting Started' },
  { key: 'niches', label: 'Niches' },
  { key: 'legal', label: 'Legal & Compliance' },
  { key: 'operations', label: 'Operations' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'financial', label: 'Financial' },
  { key: 'career', label: 'Career Transition' },
  { key: 'locations', label: 'By Location' },
  { key: 'mindset', label: 'Mindset' },
  { key: 'scaling', label: 'Scaling' },
];

const pillarGuides = [
  { title: 'What Is a Concierge Nurse?', description: 'The definitive guide to understanding concierge nursing — what it is, who hires concierge nurses, and how to become one.', link: '/resources/what-is-a-concierge-nurse', readTime: '15 min', category: 'getting-started' },
  { title: 'How to Start a Concierge Nursing Business', description: 'Complete step-by-step guide covering everything from choosing your niche to getting your first clients.', link: '/resources/how-to-start-a-concierge-nursing-business', readTime: '20 min', category: 'getting-started' },
  { title: 'HIPAA Compliance for Concierge Nurses', description: 'When HIPAA applies, what compliance requires, and how to set up HIPAA-compliant systems.', link: '/resources/hipaa-compliance-for-concierge-nurses', readTime: '12 min', category: 'legal' },
  { title: 'Concierge Nurse Pricing Guide', description: 'How to set your rates — hourly, packages, retainers — with formulas and niche-specific guidance.', link: '/resources/concierge-nurse-pricing-guide', readTime: '15 min', category: 'financial' },
  { title: 'Concierge Nursing Niches Guide', description: 'Compare 12+ concierge nursing niches by startup cost, demand, income potential, and ideal background.', link: '/resources/concierge-nursing-niches', readTime: '18 min', category: 'niches' },
];

const resources = [
  // Getting Started
  { title: 'Concierge Nursing vs. Private Duty vs. Home Health', description: 'Understand the key differences between these three nursing models.', link: '/resources/concierge-nursing-vs-private-duty-vs-home-health', category: 'getting-started', readTime: '10 min' },
  { title: 'How to Get Your First Clients', description: 'Proven strategies for building referral relationships and acquiring clients.', link: '/resources/how-to-get-concierge-nursing-clients', category: 'marketing', readTime: '12 min' },
  { title: 'Startup Costs Breakdown', description: 'What you will actually spend to launch your concierge nursing business.', link: '/resources/concierge-nursing-startup-costs', category: 'financial', readTime: '10 min' },
  { title: 'Concierge Nurse Business Plan', description: 'What to include and how to write a business plan for your nursing practice.', link: '/resources/concierge-nurse-business-plan', category: 'getting-started', readTime: '12 min' },
  { title: 'Concierge Nursing FAQ', description: 'Answers to 30+ common questions about starting a concierge nursing business.', link: '/resources/concierge-nursing-faq', category: 'getting-started', readTime: '20 min' },

  // Niches
  { title: 'Post-Op Recovery Nursing Business', description: 'How to start a post-operative recovery concierge nursing practice.', link: '/resources/niches/post-op-recovery-nursing-business', category: 'niches', readTime: '10 min' },
  { title: 'Postpartum Concierge Nursing', description: 'Build a business supporting new mothers after delivery.', link: '/resources/niches/postpartum-concierge-nursing-business', category: 'niches', readTime: '10 min' },
  { title: 'Geriatric Concierge Nursing', description: 'Serve aging clients who want to remain in their homes.', link: '/resources/niches/geriatric-concierge-nursing-business', category: 'niches', readTime: '10 min' },
  { title: 'IV Therapy Nursing Business', description: 'Launch a mobile IV therapy business as a concierge nurse.', link: '/resources/niches/iv-therapy-nursing-business', category: 'niches', readTime: '10 min' },
  { title: 'Luxury VIP Concierge Nursing', description: 'Serve high-net-worth clients with premium nursing services.', link: '/resources/niches/luxury-vip-concierge-nursing', category: 'niches', readTime: '10 min' },

  // Legal
  { title: 'LLC vs. PLLC for Nursing Businesses', description: 'Which legal entity is right for your concierge nursing practice.', link: '/resources/legal/nursing-business-llc-vs-pllc', category: 'legal', readTime: '10 min' },
  { title: 'Insurance Requirements', description: 'What coverage you need — professional liability, general liability, and more.', link: '/resources/legal/concierge-nurse-insurance-requirements', category: 'legal', readTime: '10 min' },
  { title: 'Scope of Practice', description: 'What you can and cannot do as a concierge nurse in your state.', link: '/resources/legal/concierge-nurse-scope-of-practice', category: 'legal', readTime: '10 min' },
  { title: 'Client Contracts', description: 'Essential clauses for your service agreements and client contracts.', link: '/resources/legal/concierge-nursing-client-contracts', category: 'legal', readTime: '10 min' },

  // Operations
  { title: 'Service Packages That Sell', description: 'How to design and price service packages for your practice.', link: '/resources/operations/concierge-nursing-service-packages', category: 'operations', readTime: '10 min' },
  { title: 'Client Onboarding Process', description: 'Step-by-step process for onboarding new concierge nursing clients.', link: '/resources/operations/concierge-nursing-client-onboarding', category: 'operations', readTime: '8 min' },
  { title: 'Tools and Software', description: 'Essential tools every concierge nurse needs to run their business.', link: '/resources/operations/concierge-nursing-tools-software', category: 'operations', readTime: '10 min' },
  { title: 'Building SOPs', description: 'Create standard operating procedures for consistency and scalability.', link: '/resources/operations/concierge-nursing-sops', category: 'operations', readTime: '10 min' },

  // Marketing
  { title: 'Marketing Your Business', description: 'Complete marketing guide for concierge nurse entrepreneurs.', link: '/resources/marketing/concierge-nursing-business-marketing', category: 'marketing', readTime: '15 min' },
  { title: 'Physician Referral Relationships', description: 'How to build referral partnerships with physicians and surgeons.', link: '/resources/marketing/physician-referral-relationships', category: 'marketing', readTime: '10 min' },
  { title: 'Google Business Profile', description: 'Set up and optimize your Google Business Profile for local visibility.', link: '/resources/marketing/concierge-nurse-google-business-profile', category: 'marketing', readTime: '10 min' },
  { title: 'Social Media Marketing', description: 'Social media strategies specifically for concierge nurses.', link: '/resources/marketing/concierge-nurse-social-media', category: 'marketing', readTime: '10 min' },

  // Financial
  { title: 'Income Breakdown', description: 'How much do concierge nurses actually make? A realistic look.', link: '/resources/financial/concierge-nurse-income', category: 'financial', readTime: '10 min' },
  { title: 'Revenue Models', description: 'Compare hourly, package, and retainer models for your practice.', link: '/resources/financial/concierge-nursing-revenue-models', category: 'financial', readTime: '10 min' },
  { title: 'Tax Guide', description: 'Essential tax information for concierge nurse business owners.', link: '/resources/financial/concierge-nurse-tax-guide', category: 'financial', readTime: '12 min' },

  // Career
  { title: 'Leave Bedside Nursing', description: 'How to transition from bedside nursing to your own business.', link: '/resources/career/leave-bedside-nursing-start-business', category: 'career', readTime: '10 min' },
  { title: 'Start Part-Time', description: 'Can you build a concierge nursing business while keeping your job?', link: '/resources/career/concierge-nursing-part-time', category: 'career', readTime: '8 min' },
  { title: 'Burnout to Business Owner', description: 'Making the transition from nurse burnout to entrepreneurship.', link: '/resources/career/nurse-burnout-to-business-owner', category: 'career', readTime: '10 min' },
  { title: 'Best Specialties for Concierge Nursing', description: 'Which nursing backgrounds translate best to concierge nursing.', link: '/resources/career/best-nursing-specialties-concierge-nursing', category: 'career', readTime: '8 min' },

  // Mindset
  { title: 'Is Concierge Nursing Saturated?', description: 'The truth about competition in the concierge nursing space.', link: '/resources/mindset/is-concierge-nursing-saturated', category: 'mindset', readTime: '8 min' },
  { title: 'Imposter Syndrome', description: 'How to overcome imposter syndrome as a nurse entrepreneur.', link: '/resources/mindset/nurse-entrepreneur-imposter-syndrome', category: 'mindset', readTime: '8 min' },
  { title: 'Fear of Failure', description: 'Managing risk and the fear of failure in your nursing business.', link: '/resources/mindset/what-if-nursing-business-fails', category: 'mindset', readTime: '8 min' },

  // Scaling
  { title: 'Solo to Agency', description: 'How to grow from a solo practice to a multi-nurse agency.', link: '/resources/scaling/solo-nurse-to-nursing-agency', category: 'scaling', readTime: '12 min' },
  { title: 'Hire Your First Subcontractor', description: 'When and how to bring on your first team member.', link: '/resources/scaling/hire-first-subcontractor-nursing', category: 'scaling', readTime: '10 min' },
  { title: 'Add Virtual Services', description: 'Expand your practice with telehealth and virtual offerings.', link: '/resources/scaling/add-virtual-services-concierge-nursing', category: 'scaling', readTime: '8 min' },

  // Locations
  { title: 'Find Your State Guide', description: 'State-specific guides for starting a concierge nursing business in all 50 states.', link: '/resources/states/concierge-nursing-business-in-texas', category: 'locations', readTime: '10 min' },
];

const resourceSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Concierge Nursing Business Resources",
  "description": "Free educational resources for nurses building concierge nursing businesses. Guides, templates, checklists, and more.",
  "url": "https://www.conciergenursesociety.com/resources",
  "provider": { "@type": "Organization", "name": "Concierge Nurse Business Society" }
};

export default function Resources() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    return resources.filter(r => {
      const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
      const matchesSearch = search === '' ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      <SEO
        title="Concierge Nursing Business Resources | Concierge Nurse Business Society"
        description="Free educational resources for nurses building concierge nursing businesses. Step-by-step guides, legal templates, marketing strategies, financial planning, and more."
        canonical="/resources"
        type="website"
        schema={resourceSchema}
      />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="section-label mb-4">Free Resources</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-5">
            Concierge Nursing{' '}
            <span className="text-gold-gradient">Business Resources</span>
          </h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Everything you need to build, launch, and scale your concierge
            nursing business. Free guides, templates, checklists, and
            expert insights.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-cream border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-1 overflow-x-auto py-3 -mx-6 px-6 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-body font-medium uppercase tracking-[0.1em] transition-colors ${
                  activeCategory === cat.key
                    ? 'bg-navy text-white'
                    : 'text-charcoal hover:bg-navy/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pillar Guides */}
      {(activeCategory === 'all' && search === '') && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <p className="section-label mb-4">Start Here</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy mb-8">
              Essential Guides
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillarGuides.map((guide, i) => (
                <Link
                  key={i}
                  to={guide.link}
                  className="block bg-navy p-8 group hover:bg-navy-light transition-colors"
                >
                  <p className="text-gold text-xs font-body font-medium uppercase tracking-[0.15em] mb-3">
                    Pillar Guide · {guide.readTime}
                  </p>
                  <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {guide.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.15em] font-medium">
                    Read Guide <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Resources Grid */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {activeCategory === 'all' && search === '' && (
            <>
              <p className="section-label mb-4">Browse All</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy mb-8">
                All Resources
              </h2>
            </>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate text-lg mb-2">No resources found.</p>
              <p className="text-slate text-sm">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((resource, i) => (
                <Link
                  key={i}
                  to={resource.link}
                  className="block bg-white border border-cream-dark p-6 hover:border-navy transition-colors group"
                >
                  <p className="text-xs font-body font-medium uppercase tracking-[0.15em] text-gold mb-2">
                    {categories.find(c => c.key === resource.category)?.label} · {resource.readTime}
                  </p>
                  <h3 className="font-heading text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {resource.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* State/City Section */}
      {(activeCategory === 'all' || activeCategory === 'locations') && search === '' && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <p className="section-label mb-4">By Location</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy mb-4">
              State & City Guides
            </h2>
            <p className="text-slate text-base leading-relaxed mb-8 max-w-2xl">
              State-specific guides covering RN scope of practice, LLC vs. PLLC requirements,
              Nurse Licensure Compact status, and local market opportunities for all 50 states
              and 50 major metro areas.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Texas', 'Florida', 'California', 'New York', 'Georgia', 'North Carolina', 'Tennessee', 'Arizona', 'Colorado', 'Washington'].map(state => (
                <Link
                  key={state}
                  to={`/resources/states/concierge-nursing-business-in-${state.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 border border-cream-dark text-sm text-charcoal hover:border-navy hover:text-navy transition-colors"
                >
                  {state}
                </Link>
              ))}
              <Link
                to="/resources/states/concierge-nursing-business-in-alabama"
                className="px-4 py-2 border border-gold text-sm text-gold hover:bg-gold hover:text-navy transition-colors"
              >
                View All 50 States →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="section-label mb-4">Ready to Start?</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            Find Your Path to a Concierge Nursing Business
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/60 text-base leading-relaxed mb-8">
            Whether you are exploring, building, or scaling — we have the right
            program, toolkit, or coaching pathway for where you are right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/start-here" className="btn-secondary inline-flex items-center justify-center gap-2">
              Start Here <ArrowRight size={14} />
            </Link>
            <Link to="/community" className="btn-white inline-flex items-center justify-center gap-2">
              Join Free Community <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
