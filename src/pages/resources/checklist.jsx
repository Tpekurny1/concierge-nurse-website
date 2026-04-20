import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const faqItems = [
  {
    question: "How long does it take to complete this entire checklist?",
    answer: "Most nurses complete all five phases in three to six months. Some phases can overlap, and your timeline depends on whether you are building full-time or part-time."
  },
  {
    question: "Do I need to complete every item before seeing clients?",
    answer: "Phases 1 through 3 should be completed before working with clients. Phases 4 and 5 can be refined over time."
  },
  {
    question: "Can I start without an LLC?",
    answer: "You can operate as a sole proprietor, but this offers no personal liability protection. An LLC or PLLC is strongly recommended before seeing clients."
  },
  {
    question: "What is the most common mistake when launching?",
    answer: "Skipping niche selection and trying to serve everyone. A defined niche allows you to market effectively and build targeted referral relationships."
  },
  {
    question: "Do I need a business plan?",
    answer: "Not legally required, but a written plan significantly increases your chances of building a sustainable practice."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Concierge Nursing Business Startup Checklist",
  "description": "A comprehensive checklist of every step needed to launch your concierge nursing business, from choosing your niche to getting your first client.",
  "author": {
    "@type": "Organization",
    "name": "Concierge Nurse Business Society"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Concierge Nurse Business Society"
  },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'how-to-use-this-checklist', text: 'How to Use This Checklist' },
  { id: 'phase-1-research-planning', text: 'Phase 1: Research & Planning' },
  { id: 'phase-2-legal-foundation', text: 'Phase 2: Legal Foundation' },
  { id: 'phase-3-business-setup', text: 'Phase 3: Business Setup' },
  { id: 'phase-4-marketing-foundation', text: 'Phase 4: Marketing Foundation' },
  { id: 'phase-5-launch', text: 'Phase 5: Launch' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'How to Start a Concierge Nursing Business',
    description: 'The complete step-by-step guide that expands on every phase in this checklist.',
    link: '/resources/how-to-start-a-concierge-nursing-business',
    category: 'Getting Started',
  },
  {
    title: 'Concierge Nursing Startup Timeline',
    description: 'A month-by-month timeline showing when to complete each milestone.',
    link: '/resources/timeline',
    category: 'Getting Started',
  },
  {
    title: 'Startup Costs Breakdown',
    description: 'What you will actually spend to launch your concierge nursing business.',
    link: '/resources/concierge-nursing-startup-costs',
    category: 'Financial',
  },
];

export default function Checklist() {
  return (
    <ResourceLayout
      title="Concierge Nursing Business Startup Checklist"
      description="A comprehensive checklist of every step needed to launch your concierge nursing business, from choosing your niche to getting your first client."
      canonical="https://www.conciergenursesociety.com/resources/checklist"
      schema={articleSchema}
      category="Getting Started"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Get the Tools to Check Every Box',
        description: 'Our Toolkits include templates, contracts, and SOPs that cover most items on this checklist. The Accelerator walks you through all five phases with expert guidance.',
        buttonText: 'View Toolkits',
        buttonLink: '/toolkits',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Launching a concierge nursing business involves five phases: research and planning, building your legal foundation, setting up business operations, establishing your marketing foundation, and executing your launch. This checklist covers the key areas so nothing falls through the cracks.
        </p>
      </QuickAnswer>

      <h2 id="how-to-use-this-checklist">How to Use This Checklist</h2>
      <p>
        This checklist is organized in five phases. Phases 1 through 3 are sequential. Phases 4 and 5 can overlap. The <Link to="/toolkits" className="text-gold hover:text-gold/80 underline">Toolkits</Link> include done-for-you templates for many of these items, and the <Link to="/accelerator" className="text-gold hover:text-gold/80 underline">Accelerator</Link> walks you through every phase with hands-on guidance.
      </p>

      <h2 id="phase-1-research-planning">Phase 1: Research &amp; Planning</h2>
      <p className="text-slate mb-4">
        This phase covers understanding the concierge model, choosing your niche, researching scope of practice, calculating startup costs, writing a business plan, and assessing your financial runway. Investing time here prevents costly mistakes later.
      </p>
      <p className="text-navy font-medium mt-2">Tracy provides niche selection frameworks and planning templates inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      <h2 id="phase-2-legal-foundation">Phase 2: Legal Foundation</h2>
      <p className="text-slate mb-4">
        Your legal foundation protects you personally and positions your business for credibility. This phase covers business entity formation, obtaining your EIN, getting liability insurance, addressing HIPAA compliance, drafting client contracts, and securing required licenses.
      </p>
      <p className="text-navy font-medium mt-2">Tracy provides contract templates and compliance checklists inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      <h2 id="phase-3-business-setup">Phase 3: Business Setup</h2>
      <p className="text-slate mb-4">
        With your legal foundation in place, set up the operational systems to run professionally. This phase covers banking, payment processing, service packages and pricing, client onboarding, supplies, and standard operating procedures.
      </p>
      <p className="text-navy font-medium mt-2">Tracy provides pricing frameworks and SOP templates inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="phase-4-marketing-foundation">Phase 4: Marketing Foundation</h2>
      <p className="text-slate mb-4">
        Clients and referral sources need to be able to find you. This phase covers your website, Google Business Profile, elevator pitch, social media presence, referral source identification, and printed marketing materials.
      </p>
      <p className="text-navy font-medium mt-2">Tracy provides marketing templates and referral scripts inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="phase-5-launch">Phase 5: Launch</h2>
      <p className="text-slate mb-4">
        Time to put yourself out there. This phase covers your business announcement, referral outreach, first consultations, establishing a marketing routine, financial tracking, and joining a professional community for support.
      </p>

      <div className="bg-gold/5 border border-gold/20 p-6 mb-6">
        <p className="font-heading text-base font-semibold text-navy mb-2">Want This Checklist with Expert Guidance?</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator program</Link> walks you through every phase with hands-on coaching and done-for-you templates. The <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> provide the contracts, SOPs, and templates you need.
        </p>
      </div>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index}>
              <h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </ResourceLayout>
  );
}
