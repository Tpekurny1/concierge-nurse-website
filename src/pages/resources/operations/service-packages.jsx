import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const headings = [
  { id: 'why-packages', text: 'Why Service Packages Outperform Hourly Billing' },
  { id: 'anatomy-of-a-package', text: 'Anatomy of a Concierge Nursing Package' },
  { id: 'tiered-model', text: 'Building a Tiered Package Model' },
  { id: 'pricing-your-packages', text: 'How to Price Your Packages' },
  { id: 'presenting-packages', text: 'How to Present Packages to Clients' },
  { id: 'common-package-types', text: 'Common Concierge Nursing Package Types' },
  { id: 'mistakes-to-avoid', text: 'Package Design Mistakes to Avoid' },
  { id: 'refining-over-time', text: 'Refining Your Packages Over Time' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'Concierge Nursing Client Onboarding: Step-by-Step Process',
    description: 'How to transition new clients smoothly into your service packages.',
    link: '/resources/operations/concierge-nursing-client-onboarding',
    category: 'Operations',
  },
  {
    title: 'How to Handle After-Hours Calls as a Concierge Nurse',
    description: 'Define after-hours access and set clear boundaries in your packages.',
    link: '/resources/operations/concierge-nurse-after-hours-calls',
    category: 'Operations',
  },
  {
    title: 'How to Fire a Client: Setting Boundaries in Concierge Nursing',
    description: 'What to do when a client relationship is no longer working.',
    link: '/resources/operations/concierge-nurse-fire-client',
    category: 'Operations',
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many service packages should I offer as a concierge nurse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start with two to three packages. This gives clients a meaningful choice without overwhelming them. A common approach is a base package, a mid-tier package, and a premium package. You can always add specialty packages later as you identify specific client needs."
      }
    },
    {
      "@type": "Question",
      "name": "Should I offer hourly rates or only packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Packages are generally better for concierge nursing because they create predictable revenue for you and predictable costs for clients. However, some services like one-time consultations or hospital accompaniment may work better as standalone hourly or flat-fee offerings alongside your package options."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle clients who want services outside their package?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Define add-on services and their pricing clearly in your service agreement. When a client requests something outside their package, present it as an upgrade or add-on with transparent pricing. This protects your time while giving clients flexibility."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I update my service packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Review your packages at least every six months. Look at which packages sell best, which services clients request most, and where you spend time that is not reflected in your pricing. Adjust based on real data from your practice rather than assumptions."
      }
    },
    {
      "@type": "Question",
      "name": "Can I customize packages for individual clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Light customization is fine and expected in concierge care. However, avoid creating fully custom packages for every client, as this makes your operations unpredictable and pricing inconsistent. Use your standard packages as a foundation and offer defined add-ons for personalization."
      }
    },
    {
      "@type": "Question",
      "name": "What should I include in my most basic package?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your base package should include enough value that clients feel supported, but leave room for clear upgrades. A typical base package might include an initial assessment, a defined number of check-in calls per month, care coordination, and access to you during business hours. More intensive services go in higher tiers."
      }
    }
  ]
};

export default function ServicePackages() {
  return (
    <ResourceLayout
      title="How to Create Concierge Nursing Service Packages That Sell"
      description="Learn how to design, price, and present concierge nursing service packages that attract ideal clients and create predictable recurring revenue for your practice."
      canonical="https://www.conciergenursesociety.com/resources/operations/concierge-nursing-service-packages"
      category="Operations"
      categorySlug="/resources"
      headings={headings}
      relatedResources={relatedResources}
      faqSchema={faqSchema}
      cta={{
        title: 'Get the Business Toolkit',
        description: 'Includes service packaging templates and pricing frameworks designed specifically for concierge nurses.',
        buttonText: 'Explore Toolkits',
        buttonLink: '/toolkits',
      }}
    >
      <QuickAnswer>
        <p>
          Effective concierge nursing service packages bundle your clinical expertise into clearly defined tiers with transparent pricing. Start with two to three packages that range from basic care coordination to comprehensive concierge support, and price based on the value you deliver rather than hours worked.
        </p>
      </QuickAnswer>

      <p>
        Service packages are the engine of a sustainable concierge nursing business. They replace the unpredictable income of hourly billing with recurring, predictable revenue, set clear expectations, and position your services as a professional offering rather than a commodity measured by the clock.
      </p>

      <h2 id="why-packages">Why Service Packages Outperform Hourly Billing</h2>
      <p>
        Hourly billing penalizes efficiency and creates anxiety for clients who feel the meter running. Packages solve this by giving you predictable revenue and giving clients predictable costs. The shift from hourly to packaged services is one of the most important business decisions a concierge nurse can make.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="anatomy-of-a-package">Anatomy of a Concierge Nursing Package</h2>
      <p>
        Every well-designed service package needs several essential components working together: a clear name, a description of who it serves, included services, clear boundaries, and transparent pricing. Getting these components right is the difference between packages that sell and packages that confuse.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="tiered-model">Building a Tiered Package Model</h2>
      <p>
        A tiered model with two to three options works best for most concierge nurses. The structure of your tiers and how they relate to each other is what drives clients toward the right choice. Each tier should provide clear, increasing value that justifies the price difference.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="pricing-your-packages">How to Price Your Packages</h2>
      <p>
        Pricing is where many concierge nurses get stuck. The key is to price based on the value you deliver, not the time you spend. Understanding your costs, your market, and your ideal client are all essential inputs. Underpricing is one of the most common and costly mistakes new concierge nurses make.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="presenting-packages">How to Present Packages to Clients</h2>
      <p>
        How you present your packages matters as much as what is in them. The order you present them, the language you use, and the materials you provide all influence which package a client selects. Focusing on outcomes rather than tasks is a key part of the presentation process.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="common-package-types">Common Concierge Nursing Package Types</h2>
      <p>
        Beyond the standard tiered model, many concierge nurses offer specialty packages for situations like post-surgical recovery, new parent support, travel health, and aging-in-place care. These specialty packages can serve as entry points or supplements to your core offerings.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="mistakes-to-avoid">Package Design Mistakes to Avoid</h2>
      <p>
        The most common mistakes include giving away too much in the base tier, using vague language, not defining exclusions, pricing too low out of fear, and not backing packages with a service agreement. Each of these creates problems that compound over time.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="refining-over-time">Refining Your Packages Over Time</h2>
      <p>
        Your initial packages are a starting point. Review them regularly based on real data from your practice and adjust as you learn what your clients truly need and value. For hands-on guidance in structuring your entire service model, explore the <Link to="/accelerator" className="text-gold hover:text-navy font-semibold">Concierge Nurse Accelerator</Link> program.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>How many service packages should I offer as a concierge nurse?</h3>
      <p>
        Start with two to three packages. You can add specialty packages later as you identify specific client needs.
      </p>

      <h3>Should I offer hourly rates or only packages?</h3>
      <p>
        Packages are generally better for predictable revenue, but some services like one-time consultations may work better as standalone flat-fee offerings.
      </p>

      <h3>How do I handle clients who want services outside their package?</h3>
      <p>
        Define add-on services and pricing in your service agreement so upgrades are transparent and straightforward.
      </p>

      <h3>How often should I update my service packages?</h3>
      <p>
        Review your packages at least every six months and adjust based on real data from your practice.
      </p>

      <h3>Can I customize packages for individual clients?</h3>
      <p>
        Light customization is fine, but avoid fully custom packages for every client. Use standard packages as a foundation with defined add-ons.
      </p>

      <h3>What should I include in my most basic package?</h3>
      <p>
        Enough value that clients feel supported, but with clear room for upgrades to higher tiers.
      </p>
    </ResourceLayout>
  );
}
