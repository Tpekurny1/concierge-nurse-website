import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const faqItems = [
  {
    question: "Can I work as both a concierge nurse and a private duty nurse?",
    answer: "Yes. Many nurses combine models, especially when building their concierge practice. You can take agency shifts for steady income while growing your private client base on the side."
  },
  {
    question: "Do concierge nurses need different credentials than private duty or home health nurses?",
    answer: "All three require an active nursing license. Concierge nurses who start their own business also need business-related items like liability insurance and a business license."
  },
  {
    question: "Which model pays the most?",
    answer: "Concierge nursing generally has the highest earning potential because you set your own rates. However, income varies widely based on your niche, location, and business skills."
  },
  {
    question: "Is concierge nursing legal in all states?",
    answer: "Concierge nursing is legal, but regulations vary by state. You must operate within your nursing scope of practice and comply with state business regulations."
  },
  {
    question: "Do home health nurses work for themselves?",
    answer: "Typically, no. Home health nurses work as employees of Medicare-certified home health agencies that handle client intake, care plans, billing, and compliance."
  },
  {
    question: "Can a concierge nurse bill insurance?",
    answer: "Most concierge nurses operate on a private-pay basis. This eliminates insurance paperwork, allows you to set your own rates, and lets you spend more time on patient care."
  },
  {
    question: "What is the biggest difference between concierge nursing and private duty nursing?",
    answer: "Autonomy. Private duty nurses typically work through agencies that control assignments and pay. Concierge nurses run their own businesses and define everything from clients to rates to services."
  },
  {
    question: "How do I transition from home health or private duty to concierge nursing?",
    answer: "Start by identifying the services and clients you want to serve, then set up your business foundations while still working your current role. Many nurses make a gradual transition."
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

const headings = [
  { id: "quick-answer", text: "Quick Answer" },
  { id: "overview-concierge-nursing", text: "What Is Concierge Nursing?" },
  { id: "overview-private-duty", text: "What Is Private Duty Nursing?" },
  { id: "overview-home-health", text: "What Is Home Health Nursing?" },
  { id: "side-by-side-comparison", text: "Side-by-Side Comparison" },
  { id: "which-model-right-for-you", text: "Which Model Is Right for You?" },
  { id: "can-you-combine-models", text: "Can You Combine Models?" },
  { id: "faq", text: "Frequently Asked Questions" },
];

export default function ConciergeVsPrivateDutyVsHomeHealth() {
  return (
    <ResourceLayout
      title="Concierge Nursing vs. Private Duty Nursing vs. Home Health: What Is the Difference?"
      description="Understand the differences between concierge nursing, private duty nursing, and home health nursing. Compare business models, pay structures, client types, regulations, and which is right for your career."
      canonical="https://www.conciergenursesociety.com/resources/concierge-nursing-vs-private-duty-vs-home-health"
      category="Compare"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={[
        {
          title: "What Is a Concierge Nurse?",
          description: "A complete overview of what concierge nurses do, who they serve, and how this practice model works.",
          link: "/resources/what-is-a-concierge-nurse",
          category: "Guides"
        },
        {
          title: "How to Start a Concierge Nursing Business",
          description: "Step-by-step guide to launching your own concierge nursing practice from scratch.",
          link: "/resources/how-to-start-concierge-nursing-business",
          category: "Guides"
        },
        {
          title: "Leaving Bedside Nursing for Concierge Nursing",
          description: "A practical guide for hospital nurses considering the transition to concierge nursing.",
          link: "/resources/leave-bedside-nursing-for-concierge",
          category: "Career"
        }
      ]}
      cta={{
        title: "Find Your Path in Nursing",
        description: "Not sure which model is right for you? Take our guided assessment to find the best fit for your skills, goals, and lifestyle.",
        buttonText: "Find Your Path",
        buttonLink: "/start-here"
      }}
      faqSchema={faqSchema}
    >
      {/* Quick Answer */}
      <h2 id="quick-answer" className="font-heading text-2xl font-bold text-navy mb-4">Quick Answer</h2>
      <QuickAnswer>
        <p>
          Concierge nursing, private duty nursing, and home health nursing are three distinct models of nursing care. The core difference is how they are structured: concierge nurses run their own businesses and serve private-pay clients, private duty nurses typically work through agencies providing extended one-on-one care, and home health nurses deliver insurance-covered skilled nursing visits through certified agencies.
        </p>
      </QuickAnswer>

      <p>
        If you are a nurse exploring your options beyond the hospital, you have likely come across all three terms and found them confusing. This guide breaks down the real differences so you can make an informed career decision.
      </p>

      {/* Overview: Concierge Nursing */}
      <h2 id="overview-concierge-nursing" className="font-heading text-2xl font-bold text-navy mb-4">What Is Concierge Nursing?</h2>
      <p>
        Concierge nursing is a business model where a registered nurse provides personalized, premium healthcare services directly to private-pay clients. The nurse operates as an independent business owner -- setting their own rates, choosing their clients, and managing their schedule. Services range from wellness visits and post-surgical care to health advocacy and care coordination.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers how to build a concierge nursing business from the ground up inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Overview: Private Duty Nursing */}
      <h2 id="overview-private-duty" className="font-heading text-2xl font-bold text-navy mb-4">What Is Private Duty Nursing?</h2>
      <p>
        Private duty nursing involves providing extended, one-on-one nursing care to a single patient, typically in the patient's home. Private duty nurses usually work through staffing agencies, with shifts often lasting 8-12 hours. The focus is on continuous care for patients with complex medical needs. The agency handles scheduling, client matching, billing, and compliance, and sets the nurse's pay rate.
      </p>

      {/* Overview: Home Health Nursing */}
      <h2 id="overview-home-health" className="font-heading text-2xl font-bold text-navy mb-4">What Is Home Health Nursing?</h2>
      <p>
        Home health nursing is a regulated, insurance-reimbursed form of skilled nursing care provided in the patient's home. Home health nurses work for certified agencies, their visits are physician-ordered, and they follow structured care plans. Visits are typically short (30-60 minutes) and focus on specific skilled nursing tasks. Documentation requirements are extensive.
      </p>

      {/* Side-by-Side Comparison */}
      <h2 id="side-by-side-comparison" className="font-heading text-2xl font-bold text-navy mb-4">Side-by-Side Comparison</h2>
      <p>
        The following table breaks down the key differences across all three models.
      </p>

      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>Concierge Nursing</th>
            <th>Private Duty Nursing</th>
            <th>Home Health Nursing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Employment Type</strong></td>
            <td>Self-employed / business owner</td>
            <td>Employee or contractor of an agency</td>
            <td>Employee of a certified agency</td>
          </tr>
          <tr>
            <td><strong>Payment Source</strong></td>
            <td>Private pay (client pays directly)</td>
            <td>Agency pays nurse; funding varies</td>
            <td>Medicare, Medicaid, or insurance</td>
          </tr>
          <tr>
            <td><strong>Schedule Control</strong></td>
            <td>Full control</td>
            <td>Agency assigns shifts</td>
            <td>Agency sets caseload</td>
          </tr>
          <tr>
            <td><strong>Income Potential</strong></td>
            <td>Highest ceiling -- you set rates</td>
            <td>Moderate -- agency sets pay</td>
            <td>Moderate -- salary or per-visit pay</td>
          </tr>
          <tr>
            <td><strong>Autonomy</strong></td>
            <td>High</td>
            <td>Limited</td>
            <td>Limited</td>
          </tr>
          <tr>
            <td><strong>Startup Cost</strong></td>
            <td>Moderate -- business setup required</td>
            <td>Low -- agency provides resources</td>
            <td>None -- you are an employee</td>
          </tr>
          <tr>
            <td><strong>Benefits</strong></td>
            <td>None -- you provide your own</td>
            <td>Varies by agency</td>
            <td>Typically offered by agency</td>
          </tr>
        </tbody>
      </table>

      {/* Which Model Is Right for You? */}
      <h2 id="which-model-right-for-you" className="font-heading text-2xl font-bold text-navy mb-4">Which Model Is Right for You?</h2>
      <p>
        Choosing between these three models depends on your career goals, risk tolerance, financial situation, and personality. Concierge nursing offers the most autonomy and earning potential but requires entrepreneurial skills. Private duty provides stability without the business overhead. Home health offers predictable employment with benefits but the least flexibility.
      </p>

      <p>
        There is no universally "best" option -- only the best option for where you are right now and where you want to go.
      </p>

      <p className="text-navy font-medium mt-4">Tracy helps nurses figure out their best path and build a transition plan inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> and through <Link to="/strategy" className="text-gold hover:underline">Strategy Sessions</Link>.</p>

      {/* Can You Combine Models? */}
      <h2 id="can-you-combine-models" className="font-heading text-2xl font-bold text-navy mb-4">Can You Combine Models?</h2>
      <p>
        Absolutely -- and many nurses do, especially during transitions. Combining models can provide income stability while you build your concierge practice, give you broader experience, and help you test different service types before committing fully to one path.
      </p>

      <div className="bg-gold/5 border border-gold/20 p-6 mb-6">
        <p className="font-heading text-lg font-semibold text-navy mb-2">Important Consideration</p>
        <p>
          If you are combining models, review any non-compete or exclusivity clauses in your employment or agency contracts. Some agencies restrict their nurses from providing similar services independently.
        </p>
      </div>

      <p className="text-navy font-medium mt-4">Tracy covers the exact strategy for transitioning between models inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* FAQ */}
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
