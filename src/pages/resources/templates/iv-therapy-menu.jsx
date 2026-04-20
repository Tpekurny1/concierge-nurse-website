import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What should an IV therapy menu include?", answer: "Each menu item should include the infusion name, what it contains (fluids, vitamins, minerals), what it is designed for, approximate infusion time, pricing, and any contraindications or screening requirements. Also include your pre-infusion assessment process and emergency protocols." },
  { question: "How many IV therapy options should I offer?", answer: "Start with 3 to 5 core formulations. Too many options create decision fatigue. A basic hydration option, a wellness/vitamin option, an immune support option, and an energy/recovery option cover the most common client needs. You can add specialty options as your practice grows." },
  { question: "Do I need different physician orders for each IV formulation?", answer: "Yes. Each distinct IV formulation requires its own physician order or must be covered under a standing order protocol. Work with your collaborating physician to develop standing orders for each menu item before offering it to clients." },
  { question: "How should I price IV therapy services?", answer: "Pricing should cover your supply costs, time (including travel and setup), physician oversight fees if applicable, insurance costs, and profit margin. Research local market rates for mobile IV therapy in your area. Premium positioning generally works better than competing on price." },
  { question: "Can I offer add-ons to base IV formulations?", answer: "Yes, add-ons are a common and effective strategy. Offer a base infusion with optional additions like extra vitamin C, B12, glutathione, or anti-nausea medication. Add-ons increase per-session revenue while giving clients customization options. Each add-on needs physician authorization." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Create an IV Therapy Service Menu", "description": "Design a professional IV therapy service menu for your concierge nursing practice with this guide covering formulations, pricing, presentation, and regulatory compliance.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'why-a-service-menu', text: 'Why You Need a Service Menu' },
  { id: 'core-formulations', text: 'Core Formulations to Offer' },
  { id: 'add-on-options', text: 'Add-On Options' },
  { id: 'pricing-strategy', text: 'Pricing Strategy' },
  { id: 'menu-presentation', text: 'Menu Presentation' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'What Does a Concierge Nurse Do for IV Therapy?', description: 'Understand the full scope of IV therapy services for your menu design.', link: '/resources/services/concierge-nurse-iv-therapy', category: 'Client Services' },
  { title: 'How to Write a Service Agreement', description: 'Formalize IV therapy services with a professional agreement.', link: '/resources/templates/concierge-nursing-service-agreement', category: 'Templates' },
  { title: 'What Does a Concierge Nurse Do for Executive Health?', description: 'IV therapy is a popular service for executive health clients.', link: '/resources/services/concierge-nurse-executive-health', category: 'Client Services' },
];

export default function IVTherapyMenu() {
  return (
    <ResourceLayout title="How to Create an IV Therapy Service Menu" description="Design a professional IV therapy service menu for your concierge nursing practice with this guide covering formulations, pricing, presentation, and regulatory compliance." canonical="https://www.conciergenursesociety.com/resources/templates/iv-therapy-service-menu" schema={articleSchema} category="Templates" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Launch Your IV Therapy Services', description: 'Get the tools to build a professional IV therapy offering within your concierge nursing practice.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>An IV therapy service menu presents your infusion offerings in a clear, professional format. A strong menu includes 3 to 5 core formulations, optional add-ons, transparent pricing, and infusion time estimates. Every formulation must be backed by physician standing orders and comply with state regulations.</p>
      </QuickAnswer>

      <h2 id="why-a-service-menu">Why You Need a Service Menu</h2>
      <p>A professional menu helps clients understand options, positions your practice as organized and credible, streamlines booking, and serves as a marketing tool for referral partners and online channels.</p>

      <h2 id="core-formulations">Core Formulations to Offer</h2>
      <p>Start with 3 to 5 core formulations addressing common needs: hydration, wellness/vitamins, immune support, and recovery. Each must be developed with and approved by your collaborating physician. See our <Link to="/resources/services/concierge-nurse-iv-therapy">IV therapy guide</Link> for an overview of services.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get the Template</p>
        <p className="mb-4">The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include IV therapy menu templates. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> covers regulatory setup and physician collaboration.</p>
      </div>

      <h2 id="add-on-options">Add-On Options</h2>
      <p>Add-ons allow clients to customize infusions and increase your per-session revenue. Each add-on requires physician authorization and should be clearly presented on your menu.</p>

      <h2 id="pricing-strategy">Pricing Strategy</h2>
      <p>Price to cover all costs and provide a reasonable margin. Position on quality and convenience rather than competing on price. Package discounts for multiple sessions encourage repeat business.</p>

      <h2 id="menu-presentation">Menu Presentation</h2>
      <p>Create both digital and printed versions with professional branding, clear descriptions, pricing, and booking instructions. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
