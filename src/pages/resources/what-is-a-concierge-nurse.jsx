import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const faqItems = [
  {
    question: "What is the difference between a concierge nurse and a regular nurse?",
    answer: "A concierge nurse works independently in a private-pay model, providing personalized nursing services directly to clients outside of traditional healthcare facilities. Regular nurses typically work as employees of hospitals, clinics, or agencies."
  },
  {
    question: "Do you need a special license to be a concierge nurse?",
    answer: "You need an active, unencumbered RN or LPN/LVN license in your state. There is no separate concierge nurse license, though you may need a business license and liability insurance depending on your location and services."
  },
  {
    question: "Can an LPN be a concierge nurse?",
    answer: "Yes, LPNs and LVNs can work as concierge nurses. Your scope of services will be determined by your state's nurse practice act for LPNs, so some services may require RN-level licensure."
  },
  {
    question: "Is concierge nursing the same as private duty nursing?",
    answer: "Not exactly. Private duty nursing typically involves long shifts of continuous bedside care, often through an agency. Concierge nursing is a broader business model where you own the practice and offer a wider range of services on your own terms."
  },
  {
    question: "Do concierge nurses accept insurance?",
    answer: "Most concierge nurses operate on a private-pay basis and do not bill insurance. This eliminates insurance paperwork and allows nurses to set their own rates and spend more time with clients."
  },
  {
    question: "What types of clients hire concierge nurses?",
    answer: "Clients include post-surgical patients, elderly individuals and their families, new parents, people managing chronic conditions, busy professionals, and families navigating complex medical decisions."
  },
  {
    question: "Can you be a concierge nurse part-time?",
    answer: "Yes. Many nurses start their concierge practice on the side while maintaining their full-time nursing job. This is a common, lower-risk approach to transitioning into entrepreneurship."
  },
  {
    question: "How long does it take to build a concierge nursing business?",
    answer: "Timelines vary. Some nurses begin seeing clients within weeks, while building a full client base can take 6-12 months depending on your niche, market, and marketing efforts."
  },
  {
    question: "Is concierge nursing legal in all states?",
    answer: "Concierge nursing is legal in all U.S. states, but specific services you can offer depend on your state's nurse practice act and scope of practice regulations."
  },
  {
    question: "Do concierge nurses need malpractice insurance?",
    answer: "Yes, professional liability insurance is strongly recommended and often required. As an independent practitioner, you are not covered by an employer's policy."
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
  "headline": "What Is a Concierge Nurse? The Definitive Guide",
  "description": "A concierge nurse provides private-pay, personalized nursing care outside traditional settings. Learn what concierge nurses do, who hires them, how they differ from home health and private duty nurses, and how to become one.",
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
  { id: 'what-is-a-concierge-nurse', text: 'What Is a Concierge Nurse?' },
  { id: 'what-services-do-concierge-nurses-provide', text: 'What Services Do Concierge Nurses Provide?' },
  { id: 'who-hires-a-concierge-nurse', text: 'Who Hires a Concierge Nurse?' },
  { id: 'concierge-nursing-vs-private-duty-vs-home-health', text: 'Concierge Nursing vs Private Duty vs Home Health' },
  { id: 'how-do-you-become-a-concierge-nurse', text: 'How Do You Become a Concierge Nurse?' },
  { id: 'how-much-do-concierge-nurses-make', text: 'How Much Do Concierge Nurses Make?' },
  { id: 'is-concierge-nursing-right-for-you', text: 'Is Concierge Nursing Right for You?' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'How to Start a Concierge Nursing Business',
    description: 'A complete step-by-step guide to launching your concierge nursing practice from scratch.',
    link: '/resources/how-to-start-a-concierge-nursing-business',
    category: 'Getting Started',
  },
  {
    title: 'HIPAA Compliance for Concierge Nurses',
    description: 'Learn when HIPAA applies to your concierge nursing practice and how to stay compliant.',
    link: '/resources/hipaa-compliance-for-concierge-nurses',
    category: 'Legal & Compliance',
  },
  {
    title: 'Concierge Nursing Niches',
    description: 'Explore profitable specializations for your concierge nursing business.',
    link: '/resources/concierge-nursing-niches',
    category: 'Planning',
  },
];

export default function WhatIsAConciergeNurse() {
  return (
    <ResourceLayout
      title="What Is a Concierge Nurse? The Definitive Guide"
      description="A concierge nurse provides private-pay, personalized nursing care outside traditional settings. Learn what concierge nurses do, who hires them, how they differ from home health and private duty nurses, and how to become one."
      canonical="https://www.conciergenursesociety.com/resources/what-is-a-concierge-nurse"
      schema={articleSchema}
      category="Getting Started"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Ready to Explore Concierge Nursing?',
        description: 'Join the free Concierge Nurse Business Society community to connect with nurses who have made the transition.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          A concierge nurse is a registered nurse or licensed practical nurse who provides personalized, private-pay nursing services directly to clients outside of traditional healthcare settings. Concierge nurses operate their own businesses, set their own schedules and rates, and offer services ranging from post-surgical care and chronic disease management to health advocacy and wellness coaching.
        </p>
      </QuickAnswer>

      {/* --- What Is a Concierge Nurse? --- */}
      <h2 id="what-is-a-concierge-nurse">What Is a Concierge Nurse?</h2>

      <p>
        A concierge nurse is a licensed nurse who steps outside the traditional employment model to deliver healthcare services directly to individuals and families on a private-pay basis. Instead of working for a hospital, clinic, or home health agency, a concierge nurse runs an independent practice and builds direct relationships with clients.
      </p>

      <p>
        The term "concierge" reflects the personalized, client-centered approach that defines this model. What makes concierge nursing distinct is the combination of clinical expertise and entrepreneurial independence -- these are business owners who provide high-quality, evidence-based nursing care while managing every aspect of their practice.
      </p>

      <p>
        The concierge nursing model has grown significantly as more patients seek alternatives to rushed, impersonal healthcare experiences, and more nurses are drawn to the autonomy and flexibility of practicing on their own terms.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers how to position yourself in this growing market inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* --- What Services Do Concierge Nurses Provide? --- */}
      <h2 id="what-services-do-concierge-nurses-provide">What Services Do Concierge Nurses Provide?</h2>

      <p>
        The range of services a concierge nurse can offer is broad, limited primarily by the nurse's scope of practice, training, and chosen niche. Common service categories include post-surgical and recovery support, chronic disease management, health advocacy and care coordination, wellness and preventive care, geriatric and aging-in-place support, and pediatric and new parent support.
      </p>

      <p>
        Additional areas include travel nursing companionship, corporate wellness programs, event medical support, pre-operative preparation, and insurance navigation. The key is that concierge nurses tailor their offerings to serve a specific client population with focused expertise.
      </p>

      <p className="text-navy font-medium mt-4">The <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> walks you through designing your service offerings and packaging them for your ideal client.</p>

      {/* --- Who Hires a Concierge Nurse? --- */}
      <h2 id="who-hires-a-concierge-nurse">Who Hires a Concierge Nurse?</h2>

      <p>
        Concierge nursing clients come from a variety of backgrounds. The common thread is a desire for personalized, expert nursing care that goes beyond what the traditional system provides. Typical clients include post-surgical patients, elderly individuals and their adult children, new parents, individuals with chronic conditions, busy professionals, families navigating complex medical situations, and event organizers.
      </p>

      <p>
        Concierge nursing clients are not exclusively wealthy. Many are middle-class families who find hiring a concierge nurse for specific needs to be a worthwhile investment compared to longer hospital stays, readmissions, or the stress of navigating the system alone.
      </p>

      <p className="text-navy font-medium mt-4">Tracy teaches exactly how to identify and reach your ideal client inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* --- Comparison Table --- */}
      <h2 id="concierge-nursing-vs-private-duty-vs-home-health">Concierge Nursing vs Private Duty vs Home Health</h2>

      <p>
        One of the most common points of confusion is how concierge nursing differs from private duty nursing and home health nursing. While all three involve providing nursing care outside of hospitals, they differ significantly in structure, payment model, autonomy, and scope.
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Concierge Nurse</th>
            <th>Private Duty Nurse</th>
            <th>Home Health Nurse</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Employment</strong></td>
            <td>Self-employed / business owner</td>
            <td>Agency employee or contractor</td>
            <td>Agency employee</td>
          </tr>
          <tr>
            <td><strong>Payment</strong></td>
            <td>Private pay (client pays directly)</td>
            <td>Private pay or insurance through agency</td>
            <td>Medicare, Medicaid, or insurance</td>
          </tr>
          <tr>
            <td><strong>Autonomy</strong></td>
            <td>High -- you control all aspects</td>
            <td>Moderate -- agency controls assignments</td>
            <td>Low -- follows physician orders and agency protocols</td>
          </tr>
          <tr>
            <td><strong>Services</strong></td>
            <td>Broad -- clinical, wellness, advocacy</td>
            <td>Focused on bedside care</td>
            <td>Skilled nursing per physician orders</td>
          </tr>
          <tr>
            <td><strong>Rate Setting</strong></td>
            <td>Nurse sets own rates</td>
            <td>Agency sets rates</td>
            <td>Reimbursement rates set by payer</td>
          </tr>
        </tbody>
      </table>

      <p>
        The key distinction is that concierge nursing is fundamentally a business model, not just a job title. For a deeper analysis, see our <Link to="/resources/concierge-nurse-vs-home-health-vs-private-duty">full comparison guide</Link>.
      </p>

      {/* --- How Do You Become a Concierge Nurse? --- */}
      <h2 id="how-do-you-become-a-concierge-nurse">How Do You Become a Concierge Nurse?</h2>

      <p>
        Becoming a concierge nurse involves both clinical preparation and business development. You need an active nursing license, a chosen niche or specialty, a legal business entity, professional liability insurance, a clear set of services and pricing, and a strategy for reaching clients. Most concierge nurses also have several years of clinical experience that builds the confidence needed to practice independently.
      </p>

      <p>
        The process involves multiple areas of expertise -- from legal foundations to marketing -- and the right guidance can make the difference between a smooth launch and months of costly trial and error.
      </p>

      <p className="text-navy font-medium mt-4">Tracy's <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> provides the complete roadmap, templates, and mentorship to launch your concierge nursing business step by step.</p>

      {/* --- How Much Do Concierge Nurses Make? --- */}
      <h2 id="how-much-do-concierge-nurses-make">How Much Do Concierge Nurses Make?</h2>

      <p>
        Concierge nurse income varies widely based on geographic location, niche, experience, service pricing, and client volume. Because concierge nurses are business owners, earnings depend on your business model rather than a fixed salary. Key factors include your pricing structure (hourly vs. packages vs. retainers), your local market, your niche specialization, and your business expenses.
      </p>

      <div className="bg-gold/5 border border-gold/20 p-6 mb-6">
        <p className="font-heading text-base font-semibold text-navy mb-2">A Note on Income Claims</p>
        <p>
          Be cautious of anyone promising specific income figures for concierge nursing. Earnings are directly tied to the effort you put into building your business, the market you serve, and the value you deliver.
        </p>
      </div>

      <p className="text-navy font-medium mt-4">Tracy covers pricing strategy and revenue planning in detail inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> and through <Link to="/strategy" className="text-gold hover:underline">Strategy Sessions</Link>.</p>

      {/* --- Is Concierge Nursing Right for You? --- */}
      <h2 id="is-concierge-nursing-right-for-you">Is Concierge Nursing Right for You?</h2>

      <p>
        Concierge nursing is not for every nurse, and that is perfectly fine. The model requires a blend of clinical skill and entrepreneurial drive. It may be a good fit if you want more time with patients, desire schedule flexibility, and are willing to learn the business side of healthcare. It may not be the right fit if you prefer the stability of a regular paycheck or are not interested in marketing and operations.
      </p>

      <p>
        If you are on the fence, starting part-time while keeping your current position is a low-risk way to test the waters. Many successful concierge nurses began exactly this way.
      </p>

      <p className="text-navy font-medium mt-4">Not sure where to start? The <Link to="/start-here" className="text-gold hover:underline">Start Here</Link> page will help you find your next step, or <Link to="/strategy" className="text-gold hover:underline">book a Strategy Session</Link> with Tracy for personalized guidance.</p>

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
