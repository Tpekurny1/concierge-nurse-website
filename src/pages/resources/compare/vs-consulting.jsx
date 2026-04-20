import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Can I offer both concierge nursing and consulting services?",
    answer: "Yes. Some nurses maintain a concierge practice for direct client care while also offering consulting services to healthcare organizations, other nurses, or businesses. The two can complement each other, though managing both requires clear boundaries and separate marketing strategies."
  },
  {
    question: "Do nurse consultants need a nursing license?",
    answer: "It depends on what they are consulting on. If the consulting involves providing clinical assessments or direct patient care recommendations, a nursing license is required. If the consulting is purely business, operational, or educational in nature, a license may not be legally required — though it adds significant credibility."
  },
  {
    question: "Which is more scalable — concierge nursing or nurse consulting?",
    answer: "Nurse consulting is generally more scalable because it can be delivered virtually, does not require in-person visits, and can leverage group formats, courses, and digital products. Concierge nursing is inherently limited by direct service hours unless you hire other nurses."
  },
  {
    question: "Do I need different insurance for consulting versus concierge nursing?",
    answer: "Yes. Concierge nursing requires professional liability (malpractice) insurance for clinical services. Consulting typically requires professional liability insurance as well, but the coverage type may differ. If you offer both services, make sure your insurance covers all of your business activities."
  },
  {
    question: "Which has higher earning potential?",
    answer: "Both models have strong earning potential, but the paths differ. Concierge nursing income is tied to direct service hours and client volume. Consulting income can scale through higher hourly rates, retainer contracts, group programs, and productized consulting offerings. The highest-earning nurses often combine elements of both."
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
  "headline": "Concierge Nursing vs. Nurse Consulting: What Is the Difference?",
  "description": "A comparison of concierge nursing and nurse consulting as business models, including differences in services, clients, income potential, and day-to-day work.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'key-distinction', text: 'The Key Distinction' },
  { id: 'comparison-table', text: 'Detailed Comparison Table' },
  { id: 'concierge-nursing-model', text: 'The Concierge Nursing Model' },
  { id: 'nurse-consulting-model', text: 'The Nurse Consulting Model' },
  { id: 'choosing-your-path', text: 'Choosing Your Path' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'Concierge Nursing vs. Nurse Coaching',
    description: 'Another common comparison for nurses choosing an entrepreneurship path.',
    link: '/resources/compare/concierge-nursing-vs-nurse-coaching',
    category: 'Comparisons',
  },
  {
    title: 'What Is a Nurse Entrepreneur?',
    description: 'Understanding the many paths available to nurse entrepreneurs.',
    link: '/resources/glossary/what-is-a-nurse-entrepreneur',
    category: 'Glossary',
  },
  {
    title: 'What Is a Concierge Nurse?',
    description: 'The definitive guide to the concierge nursing model.',
    link: '/resources/what-is-a-concierge-nurse',
    category: 'Getting Started',
  },
];

export default function VsConsulting() {
  return (
    <ResourceLayout
      title="Concierge Nursing vs. Nurse Consulting: What Is the Difference?"
      description="A comparison of concierge nursing and nurse consulting as business models, including differences in services, clients, income potential, and day-to-day work."
      canonical="https://www.conciergenursesociety.com/resources/compare/concierge-nursing-vs-nursing-consulting"
      schema={articleSchema}
      category="Comparisons"
      categorySlug="/resources/compare"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Concierge nursing involves providing direct, hands-on clinical nursing services to individual clients in a private-pay model. Nurse consulting involves providing expert advice, strategy, and specialized knowledge to organizations, healthcare businesses, attorneys, or other professionals — typically without direct patient care. Concierge nurses serve patients and families; nurse consultants serve businesses and institutions. Some nurses combine both in their practice.
        </p>
      </QuickAnswer>

      <h2 id="key-distinction">The Key Distinction</h2>

      <p>
        The fundamental difference is who you serve and how. A concierge nurse provides clinical nursing services directly to individual clients — post-surgical care, health advocacy, medication management, wellness support. A nurse consultant provides expert knowledge and advice to organizations — healthcare facilities, law firms, insurance companies, startups, or other businesses.
      </p>

      <p>
        Both are legitimate forms of nurse entrepreneurship, but they require different skill sets, serve different markets, and create different daily work experiences.
      </p>

      <h2 id="comparison-table">Detailed Comparison Table</h2>

      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>Concierge Nursing</th>
            <th>Nurse Consulting</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Primary Client</strong></td>
            <td>Individual patients and families</td>
            <td>Organizations, businesses, attorneys, agencies</td>
          </tr>
          <tr>
            <td><strong>Core Service</strong></td>
            <td>Direct clinical nursing care</td>
            <td>Expert advice, analysis, and strategy</td>
          </tr>
          <tr>
            <td><strong>Hands-On Patient Care</strong></td>
            <td>Yes</td>
            <td>Typically no</td>
          </tr>
          <tr>
            <td><strong>Service Delivery</strong></td>
            <td>In-person (client's home, office, events)</td>
            <td>Virtual, in-person meetings, or hybrid</td>
          </tr>
          <tr>
            <td><strong>Nursing License Required</strong></td>
            <td>Yes — essential for clinical services</td>
            <td>Depends on consulting type (adds credibility)</td>
          </tr>
          <tr>
            <td><strong>Revenue Model</strong></td>
            <td>Hourly rates, packages, retainers</td>
            <td>Project fees, hourly consulting rates, retainers, contracts</td>
          </tr>
          <tr>
            <td><strong>Scalability</strong></td>
            <td>Limited by direct service hours</td>
            <td>More scalable (group consulting, courses, products)</td>
          </tr>
          <tr>
            <td><strong>Geographic Reach</strong></td>
            <td>Typically local</td>
            <td>Can be national or international</td>
          </tr>
          <tr>
            <td><strong>Marketing Focus</strong></td>
            <td>Local networking, physician referrals, community presence</td>
            <td>LinkedIn, speaking engagements, industry conferences, content marketing</td>
          </tr>
          <tr>
            <td><strong>Common Niches</strong></td>
            <td>Post-surgical, geriatric, newborn, chronic disease, wellness</td>
            <td>Legal nurse consulting, healthcare compliance, quality improvement, informatics</td>
          </tr>
          <tr>
            <td><strong>Client Relationships</strong></td>
            <td>Ongoing, personal, often emotional</td>
            <td>Professional, project-based or contractual</td>
          </tr>
          <tr>
            <td><strong>Daily Work Experience</strong></td>
            <td>Clinical care, home visits, client education</td>
            <td>Analysis, reports, meetings, presentations</td>
          </tr>
          <tr>
            <td><strong>Startup Complexity</strong></td>
            <td>Moderate (business entity, insurance, supplies)</td>
            <td>Lower (business entity, marketing, expertise positioning)</td>
          </tr>
        </tbody>
      </table>

      <h2 id="concierge-nursing-model">The Concierge Nursing Model</h2>

      <p>
        Concierge nursing keeps you in direct patient care. If the reason you became a nurse was to help people one-on-one — to assess, educate, comfort, and advocate — concierge nursing lets you do that on your own terms. Your days involve visiting clients, providing clinical services, building relationships, and making a tangible difference in individual lives.
      </p>

      <p>
        The trade-off is that your income is tied to your direct service hours (unless you scale to a <Link to="/resources/compare/solo-concierge-nurse-vs-multi-nurse-practice">multi-nurse practice</Link>), and your work is primarily local and in-person.
      </p>

      <h2 id="nurse-consulting-model">The Nurse Consulting Model</h2>

      <p>
        Nurse consulting leverages your clinical expertise in a business-to-business context. Legal nurse consultants review medical records for law firms. Healthcare compliance consultants help organizations meet regulatory requirements. Quality improvement consultants work with hospitals to improve patient outcomes. Informatics consultants help implement healthcare technology.
      </p>

      <p>
        The consulting model removes you from direct patient care, which is a benefit for some nurses and a drawback for others. Your days involve analyzing data, writing reports, attending meetings, and providing strategic recommendations. The work is intellectually stimulating but fundamentally different from bedside or clinical nursing.
      </p>

      <h2 id="choosing-your-path">Choosing Your Path</h2>

      <p><strong>Choose concierge nursing if:</strong></p>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You want to continue providing direct patient care</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>Building personal client relationships is important to you</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You prefer hands-on clinical work over analysis and strategy</span>
      </div>

      <p><strong>Choose nurse consulting if:</strong></p>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You prefer working with organizations over individual patients</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You enjoy analysis, strategy, and problem-solving at a systems level</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You want geographic flexibility and the ability to work virtually</span>
      </div>

      {/* TRACY TO FILL: Tracy's guidance on how nurses in CNBS have combined or chosen between these paths */}

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Explore Your Options</p>
        <p className="mb-4">
          If you are drawn to the concierge nursing path and want guidance on getting started, the <Link to="/start-here" className="text-gold font-semibold hover:underline">Start Here</Link> page will help you identify your next step.
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
