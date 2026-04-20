import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const headings = [
  { id: 'why-dedicated-workspace', text: 'Why You Need a Dedicated Workspace' },
  { id: 'essential-equipment', text: 'Essential Equipment and Furniture' },
  { id: 'hipaa-compliant-setup', text: 'Creating a HIPAA-Compliant Home Office' },
  { id: 'technology-infrastructure', text: 'Technology and Internet Infrastructure' },
  { id: 'organization-systems', text: 'Organization Systems That Work' },
  { id: 'professional-virtual-presence', text: 'Professional Virtual Presence' },
  { id: 'tax-deduction-considerations', text: 'Tax Deduction Considerations' },
  { id: 'common-mistakes', text: 'Common Mistakes to Avoid' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'Tools and Software Every Concierge Nurse Needs',
    description: 'The complete tech stack for running a concierge nursing business from anywhere.',
    link: '/resources/operations/concierge-nursing-tools-software',
    category: 'Operations',
  },
  {
    title: 'How to Build SOPs for Your Concierge Nursing Business',
    description: 'Create repeatable processes that keep your business running smoothly.',
    link: '/resources/operations/concierge-nursing-sops',
    category: 'Operations',
  },
  {
    title: 'Best EHR and EMR Systems for Concierge Nurses',
    description: 'Compare the top electronic health record systems built for independent nurses.',
    link: '/resources/operations/best-ehr-emr-concierge-nurses',
    category: 'Operations',
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a separate room for my concierge nursing home office?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A separate room is ideal for HIPAA compliance and tax deduction purposes, but it is not strictly required. What matters most is that you have a dedicated, private space where client calls and documentation cannot be overheard or seen by unauthorized individuals. A room with a door that locks is strongly recommended."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to set up a home office for concierge nursing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A functional home office setup can range from a few hundred dollars for basics like a desk, chair, and monitor, to several thousand if you invest in a standing desk, high-quality ergonomic chair, professional lighting, and upgraded internet. Most concierge nurses can get started with a solid setup in the range of a modest investment and upgrade over time."
      }
    },
    {
      "@type": "Question",
      "name": "What internet speed do I need for telehealth visits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A minimum download speed of 25 Mbps and upload speed of 10 Mbps is recommended for reliable telehealth video calls. If multiple people in your household use the internet simultaneously, consider upgrading to a higher-tier plan or using a dedicated network for your office."
      }
    },
    {
      "@type": "Question",
      "name": "Can I claim my home office on my taxes as a concierge nurse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if you use a portion of your home exclusively and regularly for business, you may qualify for the home office deduction. You can use either the simplified method or the regular method. Consult a tax professional familiar with healthcare businesses to maximize your deductions."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make my home office look professional on video calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Position your desk so your camera faces a clean, uncluttered background. Use a ring light or softbox to ensure even lighting on your face. Keep personal items out of frame. A simple bookshelf, plant, or neutral wall works well. Test your setup on video before your first client call."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a separate phone line for my concierge nursing business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A separate business phone number is highly recommended for professionalism and work-life boundaries. You do not need a physical second phone line. A HIPAA-compliant VoIP service or a dedicated business number app can route calls to your existing phone while keeping your personal number private."
      }
    }
  ]
};

export default function HomeOfficeSetup() {
  return (
    <ResourceLayout
      title="How to Set Up a Home Office for Your Concierge Nursing Business"
      description="A complete guide to designing a professional, HIPAA-compliant home office that supports your concierge nursing practice and projects credibility to every client."
      canonical="https://www.conciergenursesociety.com/resources/operations/concierge-nursing-home-office-setup"
      category="Operations"
      categorySlug="/resources"
      headings={headings}
      relatedResources={relatedResources}
      faqSchema={faqSchema}
      cta={{
        title: 'Get the Business Toolkit',
        description: 'Templates, checklists, and frameworks to set up every part of your concierge nursing business the right way.',
        buttonText: 'Explore Toolkits',
        buttonLink: '/toolkits',
      }}
    >
      <QuickAnswer>
        <p>
          Setting up a home office for your concierge nursing business requires a private, HIPAA-compliant workspace with reliable internet, a professional virtual background for telehealth calls, secure document storage, and a dedicated business phone number. Prioritize privacy and organization over aesthetics when getting started.
        </p>
      </QuickAnswer>

      <p>
        Most concierge nurses start their business from home. Your home office is your command center for managing client records, handling calls, building care plans, and running the administrative side of your practice. Getting it right from the start protects client privacy, keeps you organized, and projects professionalism.
      </p>

      <h2 id="why-dedicated-workspace">Why You Need a Dedicated Workspace</h2>
      <p>
        Without a dedicated workspace, you risk HIPAA violations when family members can overhear calls, you struggle to find documents, and you never fully disconnect from work. A dedicated space also matters for tax purposes since the IRS home office deduction requires the space be used exclusively for business.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="essential-equipment">Essential Equipment and Furniture</h2>
      <p>
        You do not need a luxury office to run a successful concierge nursing business. The right desk, chair, monitor setup, and lighting make a meaningful difference in both your productivity and how clients perceive you on video. Choosing the right equipment depends on your specific practice model and budget.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="hipaa-compliant-setup">Creating a HIPAA-Compliant Home Office</h2>
      <p>
        HIPAA compliance is not optional, and your home office must meet the same privacy and security standards as any clinical setting. This includes both physical safeguards and digital safeguards that protect client information at every level. Understanding what compliance looks like in a home environment is essential before seeing your first client.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="technology-infrastructure">Technology and Internet Infrastructure</h2>
      <p>
        Your internet connection is the backbone of your home office. Reliable, fast internet is essential for telehealth calls and time-sensitive documentation. You also need to think about backup solutions for when your primary connection goes down, because it will happen eventually.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="organization-systems">Organization Systems That Work</h2>
      <p>
        A disorganized home office will cost you time, stress, and potentially clients. You need both digital and physical organization systems in place before your first client. The right structure keeps you efficient and ensures nothing falls through the cracks as your practice grows.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="professional-virtual-presence">Professional Virtual Presence</h2>
      <p>
        Many of your client interactions will happen over video. Your virtual presence communicates as much about your professionalism as a physical office would. Camera placement, background, lighting, and audio quality all matter and should be tested before your first client call.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="tax-deduction-considerations">Tax Deduction Considerations</h2>
      <p>
        Your home office can be a legitimate business tax deduction, but you need to set it up correctly from the start. The IRS allows two methods for calculating the deduction, and keeping detailed records is essential regardless of which method you choose. Work with a tax professional who understands healthcare businesses.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="common-mistakes">Common Mistakes to Avoid</h2>
      <p>
        The most common home office mistakes include skipping a privacy assessment, mixing personal and business accounts, neglecting ergonomics, having no backup plan for tech failures, and not setting clear boundaries with household members. Each of these can compromise client care, your compliance, or your health.
      </p>
      <p className="text-navy font-medium mt-4">Tracy covers this inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>Do I need a separate room for my concierge nursing home office?</h3>
      <p>
        A separate room is ideal for HIPAA compliance and tax purposes, but a dedicated private space with a door that locks is the essential requirement.
      </p>

      <h3>How much does it cost to set up a home office for concierge nursing?</h3>
      <p>
        Costs range from a few hundred dollars for basics to several thousand for a full setup. Most concierge nurses start with essentials and upgrade over time.
      </p>

      <h3>What internet speed do I need for telehealth visits?</h3>
      <p>
        A minimum of 25 Mbps download and 10 Mbps upload is recommended for reliable telehealth video calls.
      </p>

      <h3>Can I claim my home office on my taxes as a concierge nurse?</h3>
      <p>
        Yes, if you use a portion of your home exclusively and regularly for business. Consult a tax professional for the best approach.
      </p>

      <h3>How do I make my home office look professional on video calls?</h3>
      <p>
        Focus on a clean background, proper lighting, and eye-level camera placement. Test your setup before your first client call.
      </p>

      <h3>Do I need a separate phone line for my concierge nursing business?</h3>
      <p>
        A separate business phone number is highly recommended. A HIPAA-compliant VoIP service can route calls to your existing phone while keeping your personal number private.
      </p>
    </ResourceLayout>
  );
}
