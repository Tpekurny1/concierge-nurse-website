import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "When should a concierge nurse start after hospital discharge?", answer: "Ideally within 24 to 48 hours of discharge. The first few days at home are the highest-risk period for complications, medication errors, and readmission. Some concierge nurses visit the patient in the hospital before discharge to begin care planning." },
  { question: "How long does post-discharge concierge nursing last?", answer: "Most patients benefit from support during the first 7 to 30 days after discharge. The intensity tapers as the patient stabilizes. Some patients with chronic conditions or complex recoveries may benefit from ongoing support beyond the initial transition period." },
  { question: "What causes hospital readmissions?", answer: "Common causes include medication errors, failure to follow discharge instructions, missed follow-up appointments, unrecognized worsening symptoms, inadequate wound care, and lack of support for daily activities. A concierge nurse addresses all of these risk factors during the transition period." },
  { question: "Do hospitals refer patients to concierge nurses?", answer: "Some hospital discharge planners are open to recommending concierge nursing services, particularly for patients who do not qualify for home health or who need more support than home health provides. Building relationships with discharge planners is an effective referral strategy." },
  { question: "How does this differ from home health after hospital discharge?", answer: "Home health is insurance-covered and limited by visit caps, documentation requirements, and eligibility criteria. Concierge nursing offers flexible, unlimited visits, longer sessions, and services beyond skilled nursing such as appointment accompaniment, care coordination, and family education." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "What Does a Concierge Nurse Do After Hospital Discharge?", "description": "Learn how concierge nurses support patients during the critical hospital-to-home transition with medication reconciliation, wound care, follow-up coordination, and readmission prevention.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'the-discharge-risk', text: 'The Hospital-to-Home Risk Period' },
  { id: 'first-visit', text: 'The First Post-Discharge Visit' },
  { id: 'medication-reconciliation', text: 'Medication Reconciliation' },
  { id: 'follow-up-coordination', text: 'Follow-Up Coordination' },
  { id: 'ongoing-monitoring', text: 'Ongoing Monitoring and Support' },
  { id: 'for-nurses', text: 'Building a Discharge Support Practice' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Create a Discharge Follow-Up Protocol', description: 'Build a structured protocol for managing post-discharge patients.', link: '/resources/templates/discharge-follow-up-protocol', category: 'Templates' },
  { title: 'How to Partner with Home Health Agencies', description: 'Build referral relationships for patients transitioning from home health.', link: '/resources/referrals/partner-with-home-health-agencies', category: 'Referral Sources' },
  { title: 'What Does a Concierge Nurse Do for Medication Management?', description: 'Medication reconciliation is critical after hospital discharge.', link: '/resources/services/concierge-nurse-medication-management', category: 'Client Services' },
];

export default function AfterHospital() {
  return (
    <ResourceLayout title="What Does a Concierge Nurse Do After Hospital Discharge?" description="Learn how concierge nurses support patients during the critical hospital-to-home transition with medication reconciliation, wound care, follow-up coordination, and readmission prevention." canonical="https://www.conciergenursesociety.com/resources/services/concierge-nurse-after-hospital-discharge" schema={articleSchema} category="Client Services" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Build Your Transitional Care Practice', description: 'Get the tools to serve patients during the critical hospital-to-home transition.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>After hospital discharge, a concierge nurse provides in-home medication reconciliation, wound care, vital sign monitoring, discharge instruction reinforcement, follow-up coordination, and readmission prevention. The hospital-to-home transition is one of the highest-risk periods in a patient's care journey.</p>
      </QuickAnswer>

      <h2 id="the-discharge-risk">The Hospital-to-Home Risk Period</h2>
      <p>Hospital readmissions within 30 days are a major healthcare problem. Patients are discharged with complex medication changes, wound care needs, and follow-up requirements that they must manage at home with limited support. A concierge nurse visiting the home within the first days of discharge can prevent many of the failures that lead to readmission.</p>

      <h2 id="first-visit">The First Post-Discharge Visit</h2>
      <p>The initial visit is comprehensive: reviewing discharge instructions, performing medication reconciliation, completing a physical assessment, evaluating home safety, and ensuring follow-up appointments are scheduled. This foundation sets the stage for safe recovery.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Transitional Care Practice</p>
        <p className="mb-4">The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> includes discharge support frameworks. The <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> provide protocol templates.</p>
      </div>

      <h2 id="medication-reconciliation">Medication Reconciliation</h2>
      <p>Hospital stays frequently result in medication changes. The transition from hospital to home medications is one of the highest-risk moments for errors. A thorough reconciliation addresses discrepancies, ensures prescriptions are filled, and checks for dangerous interactions. See our <Link to="/resources/services/concierge-nurse-medication-management">medication management guide</Link>.</p>

      <h2 id="follow-up-coordination">Follow-Up Coordination</h2>
      <p>Many readmissions occur because patients miss follow-up appointments or fail to connect with outpatient care. The concierge nurse ensures continuity by scheduling appointments, coordinating with the PCP, and preparing the patient for follow-up visits.</p>

      <h2 id="ongoing-monitoring">Ongoing Monitoring and Support</h2>
      <p>After the initial visit, monitoring continues through the critical transition period with tapering frequency as the patient stabilizes. Each visit includes wound care, vital sign trending, education reinforcement, and care team communication.</p>

      <h2 id="for-nurses">Building a Discharge Support Practice</h2>
      <p>Build referral relationships with <Link to="/resources/referrals/partner-with-home-health-agencies">home health agencies</Link> and hospital discharge planners. This service pairs with <Link to="/resources/services/concierge-nurse-chronic-illness">chronic illness management</Link> for ongoing care. Visit our <Link to="/start-here">Start Here</Link> page.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
