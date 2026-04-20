import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "Do I need a lawyer to create my service agreement?", answer: "It is strongly recommended that you have a healthcare attorney review your service agreement, especially the liability, scope of practice, and HIPAA-related sections. You can draft the framework yourself using this guide, but legal review ensures your agreement protects you properly and complies with your state's laws." },
  { question: "Is a service agreement the same as an informed consent?", answer: "No. A service agreement covers the business relationship (services, pricing, payment, cancellation). Informed consent covers the clinical aspects (what the patient is consenting to, risks, alternatives). You may need both documents depending on your services." },
  { question: "Should clients sign the agreement before services begin?", answer: "Yes. Always have the agreement signed before providing any services. This protects both you and the client by establishing clear expectations from the start. Make it part of your onboarding process alongside the intake form and welcome packet." },
  { question: "How often should I update my service agreement?", answer: "Review your agreement annually and update it whenever you change your services, pricing, policies, or when advised by your attorney. Keep records of all versions and ensure current clients sign updated agreements when significant changes are made." },
  { question: "What if a client wants to modify the agreement?", answer: "You can accommodate reasonable requests, but any modifications should be documented in writing and reviewed by your attorney if they involve liability, scope of practice, or significant business terms. Do not agree to verbal modifications." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Write a Concierge Nursing Service Agreement", "description": "Create a professional service agreement for your concierge nursing business covering scope of services, pricing, liability, HIPAA compliance, and termination policies.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'why-service-agreements', text: 'Why You Need a Service Agreement' },
  { id: 'essential-sections', text: 'Essential Sections' },
  { id: 'scope-of-services', text: 'Defining Scope of Services' },
  { id: 'financial-terms', text: 'Financial Terms' },
  { id: 'liability-and-compliance', text: 'Liability and Compliance' },
  { id: 'termination-policies', text: 'Termination Policies' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Build a Concierge Nursing Intake Form', description: 'Create an intake form that complements your service agreement.', link: '/resources/templates/concierge-nursing-intake-form', category: 'Templates' },
  { title: 'How to Create a Client Welcome Packet', description: 'Build a welcome packet that includes your service agreement.', link: '/resources/templates/concierge-nursing-welcome-packet', category: 'Templates' },
  { title: 'How to Build a Client Emergency Action Plan', description: 'Include emergency protocols as part of your service framework.', link: '/resources/templates/client-emergency-action-plan', category: 'Templates' },
];

export default function ServiceAgreement() {
  return (
    <ResourceLayout title="How to Write a Concierge Nursing Service Agreement" description="Create a professional service agreement for your concierge nursing business covering scope of services, pricing, liability, HIPAA compliance, and termination policies." canonical="https://www.conciergenursesociety.com/resources/templates/concierge-nursing-service-agreement" schema={articleSchema} category="Templates" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Protect Your Practice', description: 'Get the business frameworks to build a professionally structured concierge nursing practice.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A concierge nursing service agreement is the foundational business document that defines your relationship with each client. It covers scope of services, pricing, cancellation policies, liability limitations, HIPAA provisions, emergency protocols, and termination conditions. Every client should sign one before services begin.</p>
      </QuickAnswer>

      <h2 id="why-service-agreements">Why You Need a Service Agreement</h2>
      <p>A service agreement protects both you and your clients by setting clear expectations. Without one, misunderstandings about scope, pricing, and responsibilities are almost inevitable. A professional agreement also signals credibility to clients and referring physicians.</p>

      <h2 id="essential-sections">Essential Sections</h2>
      <p>Key sections include parties, scope of services, pricing and payment, cancellation and refund policies, liability limitations, privacy and HIPAA provisions, emergency protocols, and termination conditions.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get the Template</p>
        <p className="mb-4">The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include service agreement templates reviewed for concierge nursing. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> covers how to structure your business documents professionally.</p>
      </div>

      <h2 id="scope-of-services">Defining Scope of Services</h2>
      <p>Be specific about what your services include and what they do not. State that your services do not replace physician care, that you do not diagnose or prescribe, and that your services are within the scope of your nursing license.</p>

      <h2 id="financial-terms">Financial Terms</h2>
      <p>Clearly state fees, payment timing, accepted methods, and your policy on late payments. Address that your services are private-pay and you do not bill insurance.</p>

      <h2 id="liability-and-compliance">Liability and Compliance</h2>
      <p>This section is critical for legal review. Have a healthcare attorney review your agreement to ensure it protects you properly and complies with your state's laws.</p>

      <h2 id="termination-policies">Termination Policies</h2>
      <p>Define how either party can end the agreement, including notice requirements, immediate termination circumstances, and transition of care provisions. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
