import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "What services can a concierge nurse provide in assisted living settings?",
    answer: "Concierge nurses can provide supplemental health assessments, medication management oversight, appointment accompaniment, care advocacy, family communication, transition support for new residents, and specialized monitoring that exceeds the facility's standard care level."
  },
  {
    question: "Do assisted living facilities hire concierge nurses directly?",
    answer: "Some facilities may contract with concierge nurses for supplemental services or on-call coverage. However, in most cases, the resident's family hires the concierge nurse directly to provide additional oversight and support beyond what the facility offers."
  },
  {
    question: "How do I navigate facility policies about outside healthcare providers?",
    answer: "Each facility has its own policies regarding outside providers. Before approaching a facility, ask about their guest healthcare provider policy. Some require background checks, liability insurance documentation, and advance scheduling. Be prepared to comply with all facility requirements."
  },
  {
    question: "Is there a conflict between facility staff and concierge nurses?",
    answer: "There can be tension if the relationship is not handled well. Position yourself as a supplement to, not a replacement for, facility care. Work collaboratively with staff, respect their expertise and routines, and avoid creating an adversarial dynamic. Good communication and clear boundaries prevent most conflicts."
  },
  {
    question: "What credentials strengthen my value to assisted living facilities?",
    answer: "Gerontological nursing certification, care management credentials (CCM), dementia care certifications, and medication management expertise are all valuable. Experience working in long-term care settings also provides useful context for understanding the assisted living environment."
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
  "headline": "How to Partner with Assisted Living Facilities as a Concierge Nurse",
  "description": "Build referral relationships with assisted living facilities to provide supplemental nursing services, care advocacy, and family support for residents.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-assisted-living', text: 'Why Assisted Living Facilities Need Concierge Nurses' },
  { id: 'understanding-the-model', text: 'Understanding the Assisted Living Model' },
  { id: 'approaching-facilities', text: 'Approaching Assisted Living Facilities' },
  { id: 'services-to-offer', text: 'Services for Assisted Living Residents' },
  { id: 'working-with-families', text: 'Working with Families of Residents' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Does a Concierge Nurse Do for Elderly Parents?',
    description: 'Explore the full range of concierge nursing services for aging adults.',
    link: '/resources/services/concierge-nurse-elderly-parents',
    category: 'Client Services',
  },
  {
    title: 'How to Partner with Geriatricians',
    description: 'Build physician referral partnerships that complement your assisted living relationships.',
    link: '/resources/referrals/partner-with-geriatricians',
    category: 'Referral Sources',
  },
  {
    title: 'How to Create a Chronic Care Management Plan',
    description: 'Develop structured care plans for residents with complex health needs.',
    link: '/resources/templates/chronic-care-management-plan',
    category: 'Templates',
  },
];

export default function AssistedLiving() {
  return (
    <ResourceLayout
      title="How to Partner with Assisted Living Facilities as a Concierge Nurse"
      description="Build referral relationships with assisted living facilities to provide supplemental nursing services, care advocacy, and family support for residents."
      canonical="https://www.conciergenursesociety.com/resources/referrals/partner-with-assisted-living-facilities"
      schema={articleSchema}
      category="Referral Sources"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Build Your Geriatric Care Practice',
        description: 'Get the tools and community support to serve assisted living residents and their families.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Assisted living facilities are valuable referral partners for concierge nurses who specialize in geriatric care. These facilities provide housing and basic assistance but are not skilled nursing facilities. Residents and their families often want additional health monitoring, medication oversight, and care advocacy beyond what the facility provides.
        </p>
      </QuickAnswer>

      <h2 id="why-assisted-living">Why Assisted Living Facilities Need Concierge Nurses</h2>

      <p>
        Assisted living occupies a middle ground between independent living and skilled nursing. Many residents have complex health needs that the facility's standard staffing cannot fully address. Families often feel a gap between what the facility provides and what their loved one needs from a clinical standpoint. For the facility, having a trusted concierge nurse to recommend enhances resident satisfaction.
      </p>

      <h2 id="understanding-the-model">Understanding the Assisted Living Model</h2>

      <p>
        Assisted living facilities are staffed primarily by CNAs and medication aides, with limited RN or LPN oversight. Standard services include meals, housekeeping, and assistance with daily activities -- but not skilled nursing assessments, wound care, or detailed health monitoring. Medical appointment accompaniment and health advocacy are additional gaps that families value.
      </p>

      <h2 id="approaching-facilities">Approaching Assisted Living Facilities</h2>

      <p>
        Meet with the executive director or wellness staff, emphasize that you supplement rather than replace facility care, and comply with all facility policies regarding outside providers. Building trust with both facility leadership and families is essential for this referral channel.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Geriatric Care Practice</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> provides frameworks for facility partnerships and the <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> include service package templates.
        </p>
      </div>

      <h2 id="services-to-offer">Services for Assisted Living Residents</h2>

      <p>
        Key services include regular health assessments, medication management oversight, appointment accompaniment and advocacy, and transition support for new residents. See our <Link to="/resources/templates/wellness-visit-package">wellness visit package</Link> and <Link to="/resources/services/concierge-nurse-medication-management">medication management</Link> guides.
      </p>

      <h2 id="working-with-families">Working with Families of Residents</h2>

      <p>
        Families are often your primary clients in assisted living settings. They hire you to provide an extra layer of oversight for their loved one. Establish regular communication schedules, be honest and objective, and support families through difficult care transition decisions with empathy and professionalism.
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
