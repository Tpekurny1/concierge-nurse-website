import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What do executives want from a concierge nurse?", answer: "Executives value convenience, efficiency, and discretion. They want health services delivered to their home or office on their schedule, with minimal disruption to their work. They expect premium service quality and clear, concise communication." },
  { question: "What services are most popular with executive clients?", answer: "Common services include wellness assessments, biometric screenings, IV hydration therapy, medication management, pre-travel health preparation, health risk evaluations, and coordination of specialist appointments. Executives also value having a nurse available for on-call health consultations." },
  { question: "How do I find executive health clients?", answer: "Build relationships with concierge medicine practices, corporate wellness programs, executive assistants at major companies, wealth management firms, and high-end real estate agents who work with affluent clients. Networking in professional and business communities is essential." },
  { question: "Should I price executive health services differently?", answer: "Yes. Executive health services should be priced at a premium that reflects the convenience, discretion, and personalization you provide. Consider retainer models that give executives priority access to your services. Your pricing should reflect the value of your time and expertise." },
  { question: "Do I need special training for executive health?", answer: "Clinical nursing skills are your foundation. Additionally, familiarity with executive health assessments, preventive screening protocols, travel medicine, and wellness optimization is valuable. Business acumen and professional communication skills are equally important for serving this clientele." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "What Does a Concierge Nurse Do for Executive Health?", "description": "Learn how concierge nurses serve busy executives with wellness assessments, health optimization, IV therapy, travel health preparation, and on-demand medical support.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'executive-health-overview', text: 'The Executive Health Market' },
  { id: 'core-services', text: 'Core Executive Health Services' },
  { id: 'the-executive-experience', text: 'The Executive Client Experience' },
  { id: 'finding-executive-clients', text: 'Finding Executive Clients' },
  { id: 'pricing-and-packaging', text: 'Pricing and Packaging' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Partner with Concierge Medicine Practices', description: 'Build referral relationships with physicians who serve executive clientele.', link: '/resources/referrals/partner-with-concierge-medicine-practices', category: 'Referral Sources' },
  { title: 'How to Create a Wellness Visit Package', description: 'Design wellness packages that appeal to executive health clients.', link: '/resources/templates/wellness-visit-package', category: 'Templates' },
  { title: 'What Does a Concierge Nurse Do for IV Therapy?', description: 'IV therapy is a popular service for executive health clients.', link: '/resources/services/concierge-nurse-iv-therapy', category: 'Client Services' },
];

export default function ExecutiveHealth() {
  return (
    <ResourceLayout title="What Does a Concierge Nurse Do for Executive Health?" description="Learn how concierge nurses serve busy executives with wellness assessments, health optimization, IV therapy, travel health preparation, and on-demand medical support." canonical="https://www.conciergenursesociety.com/resources/services/concierge-nurse-executive-health" schema={articleSchema} category="Client Services" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Serve Premium Clients', description: 'Get the tools to build a concierge nursing practice serving executives and professionals.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A concierge nurse for executive health provides on-demand, location-flexible nursing services tailored to busy professionals. Services typically include wellness assessments, biometric screenings, IV therapy, medication management, travel health preparation, and on-call consultations. Executive health clients value convenience, discretion, and premium care.</p>
      </QuickAnswer>

      <h2 id="executive-health-overview">The Executive Health Market</h2>
      <p>Executives often neglect their health due to demanding schedules. They have the financial means and motivation to invest in personalized health services but need them delivered on their terms -- at their home, office, or hotel, on their schedule. This niche commands premium pricing and tends to attract long-term retainer clients.</p>

      <h2 id="core-services">Core Executive Health Services</h2>
      <p>Services include comprehensive wellness assessments, biometric screenings, <Link to="/resources/services/concierge-nurse-iv-therapy">IV therapy</Link>, medication management, <Link to="/resources/services/concierge-nurse-travel-health">travel health preparation</Link>, and on-call health consultations. Each service should be designed for convenience and efficiency.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Serve Premium Clients</p>
        <p className="mb-4">The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> includes premium service design frameworks. A <Link to="/strategy" className="text-gold font-semibold hover:underline">strategy session</Link> can help you position for the executive market.</p>
      </div>

      <h2 id="the-executive-experience">The Executive Client Experience</h2>
      <p>The service experience is as important as clinical quality for executive clients. Every interaction should be professional, efficient, and premium -- respecting their time, maintaining absolute discretion, and matching the service standards they expect in other areas of their lives.</p>

      <h2 id="finding-executive-clients">Finding Executive Clients</h2>
      <p>Build relationships with <Link to="/resources/referrals/partner-with-concierge-medicine-practices">concierge medicine practices</Link>, corporate wellness programs, professional networks, and professional service providers (financial advisors, executive assistants) who work with affluent clients.</p>

      <h2 id="pricing-and-packaging">Pricing and Packaging</h2>
      <p>Executive health services should be packaged as premium offerings. Monthly or quarterly retainer packages create predictable revenue and align with how executives prefer to purchase services. Build packages using our <Link to="/resources/templates/wellness-visit-package">wellness visit package template</Link>. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
