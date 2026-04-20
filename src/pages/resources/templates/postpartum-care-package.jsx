import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "What should a postpartum care package include?", answer: "A comprehensive package includes maternal health assessments, newborn assessments, breastfeeding support, postpartum mood screening, family education, a defined visit schedule, on-call availability, pricing, and communication protocols with the OBGYN and pediatrician." },
  { question: "How many visits should a postpartum package include?", answer: "A basic package typically includes 3 to 5 visits over the first two weeks. A comprehensive package may include daily visits for the first week plus tapering visits through week four. Offer tiers so families can choose the level of support they need." },
  { question: "Should I offer separate C-section packages?", answer: "Yes. C-section recovery involves additional surgical wound care, different mobility considerations, and a longer physical recovery period. A dedicated C-section package demonstrates awareness of these differences and allows you to price appropriately." },
  { question: "How do I market postpartum packages to expecting families?", answer: "Market through OBGYN and pediatrician referrals, prenatal class partnerships, baby shower registries, social media targeting expecting parents, and local parenting groups. Many families research postpartum support during the third trimester." },
  { question: "Should I include newborn care in the postpartum package?", answer: "Yes. Families want comprehensive support, and separating maternal and newborn care creates an incomplete offering. Include basic newborn assessment and education in your standard package, with the option for extended newborn-focused services as an add-on." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Create a Postpartum Care Package", "description": "Step-by-step guide to creating a postpartum care package for your concierge nursing business, including visit structure, services, pricing, and marketing.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'why-postpartum-packages', text: 'Why Create a Postpartum Care Package' },
  { id: 'package-tiers', text: 'Designing Package Tiers' },
  { id: 'maternal-services', text: 'Maternal Care Services to Include' },
  { id: 'newborn-services', text: 'Newborn Care Services to Include' },
  { id: 'pricing-and-marketing', text: 'Pricing and Marketing' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'What Does a Concierge Nurse Do for Postpartum Mothers?', description: 'Understand postpartum needs to design effective care packages.', link: '/resources/services/concierge-nurse-postpartum-care', category: 'Client Services' },
  { title: 'How to Partner with OBGYNs', description: 'Build OBGYN referral relationships that drive postpartum package sales.', link: '/resources/referrals/partner-with-obgyns', category: 'Referral Sources' },
  { title: 'How to Create a Client Welcome Packet', description: 'Complement your care package with a professional client welcome packet.', link: '/resources/templates/concierge-nursing-welcome-packet', category: 'Templates' },
];

export default function PostpartumCarePackage() {
  return (
    <ResourceLayout title="How to Create a Postpartum Care Package" description="Step-by-step guide to creating a postpartum care package for your concierge nursing business, including visit structure, services, pricing, and marketing." canonical="https://www.conciergenursesociety.com/resources/templates/postpartum-care-package" schema={articleSchema} category="Templates" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Launch Your Postpartum Practice', description: 'Get the tools to build and market your postpartum concierge nursing services.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A postpartum care package structures your maternal and newborn nursing services into a clear, purchasable offering for new families. It should include tiered visit options, maternal and newborn assessments, breastfeeding support, mood screening, and transparent pricing. Creating a professional package makes referrals easy for physicians.</p>
      </QuickAnswer>

      <h2 id="why-postpartum-packages">Why Create a Postpartum Care Package</h2>
      <p>New parents are overwhelmed and do not want to figure out visit counts or negotiate hourly rates. A well-designed package removes decision fatigue, creates predictable revenue, makes physician referrals easy, and establishes your professional credibility.</p>

      <h2 id="package-tiers">Designing Package Tiers</h2>
      <p>Offer two or three tiers to accommodate different family needs and budgets, from essential check-ins through comprehensive daily support. Consider a separate C-section add-on for surgical recovery needs.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get the Template</p>
        <p className="mb-4">The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include postpartum care package templates. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> walks you through building, pricing, and marketing your packages.</p>
      </div>

      <h2 id="maternal-services">Maternal Care Services to Include</h2>
      <p>Your package should cover the essential maternal assessments during the postpartum period. For detailed guidance, see our guide on <Link to="/resources/services/concierge-nurse-postpartum-care">concierge nursing for postpartum mothers</Link>.</p>

      <h2 id="newborn-services">Newborn Care Services to Include</h2>
      <p>Include basic newborn assessment and education in your standard package. Families want comprehensive support, and separating maternal and newborn care creates an incomplete offering.</p>

      <h2 id="pricing-and-marketing">Pricing and Marketing</h2>
      <p>Price your packages to reflect the clinical value you provide. Market through <Link to="/resources/referrals/partner-with-obgyns">OBGYN referrals</Link>, <Link to="/resources/referrals/partner-with-pediatricians">pediatrician partnerships</Link>, and social media targeting expecting parents.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
