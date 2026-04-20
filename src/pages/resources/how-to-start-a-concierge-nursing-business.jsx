import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const faqItems = [
  {
    question: "How much does it cost to start a concierge nursing business?",
    answer: "Startup costs vary but are generally low compared to other healthcare businesses. Most concierge nurses launch for under $5,000 in total, covering LLC formation, liability insurance, and a basic website."
  },
  {
    question: "Do I need an LLC or PLLC for a concierge nursing business?",
    answer: "Forming an LLC or PLLC is strongly recommended to separate personal assets from business liabilities. Some states require healthcare professionals to form a PLLC. Check your state's requirements."
  },
  {
    question: "How long does it take to get your first client?",
    answer: "This varies widely. Some nurses secure clients within a few weeks through existing networks, while others take 2-3 months. Having a clear niche and proactive outreach speeds up the process."
  },
  {
    question: "Can I start a concierge nursing business while still working full-time?",
    answer: "Yes, and this is a common approach. Many nurses launch on evenings and weekends while maintaining full-time employment. Just review your employer's policies regarding outside work."
  },
  {
    question: "Do I need a business plan for a concierge nursing business?",
    answer: "A formal 50-page plan is not necessary, but a clear written plan covering your niche, market, services, pricing, and marketing strategy is strongly recommended as your roadmap."
  },
  {
    question: "What insurance do I need for a concierge nursing business?",
    answer: "At minimum, you need professional liability (malpractice) insurance. General liability insurance is also recommended. Additional coverage depends on your services and business structure."
  },
  {
    question: "How do I set my rates as a concierge nurse?",
    answer: "Pricing should account for your expertise, local market, business expenses, and the value you provide. Many new concierge nurses undercharge initially -- your rate must cover all business costs, not just match your old paycheck."
  },
  {
    question: "Do I need to follow HIPAA as a concierge nurse?",
    answer: "It depends on your business structure. Purely private-pay practices may not be covered entities, but following HIPAA standards is recommended regardless. See our HIPAA compliance guide for details."
  },
  {
    question: "What is the best niche for a new concierge nurse?",
    answer: "The best niche aligns your clinical experience, passion, and local market demand. There is no single best niche for everyone."
  },
  {
    question: "How do concierge nurses find clients?",
    answer: "The most effective strategies include building referral relationships with physicians and discharge planners, networking locally, creating a professional website, and social media marketing."
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
  "headline": "How to Start a Concierge Nursing Business: Complete Step-by-Step Guide",
  "description": "Learn how to start a concierge nursing business step by step. Covers choosing your niche, forming your LLC or PLLC, HIPAA compliance, setting rates, getting clients, and launching your practice.",
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Start a Concierge Nursing Business",
  "description": "A step-by-step guide to launching a concierge nursing practice, from choosing your niche to getting your first clients.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Choose Your Niche", "text": "Select a specialization that aligns your clinical experience with market demand." },
    { "@type": "HowToStep", "position": 2, "name": "Validate Your Idea", "text": "Research your local market to confirm demand for your chosen niche and services." },
    { "@type": "HowToStep", "position": 3, "name": "Create a Business Plan", "text": "Draft a plan covering your services, target market, pricing, startup costs, and marketing strategy." },
    { "@type": "HowToStep", "position": 4, "name": "Form Your Legal Entity", "text": "Register an LLC or PLLC, obtain an EIN, and open a business bank account." },
    { "@type": "HowToStep", "position": 5, "name": "Get Insurance", "text": "Obtain professional liability insurance and general liability coverage." },
    { "@type": "HowToStep", "position": 6, "name": "Set Up HIPAA Compliance", "text": "Determine if HIPAA applies to your practice and implement compliant systems if needed." },
    { "@type": "HowToStep", "position": 7, "name": "Design Your Services and Packages", "text": "Create clear service offerings with defined scope, deliverables, and pricing." },
    { "@type": "HowToStep", "position": 8, "name": "Set Your Pricing", "text": "Establish rates that reflect your expertise, market, and business costs." },
    { "@type": "HowToStep", "position": 9, "name": "Build Your Brand and Website", "text": "Create a professional online presence with a website, branding, and social media profiles." },
    { "@type": "HowToStep", "position": 10, "name": "Get Your First Clients", "text": "Build referral relationships, network in your community, and market your services." }
  ]
};

const headings = [
  { id: 'step-1-choose-your-niche', text: 'Step 1: Choose Your Niche' },
  { id: 'step-2-validate-your-idea', text: 'Step 2: Validate Your Idea' },
  { id: 'step-3-create-a-business-plan', text: 'Step 3: Create a Business Plan' },
  { id: 'step-4-form-your-legal-entity', text: 'Step 4: Form Your Legal Entity' },
  { id: 'step-5-get-insurance', text: 'Step 5: Get Insurance' },
  { id: 'step-6-set-up-hipaa-compliance', text: 'Step 6: Set Up HIPAA Compliance' },
  { id: 'step-7-design-your-services-and-packages', text: 'Step 7: Design Your Services and Packages' },
  { id: 'step-8-set-your-pricing', text: 'Step 8: Set Your Pricing' },
  { id: 'step-9-build-your-brand-and-website', text: 'Step 9: Build Your Brand and Website' },
  { id: 'step-10-get-your-first-clients', text: 'Step 10: Get Your First Clients' },
  { id: 'common-mistakes', text: 'Common Mistakes to Avoid' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Is a Concierge Nurse?',
    description: 'Understand the concierge nursing model before you build your business.',
    link: '/resources/what-is-a-concierge-nurse',
    category: 'Getting Started',
  },
  {
    title: 'HIPAA Compliance for Concierge Nurses',
    description: 'Learn when HIPAA applies and how to set up compliant systems for your practice.',
    link: '/resources/hipaa-compliance-for-concierge-nurses',
    category: 'Legal & Compliance',
  },
  {
    title: 'Concierge Nursing Niches',
    description: 'Explore specializations and find the right niche for your skills and market.',
    link: '/resources/concierge-nursing-niches',
    category: 'Planning',
  },
];

export default function HowToStartAConciergeNursingBusiness() {
  return (
    <ResourceLayout
      title="How to Start a Concierge Nursing Business: Complete Step-by-Step Guide"
      description="Learn how to start a concierge nursing business step by step. Covers choosing your niche, forming your LLC or PLLC, HIPAA compliance, setting rates, getting clients, and launching your practice."
      canonical="https://www.conciergenursesociety.com/resources/how-to-start-a-concierge-nursing-business"
      schema={[articleSchema, howToSchema]}
      category="Getting Started"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Launch Faster with Expert Guidance',
        description: 'The Accelerator program gives you step-by-step support, templates, and accountability to launch your concierge nursing business.',
        buttonText: 'Learn About the Accelerator',
        buttonLink: '/accelerator',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          To start a concierge nursing business, you need an active nursing license, a chosen niche, a legal business entity (LLC or PLLC), professional liability insurance, HIPAA-compliant systems (if applicable), defined services and pricing, a professional website, and a strategy for getting clients through referrals and networking. Most nurses can launch within 30-90 days.
        </p>
      </QuickAnswer>

      <p>
        Starting a concierge nursing business is one of the most accessible paths to entrepreneurship for nurses. Unlike opening a clinic, you do not need expensive equipment, a physical location, or massive startup capital. What you do need is a clear plan, the right foundations, and the willingness to market yourself.
      </p>

      <p>
        This guide gives you a high-level overview of each step. If you are still exploring whether concierge nursing is right for you, start with our <Link to="/resources/what-is-a-concierge-nurse">guide to what concierge nurses do</Link> first.
      </p>

      {/* --- Step 1 --- */}
      <h2 id="step-1-choose-your-niche">Step 1: Choose Your Niche</h2>

      <p>
        Your niche is the foundation of your entire business. It determines who you serve, what services you offer, how you market yourself, and what you charge. Trying to be a "general" concierge nurse who serves everyone makes it nearly impossible to stand out or build referral relationships.
      </p>

      <p>
        A strong niche sits at the intersection of your clinical experience, your passion, and market demand. Common niches include post-surgical recovery, geriatric care, newborn care, chronic disease management, and wellness services.
      </p>

      <p className="text-navy font-medium mt-4">Tracy's niche selection framework inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> helps you identify the right niche for your background and market.</p>

      {/* --- Step 2 --- */}
      <h2 id="step-2-validate-your-idea">Step 2: Validate Your Idea</h2>

      <p>
        Before investing time and money, confirm that real demand exists for your planned services. This means having conversations with potential referral sources, researching your local market, and identifying whether people are actively seeking solutions to the problems you want to solve.
      </p>

      <p className="text-navy font-medium mt-4">Tracy walks you through her market validation process inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* --- Step 3 --- */}
      <h2 id="step-3-create-a-business-plan">Step 3: Create a Business Plan</h2>

      <p>
        Your business plan does not need to be a 50-page document. It needs to be clear, honest, and actionable -- covering your services, target market, competitive landscape, marketing approach, financial projections, and operations. This document is your roadmap and helps you make informed decisions from day one.
      </p>

      <p className="text-navy font-medium mt-4">The <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link> include business plan templates designed specifically for concierge nurses.</p>

      {/* --- Step 4 --- */}
      <h2 id="step-4-form-your-legal-entity">Step 4: Form Your Legal Entity</h2>

      <p>
        Operating without a formal business entity exposes your personal assets to liability. Most concierge nurses form an LLC or PLLC (depending on state requirements) to protect themselves. This step also involves obtaining an EIN, opening a business bank account, and securing any required local business licenses.
      </p>

      <div className="bg-gold/5 border border-gold/20 p-6 mb-6">
        <p className="font-heading text-base font-semibold text-navy mb-2">Important</p>
        <p>
          Business formation requirements vary by state. Consult a business attorney or your state's Secretary of State office for specific guidance.
        </p>
      </div>

      <p className="text-navy font-medium mt-4">Tracy covers the exact steps and state-specific considerations inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* --- Step 5 --- */}
      <h2 id="step-5-get-insurance">Step 5: Get Insurance</h2>

      <p>
        Insurance is non-negotiable. As an independent practitioner, you need at minimum professional liability (malpractice) insurance and general liability coverage. Depending on your services, you may also want cyber liability, commercial auto, or business property insurance.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers insurance requirements and recommendations inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* --- Step 6 --- */}
      <h2 id="step-6-set-up-hipaa-compliance">Step 6: Set Up HIPAA Compliance</h2>

      <p>
        Whether HIPAA applies to your practice depends on how you handle patient information and whether you bill insurance. Even if not technically required, following HIPAA standards is considered best practice. This involves using compliant communication tools, storing records securely, and having proper privacy policies in place.
      </p>

      <p>
        For more on when HIPAA applies, see our <Link to="/resources/hipaa-compliance-for-concierge-nurses">HIPAA compliance guide</Link>.
      </p>

      <p className="text-navy font-medium mt-4">The <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link> include HIPAA policy templates and compliance checklists for concierge nurses.</p>

      {/* --- Step 7 --- */}
      <h2 id="step-7-design-your-services-and-packages">Step 7: Design Your Services and Packages</h2>

      <p>
        Clear, well-defined service offerings make it easier for clients to understand what you do and decide to hire you. Your services need defined scope, deliverables, and pricing. How you structure and present your offerings has a direct impact on your revenue and client experience.
      </p>

      <p className="text-navy font-medium mt-4">Tracy teaches her service design and packaging framework inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* --- Step 8 --- */}
      <h2 id="step-8-set-your-pricing">Step 8: Set Your Pricing</h2>

      <p>
        Pricing is one of the areas where new concierge nurses struggle most. As a business owner, your rate must cover your salary, taxes, insurance, supplies, marketing, administrative time, and profit. Common pricing models include hourly rates, package pricing, and monthly retainers.
      </p>

      <p className="text-navy font-medium mt-4">Tracy's pricing framework is covered in depth inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> and through <Link to="/strategy" className="text-gold hover:underline">Strategy Sessions</Link>.</p>

      {/* --- Step 9 --- */}
      <h2 id="step-9-build-your-brand-and-website">Step 9: Build Your Brand and Website</h2>

      <p>
        Your brand is how potential clients and referral sources perceive your business. You need a professional business name, visual identity, and website that clearly communicates what you offer, who you serve, and how to contact you. Your website does not need to be complex, but it must look professional and be easy to find.
      </p>

      <p className="text-navy font-medium mt-4">The <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> includes branding guidance and website templates to get you up and running fast.</p>

      {/* --- Step 10 --- */}
      <h2 id="step-10-get-your-first-clients">Step 10: Get Your First Clients</h2>

      <p>
        Getting clients requires actively putting yourself in front of the right people. The most effective strategies for new concierge nurses include building referral relationships with physicians and discharge planners, leveraging your existing professional network, and establishing an online presence. Most concierge nurses get their first clients through personal connections and referrals rather than advertising.
      </p>

      <p className="text-navy font-medium mt-4">Tracy's client acquisition system is a core component of the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* --- Common Mistakes --- */}
      <h2 id="common-mistakes">Common Mistakes to Avoid</h2>

      <p>
        The most common mistakes that derail new concierge nursing businesses include not choosing a niche, undercharging based on old employee wages, spending too much time preparing and not enough time marketing, ignoring the business side, skipping legal foundations, not having client contracts, and trying to do it all alone.
      </p>

      <p>
        Building a concierge nursing business takes time and effort, but the barrier to entry is lower than most nurses expect. The most important step is the first one.
      </p>

      <p className="text-navy font-medium mt-4">The <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> provides step-by-step mentorship and a community of nurses building alongside you. The <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link> include ready-made templates for contracts, service packages, and marketing materials.</p>

      {/* --- FAQ Section --- */}
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
