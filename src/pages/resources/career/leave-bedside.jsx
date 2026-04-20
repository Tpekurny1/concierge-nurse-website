import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "How much money should I save before leaving bedside nursing?",
    answer: "Most financial advisors recommend having three to six months of living expenses saved before leaving a salaried position. If you plan to start your concierge nursing business part-time while still working, you may need less of a financial cushion. The exact amount depends on your personal expenses, whether you have a partner's income to rely on, and how quickly you expect to generate revenue."
  },
  {
    question: "Do I need a business plan before I leave bedside nursing?",
    answer: "A formal business plan is not strictly required, but you should have clarity on your niche, target clients, basic pricing, and how you plan to get your first clients. Even an informal one-page plan that outlines your services, startup costs, and first 90 days of action steps is far better than leaving without any plan at all."
  },
  {
    question: "Can I leave bedside nursing without years of experience?",
    answer: "There is no minimum experience requirement for starting a concierge nursing business. However, clinical experience builds the confidence and skill set that clients expect from a private-pay nurse. Most successful concierge nurses have at least two to three years of hands-on clinical experience, though the ideal amount depends on your chosen niche."
  },
  {
    question: "What if my concierge nursing business does not work out?",
    answer: "Nursing is one of the most in-demand professions in the country. Your license and clinical experience do not disappear when you start a business. If your concierge practice does not develop as planned, you can return to bedside or facility-based nursing. Many nurses also pivot to different niches or business models within the concierge space rather than returning to traditional employment."
  },
  {
    question: "Should I tell my employer I am starting a business?",
    answer: "Review your employment contract for any non-compete clauses or moonlighting policies before making announcements. In most cases, there is no obligation to disclose side business activities to your employer unless your contract specifically requires it. Once you are ready to resign, give appropriate notice and leave on professional terms — your former colleagues and supervisors can become valuable referral sources."
  },
  {
    question: "How long does it take to replace my bedside nursing income?",
    answer: "Timelines vary significantly based on your niche, local market, marketing efforts, and whether you transition full-time or part-time. Some nurses begin earning within weeks of launching, while building a full client base that replaces a hospital salary often takes six to twelve months or more. Starting part-time allows you to build revenue before making the full transition."
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
  "headline": "How to Leave Bedside Nursing and Start Your Own Business",
  "description": "A practical guide for nurses ready to transition from hospital bedside nursing to owning a concierge nursing business, including planning, finances, and first steps.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-nurses-leave-bedside', text: 'Why Nurses Leave Bedside Nursing' },
  { id: 'before-you-resign', text: 'Before You Resign: Pre-Transition Planning' },
  { id: 'financial-preparation', text: 'Financial Preparation' },
  { id: 'building-while-employed', text: 'Building Your Business While Still Employed' },
  { id: 'making-the-leap', text: 'Making the Leap: When to Go Full-Time' },
  { id: 'first-90-days', text: 'Your First 90 Days After Leaving' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'Can I Start a Concierge Nursing Business Part-Time?',
    description: 'How to build your practice on the side while keeping your current nursing job.',
    link: '/resources/career/concierge-nursing-part-time',
    category: 'Career Transition',
  },
  {
    title: 'Nurse Burnout to Business Owner',
    description: 'Turning burnout into motivation for building a nursing business on your own terms.',
    link: '/resources/career/nurse-burnout-to-business-owner',
    category: 'Career Transition',
  },
  {
    title: 'What Is a Concierge Nurse?',
    description: 'The definitive guide to understanding the concierge nursing model.',
    link: '/resources/what-is-a-concierge-nurse',
    category: 'Getting Started',
  },
];

export default function LeaveBedside() {
  return (
    <ResourceLayout
      title="How to Leave Bedside Nursing and Start Your Own Business"
      description="A practical guide for nurses ready to transition from hospital bedside nursing to owning a concierge nursing business, including planning, finances, and first steps."
      canonical="https://www.conciergenursesociety.com/resources/career/leave-bedside-nursing-start-business"
      schema={articleSchema}
      category="Career Transition"
      categorySlug="/resources/career"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Leaving bedside nursing to start your own business requires intentional planning, not a dramatic leap of faith. The most successful transitions happen when nurses build their business foundation — niche selection, legal setup, initial marketing, and financial runway — while still employed, then transition to full-time entrepreneurship once they have early clients and a clear path to revenue.
        </p>
      </QuickAnswer>

      <h2 id="why-nurses-leave-bedside">Why Nurses Leave Bedside Nursing</h2>

      <p>
        Nurses leave bedside roles for many reasons, and each one is valid. Understaffing, mandatory overtime, high patient ratios, and the physical toll of twelve-hour shifts drive many experienced nurses to explore alternatives. Others feel limited by the inability to spend meaningful time with patients or frustrated by bureaucratic systems that prioritize throughput over outcomes.
      </p>

      <p>
        The desire to leave is not a failure — it is often a sign that you have outgrown a system that was not designed to support the kind of care you want to provide. Concierge nursing offers a path where your clinical skills remain central, but you gain control over how, when, and with whom you practice.
      </p>

      <p>
        That said, leaving bedside nursing should be a strategic decision, not an emotional reaction to a bad shift. The nurses who build the most sustainable businesses are those who plan their exit thoughtfully.
      </p>

      <h2 id="before-you-resign">Before You Resign: Pre-Transition Planning</h2>

      <p>
        The work of leaving bedside nursing begins long before you submit your resignation. Here is what to address during the planning phase:
      </p>

      <h3>Choose Your Niche</h3>
      <p>
        Your clinical background gives you a starting point, but your niche should also reflect market demand and the type of clients you want to serve. Post-surgical recovery, geriatric care coordination, newborn and postpartum support, and chronic disease management are all well-established concierge nursing niches. Research your local market to understand where the demand exists.
      </p>

      <h3>Understand Your State's Requirements</h3>
      <p>
        Every state has different regulations around nurse practice acts, business formation for healthcare providers, and scope of practice. Before you invest time and money into your business, research what is required in your state. Some states require a PLLC rather than a standard LLC for nurse-owned clinical practices. Learn more in our <Link to="/resources/glossary/what-is-a-nursing-pllc">guide to nursing PLLCs</Link>.
      </p>

      <h3>Set Up Your Legal and Business Foundation</h3>

      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>Form your business entity (LLC or PLLC)</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>Obtain an EIN from the IRS</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>Purchase professional liability (malpractice) insurance</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>Open a business bank account</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>Set up HIPAA-compliant communication and documentation systems if applicable</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>Create client contracts and service agreements</span>
      </div>

      <h2 id="financial-preparation">Financial Preparation</h2>

      <p>
        Financial readiness is one of the biggest concerns for nurses considering this transition, and it should be taken seriously. Here is how to approach it:
      </p>

      <h3>Build Your Financial Runway</h3>
      <p>
        Before leaving your salaried position, aim to have three to six months of personal living expenses saved. This gives you breathing room during the startup phase when revenue may be inconsistent. The exact amount depends on your household expenses, whether you have other income sources, and your risk tolerance.
      </p>

      <h3>Calculate Your Startup Costs</h3>
      <p>
        Concierge nursing businesses generally have low startup costs compared to other healthcare businesses. Your primary expenses will likely include business formation fees, liability insurance, a professional website, basic supplies for your niche, and marketing costs. Many nurses launch with an initial investment well under a few thousand dollars.
      </p>

      {/* TRACY TO FILL: Guidance on typical startup cost ranges Tracy sees with her coaching clients */}

      <h3>Understand the Income Transition</h3>
      <p>
        Hospital nursing provides a predictable paycheck. Business ownership does not — especially in the early months. Plan for irregular income by reducing personal expenses where possible and avoiding major financial commitments during your first year of business. As your client base stabilizes, income typically becomes more predictable.
      </p>

      <h2 id="building-while-employed">Building Your Business While Still Employed</h2>

      <p>
        One of the smartest strategies is to lay your business groundwork while you are still receiving a paycheck. This is not about working two full-time jobs — it is about using your off-hours strategically.
      </p>

      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span><strong>Set up your legal entity and insurance</strong> — these can be done on your days off</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span><strong>Build your website and online presence</strong> — a professional website does not need to be elaborate, but it should clearly communicate your services, niche, and how to contact you</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span><strong>Start networking with potential referral sources</strong> — connect with local physicians, surgeons, discharge planners, and other professionals in your niche</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span><strong>Take on your first clients</strong> — if your schedule allows, begin seeing clients on your days off to validate your services and build confidence</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span><strong>Review your employment contract</strong> — check for non-compete clauses or moonlighting restrictions before taking on outside work</span>
      </div>

      <p>
        For a detailed guide on this approach, see our article on <Link to="/resources/career/concierge-nursing-part-time">starting a concierge nursing business part-time</Link>.
      </p>

      <h2 id="making-the-leap">Making the Leap: When to Go Full-Time</h2>

      <p>
        There is no universal signal that tells you it is time to leave your bedside job. However, several indicators suggest you may be ready:
      </p>

      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You have a financial runway of at least three months of living expenses</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You have served at least a few clients and validated that people will pay for your services</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You have referral relationships or marketing channels that are generating leads</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>Your bedside schedule is actively preventing you from growing your business</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-1" />
        <span>You have health insurance coverage arranged (personal policy, spouse's plan, or marketplace plan)</span>
      </div>

      {/* TRACY TO FILL: Tracy's perspective on common readiness indicators she sees in her coaching clients */}

      <p>
        When you do resign, give professional notice and leave on good terms. Your former colleagues, managers, and the facility's discharge planners can become referral sources for your new business.
      </p>

      <h2 id="first-90-days">Your First 90 Days After Leaving</h2>

      <p>
        The first three months as a full-time concierge nurse business owner are critical for establishing momentum. Here is a practical framework:
      </p>

      <h3>Days 1-30: Foundation and Outreach</h3>
      <p>
        Finalize any remaining business setup tasks. Begin or intensify your marketing and networking efforts. Reach out to every professional contact who could refer clients. Set a daily routine that includes dedicated business development time. Treat your business like a job — show up consistently even when you do not yet have a full client schedule.
      </p>

      <h3>Days 31-60: Refine and Expand</h3>
      <p>
        Evaluate what is working in your marketing and double down on those channels. Gather feedback from your early clients. Refine your service packages and pricing based on real-world experience. Continue building referral relationships and expanding your professional network.
      </p>

      <h3>Days 61-90: Systematize</h3>
      <p>
        Begin creating systems and processes for client intake, documentation, scheduling, and follow-up. These systems will save you significant time as your client base grows. Assess your financial position and adjust your strategy if needed.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Need a Roadmap?</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator program</Link> provides structured guidance for nurses building their concierge nursing business, including step-by-step launch plans and ongoing coaching support.
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
