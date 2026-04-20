import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Do you need business experience to become a nurse entrepreneur?",
    answer: "No prior business experience is required, but you will need to learn business fundamentals. The willingness to learn is more important than prior knowledge."
  },
  {
    question: "What are the most common types of nurse-owned businesses?",
    answer: "Common nurse-owned businesses include concierge nursing, nurse coaching, legal nurse consulting, healthcare staffing, wellness businesses, and healthcare consulting. The options are broader than most nurses realize."
  },
  {
    question: "Can you be a nurse entrepreneur while still working as a nurse?",
    answer: "Yes. Many nurse entrepreneurs start part-time while maintaining their nursing job. This is a common and lower-risk approach."
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
  "headline": "What Is a Nurse Entrepreneur?",
  "description": "A nurse entrepreneur is a licensed nurse who owns and operates a business that leverages nursing expertise. Learn what nurse entrepreneurship looks like and how to get started.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'definition', text: 'Definition' },
  { id: 'types-of-nurse-entrepreneurship', text: 'Types of Nurse Entrepreneurship' },
  { id: 'what-it-takes', text: 'What It Takes to Be a Nurse Entrepreneur' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Is a Nurse-Owned Business?',
    description: 'Understanding the structure and types of nurse-owned businesses.',
    link: '/resources/glossary/what-is-a-nurse-owned-business',
    category: 'Glossary',
  },
  {
    title: 'How to Leave Bedside Nursing and Start Your Own Business',
    description: 'A practical guide for nurses ready to become entrepreneurs.',
    link: '/resources/career/leave-bedside-nursing-start-business',
    category: 'Career Transition',
  },
  {
    title: 'Concierge Nursing vs. Nurse Coaching',
    description: 'Comparing two popular nurse entrepreneurship paths.',
    link: '/resources/compare/concierge-nursing-vs-nurse-coaching',
    category: 'Comparisons',
  },
];

export default function NurseEntrepreneur() {
  return (
    <ResourceLayout
      title="What Is a Nurse Entrepreneur?"
      description="A nurse entrepreneur is a licensed nurse who owns and operates a business that leverages nursing expertise. Learn what nurse entrepreneurship looks like and how to get started."
      canonical="https://www.conciergenursesociety.com/resources/glossary/what-is-a-nurse-entrepreneur"
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
          A nurse entrepreneur is a licensed nurse who starts and runs their own business, using their nursing knowledge, clinical skills, and healthcare expertise as the foundation. Rather than working as an employee, a nurse entrepreneur creates their own income through a business they own and operate.
        </p>
      </QuickAnswer>

      <h2 id="definition">Definition</h2>

      <p>
        Nurse entrepreneurship encompasses any business venture initiated and led by a nurse that draws on nursing expertise. This can range from direct clinical services like <Link to="/resources/what-is-a-concierge-nurse">concierge nursing</Link> to non-clinical ventures like health education platforms, consulting, or healthcare product companies. The nurse entrepreneur movement has grown as more nurses seek alternatives to traditional employment, driven by burnout, the desire for autonomy, and a growing market for personalized health services.
      </p>

      <h2 id="types-of-nurse-entrepreneurship">Types of Nurse Entrepreneurship</h2>

      <p>
        Nurse entrepreneurs pursue a wide range of business models, including concierge nursing practices, nurse coaching, consulting for law firms or organizations, healthcare staffing agencies, health education and course creation, and healthcare product development. The right path depends on your clinical background, interests, and the market needs in your area.
      </p>

      <h2 id="what-it-takes">What It Takes to Be a Nurse Entrepreneur</h2>

      <p>
        Successful nurse entrepreneurs combine clinical expertise with business skills. The business side -- marketing, sales, financial management, client relations -- is learned through practice, mentorship, and intentional study. Key traits include willingness to learn, comfort with uncertainty, self-motivation, and persistence.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Explore Nurse Entrepreneurship</p>
        <p className="mb-4">
          If concierge nursing appeals to you as a nurse entrepreneurship path, <Link to="/start-here" className="text-gold font-semibold hover:underline">start here</Link> to learn more about the model. The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> provides the roadmap to get you from idea to operating practice.
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
