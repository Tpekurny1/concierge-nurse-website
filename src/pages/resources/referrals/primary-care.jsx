import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Why would a primary care physician refer to a concierge nurse?",
    answer: "PCPs have limited visit time and cannot provide in-home support. They refer patients who need help with medication management, chronic disease monitoring, post-hospitalization transitions, care coordination between specialists, and health education that requires more time than a 15-minute office visit allows."
  },
  {
    question: "What types of PCP patients need concierge nursing most?",
    answer: "Patients managing multiple chronic conditions, elderly patients with complex medication regimens, patients recently discharged from the hospital, patients who frequently miss appointments or struggle with treatment adherence, and patients whose family members need caregiver support."
  },
  {
    question: "How do I differentiate from home health when talking to PCPs?",
    answer: "Emphasize the flexibility and personalization of your services. Unlike home health, you are not limited by insurance visit caps, you can provide longer visits, you offer services beyond skilled nursing tasks, and you communicate directly with the patient's care team. Your private-pay model means no prior authorization delays."
  },
  {
    question: "Should I offer PCPs data on patient outcomes?",
    answer: "Yes, sharing aggregate outcome data (such as reduced ER visits or improved medication adherence among your clients) can strengthen the partnership. Always maintain patient privacy and share data in aggregate form only. If you are just starting out, focus on individual patient progress reports."
  },
  {
    question: "How many PCPs should I target initially?",
    answer: "Start with two to three practices that align with your niche and geographic area. Building deep relationships with a few practices is more effective than shallow outreach to many. As your capacity grows, you can expand your network."
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
  "headline": "How to Partner with Primary Care Physicians as a Concierge Nurse",
  "description": "Build referral relationships with primary care physicians by offering chronic disease management, care coordination, and patient education through your concierge nursing practice.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-primary-care', text: 'Why Primary Care Physicians Are Strategic Partners' },
  { id: 'pcp-challenges', text: 'Challenges PCPs Face That You Can Solve' },
  { id: 'outreach-approach', text: 'How to Approach PCP Practices' },
  { id: 'services-to-offer', text: 'Services That Support Primary Care' },
  { id: 'communication-framework', text: 'Your Communication Framework' },
  { id: 'growing-the-partnership', text: 'Growing the Partnership' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Does a Concierge Nurse Do for Chronic Illness?',
    description: 'Explore the services concierge nurses provide for patients managing chronic conditions.',
    link: '/resources/services/concierge-nurse-chronic-illness',
    category: 'Client Services',
  },
  {
    title: 'How to Create a Chronic Care Management Plan',
    description: 'Build structured care management plans for patients with ongoing health needs.',
    link: '/resources/templates/chronic-care-management-plan',
    category: 'Templates',
  },
  {
    title: 'How to Partner with Geriatricians',
    description: 'Expand your physician referral network to include geriatric specialists.',
    link: '/resources/referrals/partner-with-geriatricians',
    category: 'Referral Sources',
  },
];

export default function PrimaryCare() {
  return (
    <ResourceLayout
      title="How to Partner with Primary Care Physicians as a Concierge Nurse"
      description="Build referral relationships with primary care physicians by offering chronic disease management, care coordination, and patient education through your concierge nursing practice."
      canonical="https://www.conciergenursesociety.com/resources/referrals/partner-with-primary-care-physicians"
      schema={articleSchema}
      category="Referral Sources"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Build Your Care Coordination Practice',
        description: 'Get the frameworks and mentorship to build a sustainable concierge nursing business with physician referrals.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Primary care physicians are foundational referral partners because they see the broadest range of patients and face constant time constraints. By positioning yourself as an extension of the PCP's care team for in-home assessments, chronic disease management, and care coordination, you fill a gap that PCPs recognize but cannot address within their practice model.
        </p>
      </QuickAnswer>

      <h2 id="why-primary-care">Why Primary Care Physicians Are Strategic Partners</h2>

      <p>
        PCPs manage chronic conditions, coordinate specialist care, and handle preventive health for more patients than any other specialty. They encounter patients daily who would benefit from additional nursing support outside the office. PCPs are also increasingly measured on quality metrics that a concierge nurse can directly support, like reduced readmission rates and chronic disease outcomes.
      </p>

      <h2 id="pcp-challenges">Challenges PCPs Face That You Can Solve</h2>

      <p>
        Key challenges include time constraints that limit patient education, treatment non-adherence between visits, care coordination gaps among multiple specialists, post-hospital transition failures, and frequent ER utilization for issues that could be managed at home with nursing support.
      </p>

      <h2 id="outreach-approach">How to Approach PCP Practices</h2>

      <p>
        Primary care practices are typically smaller and more accessible than surgical practices. Start with existing professional connections, present concrete patient scenarios, and propose a low-commitment trial to demonstrate your value through real outcomes.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Care Coordination Practice</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> includes physician partnership frameworks, and a <Link to="/strategy" className="text-gold font-semibold hover:underline">strategy session</Link> can help you identify the right PCP practices for your niche.
        </p>
      </div>

      <h2 id="services-to-offer">Services That Support Primary Care</h2>

      <p>
        Services include chronic disease management, medication management, post-hospital transition support, and wellness and preventive health. Each of these addresses a specific gap in the PCP's practice model. See our guides on <Link to="/resources/services/concierge-nurse-chronic-illness">chronic illness</Link> and <Link to="/resources/services/concierge-nurse-medication-management">medication management</Link>.
      </p>

      <h2 id="communication-framework">Your Communication Framework</h2>

      <p>
        Consistent communication is the cornerstone of PCP partnerships. Establish a framework for visit summaries, escalation protocols, medication concern reporting, and periodic partnership reviews from the start.
      </p>

      <h2 id="growing-the-partnership">Growing the Partnership</h2>

      <p>
        PCP partnerships have significant growth potential because of the breadth of patient needs. Start with one service type, expand as the practice sees your value, and ask the PCP what other patient challenges they face that you might address.
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
