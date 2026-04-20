import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Do concierge nurses make more than agency or per diem nurses?",
    answer: "Concierge nurses set their own rates, which are often higher per hour than agency per diem rates because clients are paying for personalized, dedicated service. However, concierge nurses must also account for business expenses, marketing time, and periods between clients. Total income depends on your business model, client volume, and market."
  },
  {
    question: "Can I work per diem while building a concierge nursing business?",
    answer: "Yes, and many nurses do exactly this. Per diem work offers flexibility — you can pick up shifts when you need income and decline shifts when you have concierge clients. This hybrid approach provides financial stability during the early stages of building your practice."
  },
  {
    question: "Do agencies compete with concierge nurses for clients?",
    answer: "There is some overlap, particularly in home health and private duty markets. However, concierge nursing typically serves a different segment — clients who want a higher level of personalization, continuity, and direct access to their nurse. Agency clients are often assigned whichever nurse is available, which is a fundamentally different experience."
  },
  {
    question: "Is it easier to start as a per diem nurse or a concierge nurse?",
    answer: "Starting per diem is easier because the agency handles client acquisition, scheduling, billing, and most business operations. Starting a concierge practice requires more upfront work — business setup, marketing, client acquisition — but offers greater long-term rewards in terms of income potential and professional autonomy."
  },
  {
    question: "Do I need different credentials for concierge nursing versus agency work?",
    answer: "The clinical credentials are the same — an active nursing license. However, as a concierge nurse, you also need a business entity, professional liability insurance, and potentially HIPAA compliance measures. Agency nurses rely on the agency for these administrative and compliance functions."
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
  "headline": "Concierge Nursing vs. Agency and Per Diem Nursing",
  "description": "A comparison of concierge nursing and agency or per diem nursing, including differences in pay, autonomy, client relationships, and business structure.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'key-differences', text: 'Key Differences at a Glance' },
  { id: 'comparison-table', text: 'Detailed Comparison Table' },
  { id: 'why-nurses-choose-concierge', text: 'Why Nurses Choose Concierge Over Agency' },
  { id: 'when-agency-makes-sense', text: 'When Agency or Per Diem Makes Sense' },
  { id: 'hybrid-approach', text: 'The Hybrid Approach' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'Concierge Nursing vs. Travel Nursing',
    description: 'How concierge nursing compares to travel nursing in income and lifestyle.',
    link: '/resources/compare/concierge-nursing-vs-travel-nursing',
    category: 'Comparisons',
  },
  {
    title: 'Can I Start a Concierge Nursing Business Part-Time?',
    description: 'Building your concierge practice while maintaining other nursing work.',
    link: '/resources/career/concierge-nursing-part-time',
    category: 'Career Transition',
  },
  {
    title: 'What Is Private-Pay Nursing?',
    description: 'Understanding the payment model behind concierge nursing.',
    link: '/resources/glossary/what-is-private-pay-nursing',
    category: 'Glossary',
  },
];

export default function VsAgency() {
  return (
    <ResourceLayout
      title="Concierge Nursing vs. Agency and Per Diem Nursing"
      description="A comparison of concierge nursing and agency or per diem nursing, including differences in pay, autonomy, client relationships, and business structure."
      canonical="https://www.conciergenursesociety.com/resources/compare/concierge-nursing-vs-agency-per-diem"
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
          Agency and per diem nursing offer schedule flexibility while keeping you as an employee or contractor of a staffing agency. Concierge nursing means running your own business — you find clients, set rates, and build direct relationships without a middleman. Agency work is easier to start but limits your earning potential and autonomy. Concierge nursing requires more business effort but gives you full control over your practice and income.
        </p>
      </QuickAnswer>

      <h2 id="key-differences">Key Differences at a Glance</h2>

      <p>
        The fundamental difference is ownership. Agency and per diem nurses work within someone else's system — the agency finds clients, sets rates, handles billing, and takes a significant cut of what the client pays. Concierge nurses own the entire relationship and keep the full value of their services.
      </p>

      <p>
        Both paths offer more flexibility than a permanent staff position, which is why many nurses explore both options. Understanding the trade-offs helps you make the right choice for your goals and current situation.
      </p>

      <h2 id="comparison-table">Detailed Comparison Table</h2>

      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>Concierge Nursing</th>
            <th>Agency / Per Diem Nursing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Employment Status</strong></td>
            <td>Business owner</td>
            <td>Agency employee or independent contractor</td>
          </tr>
          <tr>
            <td><strong>Client Acquisition</strong></td>
            <td>You find and attract your own clients</td>
            <td>Agency assigns you to clients or facilities</td>
          </tr>
          <tr>
            <td><strong>Rate Setting</strong></td>
            <td>You set your own rates</td>
            <td>Agency sets your pay rate</td>
          </tr>
          <tr>
            <td><strong>Revenue</strong></td>
            <td>You keep 100% of what clients pay</td>
            <td>Agency takes a percentage (often significant)</td>
          </tr>
          <tr>
            <td><strong>Schedule Control</strong></td>
            <td>Full control — you choose when and how much you work</td>
            <td>Flexible — you choose which shifts to accept</td>
          </tr>
          <tr>
            <td><strong>Client Continuity</strong></td>
            <td>Ongoing relationships with your clients</td>
            <td>Different patients/facilities each shift</td>
          </tr>
          <tr>
            <td><strong>Service Design</strong></td>
            <td>You design your services, packages, and approach</td>
            <td>You follow the care plan and agency protocols</td>
          </tr>
          <tr>
            <td><strong>Documentation</strong></td>
            <td>Your own system (within compliance requirements)</td>
            <td>Agency documentation requirements</td>
          </tr>
          <tr>
            <td><strong>Business Overhead</strong></td>
            <td>You handle insurance, marketing, taxes, supplies</td>
            <td>Agency handles most business operations</td>
          </tr>
          <tr>
            <td><strong>Liability Insurance</strong></td>
            <td>You purchase your own</td>
            <td>Agency typically provides coverage</td>
          </tr>
          <tr>
            <td><strong>Income Ceiling</strong></td>
            <td>No ceiling — limited by your business growth</td>
            <td>Capped by agency pay rates and available shifts</td>
          </tr>
          <tr>
            <td><strong>Work Setting</strong></td>
            <td>Client homes, offices, events</td>
            <td>Facilities, client homes (as assigned)</td>
          </tr>
          <tr>
            <td><strong>Professional Growth</strong></td>
            <td>Unlimited — you build a business and reputation</td>
            <td>Limited to clinical experience across settings</td>
          </tr>
        </tbody>
      </table>

      <h2 id="why-nurses-choose-concierge">Why Nurses Choose Concierge Over Agency</h2>

      <h3>Eliminating the Middleman</h3>
      <p>
        When you work through an agency, the client may pay a significant hourly rate, but you receive a fraction of that amount. The agency takes its cut for finding the client, handling scheduling, and managing billing. In concierge nursing, you receive the full value of your services.
      </p>

      <h3>Building Something of Your Own</h3>
      <p>
        Agency work, like any employment, does not build equity. When you stop working, the income stops. A concierge nursing practice is a business asset — it has a reputation, a client base, referral relationships, and systems that create value beyond your individual hours of work.
      </p>

      <h3>Client Relationships</h3>
      <p>
        Agency nurses rarely see the same client twice. Concierge nurses build ongoing relationships with clients who know and trust them. This continuity leads to better care outcomes, higher client satisfaction, and more fulfilling work for the nurse.
      </p>

      <h3>Service Design Freedom</h3>
      <p>
        As a concierge nurse, you decide what services to offer, how to deliver them, and what to charge. Agency nurses follow prescribed care plans and agency protocols. If you have ideas about how to better serve clients, concierge nursing gives you the freedom to implement them.
      </p>

      <h2 id="when-agency-makes-sense">When Agency or Per Diem Makes Sense</h2>

      <p>
        Agency and per diem nursing are not inferior choices — they serve different needs:
      </p>

      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span><strong>Immediate income:</strong> If you need income now, agency work provides immediate paychecks without the startup period of a new business</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span><strong>No business management:</strong> If you want flexibility without the responsibility of running a business, agency work provides that</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span><strong>Diverse experience:</strong> Working across different facilities and patient populations builds clinical breadth</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span><strong>Bridge income:</strong> Per diem work is an excellent way to earn while building your concierge practice on the side</span>
      </div>

      <h2 id="hybrid-approach">The Hybrid Approach</h2>

      <p>
        Many nurses use a hybrid strategy: working per diem shifts for steady income while building their concierge practice on the side. As the concierge business grows and generates consistent revenue, they gradually reduce their agency shifts. This approach minimizes financial risk and allows for a smooth transition.
      </p>

      <p>
        Learn more about building your practice alongside other work in our guide to <Link to="/resources/career/concierge-nursing-part-time">starting a concierge nursing business part-time</Link>.
      </p>

      {/* TRACY TO FILL: Tracy's advice on using the hybrid approach effectively */}

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Ready for Full Autonomy?</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> helps nurses transition from agency or per diem work to building their own concierge nursing practice.
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
