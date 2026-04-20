import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "How do I approach a plastic surgeon about partnering?",
    answer: "Start by identifying practices in your area and requesting a brief meeting with the office manager or surgeon. Bring a one-page overview of your services, your credentials, and a clear explanation of how you support their patients post-operatively. Focus on how you reduce their after-hours calls and improve patient outcomes."
  },
  {
    question: "Do plastic surgeons pay concierge nurses directly?",
    answer: "In most arrangements, the patient pays the concierge nurse directly as a private-pay service. The surgeon refers the patient to you, but does not employ or pay you. Some surgeons bundle post-op nursing into their surgical packages and subcontract with a concierge nurse, but this varies by practice."
  },
  {
    question: "What certifications help when working with plastic surgery patients?",
    answer: "Wound care certification (WCC or CWOCN), IV therapy certification, and BLS/ACLS are all valuable. Experience in post-anesthesia care, surgical nursing, or outpatient surgery settings is also beneficial. Some concierge nurses also pursue aesthetic nursing training."
  },
  {
    question: "How many plastic surgeons should I partner with?",
    answer: "Quality matters more than quantity. Start with one or two surgeons whose patient volume and surgical focus align with your services. As you build a track record and can handle more referrals, you can expand. Many successful concierge nurses maintain strong relationships with three to five surgeons."
  },
  {
    question: "What should I include in a referral packet for a plastic surgeon?",
    answer: "Include your credentials and licensure information, a summary of your post-operative care services, your availability and response times, your contact information, patient intake process overview, and any relevant testimonials or case summaries (with appropriate permissions). Keep it professional and concise."
  },
  {
    question: "Can I partner with plastic surgeons if I am an LPN?",
    answer: "Yes, but your scope of practice will determine which services you can provide. LPNs can offer many post-operative support services including wound care, medication administration, and patient education. Review your state's nurse practice act to understand your specific scope and communicate this clearly to surgeon partners."
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
  "headline": "How to Partner with Plastic Surgeons as a Concierge Nurse",
  "description": "Learn how to build referral relationships with plastic surgeons for your concierge nursing business. Covers outreach strategies, service alignment, and maintaining long-term partnerships.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-plastic-surgeons', text: 'Why Plastic Surgeons Are Ideal Referral Partners' },
  { id: 'what-plastic-surgeons-need', text: 'What Plastic Surgeons Need from You' },
  { id: 'how-to-approach', text: 'How to Approach Plastic Surgeons' },
  { id: 'building-your-referral-packet', text: 'Building Your Referral Packet' },
  { id: 'services-to-offer', text: 'Services to Offer Plastic Surgery Patients' },
  { id: 'maintaining-the-relationship', text: 'Maintaining the Relationship Long-Term' },
  { id: 'common-mistakes', text: 'Common Mistakes to Avoid' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Does a Concierge Nurse Do After a Facelift?',
    description: 'Explore the specific services concierge nurses provide during facelift recovery.',
    link: '/resources/services/concierge-nurse-after-facelift',
    category: 'Client Services',
  },
  {
    title: 'What Does a Concierge Nurse Do After a BBL?',
    description: 'Learn about post-BBL recovery support and how concierge nurses help patients heal safely.',
    link: '/resources/services/concierge-nurse-after-bbl',
    category: 'Client Services',
  },
  {
    title: 'How to Create a Post-Op Recovery Care Package',
    description: 'Build a professional post-operative care package template for your concierge nursing business.',
    link: '/resources/templates/post-op-recovery-care-package',
    category: 'Templates',
  },
];

export default function PlasticSurgeons() {
  return (
    <ResourceLayout
      title="How to Partner with Plastic Surgeons as a Concierge Nurse"
      description="Learn how to build referral relationships with plastic surgeons for your concierge nursing business. Covers outreach strategies, service alignment, and maintaining long-term partnerships."
      canonical="https://www.conciergenursesociety.com/resources/referrals/partner-with-plastic-surgeons"
      schema={articleSchema}
      category="Referral Sources"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Ready to Build Surgeon Partnerships?',
        description: 'Get the tools, templates, and mentorship you need to land your first plastic surgeon referral partner.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Plastic surgeons are one of the highest-value referral partners for concierge nurses because their patients need post-operative monitoring, wound care, and recovery support that the surgeon's office cannot always provide. Building these partnerships requires understanding the surgeon's needs and consistently delivering excellent patient care.
        </p>
      </QuickAnswer>

      <h2 id="why-plastic-surgeons">Why Plastic Surgeons Are Ideal Referral Partners</h2>

      <p>
        Most cosmetic procedures are outpatient, meaning patients go home the same day and recover without professional oversight. This creates a gap that concierge nurses are uniquely positioned to fill. When a concierge nurse is part of the recovery plan, the patient has a trained professional monitoring their progress, the surgeon's office runs more efficiently, and complications are caught early. Cosmetic surgery patients are also typically private-pay, aligning perfectly with the concierge model.
      </p>

      <h2 id="what-plastic-surgeons-need">What Plastic Surgeons Need from You</h2>

      <p>
        Surgeons need partners who reduce their after-hours call burden, lower complication rates through early intervention, improve patient satisfaction, demonstrate professionalism and reliability, and maintain clear scope-of-practice boundaries. Understanding these needs is the foundation of a successful partnership.
      </p>

      <h2 id="how-to-approach">How to Approach Plastic Surgeons</h2>

      <p>
        Building surgeon partnerships takes a strategic, relationship-first approach. Success comes from researching the practice, connecting with the right people in the office, and demonstrating your value through consistent, professional patient care over time.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Ready to Build Surgeon Partnerships?</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> includes the outreach frameworks and referral packet templates you need to land your first plastic surgeon referral partner.
        </p>
      </div>

      <h2 id="building-your-referral-packet">Building Your Referral Packet</h2>

      <p>
        A professional referral packet sets you apart and should include your credentials, a concise service overview tailored to plastic surgery recovery, your availability and communication process, and liability insurance information. The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> provide ready-to-use referral packet templates.
      </p>

      <h2 id="services-to-offer">Services to Offer Plastic Surgery Patients</h2>

      <p>
        Your services should align with post-operative needs across the recovery timeline, from acute monitoring in the first 24 hours through wound care and activity guidance in the following weeks. The specific services depend on the procedure, the surgeon's protocols, and your scope of practice.
      </p>

      <h2 id="maintaining-the-relationship">Maintaining the Relationship Long-Term</h2>

      <p>
        Landing the first referral is just the beginning. Long-term partnerships are built through consistent communication, reliability, staying current on surgical trends, and always respecting the surgeon's care plan and the professional relationship.
      </p>

      <h2 id="common-mistakes">Common Mistakes to Avoid</h2>

      <p>
        The most common mistakes include leading with your needs instead of the surgeon's, being unprepared without professional materials, overstepping your scope, failing to follow up, and trying to partner with too many surgeons at once. Building depth before breadth is essential.
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
