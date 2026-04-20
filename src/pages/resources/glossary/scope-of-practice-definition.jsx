import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Does scope of practice change when you become a concierge nurse?",
    answer: "No. Your scope is determined by your nursing license and state's nurse practice act, not your employment setting."
  },
  {
    question: "What happens if I practice outside my scope?",
    answer: "Practicing outside your scope can result in disciplinary action from your state board, legal liability, and potential criminal charges."
  },
  {
    question: "Where can I find my state's scope of practice rules?",
    answer: "Your state board of nursing website publishes the nurse practice act. The NCSBN also provides comparison resources across states."
  },
  {
    question: "Can I expand my scope of practice with additional certifications?",
    answer: "Certifications expand your competency and credibility but generally do not expand your legal scope. Only advancing your license level fundamentally changes your scope."
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
  "headline": "What Does Scope of Practice Mean for Nurse Business Owners?",
  "description": "Scope of practice defines the legal boundaries of what nurses can do clinically. Learn how it applies to concierge nursing and nurse-owned businesses.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'definition', text: 'Definition' },
  { id: 'how-scope-applies-to-business', text: 'How Scope of Practice Applies to Your Business' },
  { id: 'scope-by-license-type', text: 'Scope by License Type' },
  { id: 'staying-within-scope', text: 'Staying Within Scope as a Business Owner' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'RN vs. NP: Do You Need an Advanced Degree?',
    description: 'How license level affects your scope in a concierge practice.',
    link: '/resources/career/concierge-nursing-rn-vs-np',
    category: 'Career Transition',
  },
  {
    title: 'Concierge Medicine vs. Concierge Nursing',
    description: 'Understanding the scope differences between these models.',
    link: '/resources/glossary/concierge-medicine-vs-concierge-nursing',
    category: 'Glossary',
  },
  {
    title: 'What Is a Nursing PLLC?',
    description: 'The business structure that recognizes your professional licensure.',
    link: '/resources/glossary/what-is-a-nursing-pllc',
    category: 'Glossary',
  },
];

export default function ScopeOfPracticeDefinition() {
  return (
    <ResourceLayout
      title="What Does Scope of Practice Mean for Nurse Business Owners?"
      description="Scope of practice defines the legal boundaries of what nurses can do clinically. Learn how it applies to concierge nursing and nurse-owned businesses."
      canonical="https://www.conciergenursesociety.com/resources/glossary/what-is-scope-of-practice-nurse-business"
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
          Scope of practice refers to the legally defined range of activities a nurse is authorized to perform based on their license type and state's nurse practice act. For nurse business owners, understanding scope of practice is critical because it determines which services you can legally offer.
        </p>
      </QuickAnswer>

      <h2 id="definition">Definition</h2>

      <p>
        Scope of practice is the legal boundary set by your state's nurse practice act and your license type (LPN/LVN, RN, or NP/APRN). Every state has its own nurse practice act, meaning scope varies from state to state. If you practice in multiple states, you must follow the rules of the state where the client is located.
      </p>

      <h2 id="how-scope-applies-to-business">How Scope of Practice Applies to Your Business</h2>

      <p>
        Your scope of practice directly determines which services you can offer in your concierge nursing business. Common questions involve whether you can perform independent assessments, administer IV therapy, provide health coaching, or prescribe medications. The answers depend entirely on your license type and state regulations.
      </p>

      <h2 id="scope-by-license-type">Scope by License Type</h2>

      <p>
        LPN/LVNs have the narrowest scope, providing basic nursing care within defined limits. RNs have broader scope including comprehensive assessments, care plans, and independent practice. NP/APRNs have the broadest scope, including the ability to diagnose and prescribe, though this varies by state. See our <Link to="/resources/career/concierge-nursing-rn-vs-np">RN vs. NP comparison</Link> for more.
      </p>

      <h2 id="staying-within-scope">Staying Within Scope as a Business Owner</h2>

      <p>
        Design your service offerings around what you can legally and competently do. Read your state's nurse practice act, consult a healthcare attorney if unsure about specific services, be clear with clients about what your services include and exclude, and refer to physicians when client needs exceed your scope.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Get Clarity on Your Scope</p>
        <p className="mb-4">
          A <Link to="/strategy" className="text-gold font-semibold hover:underline">strategy session</Link> can help you design services that align with your scope of practice and your business goals.
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
