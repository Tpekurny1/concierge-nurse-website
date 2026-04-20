import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "What services can a concierge nurse offer OBGYN patients?",
    answer: "Concierge nurses can provide postpartum home visits, breastfeeding support, newborn care education, post-cesarean wound care, prenatal wellness check-ins, and help coordinating follow-up care. The specific services depend on your scope of practice and certifications."
  },
  {
    question: "Do OBGYNs typically refer patients to concierge nurses?",
    answer: "Many OBGYNs are open to it but may not be familiar with the concierge nursing model. Education about your services and how they complement the OBGYN's care plan is often the first step. OBGYNs who see high-risk patients or those without strong family support systems are often the most receptive."
  },
  {
    question: "Should I have lactation certification to work with OBGYN referrals?",
    answer: "While not required, lactation certification (CLC or IBCLC) significantly strengthens your value to OBGYN practices and their patients. Many postpartum clients need breastfeeding support, and having this credential makes you a more comprehensive referral option."
  },
  {
    question: "How do I handle the transition from prenatal to postpartum care?",
    answer: "Work with the OBGYN's office to identify patients during their third trimester who may benefit from postpartum concierge nursing. This allows you to introduce yourself before delivery, establish rapport, and have a care plan ready for when the baby arrives."
  },
  {
    question: "Can I attend deliveries as a concierge nurse?",
    answer: "This depends on the hospital's policies, your scope of practice, and the arrangement with the OBGYN. Some concierge nurses provide labor support similar to a doula role, while others begin their services after hospital discharge. Clarify expectations with both the physician and the client."
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
  "headline": "How to Partner with OBGYNs as a Concierge Nurse",
  "description": "Build referral relationships with OBGYNs by offering postpartum support, newborn care, and maternal wellness services through your concierge nursing practice.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-obgyns', text: 'Why OBGYNs Are Valuable Referral Partners' },
  { id: 'understanding-obgyn-pain-points', text: 'Understanding OBGYN Practice Pain Points' },
  { id: 'positioning-your-services', text: 'Positioning Your Services for OBGYN Practices' },
  { id: 'outreach-strategy', text: 'Your Outreach Strategy' },
  { id: 'services-for-obgyn-patients', text: 'Services That Complement OBGYN Care' },
  { id: 'building-trust', text: 'Building Trust with the Practice' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Does a Concierge Nurse Do for Postpartum Mothers?',
    description: 'Detailed look at concierge nursing services for new mothers during the postpartum period.',
    link: '/resources/services/concierge-nurse-postpartum-care',
    category: 'Client Services',
  },
  {
    title: 'How to Create a Postpartum Care Package',
    description: 'Build a structured postpartum care package for your concierge nursing practice.',
    link: '/resources/templates/postpartum-care-package',
    category: 'Templates',
  },
  {
    title: 'How to Partner with Pediatricians as a Concierge Nurse',
    description: 'Expand your maternal-child health referral network by connecting with pediatric practices.',
    link: '/resources/referrals/partner-with-pediatricians',
    category: 'Referral Sources',
  },
];

export default function OBGYNs() {
  return (
    <ResourceLayout
      title="How to Partner with OBGYNs as a Concierge Nurse"
      description="Build referral relationships with OBGYNs by offering postpartum support, newborn care, and maternal wellness services through your concierge nursing practice."
      canonical="https://www.conciergenursesociety.com/resources/referrals/partner-with-obgyns"
      schema={articleSchema}
      category="Referral Sources"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Build Your Maternal Health Practice',
        description: 'Get the frameworks and community support to launch your concierge nursing business serving new mothers.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          OBGYNs are excellent referral partners for concierge nurses who specialize in postpartum care, newborn support, and maternal wellness. These physicians often lack the capacity to provide hands-on postpartum support after hospital discharge, creating a natural opportunity for concierge nurses.
        </p>
      </QuickAnswer>

      <h2 id="why-obgyns">Why OBGYNs Are Valuable Referral Partners</h2>

      <p>
        The postpartum period is one of the most underserved phases of healthcare. New mothers are discharged quickly, with their next OBGYN visit often six weeks later. OBGYNs know this gap exists and many are frustrated by it. Birth rates provide a steady volume of potential clients year-round, making OBGYN partnerships a consistent referral source.
      </p>

      <h2 id="understanding-obgyn-pain-points">Understanding OBGYN Practice Pain Points</h2>

      <p>
        OBGYNs face postpartum follow-up gaps, high volumes of after-hours calls from anxious new parents, limited breastfeeding support capacity, and difficulty monitoring for postpartum mood disorders and C-section complications between office visits. These are the problems your services solve.
      </p>

      <h2 id="positioning-your-services">Positioning Your Services for OBGYN Practices</h2>

      <p>
        Frame your services as extending the OBGYN's reach into the home environment. Lead with the clinical need, make your communication process clear, and address scope of practice directly so the practice understands exactly what you offer and how you complement their care.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Maternal Health Practice</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> includes physician outreach frameworks and service package templates tailored to postpartum concierge nursing.
        </p>
      </div>

      <h2 id="outreach-strategy">Your Outreach Strategy</h2>

      <p>
        The most effective approach combines professional introduction with relationship building over time. Identifying target practices, making initial contact, and demonstrating your value through patient outcomes are the keys to building lasting referral partnerships.
      </p>

      <h2 id="services-for-obgyn-patients">Services That Complement OBGYN Care</h2>

      <p>
        Structured service packages for OBGYN-referred patients include postpartum recovery visits, C-section recovery support, high-risk postpartum monitoring, and newborn care transition support. See our <Link to="/resources/templates/postpartum-care-package">postpartum care package template</Link> for guidance on structuring these services.
      </p>

      <h2 id="building-trust">Building Trust with the Practice</h2>

      <p>
        Trust is built through following the OBGYN's protocols, consistent reporting, good clinical judgment about when to escalate, and patience. The first few successful patient experiences will do more for your partnership than any marketing material.
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
