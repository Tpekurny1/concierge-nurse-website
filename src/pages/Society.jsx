import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Lock,
  Users,
  Video,
  FileText,
  Brain,
  Target,
  Sparkles,
  BookOpen,
  TrendingUp,
  UserCheck,
  Megaphone,
  Heart,
  Star,
  Calendar,
} from 'lucide-react';
import SEO from '../components/SEO';

const features = [
  {
    num: '01',
    icon: Users,
    title: 'Private Community on Heartbeat',
    desc: 'Your private membership space where you connect with fellow concierge nurse business owners daily. Ask questions, share what is working, get feedback when you are stuck, and stay visible to the people who understand what you are building. Peer networking here sometimes leads to direct business collaborations and local meetups for members in geographic proximity.',
  },
  {
    num: '02',
    icon: Video,
    title: 'Two Monthly Group Coaching Sessions',
    desc: 'Two live 60 to 90 minute sessions per month on Zoom. One is a structured coaching and teaching session where I bring strategy, frameworks, and the tools you need for wherever you are in the build. The second is a live Office Hours session where you bring what is in front of you right now and we work through it together in real time. Both are recorded. Summaries are posted within 48 hours so you never fall behind.',
  },
  {
    num: '03',
    icon: FileText,
    title: 'Discounted HIPAA-Compliant Charting System',
    desc: 'Access to a HIPAA-compliant, encrypted charting platform that includes direct client payment through Stripe. Available to members at a discounted rate of $17.99 per month. This is the operational backbone of a professional concierge nursing practice, and as a member you get preferred pricing that is not available to the general public.',
    badge: 'Coming Soon',
  },
  {
    num: '04',
    icon: Brain,
    title: 'Nurse Entrepreneur Mindset Content',
    desc: 'Ongoing content designed to strengthen the way you think as a business owner. This is not clinical education. This is identity work. The kind of grounded, practical mindset development that helps you stop shrinking back, stop overthinking, and start showing up like the business owner you are building yourself into.',
  },
  {
    num: '05',
    icon: Target,
    title: 'Business Track Marketing Strategy Frameworks',
    desc: 'Whether your business is still launching or already up and running, you will have access to marketing strategy frameworks built specifically for concierge nurse businesses. Not generic online business advice. Referral-driven, relationship-based strategies designed for the way this business actually works.',
  },
  {
    num: '06',
    icon: Sparkles,
    title: 'Early Resource Drops',
    desc: 'Members get first access to new tools, templates, and business support resources before they are posted publicly in the free community. If I build something new, you see it first. If I find a resource worth sharing, it comes to this room before it goes anywhere else.',
  },
  {
    num: '07',
    icon: BookOpen,
    title: 'Member Directory',
    desc: 'A searchable directory where members can list their concierge nursing business for connection and collaboration. This is how you find each other, refer to each other, and build the kind of professional network that does not exist anywhere else in this space.',
  },
  {
    num: '08',
    icon: TrendingUp,
    title: 'Progress Posts and Peer Support',
    desc: 'A dedicated space for members to share wins, client acquisition stories, networking events and ideas, breakthroughs, financial milestones, and challenge posts when you need feedback and ongoing support. You are not building alone. You are building alongside people who are in it with you and who understand what it takes.',
  },
  {
    num: '09',
    icon: UserCheck,
    title: 'Quarterly Guest Experts',
    desc: 'I am building a roster of guest experts including CPAs, attorneys, and successful concierge nurse business owners who will join us for live Q&A sessions. These are professionals who understand this space and who can speak directly to the questions and challenges that come up as you grow. This is access you will not find in a Facebook group.',
    badge: 'In Progress',
  },
  {
    num: '10',
    icon: Star,
    title: 'Occasional Group Challenges',
    desc: 'Optional group challenges designed to create focused momentum around a specific business goal. These are not homework. They are concentrated pushes that help the entire room move together on something that matters. Participate when the timing is right for you.',
  },
  {
    num: '11',
    icon: Megaphone,
    title: 'Personal Cross-Marketing on My Platforms',
    desc: 'I will personally market and share your success stories, your business links, your journey, how the Accelerator helped you, noteworthy updates, reviews, and other content that gives you additional exposure and visibility. This is not an automated repost. I am carrying your story to my audience across multiple high-volume social media platforms because your success is the best proof that this work matters.',
  },
];

export default function Society() {
  const societySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Concierge Nurse Business Society Membership',
    description:
      'An exclusive monthly membership for graduates of the Concierge Nurse Business Method Accelerator. Ongoing coaching, community, and resources for nurses building concierge nursing businesses.',
    provider: { '@type': 'Organization', name: 'Concierge Nurse Business Society' },
    offers: {
      '@type': 'Offer',
      price: '97.00',
      priceCurrency: 'USD',
      description: 'Founding member early-bird pricing through April 26, 2026. $147/month thereafter.',
    },
  };

  return (
    <>
      <SEO
        title="The Concierge Nurse Business Society Membership — Exclusive to Accelerator Graduates"
        description="The only membership built exclusively for nurses who completed the Concierge Nurse Business Method Accelerator. Ongoing coaching, community, and resources for concierge nurse business owners."
        canonical="/society"
        type="article"
        schema={societySchema}
      />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-gold/40 bg-gold/5">
              <Lock size={13} className="text-gold" />
              <span className="font-body text-[0.65rem] uppercase tracking-[0.22em] text-gold font-medium">
                Exclusive to Accelerator Graduates
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-5">
              The Concierge Nurse{' '}
              <span className="text-gold-gradient">Business Society</span>{' '}
              Membership
            </h1>
            <div className="gold-divider mb-6" />
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-4">
              The only membership built exclusively for nurses who completed the
              Concierge Nurse Business Method Accelerator.
            </p>
            <p className="text-white/50 text-base leading-relaxed max-w-2xl italic">
              This room does not open to the public. You earned your way in.
            </p>
          </div>
        </div>
      </section>

      {/* Why this exists */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="section-label mb-4">Why This Room Exists</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-5">
              You Just Finished Something Most Nurses Only Talk About
            </h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="space-y-6 text-charcoal text-[1.05rem] leading-[1.8]">
            <p>
              Six weeks of building clarity, validating your business, and laying a
              real foundation. Now you are stepping into the part that matters most:
              building inside real life.
            </p>
            <p>
              Work schedules. Family responsibilities. Energy dips. Confidence
              swings. Real conversations with real people. The referral partner who
              does not call back. The client inquiry that comes in at the worst
              possible time. The question you did not expect and the decision you
              are not sure how to make.
            </p>
            <p className="text-navy font-medium">
              That is exactly why I created the Concierge Nurse Business Society
              Membership.
            </p>
            <p>
              Not as more education. Not as another program. This is your ongoing
              room. The place you stay connected to while you grow, refine, and keep
              momentum without burning out or disappearing for three months and
              trying to start over again.
            </p>
          </div>
        </div>
      </section>

      {/* Not an open community */}
      <section className="py-24 bg-navy">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="section-label mb-4" style={{ color: '#d4a24c' }}>
              Earned Access
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5">
              This Is Not an Open Community
            </h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="space-y-6 text-white/70 text-[1.05rem] leading-[1.8]">
            <p>
              The only way into this membership is through the Concierge Nurse
              Business Method Accelerator. No exceptions. No outside invitations.
              Every person in this room went through the same process you did. They
              speak the same language. They understand the same frameworks. They
              are building in the same emerging lane.
            </p>
            <p>
              Concierge nursing is still an emerging niche business category. The
              nurses inside this room are not following a trend. They are building
              the lane. And as this space grows, the network you are building right
              now compounds in value. The connections you make today become the
              collaborations, referrals, and partnerships that shape your business
              for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* What you get — 11 features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label mb-4">What You Get Inside</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-5">
              Every Feature Designed to Keep You Moving
            </h2>
            <div className="gold-divider mx-auto mb-6" />
            <p className="text-slate text-[0.95rem] leading-relaxed">
              Connected. Supported. In motion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {features.map((f) => (
              <div
                key={f.num}
                className="bg-cream/40 border border-cream-dark p-7 flex gap-5"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-navy flex items-center justify-center">
                    <f.icon size={20} className="text-gold" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gold font-heading text-sm font-bold">
                      {f.num}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-navy">
                      {f.title}
                    </h3>
                    {f.badge && (
                      <span className="text-[0.55rem] uppercase tracking-[0.18em] font-body text-gold border border-gold/40 px-2 py-0.5">
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-slate text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Member */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="section-label mb-4">A Rare Moment</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-5">
              You Are a Founding Member
            </h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="space-y-6 text-charcoal text-[1.05rem] leading-[1.8]">
            <p>
              This membership is still early. The community is still intimate. The
              lane is still emerging. And that is exactly what makes this moment
              valuable.
            </p>
            <p>
              You are not joining something that already has a thousand members and
              a waitlist. You are helping build the room. Your voice shapes the
              direction. Your feedback shapes what comes next. Your presence right
              now sets the tone for every nurse who comes after you.
            </p>
            <p>
              As this space grows, and it will, the founding members who were here
              from the beginning will have built the deepest relationships, had the
              most access, and shaped the culture of this community from the ground
              up. There will only be more opportunities and more growth inside this
              membership as time goes on. But the window to be a founding member
              does not stay open.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="join" className="py-24 bg-navy">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="bg-white border border-gold/30 p-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-gold/10 border border-gold/40">
              <Calendar size={13} className="text-gold" />
              <span className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-gold font-medium">
                Early Bird Pricing Through April 26, 2026
              </span>
            </div>

            <div className="mb-2">
              <span className="font-heading text-6xl font-bold text-navy">$97</span>
              <span className="text-slate text-lg ml-1">/month</span>
            </div>
            <p className="text-slate text-sm mb-8">
              Founding member pricing. Increases to{' '}
              <span className="text-navy font-semibold">$147/month</span> after
              early bird window closes.
            </p>

            <div className="gold-divider mx-auto mb-8" />

            <p className="text-charcoal text-sm leading-relaxed mb-8">
              Early bird pricing is available when you enroll during Week 6 of the
              Accelerator. Your Week 6 materials include your direct enrollment
              link and full member onboarding.
            </p>

            <Link
              to="/accelerator"
              className="btn-primary inline-flex items-center justify-center gap-2 w-full"
            >
              Start with the Accelerator <ArrowRight size={14} />
            </Link>

            <p className="text-slate/80 text-xs mt-6 leading-relaxed">
              Already a graduate?{' '}
              <Link to="/contact" className="text-gold underline">
                Contact Tracy
              </Link>{' '}
              for your member enrollment link.
            </p>
          </div>
        </div>
      </section>

      {/* The bigger picture */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="section-label mb-4">The Bigger Picture</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-5">
              You Are Not Following a Path. You Are Building One.
            </h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="space-y-6 text-charcoal text-[1.05rem] leading-[1.8]">
            <p>
              Concierge nursing is not a saturated market. It is not a social media
              hustle. It is a referral-driven, relationship-based, private-pay
              business model that most nurses do not even know exists yet.
            </p>
            <p>
              The nurses inside this membership are the ones who will define what
              this lane looks like as it grows. You are not following a path. You
              are building one. And the network you create inside this room becomes
              your competitive advantage, your referral ecosystem, and your
              professional foundation for as long as you are in business.
            </p>
            <p>
              Every new cohort that graduates and joins the membership makes the
              room stronger. Every success story that gets shared raises the
              credibility of the entire community. Every collaboration that forms
              inside these walls proves that this is not just a business model. It
              is a movement.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-cream border-t border-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <Heart size={28} className="text-gold mx-auto mb-6" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
            You Earned Your Seat. Now Stay in the Room.
          </h2>
          <div className="gold-divider mx-auto mb-8" />
          <p className="text-slate text-base mb-8 max-w-xl mx-auto leading-relaxed">
            The Society opens its doors to every Accelerator graduate. If you have
            not started the Accelerator yet, that is where your seat begins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/accelerator" className="btn-primary inline-flex items-center justify-center gap-2">
              See the Accelerator <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-secondary inline-flex items-center justify-center gap-2">
              Contact Tracy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
