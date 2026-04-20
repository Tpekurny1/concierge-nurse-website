import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const faqItems = [
  {
    question: "What is the difference between concierge nursing and concierge medicine?",
    answer: "Concierge medicine is a physician-based model where patients pay a retainer or membership fee for enhanced access to their doctor. Concierge nursing is a nurse-led business model where registered nurses or licensed practical nurses provide private-pay nursing services directly to clients. Both operate outside of traditional insurance billing, but they are led by different types of healthcare professionals with different scopes of practice."
  },
  {
    question: "Do I need to know all these terms before starting my business?",
    answer: "No. You do not need to memorize a glossary before launching. Focus on the terms that are directly relevant to your niche and business setup — particularly the legal and compliance terms like LLC, PLLC, HIPAA, and scope of practice. The rest you will learn naturally as your business develops."
  },
  {
    question: "What is the difference between an LLC and a PLLC?",
    answer: "An LLC (Limited Liability Company) is a general business entity that separates your personal assets from business liabilities. A PLLC (Professional Limited Liability Company) is a version of the LLC specifically for licensed professionals like nurses, doctors, and attorneys. Some states require healthcare professionals to form a PLLC rather than a standard LLC. Check your state's requirements."
  },
  {
    question: "What does cash-pay or private-pay mean in concierge nursing?",
    answer: "Cash-pay and private-pay mean the client pays you directly for services out of their own pocket, rather than billing through health insurance, Medicare, or Medicaid. This is the standard payment model for most concierge nursing businesses and eliminates insurance paperwork, prior authorizations, and reimbursement delays."
  },
  {
    question: "Is an NPI number required for concierge nurses?",
    answer: "An NPI (National Provider Identifier) is required if you bill Medicare, Medicaid, or private insurance. Most concierge nurses operate on a private-pay basis and do not bill insurance, so an NPI is not always required. However, some nurses obtain one for professional credibility or in case they want to bill insurance for certain services in the future."
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
  "headline": "Concierge Nursing Business Terms Glossary",
  "description": "A comprehensive A-Z glossary of terms related to concierge nursing businesses, including legal, financial, marketing, and clinical terminology.",
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
  { id: 'how-to-use', text: 'How to Use This Glossary' },
  { id: 'letter-a', text: 'A' },
  { id: 'letter-b', text: 'B' },
  { id: 'letter-c', text: 'C' },
  { id: 'letter-d', text: 'D' },
  { id: 'letter-e', text: 'E' },
  { id: 'letter-f', text: 'F' },
  { id: 'letter-g', text: 'G' },
  { id: 'letter-h', text: 'H' },
  { id: 'letter-i', text: 'I' },
  { id: 'letter-l', text: 'L' },
  { id: 'letter-m', text: 'M' },
  { id: 'letter-n', text: 'N' },
  { id: 'letter-o', text: 'O' },
  { id: 'letter-p', text: 'P' },
  { id: 'letter-r', text: 'R' },
  { id: 'letter-s', text: 'S' },
  { id: 'letter-t', text: 'T' },
  { id: 'letter-v', text: 'V' },
  { id: 'letter-w', text: 'W' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Is a Concierge Nurse?',
    description: 'The definitive guide to the concierge nursing model, who hires concierge nurses, and how to become one.',
    link: '/resources/what-is-a-concierge-nurse',
    category: 'Getting Started',
  },
  {
    title: 'How to Start a Concierge Nursing Business',
    description: 'Step-by-step guide covering every phase of launching your practice.',
    link: '/resources/how-to-start-a-concierge-nursing-business',
    category: 'Getting Started',
  },
  {
    title: 'LLC vs. PLLC for Nursing Businesses',
    description: 'Which legal entity is right for your concierge nursing practice.',
    link: '/resources/legal/nursing-business-llc-vs-pllc',
    category: 'Legal & Compliance',
  },
];

export default function GlossaryIndex() {
  return (
    <ResourceLayout
      title="Concierge Nursing Business Terms Glossary"
      description="A comprehensive A-Z glossary of terms related to concierge nursing businesses, including legal, financial, marketing, and clinical terminology."
      canonical="https://www.conciergenursesociety.com/resources/glossary"
      schema={articleSchema}
      category="Getting Started"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Build Your Business With Confidence',
        description: 'Our Toolkits include templates, contracts, and SOPs that put these terms into practice for your concierge nursing business.',
        buttonText: 'View Toolkits',
        buttonLink: '/toolkits',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          This glossary covers the most important terms you will encounter when researching, launching, and running a concierge nursing business. Each term includes a concise definition, and many link to in-depth guides where you can learn more.
        </p>
      </QuickAnswer>

      {/* --- How to Use --- */}
      <h2 id="how-to-use">How to Use This Glossary</h2>

      <p>
        Use this page as a reference whenever you encounter an unfamiliar term in our resources, in conversations with other nurse entrepreneurs, or while researching your business. Terms that have dedicated deep-dive articles include links so you can explore the topic further.
      </p>

      <p>
        This glossary covers terminology across several categories: business and legal terms, clinical and nursing terms, marketing and sales terms, and financial terms. If you are just starting out, pay particular attention to the terms in bold — these are concepts you will encounter early and often.
      </p>

      {/* --- A --- */}
      <div id="letter-a" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">A</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">ACLS (Advanced Cardiovascular Life Support)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A certification for healthcare providers covering advanced interventions for cardiac emergencies. Some concierge nursing niches, such as event medical support or post-surgical recovery, may benefit from current ACLS certification.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">AEO (Answer Engine Optimization)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A digital marketing approach focused on structuring your website content so that AI-powered search engines and voice assistants feature your answers in response to user questions. Related to but distinct from traditional SEO.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Articles of Organization</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The legal document filed with your state to formally create your LLC or PLLC. This is the foundational step in registering your concierge nursing business entity. <Link to="/resources/legal/nursing-business-llc-vs-pllc" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* --- B --- */}
      <div id="letter-b" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">B</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">BLS (Basic Life Support)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A certification covering CPR and basic emergency response for healthcare providers. Most concierge nurses maintain current BLS certification as a foundational professional credential.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Business Plan</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A written document outlining your business goals, target market, services, pricing, startup costs, and marketing strategy. For concierge nurses, a focused one-page plan is often more practical than a lengthy traditional business plan. <Link to="/resources/concierge-nurse-business-plan" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Business Associate Agreement (BAA)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A HIPAA-required contract between a covered entity and a vendor or service provider who handles protected health information on their behalf. If you use software or services that access patient data, you may need BAAs with those vendors. <Link to="/resources/hipaa-compliance-for-concierge-nurses" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* --- C --- */}
      <div id="letter-c" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">C</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Care Coordination</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The process of organizing and managing a client's healthcare across multiple providers, specialists, and settings. A common concierge nursing service, particularly for geriatric clients and those with complex medical needs.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Cash-Pay Practice</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A healthcare business model where clients pay out of pocket rather than through insurance. Most concierge nursing businesses operate as cash-pay or private-pay practices. <Link to="/resources/concierge-nurse-pricing-guide" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Collaborative Agreement</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A formal agreement between a nurse and a physician that outlines the scope of services the nurse can provide under the physician's oversight. Some states require collaborative agreements for certain nursing services. Requirements vary by state and license type. <Link to="/resources/legal/concierge-nurse-scope-of-practice" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Concierge Medicine</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A physician-led healthcare model where patients pay a membership or retainer fee for enhanced access, longer appointments, and personalized care. Distinct from concierge nursing, which is nurse-led, though the two models share a philosophy of personalized, private-pay healthcare.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Concierge Nurse</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A registered nurse or licensed practical nurse who provides personalized, private-pay nursing services directly to clients outside of traditional healthcare settings. Concierge nurses operate their own businesses and set their own schedules, services, and rates. <Link to="/resources/what-is-a-concierge-nurse" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Covered Entity</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">Under HIPAA, a covered entity is a healthcare provider that transmits health information electronically in connection with certain transactions, a health plan, or a healthcare clearinghouse. Whether your concierge nursing business qualifies as a covered entity depends on your services and billing practices. <Link to="/resources/hipaa-compliance-for-concierge-nurses" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Client Onboarding</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The process of bringing a new client into your practice, including the initial consultation, intake paperwork, contract signing, payment collection, and first-visit preparation. A smooth onboarding process sets the tone for the entire client relationship. <Link to="/resources/operations/concierge-nursing-client-onboarding" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* --- D --- */}
      <div id="letter-d" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">D</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">DBA (Doing Business As)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A registration that allows your business to operate under a name different from your legal entity name. For example, if your LLC is registered as "Jane Smith Nursing LLC" but you want to operate as "Bay Area Concierge Nursing," you would file a DBA.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Discovery Call</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">An initial phone or video call with a prospective client to discuss their needs, explain your services, and determine whether you are a good fit for each other. The discovery call is typically the first step in your client onboarding process.</dd>
          </div>
        </dl>
      </div>

      {/* --- E --- */}
      <div id="letter-e" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">E</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">EHR (Electronic Health Record)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A digital system for maintaining patient health records. Some concierge nurses use simplified EHR platforms for clinical documentation, while others use HIPAA-compliant note-taking systems. Your choice depends on the complexity of your services and your compliance requirements. <Link to="/resources/operations/concierge-nursing-tools-software" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">EIN (Employer Identification Number)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A unique nine-digit number assigned by the IRS to identify your business for tax purposes. You need an EIN to open a business bank account, hire employees, and file business taxes. The application is free and can be completed online in minutes. <Link to="/resources/how-to-start-a-concierge-nursing-business" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Elevator Pitch</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A brief, compelling description of your business that you can deliver in about 30 seconds — roughly the length of an elevator ride. Your elevator pitch should clearly state who you serve, what problem you solve, and how you are different. Essential for networking and referral conversations.</dd>
          </div>
        </dl>
      </div>

      {/* --- F --- */}
      <div id="letter-f" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">F</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Fee-for-Service</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A payment model where you charge for each individual service provided. In concierge nursing, this often takes the form of hourly rates or per-visit fees. Compare with package pricing and retainer models. <Link to="/resources/concierge-nurse-pricing-guide" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">FSA (Flexible Spending Account)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">An employer-sponsored benefit account that allows employees to set aside pre-tax dollars for eligible healthcare expenses. Some concierge nursing services may qualify as FSA-eligible expenses for your clients, depending on the nature of the services.</dd>
          </div>
        </dl>
      </div>

      {/* --- G --- */}
      <div id="letter-g" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">G</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">General Liability Insurance</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">Insurance that covers non-clinical risks such as property damage, bodily injury (from non-medical causes), and advertising injury. Separate from professional liability (malpractice) insurance and recommended for concierge nurses who visit client homes. <Link to="/resources/legal/concierge-nurse-insurance-requirements" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Google Business Profile</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A free business listing on Google that appears in local search results and Google Maps. Setting up and optimizing your Google Business Profile is one of the most impactful marketing steps for local concierge nursing businesses. <Link to="/resources/marketing/concierge-nurse-google-business-profile" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* --- H --- */}
      <div id="letter-h" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">H</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">HIPAA (Health Insurance Portability and Accountability Act)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A federal law that establishes standards for protecting patient health information. Whether HIPAA applies to your concierge nursing business depends on factors including whether you transmit health information electronically and whether you bill insurance. Understanding your HIPAA obligations is critical before you begin seeing clients. <Link to="/resources/hipaa-compliance-for-concierge-nurses" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Home Health Nursing</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A nursing model where nurses provide skilled care in patients' homes under physician orders, typically through an agency and billed to Medicare, Medicaid, or insurance. Distinct from concierge nursing in its employment structure, payment model, and level of nurse autonomy. <Link to="/resources/concierge-nursing-vs-private-duty-vs-home-health" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">HSA (Health Savings Account)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A tax-advantaged savings account for individuals with high-deductible health plans. Some concierge nursing services may be eligible for HSA payment, which can be a selling point when discussing your services with potential clients.</dd>
          </div>
        </dl>
      </div>

      {/* --- I --- */}
      <div id="letter-i" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">I</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Ideal Client Profile</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A detailed description of your target client, including demographics, health situation, pain points, values, and where they seek healthcare information. Defining your ideal client is essential for effective marketing and service design.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Independent Contractor</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A self-employed individual who provides services under a contract but is not an employee. As a concierge nurse, you are an independent contractor or business owner, not an employee of your clients. If you scale and bring on other nurses, understanding the distinction between employees and independent contractors is important for legal compliance.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">IV Therapy</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The administration of fluids, vitamins, or medications directly into a client's vein. Mobile IV therapy is a popular concierge nursing niche. Regulations around nurse-administered IV therapy vary significantly by state, so check your state's nurse practice act before offering this service. <Link to="/resources/niches/iv-therapy-nursing-business" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* --- L --- */}
      <div id="letter-l" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">L</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">LLC (Limited Liability Company)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A business structure that separates your personal assets from your business liabilities. Forming an LLC is one of the first legal steps in starting a concierge nursing business. Some states require healthcare professionals to form a PLLC instead. <Link to="/resources/legal/nursing-business-llc-vs-pllc" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Lead Generation</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The process of attracting and capturing interest from potential clients. For concierge nurses, lead generation often involves a combination of referral relationships, local SEO, social media presence, and community networking. <Link to="/resources/how-to-get-concierge-nursing-clients" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* --- M --- */}
      <div id="letter-m" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">M</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Malpractice Insurance</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">Professional liability insurance that protects you against claims of negligence, errors, or omissions in your nursing care. Essential for any concierge nurse operating independently, as you are not covered by an employer's policy. Also called professional liability insurance. <Link to="/resources/legal/concierge-nurse-insurance-requirements" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Medical Tourism</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The practice of traveling to another location for medical procedures, often to access lower costs or specific specialists. Some concierge nurses serve medical tourism clients by providing pre- and post-operative support during travel.</dd>
          </div>
        </dl>
      </div>

      {/* --- N --- */}
      <div id="letter-n" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">N</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Niche</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A specific segment of the market that you specialize in serving. In concierge nursing, your niche might be defined by the population you serve (geriatric, postpartum, post-surgical) or the type of service you provide (IV therapy, wellness, care coordination). Choosing a niche is one of the most important decisions in building your business. <Link to="/resources/concierge-nursing-niches" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">NPI (National Provider Identifier)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A unique 10-digit identification number issued to healthcare providers by CMS (Centers for Medicare and Medicaid Services). Required for billing insurance but not always necessary for private-pay concierge nursing practices.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Nurse Entrepreneur</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A nurse who leverages their clinical knowledge and skills to build and run a business. Concierge nursing is one form of nurse entrepreneurship, but the term also includes nurses who create products, consulting firms, educational platforms, and other healthcare-related businesses.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Nurse Licensure Compact (NLC)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">An agreement among participating states that allows nurses to have one multistate license and practice in any compact state without obtaining additional licenses. Relevant for concierge nurses who want to serve clients across state lines or who relocate. Not all states participate in the NLC.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Nurse Practice Act</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The body of state law that defines the scope of nursing practice, licensing requirements, and professional standards for nurses in each state. Your state's nurse practice act determines what services you can legally offer as a concierge nurse. <Link to="/resources/legal/concierge-nurse-scope-of-practice" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* --- O --- */}
      <div id="letter-o" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">O</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Operating Agreement</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A legal document that outlines the ownership structure, operating procedures, and management rules of an LLC. Even if you are the sole member of your LLC, having an operating agreement strengthens the legal separation between you and your business. <Link to="/resources/legal/nursing-business-llc-vs-pllc" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Onboarding</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">See Client Onboarding.</dd>
          </div>
        </dl>
      </div>

      {/* --- P --- */}
      <div id="letter-p" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">P</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Package Pricing</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A pricing model where you bundle multiple services or visits into a single package with one price. For example, a "Post-Surgical Recovery Package" might include a set number of visits, phone support, and care coordination for one flat rate. Generally results in higher revenue per client than hourly billing. <Link to="/resources/concierge-nurse-pricing-guide" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">PHI (Protected Health Information)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">Any individually identifiable health information that is created, received, maintained, or transmitted by a covered entity. Includes names, addresses, dates of birth, medical records, and billing information. If you handle PHI, HIPAA regulations apply. <Link to="/resources/hipaa-compliance-for-concierge-nurses" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">PLLC (Professional Limited Liability Company)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A business entity designed specifically for licensed professionals such as nurses, physicians, and attorneys. Some states require healthcare providers to form a PLLC rather than a standard LLC. Offers the same liability protection as an LLC but may have additional requirements. <Link to="/resources/legal/nursing-business-llc-vs-pllc" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Private Duty Nursing</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A nursing model involving extended bedside care shifts (typically 8-12 hours) in the client's home, often arranged through an agency. Distinct from concierge nursing in its shift-based structure, limited service scope, and typically lower autonomy. <Link to="/resources/concierge-nursing-vs-private-duty-vs-home-health" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Private-Pay Nursing</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">Any nursing service where the client pays directly rather than through insurance. Concierge nursing is a form of private-pay nursing. Also referred to as cash-pay, direct-pay, or out-of-pocket nursing services.</dd>
          </div>
        </dl>
      </div>

      {/* --- R --- */}
      <div id="letter-r" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">R</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Referral Source</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A person or organization that sends clients to your business. For concierge nurses, key referral sources include physicians, surgeons, discharge planners, social workers, and other healthcare professionals. Building referral relationships is one of the most effective client acquisition strategies. <Link to="/resources/marketing/physician-referral-relationships" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Retainer Model</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A pricing model where a client pays a recurring fee (monthly or quarterly) for ongoing access to your services. Common in geriatric care coordination, chronic disease management, and executive wellness niches. Provides predictable recurring revenue. <Link to="/resources/financial/concierge-nursing-revenue-models" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* --- S --- */}
      <div id="letter-s" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">S</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Scope of Practice</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The range of clinical activities, procedures, and functions that a nurse is legally authorized to perform based on their license type and state regulations. Your scope of practice defines what you can and cannot offer in your concierge nursing business. <Link to="/resources/legal/concierge-nurse-scope-of-practice" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">SEO (Search Engine Optimization)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The practice of optimizing your website and online content so it ranks higher in search engine results. Local SEO is particularly important for concierge nurses because most clients search for services in their geographic area. <Link to="/resources/marketing/concierge-nursing-business-marketing" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Service Agreement</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A written contract between you and your client that outlines the services you will provide, fees, payment terms, cancellation policy, limitations of care, and other important terms. Also called a client contract or service contract. <Link to="/resources/legal/concierge-nursing-client-contracts" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Service Package</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A bundled offering of specific services at a set price. Service packages make it easier for clients to understand what they are buying and easier for you to communicate your value. Examples include post-surgical recovery packages, monthly wellness retainers, and newborn care bundles. <Link to="/resources/operations/concierge-nursing-service-packages" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Sole Proprietorship</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The simplest business structure where you and the business are legally the same entity. While easy to set up, a sole proprietorship provides no personal liability protection. Most business advisors recommend forming an LLC or PLLC instead.</dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">SOPs (Standard Operating Procedures)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">Documented step-by-step instructions for how you handle recurring tasks and processes in your business, such as client intake, documentation, billing, and follow-up. SOPs ensure consistency and are essential if you plan to scale by hiring other nurses. <Link to="/resources/operations/concierge-nursing-sops" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* --- T --- */}
      <div id="letter-t" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">T</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Telehealth</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">The delivery of healthcare services remotely through technology such as video calls, phone calls, or messaging. Some concierge nurses offer virtual consultations, follow-up calls, or health coaching via telehealth in addition to in-person services. State regulations on telehealth nursing vary. <Link to="/resources/scaling/add-virtual-services-concierge-nursing" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Travel Nursing (Concierge)</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">A concierge nursing service where the nurse accompanies a client during travel to provide medical support, medication management, and health monitoring. Distinct from traditional travel nursing (which refers to temporary hospital staff assignments).</dd>
          </div>
        </dl>
      </div>

      {/* --- V --- */}
      <div id="letter-v" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">V</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Value-Based Pricing</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">Setting your prices based on the value and outcomes your services provide to clients, rather than simply charging for your time. For example, pricing a post-surgical recovery package based on the value of avoiding hospital readmission rather than charging an hourly rate. <Link to="/resources/concierge-nurse-pricing-guide" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Virtual Services</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">Healthcare or consulting services delivered remotely rather than in person. Adding virtual services to your concierge nursing practice can expand your reach beyond your local area and create additional revenue streams. <Link to="/resources/scaling/add-virtual-services-concierge-nursing" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* --- W --- */}
      <div id="letter-w" className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-gold mb-4 border-b border-cream-dark pb-2">W</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-heading text-lg font-semibold text-navy">Wellness Services</dt>
            <dd className="text-charcoal text-[0.95rem] leading-relaxed ml-0">Non-acute health services focused on prevention, optimization, and overall well-being rather than treating illness. In concierge nursing, wellness services may include health risk assessments, lifestyle coaching, biometric screening, and IV hydration therapy. A growing niche within the concierge nursing space. <Link to="/resources/concierge-nursing-niches" className="text-gold hover:underline">Learn more →</Link></dd>
          </div>
        </dl>
      </div>

      {/* TRACY TO FILL: Any additional industry-specific terms Tracy wants to include based on common questions from CNBS members */}

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
