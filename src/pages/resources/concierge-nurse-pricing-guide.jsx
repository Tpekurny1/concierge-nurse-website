import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const faqItems = [
  {
    question: "How much do concierge nurses charge per hour?",
    answer: "Rates vary widely based on location, specialty, and experience. Your rate should reflect your expertise, local market, and the value you provide to clients."
  },
  {
    question: "Should I charge hourly or use package pricing?",
    answer: "Both models work. Hourly is straightforward for variable services, while package pricing works well for recurring care and gives clients predictable costs."
  },
  {
    question: "How do I know if my rates are too low?",
    answer: "Signs include being fully booked with no room to grow, feeling resentful about your workload, and earning less than you would in a traditional role after accounting for business expenses."
  },
  {
    question: "Do concierge nurses accept insurance?",
    answer: "Most operate on a private-pay model, which allows greater flexibility and eliminates the administrative burden of insurance billing."
  },
  {
    question: "How much should I charge for travel time?",
    answer: "Many concierge nurses include travel within a defined radius and charge an additional fee beyond that. Be transparent about travel policies in your client agreements."
  },
  {
    question: "Can I charge different rates for different services?",
    answer: "Yes. Services requiring specialized skills or higher liability typically command higher rates."
  },
  {
    question: "When should I raise my rates?",
    answer: "Consider raising rates when you have a waitlist, when expenses increase, after gaining new certifications, or annually to keep up with cost of living."
  },
  {
    question: "How do I handle clients who say my rates are too high?",
    answer: "Focus on communicating value and outcomes rather than justifying costs. Not every prospect is your ideal client. Evaluate whether your marketing is attracting the right audience."
  },
  {
    question: "Should I offer discounts for long-term clients?",
    answer: "Retainer agreements can include a preferred rate since they provide predictable income. Avoid deep discounting that undermines profitability."
  },
  {
    question: "How do concierge nurse rates compare to agency nursing pay?",
    answer: "Concierge nurses typically earn more per hour because they set their own rates. However, they also cover their own business expenses, taxes, and benefits."
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
  { id: "pricing-models", text: "Concierge Nursing Pricing Models" },
  { id: "rate-ranges", text: "General Rate Ranges by Service Type" },
  { id: "factors-affecting-pricing", text: "Factors That Affect Your Pricing" },
  { id: "calculate-minimum-rate", text: "How to Calculate Your Minimum Hourly Rate" },
  { id: "pricing-by-niche", text: "Pricing by Niche" },
  { id: "common-pricing-mistakes", text: "Common Pricing Mistakes" },
  { id: "when-to-raise-rates", text: "When to Raise Your Rates" },
  { id: "faq", text: "Frequently Asked Questions" },
];

export default function ConciergeNursePricingGuide() {
  return (
    <ResourceLayout
      title="How Much Do Concierge Nurses Charge? Pricing Guide"
      description="Learn how concierge nurses set their rates. Covers hourly pricing, package pricing, retainer models, rates by niche and geography, and how to price your concierge nursing services for profitability."
      canonical="https://www.conciergenursesociety.com/resources/concierge-nurse-pricing-guide"
      category="Financial"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={[
        {
          title: "Concierge Nursing Startup Costs",
          description: "Understand every cost involved in launching your concierge nursing business so you can plan your budget.",
          link: "/resources/concierge-nursing-startup-costs",
          category: "Financial"
        },
        {
          title: "Concierge Nurse Income Breakdown",
          description: "See how concierge nurse income works, from gross revenue to take-home pay after expenses.",
          link: "/resources/concierge-nurse-income-breakdown",
          category: "Financial"
        },
        {
          title: "Concierge Nursing Revenue Models",
          description: "Explore the different revenue models concierge nurses use to build sustainable businesses.",
          link: "/resources/concierge-nursing-revenue-models",
          category: "Financial"
        }
      ]}
      cta={{
        title: "Need Help Setting Your Rates?",
        description: "Book a Clarity Consult to get personalized pricing guidance for your concierge nursing business, or explore our Toolkits for ready-made pricing templates.",
        buttonText: "Book a Clarity Consult",
        buttonLink: "/strategy"
      }}
      faqSchema={faqSchema}
    >
      {/* Quick Answer */}
      <h2 id="quick-answer" className="font-heading text-2xl font-bold text-navy mb-4">Quick Answer</h2>
      <QuickAnswer>
        <p>
          Concierge nurses set their own rates based on their specialty, location, experience, and the type of services they offer. Most concierge nurses charge significantly more than traditional nursing roles because they deliver personalized, premium care directly to clients on a private-pay basis. Your pricing should cover all business expenses, taxes, and desired income.
        </p>
      </QuickAnswer>

      {/* Pricing Models */}
      <h2 id="pricing-models" className="font-heading text-2xl font-bold text-navy mb-4">Concierge Nursing Pricing Models</h2>
      <p>
        There is no single correct way to price concierge nursing services. Most successful concierge nurses use one or a combination of three core pricing models: hourly rates, package pricing, and retainer agreements. Hourly pricing is simple and flexible, package pricing bundles services for predictable revenue, and retainers create recurring income through ongoing client relationships. Each model has distinct advantages depending on your services and clients.
      </p>

      <p className="text-navy font-medium mt-4">Tracy teaches her complete pricing framework -- including how to choose and combine models -- inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Rate Ranges */}
      <h2 id="rate-ranges" className="font-heading text-2xl font-bold text-navy mb-4">General Rate Ranges by Service Type</h2>
      <p>
        Concierge nursing rates vary significantly based on the service being provided. Services requiring advanced skills, specialized certifications, or higher liability typically command premium rates. Your actual rates should reflect your local market, experience, and specific value you bring. Rates also differ by pricing model -- a per-session IV therapy rate looks very different from a monthly geriatric care retainer.
      </p>

      <div className="bg-gold/5 border border-gold/20 p-6 mb-6">
        <p className="font-heading text-lg font-semibold text-navy mb-2">Important Disclaimer</p>
        <p>
          Actual rates depend on your geographic market, experience, certifications, and complexity of care. Do not set your rates based solely on what others charge -- calculate your costs and desired income first.
        </p>
      </div>

      <p className="text-navy font-medium mt-4">Tracy provides specific rate guidance and a pricing calculator inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> and <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

      {/* Factors That Affect Pricing */}
      <h2 id="factors-affecting-pricing" className="font-heading text-2xl font-bold text-navy mb-4">Factors That Affect Your Pricing</h2>
      <p>
        No two concierge nursing practices are identical. The key variables that influence pricing include your geographic location and cost of living, your experience and credentials, the specialty and complexity of services you offer, your client demographics, your business overhead, and the non-billable time you invest in documentation, travel, and administration. Each of these factors should be considered when setting your rates.
      </p>

      <p className="text-navy font-medium mt-4">Tracy walks through each pricing factor and how to weigh them for your specific practice inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Calculate Minimum Rate */}
      <h2 id="calculate-minimum-rate" className="font-heading text-2xl font-bold text-navy mb-4">How to Calculate Your Minimum Hourly Rate</h2>
      <p>
        Before setting your prices, you need to understand the minimum you must charge to cover your costs and earn a sustainable income. This involves accounting for your desired take-home pay, all business expenses, self-employment taxes, and realistic billable hours. Your actual rates should be above this minimum to account for growth, savings, and profit margins.
      </p>

      <p className="text-navy font-medium mt-4">Tracy's pricing formula and rate calculator are included in the <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>, with guided walkthroughs in the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Pricing by Niche */}
      <h2 id="pricing-by-niche" className="font-heading text-2xl font-bold text-navy mb-4">Pricing by Niche</h2>
      <p>
        Different concierge nursing niches have different pricing norms. Niches serving affluent clients -- such as executive health, aesthetic services, and post-cosmetic surgery recovery -- often command premium rates. Niches with lower overhead like geriatric care management and health coaching can also be highly profitable due to minimal supply costs and recurring client relationships. Specializing in a niche often allows you to charge more because you offer focused expertise.
      </p>

      <p>
        Not sure which niche is right for you? Explore the full breakdown in our <Link to="/resources/concierge-nursing-niches-guide" className="text-gold hover:text-navy underline">concierge nursing niches guide</Link>.
      </p>

      <p className="text-navy font-medium mt-4">Tracy provides niche-specific pricing guidance inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Common Pricing Mistakes */}
      <h2 id="common-pricing-mistakes" className="font-heading text-2xl font-bold text-navy mb-4">Common Pricing Mistakes</h2>
      <p>
        The most common pricing mistakes include basing rates on your old employee wage instead of true business costs, forgetting to account for non-billable time, underpricing to attract clients, not having a written pricing structure, offering too many discounts, not reviewing rates annually, and comparing yourself to other nurses instead of calculating your own needs. Recognizing these patterns early can save you months of lost revenue.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers how to avoid every one of these pitfalls inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* When to Raise Rates */}
      <h2 id="when-to-raise-rates" className="font-heading text-2xl font-bold text-navy mb-4">When to Raise Your Rates</h2>
      <p>
        Raising rates is a necessary part of running a sustainable business. Clear signals include being consistently fully booked, increased costs, new certifications or skills, more than a year since your last increase, and feeling burned out by volume. When you do raise rates, give existing clients advance notice and frame it around the value you provide.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers rate increase strategy and client communication templates inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> and <Link to="/toolkits" className="text-gold hover:underline">Toolkits</Link>.</p>

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
