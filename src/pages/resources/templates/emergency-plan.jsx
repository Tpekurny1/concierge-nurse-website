import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What is a client emergency action plan?", answer: "A client emergency action plan is a document that outlines the steps to take when a medical emergency occurs during your concierge nursing services. It includes the client's health conditions, known risks, emergency contacts, physician contact information, hospital preference, advance directive status, and step-by-step response protocols." },
  { question: "Does every client need an emergency action plan?", answer: "Yes. Every client should have an individualized emergency action plan regardless of their health status. Even healthy clients undergoing routine services can experience unexpected medical events. Having a plan prepared ensures you respond efficiently and appropriately." },
  { question: "Should clients review and sign the emergency plan?", answer: "Yes. Review the emergency plan with the client and their family during onboarding. Ensure they agree with the plan, particularly regarding hospital preference and advance directive instructions. Have them sign acknowledging review and agreement." },
  { question: "How often should emergency plans be updated?", answer: "Update the plan whenever the client's health status, medications, emergency contacts, or physician information changes. Conduct a formal review at least annually. Any hospitalization or significant health event should trigger a plan update." },
  { question: "What emergency supplies should I carry?", answer: "At minimum, carry a first aid kit, blood pressure cuff, pulse oximeter, stethoscope, thermometer, gloves, CPR mask, and any condition-specific emergency supplies appropriate for your client population. If providing IV therapy, carry anaphylaxis management supplies. Check your emergency supplies regularly and replace expired items." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Build a Client Emergency Action Plan for Concierge Nurses", "description": "Create individualized emergency action plans for your concierge nursing clients covering emergency protocols, advance directives, physician contacts, and response procedures.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'why-emergency-plans', text: 'Why Every Client Needs an Emergency Plan' },
  { id: 'plan-components', text: 'Essential Plan Components' },
  { id: 'condition-specific-protocols', text: 'Condition-Specific Protocols' },
  { id: 'your-emergency-preparedness', text: 'Your Emergency Preparedness' },
  { id: 'documentation-after-emergencies', text: 'Documentation After Emergencies' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Write a Service Agreement', description: 'Include emergency provisions in your service agreement.', link: '/resources/templates/concierge-nursing-service-agreement', category: 'Templates' },
  { title: 'How to Build an Intake Form', description: 'Collect the information needed to create emergency action plans.', link: '/resources/templates/concierge-nursing-intake-form', category: 'Templates' },
  { title: 'How to Create a Chronic Care Management Plan', description: 'Integrate emergency protocols into chronic care management.', link: '/resources/templates/chronic-care-management-plan', category: 'Templates' },
];

export default function EmergencyPlan() {
  return (
    <ResourceLayout title="How to Build a Client Emergency Action Plan for Concierge Nurses" description="Create individualized emergency action plans for your concierge nursing clients covering emergency protocols, advance directives, physician contacts, and response procedures." canonical="https://www.conciergenursesociety.com/resources/templates/client-emergency-action-plan" schema={articleSchema} category="Templates" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Protect Your Clients and Practice', description: 'Get the tools to build a safely operated concierge nursing business.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A client emergency action plan is an individualized document that prepares you to respond to medical emergencies during concierge nursing services. It includes the client's health risks, emergency contacts, physician information, preferred hospital, advance directives, and step-by-step response protocols. Every client should have a personalized plan.</p>
      </QuickAnswer>

      <h2 id="why-emergency-plans">Why Every Client Needs an Emergency Plan</h2>
      <p>As an independent concierge nurse providing care in homes, you are the first responder when emergencies occur. A pre-established plan eliminates pressure-based decision-making and ensures the right actions are taken quickly. Emergency plans also protect you legally and provide peace of mind to clients and families.</p>

      <h2 id="plan-components">Essential Plan Components</h2>
      <p>Essential components include client information, health conditions and risks, medications and allergies, emergency contacts, physician contacts, hospital preference, advance directives, and step-by-step response protocols for the most likely emergency scenarios.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get the Template</p>
        <p className="mb-4">The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include emergency action plan templates. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> covers emergency preparedness for independent nursing practice.</p>
      </div>

      <h2 id="condition-specific-protocols">Condition-Specific Protocols</h2>
      <p>Create response protocols tailored to each client's conditions -- cardiac events, diabetic emergencies, post-surgical complications, falls, or anaphylaxis. Each protocol should include recognition criteria, immediate actions, when to call 911, and whom to notify afterward.</p>

      <h2 id="your-emergency-preparedness">Your Emergency Preparedness</h2>
      <p>Maintain current CPR and BLS certifications, carry appropriate emergency supplies, know every client's address for directing emergency services, and ensure your liability insurance covers emergency interventions.</p>

      <h2 id="documentation-after-emergencies">Documentation After Emergencies</h2>
      <p>After any emergency, document thoroughly: the sequence of events, your actions, communications made, and patient status at transfer. This documentation is essential for legal protection and quality improvement. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
