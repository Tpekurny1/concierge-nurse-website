import Stripe from 'stripe';
import { loadStripeConfig, serverSupabase } from '../_stripe-settings.js';

// Vercel requires raw body for Stripe signature verification.
export const config = {
  api: { bodyParser: false },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const supabase = serverSupabase();
  const stripeConfig = await loadStripeConfig(supabase);

  if (!stripeConfig.secret_key || !stripeConfig.webhook_secret) {
    console.error('Stripe not fully configured — rejecting webhook.');
    return res.status(503).json({ error: 'Stripe not configured' });
  }

  const stripe = new Stripe(stripeConfig.secret_key);
  const rawBody = await readRawBody(req);
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeConfig.webhook_secret);
  } catch (err) {
    console.error('Stripe signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await handleCheckoutCompleted(supabase, event.data.object);
        break;
      case 'checkout.session.async_payment_failed':
        await markFailedSession(supabase, event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaid(supabase, stripe, stripeConfig, event.data.object);
        break;
      case 'charge.refunded':
        await handleChargeRefunded(supabase, event.data.object);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error(`Webhook handler for ${event.type} failed:`, err);
    return res.status(500).json({ error: err.message });
  }

  return res.status(200).json({ received: true });
}

async function handleCheckoutCompleted(supabase, session) {
  const meta = session.metadata || {};
  const customerDetails = session.customer_details || {};

  const nurse_email = (
    meta.nurse_email ||
    customerDetails.email ||
    session.customer_email ||
    ''
  ).toLowerCase();

  if (!nurse_email) {
    console.warn('checkout.session.completed missing email, session', session.id);
    return;
  }

  const payload = {
    nurse_email,
    nurse_name: meta.nurse_name || customerDetails.name || null,
    nurse_phone: meta.nurse_phone || customerDetails.phone || null,
    program: meta.program || 'accelerator',
    plan: meta.plan || (session.mode === 'subscription' ? 'payment_plan' : 'full'),
    amount_cents: session.amount_total || 0,
    currency: (session.currency || 'usd').toLowerCase(),
    ambassador_id: emptyToNull(meta.ambassador_id),
    referral_code: emptyToNull(meta.referral_code),
    referral_id: emptyToNull(meta.referral_id),
    cohort_cycle_id: emptyToNull(meta.cohort_cycle_id),
    cohort_cycle_label: emptyToNull(meta.cohort_cycle_label),
    stripe_checkout_session_id: session.id,
    stripe_customer_id: session.customer || null,
    stripe_payment_intent_id: session.payment_intent || null,
    stripe_subscription_id: session.subscription || null,
    status: 'paid',
  };

  // Link to an existing contact by email (helps the admin UI).
  const { data: contact } = await supabase
    .from('contacts')
    .select('id')
    .ilike('email', nurse_email)
    .maybeSingle();
  if (contact) payload.contact_id = contact.id;

  const { data: existing } = await supabase
    .from('enrollments')
    .select('id, status')
    .eq('stripe_checkout_session_id', session.id)
    .maybeSingle();

  if (existing) {
    if (existing.status === 'paid') return; // already processed
    await supabase.from('enrollments').update(payload).eq('id', existing.id);
  } else {
    await supabase.from('enrollments').insert(payload);
  }
}

async function handleInvoicePaid(supabase, stripe, stripeConfig, invoice) {
  if (!invoice.subscription) return; // ignore non-subscription invoices

  const { data: enroll } = await supabase
    .from('enrollments')
    .select('id, notes')
    .eq('stripe_subscription_id', invoice.subscription)
    .maybeSingle();

  if (enroll) {
    const note = `Installment paid: $${(invoice.amount_paid / 100).toFixed(2)} on ${new Date().toISOString().slice(0, 10)}`;
    const combined = enroll.notes ? `${enroll.notes}\n${note}` : note;
    await supabase.from('enrollments').update({ notes: combined }).eq('id', enroll.id);
  }

  // Auto-cancel after N installments if the admin configured one.
  const installments = stripeConfig.price_plan_installments;
  if (installments && Number.isInteger(installments) && installments > 0) {
    try {
      // Count paid invoices on this subscription.
      const invoices = await stripe.invoices.list({
        subscription: invoice.subscription,
        limit: installments + 5,
      });
      const paidCount = (invoices.data || []).filter((i) => i.status === 'paid').length;
      if (paidCount >= installments) {
        await stripe.subscriptions.update(invoice.subscription, { cancel_at_period_end: true });
      }
    } catch (err) {
      console.warn('Could not schedule subscription auto-cancel:', err.message);
    }
  }
}

async function handleChargeRefunded(supabase, charge) {
  const { data: enroll } = await supabase
    .from('enrollments')
    .select('id, status')
    .eq('stripe_payment_intent_id', charge.payment_intent)
    .maybeSingle();

  if (!enroll) return;
  if (enroll.status === 'refunded') return;

  // The enrollments_attribute_on_paid trigger unwinds the referral and
  // cancels any 'due' payouts when status flips to 'refunded'.
  await supabase.from('enrollments').update({ status: 'refunded' }).eq('id', enroll.id);
}

async function markFailedSession(supabase, session) {
  await supabase
    .from('enrollments')
    .update({ status: 'failed' })
    .eq('stripe_checkout_session_id', session.id);
}

function emptyToNull(v) {
  if (v === undefined || v === null || v === '') return null;
  return v;
}
