import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What information should an intake form collect?", answer: "Essential information includes demographics, emergency contacts, health history, current medications, allergies, current physicians and specialists, insurance information (for records, not billing), advance directive status, and consent for services. Additional sections vary by your specialty." },
  { question: "Should the intake form be digital or paper?", answer: "Offer both options. A digital form (secure online form or fillable PDF) is convenient for tech-savvy clients and reduces data entry time. A paper form works for clients who prefer it. Ensure any digital forms comply with HIPAA requirements for electronic health information." },
  { question: "How do I keep intake form information secure?", answer: "Store all health information securely per HIPAA requirements. Use encrypted digital storage, locked physical files, and secure transmission methods. Do not store health information on unsecured devices, in email, or on personal cloud storage without proper encryption." },
  { question: "When should clients complete the intake form?", answer: "Send the intake form after the service agreement is signed and before the first visit. Allow adequate time for the client to complete it thoroughly — rushing through the intake often leads to incomplete or inaccurate information." },
  { question: "Should I update the intake form periodically?", answer: "Yes. Review and update client information at least annually and whenever there are significant health changes, new medications, new physicians, or changes in emergency contacts. An outdated intake form can compromise care quality and safety." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Build a Concierge Nursing Intake Form", "description": "Create a comprehensive intake form for your concierge nursing practice that collects essential health information while providing a professional client experience.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'why-intake-forms', text: 'Why Intake Forms Are Essential' },
  { id: 'core-sections', text: 'Core Sections of the Intake Form' },
  { id: 'specialty-sections', text: 'Specialty-Specific Sections' },
  { id: 'hipaa-considerations', text: 'HIPAA Considerations' },
  { id: 'the-intake-process', text: 'The Intake Process' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Write a Service Agreement', description: 'The agreement clients sign before completing the intake form.', link: '/resources/templates/concierge-nursing-service-agreement', category: 'Templates' },
  { title: 'How to Create a Client Welcome Packet', description: 'The welcome packet that accompanies your intake process.', link: '/resources/templates/concierge-nursing-welcome-packet', category: 'Templates' },
  { title: 'How to Build a Client Emergency Action Plan', description: 'Use intake information to develop client-specific emergency plans.', link: '/resources/templates/client-emergency-action-plan', category: 'Templates' },
];

export default function IntakeForm() {
  return (
    <ResourceLayout title="How to Build a Concierge Nursing Intake Form" description="Create a comprehensive intake form for your concierge nursing practice that collects essential health information while providing a professional client experience." canonical="https://www.conciergenursesociety.com/resources/templates/concierge-nursing-intake-form" schema={articleSchema} category="Templates" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Build Your Client Onboarding System', description: 'Get the templates and tools to create a professional client intake experience.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A concierge nursing intake form collects the essential health and personal information needed to provide safe, effective care. It includes demographics, emergency contacts, health history, medications, allergies, physician information, advance directives, and consent. All information must comply with HIPAA requirements.</p>
      </QuickAnswer>

      <h2 id="why-intake-forms">Why Intake Forms Are Essential</h2>
      <p>A thorough intake form ensures patient safety, provides the clinical foundation for care planning, and demonstrates professionalism to clients and referring physicians.</p>

      <h2 id="core-sections">Core Sections of the Intake Form</h2>
      <p>Essential sections include demographics, emergency contacts, health history, current medications, allergies, healthcare providers, advance directive status, and consent and authorization for services.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get the Template</p>
        <p className="mb-4">The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include intake form templates customizable for different nursing specialties. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> covers HIPAA compliance and client onboarding.</p>
      </div>

      <h2 id="specialty-sections">Specialty-Specific Sections</h2>
      <p>Depending on your niche, add sections for post-surgical details, postpartum information, chronic disease specifics, or geriatric functional status. Customize the standard template for your client population.</p>

      <h2 id="hipaa-considerations">HIPAA Considerations</h2>
      <p>If HIPAA applies to your practice, your intake process must include a Notice of Privacy Practices, secure collection and storage methods, and documented consent. Even if HIPAA does not technically apply, following these practices protects clients and your business.</p>

      <h2 id="the-intake-process">The Intake Process</h2>
      <p>Send the intake form after the <Link to="/resources/templates/concierge-nursing-service-agreement">service agreement</Link> is signed. Review before the first visit, verify key information in person, and use the information to develop the client's care plan. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
