import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const faqItems = [
  {
    question: "Do all concierge nurses need to follow HIPAA?",
    answer: "Not necessarily. HIPAA applies to covered entities -- healthcare providers who transmit health information electronically for certain transactions like insurance billing. Purely private-pay practices may not be covered, but following HIPAA standards is still recommended."
  },
  {
    question: "What happens if a concierge nurse violates HIPAA?",
    answer: "HIPAA violations can result in significant financial penalties, criminal charges in serious cases, reputational damage, lawsuits, and potential jeopardy to your nursing license."
  },
  {
    question: "Can I text my clients about their health?",
    answer: "Standard SMS text messaging is not HIPAA-compliant. If HIPAA applies to your practice, you need a secure messaging platform or written client consent acknowledging the risks."
  },
  {
    question: "Do I need a Business Associate Agreement with my EHR vendor?",
    answer: "Yes, if HIPAA applies to your practice, you must have a BAA with any vendor that accesses, stores, or processes protected health information on your behalf."
  },
  {
    question: "What is the minimum HIPAA training requirement?",
    answer: "HIPAA requires covered entities to train workforce members on privacy and security policies. As a solo nurse, complete an initial training course and update it annually."
  },
  {
    question: "Is Google Drive HIPAA-compliant for storing client records?",
    answer: "Google Workspace (paid business version) can be configured for HIPAA compliance with a signed BAA. Free personal Google Drive accounts are not HIPAA-compliant."
  },
  {
    question: "Do I need a HIPAA compliance officer if I am a solo practice?",
    answer: "HIPAA requires a designated Privacy Officer and Security Officer. As a solo practitioner, you can serve as both. Document your designation in your compliance records."
  },
  {
    question: "What records do I need to keep for HIPAA compliance?",
    answer: "You must maintain documentation of your privacy policies, security policies, risk assessments, training records, BAAs, and breach notification procedures. Records must be retained for six years."
  },
  {
    question: "Can clients waive HIPAA protections?",
    answer: "Clients cannot waive HIPAA protections entirely. They can authorize disclosure of their information and consent to unencrypted communications if informed of the risks."
  },
  {
    question: "How much does HIPAA compliance cost for a solo concierge nurse?",
    answer: "Basic HIPAA compliance for a solo practice is manageable. Costs include training, compliant software tools, and time to develop policies. Many nurses achieve compliance for a modest monthly investment."
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
  "headline": "HIPAA Compliance for Concierge Nurses: What You Need to Know",
  "description": "Do concierge nurses need to follow HIPAA? Learn when HIPAA applies to concierge nursing businesses, what compliance requires, and how to set up HIPAA-compliant systems for your private-pay nursing practice.",
  "author": {
    "@type": "Organization",
    "name": "Concierge Nurse Business Society"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Concierge Nurse Business Society"
  },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'does-hipaa-apply-to-concierge-nurses', text: 'Does HIPAA Apply to Concierge Nurses?' },
  { id: 'when-are-cash-pay-practices-subject-to-hipaa', text: 'When Are Cash-Pay Practices Subject to HIPAA?' },
  { id: 'hipaa-requirements-checklist', text: 'HIPAA Requirements Checklist' },
  { id: 'setting-up-hipaa-compliant-systems', text: 'Setting Up HIPAA-Compliant Systems' },
  { id: 'common-hipaa-mistakes', text: 'Common HIPAA Mistakes Concierge Nurses Make' },
  { id: 'hipaa-violation-penalties', text: 'HIPAA Violation Penalties' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Is a Concierge Nurse?',
    description: 'Understand the concierge nursing model, services, and who hires concierge nurses.',
    link: '/resources/what-is-a-concierge-nurse',
    category: 'Getting Started',
  },
  {
    title: 'How to Start a Concierge Nursing Business',
    description: 'Step-by-step guide to launching your concierge nursing practice.',
    link: '/resources/how-to-start-a-concierge-nursing-business',
    category: 'Getting Started',
  },
  {
    title: 'Concierge Nursing Niches',
    description: 'Explore specializations and find the right niche for your practice.',
    link: '/resources/concierge-nursing-niches',
    category: 'Planning',
  },
];

export default function HipaaComplianceForConciergeNurses() {
  return (
    <ResourceLayout
      title="HIPAA Compliance for Concierge Nurses: What You Need to Know"
      description="Do concierge nurses need to follow HIPAA? Learn when HIPAA applies to concierge nursing businesses, what compliance requires, and how to set up HIPAA-compliant systems for your private-pay nursing practice."
      canonical="https://www.conciergenursesociety.com/resources/hipaa-compliance-for-concierge-nurses"
      schema={articleSchema}
      category="Legal & Compliance"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Get the HIPAA Compliance Toolkit',
        description: 'Our toolkit includes policy templates, risk assessment worksheets, BAA templates, and a compliance checklist designed specifically for concierge nursing practices.',
        buttonText: 'View Toolkits',
        buttonLink: '/toolkits',
      }}
      faqSchema={faqSchema}
    >
      {/* Legal Disclaimer */}
      <div className="bg-gold/5 border border-gold/20 p-6 mb-6">
        <p className="font-heading text-base font-semibold text-navy mb-2">Legal Disclaimer</p>
        <p>
          This guide provides general educational information about HIPAA as it relates to concierge nursing practices. It is not legal advice. Consult a healthcare attorney or HIPAA compliance consultant for guidance specific to your situation.
        </p>
      </div>

      <QuickAnswer>
        <p>
          Whether HIPAA applies to your concierge nursing business depends on whether you are a "covered entity" under federal law. If you bill insurance, submit electronic claims, or transmit protected health information electronically for covered transactions, HIPAA applies. Purely private-pay practices that never bill insurance may not be covered entities, but following HIPAA standards is still strongly recommended to protect your clients and your business.
        </p>
      </QuickAnswer>

      {/* --- Does HIPAA Apply? --- */}
      <h2 id="does-hipaa-apply-to-concierge-nurses">Does HIPAA Apply to Concierge Nurses?</h2>

      <p>
        This is the most common compliance question concierge nurses ask. HIPAA -- the Health Insurance Portability and Accountability Act -- establishes national standards for protecting sensitive patient health information. It applies to two categories: covered entities (healthcare providers who conduct covered electronic transactions like insurance billing) and business associates (those who handle protected health information on behalf of covered entities).
      </p>

      <p>
        The critical factor is whether you conduct covered electronic transactions. If you bill insurance in any form, HIPAA applies. If you work with or receive referrals from covered entities and access their patients' protected health information, you may also be subject to HIPAA as a business associate.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers how to determine your HIPAA obligations and set up compliant systems inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* --- When Are Cash-Pay Practices Subject to HIPAA? --- */}
      <h2 id="when-are-cash-pay-practices-subject-to-hipaa">When Are Cash-Pay Practices Subject to HIPAA?</h2>

      <p>
        Many concierge nurses operate on a purely private-pay basis and assume this exempts them from HIPAA. In many cases this is correct, but it is not automatic. You are likely not a covered entity if you only accept private pay and never bill insurance or submit electronic claims. You are likely a covered entity if you bill any insurance, submit electronic claims, or contract with covered entities and access their patients' health information.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Why Follow HIPAA Even If Not Required</p>
        <p>
          Even if not technically required, following HIPAA standards builds client trust, helps you comply with state privacy laws that may be stricter than HIPAA, positions you for future growth if you ever bill insurance, and provides liability protection in the event of a complaint.
        </p>
      </div>

      <p className="text-navy font-medium mt-4">The <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link> include a HIPAA determination worksheet to help you assess your specific situation.</p>

      {/* --- HIPAA Requirements Checklist --- */}
      <h2 id="hipaa-requirements-checklist">HIPAA Requirements Checklist</h2>

      <p>
        If HIPAA applies to your practice, compliance involves three main areas: the Privacy Rule (governing how protected health information is used and disclosed), the Security Rule (addressing electronic health information safeguards), and the Breach Notification Rule (requiring notification if a breach occurs). Each involves specific policies, procedures, and documentation requirements.
      </p>

      <p>
        The requirements include creating a Notice of Privacy Practices, conducting risk assessments, implementing access controls and encryption, executing Business Associate Agreements with vendors, and establishing breach notification procedures.
      </p>

      <p className="text-navy font-medium mt-4">The <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link> include ready-made HIPAA policy templates, risk assessment worksheets, and BAA templates designed for concierge nurses.</p>

      {/* --- Setting Up Compliant Systems --- */}
      <h2 id="setting-up-hipaa-compliant-systems">Setting Up HIPAA-Compliant Systems</h2>

      <p>
        One of the biggest practical challenges is selecting the right tools. Key areas to address include email (standard personal accounts are not compliant), client messaging (regular SMS is not compliant), electronic health records, cloud storage, physical device security, and written policies and procedures. Each area requires choosing HIPAA-compliant tools and ensuring proper vendor agreements are in place.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers the exact tool recommendations and setup process inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>, and the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link> include a compliance setup checklist.</p>

      {/* --- Common Mistakes --- */}
      <h2 id="common-hipaa-mistakes">Common HIPAA Mistakes Concierge Nurses Make</h2>

      <p>
        HIPAA violations are often unintentional. The most common mistakes include texting clients about health matters on regular SMS, using personal email for client communications, storing records on unencrypted devices, discussing client cases in public or on social media, not having BAAs with vendors, skipping the risk assessment, and assuming cash-pay status automatically exempts you from HIPAA.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers how to avoid these pitfalls and build compliant habits from day one inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* --- Penalty Table --- */}
      <h2 id="hipaa-violation-penalties">HIPAA Violation Penalties</h2>

      <p>
        HIPAA penalties are structured in four tiers based on the level of culpability, ranging from $100 per violation for lack of knowledge to $50,000 per violation for willful neglect that is not corrected, with annual maximums up to $1.5 million. Criminal penalties can also apply, including fines up to $250,000 and imprisonment for offenses involving intent to sell or use health information for personal gain.
      </p>

      <table>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Level of Culpability</th>
            <th>Penalty Per Violation</th>
            <th>Annual Maximum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Tier 1</strong></td>
            <td>Lack of knowledge</td>
            <td>$100 - $50,000</td>
            <td>$25,000</td>
          </tr>
          <tr>
            <td><strong>Tier 2</strong></td>
            <td>Reasonable cause</td>
            <td>$1,000 - $50,000</td>
            <td>$100,000</td>
          </tr>
          <tr>
            <td><strong>Tier 3</strong></td>
            <td>Willful neglect, corrected</td>
            <td>$10,000 - $50,000</td>
            <td>$250,000</td>
          </tr>
          <tr>
            <td><strong>Tier 4</strong></td>
            <td>Willful neglect, not corrected</td>
            <td>$50,000</td>
            <td>$1,500,000</td>
          </tr>
        </tbody>
      </table>

      <p>
        Beyond federal penalties, violations can trigger state investigations, civil lawsuits, licensing board complaints, and significant reputational damage. Prevention through compliance is always less expensive than remediation.
      </p>

      <p className="text-navy font-medium mt-4">For step-by-step compliance guidance with ready-made templates, explore the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link> or <Link to="/strategy" className="text-gold hover:underline">book a Strategy Session</Link> with Tracy.</p>

      {/* --- FAQ Section --- */}
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
