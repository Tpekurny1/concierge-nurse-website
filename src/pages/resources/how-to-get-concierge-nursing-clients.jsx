import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const faqItems = [
  {
    question: "How long does it take to get your first concierge nursing client?",
    answer: "Many concierge nurses land their first client within 30-90 days of actively marketing. The timeline depends on your niche, network, and how consistently you pursue referral relationships."
  },
  {
    question: "Do I need a website to get concierge nursing clients?",
    answer: "A website helps establish credibility but is not strictly required for your first clients. Many nurses get initial clients through networking and physician referrals before their site is live."
  },
  {
    question: "How important is social media for getting concierge nursing clients?",
    answer: "Social media is one tool among many. Its effectiveness depends on your niche and where your clients spend time. For some niches, physician referrals generate far more clients than social media."
  },
  {
    question: "Should I offer free services to get my first clients?",
    answer: "Generally, no. Free services devalue your expertise. Instead, consider a brief free consultation to discuss how you can help, but actual nursing services should always be paid."
  },
  {
    question: "How do I get physician referrals as a new concierge nurse?",
    answer: "Identify physicians whose patients would benefit from your services, introduce yourself professionally, and make it easy for them to refer by providing clear materials. Follow up consistently."
  },
  {
    question: "What is the most effective way to get concierge nursing clients?",
    answer: "Physician referrals are consistently one of the most effective channels because they come with built-in trust. However, a combination of strategies tailored to your niche is the strongest approach."
  },
  {
    question: "How many clients do I need to make a full-time income?",
    answer: "This depends on your pricing model and rates. Work backward from your income goal and pricing structure to determine your target client volume."
  },
  {
    question: "Should I focus on a niche or offer general concierge nursing services?",
    answer: "Specializing typically makes client acquisition easier because you can target your marketing and become known for a specific need. Many successful nurses start with a niche and expand over time."
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
  { id: "why-getting-clients-feels-hard", text: "Why Getting Clients Feels Hard" },
  { id: "physician-referrals", text: "Strategy 1: Physician Referrals" },
  { id: "google-business-profile", text: "Strategy 2: Google Business Profile" },
  { id: "local-healthcare-networking", text: "Strategy 3: Local Healthcare Networking" },
  { id: "social-media", text: "Strategy 4: Social Media Marketing" },
  { id: "referrals-testimonials", text: "Strategy 5: Client Referrals and Testimonials" },
  { id: "simple-website", text: "Strategy 6: A Simple, Professional Website" },
  { id: "business-groups", text: "Strategy 7: Business and Community Groups" },
  { id: "first-30-days", text: "Your First 30 Days: A Client Acquisition Timeline" },
  { id: "faq", text: "Frequently Asked Questions" },
];

export default function HowToGetConciergeNursingClients() {
  return (
    <ResourceLayout
      title="How to Get Your First Concierge Nursing Clients: A Step-by-Step Plan"
      description="Learn proven strategies to get your first concierge nursing clients. Covers physician referrals, networking, social media marketing, Google Business Profile, and building a client acquisition system."
      canonical="https://www.conciergenursesociety.com/resources/how-to-get-concierge-nursing-clients"
      category="Marketing"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={[
        {
          title: "How to Get Physician Referrals",
          description: "A detailed guide to building referral relationships with physicians who can send you concierge nursing clients.",
          link: "/resources/concierge-nurse-physician-referrals",
          category: "Marketing"
        },
        {
          title: "Google Business Profile for Concierge Nurses",
          description: "Set up and optimize your Google Business Profile to attract local concierge nursing clients.",
          link: "/resources/concierge-nurse-google-business-profile",
          category: "Marketing"
        },
        {
          title: "Social Media for Concierge Nurses",
          description: "How to use social media effectively to build your brand and attract concierge nursing clients.",
          link: "/resources/concierge-nurse-social-media-marketing",
          category: "Marketing"
        }
      ]}
      cta={{
        title: "Get Clients Faster with Expert Support",
        description: "Join the Accelerator program for a structured, step-by-step system to build your client base, or book a Clarity Consult for personalized client acquisition strategy.",
        buttonText: "Join the Accelerator",
        buttonLink: "/accelerator"
      }}
      faqSchema={faqSchema}
    >
      {/* Quick Answer */}
      <h2 id="quick-answer" className="font-heading text-2xl font-bold text-navy mb-4">Quick Answer</h2>
      <QuickAnswer>
        <p>
          The most effective ways to get concierge nursing clients are building physician referral relationships, setting up a Google Business Profile, networking with local healthcare providers, leveraging social media for credibility, earning client referrals and testimonials, maintaining a professional website, and participating in business and community groups. A combination of these strategies, executed consistently, is how successful concierge nurses build their client base.
        </p>
      </QuickAnswer>

      {/* Why Getting Clients Feels Hard */}
      <h2 id="why-getting-clients-feels-hard" className="font-heading text-2xl font-bold text-navy mb-4">Why Getting Clients Feels Hard</h2>
      <p>
        Client acquisition is the number one challenge new concierge nurses face. In traditional nursing roles, patients were always there -- you never had to convince anyone to choose you. As a business owner, you are responsible for filling your own schedule, and that requires an entirely different skill set.
      </p>
      <p>
        The good news is that client acquisition is a learnable skill. And concierge nursing has a major advantage: you are solving real, urgent problems for people who have the means and motivation to pay. You do not have to create demand -- you just need to connect with the right people.
      </p>

      <p className="text-navy font-medium mt-4">Tracy teaches her complete client acquisition system inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Strategy 1: Physician Referrals */}
      <h2 id="physician-referrals" className="font-heading text-2xl font-bold text-navy mb-4">Strategy 1: Physician Referrals</h2>
      <p>
        Physician referrals are one of the most powerful client acquisition channels for concierge nurses. When a doctor recommends your services, that referral comes with built-in trust and a specific clinical need. The patient is pre-qualified -- they have a health need, a physician endorsement, and often the financial means to pay. Building these relationships involves identifying the right physicians, introducing yourself professionally, and maintaining consistent follow-up.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers her exact physician referral strategy -- including what to say and how to follow up -- inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Strategy 2: Google Business Profile */}
      <h2 id="google-business-profile" className="font-heading text-2xl font-bold text-navy mb-4">Strategy 2: Google Business Profile</h2>
      <p>
        A Google Business Profile makes your practice visible in local search results and Google Maps for free. People searching for services like "concierge nurse near me" are actively looking for what you offer. Setting up and optimizing your profile is one of the highest-return, lowest-cost marketing actions you can take as a new concierge nurse.
      </p>

      <p className="text-navy font-medium mt-4">The <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> includes step-by-step Google Business Profile setup and optimization guidance.</p>

      {/* Strategy 3: Local Healthcare Networking */}
      <h2 id="local-healthcare-networking" className="font-heading text-2xl font-bold text-navy mb-4">Strategy 3: Local Healthcare Networking</h2>
      <p>
        Beyond individual physician relationships, the broader healthcare community is full of potential referral partners. Discharge planners, case managers, elder law attorneys, senior living facilities, physical therapists, and concierge medicine practices can all become steady sources of client introductions when they understand what you do and who you serve.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers how to build and nurture a referral network inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Strategy 4: Social Media */}
      <h2 id="social-media" className="font-heading text-2xl font-bold text-navy mb-4">Strategy 4: Social Media Marketing</h2>
      <p>
        Social media is a visibility and credibility tool that puts your expertise in front of people. It is most effective when used consistently and strategically. Focus on one or two platforms that align with your audience -- Instagram and Facebook work well for consumer-facing services, while LinkedIn can be effective for corporate wellness and professional referral building.
      </p>

      <p className="text-navy font-medium mt-4">Tracy provides social media content strategies and templates inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Strategy 5: Referrals and Testimonials */}
      <h2 id="referrals-testimonials" className="font-heading text-2xl font-bold text-navy mb-4">Strategy 5: Client Referrals and Testimonials</h2>
      <p>
        Once you serve your first clients well, they become your most powerful marketing asset. A satisfied client who tells their network about your services generates referrals that convert at a much higher rate than any advertisement. The key is to ask for referrals and testimonials proactively rather than waiting for them to happen organically.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers referral generation strategies and testimonial systems inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* Strategy 6: Simple Website */}
      <h2 id="simple-website" className="font-heading text-2xl font-bold text-navy mb-4">Strategy 6: A Simple, Professional Website</h2>
      <p>
        Your website's primary job is to establish credibility when potential clients or referral partners look you up. It needs to clearly communicate your services, credentials, service area, and how to contact you. You can start with a single-page website and expand as your business grows -- the most important thing is having a professional online presence.
      </p>

      <p className="text-navy font-medium mt-4">The <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link> includes website templates and guidance for concierge nurses.</p>

      {/* Strategy 7: Business Groups */}
      <h2 id="business-groups" className="font-heading text-2xl font-bold text-navy mb-4">Strategy 7: Business and Community Groups</h2>
      <p>
        Local business organizations and community groups put you in front of professionals who either need your services, have family members who need care, or know people who do. Chambers of commerce, referral networking groups, women's business groups, and community service organizations are all valuable for building local visibility and trust.
      </p>

      <p className="text-navy font-medium mt-4">Tracy covers networking strategy and community engagement inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

      {/* The First 30 Days */}
      <h2 id="first-30-days" className="font-heading text-2xl font-bold text-navy mb-4">Your First 30 Days: A Client Acquisition Timeline</h2>
      <p>
        The first month of active client acquisition should focus on building your foundation -- setting up your online presence, identifying target referral partners, and beginning outreach. Success comes from consistent, sustained action rather than any single tactic. Most concierge nurses who struggle with client acquisition are not doing the wrong things; they are not doing enough of the right things consistently.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-semibold text-navy mb-2">Consistency Beats Perfection</p>
        <p>
          You do not need a perfect website, a polished social media presence, or a flawless elevator pitch to get your first client. What you need is consistent action -- showing up, making connections, and letting people know how you can help.
        </p>
      </div>

      <p className="text-navy font-medium mt-4">Tracy provides a detailed first-30-day action plan with weekly milestones inside the <Link to="/accelerator" className="text-gold hover:underline">Accelerator</Link>.</p>

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
