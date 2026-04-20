import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const headings = [
  { id: 'quick-answer', text: 'Quick Answer' },
  { id: 'do-you-need-one', text: 'Do You Need a Business Plan?' },
  { id: 'business-plan-sections', text: 'Business Plan Sections Overview' },
  { id: 'executive-summary', text: 'Executive Summary' },
  { id: 'company-description', text: 'Company Description' },
  { id: 'market-analysis', text: 'Market Analysis' },
  { id: 'services-and-pricing', text: 'Services & Pricing Strategy' },
  { id: 'marketing-strategy', text: 'Marketing Strategy' },
  { id: 'operations-plan', text: 'Operations Plan' },
  { id: 'financial-projections', text: 'Financial Projections' },
  { id: 'template-outline', text: 'Business Plan Template Outline' },
  { id: 'common-mistakes', text: 'Common Business Plan Mistakes' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'Concierge Nursing Startup Costs',
    description: 'Detailed breakdown of one-time and ongoing costs to help you build realistic financial projections.',
    link: '/resources/concierge-nursing-startup-costs',
    category: 'Planning',
  },
  {
    title: 'Concierge Nursing Niches Guide',
    description: 'Explore niches to clarify your services section and target market analysis.',
    link: '/resources/concierge-nursing-niches',
    category: 'Niches',
  },
  {
    title: 'Concierge Nursing FAQ',
    description: 'Quick answers to the most common questions about starting a concierge nursing business.',
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
      "name": "Do I need a business plan to start a concierge nursing business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A formal business plan is not legally required, but it is strongly recommended. It forces you to think through your services, target market, pricing, and costs before investing time and money."
      }
    },
    {
      "@type": "Question",
      "name": "How long should a concierge nurse business plan be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most concierge nursing businesses, 10 to 20 pages is sufficient. The goal is clarity, not length."
      }
    },
    {
      "@type": "Question",
      "name": "What should I include in the financial projections section?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Include startup costs, monthly operating expenses, projected revenue, a break-even analysis, and cash flow projections for at least 12 months."
      }
    },
    {
      "@type": "Question",
      "name": "Can I write a concierge nurse business plan myself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Use a template as a guide and fill in each section from your own research. The key is understanding every part of your plan."
      }
    },
    {
      "@type": "Question",
      "name": "How do I do market analysis for a concierge nursing business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research local demographics, identify target clients, analyze competitors, and talk to potential referral partners to gauge demand."
      }
    },
    {
      "@type": "Question",
      "name": "Should I include a pricing strategy in my business plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Pricing directly affects your financial projections and determines how quickly you reach profitability."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I update my business plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Review and update at least once a year or whenever there is a significant change in your business."
      }
    },
    {
      "@type": "Question",
      "name": "What is the biggest mistake nurses make when writing a business plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skipping market analysis and financial projections in favor of only describing services. A plan should be grounded in research, not assumptions."
      }
    }
  ]
};

export default function ConciergeNurseBusinessPlan() {
  return (
    <ResourceLayout
      title="Concierge Nurse Business Plan: What to Include and How to Write One"
      description="Learn how to write a concierge nurse business plan. Covers executive summary, market analysis, services, pricing strategy, marketing plan, financial projections, and operations for your nursing practice."
      canonical="https://www.conciergenursesociety.com/resources/concierge-nurse-business-plan"
      category="Planning"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Get Business Plan Templates and Tools',
        description: 'Our toolkits include business plan templates, financial projection worksheets, and pricing calculators designed for concierge nurses.',
        buttonText: 'View Toolkits',
        buttonLink: '/toolkits',
      }}
      faqSchema={faqSchema}
    >
      <section id="quick-answer">
        <QuickAnswer>
          <p>
            A concierge nurse business plan should include an executive summary, company description, market analysis,
            services and pricing strategy, marketing plan, operations plan, and financial projections. Even a simple
            plan helps you clarify your target market, set realistic goals, and make informed decisions.
          </p>
        </QuickAnswer>
      </section>

      <h2 id="do-you-need-one" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Do You Actually Need a Business Plan for Concierge Nursing?
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        A formal business plan is not legally required, but skipping the planning process is one of the most common
        reasons new concierge nurses struggle in their first year. A plan forces you to think critically about who
        you will serve, what you will charge, and whether the numbers actually work.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides business plan templates and guided planning inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      <h2 id="business-plan-sections" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        What Are the Key Sections of a Concierge Nurse Business Plan?
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        A complete concierge nursing business plan contains seven core sections: executive summary, company description,
        market analysis, services and pricing, marketing strategy, operations plan, and financial projections. Each
        section serves a distinct purpose in building a viable business foundation.
      </p>
      <p className="text-navy font-medium mt-4">Tracy walks through each section with examples inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="executive-summary" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Executive Summary
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        The executive summary is a one-page overview of your entire plan. It should answer what your business is,
        what problem you solve, who your target clients are, what your financial goals are, and what qualifies you
        to do this work. Write it last, after completing all other sections.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides executive summary templates inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      <h2 id="company-description" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Company Description
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        This section covers your business name, legal structure, location or service area, mission statement, and
        unique value proposition. Your mission should be specific to your niche and clientele, not a generic
        healthcare statement.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers value proposition development inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="market-analysis" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Market Analysis
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        Market analysis demonstrates real demand for your services in your specific area. It covers your target
        market demographics, local demand data, and the competitive landscape. This is where many nurse business
        plans fall short -- it is not enough to say people need healthcare.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides market research frameworks and data sources inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="services-and-pricing" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Services and Pricing Strategy
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        This is the heart of your business plan. Describe every service you will offer, how it is delivered, and
        how you will price it. Common pricing models include hourly rates, per-visit flat fees, service packages,
        and monthly retainers. Your pricing should reflect the premium nature of concierge care.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers pricing strategy and package design inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="marketing-strategy" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Marketing Strategy
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        Your marketing strategy explains how you will attract and retain clients. For most concierge nurses, the
        three primary channels are referral partnerships with healthcare providers, your online presence (website,
        Google Business Profile, social media), and community visibility through networking and events.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides marketing plans and referral scripts inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="operations-plan" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Operations Plan
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        The operations plan describes how your business will function day to day, covering your service area, client
        intake process, documentation systems, scheduling, payment processing, emergency protocols, and supply
        management. This is where theory meets practice.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides operations SOPs and templates inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      <h2 id="financial-projections" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Financial Projections
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        Financial projections help you understand how many clients you need, when you will break even, and whether
        your pricing supports your income goals. Include startup costs, monthly expenses, revenue projections, a
        break-even analysis, and 12-month cash flow. Be conservative -- most new practices take three to six months
        to build a steady client base.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides financial projection worksheets inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      <h2 id="template-outline" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Business Plan Template Outline
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        A concierge nursing business plan typically includes a cover page, table of contents, executive summary,
        company description, market analysis (with target market, demand, and competition subsections), services
        and pricing, marketing strategy, operations plan, financial projections, and an appendix with supporting
        documents.
      </p>
      <p className="text-navy font-medium mt-4">Tracy provides a complete fill-in-the-blank business plan template inside the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      <h2 id="common-mistakes" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Common Concierge Nurse Business Plan Mistakes
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        The most frequent mistakes include skipping market analysis, underpricing services due to imposter syndrome,
        overly optimistic revenue projections, ignoring operations details, trying to serve too many niches at once,
        and writing the plan once and never revisiting it.
      </p>
      <p className="text-navy font-medium mt-4">Tracy helps you avoid these pitfalls inside the <Link to="/strategy" className="text-gold hover:underline">strategy sessions</Link>.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-heading font-bold text-navy mb-2">Do I need a business plan?</h3>
            <p className="text-charcoal text-sm leading-relaxed">Not legally required, but strongly recommended. Even a simple one-page plan is better than no plan.</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-navy mb-2">How long should it be?</h3>
            <p className="text-charcoal text-sm leading-relaxed">Ten to twenty pages is sufficient for most concierge nursing businesses.</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-navy mb-2">Can I write it myself?</h3>
            <p className="text-charcoal text-sm leading-relaxed">Absolutely. Use a template as a guide and fill in each section from your own research.</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-navy mb-2">How often should I update it?</h3>
            <p className="text-charcoal text-sm leading-relaxed">At least annually, or whenever you make significant changes to your business.</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-navy mb-2">What is the biggest mistake?</h3>
            <p className="text-charcoal text-sm leading-relaxed">Skipping market analysis and financial projections in favor of only describing services.</p>
          </div>
        </div>
      </section>
    </ResourceLayout>
  );
}
