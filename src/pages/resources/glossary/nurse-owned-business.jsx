import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "What qualifies as a nurse-owned business?",
    answer: "A nurse-owned business is any business entity that is majority-owned or solely owned by a licensed nurse. The business may or may not provide clinical nursing services."
  },
  {
    question: "Do nurse-owned businesses get special tax benefits?",
    answer: "There are no federal tax benefits specifically for nurse-owned businesses. However, as a business owner you have access to standard business deductions not available to W-2 employees."
  },
  {
    question: "Can a nurse own a business that is not related to healthcare?",
    answer: "Absolutely. However, businesses that leverage nursing expertise have the advantage of building on skills and knowledge you already possess."
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
  "headline": "What Is a Nurse-Owned Business?",
  "description": "A nurse-owned business is a company founded, owned, and operated by a licensed nurse. Learn about the types of nurse-owned businesses, legal structures, and how to start one.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'definition', text: 'Definition' },
  { id: 'types', text: 'Types of Nurse-Owned Businesses' },
  { id: 'legal-structure', text: 'Choosing a Legal Structure' },
  { id: 'getting-started', text: 'Getting Started' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Is a Nurse Entrepreneur?',
    description: 'Understanding the nurse entrepreneur mindset and path.',
    link: '/resources/glossary/what-is-a-nurse-entrepreneur',
    category: 'Glossary',
  },
  {
    title: 'What Is a Nursing PLLC?',
    description: 'The business entity many nurse business owners need.',
    link: '/resources/glossary/what-is-a-nursing-pllc',
    category: 'Glossary',
  },
  {
    title: 'How to Leave Bedside Nursing and Start Your Own Business',
    description: 'A practical guide for nurses ready to become business owners.',
    link: '/resources/career/leave-bedside-nursing-start-business',
    category: 'Career Transition',
  },
];

export default function NurseOwnedBusiness() {
  return (
    <ResourceLayout
      title="What Is a Nurse-Owned Business?"
      description="A nurse-owned business is a company founded, owned, and operated by a licensed nurse. Learn about the types of nurse-owned businesses, legal structures, and how to start one."
      canonical="https://www.conciergenursesociety.com/resources/glossary/what-is-a-nurse-owned-business"
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
          A nurse-owned business is any business entity that is owned and operated by a licensed nurse. It may provide direct clinical services, healthcare-adjacent services, or products and resources for patients or healthcare professionals. The distinguishing feature is that a nurse is the founder, owner, and decision-maker.
        </p>
      </QuickAnswer>

      <h2 id="definition">Definition</h2>

      <p>
        A nurse-owned business is exactly what it sounds like -- a business owned by a nurse. Nurses bring a unique perspective to business ownership through their clinical training, patient care experience, and understanding of healthcare systems. Nurse-owned businesses are part of a broader trend of healthcare professionals creating businesses on their own terms.
      </p>

      <h2 id="types">Types of Nurse-Owned Businesses</h2>

      <p>
        Common types include concierge nursing practices, nurse coaching businesses, consulting firms (legal, compliance, quality), staffing agencies, education and training companies, and healthcare product businesses. The right model depends on your clinical background, interests, and goals.
      </p>

      <h2 id="legal-structure">Choosing a Legal Structure</h2>

      <p>
        The most common structures are sole proprietorship, LLC (Limited Liability Company), and <Link to="/resources/glossary/what-is-a-nursing-pllc" className="text-gold hover:underline">PLLC</Link> (Professional LLC, required in some states for clinical services). The right structure depends on your state's requirements, services, and risk profile. Consulting with an attorney is recommended.
      </p>

      <h2 id="getting-started">Getting Started</h2>

      <p>
        Starting a nurse-owned business involves identifying your niche, choosing a business structure, obtaining necessary insurance, and beginning to market your services. The process is more accessible than many nurses expect, especially for service-based businesses like concierge nursing that have low startup costs.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Ready to Build Your Nurse-Owned Business?</p>
        <p className="mb-4">
          <Link to="/start-here" className="text-gold font-semibold hover:underline">Start here</Link> to explore concierge nursing, or join the <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> for step-by-step guidance through launch.
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
