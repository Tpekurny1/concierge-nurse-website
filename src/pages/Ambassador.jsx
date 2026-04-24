import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Copy, Check, Star, ExternalLink, Plus, Minus, Lock, LayoutDashboard } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../lib/AuthContext';

const TABS = [
  { id: 'program', label: 'The Program' },
  { id: 'toolkit', label: 'Your Toolkit' },
  { id: 'signup', label: 'Sign Up' },
  { id: 'tracker', label: 'Your Tracker' },
  { id: 'share', label: 'Share This' },
];

const ENROLLMENT_URL = 'https://from-bedside-to-business-xm506xz.gamma.site/';
const TRACY_EMAIL = 'info@conciergenursesociety.com';

function useActiveTab() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window === 'undefined') return 'program';
    const hash = window.location.hash.slice(1);
    return TABS.some((t) => t.id === hash) ? hash : 'program';
  });

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      setActiveTab(TABS.some((t) => t.id === hash) ? hash : 'program');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const selectTab = (id) => {
    if (window.location.hash.slice(1) !== id) {
      window.history.pushState(null, '', `#${id}`);
    }
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [activeTab, selectTab];
}

function CopyButton({ text, label = 'Copy', gated = false }) {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (gated && !session) {
      navigate('/ambassador/login?next=' + encodeURIComponent('/ambassador/portal'));
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLocked = gated && !session;
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 bg-navy text-white px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase hover:bg-navy/85 transition-colors shrink-0"
      title={isLocked ? 'Sign in to copy with your personal referral link' : undefined}
    >
      {isLocked ? <Lock size={12} /> : copied ? <Check size={12} /> : <Copy size={12} />}
      {isLocked ? 'Sign in' : copied ? 'Copied' : label}
    </button>
  );
}

function ScriptCard({ title, body }) {
  return (
    <div className="bg-cream-dark border-l-2 border-gold p-5 mb-4">
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase">{title}</p>
        <CopyButton text={body} gated />
      </div>
      <p className="text-charcoal/85 text-sm leading-relaxed whitespace-pre-wrap">{body}</p>
    </div>
  );
}

function SectionCard({ children, className = '' }) {
  return <div className={`bg-white border border-cream-dark p-6 md:p-8 mb-8 ${className}`}>{children}</div>;
}

function SectionHeading({ children }) {
  return <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">{children}</h2>;
}

export default function Ambassador() {
  const [activeTab, selectTab] = useActiveTab();
  const { session, isAmbassador, isAdmin } = useAuth();
  const showPortalBanner = !!session && (isAmbassador || isAdmin);

  return (
    <>
      <SEO
        title="Ambassador Pathway — Concierge Nurse Business Society"
        description="Get rewarded for referring nurses to the Concierge Nurse Business Society Method Accelerator Cohort. Earn up to $1,200 per cycle plus a Founding Ambassador badge."
        canonical="/ambassador"
      />

      {/* Hero with tabs */}
      <section className="bg-navy pt-20 xl:pt-28 pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center pb-8 md:pb-10">
          <p className="section-label mb-4">Concierge Nurse Business Society</p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-4">
            Ambassador Pathway
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
            You built your business. Now get rewarded for helping the next nurse do the same.
          </p>
        </div>

        {/* Tab nav */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <nav className="flex flex-wrap justify-center">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab.id)}
                  className={`px-5 md:px-7 py-4 text-[0.7rem] md:text-xs font-semibold tracking-[0.2em] uppercase border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'text-gold border-gold'
                      : 'text-white/60 border-transparent hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Portal banner for signed-in users */}
      {showPortalBanner && (
        <section className="bg-gold/10 border-b border-gold/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-navy text-sm font-semibold">
              Welcome back — your Ambassador portal has your dashboard, referrals, and payouts.
            </p>
            <Link
              to="/ambassador/portal"
              className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2 text-[0.65rem] font-semibold tracking-[0.2em] uppercase no-underline hover:bg-navy/85 transition-colors"
            >
              <LayoutDashboard size={12} /> Go to Portal
            </Link>
          </div>
        </section>
      )}

      {/* Tab content */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          {activeTab === 'program' && <ProgramTab />}
          {activeTab === 'toolkit' && <ToolkitTab />}
          {activeTab === 'signup' && <SignUpTab onGoto={selectTab} />}
          {activeTab === 'tracker' && <TrackerTab />}
          {activeTab === 'share' && <ShareTab />}
        </div>
      </section>

      {/* Footer copy */}
      <section className="bg-cream border-t border-cream-dark py-8">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-charcoal/50 text-xs">
            Concierge Nurse Business Society © 2026 | Ambassador Pathway
          </p>
        </div>
      </section>
    </>
  );
}

/* ------------------------------- Tab: Program ------------------------------ */

function ProgramTab() {
  const steps = [
    {
      n: '01',
      title: 'Identify',
      body: 'Think about the nurses in your life who are where you were before the Accelerator. Stuck, curious, ready but unsure how to start.',
    },
    {
      n: '02',
      title: 'Share',
      body: 'Use the scripts, texts, and posts in the Toolkit tab. Send them directly or post on your social. Make sure your referral mentions your name at enrollment.',
    },
    {
      n: '03',
      title: 'Earn',
      body: 'When your referral enrolls and pays, you get paid. Cash via Venmo within one week of their payment clearing.',
    },
  ];

  const tiers = [
    {
      refs: '1 Referral',
      amount: '$300',
      sub: 'cash via Venmo',
      perks: ['Paid within 1 week of enrollment', 'Ambassador recognition in the Society'],
    },
    {
      refs: '2 Referrals',
      amount: '$700',
      sub: 'total cash via Venmo',
      perks: ['$400 bonus on top of first $300', 'Ambassador recognition in the Society', 'Priority access to future offerings'],
    },
    {
      refs: '3 Referrals',
      amount: '$1,200',
      sub: 'total cash via Venmo',
      perks: ['$500 bonus on top of $700', 'Founding Ambassador badge', 'Featured in the Member Directory', 'Priority access to future offerings'],
      top: true,
    },
  ];

  return (
    <div>
      <SectionCard>
        <SectionHeading>How It Works</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed mb-8">
          You know what this program did for you. When you refer a nurse who enrolls in the Concierge Nurse Business Society Method Accelerator Cohort, you earn cash. The more nurses you bring in, the more you earn. Tiers reset each cohort cycle.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-cream-dark border-t-2 border-gold p-5">
              <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-2">Step {s.n}</p>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">{s.title}</h3>
              <p className="text-charcoal/75 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <SectionHeading>Reward Tiers</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed mb-8">
          Tiers reset each cohort cycle. Every referral counts toward the next tier within that cycle.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.refs}
              className={`relative border p-6 ${
                t.top ? 'bg-gold/5 border-gold' : 'bg-cream-dark border-cream-dark'
              }`}
            >
              {t.top && (
                <span className="absolute -top-3 right-4 bg-navy text-gold px-2 py-1 text-[0.55rem] font-semibold tracking-[0.2em] uppercase inline-flex items-center gap-1">
                  <Star size={10} /> Top Tier
                </span>
              )}
              <p className="text-charcoal/60 text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-center mb-2">
                {t.refs}
              </p>
              <p className="font-heading text-5xl font-bold text-navy text-center mb-1">{t.amount}</p>
              <p className="text-charcoal/60 text-xs text-center mb-5">{t.sub}</p>
              <ul className="space-y-2">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <Check size={14} className="text-gold shrink-0 mt-1" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-lg">
            <Star size={24} className="text-navy" fill="currentColor" />
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-navy mb-3">The Founding Ambassador Badge</h2>
            <p className="text-charcoal/80 leading-relaxed">
              Hit tier three and you earn the Founding Ambassador designation. This is permanent. It appears next to your name in the Society Member Directory and recognizes you as someone who helped build this community from the ground up. This isn't a title you buy. It's one you earn.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <SectionHeading>The Details</SectionHeading>
        <div className="space-y-4 text-charcoal/80 leading-relaxed">
          <p>This program is exclusively for Concierge Nurse Business Society members who have completed the Method Accelerator Cohort.</p>
          <p>A referral counts when the nurse you referred enrolls in the Concierge Nurse Business Society Method Accelerator Cohort and their payment clears. Payment plans count once the first payment is processed.</p>
          <p>Tiers reset each cohort cycle. If you refer 2 nurses for the May cohort, you earn $700 total. When the next cohort opens, your count starts fresh.</p>
          <p>Your referred nurse must mention your name at enrollment so we can track and credit you properly.</p>
          <p>All cash payouts are sent via Venmo within one week of the referred nurse's payment clearing.</p>
          <p>The Founding Ambassador badge is permanent once earned and will appear on your Member Directory listing.</p>
        </div>
      </SectionCard>
    </div>
  );
}

/* ------------------------------- Tab: Toolkit ------------------------------ */

function ToolkitTab() {
  const texts = [
    {
      title: 'Nurse You Know Well',
      body: `Hey! Random question. Have you ever thought about doing concierge nursing on your own? I went through this program that walked me through how to build an independent concierge nursing business from scratch. The actual business side, not just the clinical. It was the thing that finally got me moving. They have a new cohort starting in May if you're curious. I can send you the info. No pressure, just thought of you.`,
    },
    {
      title: "Nurse Who's Mentioned Burnout",
      body: `I keep thinking about our last conversation. I know you're over it. I was too. I ended up going through a program that helped me build a concierge nursing business on my own terms. Private pay, my schedule, my clients. It changed everything for me. There's a new cohort opening in May and I think you'd be great at this. Want me to send you the details?`,
    },
    {
      title: 'Nurse Already Interested in Concierge',
      body: `Okay so remember when we talked about concierge nursing? The program I went through just opened enrollment for their May cohort. Six weeks, you come out with your business actually built. Not a bunch of theory, the real thing. LLC, pricing, clients, legal, all of it. I can connect you with Tracy who runs it. She's the real deal.`,
    },
    {
      title: 'Follow-Up',
      body: `Hey, just circling back on that concierge nursing thing I mentioned. No worries if the timing isn't right. Just didn't want you to miss it since enrollment is open now for May. Let me know if you want the info.`,
    },
  ];

  const email = {
    title: 'Full Email to a Colleague',
    body: `Subject: Thought of you for this

Hey [Name],

I wanted to share something with you because I think you'd be a really good fit. Last year I went through the Concierge Nurse Business Society Method Accelerator Cohort. It's a six-week program where you actually build your concierge nursing business. Not just learn about it. Build it.

The woman who runs it, Tracy Pekurny, is an RN herself who built her own concierge business and now teaches other nurses how to do the same thing. In six weeks I had my LLC, my pricing, my client onboarding process, my legal protections, and a real plan for getting visible and getting clients. It wasn't theoretical. It was practical and it moved fast.

They have a new cohort starting in May and I thought of you because I know you've been thinking about doing something different.

If you want more info I can connect you directly with Tracy, or you can check it out here: [LINK]

No pressure. Just didn't want you to miss it.

[Your Name]`,
  };

  const social = [
    {
      title: 'Instagram / Facebook — Your Story',
      body: `A year ago I was still trying to figure out how to start a concierge nursing business on my own. I had the clinical skills. I had the desire. What I didn't have was the business blueprint. Then I went through the Concierge Nurse Business Society Method Accelerator Cohort and in six weeks I had my business name, my LLC, my pricing, my onboarding process, my legal protections, and an actual plan to get in front of clients. Not someday. Now. If you're an RN who has been thinking about building an independent concierge nursing business but you don't know where to start or you're tired of trying to piece it together yourself, the next cohort starts in May. This is the program I wish I had found sooner. DM me if you want details.`,
    },
    {
      title: 'Shorter Version',
      body: `If you're a nurse who keeps googling "how to start a concierge nursing business" and getting nowhere, I was you. The program that changed it for me is opening a new cohort in May. Six weeks. You come out with the business built, not just the idea. DM me if you want the info. I'll tell you exactly what to expect.`,
    },
    {
      title: 'LinkedIn',
      body: `Nurses are leaving bedside care every day. Most of them don't know there's a third option between staying miserable and leaving nursing entirely. Concierge nursing is that option. Independent, private pay, on your terms, using the license you already earned. I built my concierge nursing business through the Concierge Nurse Business Society Method Accelerator Cohort. Six weeks of building the actual business, not just learning about it. LLC formation, pricing strategy, legal compliance, client acquisition, all of it. They're enrolling for the May cohort now. If you're a registered nurse who has been thinking about this, or if you know one who has, I'm happy to share more. Drop a comment or send me a message.`,
    },
  ];

  const dms = [
    {
      title: '"Tell Me More"',
      body: `It's a six-week cohort program run by Tracy Pekurny, RN. She built her own concierge nursing business and now teaches other nurses how to do the same. Each week covers a different piece: clarifying your niche, validating your market, building your financial blueprint, setting up your operations and legal, getting visible to clients, and protecting your business. You come out the other side with your business actually built, not just planned. The next cohort starts in May. Want me to connect you with Tracy directly?`,
    },
    {
      title: `"I Can't Afford It"`,
      body: `I totally understand. There are payment plan options that make it more manageable. I'd say reach out to Tracy directly and have an honest conversation about it. She's real people and she'll give you the straight answer on what makes sense for your situation. Here's how to reach her: [LINK]`,
    },
    {
      title: `"I'm Not Ready Yet"`,
      body: `That's fair. I felt the same way before I joined. The thing I'll say is that the program is designed for people who aren't ready yet. That's the whole point. You go in with the idea and come out with the business. But no pressure. When the timing feels right, the next cohort is never too far away.`,
    },
    {
      title: '"Is It Worth It?"',
      body: `I can only tell you what it did for me. Before the cohort I had an idea and a lot of confusion. After, I had a real business with real structure. LLC done, pricing figured out, legal covered, and a plan to actually get clients. Six weeks moved me further than the previous year of trying to figure it out on my own. That's my honest experience.`,
    },
  ];

  return (
    <div>
      <SectionCard>
        <SectionHeading>Your Ambassador Toolkit</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed">
          Everything you need to refer nurses, right here. Copy any script, personalize it with your own words, and send. The more it sounds like you, the better it works.
        </p>
      </SectionCard>

      <SectionCard>
        <h3 className="font-heading text-xl font-bold text-navy mb-1">Text Messages</h3>
        <p className="text-charcoal/60 italic text-sm mb-6">
          One genuine text to the right person outperforms a post that reaches 500 strangers.
        </p>
        {texts.map((s) => (
          <ScriptCard key={s.title} title={s.title} body={s.body} />
        ))}
      </SectionCard>

      <SectionCard>
        <h3 className="font-heading text-xl font-bold text-navy mb-1">Email</h3>
        <p className="text-charcoal/60 italic text-sm mb-6">
          For colleagues you don't text with regularly. More room to paint the full picture.
        </p>
        <ScriptCard title={email.title} body={email.body} />
      </SectionCard>

      <SectionCard>
        <h3 className="font-heading text-xl font-bold text-navy mb-1">Social Media Posts</h3>
        <p className="text-charcoal/60 italic text-sm mb-6">
          For your personal Instagram, Facebook, or LinkedIn. Add your own story. The more real it sounds, the more it resonates.
        </p>
        {social.map((s) => (
          <ScriptCard key={s.title} title={s.title} body={s.body} />
        ))}
      </SectionCard>

      <SectionCard>
        <h3 className="font-heading text-xl font-bold text-navy mb-1">DM Responses</h3>
        <p className="text-charcoal/60 italic text-sm mb-6">When someone responds to your post or asks questions.</p>
        {dms.map((s) => (
          <ScriptCard key={s.title} title={s.title} body={s.body} />
        ))}
      </SectionCard>

      <SectionCard>
        <SectionHeading>How to Use This Program</SectionHeading>
        <p className="text-charcoal/60 italic text-sm mb-6">Quick reference so you know exactly what to do.</p>

        <div className="mb-6">
          <h4 className="font-heading text-base font-bold text-navy mb-3">Getting Started</h4>
          <ol className="space-y-3 text-charcoal/80 text-sm leading-relaxed list-decimal pl-5">
            <li>Think of 3 to 5 nurses you know who have talked about wanting more, leaving bedside, or starting something of their own. Write their names down.</li>
            <li>Pick the script that fits your relationship with each person. A personal text to someone you know well. A social post for your broader network. An email for someone you want to give the full picture to.</li>
            <li>Send it. Personalize it with your own words and experience. The more it sounds like you, the better it works.</li>
            <li>When they're interested, connect them with Tracy directly or share the enrollment link from the "Share This" tab. Make sure they mention your name when they enroll so you get credit.</li>
            <li>When they enroll and pay, you get paid via Venmo within one week. That's it.</li>
          </ol>
        </div>

        <div>
          <h4 className="font-heading text-base font-bold text-navy mb-3">What Actually Converts</h4>
          <ul className="space-y-3 text-charcoal/80 text-sm leading-relaxed">
            <li><strong className="text-navy">Personal conversations beat blast posts every time.</strong> One real text to the right person will do more than a post that 500 people scroll past.</li>
            <li><strong className="text-navy">Share your own story.</strong> Why you joined. What changed. What your business looks like now. People don't buy programs. They buy the transformation they see in someone they trust.</li>
            <li><strong className="text-navy">Don't sell. Just share.</strong> If someone is interested, connect them. If they're not, that's fine. The nurses who are ready will move fast. The ones who aren't will remember you when they are.</li>
            <li><strong className="text-navy">Follow up once.</strong> If you sent someone the info and haven't heard back, one check-in is fine. "Hey, did you get a chance to look at that? No worries either way." One follow-up. Not five.</li>
          </ul>
        </div>
      </SectionCard>
    </div>
  );
}

/* ------------------------------- Tab: Sign Up ------------------------------ */

function SignUpTab() {
  const steps = [
    { n: '1', title: 'Submit the Form', body: `Takes 2 minutes. Your info goes straight to Tracy's dashboard.` },
    { n: '2', title: 'Get Confirmed', body: `Tracy confirms your Ambassador status. You're officially in.` },
    { n: '3', title: 'Start Sharing', body: 'Use the Toolkit tab for scripts, posts, and DM responses. Log referrals in the Tracker tab.' },
  ];

  return (
    <div>
      <SectionCard>
        <SectionHeading>Become an Ambassador</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed">
          Register below to officially join the Ambassador Pathway. Once you're signed up, Tracy will confirm your enrollment and you can start referring nurses immediately.
        </p>
      </SectionCard>

      <div className="bg-navy p-8 md:p-12 mb-8 text-center">
        <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-5 shadow-lg">
          <Star size={24} className="text-navy" fill="currentColor" />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">Ready to Start Earning?</h3>
        <p className="text-white/70 max-w-lg mx-auto mb-3 text-sm md:text-base leading-relaxed">
          The sign-up takes about 2 minutes. You'll share your name, contact info, Venmo handle, and which cohort you graduated from.
        </p>
        <p className="text-white/60 text-xs md:text-sm max-w-lg mx-auto mb-8">
          Your responses go directly to Tracy. Once confirmed, you're officially an Ambassador.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/ambassador/signup"
            className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/90 transition-colors no-underline"
          >
            Create My Account <ExternalLink size={14} />
          </Link>
          <Link
            to="/ambassador/login"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase no-underline transition-colors"
          >
            I already have an account →
          </Link>
        </div>
      </div>

      <SectionCard>
        <SectionHeading>What Happens After You Sign Up</SectionHeading>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-cream-dark border-t-2 border-gold p-5">
              <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-2">Step {s.n}</p>
              <h4 className="font-heading text-lg font-bold text-navy mb-2">{s.title}</h4>
              <p className="text-charcoal/75 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* ------------------------------- Tab: Tracker ------------------------------ */

function TrackerTab() {
  const tiers = [
    { n: 'Tier 1', amount: '$300', sub: '1 referral' },
    { n: 'Tier 2', amount: '$700', sub: '2 referrals' },
    { n: 'Tier 3', amount: '$1,200', sub: '3 referrals + badge', top: true },
  ];

  return (
    <div>
      <SectionCard>
        <SectionHeading>Your Referral Tracker</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed">
          Track your referrals and see where you stand in the current cohort cycle. Submit a new referral below and Tracy will verify and update your status once the referred nurse enrolls.
        </p>
      </SectionCard>

      <SectionCard>
        <h3 className="font-heading text-xl font-bold text-navy mb-3">Submit a Referral</h3>
        <p className="text-charcoal/80 leading-relaxed mb-6">
          Referred a nurse? Sign in to your Ambassador portal and log the referral there. Tracy sees every submission instantly and matches it against enrollments automatically.
        </p>
        <div className="bg-navy p-8 text-center">
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-6">
            Takes about 1 minute inside your portal. You'll enter the referred nurse's details and their preferred way to be contacted.
          </p>
          <Link
            to="/ambassador/login?next=%2Fambassador%2Fportal"
            className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/90 transition-colors no-underline"
          >
            Sign in to log a referral <ExternalLink size={14} />
          </Link>
        </div>
      </SectionCard>

      <SectionCard>
        <SectionHeading>How the Tracker Works</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed mb-4">
          When you submit a referral above, Tracy receives it on her end via Google Sheets. Once the referred nurse enrolls and their payment clears, Tracy updates your status and sends your Venmo payout within one week.
        </p>
        <p className="text-charcoal/80 leading-relaxed mb-6">Your current tier resets each cohort cycle:</p>
        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.n}
              className={`border-t-2 p-5 text-center ${
                t.top ? 'bg-gold/5 border-gold' : 'bg-cream-dark border-gold/40'
              }`}
            >
              <p className="text-charcoal/60 text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-2">{t.n}</p>
              <p className="font-heading text-3xl font-bold text-navy mb-1">{t.amount}</p>
              <p className="text-charcoal/60 text-xs">{t.sub}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="bg-white border border-cream-dark p-6 text-center">
        <p className="text-charcoal/80 text-sm">
          Questions about your referral status or payouts? Reach out to Tracy directly at{' '}
          <a href={`mailto:${TRACY_EMAIL}`} className="text-navy font-semibold underline decoration-gold/60 underline-offset-2 hover:decoration-gold">
            {TRACY_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
}

/* -------------------------------- Tab: Share ------------------------------- */

function ShareTab() {
  const weeks = [
    { n: 'Week 1', title: 'Clarify' },
    { n: 'Week 2', title: 'Validate' },
    { n: 'Week 3', title: 'Package' },
    { n: 'Week 4', title: 'Operationalize' },
    { n: 'Week 5', title: 'Get Visible' },
    { n: 'Week 6', title: 'Protect' },
  ];

  const [openWeek, setOpenWeek] = useState(null);

  const testimonials = [
    {
      body: `I would take this course again without hesitation, even at double the price. The education didn't end after six weeks. I gained much-needed clarity around legal structure, pricing, and marketing, areas where I previously lacked confidence.`,
      who: 'Vanessa Chambers, RN, BSN | New York, NY',
    },
    {
      body: `I realize now how detrimental things could have gone if I had tried to do this without a good business foundation. She equipped me with the steps, processes, documentation, legal, and accounting. 10 out of 10 experience.`,
      who: 'Jessica Morse, RN | Philadelphia suburbs',
    },
    {
      body: `Within just two weeks I had a clear vision of my offer, my ideal client, and the exact next steps. This accelerator is the best investment you can make.`,
      who: 'Nikki Sheilds, RN',
    },
  ];

  const connectLinks = [
    { emoji: '🚀', label: 'Enroll Now', sub: 'View Program + Checkout', href: ENROLLMENT_URL, external: true },
    { emoji: '✉️', label: 'Email', sub: 'New domain coming soon', href: `mailto:${TRACY_EMAIL}`, text: TRACY_EMAIL },
    { emoji: '🔗', label: 'All Links', sub: 'Linktree', href: 'https://linktr.ee/', external: true },
    { emoji: '👥', label: 'Free Community', sub: 'Facebook Group', href: 'https://facebook.com/groups/', external: true },
    { emoji: '💬', label: 'Heartbeat', sub: 'Join Free Community', href: '#', external: true },
  ];

  const shareMessage = `Here's the full breakdown of the program I told you about. You can read through everything and enroll right from this page when you're ready: ${ENROLLMENT_URL}`;

  return (
    <div>
      <div className="bg-navy p-8 md:p-12 mb-8 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight mb-4 max-w-3xl mx-auto">
          The Concierge Nurse Business Society Method Accelerator Cohort
        </h2>
        <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Six weeks. One business. Built from the ground up with the structure, strategy, and legal protection you need to launch with confidence.
        </p>
        <a
          href={ENROLLMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/90 transition-colors no-underline"
        >
          See the Full Program + Enroll <ExternalLink size={14} />
        </a>
      </div>

      <SectionCard>
        <SectionHeading>What Happens in Six Weeks</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed mb-6">
          This isn't a course you watch. It's a cohort you build inside of. Each week covers one critical piece of your concierge nursing business, and you leave with it done, not just discussed.
        </p>
        <div className="space-y-2">
          {weeks.map((w, i) => {
            const isOpen = openWeek === i;
            return (
              <div key={w.n} className="bg-cream-dark border-t-2 border-gold">
                <button
                  onClick={() => setOpenWeek(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-cream-dark/70 transition-colors"
                >
                  <div>
                    <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-1">{w.n}</p>
                    <p className="font-heading font-bold text-navy">{w.title}</p>
                  </div>
                  {isOpen ? <Minus size={18} className="text-gold" /> : <Plus size={18} className="text-gold" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4">
                    <p className="text-charcoal/75 text-sm leading-relaxed">
                      Full details for this week, including exactly what gets built and what you walk away with, live on the Accelerator program page.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-charcoal/60 italic text-sm mt-6">
          For full details on each week and to enroll, visit the{' '}
          <a href="/accelerator" className="text-navy font-semibold underline decoration-gold/60 underline-offset-2 hover:decoration-gold">
            program page
          </a>
          . Checkout is built right in.
        </p>
      </SectionCard>

      <SectionCard>
        <SectionHeading>Who This Is For</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed">
          Registered nurses who want to build an independent, private-pay concierge nursing business. Nurses who are done waiting for the "right time" and ready to build with structure, support, and a proven method. Whether you're still working full-time, on travel contracts, or recently stepped away from bedside, this cohort meets you where you are and moves you forward.
        </p>
      </SectionCard>

      <SectionCard>
        <SectionHeading>What Graduates Are Saying</SectionHeading>
        <div className="space-y-5">
          {testimonials.map((t) => (
            <div key={t.who} className="bg-cream-dark border-l-2 border-gold p-5">
              <p className="text-charcoal/85 text-sm leading-relaxed italic mb-3">"{t.body}"</p>
              <p className="text-navy text-sm font-semibold">— {t.who}</p>
            </div>
          ))}
        </div>
        <p className="text-charcoal/60 italic text-sm mt-5">
          Read all graduate reviews:{' '}
          <a href="/about" className="text-navy font-semibold underline decoration-gold/60 underline-offset-2 hover:decoration-gold">
            Full testimonials
          </a>
        </p>
      </SectionCard>

      <SectionCard>
        <SectionHeading>Who Runs This</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed">
          Tracy Pekurny, RN. Founder of the Concierge Nurse Business Society. She built her own concierge nursing business, lived the same struggle you're in right now, and created the method that has helped nurses across the country launch their own independent practices. She's not coaching from theory. She's coaching from experience.
        </p>
      </SectionCard>

      <SectionCard>
        <h3 className="font-heading text-xl font-bold text-navy mb-2">Connect with Tracy</h3>
        <p className="text-charcoal/80 leading-relaxed mb-6">Ready to learn more or have questions? Reach out directly.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {connectLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="flex items-start gap-4 bg-cream-dark border border-cream-dark p-4 hover:border-gold transition-colors no-underline group"
            >
              <span className="text-2xl" aria-hidden>{l.emoji}</span>
              <div className="min-w-0">
                <p className="font-heading font-bold text-navy group-hover:text-navy">{l.label}</p>
                <p className="text-charcoal/60 text-xs">{l.sub}</p>
                {l.text && <p className="text-charcoal text-xs mt-1 break-all">{l.text}</p>}
              </div>
            </a>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <SectionHeading>Share With a Nurse You've Already Talked To</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed mb-6">
          This isn't for cold outreach. This is for after you've had the conversation, answered their questions, and they're ready to see the full program. Send them the enrollment link below so they can read the details and check out directly.
        </p>

        <div className="bg-cream-dark border-l-2 border-gold p-5 mb-4">
          <div className="flex items-start justify-between gap-4 mb-3">
            <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase">Message + Enrollment Link</p>
            <CopyButton text={shareMessage} />
          </div>
          <p className="text-charcoal/85 text-sm leading-relaxed whitespace-pre-wrap">{shareMessage}</p>
        </div>

        <div className="bg-cream-dark border-l-2 border-gold p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase">Enrollment Link Only</p>
            <CopyButton text={ENROLLMENT_URL} />
          </div>
          <p className="text-charcoal/85 text-sm break-all">{ENROLLMENT_URL}</p>
        </div>

        <p className="text-charcoal/60 italic text-sm mt-6">
          Remind them to mention your name when they enroll so you get credit for the referral.
        </p>
      </SectionCard>

      <SectionCard>
        <SectionHeading>QR Code for In-Person Sharing</SectionHeading>
        <p className="text-charcoal/80 leading-relaxed">
          Your Tiiny Host dashboard has a QR code for this Ambassador page. Use it when you're talking to a nurse face-to-face and want to give them something to scan and explore later.
        </p>
      </SectionCard>
    </div>
  );
}
