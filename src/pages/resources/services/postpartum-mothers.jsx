import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  { question: "When should a postpartum concierge nurse start visiting?", answer: "Ideally within the first 24 to 48 hours after hospital discharge. The earliest days at home are when new mothers feel most overwhelmed and when clinical monitoring is most valuable. Some concierge nurses meet the family before delivery to establish rapport and create a care plan." },
  { question: "Is a concierge nurse the same as a postpartum doula?", answer: "No. A concierge nurse is a licensed nurse who can perform clinical assessments, monitor for medical complications, administer medications, and provide skilled nursing care. A postpartum doula provides non-clinical support such as emotional encouragement, household help, and newborn care assistance. Both are valuable, but their scopes are different." },
  { question: "What postpartum complications can a concierge nurse detect?", answer: "Concierge nurses can identify signs of postpartum hemorrhage, infection (uterine, wound, or breast), preeclampsia, deep vein thrombosis, and postpartum mood disorders. Early detection through in-home assessments can prevent serious complications and hospital readmissions." },
  { question: "Do concierge nurses provide breastfeeding support?", answer: "Many do, especially those with lactation certification (CLC or IBCLC). Breastfeeding support is one of the most requested postpartum services and includes latch assessment, positioning guidance, milk supply evaluation, and troubleshooting common challenges." },
  { question: "How many postpartum visits does a typical client need?", answer: "This varies by client need. A basic package might include 3 to 5 visits during the first two weeks. More comprehensive packages may include daily visits for the first week and tapering visits through the first month. Some clients also want on-call phone support between visits." },
  { question: "Can a concierge nurse help with C-section recovery?", answer: "Yes. Cesarean recovery involves surgical wound care, pain management, mobility assessment, and monitoring for surgical complications in addition to standard postpartum care. Many concierge nurses offer a separate C-section recovery package that includes these additional services." }
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "What Does a Concierge Nurse Do for Postpartum Mothers?", "description": "Learn how concierge nurses support new mothers after delivery with in-home assessments, breastfeeding support, newborn care education, and postpartum complication monitoring.", "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" }, "datePublished": "2026-04-09", "dateModified": "2026-04-09" };

const headings = [
  { id: 'the-postpartum-gap', text: 'The Postpartum Care Gap' },
  { id: 'maternal-assessment', text: 'Maternal Health Assessment' },
  { id: 'newborn-assessment', text: 'Newborn Assessment and Support' },
  { id: 'breastfeeding-support', text: 'Breastfeeding Support' },
  { id: 'emotional-wellness', text: 'Emotional Wellness Monitoring' },
  { id: 'for-nurses', text: 'Building a Postpartum Nursing Practice' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Create a Postpartum Care Package', description: 'Structure your postpartum services into a professional care package.', link: '/resources/templates/postpartum-care-package', category: 'Templates' },
  { title: 'How to Partner with OBGYNs', description: 'Build referral relationships with OBGYNs for postpartum nursing referrals.', link: '/resources/referrals/partner-with-obgyns', category: 'Referral Sources' },
  { title: 'How to Partner with Pediatricians', description: 'Create a maternal-child health referral network with pediatric practices.', link: '/resources/referrals/partner-with-pediatricians', category: 'Referral Sources' },
];

export default function PostpartumMothers() {
  return (
    <ResourceLayout title="What Does a Concierge Nurse Do for Postpartum Mothers?" description="Learn how concierge nurses support new mothers after delivery with in-home assessments, breastfeeding support, newborn care education, and postpartum complication monitoring." canonical="https://www.conciergenursesociety.com/resources/services/concierge-nurse-postpartum-care" schema={articleSchema} category="Client Services" categorySlug="/resources" lastUpdated="April 2026" headings={headings} relatedResources={relatedResources} cta={{ title: 'Launch Your Postpartum Nursing Practice', description: 'Get the tools and community to build a thriving postpartum concierge nursing business.', buttonText: 'Start Here', buttonLink: '/start-here' }} faqSchema={faqSchema}>
      <QuickAnswer>
        <p>A concierge nurse provides in-home clinical support for new mothers during the postpartum period, including maternal health assessments, newborn assessments, breastfeeding support, postpartum mood screening, and family education. Unlike a doula, a concierge nurse brings licensed nursing skills to detect medical complications during the vulnerable weeks after hospital discharge.</p>
      </QuickAnswer>

      <h2 id="the-postpartum-gap">The Postpartum Care Gap</h2>
      <p>New mothers are typically discharged within 24 to 96 hours, with their next medical appointment six weeks later. During those weeks, mothers face real medical risks and an overwhelming adjustment to newborn care. Concierge nurses directly address this gap by providing regular, in-home clinical assessments during this critical period.</p>

      <h2 id="maternal-assessment">Maternal Health Assessment</h2>
      <p>Each postpartum visit includes a thorough maternal assessment covering vital signs, uterine recovery, wound assessment for cesarean patients, pain management, and DVT screening. These assessments catch complications early and provide reassurance during recovery.</p>

      <h2 id="newborn-assessment">Newborn Assessment and Support</h2>
      <p>Concierge nurses also assess the newborn during visits, including weight checks, feeding evaluation, jaundice screening, umbilical cord care, and general wellness assessment. This provides early detection of concerns and reassurance for new parents.</p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Launch Your Postpartum Nursing Practice</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> provides service design frameworks and the <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> include postpartum care package templates.
        </p>
      </div>

      <h2 id="breastfeeding-support">Breastfeeding Support</h2>
      <p>Breastfeeding challenges are one of the most common reasons new mothers seek professional support. Concierge nurses with lactation training provide hands-on assistance that phone consultations cannot match. Adding lactation certification to your credentials significantly strengthens this service offering.</p>

      <h2 id="emotional-wellness">Emotional Wellness Monitoring</h2>
      <p>Postpartum mood disorders affect a significant number of new mothers. A concierge nurse visiting the home is uniquely positioned to screen for these conditions, observing the mother in her daily environment rather than during a structured office visit. Your role is to identify and refer, not to diagnose or treat.</p>

      <h2 id="for-nurses">Building a Postpartum Nursing Practice</h2>
      <p>Postpartum care is one of the most rewarding and in-demand niches. Build referral relationships with <Link to="/resources/referrals/partner-with-obgyns">OBGYNs</Link> and <Link to="/resources/referrals/partner-with-pediatricians">pediatricians</Link>, and consider lactation certification to expand your value. Visit our <Link to="/start-here">Start Here</Link> page to get started.</p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">{faqItems.map((item, index) => (<div key={index}><h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3><p>{item.answer}</p></div>))}</div>
      </section>
    </ResourceLayout>
  );
}
