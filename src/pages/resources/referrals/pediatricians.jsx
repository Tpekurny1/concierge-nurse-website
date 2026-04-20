import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "What services do pediatricians most often need help with?",
    answer: "Newborn transitional care, breastfeeding support, well-child visit preparation, chronic condition management for children, medication education for parents, and support for families of children with special needs. The specific needs vary by practice and patient population."
  },
  {
    question: "Do I need pediatric nursing experience?",
    answer: "Pediatric experience is strongly recommended. Working with children requires specialized assessment skills, age-appropriate communication, and comfort with pediatric vital sign norms and developmental milestones. If you lack pediatric experience, consider obtaining pediatric nursing certification before approaching pediatricians."
  },
  {
    question: "How do referrals from pediatricians typically work?",
    answer: "The pediatrician identifies families who would benefit from in-home nursing support and recommends your services. The family contacts you directly and pays out of pocket. Some pediatricians provide your information at newborn visits, while others refer for specific concerns like feeding difficulties or chronic conditions."
  },
  {
    question: "Can I combine OBGYN and pediatrician referral partnerships?",
    answer: "Yes, and this is a smart strategy. OBGYN referrals bring you into the family at the prenatal or postpartum stage, while pediatrician referrals support the newborn and child. Together, they create a comprehensive maternal-child health referral network."
  },
  {
    question: "What about liability concerns with pediatric patients?",
    answer: "Working with pediatric patients requires appropriate malpractice coverage that includes pediatric care. Ensure your liability insurance covers pediatric nursing services. Document thoroughly, obtain informed consent from parents or guardians, and always work within your scope of practice."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Partner with Pediatricians as a Concierge Nurse",
  "description": "Build referral relationships with pediatricians by offering newborn care, family education, and pediatric health support through your concierge nursing practice.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-pediatricians', text: 'Why Pediatricians Are Valuable Partners' },
  { id: 'what-pediatricians-need', text: 'What Pediatricians Need from You' },
  { id: 'how-to-approach', text: 'How to Approach Pediatric Practices' },
  { id: 'services-to-offer', text: 'Services for Pediatric Families' },
  { id: 'building-trust-with-families', text: 'Building Trust with Families' },
  { id: 'sustaining-the-partnership', text: 'Sustaining the Partnership' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Does a Concierge Nurse Do for Postpartum Mothers?',
    description: 'Learn about concierge nursing services for new mothers that complement pediatric partnerships.',
    link: '/resources/services/concierge-nurse-postpartum-care',
    category: 'Client Services',
  },
  {
    title: 'What Does a Concierge Nurse Do for Pediatric Special Needs?',
    description: 'Explore specialized concierge nursing services for children with special health needs.',
    link: '/resources/services/concierge-nurse-pediatric-special-needs',
    category: 'Client Services',
  },
  {
    title: 'How to Partner with OBGYNs',
    description: 'Build a complete maternal-child health referral network with OBGYN partnerships.',
    link: '/resources/referrals/partner-with-obgyns',
    category: 'Referral Sources',
  },
];

export default function Pediatricians() {
  return (
    <ResourceLayout
      title="How to Partner with Pediatricians as a Concierge Nurse"
      description="Build referral relationships with pediatricians by offering newborn care, family education, and pediatric health support through your concierge nursing practice."
      canonical="https://www.conciergenursesociety.com/resources/referrals/partner-with-pediatricians"
      schema={articleSchema}
      category="Referral Sources"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Build Your Pediatric Nursing Practice',
        description: 'Join the community and get the tools to launch a concierge nursing business serving families.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Pediatricians are excellent referral partners for concierge nurses who specialize in newborn care, family health education, and pediatric chronic condition management. By offering home-based assessments, breastfeeding support, and family education, you become a valuable extension of the pediatric care team.
        </p>
      </QuickAnswer>

      <h2 id="why-pediatricians">Why Pediatricians Are Valuable Partners</h2>

      <p>
        Pediatric practices see high volumes of patients, especially during the newborn period. A 15-minute well-child visit cannot cover everything a first-time parent needs to know. New parents call frequently with questions that a concierge nurse visiting the home can address much more effectively. Beyond newborns, pediatricians also manage children with chronic conditions who need ongoing between-visit support.
      </p>

      <h2 id="what-pediatricians-need">What Pediatricians Need from You</h2>

      <p>
        Pediatricians need partners who reduce after-hours call volume, provide extended patient education, assess the home environment, offer breastfeeding support, and help manage chronic conditions. Understanding these needs is key to positioning your services effectively.
      </p>

      <h2 id="how-to-approach">How to Approach Pediatric Practices</h2>

      <p>
        Identify practices that align with your services, connect through the clinical staff first, and provide parent-friendly professional materials. Building relationships within the practice takes time but creates warm referral pathways.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Pediatric Nursing Practice</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> includes outreach frameworks and service package templates for maternal-child health practices.
        </p>
      </div>

      <h2 id="services-to-offer">Services for Pediatric Families</h2>

      <p>
        Key offerings include newborn home visit packages, breastfeeding support, pediatric chronic condition management, and sick child assessment visits. These services pair naturally with <Link to="/resources/referrals/partner-with-obgyns">OBGYN partnerships</Link> to create a comprehensive maternal-child health practice.
      </p>

      <h2 id="building-trust-with-families">Building Trust with Families</h2>

      <p>
        Working with pediatric families requires patience, non-judgmental communication, and clear expectations. Parents are entrusting you with their children's care, making this the most emotionally significant client relationship in concierge nursing.
      </p>

      <h2 id="sustaining-the-partnership">Sustaining the Partnership</h2>

      <p>
        Pediatric referral relationships grow through consistent quality, professional communication with visit summaries, and maintaining availability. As your reputation grows within the practice, referrals increase naturally.
      </p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index}>
              <h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </ResourceLayout>
  );
}
