import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const headings = [
  { id: 'quick-answer', text: 'Quick Answer' },
  { id: 'market-overview', text: 'Concierge Nursing Market Overview' },
  { id: 'niche-comparison', text: 'Niche Comparison Table' },
  { id: 'post-surgical', text: 'Post-Surgical Recovery Care' },
  { id: 'postpartum', text: 'Postpartum & Newborn Care' },
  { id: 'geriatric', text: 'Geriatric Care Management' },
  { id: 'iv-therapy', text: 'Mobile IV Therapy' },
  { id: 'executive-health', text: 'Executive & Corporate Health' },
  { id: 'chronic-disease', text: 'Chronic Disease Management' },
  { id: 'aesthetic', text: 'Aesthetic & Injection Services' },
  { id: 'wellness-coaching', text: 'Health Education & Wellness Coaching' },
  { id: 'travel-nursing', text: 'Travel & Event Medical Support' },
  { id: 'pediatric', text: 'Pediatric Private Nursing' },
  { id: 'end-of-life', text: 'End-of-Life & Palliative Support' },
  { id: 'wound-care', text: 'Wound Care & Ostomy Management' },
  { id: 'how-to-choose', text: 'How to Choose Your Niche' },
  { id: 'multiple-niches', text: 'Can You Serve Multiple Niches?' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'Concierge Nursing Startup Costs',
    description: 'Detailed breakdown of what it costs to start and run a concierge nursing business by niche.',
    link: '/resources/concierge-nursing-startup-costs',
    category: 'Planning',
  },
  {
    title: 'Concierge Nurse Business Plan',
    description: 'Step-by-step guide to writing a business plan for your concierge nursing practice.',
    link: '/resources/concierge-nurse-business-plan',
    category: 'Planning',
  },
  {
    title: 'Concierge Nursing FAQ',
    description: 'Answers to the most common questions about starting and running a concierge nursing business.',
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
      "name": "What are the most popular concierge nursing niches?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Post-surgical recovery, postpartum care, geriatric care management, mobile IV therapy, executive health, and chronic disease management are among the most popular."
      }
    },
    {
      "@type": "Question",
      "name": "Which concierge nursing niche is most profitable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Profitability depends on your local market, pricing, overhead, and client volume. The best niche aligns your skills with real demand."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need special certifications for concierge nursing niches?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Some niches like IV therapy and aesthetics require specific certifications. Others benefit from specialty training. Check your state requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Can I offer multiple concierge nursing services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but start with one primary niche to build expertise and streamline marketing. Expand into complementary niches once stable."
      }
    },
    {
      "@type": "Question",
      "name": "How do I choose the right concierge nursing niche?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consider your clinical background, local market demand, startup costs, and personal passion."
      }
    },
    {
      "@type": "Question",
      "name": "What concierge nursing niches have the lowest startup costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Health education, geriatric care management, care coordination, and postpartum support have the lowest costs."
      }
    },
    {
      "@type": "Question",
      "name": "Is there demand for concierge nursing in rural areas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Rural communities often have limited healthcare access, creating strong opportunities."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be a Nurse Practitioner to start a concierge nursing business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. RNs can operate in most niches. Certain niches like aesthetics or prescribing require NP licensure."
      }
    }
  ]
};

export default function ConciergeNursingNichesGuide() {
  return (
    <ResourceLayout
      title="Concierge Nursing Niches: Which One Is Right for You?"
      description="Explore the most popular concierge nursing niches including post-op recovery, postpartum care, geriatric care, executive health, IV therapy, and more. Compare startup costs, demand, and ideal background for each."
      canonical="https://www.conciergenursesociety.com/resources/concierge-nursing-niches"
      category="Niches"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Not Sure Which Niche Is Right for You?',
        description: 'Book a clarity consultation to discuss your background, goals, and local market.',
        buttonText: 'Book a Strategy Call',
        buttonLink: '/strategy',
      }}
      faqSchema={faqSchema}
    >
      <section id="quick-answer">
        <QuickAnswer>
          <p>
            The right concierge nursing niche depends on your clinical background, local market demand, and personal
            interests. The most common niches include <strong>post-surgical recovery, postpartum care, geriatric care
            management, mobile IV therapy, executive health, and chronic disease management</strong>.
          </p>
        </QuickAnswer>
      </section>

      <h2 id="market-overview" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Why Does Your Niche Matter in Concierge Nursing?
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        Choosing a specific niche allows you to tailor your marketing, build deep expertise, command higher rates,
        and become the go-to provider in your area. The concierge nursing market continues to grow as more people
        seek personalized, convenient healthcare outside traditional settings.
      </p>
      <p className="text-navy font-medium mt-4">Tracy's niche selection framework inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> helps you find the right fit for your background and market.</p>

      <h2 id="niche-comparison" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Concierge Nursing Niche Comparison Table
      </h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left p-3 font-heading">Niche</th>
              <th className="text-left p-3 font-heading">Ideal Background</th>
              <th className="text-left p-3 font-heading">Startup Cost</th>
              <th className="text-left p-3 font-heading">Demand Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-cream-dark"><td className="p-3 font-semibold">Post-Surgical Recovery</td><td className="p-3">Med-surg, OR, PACU</td><td className="p-3">Low-Moderate</td><td className="p-3">Growing</td></tr>
            <tr className="border-b border-cream-dark bg-cream/50"><td className="p-3 font-semibold">Postpartum & Newborn</td><td className="p-3">L&D, Mother-Baby, NICU</td><td className="p-3">Low</td><td className="p-3">Growing</td></tr>
            <tr className="border-b border-cream-dark"><td className="p-3 font-semibold">Geriatric Care Management</td><td className="p-3">Geriatrics, home health</td><td className="p-3">Low</td><td className="p-3">Strong growth</td></tr>
            <tr className="border-b border-cream-dark bg-cream/50"><td className="p-3 font-semibold">Mobile IV Therapy</td><td className="p-3">ER, infusion, ICU</td><td className="p-3">Moderate-High</td><td className="p-3">Growing</td></tr>
            <tr className="border-b border-cream-dark"><td className="p-3 font-semibold">Executive & Corporate Health</td><td className="p-3">Occupational health, primary care</td><td className="p-3">Moderate</td><td className="p-3">Growing</td></tr>
            <tr className="border-b border-cream-dark bg-cream/50"><td className="p-3 font-semibold">Chronic Disease Management</td><td className="p-3">Med-surg, cardiology</td><td className="p-3">Low-Moderate</td><td className="p-3">Strong growth</td></tr>
            <tr className="border-b border-cream-dark"><td className="p-3 font-semibold">Aesthetic & Injections (NP)</td><td className="p-3">Dermatology, plastics</td><td className="p-3">High</td><td className="p-3">Growing</td></tr>
            <tr className="border-b border-cream-dark bg-cream/50"><td className="p-3 font-semibold">Health Education & Coaching</td><td className="p-3">Any background</td><td className="p-3">Low</td><td className="p-3">Stable</td></tr>
            <tr className="border-b border-cream-dark"><td className="p-3 font-semibold">Travel & Event Medical</td><td className="p-3">ER, flight nursing</td><td className="p-3">Low-Moderate</td><td className="p-3">Growing</td></tr>
            <tr className="border-b border-cream-dark bg-cream/50"><td className="p-3 font-semibold">Pediatric Private Nursing</td><td className="p-3">Pediatrics, PICU</td><td className="p-3">Low</td><td className="p-3">Stable</td></tr>
            <tr className="border-b border-cream-dark"><td className="p-3 font-semibold">End-of-Life & Palliative</td><td className="p-3">Hospice, oncology</td><td className="p-3">Low</td><td className="p-3">Strong growth</td></tr>
            <tr className="border-b border-cream-dark bg-cream/50"><td className="p-3 font-semibold">Wound Care & Ostomy</td><td className="p-3">Wound care, home health</td><td className="p-3">Moderate</td><td className="p-3">Growing</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="post-surgical" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Post-Surgical Recovery Care</h2>
      <p className="text-charcoal leading-relaxed mb-2">In-home care after surgical procedures, driven by the trend toward earlier discharge and outpatient surgery. Ideal for nurses with med-surg, OR, or PACU experience.</p>
      <p className="text-navy font-medium mt-2">Tracy covers this niche inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="postpartum" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Postpartum and Newborn Care</h2>
      <p className="text-charcoal leading-relaxed mb-2">Supporting new parents during the first weeks after birth, addressing a significant gap in post-discharge care. Ideal for L&D and mother-baby nurses.</p>
      <p className="text-navy font-medium mt-2">Tracy covers this niche inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="geriatric" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Geriatric Care Management</h2>
      <p className="text-charcoal leading-relaxed mb-2">Healthcare advocacy and coordination for older adults and their families. One of the fastest-growing niches with among the lowest startup costs.</p>
      <p className="text-navy font-medium mt-2">Tracy covers this niche inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="iv-therapy" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Mobile IV Therapy</h2>
      <p className="text-charcoal leading-relaxed mb-2">Administering IV fluids, vitamins, and medications in non-clinical settings. Higher regulatory requirements and startup costs, but potentially lucrative. Regulations vary significantly by state.</p>
      <p className="text-navy font-medium mt-2">Tracy covers state requirements and setup inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="executive-health" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Executive and Corporate Health</h2>
      <p className="text-charcoal leading-relaxed mb-2">Serving busy professionals and corporate clients with convenient, private health services. Demands a polished brand and strong business communication skills.</p>
      <p className="text-navy font-medium mt-2">Tracy covers corporate strategy inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="chronic-disease" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Chronic Disease Management</h2>
      <p className="text-charcoal leading-relaxed mb-2">Ongoing support for patients with conditions like diabetes, heart failure, and COPD. Creates recurring client relationships and a stable revenue base.</p>
      <p className="text-navy font-medium mt-2">Tracy covers recurring-revenue models inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="aesthetic" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Aesthetic and Injection Services</h2>
      <p className="text-charcoal leading-relaxed mb-2">Cosmetic treatments typically requiring NP licensure plus additional training. Among the highest startup costs but substantial per-treatment revenue.</p>
      <p className="text-navy font-medium mt-2">Tracy covers aesthetic business planning inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="wellness-coaching" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Health Education and Wellness Coaching</h2>
      <p className="text-charcoal leading-relaxed mb-2">Extremely low startup costs, relying on your knowledge and communication skills. Can be delivered in person or via telehealth. Any nursing background can transition here.</p>
      <p className="text-navy font-medium mt-2">Tracy covers coaching models inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="travel-nursing" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Travel and Event Medical Support</h2>
      <p className="text-charcoal leading-relaxed mb-2">Medical support for events, travel companionship, and on-call venue services. Often episodic, so many nurses combine with another niche.</p>
      <p className="text-navy font-medium mt-2">Tracy covers event strategy inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="pediatric" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Pediatric Private Nursing</h2>
      <p className="text-charcoal leading-relaxed mb-2">Serving families of children with chronic conditions or special needs. Often involves longer relationships and recurring visits for a stable revenue base.</p>
      <p className="text-navy font-medium mt-2">Tracy covers pediatric strategy inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="end-of-life" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">End-of-Life and Palliative Support</h2>
      <p className="text-charcoal leading-relaxed mb-2">Comfort-focused care and family support beyond typical hospice services. Emotionally demanding but deeply meaningful, with strong and growing demand.</p>
      <p className="text-navy font-medium mt-2">Tracy covers this niche inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="wound-care" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">Wound Care and Ostomy Management</h2>
      <p className="text-charcoal leading-relaxed mb-2">In-home wound assessment and treatment. Requires strong technical skills and often benefits from wound care certification. Strong demand among elderly and diabetic populations.</p>
      <p className="text-navy font-medium mt-2">Tracy covers wound care strategy inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="how-to-choose" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        How to Choose the Right Concierge Nursing Niche
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        The right niche aligns your clinical strengths with local market demand, fits your budget, and serves a
        client population you enjoy working with. Your niche can evolve over time -- the most important thing is
        to choose a starting point and begin building.
      </p>
      <p className="text-navy font-medium mt-4">Tracy's niche selection framework inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> walks you through this decision step by step.</p>

      <h2 id="multiple-niches" className="font-heading text-2xl font-bold text-navy mt-12 mb-4">
        Can You Serve Multiple Concierge Nursing Niches?
      </h2>
      <p className="text-charcoal leading-relaxed mb-4">
        Yes, and many experienced concierge nurses do. However, starting with multiple niches can dilute your
        marketing. A more effective approach is to launch with one primary niche and add complementary services
        over time.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers multi-niche strategy inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-heading font-bold text-navy mb-2">What are the most popular niches?</h3>
            <p className="text-charcoal text-sm leading-relaxed">Post-surgical recovery, postpartum care, geriatric care management, mobile IV therapy, executive health, and chronic disease management.</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-navy mb-2">Which niche is most profitable?</h3>
            <p className="text-charcoal text-sm leading-relaxed">Profitability depends on your local market, pricing, and overhead. The best niche aligns your skills with real demand.</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-navy mb-2">Do I need special certifications?</h3>
            <p className="text-charcoal text-sm leading-relaxed">Some niches require additional certifications. Always check your state board of nursing requirements.</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-navy mb-2">How do I choose the right niche?</h3>
            <p className="text-charcoal text-sm leading-relaxed">Consider your clinical background, local demand, startup costs, and personal passion.</p>
          </div>
        </div>
      </section>
    </ResourceLayout>
  );
}
