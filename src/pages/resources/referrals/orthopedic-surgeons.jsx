import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "What types of orthopedic procedures benefit most from concierge nursing?",
    answer: "Total joint replacements (hip and knee), rotator cuff repairs, ACL reconstructions, spinal surgeries, and fracture repairs are among the most common procedures where patients benefit from post-operative concierge nursing support. Any procedure that requires significant home recovery is a good fit."
  },
  {
    question: "How do I demonstrate value to an orthopedic surgeon?",
    answer: "Focus on measurable outcomes: reduced readmission rates, improved patient satisfaction, better adherence to physical therapy protocols, and fewer after-hours calls. Surgeons respond to data and results. After your initial patients, document these outcomes (in aggregate, without patient-identifying information) to share with the practice."
  },
  {
    question: "Do I need orthopedic nursing experience?",
    answer: "Direct orthopedic experience is helpful but not always required. Strong wound care skills, understanding of mobility assessments, knowledge of DVT prevention, and familiarity with post-surgical protocols are the core competencies. If you lack orthopedic experience, consider shadowing or taking continuing education courses before approaching surgeons."
  },
  {
    question: "How do orthopedic concierge nursing services differ from home health?",
    answer: "Home health agencies provide insurance-covered services with strict visit limits and documentation requirements. Concierge nursing offers flexible, patient-centered care without insurance restrictions. You can provide longer visits, more frequent check-ins, and services like transportation to PT appointments that home health does not cover."
  },
  {
    question: "Should I coordinate with physical therapists?",
    answer: "Yes. Coordinating with the patient's physical therapist creates a more comprehensive recovery experience and strengthens your value to the surgeon. Many concierge nurses develop referral relationships with both orthopedic surgeons and PT practices, creating a care network that benefits all parties."
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
  "headline": "How to Partner with Orthopedic Surgeons as a Concierge Nurse",
  "description": "Build referral relationships with orthopedic surgeons by providing post-surgical recovery support, wound care, and rehabilitation coordination through your concierge nursing practice.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-orthopedic-surgeons', text: 'Why Orthopedic Surgeons Need Concierge Nurses' },
  { id: 'understanding-the-recovery-landscape', text: 'Understanding the Recovery Landscape' },
  { id: 'approaching-orthopedic-practices', text: 'Approaching Orthopedic Practices' },
  { id: 'core-services', text: 'Core Services for Orthopedic Patients' },
  { id: 'coordinating-with-pt', text: 'Coordinating with Physical Therapy' },
  { id: 'sustaining-referrals', text: 'Sustaining Referrals Over Time' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'How to Create a Post-Op Recovery Care Package',
    description: 'Build structured post-operative care packages for your concierge nursing business.',
    link: '/resources/templates/post-op-recovery-care-package',
    category: 'Templates',
  },
  {
    title: 'What Does a Concierge Nurse Do After Hospital Discharge?',
    description: 'Learn about the critical services concierge nurses provide during hospital-to-home transitions.',
    link: '/resources/services/concierge-nurse-after-hospital-discharge',
    category: 'Client Services',
  },
  {
    title: 'How to Partner with Primary Care Physicians',
    description: 'Expand your referral network by building relationships with primary care providers.',
    link: '/resources/referrals/partner-with-primary-care-physicians',
    category: 'Referral Sources',
  },
];

export default function OrthopedicSurgeons() {
  return (
    <ResourceLayout
      title="How to Partner with Orthopedic Surgeons as a Concierge Nurse"
      description="Build referral relationships with orthopedic surgeons by providing post-surgical recovery support, wound care, and rehabilitation coordination through your concierge nursing practice."
      canonical="https://www.conciergenursesociety.com/resources/referrals/partner-with-orthopedic-surgeons"
      schema={articleSchema}
      category="Referral Sources"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Build Your Surgical Recovery Practice',
        description: 'Get the tools and mentorship to build referral partnerships with surgeons in your area.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Orthopedic surgeons are strong referral partners because their patients face lengthy home recoveries after joint replacements, fracture repairs, and other surgeries. Concierge nurses provide wound monitoring, pain management support, DVT prevention, and rehabilitation coordination during the critical early recovery period.
        </p>
      </QuickAnswer>

      <h2 id="why-orthopedic-surgeons">Why Orthopedic Surgeons Need Concierge Nurses</h2>

      <p>
        Many orthopedic procedures have shifted to outpatient or short-stay models, meaning patients recover at home with less supervision than ever. Surgeons worry about complications like DVT, infections, and inadequate rehabilitation. A concierge nurse who provides skilled assessments during early recovery helps ensure better outcomes and higher patient satisfaction.
      </p>

      <h2 id="understanding-the-recovery-landscape">Understanding the Recovery Landscape</h2>

      <p>
        Common procedures include total joint replacements, rotator cuff repairs, spinal surgery, and fracture repairs. Each has different recovery trajectories, but all benefit from professional nursing oversight during the transition from surgical center to full recovery at home.
      </p>

      <h2 id="approaching-orthopedic-practices">Approaching Orthopedic Practices</h2>

      <p>
        Orthopedic surgeons are outcome-driven. Your approach should focus on how you support surgical outcomes through complication prevention, physical therapy compliance, and patient satisfaction. Speaking their clinical language and offering procedure-specific packages is more compelling than a generic overview.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Surgical Recovery Practice</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> provides surgeon outreach frameworks and the <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> include referral packet templates.
        </p>
      </div>

      <h2 id="core-services">Core Services for Orthopedic Patients</h2>

      <p>
        Core services include wound assessment, pain management support, DVT prevention monitoring, mobility and safety assessment, physical therapy reinforcement, and patient education. For a framework on structuring these services into packages, see our <Link to="/resources/templates/post-op-recovery-care-package">post-op recovery care package template</Link>.
      </p>

      <h2 id="coordinating-with-pt">Coordinating with Physical Therapy</h2>

      <p>
        Coordinating with the patient's physical therapist strengthens the value you provide to the surgeon. This coordination also creates a secondary referral source, as PTs who see your value may recommend your services to their other patients.
      </p>

      <h2 id="sustaining-referrals">Sustaining Referrals Over Time</h2>

      <p>
        Orthopedic surgeons perform high volumes of procedures, so a strong partnership can generate consistent referrals. Sustain the relationship through post-care reports, quick response times, updated protocols, and periodic check-ins with the practice.
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
