import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What should a post-op care package include?", answer: "A comprehensive post-op care package includes the service description, visit schedule, clinical services provided at each visit, on-call availability details, communication protocols with the surgeon, pricing, what the client needs to provide, and cancellation and emergency policies." },
  { question: "How should I price a post-op care package?", answer: "Price based on the number of visits, hours of on-call availability, supplies you provide, and the complexity of the surgical recovery. Package pricing (flat fee for a defined service period) is generally preferred over hourly billing for post-surgical care because it gives clients predictability." },
  { question: "Should I create different packages for different procedures?", answer: "Yes. Different procedures have different recovery timelines and care needs. A facelift package differs from a tummy tuck package. Creating procedure-specific packages demonstrates expertise and allows you to price appropriately for the level of care required." },
  { question: "How do I present the package to potential clients?", answer: "Present the package as a professional document — either a printed brochure or a well-designed PDF. Include clear descriptions of what is included, what the client can expect at each visit, and how you communicate with their surgeon. Keep the language professional but accessible." },
  { question: "Should the surgeon review my care package?", answer: "Yes. Sharing your care package with referring surgeons ensures alignment with their post-operative protocols and demonstrates professionalism. Surgeons are more likely to refer patients when they know exactly what services you provide and how you operate." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Create a Post-Op Recovery Care Package", "description": "Step-by-step guide to building a professional post-operative recovery care package for your concierge nursing business, including structure, pricing, and presentation.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'why-packages', text: 'Why Package Your Post-Op Services' },
  { id: 'package-structure', text: 'Package Structure' },
  { id: 'defining-visit-content', text: 'Defining Visit Content' },
  { id: 'on-call-availability', text: 'On-Call Availability' },
  { id: 'pricing-framework', text: 'Pricing Framework' },
  { id: 'presenting-your-package', text: 'Presenting Your Package' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'What Does a Concierge Nurse Do After a Facelift?', description: 'Understand facelift recovery to design procedure-specific packages.', link: '/resources/services/concierge-nurse-after-facelift', category: 'Client Services' },
  { title: 'How to Partner with Plastic Surgeons', description: 'Build referral relationships that create demand for your care packages.', link: '/resources/referrals/partner-with-plastic-surgeons', category: 'Referral Sources' },
  { title: 'How to Write a Service Agreement', description: 'Formalize your care package with a professional service agreement.', link: '/resources/templates/concierge-nursing-service-agreement', category: 'Templates' },
];

export default function PostOpCarePackage() {
  return (
    <ResourceLayout title="How to Create a Post-Op Recovery Care Package" description="Step-by-step guide to building a professional post-operative recovery care package for your concierge nursing business, including structure, pricing, and presentation." canonical="https://www.conciergenursesociety.com/resources/templates/post-op-recovery-care-package" schema={articleSchema} category="Templates" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Build Your Service Packages', description: 'Get the templates and guidance to create professional care packages for your concierge nursing business.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A post-op recovery care package bundles your nursing services into a structured offering that clients can understand and purchase with confidence. It should include a visit schedule, defined clinical services, on-call availability, surgeon communication protocols, and transparent pricing. Packaging your services professionally makes referrals easier for surgeons.</p>
      </QuickAnswer>

      <h2 id="why-packages">Why Package Your Post-Op Services</h2>
      <p>Package pricing changes the dynamic with clients: they know exactly what they are getting, the service feels premium, surgeons can refer with confidence, and your revenue becomes predictable. Moving from hourly billing to structured packages is one of the most important business decisions a concierge nurse can make.</p>

      <h2 id="package-structure">Package Structure</h2>
      <p>A well-structured package includes a service overview, a clear visit schedule, clinical services defined for each phase of recovery, on-call terms, and what is not included. The structure creates clarity for both you and your clients.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get the Template</p>
        <p className="mb-4">The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include ready-to-customize post-op care package templates. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> walks you through building and pricing your packages.</p>
      </div>

      <h2 id="defining-visit-content">Defining Visit Content</h2>
      <p>Each visit should have a defined clinical workflow appropriate to the recovery phase. The content varies by procedure but generally covers assessment, care delivery, education, and documentation. For procedure-specific guidance, see our service pages on <Link to="/resources/services/concierge-nurse-after-facelift">facelift</Link>, <Link to="/resources/services/concierge-nurse-after-bbl">BBL</Link>, and <Link to="/resources/services/concierge-nurse-after-tummy-tuck">tummy tuck</Link> recovery.</p>

      <h2 id="on-call-availability">On-Call Availability</h2>
      <p>On-call availability is one of the most valued package components. Define your hours, response time expectations, and how the client contacts you. Set realistic boundaries that you can sustain.</p>

      <h2 id="pricing-framework">Pricing Framework</h2>
      <p>Your pricing should reflect the total value of the package, not just the sum of visits. Many concierge nurses offer tiered pricing to give clients options. The right pricing structure is covered in depth in the <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link>.</p>

      <h2 id="presenting-your-package">Presenting Your Package</h2>
      <p>Your package document should look professional and include your business branding, visit schedule, services, pricing, and contact information. Present it to both surgeons and prospective clients.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
