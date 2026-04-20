import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const headings = [
  { id: 'defining-after-hours', text: 'Defining After-Hours for Your Practice' },
  { id: 'setting-boundaries', text: 'Setting Boundaries Without Losing Clients' },
  { id: 'communication-systems', text: 'Communication Systems for After-Hours' },
  { id: 'triage-framework', text: 'Building an After-Hours Triage Framework' },
  { id: 'service-agreement-language', text: 'Service Agreement Language' },
  { id: 'self-care-and-sustainability', text: 'Self-Care and Sustainability' },
  { id: 'charging-for-after-hours', text: 'Charging for After-Hours Access' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'How to Create Concierge Nursing Service Packages That Sell',
    description: 'Build packages that clearly define when and how clients can reach you.',
    link: '/resources/operations/concierge-nursing-service-packages',
    category: 'Operations',
  },
  {
    title: 'How to Fire a Client: Setting Boundaries in Concierge Nursing',
    description: 'When boundary violations become a pattern, know when and how to end the relationship.',
    link: '/resources/operations/concierge-nurse-fire-client',
    category: 'Operations',
  },
  {
    title: 'How to Manage Scheduling as a Solo Concierge Nurse',
    description: 'Scheduling strategies that protect your time and prevent burnout.',
    link: '/resources/operations/concierge-nurse-scheduling',
    category: 'Operations',
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Should I be available 24/7 as a concierge nurse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Being available 24/7 is unsustainable for a solo practitioner and leads to burnout. Define clear after-hours policies, communicate them upfront, and offer tiered availability based on service packages. Clients who need round-the-clock access should be on a premium tier that compensates you appropriately."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle after-hours emergencies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your service agreement should clearly state that you are not an emergency service and that clients should call 911 for life-threatening emergencies. For urgent but non-emergency situations, provide a clear protocol such as a nurse triage line, an on-call arrangement, or instructions for contacting their primary care provider's after-hours service."
      }
    },
    {
      "@type": "Question",
      "name": "Can I charge extra for after-hours calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, and you should. After-hours access has a premium value. You can include limited after-hours access in higher-tier packages or charge per after-hours consultation. Make the pricing transparent in your service agreement so clients understand the cost before they contact you outside business hours."
      }
    },
    {
      "@type": "Question",
      "name": "What technology should I use for after-hours communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a HIPAA-compliant communication platform with features like Do Not Disturb scheduling and separate business notifications. A dedicated business phone number through a VoIP service allows you to set availability hours, route after-hours calls to voicemail, and keep your personal number private."
      }
    },
    {
      "@type": "Question",
      "name": "How do I train clients to respect my after-hours boundaries?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set expectations during onboarding by reviewing your after-hours policy in detail. Reinforce boundaries consistently by not responding to non-urgent after-hours messages until business hours. If a client repeatedly violates boundaries, have a direct conversation referencing your service agreement. Consistency is key."
      }
    },
    {
      "@type": "Question",
      "name": "What if I feel guilty about not being available after hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This is common among nurses who are trained to be always available. Remind yourself that boundaries protect the quality of care you provide during business hours. A burned-out nurse serves no one well. You are not abandoning your clients by having off hours. You are ensuring you can show up at your best when you are on."
      }
    }
  ]
};

export default function AfterHours() {
  return (
    <ResourceLayout
      title="How to Handle After-Hours Calls as a Concierge Nurse"
      description="Practical strategies for managing after-hours client communication, setting sustainable boundaries, and building policies that protect your well-being without compromising client trust."
      canonical="https://www.conciergenursesociety.com/resources/operations/concierge-nurse-after-hours-calls"
      category="Operations"
      categorySlug="/resources"
      headings={headings}
      relatedResources={relatedResources}
      faqSchema={faqSchema}
      cta={{
        title: 'Build Your Business the Right Way',
        description: 'The Accelerator program helps you build sustainable systems including after-hours policies that work.',
        buttonText: 'Learn About the Accelerator',
        buttonLink: '/accelerator',
      }}
    >
      <QuickAnswer>
        <p>
          Handle after-hours calls by establishing clear availability windows in your service agreement, using a dedicated business phone number with automated after-hours routing, and charging appropriately for premium after-hours access in higher service tiers.
        </p>
      </QuickAnswer>

      <p>
        After-hours calls are one of the most challenging aspects of running a concierge nursing practice. Without clear boundaries and systems, after-hours requests will consume your evenings, weekends, and mental health. The concierge nurses who thrive long-term set clear policies from day one and enforce them consistently.
      </p>

      <h2 id="defining-after-hours">Defining After-Hours for Your Practice</h2>
      <p>
        Before you can manage after-hours calls, you need to define what "after hours" means for your practice. Many concierge nurses launch without establishing clear business hours, which means they are technically always available. Defining your hours and urgency tiers is the essential first step.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="setting-boundaries">Setting Boundaries Without Losing Clients</h2>
      <p>
        The fear of losing clients by setting boundaries is the single biggest reason concierge nurses burn out. The reality is that boundaries actually increase client trust when communicated properly. They signal professionalism and ensure that when you are available, you are fully present and rested.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="communication-systems">Communication Systems for After-Hours</h2>
      <p>
        The right technology separates business communication from personal communication so you can mentally disconnect when you are off. A dedicated business phone number, automated after-hours messaging, and separate notification profiles are all essential components of a sustainable after-hours system.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="triage-framework">Building an After-Hours Triage Framework</h2>
      <p>
        Not every after-hours contact is the same. A clear triage framework helps route communications appropriately, distinguishing between emergencies, urgent situations, and non-urgent matters. Having this framework in place before you need it is critical for both your clients and your peace of mind.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="service-agreement-language">Service Agreement Language</h2>
      <p>
        Your after-hours policy must be documented in your service agreement. Verbal agreements are forgotten. Written policies are referenced. Your agreement should clearly cover business hours, expected response times, emergency protocols, and after-hours fees.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="self-care-and-sustainability">Self-Care and Sustainability</h2>
      <p>
        As a solo concierge nurse, you are the entire team. After-hours boundaries are fundamentally a sustainability strategy that ensures you can operate your practice for years, not just months. Protecting your well-being is not optional; it directly affects the quality of care you provide to every client.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="charging-for-after-hours">Charging for After-Hours Access</h2>
      <p>
        After-hours access is a premium service and your pricing should reflect that. There are several approaches to structuring after-hours pricing within your <Link to="/resources/operations/concierge-nursing-service-packages" className="text-gold hover:text-navy font-semibold">service packages</Link>, and the key is transparency so clients know the cost before they need it.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>Should I be available 24/7 as a concierge nurse?</h3>
      <p>
        No. Being available 24/7 is unsustainable and leads to burnout. Offer tiered availability based on service packages.
      </p>

      <h3>How do I handle after-hours emergencies?</h3>
      <p>
        Your service agreement should clearly state that clients should call 911 for emergencies. Provide a protocol for urgent non-emergency situations.
      </p>

      <h3>Can I charge extra for after-hours calls?</h3>
      <p>
        Yes. After-hours access has premium value and should be priced transparently in your service agreement.
      </p>

      <h3>What technology should I use for after-hours communication?</h3>
      <p>
        Use a HIPAA-compliant platform with Do Not Disturb scheduling and a dedicated business phone number.
      </p>

      <h3>How do I train clients to respect my after-hours boundaries?</h3>
      <p>
        Set expectations during onboarding and reinforce them consistently by not responding to non-urgent messages until business hours.
      </p>

      <h3>What if I feel guilty about not being available after hours?</h3>
      <p>
        Boundaries protect the quality of care you provide during business hours. A burned-out nurse serves no one well.
      </p>
    </ResourceLayout>
  );
}
