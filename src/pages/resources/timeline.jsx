import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const faqItems = [
  {
    question: "Can I launch faster than six months?",
    answer: "Yes. Some nurses complete the process in eight to twelve weeks when building full-time. The Accelerator compresses the core steps into six weeks."
  },
  {
    question: "What if I fall behind?",
    answer: "This is a guideline, not a rigid schedule. Keep making progress. If you get stuck on a step, complete it before moving forward."
  },
  {
    question: "Should I quit my job before starting?",
    answer: "Most nurses build on the side and do not consider leaving full-time work until they have validated their market and built a steady client flow."
  },
  {
    question: "What is the most important month?",
    answer: "Month one is arguably most critical because niche selection and business structure decisions shape everything that follows."
  },
  {
    question: "Do I need money saved?",
    answer: "You should have enough to cover startup costs, which generally range from a few hundred to a few thousand dollars for the basics."
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
  "headline": "Concierge Nursing Startup Timeline: Month by Month",
  "description": "A month-by-month timeline for launching your concierge nursing business. Know exactly what to focus on in months one through six.",
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
  { id: 'before-you-begin', text: 'Before You Begin' },
  { id: 'month-1', text: 'Month 1: Research & Foundation' },
  { id: 'month-2', text: 'Month 2: Legal & Compliance' },
  { id: 'month-3', text: 'Month 3: Business Operations' },
  { id: 'month-4', text: 'Month 4: Marketing Foundation' },
  { id: 'month-5', text: 'Month 5: Pre-Launch' },
  { id: 'month-6', text: 'Month 6: Launch & First Clients' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'Startup Checklist',
    description: 'A comprehensive checklist of every step needed to launch, organized by phase.',
    link: '/resources/checklist',
    category: 'Getting Started',
  },
  {
    title: 'How to Start a Concierge Nursing Business',
    description: 'The complete step-by-step guide covering everything from niche to first client.',
    link: '/resources/how-to-start-a-concierge-nursing-business',
    category: 'Getting Started',
  },
  {
    title: 'Concierge Nursing Startup Costs',
    description: 'What you will actually spend to launch your concierge nursing business.',
    link: '/resources/concierge-nursing-startup-costs',
    category: 'Financial',
  },
];

export default function Timeline() {
  return (
    <ResourceLayout
      title="Concierge Nursing Startup Timeline: Month by Month"
      description="A month-by-month timeline for launching your concierge nursing business. Know exactly what to focus on in months one through six to go from idea to first client."
      canonical="https://www.conciergenursesociety.com/resources/timeline"
      schema={articleSchema}
      category="Getting Started"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Do This Timeline in 6 Weeks',
        description: 'The Accelerator compresses this six-month timeline into a guided six-week program with coaching, templates, and accountability.',
        buttonText: 'Learn About the Accelerator',
        buttonLink: '/accelerator',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Most nurses can go from idea to first client in about six months when building part-time. This timeline
          breaks down what to focus on each month: research in month one, legal setup in month two, operations
          in month three, marketing in month four, pre-launch in month five, and your official launch in month six.
        </p>
      </QuickAnswer>

      <h2 id="before-you-begin">Before You Begin</h2>
      <p>
        This timeline assumes you are building part-time alongside other employment. If building full-time, you can
        compress this into three to four months. Before starting, make sure you have an active nursing license and
        a genuine interest in the business side of concierge nursing, not just the clinical side.
      </p>

      <h2 id="month-1">Month 1: Research &amp; Foundation</h2>
      <p className="text-slate text-sm mb-2">Focus: Niche selection, market research, and business planning</p>
      <p>
        Month one is about making informed decisions before you spend a dollar. Study the concierge nursing model,
        choose your niche based on your background and local market, review your state's scope of practice, research
        your competitive landscape, and draft a business plan with your 90-day goals.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides niche selection frameworks and business plan templates inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="month-2">Month 2: Legal &amp; Compliance</h2>
      <p className="text-slate text-sm mb-2">Focus: Business entity formation, insurance, and legal compliance</p>
      <p>
        Month two is about building your legal foundation. This includes choosing and forming your business entity,
        obtaining your EIN, securing professional liability insurance, addressing HIPAA compliance, and drafting
        your client service agreements.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides contract templates and compliance checklists inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      <h2 id="month-3">Month 3: Business Operations</h2>
      <p className="text-slate text-sm mb-2">Focus: Pricing, systems, and operational readiness</p>
      <p>
        With your legal foundation in place, month three focuses on operational setup: opening a business bank
        account, designing your service packages and pricing, setting up payment processing, building your client
        onboarding process, and creating your standard operating procedures.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides pricing frameworks and onboarding templates inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="month-4">Month 4: Marketing Foundation</h2>
      <p className="text-slate text-sm mb-2">Focus: Website, online presence, and marketing materials</p>
      <p>
        Month four is about making yourself findable. Build your professional website, claim and optimize your
        Google Business Profile, set up social media profiles, design business cards and referral materials, and
        craft your elevator pitch.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides marketing templates and guided launch strategy inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="month-5">Month 5: Pre-Launch</h2>
      <p className="text-slate text-sm mb-2">Focus: Referral relationships, networking, and final preparations</p>
      <p>
        Month five shifts to relationship building. Identify your top referral sources, schedule in-person
        introductions, attend networking events, do a full test run of your client journey, and begin sharing
        educational content on social media to build awareness.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides referral scripts and networking strategies inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="month-6">Month 6: Launch &amp; First Clients</h2>
      <p className="text-slate text-sm mb-2">Focus: Officially opening for business and serving your first clients</p>
      <p>
        Month six is your launch. Make your official announcement, follow up with every referral source, book your
        first consultations, establish a weekly business routine, and begin collecting feedback to refine your
        services and processes.
      </p>

      <div className="bg-gold/5 border border-gold/20 p-6 mt-8 mb-6">
        <p className="font-heading text-base font-semibold text-navy mb-2">What Happens After Month 6?</p>
        <p>
          Month six is the starting line, not the finish line. Your focus shifts to growing your client base,
          strengthening referral relationships, and building systems that allow your practice to scale.
        </p>
      </div>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Want to Compress This Timeline?</p>
        <p>
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator program</Link> guides you through the equivalent of this six-month timeline in just six weeks with step-by-step coaching, templates, and a cohort of fellow nurse entrepreneurs.
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
