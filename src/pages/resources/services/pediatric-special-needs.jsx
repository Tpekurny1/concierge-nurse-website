import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What pediatric special needs do concierge nurses support?", answer: "Concierge nurses support children with a wide range of conditions including autism spectrum disorder, cerebral palsy, seizure disorders, feeding disorders, developmental delays, genetic conditions, complex medical conditions requiring technology (ventilators, feeding tubes), and children with multiple co-occurring diagnoses." },
  { question: "How is this different from pediatric home health?", answer: "Pediatric home health provides insurance-covered skilled nursing visits with specific visit limits and goals. Concierge nursing offers flexible, family-centered support that may include care coordination, school health planning, family education, respite for caregivers, and advocacy that extends beyond the clinical scope of home health visits." },
  { question: "Do I need pediatric specialty certification?", answer: "Pediatric experience is essential, and specialty certifications strengthen your credibility. Relevant certifications include pediatric nursing (CPN), developmental disabilities nursing, and condition-specific training. Families of children with special needs seek nurses who truly understand their child's condition." },
  { question: "How do concierge nurses help with school health needs?", answer: "Concierge nurses help develop individualized healthcare plans (IHPs) for school, train school staff on the child's medical needs, attend IEP/504 meetings as a health advocate, and ensure the school environment is safe and properly equipped for the child's condition." },
  { question: "What is the typical client relationship length?", answer: "Families of children with special needs often maintain long-term relationships with their concierge nurse — sometimes years. The ongoing nature of their child's needs creates a sustained demand for nursing support, making this one of the most relationship-driven concierge nursing niches." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "What Does a Concierge Nurse Do for Pediatric Special Needs?", "description": "Learn how concierge nurses support families of children with special health needs through care coordination, family education, school health planning, and ongoing clinical support.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'special-needs-overview', text: 'Supporting Families of Children with Special Needs' },
  { id: 'core-services', text: 'Core Services' },
  { id: 'care-coordination', text: 'Care Coordination and Advocacy' },
  { id: 'school-health', text: 'School Health Support' },
  { id: 'family-support', text: 'Family Education and Support' },
  { id: 'for-nurses', text: 'Building This Practice' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Partner with Pediatricians', description: 'Build referral relationships with pediatric practices for special needs referrals.', link: '/resources/referrals/partner-with-pediatricians', category: 'Referral Sources' },
  { title: 'What Does a Concierge Nurse Do for Chronic Illness?', description: 'Chronic condition management skills apply to many pediatric special needs.', link: '/resources/services/concierge-nurse-chronic-illness', category: 'Client Services' },
  { title: 'How to Write a Service Agreement', description: 'Create clear agreements for ongoing pediatric concierge nursing services.', link: '/resources/templates/concierge-nursing-service-agreement', category: 'Templates' },
];

export default function PediatricSpecialNeeds() {
  return (
    <ResourceLayout title="What Does a Concierge Nurse Do for Pediatric Special Needs?" description="Learn how concierge nurses support families of children with special health needs through care coordination, family education, school health planning, and ongoing clinical support." canonical="https://www.conciergenursesociety.com/resources/services/concierge-nurse-pediatric-special-needs" schema={articleSchema} category="Client Services" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Serve Special Needs Families', description: 'Get the tools to build a concierge nursing practice supporting children with special health needs.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A concierge nurse for pediatric special needs provides ongoing care coordination, family education, school health planning, clinical monitoring, and health advocacy for children with complex medical conditions or developmental disabilities. For families navigating a fragmented system, a concierge nurse serves as a dedicated health partner.</p>
      </QuickAnswer>

      <h2 id="special-needs-overview">Supporting Families of Children with Special Needs</h2>
      <p>Families of children with special health needs manage multiple specialists, therapies, medications, and school accommodations while caring for their child's daily needs. A concierge nurse who specializes in this area becomes the family's most trusted health resource, providing clinical expertise, organizational skills, and advocacy that reduces stress and improves outcomes.</p>

      <h2 id="core-services">Core Services</h2>
      <p>Services include health monitoring tailored to the child's conditions, medication management, medical technology assistance, emergency planning, and transition planning as the child ages. These services support the family's ability to manage complex, evolving health needs.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Serve Special Needs Families</p>
        <p className="mb-4">The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> provides service design frameworks for specialized niches. A <Link to="/strategy" className="text-gold font-semibold hover:underline">strategy session</Link> can help you build this practice.</p>
      </div>

      <h2 id="care-coordination">Care Coordination and Advocacy</h2>
      <p>Children with special needs often see numerous specialists. The concierge nurse coordinates all aspects of care, maintains a master health record, communicates across providers, and advocates for the child's needs within the healthcare system.</p>

      <h2 id="school-health">School Health Support</h2>
      <p>School health planning is a distinctive service -- developing individualized healthcare plans, training school staff, attending IEP/504 meetings as a health advocate, and ensuring the school environment is safe for the child's conditions.</p>

      <h2 id="family-support">Family Education and Support</h2>
      <p>Families need ongoing education as their child's condition evolves. The concierge nurse provides condition management training, emotional support, resource connections, and caregiver burnout prevention.</p>

      <h2 id="for-nurses">Building This Practice</h2>
      <p>This niche requires deep clinical knowledge and genuine passion. Build referral relationships with <Link to="/resources/referrals/partner-with-pediatricians">pediatricians</Link>, pediatric specialists, and special needs parent groups. Visit our <Link to="/start-here">Start Here</Link> page to begin.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
