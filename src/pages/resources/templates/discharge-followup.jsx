import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What is a discharge follow-up protocol?", answer: "A discharge follow-up protocol is a structured plan that guides your nursing care during the transition from hospital or facility to home. It includes a timeline of visits, assessment checklists for each visit, medication reconciliation procedures, follow-up coordination steps, and escalation criteria." },
  { question: "How many follow-up visits should the protocol include?", answer: "A standard protocol covers the first 7 to 30 days after discharge. Most include an intensive phase (daily or every-other-day visits for the first week) and a tapering phase (two to three visits per week, then weekly). The exact schedule depends on the patient's condition and risk level." },
  { question: "Should I customize the protocol for each patient?", answer: "Start with a standardized template and customize it based on the patient's diagnosis, discharge instructions, medications, and individual risk factors. Standardization ensures consistency while customization ensures relevance to each patient's specific needs." },
  { question: "How does this protocol help prevent readmissions?", answer: "The protocol systematically addresses the most common causes of readmission: medication errors, failure to follow discharge instructions, missed follow-up appointments, unrecognized worsening symptoms, and inadequate wound care. By catching these issues early, you prevent the escalation that leads to readmission." },
  { question: "Should I share this protocol with referring physicians?", answer: "Yes. Sharing your protocol with referring physicians and discharge planners demonstrates your systematic approach and builds confidence in your services. It also ensures alignment between your follow-up care and the physician's treatment plan." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Create a Discharge Follow-Up Protocol", "description": "Build a structured discharge follow-up protocol for your concierge nursing practice to ensure safe hospital-to-home transitions and reduce readmission risk.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'why-protocols', text: 'Why You Need a Discharge Protocol' },
  { id: 'protocol-timeline', text: 'Protocol Timeline' },
  { id: 'first-visit-checklist', text: 'First Visit Checklist' },
  { id: 'ongoing-visit-components', text: 'Ongoing Visit Components' },
  { id: 'escalation-criteria', text: 'Escalation Criteria' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'What Does a Concierge Nurse Do After Hospital Discharge?', description: 'Understand the clinical services that inform your discharge protocol.', link: '/resources/services/concierge-nurse-after-hospital-discharge', category: 'Client Services' },
  { title: 'How to Partner with Home Health Agencies', description: 'Build referral relationships for patients transitioning from facility care.', link: '/resources/referrals/partner-with-home-health-agencies', category: 'Referral Sources' },
  { title: 'How to Create a Chronic Care Management Plan', description: 'Transition discharge patients to ongoing care management.', link: '/resources/templates/chronic-care-management-plan', category: 'Templates' },
];

export default function DischargeFollowup() {
  return (
    <ResourceLayout title="How to Create a Discharge Follow-Up Protocol" description="Build a structured discharge follow-up protocol for your concierge nursing practice to ensure safe hospital-to-home transitions and reduce readmission risk." canonical="https://www.conciergenursesociety.com/resources/templates/discharge-follow-up-protocol" schema={articleSchema} category="Templates" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Build Your Transitional Care Practice', description: 'Get the protocols and tools for managing safe hospital-to-home transitions.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A discharge follow-up protocol is a structured nursing workflow that guides your care during the hospital-to-home transition. It includes a visit timeline, first-visit checklist, ongoing assessment components, escalation criteria, and documentation templates. A strong protocol ensures consistent care and demonstrates clinical rigor to referring physicians.</p>
      </QuickAnswer>

      <h2 id="why-protocols">Why You Need a Discharge Protocol</h2>
      <p>Discharge follow-up is high-impact but requires systematic execution. Without a structured protocol, critical assessments can be missed. A protocol ensures every patient receives thorough, consistent follow-up and provides a framework to share with referring physicians and <Link to="/resources/referrals/partner-with-home-health-agencies">home health agencies</Link>.</p>

      <h2 id="protocol-timeline">Protocol Timeline</h2>
      <p>Structure your protocol around recovery phases: an immediate phase (days 1 to 3) with intensive visits, a stabilization phase (days 4 to 14) with tapering visits, and a transition phase (days 15 to 30) with weekly check-ins as the patient moves toward independent self-management.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get the Template</p>
        <p className="mb-4">The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include discharge follow-up protocol templates. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> covers building transitional care services.</p>
      </div>

      <h2 id="first-visit-checklist">First Visit Checklist</h2>
      <p>The first visit covers vital signs, medication reconciliation, discharge instruction review, wound assessment, home safety evaluation, follow-up appointment verification, and care team communication. See our guide on <Link to="/resources/services/concierge-nurse-after-hospital-discharge">post-discharge concierge nursing</Link>.</p>

      <h2 id="ongoing-visit-components">Ongoing Visit Components</h2>
      <p>Subsequent visits follow a standardized but abbreviated assessment covering vital signs, medication adherence, wound progression, symptom evaluation, and patient education reinforcement.</p>

      <h2 id="escalation-criteria">Escalation Criteria</h2>
      <p>Define clear criteria for physician contact, urgent care recommendation, or emergency services activation. Document these in the protocol and review with referring physicians. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
