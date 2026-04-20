import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Can I do travel nursing and concierge nursing at the same time?",
    answer: "It is possible but challenging. Some nurses use travel nursing income to fund their concierge business startup, then transition once their concierge practice is established. Running both simultaneously is difficult because travel assignments require full-time commitment in a specific location, which limits your ability to serve concierge clients consistently."
  },
  {
    question: "Do travel nurses or concierge nurses make more money?",
    answer: "Travel nursing often provides higher short-term pay, especially during high-demand periods. However, travel nurse income fluctuates with market demand, and rates have varied significantly over time. Concierge nursing income builds more slowly but can be more stable and sustainable long-term as your practice grows. Neither guarantees a specific income level."
  },
  {
    question: "Is concierge nursing less stressful than travel nursing?",
    answer: "Many nurses find concierge nursing less stressful because you control your schedule, client load, and practice environment. Travel nursing involves the stress of frequently relocating, adapting to new facilities, and working in understaffed environments. However, concierge nursing adds the stress of running a business, which is a different kind of pressure."
  },
  {
    question: "Can I transition from travel nursing to concierge nursing?",
    answer: "Absolutely. Travel nursing builds diverse clinical experience across settings, patient populations, and geographic areas. This breadth of experience is valuable in concierge nursing. Some travel nurses also save aggressively during assignments to fund their concierge business startup."
  },
  {
    question: "Which is better for long-term career sustainability?",
    answer: "Concierge nursing generally offers better long-term sustainability. Travel nursing is physically and emotionally demanding, and the constant relocation can become exhausting over time. Concierge nursing allows you to build a local practice, deepen client relationships, and create a business asset that can grow over the years."
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
  "headline": "Concierge Nursing vs. Travel Nursing: Income and Lifestyle Comparison",
  "description": "A comprehensive comparison of concierge nursing and travel nursing, covering income potential, lifestyle factors, career sustainability, and how to choose between them.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'two-different-paths', text: 'Two Very Different Career Paths' },
  { id: 'comparison-table', text: 'Side-by-Side Comparison' },
  { id: 'income-comparison', text: 'Income Comparison' },
  { id: 'lifestyle-comparison', text: 'Lifestyle Comparison' },
  { id: 'long-term-outlook', text: 'Long-Term Career Outlook' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'Concierge Nursing vs. Agency and Per Diem Nursing',
    description: 'Another comparison for nurses evaluating flexible nursing career paths.',
    link: '/resources/compare/concierge-nursing-vs-agency-per-diem',
    category: 'Comparisons',
  },
  {
    title: 'How to Leave Bedside Nursing and Start Your Own Business',
    description: 'A guide for nurses ready to transition out of traditional roles.',
    link: '/resources/career/leave-bedside-nursing-start-business',
    category: 'Career Transition',
  },
  {
    title: 'What Is a Cash-Pay Nursing Practice?',
    description: 'Understanding the private-pay model that concierge nurses use.',
    link: '/resources/glossary/what-is-a-cash-pay-nursing-practice',
    category: 'Glossary',
  },
];

export default function VsTravelNursing() {
  return (
    <ResourceLayout
      title="Concierge Nursing vs. Travel Nursing: Income and Lifestyle Comparison"
      description="A comprehensive comparison of concierge nursing and travel nursing, covering income potential, lifestyle factors, career sustainability, and how to choose between them."
      canonical="https://www.conciergenursesociety.com/resources/compare/concierge-nursing-vs-travel-nursing"
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
          Travel nursing and concierge nursing both offer alternatives to traditional staff nursing, but they are fundamentally different. Travel nursing provides short-term, high-paying contracts at facilities nationwide — you are still an employee working someone else's schedule. Concierge nursing means owning your own practice, setting your own rates, and building long-term client relationships locally. Travel nursing offers immediate higher income; concierge nursing offers greater long-term autonomy and sustainability.
        </p>
      </QuickAnswer>

      <h2 id="two-different-paths">Two Very Different Career Paths</h2>

      <p>
        Both travel nursing and concierge nursing attract nurses who want more flexibility, better compensation, and an alternative to permanent staff positions. But the similarities largely end there. Travel nursing is still employment — with a staffing agency, working in facilities, on someone else's schedule. Concierge nursing is entrepreneurship — you are the business owner, making all the decisions.
      </p>

      <h2 id="comparison-table">Side-by-Side Comparison</h2>

      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>Concierge Nursing</th>
            <th>Travel Nursing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Employment Status</strong></td>
            <td>Self-employed business owner</td>
            <td>Employee of staffing agency</td>
          </tr>
          <tr>
            <td><strong>Work Setting</strong></td>
            <td>Client homes, offices, events</td>
            <td>Hospitals and healthcare facilities</td>
          </tr>
          <tr>
            <td><strong>Geographic Flexibility</strong></td>
            <td>Local practice area (typically)</td>
            <td>Nationwide assignments</td>
          </tr>
          <tr>
            <td><strong>Schedule Control</strong></td>
            <td>You set your own schedule entirely</td>
            <td>Facility-determined shifts (12-hour shifts common)</td>
          </tr>
          <tr>
            <td><strong>Income Timing</strong></td>
            <td>Builds over time as practice grows</td>
            <td>Immediate (paychecks from day one of assignment)</td>
          </tr>
          <tr>
            <td><strong>Income Stability</strong></td>
            <td>Variable early on, stabilizes with established client base</td>
            <td>Variable (depends on contract availability and rates)</td>
          </tr>
          <tr>
            <td><strong>Benefits</strong></td>
            <td>Self-funded (health insurance, retirement, etc.)</td>
            <td>Agency-provided (varies by agency)</td>
          </tr>
          <tr>
            <td><strong>Housing</strong></td>
            <td>Your own home</td>
            <td>Temporary housing (stipend or agency-provided)</td>
          </tr>
          <tr>
            <td><strong>Patient Relationships</strong></td>
            <td>Ongoing, deep client relationships</td>
            <td>Short-term patient contacts (8-13 week assignments)</td>
          </tr>
          <tr>
            <td><strong>Business Skills Required</strong></td>
            <td>Yes — marketing, sales, finance, operations</td>
            <td>Minimal (agency handles most business aspects)</td>
          </tr>
          <tr>
            <td><strong>Startup Investment</strong></td>
            <td>Business formation, insurance, marketing costs</td>
            <td>Minimal (may need to cover initial travel costs)</td>
          </tr>
          <tr>
            <td><strong>Physical Demands</strong></td>
            <td>Varies by niche (generally less than bedside)</td>
            <td>Full bedside nursing (12-hour shifts, high acuity)</td>
          </tr>
          <tr>
            <td><strong>Career Longevity</strong></td>
            <td>Highly sustainable long-term</td>
            <td>Physically demanding; many travel nurses burn out within a few years</td>
          </tr>
          <tr>
            <td><strong>Building an Asset</strong></td>
            <td>Yes — your business is an asset that grows over time</td>
            <td>No — you are trading time for money with no equity</td>
          </tr>
        </tbody>
      </table>

      <h2 id="income-comparison">Income Comparison</h2>

      <p>
        Travel nursing often provides higher immediate compensation, particularly during periods of high demand. Travel nurse pay packages typically include an hourly rate plus housing stipends, travel reimbursements, and other benefits that can result in significant total compensation.
      </p>

      <p>
        However, travel nurse income is not guaranteed. Contract rates fluctuate based on facility demand, geographic location, specialty, and market conditions. What was a high-paying assignment one year may pay significantly less the next.
      </p>

      <p>
        Concierge nursing income typically starts lower and builds over time as you establish your practice and client base. The advantage is that you are building a business asset — as your reputation grows, your referral network expands, and your client base becomes more established, your income potential increases. You also set your own rates based on the value you provide, rather than accepting what an agency offers.
      </p>

      {/* TRACY TO FILL: General guidance on the income trajectory Tracy observes for concierge nursing startups (no specific numbers) */}

      <h2 id="lifestyle-comparison">Lifestyle Comparison</h2>

      <h3>Stability and Roots</h3>
      <p>
        Travel nursing requires frequent relocation — often every 8 to 13 weeks. This appeals to some nurses but becomes exhausting for others, particularly those with families, pets, or a desire for community roots. Concierge nursing allows you to build your practice in your own community and sleep in your own bed.
      </p>

      <h3>Autonomy</h3>
      <p>
        Concierge nursing offers far more autonomy. You choose your clients, set your hours, determine your services, and run your business on your terms. Travel nurses have more autonomy than staff nurses in choosing where and when they work, but once on assignment, they work the facility's schedule and follow the facility's protocols.
      </p>

      <h3>Professional Relationships</h3>
      <p>
        Travel nursing involves constantly meeting new colleagues and patients, which can be stimulating but also isolating. Concierge nursing allows you to build deep, ongoing relationships with clients and develop a professional network in your community.
      </p>

      <h2 id="long-term-outlook">Long-Term Career Outlook</h2>

      <p>
        Concierge nursing has a stronger long-term outlook for most nurses. You are building a business that can grow, evolve, and potentially be sold or expanded. Travel nursing, while lucrative in the short term, does not build equity — once you stop taking assignments, the income stops.
      </p>

      <p>
        Many nurses use travel nursing as a stepping stone, saving aggressively during assignments to fund a transition into business ownership. This can be an effective strategy if you approach it intentionally.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Ready to Build Something of Your Own?</p>
        <p className="mb-4">
          If you are considering the shift from travel nursing to business ownership, <Link to="/start-here" className="text-gold font-semibold hover:underline">start here</Link> to explore the concierge nursing path.
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
