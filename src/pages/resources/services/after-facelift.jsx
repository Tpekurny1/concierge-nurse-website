import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "How soon after a facelift should a concierge nurse visit?",
    answer: "Ideally, the concierge nurse should be present when the patient arrives home from the surgical center, or within the first few hours. The first 24 hours after surgery are the most critical for monitoring and the time when patients feel most vulnerable and need the most support."
  },
  {
    question: "How long does a patient need concierge nursing after a facelift?",
    answer: "Most facelift patients benefit from nursing support during the first 3 to 7 days of recovery. The first 48 hours typically require the most intensive monitoring, with visits becoming less frequent as healing progresses. Some patients opt for weekly check-ins through the first month."
  },
  {
    question: "What complications should a concierge nurse watch for after a facelift?",
    answer: "Key concerns include hematoma (the most common surgical complication), excessive swelling, signs of infection, nerve-related symptoms, asymmetry, skin flap circulation problems, and adverse reactions to medications. Early detection and prompt communication with the surgeon is essential."
  },
  {
    question: "Can a concierge nurse remove facelift drains?",
    answer: "Drain removal may be within your scope of practice depending on your state's nurse practice act and the surgeon's orders. Always confirm with the surgeon whether they want you to remove drains or whether the patient should return to the office for removal. Follow the surgeon's specific protocols."
  },
  {
    question: "How much do concierge nurses charge for facelift recovery care?",
    answer: "Pricing varies by location, experience, and the scope of services included. Many concierge nurses offer package pricing for post-surgical recovery that covers a defined number of visits and on-call availability. Pricing should reflect your expertise, availability, and the value you provide during a critical recovery period."
  },
  {
    question: "Do I need plastic surgery experience to provide facelift recovery care?",
    answer: "Direct plastic surgery experience is helpful but not required. Strong wound care skills, post-surgical assessment abilities, pain management knowledge, and comfort with drain care are the core competencies. Consider additional training in cosmetic surgery recovery if this is your target niche."
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
  "headline": "What Does a Concierge Nurse Do After a Facelift?",
  "description": "Learn what concierge nurses do during facelift recovery: post-surgical monitoring, wound care, pain management, drain care, and patient education for optimal healing.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'facelift-recovery-overview', text: 'Understanding Facelift Recovery' },
  { id: 'first-24-hours', text: 'The First 24 Hours' },
  { id: 'days-2-through-7', text: 'Days 2 Through 7' },
  { id: 'week-2-and-beyond', text: 'Week 2 and Beyond' },
  { id: 'what-to-watch-for', text: 'What to Watch For' },
  { id: 'for-nurses-building-this-niche', text: 'For Nurses Building This Niche' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Does a Concierge Nurse Do After a BBL?',
    description: 'Explore post-BBL recovery nursing services and how they compare to facelift recovery.',
    link: '/resources/services/concierge-nurse-after-bbl',
    category: 'Client Services',
  },
  {
    title: 'How to Partner with Plastic Surgeons',
    description: 'Build referral relationships with plastic surgeons who perform facelifts.',
    link: '/resources/referrals/partner-with-plastic-surgeons',
    category: 'Referral Sources',
  },
  {
    title: 'How to Create a Post-Op Recovery Care Package',
    description: 'Structure your facelift recovery services into a professional care package.',
    link: '/resources/templates/post-op-recovery-care-package',
    category: 'Templates',
  },
];

export default function AfterFacelift() {
  return (
    <ResourceLayout
      title="What Does a Concierge Nurse Do After a Facelift?"
      description="Learn what concierge nurses do during facelift recovery: post-surgical monitoring, wound care, pain management, drain care, and patient education for optimal healing."
      canonical="https://www.conciergenursesociety.com/resources/services/concierge-nurse-after-facelift"
      schema={articleSchema}
      category="Client Services"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Build Your Post-Surgical Nursing Practice',
        description: 'Get the tools and mentorship to launch a concierge nursing business specializing in cosmetic surgery recovery.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          After a facelift, a concierge nurse provides in-home post-surgical monitoring, wound care, drain management, pain assessment, and patient education during the critical first days of recovery. The nurse monitors for complications and communicates with the surgeon's office, helping the patient heal safely at home.
        </p>
      </QuickAnswer>

      <h2 id="facelift-recovery-overview">Understanding Facelift Recovery</h2>

      <p>
        A facelift is a significant surgical procedure involving tissue repositioning and skin redraping. Most patients are discharged the same day with bandages, drains, and pain medications. The time between surgery and the first follow-up appointment is when a concierge nurse provides the most value -- ensuring clinical safety and emotional comfort during a vulnerable recovery period.
      </p>

      <h2 id="first-24-hours">The First 24 Hours</h2>

      <p>
        The first 24 hours are the highest-risk period, requiring close monitoring of vital signs, hematoma surveillance, drain management, pain control, and proper positioning. This is the window where a concierge nurse's clinical assessment skills make the greatest difference in patient safety and outcomes.
      </p>

      <h2 id="days-2-through-7">Days 2 Through 7</h2>

      <p>
        As recovery progresses, the focus shifts to ongoing wound assessment, drain care, swelling management, medication transitions, and activity guidance. The concierge nurse continues monitoring while educating the patient about normal recovery patterns and activity restrictions.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Post-Surgical Practice</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> provides the frameworks to launch your cosmetic surgery recovery practice, and the <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> include care package templates.
        </p>
      </div>

      <h2 id="week-2-and-beyond">Week 2 and Beyond</h2>

      <p>
        Most patients transition to less frequent visits during the second week, with ongoing wound monitoring, scar care education, emotional support, and preparation for follow-up appointments with the surgeon.
      </p>

      <h2 id="what-to-watch-for">What to Watch For</h2>

      <p>
        Key concerns requiring surgeon communication include signs of hematoma, infection indicators, skin flap compromise, nerve symptoms, and wound complications. A concierge nurse's ability to recognize and escalate these issues is central to the value of post-facelift care.
      </p>

      <h2 id="for-nurses-building-this-niche">For Nurses Building This Niche</h2>

      <p>
        Facelift recovery nursing requires strong wound care skills and comfort with facial anatomy. Building this niche starts with establishing <Link to="/resources/referrals/partner-with-plastic-surgeons">plastic surgeon partnerships</Link>. Facelift recovery pairs naturally with other cosmetic surgery services like <Link to="/resources/services/concierge-nurse-after-tummy-tuck">tummy tuck</Link> and <Link to="/resources/services/concierge-nurse-after-bbl">BBL recovery</Link>.
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
