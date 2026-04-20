import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "When should I give clients the welcome packet?", answer: "Send or present the welcome packet after the client signs the service agreement and before the first service visit. This gives them time to review the information and prepare any questions. Some nurses send a digital version immediately and bring a printed copy to the first visit." },
  { question: "Should the welcome packet be printed or digital?", answer: "Both. A professional printed packet makes a strong impression and gives clients something tangible to reference. A digital version (PDF) is convenient for sharing and storage. Many concierge nurses provide both formats." },
  { question: "How long should the welcome packet be?", answer: "Keep it concise but comprehensive — typically 6 to 10 pages. Clients should be able to read it in 10 to 15 minutes. Use clear headings, bullet points, and visual hierarchy to make it scannable." },
  { question: "Should I customize the packet for each client?", answer: "Have a standard template that covers universal information, then customize sections for the client's specific service package, schedule, and health focus. Personalization demonstrates attention to detail and makes the client feel valued." },
  { question: "What is the difference between a welcome packet and a service agreement?", answer: "The service agreement is a legal document that defines the business relationship. The welcome packet is a client-facing guide that explains how your services work in practical terms. They serve different purposes but complement each other." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Create a Client Welcome Packet for Your Concierge Nursing Business", "description": "Build a professional client welcome packet that sets expectations, provides essential information, and creates a premium first impression for your concierge nursing clients.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'why-welcome-packets', text: 'Why Welcome Packets Matter' },
  { id: 'what-to-include', text: 'What to Include' },
  { id: 'design-and-branding', text: 'Design and Branding' },
  { id: 'delivery-and-timing', text: 'Delivery and Timing' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Write a Service Agreement', description: 'The legal document that accompanies your welcome packet.', link: '/resources/templates/concierge-nursing-service-agreement', category: 'Templates' },
  { title: 'How to Build an Intake Form', description: 'Create the intake form that new clients complete during onboarding.', link: '/resources/templates/concierge-nursing-intake-form', category: 'Templates' },
  { title: 'How to Build a Client Emergency Action Plan', description: 'Include emergency protocols in your client onboarding materials.', link: '/resources/templates/client-emergency-action-plan', category: 'Templates' },
];

export default function WelcomePacket() {
  return (
    <ResourceLayout title="How to Create a Client Welcome Packet for Your Concierge Nursing Business" description="Build a professional client welcome packet that sets expectations, provides essential information, and creates a premium first impression for your concierge nursing clients." canonical="https://www.conciergenursesociety.com/resources/templates/concierge-nursing-welcome-packet" schema={articleSchema} category="Templates" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Build Your Professional Practice', description: 'Get the templates and tools to create a polished, professional concierge nursing business.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A client welcome packet is a professional document new clients receive when they begin services. It includes a welcome letter, service overview, what to expect during visits, contact information, scheduling process, first visit preparation, emergency procedures, and privacy notice. It sets the tone for the client relationship.</p>
      </QuickAnswer>

      <h2 id="why-welcome-packets">Why Welcome Packets Matter</h2>
      <p>A professional welcome packet signals that you are organized and client-centered. It answers questions proactively, reduces anxiety about what to expect, and establishes you as a premium service provider. Operationally, it reduces time spent answering basic questions and ensures clients are prepared for their first visit.</p>

      <h2 id="what-to-include">What to Include</h2>
      <p>Essential elements include a personal welcome letter, service overview, visit expectations, contact information, scheduling process, first visit preparation instructions, emergency procedures, and a privacy notice.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get the Template</p>
        <p className="mb-4">The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include welcome packet templates. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> covers building a complete professional client onboarding system.</p>
      </div>

      <h2 id="design-and-branding">Design and Branding</h2>
      <p>Your welcome packet should reflect the quality of your services with consistent branding, clean layout, and professional typography. The design does not need to be elaborate, but it should look intentional.</p>

      <h2 id="delivery-and-timing">Delivery and Timing</h2>
      <p>Send the welcome packet after the <Link to="/resources/templates/concierge-nursing-service-agreement">service agreement</Link> is signed and the <Link to="/resources/templates/concierge-nursing-intake-form">intake form</Link> is completed. Email a digital copy immediately and bring a printed copy to the first visit. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
