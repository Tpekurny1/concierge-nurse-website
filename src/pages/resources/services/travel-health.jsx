import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What travel health services can a concierge nurse provide?", answer: "Pre-travel health assessments, vaccination coordination, travel health kit preparation, altitude sickness prevention guidance, jet lag management strategies, post-travel wellness checks, and on-trip health support for clients traveling with medical conditions or special health needs." },
  { question: "Can concierge nurses administer travel vaccinations?", answer: "RNs can administer vaccinations per physician orders. Some concierge nurses work with a collaborating physician to offer travel vaccinations, while others coordinate with travel medicine clinics and provide the pre- and post-vaccination support. Check your state's nurse practice act for specific requirements." },
  { question: "Do clients hire concierge nurses to travel with them?", answer: "Yes. Some clients, particularly elderly travelers, those with chronic conditions, or families with special needs children, hire concierge nurses to accompany them on trips. This is a premium service that includes daily health monitoring, medication management, and medical support throughout the trip." },
  { question: "What about medical tourism clients?", answer: "Patients traveling for surgery or medical procedures may need a concierge nurse for pre-procedure preparation, post-operative care at their recovery location, medication management, and communication with their medical team. This is a growing area of concierge nursing." },
  { question: "Is travel health nursing profitable?", answer: "Travel health services can be highly profitable, especially travel companionship which commands premium daily rates. Pre- and post-travel assessments generate additional revenue alongside other concierge nursing services. The key is building a reputation with the right client demographic." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "What Does a Concierge Nurse Do for Travel Health?", "description": "Learn how concierge nurses support clients with pre-travel health preparation, travel companionship, medical tourism support, and post-travel wellness assessments.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'travel-health-overview', text: 'The Travel Health Opportunity' },
  { id: 'pre-travel-services', text: 'Pre-Travel Services' },
  { id: 'travel-companionship', text: 'Travel Companionship' },
  { id: 'medical-tourism-support', text: 'Medical Tourism Support' },
  { id: 'post-travel-wellness', text: 'Post-Travel Wellness' },
  { id: 'for-nurses', text: 'Building a Travel Health Practice' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'What Does a Concierge Nurse Do for Executive Health?', description: 'Executive clients often need travel health services alongside wellness support.', link: '/resources/services/concierge-nurse-executive-health', category: 'Client Services' },
  { title: 'How to Partner with Concierge Medicine Practices', description: 'Concierge physicians refer patients who need travel health support.', link: '/resources/referrals/partner-with-concierge-medicine-practices', category: 'Referral Sources' },
  { title: 'What Does a Concierge Nurse Do for IV Therapy?', description: 'IV hydration therapy complements travel health services for jet lag and recovery.', link: '/resources/services/concierge-nurse-iv-therapy', category: 'Client Services' },
];

export default function TravelHealth() {
  return (
    <ResourceLayout title="What Does a Concierge Nurse Do for Travel Health?" description="Learn how concierge nurses support clients with pre-travel health preparation, travel companionship, medical tourism support, and post-travel wellness assessments." canonical="https://www.conciergenursesociety.com/resources/services/concierge-nurse-travel-health" schema={articleSchema} category="Client Services" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Add Travel Health to Your Practice', description: 'Get the tools to offer travel health services through your concierge nursing business.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A concierge nurse for travel health provides pre-travel health assessments, vaccination coordination, travel health kit preparation, travel companionship for clients with medical needs, medical tourism recovery support, and post-travel wellness evaluations. This niche serves travelers who want professional health preparation and support.</p>
      </QuickAnswer>

      <h2 id="travel-health-overview">The Travel Health Opportunity</h2>
      <p>Travel health serves clients at the intersection of healthcare and lifestyle. Travelers face health risks including infectious diseases, medication management across time zones, and limited access to care in unfamiliar locations. The market includes business travelers, retirees, families with medically complex children, medical tourism patients, and event attendees.</p>

      <h2 id="pre-travel-services">Pre-Travel Services</h2>
      <p>Pre-travel services include health risk assessment, vaccination coordination, medication preparation for time zone changes, travel health kit assembly, and emergency planning for the destination. These services ensure clients are prepared for health challenges before they arise.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Add Travel Health to Your Practice</p>
        <p className="mb-4">The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> covers niche service development. A <Link to="/strategy" className="text-gold font-semibold hover:underline">strategy session</Link> can help you position travel health services.</p>
      </div>

      <h2 id="travel-companionship">Travel Companionship</h2>
      <p>Travel companionship is a premium service for clients who need a nurse to travel with them -- elderly travelers, clients with complex conditions, or families with medically fragile children. This high-value service includes daily health assessments, medication management, and emergency preparedness at each destination.</p>

      <h2 id="medical-tourism-support">Medical Tourism Support</h2>
      <p>Patients who travel for medical procedures need pre-operative preparation, post-operative monitoring at their recovery location, medication management, and coordination of return travel and care transitions back to local physicians.</p>

      <h2 id="post-travel-wellness">Post-Travel Wellness</h2>
      <p>Post-travel services include vital sign assessment, illness symptom screening, <Link to="/resources/services/concierge-nurse-iv-therapy">IV hydration therapy</Link> for recovery, and medication reconciliation to return to the normal schedule.</p>

      <h2 id="for-nurses">Building a Travel Health Practice</h2>
      <p>Travel health works best alongside <Link to="/resources/services/concierge-nurse-executive-health">executive health</Link> and <Link to="/resources/services/concierge-nurse-iv-therapy">IV therapy</Link>. Build referral relationships with <Link to="/resources/referrals/partner-with-concierge-medicine-practices">concierge medicine practices</Link> and travel agencies. Visit our <Link to="/start-here">Start Here</Link> page.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
