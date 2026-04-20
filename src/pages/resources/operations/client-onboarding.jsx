import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const headings = [
  { id: 'why-onboarding-matters', text: 'Why a Structured Onboarding Process Matters' },
  { id: 'pre-onboarding', text: 'Pre-Onboarding: Before the First Meeting' },
  { id: 'initial-consultation', text: 'The Initial Consultation' },
  { id: 'intake-documentation', text: 'Intake Documentation and Forms' },
  { id: 'service-agreement', text: 'Reviewing the Service Agreement' },
  { id: 'first-thirty-days', text: 'The First 30 Days' },
  { id: 'automating-onboarding', text: 'Automating Parts of Your Onboarding' },
  { id: 'red-flags', text: 'Red Flags During Onboarding' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'How to Create Concierge Nursing Service Packages That Sell',
    description: 'Design the packages you will present during your onboarding consultations.',
    link: '/resources/operations/concierge-nursing-service-packages',
    category: 'Operations',
  },
  {
    title: 'How to Build SOPs for Your Concierge Nursing Business',
    description: 'Turn your onboarding process into a repeatable standard operating procedure.',
    link: '/resources/operations/concierge-nursing-sops',
    category: 'Operations',
  },
  {
    title: 'How to Handle After-Hours Calls as a Concierge Nurse',
    description: 'Set after-hours expectations during onboarding to prevent issues later.',
    link: '/resources/operations/concierge-nurse-after-hours-calls',
    category: 'Operations',
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long should the concierge nursing onboarding process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The initial intake and assessment typically take one to two meetings. The full onboarding period, including the adjustment phase where you establish routines and communication patterns, usually spans the first 30 days. Do not rush it. A thorough onboarding sets the foundation for a successful long-term relationship."
      }
    },
    {
      "@type": "Question",
      "name": "What forms do I need for client onboarding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Essential forms include a client intake questionnaire, health history form, medication list, emergency contact information, HIPAA acknowledgment, consent for services, and your service agreement. You may also need a release of information form if you will communicate with other healthcare providers on the client's behalf."
      }
    },
    {
      "@type": "Question",
      "name": "Should I charge for the initial consultation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This varies by practice. Some concierge nurses offer a brief complimentary discovery call to determine fit, then charge for the comprehensive initial assessment. Others include the initial assessment in the first month's package fee. Choose the approach that aligns with your business model and communicates the value of your time."
      }
    },
    {
      "@type": "Question",
      "name": "How do I onboard clients who live far away?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Virtual onboarding works well for telehealth-based or care coordination services. Conduct the initial consultation via video, send forms electronically with e-signature capability, and establish communication channels digitally. For services requiring in-person assessments, you may need to schedule a dedicated onboarding visit."
      }
    },
    {
      "@type": "Question",
      "name": "What if a client is not a good fit during onboarding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is better to identify a poor fit during onboarding than months into the relationship. If you recognize red flags like unrealistic expectations, disrespectful behavior, or needs outside your scope of practice, have an honest conversation. You can decline to take on a client respectfully by explaining that their needs would be better served by a different type of provider."
      }
    },
    {
      "@type": "Question",
      "name": "Should I send a welcome packet to new clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A welcome packet, whether physical or digital, is a professional touch that reinforces the concierge experience. Include a summary of their selected service package, your contact information and business hours, what to expect in the first 30 days, and any forms they still need to complete."
      }
    }
  ]
};

export default function ClientOnboarding() {
  return (
    <ResourceLayout
      title="Concierge Nursing Client Onboarding: Step-by-Step Process"
      description="A detailed walkthrough of the client onboarding process for concierge nurses, from initial inquiry to a fully established care relationship within the first 30 days."
      canonical="https://www.conciergenursesociety.com/resources/operations/concierge-nursing-client-onboarding"
      category="Operations"
      categorySlug="/resources"
      headings={headings}
      relatedResources={relatedResources}
      faqSchema={faqSchema}
      cta={{
        title: 'Get the Business Toolkit',
        description: 'Includes onboarding checklists, intake form templates, and service agreement frameworks ready to customize.',
        buttonText: 'Explore Toolkits',
        buttonLink: '/toolkits',
      }}
    >
      <QuickAnswer>
        <p>
          A strong concierge nursing onboarding process includes a discovery call to assess fit, a comprehensive intake with health history and documentation, a service agreement review with clear expectations, and a structured first 30 days that establishes care routines. Onboarding sets the tone for the entire client relationship.
        </p>
      </QuickAnswer>

      <p>
        Onboarding is the most important phase of any client relationship. It is where expectations are set, trust is established, and the foundation for long-term care is built. A structured onboarding process demonstrates professionalism, reduces misunderstandings, and makes clients feel confident they made the right choice.
      </p>

      <h2 id="why-onboarding-matters">Why a Structured Onboarding Process Matters</h2>
      <p>
        In concierge nursing, your clients are investing in a relationship, not a transaction. The onboarding experience shapes their perception of that relationship from day one. A well-structured process gathers information, sets expectations, protects you legally, and creates a professional first impression.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="pre-onboarding">Pre-Onboarding: Before the First Meeting</h2>
      <p>
        The onboarding process starts before you ever meet the client face-to-face. Your initial response, discovery call process, and pre-intake paperwork all need to feel organized and intentional. How you handle this phase directly impacts whether a prospect becomes a client.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="initial-consultation">The Initial Consultation</h2>
      <p>
        The initial consultation is your first in-depth meeting with the client. This meeting covers intake form review, health assessment, home evaluation if applicable, and care plan discussion. How you structure this meeting sets the clinical and professional tone for the entire relationship.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="intake-documentation">Intake Documentation and Forms</h2>
      <p>
        Your intake documentation should be thorough enough to provide a complete picture of the client's health and situation, but not so overwhelming that it feels like a burden. The right forms, delivered through the right platform, make this process smooth for both you and your client.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="service-agreement">Reviewing the Service Agreement</h2>
      <p>
        The service agreement is a critical document that protects both you and your client. Walking through it together ensures the client understands scope of services, fees, communication expectations, and termination terms. Do not just send it for signature without a thorough review.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="first-thirty-days">The First 30 Days</h2>
      <p>
        Signing the service agreement is not the end of onboarding. The first 30 days are a critical period where you establish the rhythms and routines of the care relationship. How you handle the welcome, early visits, and the 30-day review shapes the long-term client experience.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="automating-onboarding">Automating Parts of Your Onboarding</h2>
      <p>
        As your client panel grows, manually managing every onboarding step becomes time-consuming. Certain parts of the process can be automated without losing the personal touch, saving you significant time while maintaining a premium client experience.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="red-flags">Red Flags During Onboarding</h2>
      <p>
        Not every inquiry will become a great client. Recognizing warning signs during the onboarding process, such as unrealistic expectations, resistance to agreements, or disrespectful behavior, saves you from having to <Link to="/resources/operations/concierge-nurse-fire-client" className="text-gold hover:text-navy font-semibold">fire a client</Link> later.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>How long should the concierge nursing onboarding process take?</h3>
      <p>
        The initial intake typically takes one to two meetings. The full onboarding period usually spans the first 30 days as you establish routines and communication patterns.
      </p>

      <h3>What forms do I need for client onboarding?</h3>
      <p>
        Essential forms include intake questionnaire, health history, medication list, emergency contacts, HIPAA acknowledgment, consent for services, and your service agreement.
      </p>

      <h3>Should I charge for the initial consultation?</h3>
      <p>
        This varies by practice. Choose the approach that aligns with your business model and communicates the value of your time.
      </p>

      <h3>How do I onboard clients who live far away?</h3>
      <p>
        Virtual onboarding works well for telehealth-based or care coordination services using video consultations and electronic forms.
      </p>

      <h3>What if a client is not a good fit during onboarding?</h3>
      <p>
        It is better to identify a poor fit early. You can decline to take on a client respectfully by explaining that their needs would be better served elsewhere.
      </p>

      <h3>Should I send a welcome packet to new clients?</h3>
      <p>
        Yes. A welcome packet reinforces the concierge experience and provides essential information about their package, your contact details, and what to expect.
      </p>
    </ResourceLayout>
  );
}
