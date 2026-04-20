import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Is private-pay nursing the same as cash-pay nursing?",
    answer: "Yes, the terms are used interchangeably. Both refer to a model where clients pay the nurse directly without insurance involvement."
  },
  {
    question: "Is private-pay nursing legal?",
    answer: "Yes. Private-pay nursing is legal in all U.S. states. Nurses must operate within their scope of practice and comply with applicable business regulations."
  },
  {
    question: "Who uses private-pay nursing services?",
    answer: "Common clients include post-surgical patients, elderly individuals, new parents, people with chronic conditions, and executives seeking convenient healthcare."
  },
  {
    question: "How do private-pay nurses set their rates?",
    answer: "Private-pay nurses set their own rates based on their niche, local market, experience, and the value they deliver. Pricing structures vary from hourly to packages to retainers."
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
  "headline": "What Is Private-Pay Nursing?",
  "description": "Private-pay nursing is a model where clients pay a nurse directly for healthcare services without insurance billing. Learn how it works and how it relates to concierge nursing.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'definition', text: 'Definition' },
  { id: 'how-private-pay-works', text: 'How Private-Pay Nursing Works' },
  { id: 'private-pay-vs-insurance', text: 'Private-Pay vs. Insurance-Based Nursing' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Is a Cash-Pay Nursing Practice?',
    description: 'A closely related concept in nursing business models.',
    link: '/resources/glossary/what-is-a-cash-pay-nursing-practice',
    category: 'Glossary',
  },
  {
    title: 'Cash-Pay vs. Insurance-Based Nursing Practice',
    description: 'A detailed comparison of payment models for nurse-owned businesses.',
    link: '/resources/compare/cash-pay-nursing-vs-insurance-based',
    category: 'Comparisons',
  },
  {
    title: 'What Is a Concierge Nurse?',
    description: 'The most common type of private-pay nursing practice.',
    link: '/resources/what-is-a-concierge-nurse',
    category: 'Getting Started',
  },
];

export default function PrivatePayNursing() {
  return (
    <ResourceLayout
      title="What Is Private-Pay Nursing?"
      description="Private-pay nursing is a model where clients pay a nurse directly for healthcare services without insurance billing. Learn how it works and how it relates to concierge nursing."
      canonical="https://www.conciergenursesociety.com/resources/glossary/what-is-private-pay-nursing"
      schema={articleSchema}
      category="Glossary"
      categorySlug="/resources/glossary"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Private-pay nursing is a healthcare service model in which clients pay a nurse directly for services, bypassing insurance companies entirely. This model is the foundation of most concierge nursing practices and is also referred to as cash-pay or direct-pay nursing.
        </p>
      </QuickAnswer>

      <h2 id="definition">Definition</h2>

      <p>
        Private-pay nursing means the financial arrangement is between the nurse and the client, with no insurance company involved. The nurse provides services, the client pays directly, and no claims are submitted to insurance payers. This is distinct from home health nursing (typically insurance-funded) and agency-based nursing (where the agency handles billing).
      </p>

      <h2 id="how-private-pay-works">How Private-Pay Nursing Works</h2>

      <p>
        In a private-pay arrangement, the nurse operates as an independent business owner. The nurse markets their services, agrees on terms with the client, establishes a service agreement, and collects payment directly. This straightforward model eliminates the administrative complexity of insurance billing and gives nurses full control over their service offerings and pricing.
      </p>

      <h2 id="private-pay-vs-insurance">Private-Pay vs. Insurance-Based Nursing</h2>

      <p>
        The primary advantage of private-pay is simplicity and autonomy -- no credentialing, no claim submissions, no denials, and no reimbursement delays. The primary trade-off is that your client pool is limited to individuals who can afford to pay out of pocket. For many concierge nursing niches, however, this is not a significant limitation.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Build Your Private-Pay Practice</p>
        <p className="mb-4">
          Learn how to structure, price, and launch a private-pay concierge nursing practice through the <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator program</Link>.
        </p>
      </div>

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
