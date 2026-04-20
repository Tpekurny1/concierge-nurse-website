import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Do all nurse-owned businesses need a PLLC?",
    answer: "No. Whether you need a PLLC depends on your state's laws. Some states require it for licensed professionals; others allow a standard LLC."
  },
  {
    question: "What is the difference between an LLC and a PLLC?",
    answer: "Both are limited liability companies. A PLLC is specifically for licensed professionals and may require proof of active licensure and restrict ownership to licensed individuals."
  },
  {
    question: "How much does it cost to form a nursing PLLC?",
    answer: "Formation costs vary by state and typically range from a few hundred to a few thousand dollars depending on whether you use an attorney."
  },
  {
    question: "Can an NP and an RN form a PLLC together?",
    answer: "This depends on your state's laws. Some states restrict PLLC ownership to professionals with the same license type. Consult a healthcare attorney for guidance."
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
  "headline": "What Is a Nursing PLLC?",
  "description": "A nursing PLLC (Professional Limited Liability Company) is a business entity designed for licensed professionals. Learn what it is, when you need one, and how it differs from a standard LLC.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'definition', text: 'Definition' },
  { id: 'pllc-vs-llc', text: 'PLLC vs. LLC: Key Differences' },
  { id: 'when-you-need-a-pllc', text: 'When You Need a PLLC' },
  { id: 'how-to-form', text: 'How to Form a Nursing PLLC' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Is a Nurse-Owned Business?',
    description: 'Understanding the types and structures of nurse-owned businesses.',
    link: '/resources/glossary/what-is-a-nurse-owned-business',
    category: 'Glossary',
  },
  {
    title: 'What Does Scope of Practice Mean for Nurse Business Owners?',
    description: 'How scope of practice affects your nursing business.',
    link: '/resources/glossary/what-is-scope-of-practice-nurse-business',
    category: 'Glossary',
  },
  {
    title: 'Starting a Nursing Business vs. Buying a Franchise',
    description: 'Comparing different paths to nursing business ownership.',
    link: '/resources/compare/start-nursing-business-vs-franchise',
    category: 'Comparisons',
  },
];

export default function NursingPllc() {
  return (
    <ResourceLayout
      title="What Is a Nursing PLLC?"
      description="A nursing PLLC (Professional Limited Liability Company) is a business entity designed for licensed professionals. Learn what it is, when you need one, and how it differs from a standard LLC."
      canonical="https://www.conciergenursesociety.com/resources/glossary/what-is-a-nursing-pllc"
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
          A nursing PLLC (Professional Limited Liability Company) is a specific type of business entity available in some states for licensed professionals, including nurses. It provides personal liability protection similar to a standard LLC but is designated for businesses that provide professional services requiring a state license.
        </p>
      </QuickAnswer>

      <h2 id="definition">Definition</h2>

      <p>
        A PLLC is a variation of the standard LLC designed for licensed professionals such as nurses, physicians, and attorneys. It provides liability protection for the business owner's personal assets but does not protect against claims of professional malpractice, which is why malpractice insurance is still essential.
      </p>

      <h2 id="pllc-vs-llc">PLLC vs. LLC: Key Differences</h2>

      <p>
        The key differences between a PLLC and LLC involve ownership restrictions (PLLC typically requires licensed owners), license verification requirements during formation, how professional liability is handled, and state availability. Not all states offer the PLLC designation, and requirements vary significantly.
      </p>

      <h2 id="when-you-need-a-pllc">When You Need a PLLC</h2>

      <p>
        You may need a PLLC if your state requires licensed healthcare professionals to use this entity type when forming a clinical services business. If you are providing non-clinical services such as consulting or coaching, a standard LLC may be sufficient even in states that require PLLCs for clinical practices.
      </p>

      <h2 id="how-to-form">How to Form a Nursing PLLC</h2>

      <p>
        Forming a nursing PLLC involves researching your state's specific requirements, choosing a compliant business name, filing Articles of Organization, and creating an Operating Agreement. Consulting with a business attorney familiar with healthcare businesses in your state is strongly recommended.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Need Help with Business Setup?</p>
        <p className="mb-4">
          The <Link to="/toolkits" className="text-gold font-semibold hover:underline">CNBS Toolkits</Link> include resources to help you navigate business formation, and the <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator</Link> walks you through the full setup process.
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
