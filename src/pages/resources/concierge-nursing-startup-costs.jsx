import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const headings = [
  { id: 'quick-answer', text: 'Quick Answer' },
  { id: 'total-startup-cost-range', text: 'Total Startup Cost Range' },
  { id: 'one-time-startup-costs', text: 'One-Time Startup Costs' },
  { id: 'ongoing-monthly-costs', text: 'Ongoing Monthly Costs' },
  { id: 'cost-by-niche', text: 'How Costs Vary by Niche' },
  { id: 'start-on-a-budget', text: 'Ways to Start on a Budget' },
  { id: 'what-not-to-spend-on', text: 'What NOT to Spend Money on Early' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'Concierge Nurse Business Plan',
    description: 'Learn how to write a business plan that maps out your services, pricing, and financial projections.',
    link: '/resources/concierge-nurse-business-plan',
    category: 'Planning',
  },
  {
    title: 'Concierge Nursing Niches Guide',
    description: 'Explore the most popular niches and find the right fit for your background and goals.',
    link: '/resources/concierge-nursing-niches',
    category: 'Niches',
  },
  {
    title: 'Concierge Nursing FAQ',
    description: 'Answers to the most common questions about starting a concierge nursing business.',
    link: '/resources/concierge-nursing-faq',
    category: 'Getting Started',
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost to start a concierge nursing business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most concierge nursing businesses can be started for between $2,000 and $10,000, depending on your niche, location, and whether you already own basic clinical supplies."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a business license to start a concierge nursing practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Most states and municipalities require a general business license. Requirements vary by location, so check with your local clerk's office and state board of nursing."
      }
    },
    {
      "@type": "Question",
      "name": "What kind of insurance do I need for concierge nursing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At minimum, you need professional liability (malpractice) insurance. General liability insurance is also strongly recommended. Additional coverage depends on your services and growth."
      }
    },
    {
      "@type": "Question",
      "name": "Can I start a concierge nursing business with no money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is very difficult to start with zero investment because you need at minimum professional liability insurance and a business license. However, you can minimize costs significantly by starting lean."
      }
    },
    {
      "@type": "Question",
      "name": "What are the monthly costs of running a concierge nursing business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ongoing monthly costs typically range from $300 to $1,200 depending on your niche, tools, and marketing approach."
      }
    },
    {
      "@type": "Question",
      "name": "Should I form an LLC for my concierge nursing business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most concierge nurses form an LLC for personal liability protection. Consult with a business attorney or CPA familiar with healthcare businesses in your state."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a website to start my concierge nursing business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A website is highly recommended for credibility and discoverability, but you can start with a simple one-page site and expand over time."
      }
    },
    {
      "@type": "Question",
      "name": "Is concierge nursing a tax write-off friendly business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Concierge nursing businesses can typically deduct many expenses including mileage, supplies, insurance, education, and marketing costs. Work with a CPA to maximize deductions."
      }
    }
  ]
};

export default function ConciergeNursingStartupCosts() {
  return (
    <ResourceLayout
      title="Concierge Nurse Business Startup Costs: What You Will Actually Spend"
      description="How much does it cost to start a concierge nursing business? Detailed breakdown of startup costs including legal formation, insurance, supplies, marketing, technology, and ongoing monthly expenses."
      canonical="https://www.conciergenursesociety.com/resources/concierge-nursing-startup-costs"
      category="Planning"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Get the Startup Toolkit',
        description: 'Our toolkits include checklists, templates, and cost calculators designed specifically for concierge nurses launching their business.',
        buttonText: 'View Toolkits',
        buttonLink: '/toolkits',
      }}
      faqSchema={faqSchema}
    >
      {/* Quick Answer */}
      <section id="quick-answer">
        <QuickAnswer>
          <p>
            Most concierge nursing businesses can be launched for between <strong>$2,000 and $10,000</strong> in
            total startup costs, with ongoing monthly expenses of roughly $300 to $1,200. The biggest one-time
            expenses are business formation, professional liability insurance, and branding. Your exact costs will
            depend on your chosen niche, geographic location, and how much you already own in clinical supplies.
          </p>
        </QuickAnswer>
      </section>

      {/* Total Startup Cost Range */}
      <h2 id="total-startup-cost-range" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        What Does It Actually Cost to Start a Concierge Nursing Business?
      </h2>
      <p className="text-charcoal leading-relaxed mb-6">
        One of the most appealing aspects of concierge nursing is the relatively low barrier to entry compared to
        opening a clinic or brick-and-mortar practice. Because most concierge nurses operate as mobile providers,
        you avoid the overhead of leasing commercial space. That said, there are real costs involved in doing this
        properly and legally.
      </p>

      <p className="text-charcoal leading-relaxed mb-6">
        The major cost categories include business formation and legal setup, professional liability insurance,
        general liability insurance, branding and website, clinical supplies, certifications and training, and
        technology and software. Most nurses land in the $2,000 to $5,000 range for total one-time startup costs.
      </p>

      <p className="text-navy font-medium mt-4">Tracy provides a detailed cost planning worksheet and budget template inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      {/* One-Time Startup Costs */}
      <h2 id="one-time-startup-costs" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        One-Time Startup Costs Explained
      </h2>
      <p className="text-charcoal leading-relaxed mb-6">
        Your one-time startup costs cover the foundational investments needed to launch legally and professionally.
        These include LLC or PLLC formation (costs vary by state), obtaining an EIN (free from the IRS), business
        licensing, professional liability and general liability insurance, branding and website development, initial
        clinical supplies, and any certifications required for your niche. Each category varies significantly based
        on your state, niche, and whether you DIY or hire professionals.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading font-bold text-navy mb-2">Important Note on Insurance</p>
        <p className="text-charcoal text-sm leading-relaxed">
          Do not assume your employer's malpractice insurance covers you when working independently. You need your
          own individual policy. Shop multiple carriers and read policy details carefully.
        </p>
      </div>

      <p className="text-navy font-medium mt-4">Tracy walks through every startup cost category with specific guidance inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Ongoing Monthly Costs */}
      <h2 id="ongoing-monthly-costs" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        What Are the Monthly Costs of Running a Concierge Nursing Business?
      </h2>
      <p className="text-charcoal leading-relaxed mb-6">
        Beyond startup, you will have recurring monthly expenses. The good news is that most concierge nursing
        businesses have relatively low overhead. Ongoing costs typically include insurance premiums, EHR or
        scheduling software, a dedicated business phone, marketing and advertising, vehicle and mileage costs,
        continuing education, supply restocking, and bookkeeping. Most nurses spend between $300 and $700 per month.
      </p>

      <p className="text-navy font-medium mt-4">The <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link> include a monthly expense tracker and budget planning template.</p>

      {/* Cost by Niche */}
      <h2 id="cost-by-niche" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        How Do Startup Costs Vary by Concierge Nursing Niche?
      </h2>
      <p className="text-charcoal leading-relaxed mb-6">
        Your niche is one of the biggest factors in determining costs. Low-cost niches like geriatric care management,
        postpartum care, and health education rely primarily on your knowledge and require minimal supplies. Moderate-cost
        niches like post-surgical recovery and chronic disease management need basic clinical supplies. Higher-cost niches
        like mobile IV therapy and aesthetic services require specialized supplies, additional certifications, and higher
        insurance premiums. For a deeper look at each niche, see our{' '}
        <Link to="/resources/concierge-nursing-niches" className="text-gold hover:text-navy underline">complete guide to concierge nursing niches</Link>.
      </p>

      <p className="text-navy font-medium mt-4">Tracy helps you choose a niche that fits your budget and goals inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Ways to Start on a Budget */}
      <h2 id="start-on-a-budget" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        How Can I Start a Concierge Nursing Business on a Budget?
      </h2>
      <p className="text-charcoal leading-relaxed mb-6">
        Starting lean is not just possible, it is often the smartest approach. Many successful concierge nurses
        launched with under $2,000 by being strategic about where to invest first. The key is to prioritize what
        directly leads to clients and revenue -- your legal foundation, insurance, a professional online presence,
        and networking -- and defer everything else until revenue supports it.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading font-bold text-navy mb-2">Do Not Skip These</p>
        <p className="text-charcoal text-sm leading-relaxed">
          Even on a tight budget, do not skip professional liability insurance and proper business formation.
          These protect you legally and financially. Everything else can be upgraded over time.
        </p>
      </div>

      <p className="text-navy font-medium mt-4">Tracy's lean launch strategy is a core part of the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* What NOT to Spend Money on Early */}
      <h2 id="what-not-to-spend-on" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        What Should You NOT Spend Money on When Starting Out?
      </h2>
      <p className="text-charcoal leading-relaxed mb-6">
        New business owners often overspend on things that do not generate clients or revenue. Common traps include
        expensive office space (concierge nursing is mobile), premium software subscriptions before you have clients,
        paid advertising before your foundation is set, multiple certifications at once, and custom-branded everything.
        Focus your budget on what brings in clients first.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers exactly where to invest (and where not to) inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>, and the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link> include prioritized spending guides.</p>

      {/* FAQ */}
      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">
          Frequently Asked Questions About Concierge Nursing Startup Costs
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-heading font-bold text-navy mb-2">How much does it cost to start a concierge nursing business?</h3>
            <p className="text-charcoal text-sm leading-relaxed">
              Most concierge nursing businesses can be started for between $2,000 and $10,000, depending on your niche,
              location, and whether you already own basic clinical supplies.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-navy mb-2">Do I need a business license to start a concierge nursing practice?</h3>
            <p className="text-charcoal text-sm leading-relaxed">
              Yes. Most states and municipalities require a general business license. Requirements vary by location,
              so check with your local clerk's office and state board of nursing.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-navy mb-2">What kind of insurance do I need for concierge nursing?</h3>
            <p className="text-charcoal text-sm leading-relaxed">
              At minimum, you need professional liability (malpractice) insurance. General liability insurance is also
              strongly recommended. Additional coverage depends on your services and growth.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-navy mb-2">Can I start a concierge nursing business with no money?</h3>
            <p className="text-charcoal text-sm leading-relaxed">
              It is very difficult to start with zero investment because you need at minimum insurance and a business
              license. However, you can minimize costs significantly by starting lean.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-navy mb-2">What are the monthly costs of running a concierge nursing business?</h3>
            <p className="text-charcoal text-sm leading-relaxed">
              Ongoing monthly costs typically range from $300 to $1,200 depending on your niche, tools, and marketing approach.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-navy mb-2">Should I form an LLC for my concierge nursing business?</h3>
            <p className="text-charcoal text-sm leading-relaxed">
              Most concierge nurses form an LLC for personal liability protection. Consult with a business attorney or
              CPA familiar with healthcare businesses in your state.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-navy mb-2">Do I need a website to start my concierge nursing business?</h3>
            <p className="text-charcoal text-sm leading-relaxed">
              A website is highly recommended for credibility and discoverability, but you can start with a simple
              one-page site and expand over time.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-navy mb-2">Is concierge nursing a tax write-off friendly business?</h3>
            <p className="text-charcoal text-sm leading-relaxed">
              Yes. Concierge nursing businesses can typically deduct many expenses including mileage, supplies, insurance,
              education, and marketing costs. Work with a CPA to maximize deductions.
            </p>
          </div>
        </div>
      </section>

      <p className="text-charcoal leading-relaxed mt-8">
        Understanding your costs before you launch gives you a realistic picture of what it takes to build a
        sustainable concierge nursing business. For help mapping out your full business plan, explore our{' '}
        <Link to="/toolkits" className="text-gold hover:text-navy underline">
          business toolkits
        </Link>{' '}
        or{' '}
        <Link to="/strategy" className="text-gold hover:text-navy underline">
          book a strategy consultation
        </Link>.
      </p>
    </ResourceLayout>
  );
}
