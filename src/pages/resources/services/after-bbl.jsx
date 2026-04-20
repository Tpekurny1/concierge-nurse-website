import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "Why is BBL recovery different from other cosmetic surgeries?", answer: "BBL recovery has unique positioning requirements — patients cannot sit directly on their buttocks for several weeks to protect the transferred fat. This affects every aspect of daily life and requires specific recovery support that differs from other cosmetic procedures." },
  { question: "How long do BBL patients need a concierge nurse?", answer: "Most BBL patients benefit from intensive nursing support for the first 5 to 7 days, with follow-up visits through weeks 2 to 4. The positioning requirements and dual surgical sites (liposuction and fat transfer) make the recovery more involved than many patients expect." },
  { question: "What are the biggest risks after a BBL?", answer: "Serious risks include fat embolism (the most dangerous complication), infection, seroma formation, hematoma, skin necrosis, and asymmetry. Concierge nurses monitor for warning signs of these complications and ensure patients follow the surgeon's protocols precisely." },
  { question: "Can a concierge nurse help with compression garment management?", answer: "Yes. Compression garment management is a significant part of BBL recovery care. The concierge nurse assists with proper garment fitting, monitors for pressure-related skin issues, educates the patient about wear schedules, and communicates with the surgeon about garment adjustments." },
  { question: "Do BBL patients travel for surgery?", answer: "Yes, medical tourism for BBL surgery is common. Some patients travel to a different city or country for the procedure. Concierge nurses who serve BBL patients should be prepared for clients who are recovering away from home and may not have local support systems." },
  { question: "What positioning equipment do BBL patients need?", answer: "BBL patients typically need a BBL pillow for supported sitting when necessary, a specialized BBL toilet seat, positioning cushions for sleeping (prone or side-lying), and modifications for car travel. A concierge nurse helps patients set up and properly use this equipment." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "What Does a Concierge Nurse Do After a BBL?", "description": "Learn what concierge nurses do during BBL recovery: positioning guidance, compression garment management, drain care, wound monitoring, and complication prevention.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'understanding-bbl-recovery', text: 'Understanding BBL Recovery' },
  { id: 'first-48-hours', text: 'The First 48 Hours' },
  { id: 'positioning-and-compression', text: 'Positioning and Compression Management' },
  { id: 'wound-and-drain-care', text: 'Wound and Drain Care' },
  { id: 'weeks-1-through-4', text: 'Weeks 1 Through 4' },
  { id: 'for-nurses', text: 'Building a BBL Recovery Practice' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'What Does a Concierge Nurse Do After a Tummy Tuck?', description: 'Learn about tummy tuck recovery nursing, which often accompanies BBL procedures.', link: '/resources/services/concierge-nurse-after-tummy-tuck', category: 'Client Services' },
  { title: 'How to Partner with Plastic Surgeons', description: 'Build referral relationships with surgeons who perform BBL procedures.', link: '/resources/referrals/partner-with-plastic-surgeons', category: 'Referral Sources' },
  { title: 'How to Create a Post-Op Recovery Care Package', description: 'Structure your BBL recovery services into a professional care package.', link: '/resources/templates/post-op-recovery-care-package', category: 'Templates' },
];

export default function AfterBBL() {
  return (
    <ResourceLayout title="What Does a Concierge Nurse Do After a BBL?" description="Learn what concierge nurses do during BBL recovery: positioning guidance, compression garment management, drain care, wound monitoring, and complication prevention." canonical="https://www.conciergenursesociety.com/resources/services/concierge-nurse-after-bbl" schema={articleSchema} category="Client Services" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Build Your Cosmetic Surgery Recovery Practice', description: 'Get the tools to launch a concierge nursing business specializing in post-surgical recovery.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>After a BBL, a concierge nurse provides specialized recovery support including positioning management, compression garment assistance, drain care, wound monitoring at both liposuction and fat transfer sites, pain management, and complication surveillance. BBL recovery is uniquely demanding due to dual surgical areas and strict positioning requirements.</p>
      </QuickAnswer>

      <h2 id="understanding-bbl-recovery">Understanding BBL Recovery</h2>
      <p>A BBL involves liposuction to harvest fat and fat transfer to the buttocks. The defining feature of recovery is the sitting restriction -- patients must avoid direct pressure on their buttocks for weeks. This affects every daily activity and requires significant guidance and support from a trained professional.</p>

      <h2 id="first-48-hours">The First 48 Hours</h2>
      <p>The first 48 hours focus on vital sign monitoring, pain management across multiple surgical areas, drain management, positioning assistance, and hydration support. Monitoring for fat embolism -- the most serious BBL complication -- is particularly important during this window.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Cosmetic Recovery Practice</p>
        <p className="mb-4">The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> provides frameworks for cosmetic surgery recovery services. The <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> include care package templates.</p>
      </div>

      <h2 id="positioning-and-compression">Positioning and Compression Management</h2>
      <p>Positioning and compression garment management are central to BBL recovery and where a concierge nurse adds the most value. Teaching proper techniques, ensuring the right equipment, and monitoring compliance are ongoing nursing responsibilities throughout the recovery period.</p>

      <h2 id="wound-and-drain-care">Wound and Drain Care</h2>
      <p>BBL patients have surgical sites in multiple locations. The concierge nurse assesses all sites for healing progress, manages drains, and communicates readiness for drain removal to the surgeon.</p>

      <h2 id="weeks-1-through-4">Weeks 1 Through 4</h2>
      <p>As recovery progresses, the focus shifts to positioning compliance, compression garment adjustments, lymphatic drainage coordination, activity guidance, and emotional support as results become visible.</p>

      <h2 id="for-nurses">Building a BBL Recovery Practice</h2>
      <p>BBL recovery is a growing niche. Build relationships with <Link to="/resources/referrals/partner-with-plastic-surgeons">plastic surgeons</Link> and create procedure-specific <Link to="/resources/templates/post-op-recovery-care-package">recovery packages</Link>. This niche pairs naturally with <Link to="/resources/services/concierge-nurse-after-tummy-tuck">tummy tuck</Link> and <Link to="/resources/services/concierge-nurse-after-facelift">facelift recovery</Link>.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
