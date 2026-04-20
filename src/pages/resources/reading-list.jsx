import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../components/ResourceLayout';
import QuickAnswer from '../../components/QuickAnswer';

const faqItems = [
  {
    question: "Do I need to read all of these books before starting my business?",
    answer: "No. You do not need to read an entire library before taking action. Pick one or two books from the category most relevant to where you are right now. If you are in the planning phase, start with a business fundamentals book. If you are struggling with pricing, read a marketing or sales book. Learning and building should happen simultaneously."
  },
  {
    question: "Are there any books specifically about concierge nursing?",
    answer: "As of this writing, there are very few books dedicated exclusively to concierge nursing as a business model. That is why this list draws from broader categories — general entrepreneurship, healthcare business, marketing, and mindset — that are directly applicable to building a nursing practice. The principles in these books translate directly to the concierge nursing context."
  },
  {
    question: "Should I read physical books, audiobooks, or ebooks?",
    answer: "Whatever format you will actually consume. Many nurse entrepreneurs listen to audiobooks during commutes, workouts, or downtime between clients. Others prefer physical books they can highlight and reference. The format matters less than actually engaging with the material and applying what you learn."
  },
  {
    question: "How do I apply what I read to my concierge nursing business?",
    answer: "After reading or listening to each book, identify one to three specific actions you can take in your business based on what you learned. Write them down and schedule time to implement them. Reading without implementation is just entertainment. The goal is to extract practical ideas and put them into practice."
  },
  {
    question: "Can you recommend podcasts or other resources beyond books?",
    answer: "Yes, podcasts, online courses, and communities are all valuable learning resources. The Concierge Nurse Business Society community is a great place to ask for recommendations from nurses who are actively building their businesses. We may add podcast and course recommendations to this page in the future."
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
  "headline": "Recommended Reading for Concierge Nurse Entrepreneurs",
  "description": "Curated reading list for nurses building concierge nursing businesses. Books on entrepreneurship, marketing, mindset, healthcare business, and personal development.",
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
  { id: 'how-to-use', text: 'How to Use This List' },
  { id: 'business-fundamentals', text: 'Business Fundamentals' },
  { id: 'marketing-sales', text: 'Marketing & Sales' },
  { id: 'mindset-personal-development', text: 'Mindset & Personal Development' },
  { id: 'healthcare-business', text: 'Healthcare Business' },
  { id: 'finance-money-management', text: 'Finance & Money Management' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'How to Start a Concierge Nursing Business',
    description: 'The complete step-by-step guide to launching your concierge nursing practice.',
    link: '/resources/how-to-start-a-concierge-nursing-business',
    category: 'Getting Started',
  },
  {
    title: 'Startup Checklist',
    description: 'A comprehensive checklist of every step needed to launch your business.',
    link: '/resources/checklist',
    category: 'Getting Started',
  },
  {
    title: 'Concierge Nursing Business Terms Glossary',
    description: 'An A-Z glossary of every term you will encounter while building your practice.',
    link: '/resources/glossary',
    category: 'Getting Started',
  },
];

export default function ReadingList() {
  return (
    <ResourceLayout
      title="Recommended Reading for Concierge Nurse Entrepreneurs"
      description="Curated reading list for nurses building concierge nursing businesses. Books on entrepreneurship, marketing, mindset, healthcare business, and personal development."
      canonical="https://www.conciergenursesociety.com/resources/reading-list"
      schema={articleSchema}
      category="Getting Started"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'From Reading to Doing',
        description: 'Our Toolkits turn business knowledge into action with ready-to-use templates, contracts, and SOPs built specifically for concierge nurses.',
        buttonText: 'View Toolkits',
        buttonLink: '/toolkits',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Building a concierge nursing business requires more than clinical knowledge. This curated reading list covers the business fundamentals, marketing strategies, mindset shifts, healthcare-specific business knowledge, and financial literacy that will help you succeed as a nurse entrepreneur. Pick one or two books from the category most relevant to where you are now.
        </p>
      </QuickAnswer>

      {/* TRACY TO FILL: Add her specific book recommendations and why she recommends each. The categories and structure below are ready — Tracy should replace the placeholder books with her actual recommendations, keeping the format consistent. She can add, remove, or rearrange books as she sees fit. */}

      {/* --- How to Use This List --- */}
      <h2 id="how-to-use">How to Use This List</h2>

      <p>
        This reading list is organized by category so you can find the right book for wherever you are in your journey. You do not need to read them all, and you certainly do not need to read them before starting your business. Think of this as an ongoing professional development resource you can return to as different challenges arise.
      </p>

      <p>
        Each category addresses a different aspect of building and running a concierge nursing business. If you are just getting started, begin with one book from Business Fundamentals and one from Mindset. If you are already launched and need clients, focus on Marketing and Sales. If you are scaling, dive into Finance and Healthcare Business.
      </p>

      <div className="bg-gold/5 border border-gold/20 p-6 mb-8">
        <p className="font-heading text-base font-semibold text-navy mb-2">A Note on This List</p>
        <p>
          These recommendations are books that are widely respected in the entrepreneurship and healthcare business communities. As with any reading list, the value comes from applying what you learn to your specific situation. Take what is useful, leave what is not, and always filter advice through the lens of your own niche, market, and goals.
        </p>
      </div>

      {/* --- Business Fundamentals --- */}
      <h2 id="business-fundamentals">Business Fundamentals</h2>

      <p className="text-slate mb-6">
        These books cover the core principles of starting and running a business. They are not specific to healthcare but provide the foundational business knowledge every nurse entrepreneur needs.
      </p>

      {/* TRACY TO FILL: Replace these placeholder books with Tracy's specific recommendations and her personal notes on why each book matters for concierge nurses */}

      <div className="space-y-6 mb-10">
        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">The E-Myth Revisited</h3>
          <p className="text-gold text-sm font-medium mb-2">by Michael E. Gerber</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Explains why most small businesses fail and how to build systems that allow your business to run without you doing everything. Particularly relevant for nurses transitioning from employee to business owner mindset — the shift from working in your business to working on your business.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">Profit First</h3>
          <p className="text-gold text-sm font-medium mb-2">by Mike Michalowicz</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Introduces a cash management system that ensures your business is profitable from the start. Instead of the traditional formula of sales minus expenses equals profit, this book flips it to sales minus profit equals expenses. A practical framework for managing money in your concierge nursing business.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">Company of One</h3>
          <p className="text-gold text-sm font-medium mb-2">by Paul Jarvis</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Challenges the assumption that growth is always the goal. Argues for building a sustainable, intentionally small business that gives you the lifestyle you want. Relevant for concierge nurses who want to build a profitable solo practice without scaling into an agency.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">The Lean Startup</h3>
          <p className="text-gold text-sm font-medium mb-2">by Eric Ries</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Teaches the principle of building, measuring, and learning quickly instead of spending months planning before testing your idea. Directly applicable to launching your concierge nursing practice — start with a minimum viable service, get real client feedback, and iterate.</p>
        </div>
      </div>

      {/* --- Marketing & Sales --- */}
      <h2 id="marketing-sales">Marketing &amp; Sales</h2>

      <p className="text-slate mb-6">
        Marketing is where many nurse entrepreneurs struggle most because nursing school does not teach sales or self-promotion. These books reframe marketing as education and service rather than pushy selling.
      </p>

      {/* TRACY TO FILL: Replace these placeholder books with Tracy's specific recommendations and her personal notes on why each book matters for concierge nurses */}

      <div className="space-y-6 mb-10">
        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">Building a StoryBrand</h3>
          <p className="text-gold text-sm font-medium mb-2">by Donald Miller</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Provides a framework for clarifying your message so clients understand what you offer and why it matters to them. Helps you position your client as the hero of the story and yourself as the guide — a natural fit for nursing professionals who are already wired to help.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">This Is Marketing</h3>
          <p className="text-gold text-sm font-medium mb-2">by Seth Godin</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Redefines marketing as the act of making change happen by serving people who want to be served. If the word "marketing" makes you uncomfortable, this book will shift your perspective. It emphasizes empathy, trust, and solving real problems — which is exactly what concierge nurses do.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">The Referral Engine</h3>
          <p className="text-gold text-sm font-medium mb-2">by John Jantsch</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">A practical guide to building a business that generates referrals systematically. Since <Link to="/resources/marketing/physician-referral-relationships" className="text-gold hover:underline">referral relationships</Link> are the primary client acquisition channel for most concierge nurses, this book is particularly actionable for this business model.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">Influence: The Psychology of Persuasion</h3>
          <p className="text-gold text-sm font-medium mb-2">by Robert B. Cialdini</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Explains the psychology behind why people say yes. Understanding principles like social proof, reciprocity, and authority helps you communicate the value of your services more effectively — not through manipulation, but through understanding how people make decisions.</p>
        </div>
      </div>

      {/* --- Mindset & Personal Development --- */}
      <h2 id="mindset-personal-development">Mindset &amp; Personal Development</h2>

      <p className="text-slate mb-6">
        The transition from nurse to nurse entrepreneur is as much a mindset shift as it is a business challenge. These books address the internal work that often determines whether you push through the hard parts or give up.
      </p>

      {/* TRACY TO FILL: Replace these placeholder books with Tracy's specific recommendations and her personal notes on why each book matters for concierge nurses */}

      <div className="space-y-6 mb-10">
        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">Mindset: The New Psychology of Success</h3>
          <p className="text-gold text-sm font-medium mb-2">by Carol S. Dweck</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Introduces the concept of fixed versus growth mindset and how your beliefs about your own abilities shape your outcomes. Essential reading for nurses battling <Link to="/resources/mindset/nurse-entrepreneur-imposter-syndrome" className="text-gold hover:underline">imposter syndrome</Link> or the belief that they are "not a business person."</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">The Big Leap</h3>
          <p className="text-gold text-sm font-medium mb-2">by Gay Hendricks</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Explores how people unconsciously self-sabotage when they approach a new level of success. Particularly relevant for nurses who feel guilty about charging what they are worth or who struggle to see themselves as business owners deserving of financial success.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">Atomic Habits</h3>
          <p className="text-gold text-sm font-medium mb-2">by James Clear</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">A practical system for building good habits and breaking bad ones. Building a business part-time requires consistent small actions — this book shows you how to make those daily habits stick, even when motivation fades.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">Daring Greatly</h3>
          <p className="text-gold text-sm font-medium mb-2">by Brene Brown</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Explores the power of vulnerability and courage. Starting a business requires putting yourself out there in uncomfortable ways — networking, marketing, asking for referrals, setting prices. This book helps you reframe vulnerability as strength rather than weakness.</p>
        </div>
      </div>

      {/* --- Healthcare Business --- */}
      <h2 id="healthcare-business">Healthcare Business</h2>

      <p className="text-slate mb-6">
        These books are specific to building businesses in healthcare and provide context on the unique challenges and opportunities of healthcare entrepreneurship.
      </p>

      {/* TRACY TO FILL: Replace these placeholder books with Tracy's specific recommendations and her personal notes on why each book matters for concierge nurses */}

      <div className="space-y-6 mb-10">
        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">The Nurse's Step-by-Step Guide to Writing Your Dissertation or Capstone</h3>
          <p className="text-gold text-sm font-medium mb-2">by Karen Roush</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">While focused on academic writing, this book is relevant for nurses who want to establish thought leadership, publish articles, or build authority in their niche through evidence-based content — all of which strengthen your position as a concierge nursing expert.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">Concierge Medicine: A New System to Get the Best Healthcare</h3>
          <p className="text-gold text-sm font-medium mb-2">by Steven D. Knope, MD</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Written from the physician perspective on concierge medicine, this book provides valuable insight into the private-pay healthcare model and how patients perceive and value personalized care. Understanding the physician-side model helps concierge nurses position their complementary services.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">The Business of Healthcare Innovation</h3>
          <p className="text-gold text-sm font-medium mb-2">by Lawton Robert Burns</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Examines how innovation happens in healthcare and where the opportunities lie. Helps concierge nurses understand the broader healthcare landscape they are operating within and identify emerging trends they can leverage.</p>
        </div>
      </div>

      {/* --- Finance & Money Management --- */}
      <h2 id="finance-money-management">Finance &amp; Money Management</h2>

      <p className="text-slate mb-6">
        Financial literacy is often the weakest area for new business owners. These books cover personal and business finance in accessible, practical ways.
      </p>

      {/* TRACY TO FILL: Replace these placeholder books with Tracy's specific recommendations and her personal notes on why each book matters for concierge nurses */}

      <div className="space-y-6 mb-10">
        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">We Should All Be Millionaires</h3>
          <p className="text-gold text-sm font-medium mb-2">by Rachel Rodgers</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Challenges limiting beliefs about money, particularly those held by women and people of color. Provides practical steps for building wealth through entrepreneurship. Relevant for nurses who feel conflicted about charging premium rates for their expertise and care.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">Simple Numbers, Straight Talk, Big Profits</h3>
          <p className="text-gold text-sm font-medium mb-2">by Greg Crabtree</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">Demystifies small business financial management. Teaches you to understand your numbers, set appropriate pricing, and make financial decisions based on data rather than guesswork. Pairs well with the <Link to="/resources/concierge-nurse-pricing-guide" className="text-gold hover:underline">Concierge Nurse Pricing Guide</Link>.</p>
        </div>

        <div className="bg-cream border border-cream-dark p-6">
          <h3 className="font-heading text-lg font-bold text-navy mb-1">The Total Money Makeover</h3>
          <p className="text-gold text-sm font-medium mb-2">by Dave Ramsey</p>
          <p className="text-charcoal text-[0.95rem] leading-relaxed">A personal finance classic focused on getting out of debt and building financial stability. Before you can invest in your business with confidence, your personal financial house needs to be in order. This book provides a straightforward plan for getting there.</p>
        </div>
      </div>

      {/* --- Additional Guidance --- */}
      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Want Personalized Recommendations?</p>
        <p className="mb-4">
          Every nurse's reading needs are different depending on their experience, niche, and current challenges. Join the <Link to="/community" className="text-gold font-semibold hover:underline">Concierge Nurse Business Society community</Link> to ask other nurse entrepreneurs what books have made the biggest difference in their businesses.
        </p>
      </div>

      <div className="bg-gold/5 border border-gold/20 p-6 mb-6">
        <p className="font-heading text-base font-semibold text-navy mb-2">Beyond Books: Structured Learning</p>
        <p>
          If you prefer a structured, step-by-step approach to building your business rather than piecing together knowledge from multiple books, the <Link to="/accelerator" className="text-gold font-semibold hover:underline">Accelerator program</Link> and <Link to="/toolkits" className="text-gold font-semibold hover:underline">Toolkits</Link> provide that guided path with templates, SOPs, and expert coaching built specifically for concierge nurses.
        </p>
      </div>

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
