import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What is a wellness visit package?", answer: "A wellness visit package is a structured set of regular nursing visits focused on preventive health, ongoing monitoring, and health optimization rather than treatment of acute illness or post-surgical recovery. It typically includes health assessments, vital signs, biometric screenings, and health education." },
  { question: "Who buys wellness visit packages?", answer: "Common clients include elderly adults and their families, executives seeking proactive health management, individuals with chronic conditions wanting regular monitoring, and health-conscious individuals who want personalized preventive care beyond what their annual physician visit provides." },
  { question: "How often should wellness visits occur?", answer: "Frequency depends on the client's health status and goals. Weekly visits are common for elderly clients or those with chronic conditions. Monthly visits suit health-conscious individuals wanting regular monitoring. Quarterly visits work for stable, healthy clients who want preventive check-ins." },
  { question: "What makes a wellness package different from chronic care management?", answer: "Wellness packages focus on maintaining and optimizing health, while chronic care management focuses on managing specific diseases. In practice, there is overlap — many clients benefit from both. You can offer wellness packages as a standalone service or integrate wellness monitoring into chronic care plans." },
  { question: "Should wellness packages include lab work?", answer: "You may include point-of-care testing (glucose, cholesterol, A1C) if within your scope and you have the proper equipment. For comprehensive lab work, coordinate with the client's physician to order labs and review results together during wellness visits." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Create a Wellness Visit Package", "description": "Build a wellness visit package for your concierge nursing practice with this step-by-step guide covering assessment components, pricing models, and client targeting.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'why-wellness-packages', text: 'Why Offer Wellness Visit Packages' },
  { id: 'assessment-components', text: 'Assessment Components' },
  { id: 'structuring-the-package', text: 'Structuring the Package' },
  { id: 'pricing-models', text: 'Pricing Models' },
  { id: 'documentation', text: 'Documentation and Reporting' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'What Does a Concierge Nurse Do for Executive Health?', description: 'Wellness packages are a core offering for executive health clients.', link: '/resources/services/concierge-nurse-executive-health', category: 'Client Services' },
  { title: 'What Does a Concierge Nurse Do for Elderly Parents?', description: 'Regular wellness visits are foundational for geriatric concierge nursing.', link: '/resources/services/concierge-nurse-elderly-parents', category: 'Client Services' },
  { title: 'How to Partner with Concierge Medicine Practices', description: 'Concierge physicians refer patients for wellness monitoring services.', link: '/resources/referrals/partner-with-concierge-medicine-practices', category: 'Referral Sources' },
];

export default function WellnessVisitPackage() {
  return (
    <ResourceLayout title="How to Create a Wellness Visit Package" description="Build a wellness visit package for your concierge nursing practice with this step-by-step guide covering assessment components, pricing models, and client targeting." canonical="https://www.conciergenursesociety.com/resources/templates/wellness-visit-package" schema={articleSchema} category="Templates" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Build Your Wellness Practice', description: 'Get the frameworks to create professional wellness services for your concierge nursing business.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A wellness visit package structures your preventive health and monitoring services into a recurring offering. It includes defined assessment components, a visit schedule, documentation protocols, and clear pricing. Wellness packages create stable recurring revenue and position you as a proactive health partner.</p>
      </QuickAnswer>

      <h2 id="why-wellness-packages">Why Offer Wellness Visit Packages</h2>
      <p>Wellness packages are the foundation of a sustainable practice because they create recurring revenue through long-term client relationships. Unlike episode-based services, wellness packages run indefinitely. They attract proactive clients who value ongoing health monitoring.</p>

      <h2 id="assessment-components">Assessment Components</h2>
      <p>Each wellness visit should follow a consistent assessment protocol covering vital signs, health history updates, medication review, nutritional assessment, functional assessment, and preventive screening.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get the Template</p>
        <p className="mb-4">The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include wellness visit package templates. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> covers how to design, price, and sell recurring wellness packages.</p>
      </div>

      <h2 id="structuring-the-package">Structuring the Package</h2>
      <p>Offer tiers based on visit frequency -- monthly, biweekly, or weekly -- with each tier including a defined number of visits, expected duration, assessment protocol, and reporting.</p>

      <h2 id="pricing-models">Pricing Models</h2>
      <p>Monthly subscription pricing works best for wellness packages. Consider offering a discount for quarterly or annual prepayment to improve cash flow and reduce client churn.</p>

      <h2 id="documentation">Documentation and Reporting</h2>
      <p>Wellness visit documentation should track trends over time with standardized visit notes, vital sign trending, and regular summary reports to clients, families, and physicians. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
