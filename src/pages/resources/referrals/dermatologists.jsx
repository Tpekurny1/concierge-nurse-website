import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "What dermatology patients need concierge nursing?",
    answer: "Patients undergoing Mohs surgery, skin cancer excisions, extensive wound care, cosmetic laser treatments, and chemical peels are the primary candidates. Patients with chronic skin conditions requiring ongoing management may also benefit from concierge nursing support."
  },
  {
    question: "Is wound care certification necessary for dermatology referrals?",
    answer: "Wound care certification (WCC or CWOCN) is highly recommended and significantly strengthens your credibility with dermatologists. Many dermatology referrals involve post-procedure wound management, and certification demonstrates your expertise in this area."
  },
  {
    question: "How do cosmetic dermatology referrals differ from medical dermatology?",
    answer: "Cosmetic dermatology patients are typically private-pay and may need post-procedure skin care, monitoring for reactions, and comfort measures. Medical dermatology patients may need more complex wound care, medication monitoring, or ongoing condition management. Both are viable referral channels."
  },
  {
    question: "Can I assist with in-office dermatology procedures?",
    answer: "Some dermatologists hire concierge nurses to assist with in-office procedures such as Mohs surgery, biopsies, or cosmetic treatments. This is a different arrangement from post-procedure home care and may involve working as a contractor within the office on procedure days."
  },
  {
    question: "How large is the dermatology referral opportunity?",
    answer: "Dermatology is a growing field, particularly in cosmetic and skin cancer treatment. The volume of referrals depends on the practice's focus and your local market. While individual procedure volumes may be lower than orthopedic or plastic surgery, the private-pay nature of many dermatology patients aligns well with concierge nursing."
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
  "headline": "How to Partner with Dermatologists as a Concierge Nurse",
  "description": "Learn how to build referral relationships with dermatologists by providing post-procedure wound care, skin cancer recovery support, and cosmetic aftercare through your concierge nursing practice.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-dermatologists', text: 'Why Dermatologists Make Good Partners' },
  { id: 'types-of-dermatology-referrals', text: 'Types of Dermatology Referrals' },
  { id: 'approaching-dermatology-practices', text: 'Approaching Dermatology Practices' },
  { id: 'services-for-dermatology-patients', text: 'Services for Dermatology Patients' },
  { id: 'building-the-relationship', text: 'Building the Relationship' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'How to Partner with Plastic Surgeons',
    description: 'Build referral partnerships with plastic surgeons for post-surgical recovery support.',
    link: '/resources/referrals/partner-with-plastic-surgeons',
    category: 'Referral Sources',
  },
  {
    title: 'How to Create a Post-Op Recovery Care Package',
    description: 'Structure your post-procedure care services into professional packages.',
    link: '/resources/templates/post-op-recovery-care-package',
    category: 'Templates',
  },
  {
    title: 'What Does a Concierge Nurse Do After a Facelift?',
    description: 'Explore post-surgical nursing services that overlap with cosmetic dermatology aftercare.',
    link: '/resources/services/concierge-nurse-after-facelift',
    category: 'Client Services',
  },
];

export default function Dermatologists() {
  return (
    <ResourceLayout
      title="How to Partner with Dermatologists as a Concierge Nurse"
      description="Learn how to build referral relationships with dermatologists by providing post-procedure wound care, skin cancer recovery support, and cosmetic aftercare through your concierge nursing practice."
      canonical="https://www.conciergenursesociety.com/resources/referrals/partner-with-dermatologists"
      schema={articleSchema}
      category="Referral Sources"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Ready to Grow Your Referral Network?',
        description: 'Join the Concierge Nurse Business Society for tools and support to build physician partnerships.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Dermatologists are an often-overlooked referral source for concierge nurses, particularly those with wound care expertise. Patients undergoing Mohs surgery, skin cancer excisions, and cosmetic procedures need post-procedure monitoring and wound care that the dermatologist's office cannot always provide at home.
        </p>
      </QuickAnswer>

      <h2 id="why-dermatologists">Why Dermatologists Make Good Partners</h2>

      <p>
        Dermatology encompasses both medical and cosmetic procedures that result in wounds requiring careful post-procedure care. Mohs surgery patients, in particular, benefit from professional nursing follow-up. Cosmetic dermatology patients are already paying out of pocket and are often willing to invest in professional recovery support. High patient volumes mean dermatologists may not have capacity for detailed follow-up, creating opportunity for concierge nurses.
      </p>

      <h2 id="types-of-dermatology-referrals">Types of Dermatology Referrals</h2>

      <p>
        Referral opportunities include Mohs surgery patients (highest priority), skin cancer excision patients, cosmetic procedure patients (laser, chemical peels), and patients with chronic skin conditions requiring ongoing wound management. Understanding these different patient types helps you tailor your approach.
      </p>

      <h2 id="approaching-dermatology-practices">Approaching Dermatology Practices</h2>

      <p>
        Lead with wound care expertise, focus on Mohs patients as your strongest case, create a simple referral process for the practice, and offer to meet with the Mohs surgeon directly. Wound care certification is highly recommended for this referral niche.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Grow Your Referral Network</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> and <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> include physician outreach frameworks for building partnerships across specialties.
        </p>
      </div>

      <h2 id="services-for-dermatology-patients">Services for Dermatology Patients</h2>

      <p>
        Service offerings include post-Mohs wound care packages, post-procedure monitoring visits, and chronic wound management for ongoing skin conditions. For guidance on structuring packages, see our <Link to="/resources/templates/post-op-recovery-care-package">post-op recovery care package template</Link>.
      </p>

      <h2 id="building-the-relationship">Building the Relationship</h2>

      <p>
        Dermatology partnerships grow through consistent quality, visual wound documentation shared with the practice, precise adherence to wound care protocols, appropriate escalation, and staying current on wound care best practices.
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
