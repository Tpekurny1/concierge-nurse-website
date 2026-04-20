import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "Can I be both a concierge nurse and a nurse coach?",
    answer: "Yes. Some nurses incorporate coaching elements into their concierge practice, such as health behavior coaching or wellness goal-setting. Others maintain separate concierge nursing and coaching services. The key is to be clear about when you are providing clinical nursing services (which require your nursing license) versus coaching services (which typically do not)."
  },
  {
    question: "Do nurse coaches need a nursing license?",
    answer: "It depends on what they are doing. General health and wellness coaching does not require a nursing license. However, if a nurse coach is providing clinical assessments, medical advice, or nursing-specific services, they need an active nursing license. The distinction matters for liability, scope of practice, and how you market your services."
  },
  {
    question: "Which makes more money — concierge nursing or nurse coaching?",
    answer: "Income varies widely in both models and depends on your niche, pricing, client volume, and business skills. Concierge nursing income is typically tied to direct service hours, while nurse coaching can be more scalable through group programs, courses, and digital products. Neither model guarantees higher income than the other."
  },
  {
    question: "Do I need a coaching certification to be a nurse coach?",
    answer: "A coaching certification is not legally required in most states, but it adds credibility and teaches coaching-specific skills that differ from clinical nursing skills. Organizations like the American Holistic Nurses Association offer board certification in nurse coaching. If coaching is a core part of your business, a certification is worth considering."
  },
  {
    question: "Which model is better for work-life balance?",
    answer: "Both models offer significantly more flexibility than traditional nursing employment. Nurse coaching may offer slightly more flexibility since sessions can be conducted virtually and coaches can create passive income through digital products. Concierge nursing often requires in-person visits, but you still control your schedule and client load."
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
  "headline": "Concierge Nursing vs. Nurse Coaching: What Is the Difference?",
  "description": "A detailed comparison of concierge nursing and nurse coaching business models, including services, income potential, licensing requirements, and which is right for you.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'overview', text: 'Concierge Nursing vs. Nurse Coaching: Overview' },
  { id: 'detailed-comparison', text: 'Detailed Comparison Table' },
  { id: 'concierge-nursing-explained', text: 'What Concierge Nursing Involves' },
  { id: 'nurse-coaching-explained', text: 'What Nurse Coaching Involves' },
  { id: 'which-is-right-for-you', text: 'Which Is Right for You?' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Is a Concierge Nurse?',
    description: 'The definitive guide to the concierge nursing model.',
    link: '/resources/what-is-a-concierge-nurse',
    category: 'Getting Started',
  },
  {
    title: 'Concierge Nursing vs. Nurse Consulting',
    description: 'Another common comparison for nurses exploring entrepreneurship.',
    link: '/resources/compare/concierge-nursing-vs-nursing-consulting',
    category: 'Comparisons',
  },
  {
    title: 'What Is a Nurse Entrepreneur?',
    description: 'Understanding the broader nurse entrepreneur landscape.',
    link: '/resources/glossary/what-is-a-nurse-entrepreneur',
    category: 'Glossary',
  },
];

export default function VsNurseCoaching() {
  return (
    <ResourceLayout
      title="Concierge Nursing vs. Nurse Coaching: What Is the Difference?"
      description="A detailed comparison of concierge nursing and nurse coaching business models, including services, income potential, licensing requirements, and which is right for you."
      canonical="https://www.conciergenursesociety.com/resources/compare/concierge-nursing-vs-nurse-coaching"
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
          Concierge nursing and nurse coaching are both nurse entrepreneurship paths, but they differ in scope. Concierge nurses provide hands-on clinical nursing services (assessments, wound care, medication management, care coordination) directly to clients in a private-pay model. Nurse coaches focus on helping clients achieve health goals through coaching conversations, behavior change strategies, and accountability — without providing direct clinical care. Some nurses combine elements of both in their practice.
        </p>
      </QuickAnswer>

      <h2 id="overview">Concierge Nursing vs. Nurse Coaching: Overview</h2>

      <p>
        Both concierge nursing and nurse coaching allow nurses to work independently outside of traditional healthcare employment. However, they serve different client needs and require different skill sets. Understanding these differences will help you choose the model — or combination — that best fits your goals.
      </p>

      <p>
        Concierge nursing is rooted in clinical care. You are using your nursing license to provide hands-on services. Nurse coaching is rooted in behavioral and motivational support. You may draw on your nursing knowledge, but the service itself is coaching, not clinical care.
      </p>

      <h2 id="detailed-comparison">Detailed Comparison Table</h2>

      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>Concierge Nursing</th>
            <th>Nurse Coaching</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Primary Service</strong></td>
            <td>Clinical nursing care and health services</td>
            <td>Health behavior coaching and goal support</td>
          </tr>
          <tr>
            <td><strong>Nursing License Required</strong></td>
            <td>Yes — active license essential</td>
            <td>Not always (depends on services offered)</td>
          </tr>
          <tr>
            <td><strong>Hands-On Clinical Care</strong></td>
            <td>Yes (assessments, procedures, medication management)</td>
            <td>No (coaching conversations, not clinical care)</td>
          </tr>
          <tr>
            <td><strong>Service Delivery</strong></td>
            <td>Primarily in-person (client's home, office, events)</td>
            <td>Often virtual (phone, video sessions)</td>
          </tr>
          <tr>
            <td><strong>Client Relationship</strong></td>
            <td>Nurse-patient relationship with clinical responsibilities</td>
            <td>Coach-client relationship focused on goals</td>
          </tr>
          <tr>
            <td><strong>Revenue Model</strong></td>
            <td>Hourly rates, packages, or retainers for clinical services</td>
            <td>Session packages, group programs, courses, digital products</td>
          </tr>
          <tr>
            <td><strong>Scalability</strong></td>
            <td>Limited by direct service hours (unless you hire other nurses)</td>
            <td>More scalable through group sessions and digital products</td>
          </tr>
          <tr>
            <td><strong>Malpractice Insurance</strong></td>
            <td>Required — clinical liability coverage</td>
            <td>Recommended — professional liability coverage</td>
          </tr>
          <tr>
            <td><strong>Scope of Practice</strong></td>
            <td>Governed by state nurse practice act</td>
            <td>Less regulated (if not providing clinical services)</td>
          </tr>
          <tr>
            <td><strong>HIPAA Requirements</strong></td>
            <td>Typically applies (handling protected health information)</td>
            <td>May or may not apply depending on service structure</td>
          </tr>
          <tr>
            <td><strong>Startup Complexity</strong></td>
            <td>Moderate (business entity, insurance, supplies, contracts)</td>
            <td>Lower (business entity, coaching platform, marketing)</td>
          </tr>
          <tr>
            <td><strong>Geographic Limitation</strong></td>
            <td>Typically local (in-person service area)</td>
            <td>Can serve clients anywhere (virtual delivery)</td>
          </tr>
          <tr>
            <td><strong>Additional Credentials</strong></td>
            <td>Niche-specific certifications (wound care, IV therapy, etc.)</td>
            <td>Coaching certification (recommended, not required)</td>
          </tr>
          <tr>
            <td><strong>Best For</strong></td>
            <td>Nurses who want to provide clinical care independently</td>
            <td>Nurses who want to focus on education and behavior change</td>
          </tr>
        </tbody>
      </table>

      <h2 id="concierge-nursing-explained">What Concierge Nursing Involves</h2>

      <p>
        Concierge nursing is a clinical practice. You are providing nursing services — assessments, monitoring, wound care, medication management, care coordination, patient education — directly to clients who pay you out of pocket. Your nursing license is the foundation of your business, and your services fall within your state's <Link to="/resources/glossary/what-is-scope-of-practice-nurse-business">scope of practice</Link>.
      </p>

      <p>
        The concierge model appeals to nurses who want to continue providing hands-on patient care but want the autonomy, flexibility, and client relationships that are difficult to achieve in a hospital or agency setting. Learn more about the concierge model in our <Link to="/resources/what-is-a-concierge-nurse">comprehensive guide</Link>.
      </p>

      <h2 id="nurse-coaching-explained">What Nurse Coaching Involves</h2>

      <p>
        Nurse coaching is a non-clinical service focused on helping clients set and achieve health-related goals. A nurse coach might help clients with weight management, stress reduction, chronic disease self-management, lifestyle changes, or overall wellness optimization.
      </p>

      <p>
        The coaching relationship is collaborative — the coach does not prescribe or direct, but rather guides the client through a process of self-discovery, goal-setting, and accountability. Sessions are typically conducted by phone or video and can be offered individually or in groups.
      </p>

      <p>
        Nurse coaching is attractive to nurses who enjoy the education and relationship aspects of nursing more than the clinical procedures. It also offers greater geographic flexibility since services can be delivered virtually.
      </p>

      <h2 id="which-is-right-for-you">Which Is Right for You?</h2>

      <p><strong>Choose concierge nursing if:</strong></p>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You want to provide direct, hands-on clinical care</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You enjoy the clinical aspects of nursing — assessments, procedures, medication management</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You want to serve clients in person and build local relationships</span>
      </div>

      <p><strong>Choose nurse coaching if:</strong></p>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You prefer education, motivation, and behavioral support over clinical procedures</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You want location flexibility and the ability to serve clients virtually</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You are interested in building scalable offerings like group programs or courses</span>
      </div>

      {/* TRACY TO FILL: Tracy's perspective on how she helps nurses decide between these models */}

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Not Sure Which Path to Choose?</p>
        <p className="mb-4">
          A <Link to="/strategy" className="text-gold font-semibold hover:underline">strategy session</Link> can help you evaluate both models against your skills, goals, and lifestyle preferences to determine the best fit.
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
