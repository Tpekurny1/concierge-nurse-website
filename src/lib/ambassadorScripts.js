export const ENROLLMENT_URL = 'https://from-bedside-to-business-xm506xz.gamma.site/';
export const TRACY_EMAIL = 'info@conciergenursesociety.com';

export function buildEnrollmentLink(refCode) {
  if (!refCode) return ENROLLMENT_URL;
  const separator = ENROLLMENT_URL.includes('?') ? '&' : '?';
  return `${ENROLLMENT_URL}${separator}ref=${encodeURIComponent(refCode)}`;
}

// Each script is a template. The `body` may contain `[LINK]` placeholders;
// `render(refCode)` replaces them with a ref-coded enrollment link.
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

export const AMBASSADOR_SCRIPTS = { texts, email, social, dms };

// Replace `[LINK]` placeholders with the ambassador's ref-coded enrollment link.
export function renderScript(body, refCode) {
  const link = buildEnrollmentLink(refCode);
  return body.replaceAll('[LINK]', link);
}
