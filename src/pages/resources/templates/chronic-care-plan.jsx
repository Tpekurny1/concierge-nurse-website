import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What is a chronic care management plan?", answer: "A chronic care management plan is a structured document that outlines how you will monitor and support a patient with one or more chronic conditions. It includes the patient's conditions, medications, assessment schedule, goals, interventions, and communication protocols with the care team." },
  { question: "How detailed should the plan be?", answer: "Detailed enough to guide your nursing practice and communicate your approach to physicians and family, but not so complex that it becomes unwieldy. Focus on actionable items: what you assess, how often, what triggers escalation, and how you communicate findings." },
  { question: "Should the physician review the care plan?", answer: "Yes. Share your care plan with the patient's primary care physician and relevant specialists. Physician review ensures alignment with the medical treatment plan and demonstrates your professionalism. Some physicians may provide input that strengthens the plan." },
  { question: "How often should the plan be updated?", answer: "Review and update the plan whenever there is a significant change in the patient's condition, medications, or treatment goals. At minimum, conduct a formal plan review quarterly. Document all updates and communicate changes to the care team." },
  { question: "Can I bill for chronic care management?", answer: "As a concierge nurse operating on a private-pay model, you bill the client directly for your services. You are not billing Medicare's CCM codes (those are for physician practices). Your care plan is a clinical tool and service document, not an insurance billing tool." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Create a Chronic Care Management Plan", "description": "Build a structured chronic care management plan for your concierge nursing patients with this guide covering assessment protocols, goal setting, and care coordination.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'why-care-plans', text: 'Why You Need Structured Care Plans' },
  { id: 'plan-components', text: 'Core Plan Components' },
  { id: 'assessment-protocols', text: 'Assessment Protocols' },
  { id: 'goals-and-interventions', text: 'Goals and Interventions' },
  { id: 'escalation-protocols', text: 'Escalation Protocols' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'What Does a Concierge Nurse Do for Chronic Illness?', description: 'Understand chronic illness services to inform your care plans.', link: '/resources/services/concierge-nurse-chronic-illness', category: 'Client Services' },
  { title: 'How to Partner with Primary Care Physicians', description: 'Physician partnerships strengthen chronic care plan development.', link: '/resources/referrals/partner-with-primary-care-physicians', category: 'Referral Sources' },
  { title: 'How to Create a Wellness Visit Package', description: 'Wellness visits are the delivery mechanism for chronic care monitoring.', link: '/resources/templates/wellness-visit-package', category: 'Templates' },
];

export default function ChronicCarePlan() {
  return (
    <ResourceLayout title="How to Create a Chronic Care Management Plan" description="Build a structured chronic care management plan for your concierge nursing patients with this guide covering assessment protocols, goal setting, and care coordination." canonical="https://www.conciergenursesociety.com/resources/templates/chronic-care-management-plan" schema={articleSchema} category="Templates" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Build Your Chronic Care Practice', description: 'Get the frameworks to create professional care plans for chronic disease patients.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A chronic care management plan is a structured document that guides your ongoing nursing care for patients with chronic conditions. It includes a patient profile, condition-specific assessment protocols, health goals, nursing interventions, escalation criteria, and communication plans. A well-constructed plan demonstrates clinical rigor to physicians.</p>
      </QuickAnswer>

      <h2 id="why-care-plans">Why You Need Structured Care Plans</h2>
      <p>Structured care plans guide your clinical practice, communicate your approach to physicians, demonstrate value to clients and families, and protect you professionally by documenting your systematic approach to care.</p>

      <h2 id="plan-components">Core Plan Components</h2>
      <p>Essential components include the patient profile, care team directory, condition-specific assessments, health goals, nursing interventions, escalation protocols, and a communication plan. Each component plays a role in ensuring comprehensive, coordinated care.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get the Template</p>
        <p className="mb-4">The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include chronic care management plan templates. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> walks you through building care plans that physicians trust.</p>
      </div>

      <h2 id="assessment-protocols">Assessment Protocols</h2>
      <p>Create condition-specific assessment checklists for each visit. For more on condition-specific services, see our <Link to="/resources/services/concierge-nurse-chronic-illness">chronic illness guide</Link>.</p>

      <h2 id="goals-and-interventions">Goals and Interventions</h2>
      <p>Goals should be specific, measurable, and meaningful to the patient. For each goal, define the nursing interventions you take at each visit to support progress.</p>

      <h2 id="escalation-protocols">Escalation Protocols</h2>
      <p>Clear escalation criteria protect the patient and demonstrate clinical judgment. Define parameters that trigger physician notification, direct contact, ER evaluation, or emergency activation. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
