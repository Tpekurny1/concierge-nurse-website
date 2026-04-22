import { Filter } from 'bad-words';

// ── Disposable email domain list ─────────────────────────────
// Abbreviated list of the most common disposable / throwaway providers.
// Can be extended by Tracy via Settings (blocked_email_domains).
const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com', '10minutemail.net',
  'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org', 'guerrillamailblock.com',
  'mailinator.com', 'mailinator.net', 'mailinator.org',
  'trashmail.com', 'trashmail.net',
  'tempmail.com', 'temp-mail.org', 'temp-mail.io',
  'yopmail.com', 'yopmail.fr',
  'throwawaymail.com', 'throwaway.email',
  'maildrop.cc', 'getairmail.com',
  'dispostable.com', 'mintemail.com',
  'fakeinbox.com', 'sharklasers.com',
  'spamgourmet.com', 'spam4.me',
  'mailcatch.com', 'mytemp.email',
  'emailondeck.com', 'mohmal.com',
  'burnermail.io', 'mail-temp.com',
]);

// URL detection (http, https, www prefix, bare domain with .tld)
const URL_REGEX = /(?:(?:https?:\/\/)|(?:www\.))[^\s<>"']+|[a-z0-9][a-z0-9-]*\.(?:com|net|org|io|co|biz|info|ru|xyz|top|click|site|online|store|shop|app|dev|ly)\b/gi;

// Repeated-character detection: 4+ of the same letter or punctuation in a row
const REPEAT_CHAR_REGEX = /(.)\1{3,}/;

// Minimum realistic time between page load and submit (ms).
// Bots POST instantly; humans take at least several seconds to fill a form.
export const MIN_SUBMIT_TIME_MS = 3000;

let profanityFilter = null;
function getProfanityFilter(extraWords = []) {
  if (!profanityFilter) {
    profanityFilter = new Filter();
  }
  if (extraWords.length > 0) {
    profanityFilter.addWords(...extraWords.map((w) => w.toLowerCase()));
  }
  return profanityFilter;
}

// ── Main moderation entry point ─────────────────────────────
// Returns { outcome, reason, filter } where:
//   outcome = 'auto_approved' | 'pending' | 'rejected' | 'spam'
//   reason  = user-friendly string (safe to display, generic)
//   filter  = internal identifier of the filter that fired
//
// `settings` is the row from blog_settings.
// `context` carries { loadTime, honeypot, now } from the form submission.

export function moderateComment({
  name,
  email,
  website,
  content,
  settings,
  context = {},
  recentCountFromSameEmail = 0,
}) {
  const s = settings || {};

  // 1. Honeypot — if filled, it's a bot. Silent reject (show "success").
  if (context.honeypot && context.honeypot.trim() !== '') {
    return {
      outcome: 'spam',
      reason: 'Automated bot activity detected.',
      filter: 'honeypot',
    };
  }

  // 2. Submit time — if <3s since load, it's almost certainly a bot.
  const elapsed = context.now && context.loadTime ? context.now - context.loadTime : null;
  if (elapsed !== null && elapsed < MIN_SUBMIT_TIME_MS) {
    return {
      outcome: 'spam',
      reason: 'Form submitted too quickly.',
      filter: 'submit_speed',
    };
  }

  // 3. Length bounds
  const trimmed = (content || '').trim();
  if (s.min_comment_length && trimmed.length < s.min_comment_length) {
    return {
      outcome: 'rejected',
      reason: 'Your comment is too short.',
      filter: 'too_short',
    };
  }
  if (s.max_comment_length && trimmed.length > s.max_comment_length) {
    return {
      outcome: 'rejected',
      reason: `Your comment exceeds the ${s.max_comment_length}-character limit.`,
      filter: 'too_long',
    };
  }

  // 4. Rate limit — same email, more than N in the last hour
  if (s.rate_limit_per_hour && recentCountFromSameEmail >= s.rate_limit_per_hour) {
    return {
      outcome: 'rejected',
      reason: 'You have submitted too many comments recently. Please try again later.',
      filter: 'rate_limit',
    };
  }

  // 5. Email domain block
  const domain = (email || '').toLowerCase().split('@')[1] || '';
  if (s.disposable_email_blocked && DISPOSABLE_DOMAINS.has(domain)) {
    return {
      outcome: 'spam',
      reason: 'Disposable email addresses are not accepted.',
      filter: 'disposable_email',
    };
  }
  if (Array.isArray(s.blocked_email_domains) && s.blocked_email_domains.includes(domain)) {
    return {
      outcome: 'spam',
      reason: 'This email domain is blocked.',
      filter: 'blocked_domain',
    };
  }

  // 6. URL in name field is a classic spam signal
  if (URL_REGEX.test(name || '')) {
    return {
      outcome: 'spam',
      reason: 'Invalid name field.',
      filter: 'url_in_name',
    };
  }

  // 7. Link count cap in content
  const urlMatches = (trimmed.match(URL_REGEX) || []).length;
  if (s.max_links !== undefined && s.max_links !== null && urlMatches > s.max_links) {
    return {
      outcome: 'spam',
      reason: `Too many links in comment (max ${s.max_links}).`,
      filter: 'too_many_links',
    };
  }

  // 8. All-caps
  if (s.all_caps_filter) {
    const letters = trimmed.replace(/[^A-Za-z]/g, '');
    if (letters.length > 10) {
      const upper = letters.replace(/[^A-Z]/g, '').length;
      if (upper / letters.length > 0.7) {
        return {
          outcome: 'rejected',
          reason: 'Please avoid writing in all caps.',
          filter: 'all_caps',
        };
      }
    }
  }

  // 9. Repeated characters
  if (s.repeat_char_filter && REPEAT_CHAR_REGEX.test(trimmed)) {
    return {
      outcome: 'rejected',
      reason: 'Your comment contains excessive repeated characters.',
      filter: 'repeat_chars',
    };
  }

  // 10. Profanity
  if (s.profanity_filter_on) {
    try {
      const blacklist = Array.isArray(s.blacklisted_words) ? s.blacklisted_words : [];
      const filter = getProfanityFilter(blacklist);

      // Build whitelist to reduce false positives (user-configurable)
      if (Array.isArray(s.whitelist_words) && s.whitelist_words.length > 0) {
        try {
          filter.removeWords(...s.whitelist_words.map((w) => w.toLowerCase()));
        } catch {
          // removeWords may throw if the word isn't in the list — ignore
        }
      }

      if (filter.isProfane(trimmed)) {
        return {
          outcome: 'rejected',
          reason: 'Your comment contains language we could not automatically approve.',
          filter: 'profanity',
        };
      }
    } catch (e) {
      // Filter failure shouldn't crash the form — fall through
      console.error('Profanity filter error:', e);
    }
  }

  // 11. Blacklisted exact words (separate from profanity — her custom list)
  if (Array.isArray(s.blacklisted_words) && s.blacklisted_words.length > 0) {
    const lc = trimmed.toLowerCase();
    const hit = s.blacklisted_words.find((w) => {
      const word = (w || '').trim().toLowerCase();
      return word.length > 0 && lc.includes(word);
    });
    if (hit) {
      return {
        outcome: 'rejected',
        reason: 'Your comment contains content we could not automatically approve.',
        filter: 'blacklist',
      };
    }
  }

  // 12. Passed every filter — either auto-approve or queue for review
  if (s.auto_approve) {
    return { outcome: 'auto_approved', reason: null, filter: null };
  }
  return { outcome: 'pending', reason: null, filter: null };
}

// Test a sample comment against settings. Same logic as moderateComment
// but without persistence concerns. Used by the Settings "Test" UI.
export function testModeration(sample, settings) {
  return moderateComment({
    name: sample.name || 'Test User',
    email: sample.email || 'test@example.com',
    website: null,
    content: sample.content || '',
    settings,
    context: {
      honeypot: sample.honeypot || '',
      loadTime: Date.now() - 10000, // pretend 10s ago
      now: Date.now(),
    },
    recentCountFromSameEmail: 0,
  });
}
