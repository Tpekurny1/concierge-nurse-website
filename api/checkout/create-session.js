import Stripe from 'stripe';
import { loadStripeConfig, serverSupabase } from '../_stripe-settings.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      plan,
      nurse_email,
      nurse_name,
      nurse_phone,
      ref,
      success_url,
      cancel_url,
    } = req.body || {};

    if (!plan || !['full', 'payment_plan'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan. Must be "full" or "payment_plan".' });
    }
    if (!nurse_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nurse_email)) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    const supabase = serverSupabase();
    const config = await loadStripeConfig(supabase);

    if (!config.secret_key) {
      return res.status(503).json({
        error: 'Stripe is not connected yet. Ask the admin to finish setup at /admin/settings.',
      });
    }

    const priceId = plan === 'full' ? config.price_full_id : config.price_plan_id;
    if (!priceId) {
      return res.status(503).json({
        error: plan === 'full'
          ? 'Pay-in-Full pricing is not configured yet.'
          : 'Payment plan pricing is not configured yet.',
      });
    }

    const stripe = new Stripe(config.secret_key);

    // Resolve ambassador by referral code.
    let ambassador_id = null;
    let referral_code = null;
    if (ref) {
      const { data: amb } = await supabase
        .from('ambassadors')
        .select('id, referral_code, status')
        .eq('referral_code', ref)
        .maybeSingle();
      if (amb && amb.status === 'active') {
        ambassador_id = amb.id;
        referral_code = amb.referral_code;
      }
    }

    // Resolve active cohort cycle.
    const { data: cycle } = await supabase
      .from('cohort_cycles')
      .select('id, label')
      .eq('is_active', true)
      .maybeSingle();

    // Pre-match referral by email in active cycle.
    let referral_id = null;
    if (cycle) {
      const { data: pending } = await supabase
        .from('referrals')
        .select('id, ambassador_id')
        .eq('cohort_cycle_id', cycle.id)
        .ilike('referred_email', nurse_email.trim())
        .eq('status', 'pending')
        .order('created_at', { ascending: true })
        .limit(1);
      if (pending && pending[0]) {
        referral_id = pending[0].id;
        if (!ambassador_id) ambassador_id = pending[0].ambassador_id;
      }
    }

    const origin =
      req.headers.origin ||
      (req.headers.host ? `https://${req.headers.host}` : '');

    const metadata = {
      program: 'accelerator',
      plan,
      nurse_email: nurse_email.trim().toLowerCase(),
      nurse_name: (nurse_name || '').trim(),
      nurse_phone: (nurse_phone || '').trim(),
      ambassador_id: ambassador_id || '',
      referral_code: referral_code || '',
      referral_id: referral_id || '',
      cohort_cycle_id: cycle?.id || '',
      cohort_cycle_label: cycle?.label || '',
      plan_installments: config.price_plan_installments != null ? String(config.price_plan_installments) : '',
    };

    const sessionConfig = {
      mode: plan === 'payment_plan' ? 'subscription' : 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: nurse_email.trim().toLowerCase(),
      client_reference_id: referral_code || nurse_email.trim().toLowerCase(),
      success_url:
        success_url ||
        `${origin}/accelerator/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:
        cancel_url ||
        `${origin}/accelerator/enroll${ref ? `?ref=${encodeURIComponent(ref)}` : ''}`,
      allow_promotion_codes: true,
      metadata,
    };

    if (plan === 'payment_plan') {
      sessionConfig.subscription_data = { metadata };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    return res.status(200).json({ url: session.url, session_id: session.id });
  } catch (err) {
    console.error('create-session error:', err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
