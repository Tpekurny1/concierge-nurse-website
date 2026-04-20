import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "Can any nurse provide IV therapy at home?", answer: "No. IV therapy requires specific training and may be restricted by your state's nurse practice act. RNs can typically administer IV therapy within their scope, but LPNs may have restrictions. Some states require additional certification. Always verify your state's regulations before offering IV therapy services." },
  { question: "What types of IV therapy do concierge nurses provide?", answer: "Common services include hydration therapy, vitamin and nutrient infusions, post-illness recovery support, hangover recovery, athletic performance support, and immune support blends. The specific therapies you can offer depend on your scope of practice, standing orders from a physician, and state regulations." },
  { question: "Do I need a physician's order for IV therapy?", answer: "In most states, yes. IV therapy requires a physician's order or standing order protocol. Many concierge nurses work with a collaborating physician who provides standing orders for specific IV protocols. The requirements vary by state, so consult your state's nurse practice act and a healthcare attorney." },
  { question: "What supplies and equipment do I need?", answer: "You need IV supplies (catheters, tubing, fluids, additives), a portable supply kit, emergency supplies (including epinephrine for allergic reactions), vital sign monitoring equipment, and proper disposal containers. You also need a reliable supply chain for medical-grade products." },
  { question: "Is IV therapy at home safe?", answer: "IV therapy administered by a licensed, trained nurse following proper protocols is generally safe. However, all IV therapy carries risks including infection, infiltration, air embolism, and allergic reactions. Concierge nurses must be prepared to manage adverse reactions and maintain emergency protocols." },
  { question: "How profitable is mobile IV therapy?", answer: "Mobile IV therapy can be a profitable niche because of the high per-session revenue and relatively short service time. However, profitability depends on your supply costs, overhead, local market demand, pricing, and volume. It works best as part of a diversified service offering rather than a sole revenue stream." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "What Does a Concierge Nurse Do for IV Therapy at Home?", "description": "Learn how concierge nurses provide in-home IV therapy services including hydration, vitamin infusions, and recovery support. Covers regulations, safety, and building this service.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'what-is-mobile-iv-therapy', text: 'What Is Mobile IV Therapy?' },
  { id: 'services-offered', text: 'Common IV Therapy Services' },
  { id: 'regulatory-requirements', text: 'Regulatory Requirements' },
  { id: 'safety-protocols', text: 'Safety Protocols' },
  { id: 'the-client-experience', text: 'The Client Experience' },
  { id: 'for-nurses', text: 'Building an IV Therapy Practice' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Create an IV Therapy Service Menu', description: 'Design a professional IV therapy menu for your concierge nursing practice.', link: '/resources/templates/iv-therapy-service-menu', category: 'Templates' },
  { title: 'How to Partner with Concierge Medicine Practices', description: 'Connect with concierge physicians who may refer patients for IV therapy.', link: '/resources/referrals/partner-with-concierge-medicine-practices', category: 'Referral Sources' },
  { title: 'What Does a Concierge Nurse Do for Executive Health?', description: 'Learn about executive health services that complement IV therapy offerings.', link: '/resources/services/concierge-nurse-executive-health', category: 'Client Services' },
];

export default function IVTherapyHome() {
  return (
    <ResourceLayout title="What Does a Concierge Nurse Do for IV Therapy at Home?" description="Learn how concierge nurses provide in-home IV therapy services including hydration, vitamin infusions, and recovery support. Covers regulations, safety, and building this service." canonical="https://www.conciergenursesociety.com/resources/services/concierge-nurse-iv-therapy" schema={articleSchema} category="Client Services" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Launch Your IV Therapy Practice', description: 'Get the tools and guidance to add IV therapy to your concierge nursing services.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A concierge nurse providing IV therapy at home administers intravenous fluids, vitamins, and approved solutions directly to clients in their chosen location. This service requires specific training, physician standing orders, and compliance with your state's nurse practice act. It is one of the most visible and in-demand concierge nursing services.</p>
      </QuickAnswer>

      <h2 id="what-is-mobile-iv-therapy">What Is Mobile IV Therapy?</h2>
      <p>Mobile IV therapy brings intravenous hydration and nutrient infusions to the client's chosen location. A licensed nurse arrives prepared, performs a health assessment, administers the infusion, monitors the patient, and ensures stability before leaving. Demand has grown significantly as consumers seek convenient, personalized health services.</p>

      <h2 id="services-offered">Common IV Therapy Services</h2>
      <p>Common services include hydration therapy, vitamin and nutrient infusions, immune support blends, athletic recovery, and anti-nausea support. The specific formulations depend on your physician standing orders and state regulations. See our <Link to="/resources/templates/iv-therapy-service-menu">IV therapy menu template</Link> for guidance.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Launch Your IV Therapy Practice</p>
        <p className="mb-4">The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> covers IV therapy setup, and the <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> include service menu templates and protocol frameworks.</p>
      </div>

      <h2 id="regulatory-requirements">Regulatory Requirements</h2>
      <p>IV therapy is one of the most heavily regulated areas of concierge nursing. Before offering this service, verify your scope of practice, obtain physician standing orders, address business licensing requirements, ensure your liability insurance covers IV services, and establish a reliable medical-grade supply chain.</p>

      <h2 id="safety-protocols">Safety Protocols</h2>
      <p>Patient safety is paramount. Your protocols should include thorough pre-infusion health screening, informed consent, proper aseptic technique, vital sign monitoring, emergency preparedness, and proper waste disposal. Clinical judgment and patient safety always take priority.</p>

      <h2 id="the-client-experience">The Client Experience</h2>
      <p>The experience should feel premium, professional, and comfortable. A typical visit includes health screening, vital sign assessment, IV catheter insertion, infusion monitoring, post-infusion assessment, and documentation.</p>

      <h2 id="for-nurses">Building an IV Therapy Practice</h2>
      <p>IV therapy pairs well with <Link to="/resources/services/concierge-nurse-executive-health">executive health</Link> and <Link to="/resources/services/concierge-nurse-travel-health">travel health</Link> services. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
