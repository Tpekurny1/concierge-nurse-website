import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const headings = [
  { id: 'scheduling-challenges', text: 'Unique Scheduling Challenges for Solo Nurses' },
  { id: 'designing-your-week', text: 'Designing Your Ideal Week' },
  { id: 'time-blocking', text: 'Time Blocking for Concierge Nurses' },
  { id: 'client-booking', text: 'Managing Client Booking' },
  { id: 'travel-time', text: 'Accounting for Travel Time' },
  { id: 'cancellations-no-shows', text: 'Handling Cancellations and No-Shows' },
  { id: 'protecting-admin-time', text: 'Protecting Administrative Time' },
  { id: 'seasonal-adjustments', text: 'Seasonal and Demand Adjustments' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'How to Handle After-Hours Calls as a Concierge Nurse', description: 'Set clear boundaries around your availability beyond scheduled hours.', link: '/resources/operations/concierge-nurse-after-hours-calls', category: 'Operations' },
  { title: 'Tools and Software Every Concierge Nurse Needs', description: 'Scheduling tools and calendar management solutions for your practice.', link: '/resources/operations/concierge-nursing-tools-software', category: 'Operations' },
  { title: 'How to Create Concierge Nursing Service Packages That Sell', description: 'Build packages with clear visit frequencies that simplify your scheduling.', link: '/resources/operations/concierge-nursing-service-packages', category: 'Operations' },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How many clients can a solo concierge nurse manage?", "acceptedAnswer": { "@type": "Answer", "text": "This depends on your service model, visit frequency, and the complexity of your clients' needs. The key is to be intentional about your client panel size rather than taking on clients until you are overwhelmed." } },
    { "@type": "Question", "name": "Should I let clients book their own appointments?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, offering online self-scheduling within defined parameters saves significant time. Set up your scheduling tool with available time slots, appointment types, and buffer times." } },
    { "@type": "Question", "name": "How do I handle clients who frequently cancel or no-show?", "acceptedAnswer": { "@type": "Answer", "text": "Start with a clear cancellation policy communicated during onboarding. Require a minimum notice period for cancellations. For repeated offenses, have a direct conversation about the impact on your practice." } },
    { "@type": "Question", "name": "How much buffer time should I leave between appointments?", "acceptedAnswer": { "@type": "Answer", "text": "At minimum, schedule 15 to 30 minutes between back-to-back appointments for documentation, mental reset, and preparation. For in-home visits, add realistic travel time based on your service area." } },
    { "@type": "Question", "name": "How do I balance clinical work with administrative tasks?", "acceptedAnswer": { "@type": "Answer", "text": "Designate specific blocks of time for administrative work and protect them as firmly as you protect client appointments. Many concierge nurses find that dedicating one full day per week to admin work prevents it from bleeding into every evening and weekend." } },
    { "@type": "Question", "name": "What scheduling tools work best for concierge nurses?", "acceptedAnswer": { "@type": "Answer", "text": "Look for scheduling tools that offer online booking, automated reminders, calendar sync, buffer time settings, and different appointment types. Choose based on your overall tech stack and integration needs." } }
  ]
};

export default function Scheduling() {
  return (
    <ResourceLayout
      title="How to Manage Scheduling as a Solo Concierge Nurse"
      description="Practical scheduling strategies for solo concierge nurses who need to balance client visits, administrative work, travel time, and personal boundaries without burning out."
      canonical="https://www.conciergenursesociety.com/resources/operations/concierge-nurse-scheduling"
      category="Operations"
      categorySlug="/resources"
      headings={headings}
      relatedResources={relatedResources}
      faqSchema={faqSchema}
      cta={{ title: 'Build Sustainable Systems', description: 'The Accelerator program teaches you how to design your practice around a schedule that works for your life.', buttonText: 'Learn About the Accelerator', buttonLink: '/accelerator' }}
    >
      <QuickAnswer>
        <p>Manage your schedule as a solo concierge nurse by designing a structured weekly template with time blocks for client visits, administrative work, and personal time. Use online scheduling tools with built-in buffer times and automated reminders, and set clear policies for cancellations and rescheduling.</p>
      </QuickAnswer>

      <p>As a solo concierge nurse, your calendar is your most valuable resource. Without intentional scheduling, client appointments expand to fill every available hour, administrative tasks get pushed to evenings and weekends, and burnout becomes inevitable. The concierge nurses who build sustainable practices design their schedules proactively.</p>

      <h2 id="scheduling-challenges">Unique Scheduling Challenges for Solo Nurses</h2>
      <p>Solo concierge nurses face scheduling challenges that employed nurses or larger practices do not. You are both clinician and administrator, your visit locations vary, clients expect flexibility, and there is no backup when you overbook. Understanding these challenges is the first step to solving them.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="designing-your-week">Designing Your Ideal Week</h2>
      <p>Before you schedule a single client appointment, design the structural template of your ideal week. This template defines how your time is allocated across client-facing work, administrative tasks, and personal time. Getting this foundation right prevents the reactive scheduling that leads to burnout.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="time-blocking">Time Blocking for Concierge Nurses</h2>
      <p>Time blocking is the practice of assigning specific activities to specific blocks of time rather than working from a running to-do list. It is particularly effective for concierge nurses because your work spans multiple categories that all compete for attention.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="client-booking">Managing Client Booking</h2>
      <p>How clients book appointments significantly impacts your scheduling efficiency. The most effective approach combines self-service booking with defined guardrails so clients can book within your parameters without disrupting your overall structure.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="travel-time">Accounting for Travel Time</h2>
      <p>If you provide in-home visits, travel time is a major scheduling factor. Failing to account for it realistically is one of the fastest ways to fall behind. Defining your service area and clustering visits geographically are essential considerations.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="cancellations-no-shows">Handling Cancellations and No-Shows</h2>
      <p>Cancellations and no-shows are revenue killers for solo practitioners. A clear policy communicated during <Link to="/resources/operations/concierge-nursing-client-onboarding" className="text-gold hover:text-navy font-semibold">client onboarding</Link> is essential for protecting your schedule and your revenue.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="protecting-admin-time">Protecting Administrative Time</h2>
      <p>Administrative work is invisible to clients but essential to your practice. If you do not schedule it, it does not happen, or it happens during your personal time. Treating admin blocks with the same respect as client appointments is key to sustainable operations.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="seasonal-adjustments">Seasonal and Demand Adjustments</h2>
      <p>Your scheduling needs will change throughout the year with seasonal demand patterns. Building flexibility into your schedule and using slower periods strategically keeps your practice running smoothly. For guided support, explore the <Link to="/accelerator" className="text-gold hover:text-navy font-semibold">Concierge Nurse Accelerator</Link>.</p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>How many clients can a solo concierge nurse manage?</h3>
      <p>This depends on your service model and client complexity. Be intentional about your panel size and increase gradually.</p>

      <h3>Should I let clients book their own appointments?</h3>
      <p>Yes, online self-scheduling within defined parameters saves significant time while you maintain control.</p>

      <h3>How do I handle clients who frequently cancel or no-show?</h3>
      <p>Start with a clear cancellation policy during onboarding. Address repeated offenses directly and consider cancellation fees.</p>

      <h3>How much buffer time should I leave between appointments?</h3>
      <p>At minimum, 15 to 30 minutes for documentation and mental reset. Add realistic travel time for in-home visits.</p>

      <h3>How do I balance clinical work with administrative tasks?</h3>
      <p>Designate specific blocks for admin work and protect them as firmly as client appointments.</p>

      <h3>What scheduling tools work best for concierge nurses?</h3>
      <p>Look for online booking, automated reminders, calendar sync, and buffer time settings. Choose based on your overall tech stack.</p>
    </ResourceLayout>
  );
}
