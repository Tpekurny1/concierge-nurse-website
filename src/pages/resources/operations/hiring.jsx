import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const headings = [
  { id: 'signs-its-time', text: 'Signs It Is Time to Hire' },
  { id: 'what-to-hire-first', text: 'What to Hire First' },
  { id: 'employee-vs-contractor', text: 'Employee vs. Independent Contractor' },
  { id: 'hiring-clinical-staff', text: 'Hiring Clinical Staff' },
  { id: 'hiring-admin-support', text: 'Hiring Administrative Support' },
  { id: 'onboarding-your-team', text: 'Onboarding Your Team' },
  { id: 'managing-and-delegating', text: 'Managing and Delegating Effectively' },
  { id: 'financial-readiness', text: 'Financial Readiness to Hire' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Build SOPs for Your Concierge Nursing Business', description: 'SOPs are essential before bringing anyone onto your team.', link: '/resources/operations/concierge-nursing-sops', category: 'Operations' },
  { title: 'How to Manage Scheduling as a Solo Concierge Nurse', description: 'Understanding your current capacity helps you know when it is time to hire.', link: '/resources/operations/concierge-nurse-scheduling', category: 'Operations' },
  { title: 'How to Create Concierge Nursing Service Packages That Sell', description: 'Scale your service offerings as your team grows.', link: '/resources/operations/concierge-nursing-service-packages', category: 'Operations' },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "When should a concierge nurse make their first hire?", "acceptedAnswer": { "@type": "Answer", "text": "Consider hiring when you are consistently turning away clients, working more hours than you want to sustain, spending significant time on tasks that do not require your clinical expertise, or when revenue can support the cost of help without creating financial stress." } },
    { "@type": "Question", "name": "Should my first hire be a nurse or an administrative assistant?", "acceptedAnswer": { "@type": "Answer", "text": "For most concierge nurses, an administrative assistant or virtual assistant is the better first hire. Freeing up your time for client care often has a greater financial impact than adding another clinician." } },
    { "@type": "Question", "name": "Should I hire an employee or an independent contractor?", "acceptedAnswer": { "@type": "Answer", "text": "This depends on the role, the level of control you need, and legal requirements in your state. Consult with a business attorney to ensure proper classification." } },
    { "@type": "Question", "name": "How do I afford my first hire?", "acceptedAnswer": { "@type": "Answer", "text": "Calculate the true cost including compensation, taxes, insurance, and training time. Then estimate the additional revenue you can generate with the time freed up. Many concierge nurses start with a part-time virtual assistant." } },
    { "@type": "Question", "name": "Do I need SOPs before I hire someone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Documented standard operating procedures are essential before bringing anyone onto your team. With SOPs, a new team member can learn your systems independently and produce consistent results." } },
    { "@type": "Question", "name": "What if I hire someone and it does not work out?", "acceptedAnswer": { "@type": "Answer", "text": "Set clear expectations from the beginning, including a probationary period with defined performance benchmarks. Address issues early and directly. Have a plan for transitioning tasks back to yourself or to a replacement." } }
  ]
};

export default function Hiring() {
  return (
    <ResourceLayout
      title="When to Hire: Scaling Your Concierge Nursing Team"
      description="A practical guide to recognizing when your concierge nursing practice needs help, deciding what to hire first, and building a team that extends your care without diluting your brand."
      canonical="https://www.conciergenursesociety.com/resources/operations/when-to-hire-concierge-nursing"
      category="Operations"
      categorySlug="/resources"
      headings={headings}
      relatedResources={relatedResources}
      faqSchema={faqSchema}
      cta={{ title: 'Scale with Confidence', description: 'The Accelerator program guides you through every stage of growth, from solo practice to team leadership.', buttonText: 'Learn About the Accelerator', buttonLink: '/accelerator' }}
    >
      <QuickAnswer>
        <p>It is time to consider hiring when you are consistently at capacity, turning away clients, spending significant time on non-clinical tasks, or sacrificing personal well-being. Start with administrative support to free your time for revenue-generating clinical work and make sure your operations are documented with SOPs before onboarding anyone.</p>
      </QuickAnswer>

      <p>Growing from a solo concierge nurse to a team-based practice is one of the most significant transitions in your business. Done right, it multiplies your impact and revenue. Done poorly, it creates stress, financial strain, and quality issues that can damage your reputation.</p>

      <h2 id="signs-its-time">Signs It Is Time to Hire</h2>
      <p>Not every busy period means you need to hire. But certain patterns reliably indicate that your practice has outgrown a solo operation, including turning away clients, administrative overload, slipping quality, and personal burnout.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="what-to-hire-first">What to Hire First</h2>
      <p>The most common and often wisest first hire for a concierge nurse is not another nurse but administrative support. Your clinical time generates the highest revenue per hour, and freeing it up from non-clinical tasks has the greatest financial impact.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="employee-vs-contractor">Employee vs. Independent Contractor</h2>
      <p>The legal distinction between an employee and an independent contractor carries significant consequences for misclassification. The right structure depends on the role, the level of control you need, and your state's requirements. Consult with a business attorney before making your first hire.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="hiring-clinical-staff">Hiring Clinical Staff</h2>
      <p>When you are ready to bring on clinical staff, the stakes are higher than with administrative hires. This person will represent your brand and provide care to your clients. Credential verification, clinical competence, and cultural fit are all critical parts of the process.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="hiring-admin-support">Hiring Administrative Support</h2>
      <p>Administrative hires have a lower risk profile than clinical hires, but they still require thoughtfulness, especially regarding client data access and HIPAA considerations. Starting part-time and scaling up is a proven approach.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="onboarding-your-team">Onboarding Your Team</h2>
      <p>Onboarding a team member is as important as onboarding a client. This is where your <Link to="/resources/operations/concierge-nursing-sops" className="text-gold hover:text-navy font-semibold">standard operating procedures</Link> become invaluable. A structured onboarding process ensures new hires can contribute quickly and consistently.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="managing-and-delegating">Managing and Delegating Effectively</h2>
      <p>Many nurses struggle with delegation. Effective delegation is the only way to scale beyond your own capacity, and learning to do it well is a skill that transforms your business.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="financial-readiness">Financial Readiness to Hire</h2>
      <p>Hiring before you can afford it is risky. Waiting too long costs you growth. Finding the right timing requires honest financial analysis. The <Link to="/accelerator" className="text-gold hover:text-navy font-semibold">Concierge Nurse Accelerator</Link> provides structured guidance for every stage of growth.</p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>When should a concierge nurse make their first hire?</h3>
      <p>When you are consistently turning away clients, overwhelmed by non-clinical tasks, or when revenue can support the cost comfortably.</p>

      <h3>Should my first hire be a nurse or an administrative assistant?</h3>
      <p>For most concierge nurses, administrative support is the better first hire because it frees your highest-value clinical time.</p>

      <h3>Should I hire an employee or an independent contractor?</h3>
      <p>This depends on the role and your state's requirements. Consult with a business attorney to ensure proper classification.</p>

      <h3>How do I afford my first hire?</h3>
      <p>Calculate the full cost, project the revenue impact, and start with a part-time arrangement to minimize financial risk.</p>

      <h3>Do I need SOPs before I hire someone?</h3>
      <p>Yes. Documented procedures are essential for efficient onboarding and consistent results from any new team member.</p>

      <h3>What if I hire someone and it does not work out?</h3>
      <p>Set clear expectations with a probationary period. Address issues early and have a transition plan ready.</p>
    </ResourceLayout>
  );
}
