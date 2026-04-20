import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Can concierge nurses and concierge medicine doctors work together?",
    answer: "Yes, and many do. Concierge nurses can complement concierge medicine practices by providing hands-on care, patient education, and coordination the physician may not have time for."
  },
  {
    question: "Do clients confuse concierge nursing with concierge medicine?",
    answer: "Sometimes. It is important to clearly communicate that you provide nursing-level services, not diagnoses, prescriptions, or medical treatment plans."
  },
  {
    question: "Is concierge nursing cheaper than concierge medicine?",
    answer: "Generally yes. Concierge medicine often involves significant annual retainers, while concierge nursing is typically priced per visit or package, making it more accessible."
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
  "headline": "What Is the Difference Between Concierge Medicine and Concierge Nursing?",
  "description": "Concierge medicine is physician-led primary care with annual retainer fees. Concierge nursing is nurse-led private-pay care focused on support services. Learn the key differences.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'definition', text: 'The Key Differences' },
  { id: 'concierge-medicine', text: 'What Is Concierge Medicine?' },
  { id: 'concierge-nursing', text: 'What Is Concierge Nursing?' },
  { id: 'how-they-complement', text: 'How They Complement Each Other' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Is a Concierge Nurse?',
    description: 'The definitive guide to concierge nursing.',
    link: '/resources/what-is-a-concierge-nurse',
    category: 'Getting Started',
  },
  {
    title: 'RN vs. NP: Do You Need an Advanced Degree?',
    description: 'Understanding the credential differences that affect what you can offer.',
    link: '/resources/career/concierge-nursing-rn-vs-np',
    category: 'Career Transition',
  },
  {
    title: 'What Does Scope of Practice Mean for Nurse Business Owners?',
    description: 'Understanding the boundaries of nurse-led services.',
    link: '/resources/glossary/what-is-scope-of-practice-nurse-business',
    category: 'Glossary',
  },
];

export default function ConciergeMedicineVsNursing() {
  return (
    <ResourceLayout
      title="What Is the Difference Between Concierge Medicine and Concierge Nursing?"
      description="Concierge medicine is physician-led primary care with annual retainer fees. Concierge nursing is nurse-led private-pay care focused on support services. Learn the key differences."
      canonical="https://www.conciergenursesociety.com/resources/glossary/concierge-medicine-vs-concierge-nursing"
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
          Concierge medicine is a physician-led model where patients pay an annual retainer for enhanced access to their doctor. Concierge nursing is a nurse-led model where clients pay for private nursing services such as post-surgical care, health advocacy, and wellness support. The two models serve different needs and are often complementary rather than competitive.
        </p>
      </QuickAnswer>

      <h2 id="definition">The Key Differences</h2>

      <p>
        Both models use the word "concierge" to describe personalized, private-pay healthcare, but they differ significantly in who provides the care, what services are offered, and how the business is structured.
      </p>

      <h2 id="concierge-medicine">What Is Concierge Medicine?</h2>

      <p>
        Concierge medicine is a practice model where physicians charge patients an annual retainer fee for enhanced access, longer appointments, and comprehensive preventive care. These physicians are licensed MDs or DOs who diagnose, prescribe, and provide the full scope of medical care with smaller patient panels.
      </p>

      <h2 id="concierge-nursing">What Is Concierge Nursing?</h2>

      <p>
        <Link to="/resources/what-is-a-concierge-nurse">Concierge nursing</Link> is a nurse-led model providing private-pay services within the nursing scope of practice, including health assessments, post-surgical support, medication management, care coordination, and patient education. Concierge nurses fill the gaps that physicians do not have time to address -- the hands-on support, education, and advocacy that patients need.
      </p>

      <h2 id="how-they-complement">How They Complement Each Other</h2>

      <p>
        Rather than competing, these models serve complementary roles. The physician diagnoses and treats, while the concierge nurse supports recovery, educates, and coordinates care. Concierge nursing is more accessible at a lower cost, and concierge nurses can extend a physician's reach through in-home monitoring and follow-up.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Learn More About Concierge Nursing</p>
        <p className="mb-4">
          Read our <Link to="/resources/what-is-a-concierge-nurse" className="text-gold font-semibold hover:underline">complete guide to concierge nursing</Link> or explore the <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> to start building your practice.
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
