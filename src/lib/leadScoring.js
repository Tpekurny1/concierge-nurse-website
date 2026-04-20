// ── Intent taxonomy ─────────────────────────────────────────
// One chip per lead. Drives CRM filters and at-a-glance routing.

export const INTENTS = {
  accelerator: {
    label: 'Accelerator',
    shortLabel: 'Accelerator',
    emoji: '🎯',
    // Tailwind classes tuned for the navy/gold brand
    chipClass: 'bg-gold/20 text-navy border border-gold/50',
  },
  consulting: {
    label: 'Consulting',
    shortLabel: 'Consulting',
    emoji: '💼',
    chipClass: 'bg-navy text-gold border border-navy',
  },
  strategy_call: {
    label: 'Strategy Call',
    shortLabel: 'Strategy',
    emoji: '🧭',
    chipClass: 'bg-purple-50 text-purple-800 border border-purple-200',
  },
  society: {
    label: 'Society',
    shortLabel: 'Society',
    emoji: '👥',
    chipClass: 'bg-amber-50 text-amber-900 border border-amber-200',
  },
  toolkits: {
    label: 'Toolkits',
    shortLabel: 'Toolkits',
    emoji: '📚',
    chipClass: 'bg-blue-50 text-blue-800 border border-blue-200',
  },
  newsletter: {
    label: 'Newsletter',
    shortLabel: 'Newsletter',
    emoji: '📬',
    chipClass: 'bg-slate-100 text-slate-700 border border-slate-200',
  },
  general: {
    label: 'General Inquiry',
    shortLabel: 'General',
    emoji: '❓',
    chipClass: 'bg-cream text-charcoal/70 border border-cream-dark',
  },
};

export function getIntentMeta(intent) {
  return INTENTS[intent] || INTENTS.general;
}

// ── Temperature tiers ───────────────────────────────────────

export function getTemperature(score) {
  if (score >= 70) {
    return {
      key: 'hot',
      label: 'Hot',
      emoji: '🔥',
      chipClass: 'bg-red-50 text-red-700 border border-red-200',
      dotClass: 'bg-red-500',
    };
  }
  if (score >= 40) {
    return {
      key: 'warm',
      label: 'Warm',
      emoji: '🟠',
      chipClass: 'bg-orange-50 text-orange-700 border border-orange-200',
      dotClass: 'bg-orange-500',
    };
  }
  return {
    key: 'cool',
    label: 'Cool',
    emoji: '🔵',
    chipClass: 'bg-blue-50 text-blue-700 border border-blue-200',
    dotClass: 'bg-blue-500',
  };
}

// ── Scoring ─────────────────────────────────────────────────
// Pure function. Takes raw submission signals, returns
// { intent, score, reasons }.
//
// formType: 'contact' | 'consulting' | 'accelerator' | 'newsletter'
// interest: raw value from Contact form's interest dropdown (or null)
// lifecycle: 'Explorer' | 'DIYer' | 'Builder' | 'Established Owner'
// profile: { hasBusinessName, hasRevenue, hasPhone }
// message: full text the user typed (or '')
// context: { pagePath, utm_campaign } — from current page + URL params

export function scoreLead({
  formType,
  interest = null,
  lifecycle = 'Explorer',
  profile = {},
  message = '',
  context = {},
}) {
  const reasons = [];
  let intent = 'general';

  // 1. Form type + interest → intent and primary points
  if (formType === 'consulting') {
    reasons.push({ signal: 'Submitted consulting inquiry', points: 40 });
    intent = 'consulting';
  } else if (formType === 'accelerator') {
    reasons.push({ signal: 'Joined accelerator waitlist', points: 30 });
    intent = 'accelerator';
  } else if (formType === 'contact') {
    switch (interest) {
      case 'accelerator_cohort':
        reasons.push({ signal: 'Contact form: Accelerator cohort', points: 30 });
        intent = 'accelerator';
        break;
      case 'private_coaching':
        reasons.push({ signal: 'Contact form: Private coaching', points: 30 });
        intent = 'consulting';
        break;
      case 'business_consulting':
        reasons.push({ signal: 'Contact form: Business consulting', points: 30 });
        intent = 'consulting';
        break;
      case 'vip_bridge_session':
        reasons.push({ signal: 'Contact form: VIP bridge session', points: 30 });
        intent = 'consulting';
        break;
      case 'clarity_consult':
        reasons.push({ signal: 'Contact form: Clarity consult', points: 25 });
        intent = 'strategy_call';
        break;
      case 'toolkits_resources':
        reasons.push({ signal: 'Contact form: Toolkits / resources', points: 15 });
        intent = 'toolkits';
        break;
      case 'general_question':
        reasons.push({ signal: 'Contact form: General question', points: 10 });
        intent = 'general';
        break;
      case 'other':
        reasons.push({ signal: 'Contact form: Other', points: 10 });
        intent = 'general';
        break;
      default:
        reasons.push({ signal: 'Contact form submission', points: 10 });
        intent = 'general';
        break;
    }
  } else if (formType === 'newsletter') {
    reasons.push({ signal: 'Newsletter / community signup', points: 5 });
    intent = 'newsletter';
  }

  // 2. Lifecycle
  if (lifecycle === 'Established Owner') {
    reasons.push({ signal: 'Lifecycle: Established Owner', points: 15 });
  } else if (lifecycle === 'Builder') {
    reasons.push({ signal: 'Lifecycle: Builder', points: 10 });
  } else if (lifecycle === 'DIYer') {
    reasons.push({ signal: 'Lifecycle: DIYer', points: 5 });
  }

  // 3. Profile completeness
  if (profile.hasBusinessName) {
    reasons.push({ signal: 'Business name provided', points: 5 });
  }
  if (profile.hasRevenue) {
    reasons.push({ signal: 'Annual revenue provided', points: 5 });
  }
  if (profile.hasPhone) {
    reasons.push({ signal: 'Phone number provided', points: 5 });
  }

  // 4. Message substance
  const msgLen = (message || '').trim().length;
  if (msgLen > 250) {
    reasons.push({ signal: 'Detailed message (>250 chars)', points: 15 });
  } else if (msgLen > 100) {
    reasons.push({ signal: 'Substantial message (>100 chars)', points: 10 });
  }

  // 5. High-intent landing page
  const path = context.pagePath || '';
  if (/^\/(accelerator|consulting|society)(\/|$)/.test(path)) {
    reasons.push({ signal: `Landed on high-intent page: ${path}`, points: 10 });
  }

  // 6. UTM campaign (someone we're actively courting)
  if (context.utm_campaign) {
    reasons.push({ signal: `UTM campaign: ${context.utm_campaign}`, points: 5 });
  }

  const raw = reasons.reduce((sum, r) => sum + r.points, 0);
  const score = Math.max(0, Math.min(100, raw));

  return { intent, score, reasons };
}

// When a contact resubmits, merge the new scoring with the old one.
// Intent: latest non-newsletter wins (a newsletter sub shouldn't downgrade
// someone who already inquired about the Accelerator). Score: take max
// so stronger recent signals stick.
export function mergeScoring(existing, incoming) {
  const existingScore = existing?.lead_score ?? 0;
  const existingIntent = existing?.intent || null;

  const shouldAdoptIncomingIntent =
    !existingIntent ||
    existingIntent === 'general' ||
    existingIntent === 'newsletter' ||
    incoming.intent !== 'newsletter'; // a later non-newsletter signal replaces older ones

  const nextIntent = shouldAdoptIncomingIntent ? incoming.intent : existingIntent;
  const nextScore = Math.max(existingScore, incoming.score);

  // Use the incoming reasons if we're bumping the score, otherwise keep
  // the old reasons (they match the old score).
  const nextReasons = incoming.score >= existingScore ? incoming.reasons : existing.score_reasons;

  return { intent: nextIntent, score: nextScore, reasons: nextReasons };
}
