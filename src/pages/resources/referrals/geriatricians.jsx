import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "What do geriatricians look for in a concierge nurse partner?",
    answer: "Geriatricians value nurses with strong assessment skills, experience with older adults, knowledge of common geriatric conditions and medications, patience, and the ability to communicate clearly with both patients and family members. Reliability and thorough documentation are essential."
  },
  {
    question: "How is partnering with geriatricians different from other physician specialties?",
    answer: "Geriatric patients typically have multiple chronic conditions, complex medication regimens, and ongoing care needs. Partnerships with geriatricians tend to produce longer-term client relationships rather than one-time service engagements. The care is ongoing and relationship-based."
  },
  {
    question: "Should I get geriatric nursing certification?",
    answer: "Gerontological nursing certification (RN-BC or GNP) strengthens your credibility with geriatricians and demonstrates specialized knowledge. While not required, it signals commitment to this population and can differentiate you from other concierge nurses in your area."
  },
  {
    question: "How do geriatrician referrals typically work?",
    answer: "The geriatrician identifies patients who would benefit from in-home nursing support and recommends your services to the patient or their family. The family contacts you directly and pays privately. Some geriatricians formally integrate concierge nursing into their care plans."
  },
  {
    question: "What is the earning potential with geriatric concierge nursing?",
    answer: "Geriatric clients often need ongoing, regular services rather than one-time visits. This creates recurring revenue through monthly retainer arrangements or weekly visit schedules. The long-term nature of these relationships can provide more stable income compared to episode-based services."
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
  "headline": "How to Partner with Geriatricians as a Concierge Nurse",
  "description": "Learn how to build referral relationships with geriatricians to serve elderly patients through your concierge nursing practice. Covers outreach, service design, and long-term partnership strategies.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-geriatricians', text: 'Why Geriatricians Are High-Value Partners' },
  { id: 'geriatric-care-gaps', text: 'Care Gaps You Can Fill' },
  { id: 'approaching-geriatric-practices', text: 'Approaching Geriatric Practices' },
  { id: 'services-to-offer', text: 'Services for Geriatric Patients' },
  { id: 'working-with-families', text: 'Working with Families and Caregivers' },
  { id: 'long-term-partnership', text: 'Building a Long-Term Partnership' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Does a Concierge Nurse Do for Elderly Parents?',
    description: 'Comprehensive guide to concierge nursing services for aging adults and their families.',
    link: '/resources/services/concierge-nurse-elderly-parents',
    category: 'Client Services',
  },
  {
    title: 'How to Partner with Assisted Living Facilities',
    description: 'Expand your geriatric referral network by working with assisted living communities.',
    link: '/resources/referrals/partner-with-assisted-living-facilities',
    category: 'Referral Sources',
  },
  {
    title: 'How to Create a Chronic Care Management Plan',
    description: 'Build structured care management plans for patients with multiple chronic conditions.',
    link: '/resources/templates/chronic-care-management-plan',
    category: 'Templates',
  },
];

export default function Geriatricians() {
  return (
    <ResourceLayout
      title="How to Partner with Geriatricians as a Concierge Nurse"
      description="Learn how to build referral relationships with geriatricians to serve elderly patients through your concierge nursing practice. Covers outreach, service design, and long-term partnership strategies."
      canonical="https://www.conciergenursesociety.com/resources/referrals/partner-with-geriatricians"
      schema={articleSchema}
      category="Referral Sources"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Launch Your Geriatric Nursing Practice',
        description: 'Join the community and get the frameworks to build a successful concierge nursing business serving older adults.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Geriatricians are among the best referral partners for concierge nurses because their patients need ongoing, in-home support that the office visit model cannot provide. Elderly patients with complex conditions benefit enormously from regular home-based nursing assessments, and geriatric referrals tend to produce long-term client relationships.
        </p>
      </QuickAnswer>

      <h2 id="why-geriatricians">Why Geriatricians Are High-Value Partners</h2>

      <p>
        The aging population is growing rapidly and geriatricians are stretched thin. Their patients have multifaceted care needs that brief office visits cannot adequately address. A concierge nurse who serves as the physician's eyes and ears in the home is an invaluable partner. From a business perspective, geriatric clients often need weekly or monthly services for months or years, creating stable recurring revenue.
      </p>

      <h2 id="geriatric-care-gaps">Care Gaps You Can Fill</h2>

      <p>
        Key gaps include medication reconciliation across multiple prescribers, fall risk assessment in the home environment, nutritional monitoring, hospital-to-home care transitions, cognitive decline monitoring, and caregiver support. These are services that geriatricians value but cannot provide within their practice model.
      </p>

      <h2 id="approaching-geriatric-practices">Approaching Geriatric Practices</h2>

      <p>
        Geriatricians are evidence-oriented practitioners who respond to clinical reasoning over marketing language. Your approach should lead with clinical value, leverage professional networks, and include a clear communication plan for sharing patient findings.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Launch Your Geriatric Nursing Practice</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> provides the outreach frameworks and service templates you need to build geriatrician partnerships.
        </p>
      </div>

      <h2 id="services-to-offer">Services for Geriatric Patients</h2>

      <p>
        Geriatric services should be structured around ongoing care: monthly wellness monitoring, post-hospitalization transition support, care coordination across specialists, and caregiver education. For frameworks on building these services, see our <Link to="/resources/templates/wellness-visit-package">wellness visit package</Link> and <Link to="/resources/templates/chronic-care-management-plan">chronic care plan</Link> templates.
      </p>

      <h2 id="working-with-families">Working with Families and Caregivers</h2>

      <p>
        In geriatric nursing, your client is often the entire family system. Setting clear expectations about communication, decision-making, and privacy from the start is essential. The ability to navigate family dynamics with professionalism distinguishes excellent geriatric concierge nurses.
      </p>

      <h2 id="long-term-partnership">Building a Long-Term Partnership</h2>

      <p>
        Geriatrician partnerships grow through reliable documentation, proactive communication, continued education, and respect for the physician's care plan. Consistency over time is the most powerful trust-building tool.
      </p>

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
