// Shared helper: load Stripe config from the stripe_settings table, with
// env var fallback so manual Vercel configs still work.

import { createClient } from '@supabase/supabase-js';

const SETTINGS_ID = 'default';

export function serverSupabase() {
  return createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
  );
}

export async function loadStripeConfig(supa = serverSupabase()) {
  const { data } = await supa
    .from('stripe_settings')
    .select('*')
    .eq('id', SETTINGS_ID)
    .maybeSingle();

  return {
    secret_key: data?.secret_key || process.env.STRIPE_SECRET_KEY || null,
    publishable_key: data?.publishable_key || null,
    webhook_secret: data?.webhook_secret || process.env.STRIPE_WEBHOOK_SECRET || null,
    price_full_id: data?.price_full_id || process.env.STRIPE_PRICE_ID_ACCELERATOR_FULL || null,
    price_full_cents: data?.price_full_cents ?? null,
    price_plan_id: data?.price_plan_id || process.env.STRIPE_PRICE_ID_ACCELERATOR_PAYMENT_PLAN || null,
    price_plan_cents: data?.price_plan_cents ?? null,
    price_plan_installments: data?.price_plan_installments ?? null,
    product_id: data?.product_id || null,
    product_name: data?.product_name || null,
  };
}
