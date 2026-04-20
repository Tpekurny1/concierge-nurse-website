import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const headings = [
  { id: 'quick-answer', text: 'Quick Answer' },
  { id: 'getting-started', text: 'Getting Started' },
  { id: 'legal-and-compliance', text: 'Legal & Compliance' },
  { id: 'pricing-and-income', text: 'Pricing & Income' },
  { id: 'marketing-and-clients', text: 'Marketing & Clients' },
  { id: 'operations', text: 'Operations' },
  { id: 'niches', text: 'Niches' },
];

const relatedResources = [
  {
    title: 'Concierge Nursing Startup Costs',
    description: 'Complete breakdown of one-time and monthly costs for launching your concierge nursing business.',
    link: '/resources/concierge-nursing-startup-costs',
    category: 'Planning',
  },
  {
    title: 'Concierge Nursing Niches Guide',
    description: 'In-depth look at 12 concierge nursing niches with comparison table and guidance on choosing.',
    link: '/resources/concierge-nursing-niches',
    category: 'Niches',
  },
  {
    title: 'Concierge Nurse Business Plan',
    description: 'Step-by-step guide to writing a business plan for your concierge nursing practice.',
    link: '/resources/concierge-nurse-business-plan',
    category: 'Planning',
  },
];

const faqEntries = [
  {
    category: 'Getting Started',
    questions: [
      { q: 'What is concierge nursing?', a: 'Concierge nursing is a model of private, direct-pay nursing care where a nurse provides personalized health services outside of traditional clinical settings, typically in the client\'s home or other private location.' },
      { q: 'How do I start a concierge nursing business?', a: 'Starting involves several key steps including choosing your niche, forming a legal entity, obtaining insurance, and building your referral network. The specific path depends on your license type, state, and chosen niche.' },
      { q: 'Do I need to be a Nurse Practitioner to start?', a: 'No. RNs can operate concierge nursing businesses in many niches. NPs have a broader scope of practice and can offer additional services, but RN-level licensure opens many opportunities.' },
      { q: 'Can I start while still working as a bedside nurse?', a: 'Yes, and many nurses do. Building on the side allows you to develop your client base gradually. Check your employment contract for any non-compete clauses.' },
      { q: 'How long does it take to launch?', a: 'Most nurses complete foundational steps in four to eight weeks. Building a steady client base typically takes three to six months of active marketing and networking.' },
    ]
  },
  {
    category: 'Legal & Compliance',
    questions: [
      { q: 'What legal structure should I use?', a: 'Most concierge nurses form an LLC for personal asset protection and tax flexibility. The right structure depends on your state and circumstances.' },
      { q: 'Do I need a special license to operate?', a: 'You need an active nursing license and a general business license. Additional requirements vary by state and municipality.' },
      { q: 'How do I stay HIPAA compliant?', a: 'HIPAA compliance involves protecting client health information through secure tools, proper consent forms, and appropriate data handling practices. Whether HIPAA technically applies depends on your practice model.' },
      { q: 'What insurance do I need?', a: 'At minimum, professional liability (malpractice) insurance. General liability is also strongly recommended. Additional coverages depend on your practice model.' },
      { q: 'Do I need a collaborative agreement?', a: 'This depends on your license type, state regulations, and the services you offer. RNs typically do not need one; NPs may, depending on their state.' },
    ]
  },
  {
    category: 'Pricing & Income',
    questions: [
      { q: 'How do concierge nurses set their prices?', a: 'Pricing depends on your niche, market, experience, and service model. Common structures include hourly rates, per-visit fees, packages, and retainers. Concierge nursing is a premium service and pricing should reflect that.' },
      { q: 'Do concierge nurses accept insurance?', a: 'Most operate on a private-pay basis, which allows you to set your own rates and avoid insurance billing complexity.' },
      { q: 'How much does it cost to start?', a: 'Most businesses can launch for between a few thousand and ten thousand dollars. Your niche significantly affects costs.' },
      { q: 'Is it financially sustainable full-time?', a: 'Yes, many nurses operate concierge practices as their sole income. Sustainability depends on niche demand, pricing, and building a reliable referral network.' },
    ]
  },
  {
    category: 'Marketing & Clients',
    questions: [
      { q: 'How do concierge nurses find clients?', a: 'The most effective strategies include building referral relationships with healthcare providers, maintaining a professional website, optimizing your Google Business Profile, and being active on social media.' },
      { q: 'How important is a website?', a: 'A professional website is one of the most important investments you can make. It establishes credibility and helps potential clients find you through search engines.' },
      { q: 'How do I build referral relationships?', a: 'Identify providers whose patients match your niche, introduce yourself professionally, and demonstrate how you complement their care. Consistent follow-through builds trust over time.' },
    ]
  },
  {
    category: 'Operations',
    questions: [
      { q: 'What technology do I need?', a: 'Essential tools include a documentation system, scheduling tool, secure communication method, and payment processing. Many affordable options exist for each category.' },
      { q: 'How do I handle documentation?', a: 'Use a HIPAA-compliant system to document each encounter. Document at the time of service or as soon as possible afterward.' },
      { q: 'How far should I travel for clients?', a: 'Most concierge nurses set a primary service radius of 15 to 30 miles and charge travel fees beyond that range.' },
    ]
  },
  {
    category: 'Niches',
    questions: [
      { q: 'What are the most popular niches?', a: 'Post-surgical recovery, postpartum care, geriatric care management, mobile IV therapy, executive health, and chronic disease management are among the most popular.' },
      { q: 'Can I change my niche later?', a: 'Yes. Many nurses refine their niche within the first year. The key is to start somewhere specific rather than trying to figure out the perfect niche before launching.' },
      { q: 'Which niches require additional certifications?', a: 'Niches like IV therapy, wound care, and aesthetic injections commonly require or benefit from additional certifications. Always verify with your state board of nursing.' },
    ]
  }
];

const allQuestions = faqEntries.flatMap(cat =>
  cat.questions.map(q => ({
    "@type": "Question",
    "name": q.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.a
    }
  }))
);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": allQuestions
};

export default function ConciergeNursingFAQ() {
  return (
    <ResourceLayout
      title="Concierge Nursing Business FAQ: Everything You Need to Know"
      description="Answers to the most common questions about starting and running a concierge nursing business. Covers licensing, costs, income, HIPAA, legal structure, getting clients, and more."
      canonical="https://www.conciergenursesociety.com/resources/concierge-nursing-faq"
      category="Getting Started"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Ready to Take the First Step?',
        description: 'Our Start Here path helps you figure out where you are in your concierge nursing journey and what to do next.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <section id="quick-answer">
        <QuickAnswer>
          <p>
            This page answers the most frequently asked questions about starting and running a concierge nursing
            business, organized by category: <strong>getting started, legal and compliance, pricing and income,
            marketing and clients, operations, and niches</strong>.
          </p>
        </QuickAnswer>
      </section>

      <h2 id="getting-started" className="font-heading text-2xl font-bold text-navy mt-12 mb-6">
        Getting Started
      </h2>
      {faqEntries[0].questions.map((item, i) => (
        <div key={`gs-${i}`} className="mb-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-2">{item.q}</h3>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">{item.a}</p>
        </div>
      ))}
      <p className="text-navy font-medium mt-4">Tracy walks through the entire getting-started process inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="legal-and-compliance" className="font-heading text-2xl font-bold text-navy mt-12 mb-6">
        Legal and Compliance
      </h2>
      {faqEntries[1].questions.map((item, i) => (
        <div key={`lc-${i}`} className="mb-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-2">{item.q}</h3>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">{item.a}</p>
        </div>
      ))}
      <p className="text-navy font-medium mt-4">Tracy covers legal setup in detail inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      <h2 id="pricing-and-income" className="font-heading text-2xl font-bold text-navy mt-12 mb-6">
        Pricing and Income
      </h2>
      {faqEntries[2].questions.map((item, i) => (
        <div key={`pi-${i}`} className="mb-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-2">{item.q}</h3>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">{item.a}</p>
        </div>
      ))}
      <p className="text-navy font-medium mt-4">Tracy provides pricing frameworks and calculators inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="marketing-and-clients" className="font-heading text-2xl font-bold text-navy mt-12 mb-6">
        Marketing and Getting Clients
      </h2>
      {faqEntries[3].questions.map((item, i) => (
        <div key={`mc-${i}`} className="mb-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-2">{item.q}</h3>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">{item.a}</p>
        </div>
      ))}
      <p className="text-navy font-medium mt-4">Tracy covers client acquisition strategy inside the <Link to="/strategy" className="text-gold hover:underline">strategy sessions</Link>.</p>

      <h2 id="operations" className="font-heading text-2xl font-bold text-navy mt-12 mb-6">
        Operations
      </h2>
      {faqEntries[4].questions.map((item, i) => (
        <div key={`op-${i}`} className="mb-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-2">{item.q}</h3>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">{item.a}</p>
        </div>
      ))}
      <p className="text-navy font-medium mt-4">Tracy provides operations SOPs and templates inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      <h2 id="niches" className="font-heading text-2xl font-bold text-navy mt-12 mb-6">
        Niches
      </h2>
      {faqEntries[5].questions.map((item, i) => (
        <div key={`ni-${i}`} className="mb-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-2">{item.q}</h3>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">{item.a}</p>
        </div>
      ))}
      <p className="text-navy font-medium mt-4">Tracy's niche selection framework inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> helps you find the right fit.</p>

      <div className="bg-cream border border-cream-dark p-6 mt-8">
        <p className="font-heading font-bold text-navy mb-2">Still Have Questions?</p>
        <p className="text-charcoal text-sm leading-relaxed">
          Every nurse's situation is unique. Consider{' '}
          <Link to="/strategy" className="text-gold hover:text-navy underline">booking a strategy consultation</Link>{' '}
          for personalized guidance.
        </p>
      </div>
    </ResourceLayout>
  );
}
