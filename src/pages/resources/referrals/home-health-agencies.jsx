import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Why would a home health agency refer patients to a concierge nurse?",
    answer: "Home health agencies have limitations set by insurance: visit caps, service restrictions, and discharge requirements. When patients need services beyond what insurance covers — additional visits, longer sessions, non-skilled support, or care after home health discharge — the agency may refer to a concierge nurse."
  },
  {
    question: "Is partnering with home health agencies competitive or complementary?",
    answer: "It should be complementary. You are not competing for the same patients at the same time. You serve patients whose insurance-covered home health has ended, patients who need services outside home health's scope, or patients who want more personalized care than the agency model provides."
  },
  {
    question: "How do I avoid stepping on the agency's toes?",
    answer: "Be clear about your role. You do not replace home health services — you supplement and extend them. Never disparage agency care or suggest that the patient should choose you over their home health nurse. Focus on the specific gaps you fill."
  },
  {
    question: "Can I work for a home health agency and also run a concierge practice?",
    answer: "This depends on your employment agreement with the agency. Many agencies have non-compete clauses or conflict-of-interest policies. Review your contract carefully and consult with a business attorney if needed. Some nurses transition fully to concierge work, while others maintain both roles."
  },
  {
    question: "What is the best way to connect with home health discharge planners?",
    answer: "Introduce yourself professionally with a one-page overview of your services focused on post-home-health continuity of care. Offer to be a resource for patients the agency must discharge but who still need nursing support. Build the relationship over time through consistent communication and reliable service."
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
  "headline": "How to Partner with Home Health Agencies as a Concierge Nurse",
  "description": "Build referral relationships with home health agencies to serve patients who need extended or supplemental nursing care beyond what insurance covers.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-home-health-agencies', text: 'Why Home Health Agencies Are Referral Partners' },
  { id: 'understanding-the-gap', text: 'Understanding the Gap You Fill' },
  { id: 'approaching-agencies', text: 'Approaching Home Health Agencies' },
  { id: 'services-to-offer', text: 'Services for Post-Home-Health Patients' },
  { id: 'maintaining-boundaries', text: 'Maintaining Professional Boundaries' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Does a Concierge Nurse Do After Hospital Discharge?',
    description: 'Learn about services concierge nurses provide during hospital-to-home transitions.',
    link: '/resources/services/concierge-nurse-after-hospital-discharge',
    category: 'Client Services',
  },
  {
    title: 'How to Partner with Assisted Living Facilities',
    description: 'Build referral relationships with assisted living communities for supplemental care services.',
    link: '/resources/referrals/partner-with-assisted-living-facilities',
    category: 'Referral Sources',
  },
  {
    title: 'How to Create a Discharge Follow-Up Protocol',
    description: 'Build structured protocols for managing patients transitioning from facility-based to home-based care.',
    link: '/resources/templates/discharge-follow-up-protocol',
    category: 'Templates',
  },
];

export default function HomeHealthAgencies() {
  return (
    <ResourceLayout
      title="How to Partner with Home Health Agencies as a Concierge Nurse"
      description="Build referral relationships with home health agencies to serve patients who need extended or supplemental nursing care beyond what insurance covers."
      canonical="https://www.conciergenursesociety.com/resources/referrals/partner-with-home-health-agencies"
      schema={articleSchema}
      category="Referral Sources"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Build Your Concierge Nursing Practice',
        description: 'Get the tools and mentorship to create a sustainable business serving patients who need more than the system provides.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Home health agencies are a complementary referral source for concierge nurses because they regularly encounter patients who need more care than insurance covers. When visits are capped, patients are discharged, or families want services beyond the home health scope, the agency can refer to you. Position yourself as a partner who extends care, not a competitor.
        </p>
      </QuickAnswer>

      <h2 id="why-home-health-agencies">Why Home Health Agencies Are Referral Partners</h2>

      <p>
        Home health agencies operate within strict insurance parameters -- limited visits, restricted services, and mandatory discharge criteria. Agency staff see patients daily who need more support than the system allows. A concierge nurse available to continue care on a private-pay basis gives the agency a solution for patients who fall through the cracks.
      </p>

      <h2 id="understanding-the-gap">Understanding the Gap You Fill</h2>

      <p>
        Referral opportunities arise when visit caps are reached, patients are discharged but still need support, services fall outside insurance coverage, patients prefer more personalized care, or family caregivers experience burnout. These are situations where concierge nursing provides genuine continuity of care.
      </p>

      <h2 id="approaching-agencies">Approaching Home Health Agencies</h2>

      <p>
        Position your outreach around patient advocacy rather than business development. Contact intake coordinators or directors of nursing, provide educational materials about your services, and respect each agency's existing processes for outside referrals.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Concierge Nursing Practice</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> includes referral partnership strategies for building relationships with agencies and facilities.
        </p>
      </div>

      <h2 id="services-to-offer">Services for Post-Home-Health Patients</h2>

      <p>
        Key services include transitional care continuation, extended chronic disease management, wellness and prevention, and caregiver support and education. See our guides on <Link to="/resources/services/concierge-nurse-after-hospital-discharge">post-hospital care</Link> and <Link to="/resources/services/concierge-nurse-chronic-illness">chronic illness management</Link>.
      </p>

      <h2 id="maintaining-boundaries">Maintaining Professional Boundaries</h2>

      <p>
        The key to a successful partnership is clear boundaries. Never solicit active home health patients, never disparage agency care, communicate collaboratively, and keep your business model clearly distinct as private-pay concierge nursing.
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
