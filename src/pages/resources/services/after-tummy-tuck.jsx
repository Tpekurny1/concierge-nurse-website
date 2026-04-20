import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "How long is tummy tuck recovery?", answer: "Full recovery from a tummy tuck (abdominoplasty) takes several months, but the most intensive nursing support is needed during the first 1 to 2 weeks. Most patients need help with drain care, wound monitoring, pain management, and mobility during the early recovery period." },
  { question: "What are the most common complications after a tummy tuck?", answer: "Seroma (fluid collection) is the most common complication. Others include infection, hematoma, wound dehiscence, deep vein thrombosis, and skin necrosis. A concierge nurse monitors for all of these during recovery visits." },
  { question: "Do tummy tuck patients have drains?", answer: "Most tummy tuck patients have one or two surgical drains that remain in place for 1 to 3 weeks. Drain management — monitoring output, emptying, and site care — is one of the primary nursing services during tummy tuck recovery." },
  { question: "Can a concierge nurse help with the 'hunched over' phase?", answer: "Yes. Most tummy tuck patients must remain in a flexed or hunched position for the first week or longer. The concierge nurse helps with positioning, mobility assistance, transfer techniques, and gradual straightening as the surgeon allows." },
  { question: "Is a tummy tuck recovery combined with other procedures?", answer: "Frequently. Tummy tucks are commonly performed as part of a 'mommy makeover' that includes breast surgery, or combined with liposuction. Combined procedures require more extensive recovery support and monitoring." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "What Does a Concierge Nurse Do After a Tummy Tuck?", "description": "Learn what concierge nurses do during tummy tuck recovery: drain management, wound care, positioning support, pain management, and complication monitoring.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'tummy-tuck-recovery', text: 'Understanding Tummy Tuck Recovery' },
  { id: 'first-72-hours', text: 'The First 72 Hours' },
  { id: 'drain-management', text: 'Drain Management' },
  { id: 'wound-care', text: 'Wound Care and Monitoring' },
  { id: 'mobility-and-positioning', text: 'Mobility and Positioning' },
  { id: 'for-nurses', text: 'Building This Niche' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'What Does a Concierge Nurse Do After a BBL?', description: 'Learn about BBL recovery nursing services that complement tummy tuck care.', link: '/resources/services/concierge-nurse-after-bbl', category: 'Client Services' },
  { title: 'How to Partner with Plastic Surgeons', description: 'Build referral partnerships with surgeons who perform abdominoplasty.', link: '/resources/referrals/partner-with-plastic-surgeons', category: 'Referral Sources' },
  { title: 'How to Create a Post-Op Recovery Care Package', description: 'Structure your tummy tuck recovery services professionally.', link: '/resources/templates/post-op-recovery-care-package', category: 'Templates' },
];

export default function AfterTummyTuck() {
  return (
    <ResourceLayout title="What Does a Concierge Nurse Do After a Tummy Tuck?" description="Learn what concierge nurses do during tummy tuck recovery: drain management, wound care, positioning support, pain management, and complication monitoring." canonical="https://www.conciergenursesociety.com/resources/services/concierge-nurse-after-tummy-tuck" schema={articleSchema} category="Client Services" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Build Your Surgical Recovery Practice', description: 'Get the tools to launch a concierge nursing business specializing in cosmetic surgery recovery.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>After a tummy tuck, a concierge nurse provides in-home drain management, wound assessment, pain management, positioning and mobility assistance, compression garment support, and complication surveillance. Tummy tuck recovery is particularly demanding due to the flexed position requirement and extended drain management period.</p>
      </QuickAnswer>

      <h2 id="tummy-tuck-recovery">Understanding Tummy Tuck Recovery</h2>
      <p>Abdominoplasty is one of the most extensive cosmetic procedures, involving a hip-to-hip incision, skin removal, and often muscle repair. Most patients are discharged the same day with drains, a compression garment, and instructions to remain in a flexed position. Managing all of this independently is challenging.</p>

      <h2 id="first-72-hours">The First 72 Hours</h2>
      <p>The first 72 hours require close monitoring of vital signs, pain management, drain care, wound assessment, mobility assistance, and DVT prevention. A concierge nurse's presence during this critical window ensures patient safety and comfort.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Surgical Recovery Practice</p>
        <p className="mb-4">The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> and <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> include post-op care package templates and surgeon partnership frameworks.</p>
      </div>

      <h2 id="drain-management">Drain Management</h2>
      <p>Drain management is one of the most important nursing tasks during tummy tuck recovery. Patients typically have one or two drains for one to three weeks. The concierge nurse empties, records, and monitors drain output while providing emotional reassurance around an often anxiety-provoking aspect of recovery.</p>

      <h2 id="wound-care">Wound Care and Monitoring</h2>
      <p>The extensive incision requires careful monitoring for infection, seroma formation, and wound separation. Compression garment management is integrated with wound care to ensure proper healing.</p>

      <h2 id="mobility-and-positioning">Mobility and Positioning</h2>
      <p>The flexed position requirement creates unique mobility challenges. The concierge nurse assists with safe transfers, teaches proper body mechanics, and guides the patient through gradual straightening as the surgeon allows.</p>

      <h2 id="for-nurses">Building This Niche</h2>
      <p>Connect with <Link to="/resources/referrals/partner-with-plastic-surgeons">plastic surgeons</Link> and create dedicated <Link to="/resources/templates/post-op-recovery-care-package">recovery packages</Link> for abdominoplasty patients. This niche pairs well with <Link to="/resources/services/concierge-nurse-after-bbl">BBL recovery</Link> services.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
