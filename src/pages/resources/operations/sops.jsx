import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const headings = [
  { id: 'what-are-sops', text: 'What Are SOPs and Why Do They Matter?' },
  { id: 'sops-you-need-first', text: 'The SOPs You Need First' },
  { id: 'writing-effective-sops', text: 'How to Write Effective SOPs' },
  { id: 'sop-format', text: 'Choosing the Right SOP Format' },
  { id: 'clinical-vs-business', text: 'Clinical SOPs vs. Business SOPs' },
  { id: 'storing-and-organizing', text: 'Storing and Organizing Your SOPs' },
  { id: 'reviewing-and-updating', text: 'Reviewing and Updating SOPs' },
  { id: 'sops-for-scaling', text: 'SOPs as a Foundation for Scaling' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  { title: 'Concierge Nursing Client Onboarding: Step-by-Step Process', description: 'Your onboarding process is one of the first SOPs you should formalize.', link: '/resources/operations/concierge-nursing-client-onboarding', category: 'Operations' },
  { title: 'Tools and Software Every Concierge Nurse Needs', description: 'The technology that supports and automates your standard operating procedures.', link: '/resources/operations/concierge-nursing-tools-software', category: 'Operations' },
  { title: 'When to Hire: Scaling Your Concierge Nursing Team', description: 'SOPs become essential when you bring on your first team member.', link: '/resources/operations/when-to-hire-concierge-nursing', category: 'Operations' },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Do I need SOPs if I am a solo concierge nurse?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. SOPs are not just for teams. As a solo practitioner, SOPs keep you consistent, save you from decision fatigue, and ensure you do not skip important steps when you are busy or tired. They also become invaluable if you ever hire help or need someone to cover for you." } },
    { "@type": "Question", "name": "How many SOPs do I need to start my concierge nursing business?", "acceptedAnswer": { "@type": "Answer", "text": "Start with five to seven core SOPs covering your most frequent and important processes: client onboarding, documentation, scheduling, communication protocols, billing, and emergency procedures. You can add more as your practice grows and you identify additional processes that need standardization." } },
    { "@type": "Question", "name": "How detailed should my SOPs be?", "acceptedAnswer": { "@type": "Answer", "text": "Detailed enough that someone unfamiliar with your practice could follow them and produce a consistent result. Include specific steps, tools used, time frames, and decision criteria. The test is whether a competent nurse could follow your SOP on their first day." } },
    { "@type": "Question", "name": "How often should I update my SOPs?", "acceptedAnswer": { "@type": "Answer", "text": "Review your SOPs at least quarterly. Update them whenever you change a process, adopt new software, adjust your service packages, or identify a gap. Version-date every update so you can track changes over time." } },
    { "@type": "Question", "name": "What is the best format for SOPs?", "acceptedAnswer": { "@type": "Answer", "text": "The best format is the one you will actually use. Step-by-step numbered lists work well for sequential processes. Checklists work well for processes with independent steps. Flowcharts work well for processes with decision points. Many practices use a combination." } },
    { "@type": "Question", "name": "Where should I store my SOPs?", "acceptedAnswer": { "@type": "Answer", "text": "Store SOPs in a cloud-based system that you can access from anywhere and that supports version control. If your SOPs contain references to protected health information or clinical protocols, ensure the storage platform is HIPAA compliant." } }
  ]
};

export default function Sops() {
  return (
    <ResourceLayout
      title="How to Build SOPs for Your Concierge Nursing Business"
      description="Learn how to create standard operating procedures that bring consistency, efficiency, and scalability to every aspect of your concierge nursing practice."
      canonical="https://www.conciergenursesociety.com/resources/operations/concierge-nursing-sops"
      category="Operations"
      categorySlug="/resources"
      headings={headings}
      relatedResources={relatedResources}
      faqSchema={faqSchema}
      cta={{ title: 'Get the Business Toolkit', description: 'Includes SOP templates and checklists you can customize for your concierge nursing practice.', buttonText: 'Explore Toolkits', buttonLink: '/toolkits' }}
    >
      <QuickAnswer>
        <p>Standard operating procedures (SOPs) document the repeatable processes in your concierge nursing business so every task is done consistently and nothing falls through the cracks. Start by documenting your most frequent workflows including client onboarding, documentation, scheduling, billing, and emergency protocols.</p>
      </QuickAnswer>

      <p>Every concierge nurse has processes they follow every day. The difference between a practice that runs smoothly and one that constantly feels chaotic is whether those processes are documented, refined, and followed consistently. SOPs turn the way you work into a reliable system.</p>

      <h2 id="what-are-sops">What Are SOPs and Why Do They Matter?</h2>
      <p>A standard operating procedure is a documented set of steps for completing a specific task or process. In clinical settings, you followed SOPs constantly. Your concierge nursing business needs the same level of procedural clarity for consistency, efficiency, quality control, and scalability.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="sops-you-need-first">The SOPs You Need First</h2>
      <p>You do not need to document every single process before launching your business. Start with the SOPs that will have the most impact on your daily operations and client experience, such as onboarding, documentation, scheduling, communication, billing, and emergency protocols.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="writing-effective-sops">How to Write Effective SOPs</h2>
      <p>The best SOPs are clear, actionable, and easy to follow. They begin with a trigger event, list steps in order, include decision points, reference specific tools, and define what completion looks like. Getting the framework right ensures your SOPs are actually useful.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="sop-format">Choosing the Right SOP Format</h2>
      <p>Different processes call for different formats. Step-by-step lists work for sequential processes, checklists work for independent tasks, and flowcharts work for processes with decision points. Most concierge nursing practices use a combination depending on the process.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="clinical-vs-business">Clinical SOPs vs. Business SOPs</h2>
      <p>Your practice will have two categories of SOPs. Clinical SOPs cover processes related to client care and must reflect evidence-based practice. Business SOPs cover operational processes and focus on efficiency. Some SOPs bridge both categories and should be organized by primary function.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="storing-and-organizing">Storing and Organizing Your SOPs</h2>
      <p>An SOP that you cannot find when you need it is useless. A clear storage and organization system with cloud-based access, consistent folder structure, naming conventions, and a master index ensures every SOP is accessible from anywhere.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="reviewing-and-updating">Reviewing and Updating SOPs</h2>
      <p>SOPs are living documents. Set a quarterly review schedule to check each SOP against your current practice, look for process improvements, and update tool references. Version-dating every update ensures you always know which version is current.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="sops-for-scaling">SOPs as a Foundation for Scaling</h2>
      <p>If you ever plan to hire help or grow into a multi-nurse practice, SOPs are the foundation that makes it possible. Even if scaling feels far away, building SOPs now means you are ready when the time comes. See our guide on <Link to="/resources/operations/when-to-hire-concierge-nursing" className="text-gold hover:text-navy font-semibold">when to hire and scale your concierge nursing team</Link>.</p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>Do I need SOPs if I am a solo concierge nurse?</h3>
      <p>Yes. SOPs keep you consistent, reduce decision fatigue, and become invaluable if you ever hire help or need coverage.</p>

      <h3>How many SOPs do I need to start my concierge nursing business?</h3>
      <p>Start with five to seven core SOPs covering your most frequent and important processes. Add more as your practice grows.</p>

      <h3>How detailed should my SOPs be?</h3>
      <p>Detailed enough that someone unfamiliar with your practice could follow them and produce a consistent result.</p>

      <h3>How often should I update my SOPs?</h3>
      <p>Review quarterly. Update whenever you change a process, adopt new software, or identify a gap.</p>

      <h3>What is the best format for SOPs?</h3>
      <p>The format you will actually use. Numbered lists, checklists, and flowcharts each work well for different types of processes.</p>

      <h3>Where should I store my SOPs?</h3>
      <p>Cloud-based storage with version control and a consistent folder structure. Ensure HIPAA compliance if SOPs reference clinical protocols.</p>
    </ResourceLayout>
  );
}
