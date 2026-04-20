import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Do I need a business coach to start a concierge nursing practice?",
    answer: "A coach is not required, but many nurses find that working with one significantly shortens their learning curve and helps them avoid costly mistakes."
  },
  {
    question: "What should I look for in a concierge nurse business coach?",
    answer: "Look for someone with actual experience in the concierge nursing space and a track record of helping nurses build successful practices."
  },
  {
    question: "How much does a concierge nurse business coach cost?",
    answer: "Costs vary widely based on the coach's experience and format. Options range from affordable group programs to premium one-on-one coaching."
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
  "headline": "What Is a Concierge Nurse Business Coach?",
  "description": "A concierge nurse business coach helps nurses build and grow concierge nursing practices through strategic guidance, accountability, and industry expertise. Learn what they do and whether you need one.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'definition', text: 'Definition' },
  { id: 'what-a-business-coach-does', text: 'What a Business Coach Does' },
  { id: 'when-to-consider-coaching', text: 'When to Consider Coaching' },
  { id: 'what-to-look-for', text: 'What to Look For in a Coach' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Is a Nurse Entrepreneur?',
    description: 'Understanding the nurse entrepreneur path that coaches support.',
    link: '/resources/glossary/what-is-a-nurse-entrepreneur',
    category: 'Glossary',
  },
  {
    title: 'How to Leave Bedside Nursing and Start Your Own Business',
    description: 'The transition process where coaching can be most valuable.',
    link: '/resources/career/leave-bedside-nursing-start-business',
    category: 'Career Transition',
  },
  {
    title: 'What Is a Concierge Nurse?',
    description: 'Understanding the business model that specialized coaches focus on.',
    link: '/resources/what-is-a-concierge-nurse',
    category: 'Getting Started',
  },
];

export default function ConciergeNurseBusinessCoach() {
  return (
    <ResourceLayout
      title="What Is a Concierge Nurse Business Coach?"
      description="A concierge nurse business coach helps nurses build and grow concierge nursing practices through strategic guidance, accountability, and industry expertise. Learn what they do and whether you need one."
      canonical="https://www.conciergenursesociety.com/resources/glossary/what-is-a-concierge-nurse-business-coach"
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
          A concierge nurse business coach is a professional who specializes in helping nurses start, build, and grow concierge nursing businesses. They provide strategic guidance on niche selection, business setup, marketing, pricing, and practice growth using specific knowledge of the concierge nursing industry.
        </p>
      </QuickAnswer>

      <h2 id="definition">Definition</h2>

      <p>
        A concierge nurse business coach is distinct from a general business coach because they understand the specific challenges of the concierge nursing space -- scope of practice considerations, healthcare regulations, client types, and effective marketing strategies. Their role is to guide you through the process, help you avoid common pitfalls, and accelerate your progress.
      </p>

      <h2 id="what-a-business-coach-does">What a Business Coach Does</h2>

      <p>
        A business coach helps with niche clarification, business strategy, marketing guidance, accountability, problem-solving, and mindset support. They do not do the work for you but provide the framework and expertise to help you move efficiently from idea to operating practice.
      </p>

      <h2 id="when-to-consider-coaching">When to Consider Coaching</h2>

      <p>
        Coaching is particularly valuable when you are new to entrepreneurship, feel stuck or overwhelmed by decisions, want to launch faster than you could alone, or are struggling to attract clients and generate consistent revenue.
      </p>

      <h2 id="what-to-look-for">What to Look For in a Coach</h2>

      <p>
        Evaluate coaches based on industry-specific expertise, their track record with nurse clients, whether they set realistic expectations, and whether their coaching style fits your learning preferences. Be wary of coaches who guarantee specific income levels.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Work with a Specialized Coach</p>
        <p className="mb-4">
          The Concierge Nurse Business Society offers <Link to="/strategy" className="text-gold font-semibold hover:underline">strategy sessions</Link> and the <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator program</Link> designed specifically for nurses building concierge practices.
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
