// Single admin endpoint that handles every self-serve Stripe operation.
// Actions (request body `action` field):
//   - status               — returns sanitized current config (no secrets)
//   - save_keys            — { secret_key, publishable_key } → saves + verifies
//   - test_connection      — pings Stripe with the saved secret
//   - configure_product    — { product_name, full_cents, plan_cents, plan_installments }
//                            → creates/updates product + both prices in Stripe
//   - setup_webhook        — creates the webhook endpoint in Stripe and stores secret
//
// Auth: caller must be authenticated and have profiles.role = 'admin'.
// All Stripe calls run server-side with the admin's saved secret key.

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const SETTINGS_ID = 'default';

function serverSupabase() {
  return createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

async function requireAdmin(req) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return { error: 'Missing auth token', status: 401 };

  const supa = serverSupabase();
  const { data: userData, error: userErr } = await supa.auth.getUser(token);
  if (userErr || !userData?.user) return { error: 'Invalid auth token', status: 401 };

  const { data: profile } = await supa
    .from('profiles')
    .select('role')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (profile?.role !== 'admin') return { error: 'Admin only', status: 403 };
  return { user: userData.user, supabase: supa };
}

async function loadSettings(supa) {
  const { data } = await supa
    .from('stripe_settings')
    .select('*')
    .eq('id', SETTINGS_ID)
    .maybeSingle();
  return data || null;
}

function sanitize(settings) {
  if (!settings) return null;
  const mask = (v) => (v ? `••••${v.slice(-4)}` : null);
  return {
    connected: !!settings.secret_key,
    livemode: settings.secret_key?.startsWith('sk_live_') || false,
    testmode: settings.secret_key?.startsWith('sk_test_') || false,
    secret_key_last4: mask(settings.secret_key),
    publishable_key: settings.publishable_key || null,
    account_id: settings.account_id,
    account_display_name: settings.account_display_name,

    product_id: settings.product_id,
    product_name: settings.product_name,
    product_description: settings.product_description,
    price_full_id: settings.price_full_id,
    price_full_cents: settings.price_full_cents,
    price_full_currency: settings.price_full_currency,
    price_plan_id: settings.price_plan_id,
    price_plan_cents: settings.price_plan_cents,
    price_plan_currency: settings.price_plan_currency,
    price_plan_installments: settings.price_plan_installments,

    webhook_endpoint_id: settings.webhook_endpoint_id,
    webhook_secret_set: !!settings.webhook_secret,
    webhook_url: settings.webhook_url,

    last_connection_test_at: settings.last_connection_test_at,
    last_connection_test_ok: settings.last_connection_test_ok,
    last_connection_test_error: settings.last_connection_test_error,

    updated_at: settings.updated_at,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const gate = await requireAdmin(req);
  if (gate.error) return res.status(gate.status).json({ error: gate.error });
  const { supabase: supa } = gate;

  const { action, ...payload } = req.body || {};

  try {
    switch (action) {
      case 'status': {
        const settings = await loadSettings(supa);
        return res.status(200).json({ ok: true, settings: sanitize(settings) });
      }

      case 'save_keys': {
        const { secret_key, publishable_key } = payload;
        if (!secret_key || !/^sk_(live|test)_[A-Za-z0-9]+$/.test(secret_key)) {
          return res.status(400).json({ error: 'Invalid Stripe secret key.' });
        }

        // Verify the key by hitting Stripe's /v1/account endpoint.
        let account;
        try {
          const stripe = new Stripe(secret_key);
          account = await stripe.accounts.retrieve();
        } catch (err) {
          return res.status(400).json({ error: `Stripe rejected the key: ${err.message}` });
        }

        const update = {
          secret_key,
          publishable_key: publishable_key || null,
          account_id: account.id,
          account_display_name:
            account.business_profile?.name ||
            account.settings?.dashboard?.display_name ||
            account.email ||
            null,
          last_connection_test_at: new Date().toISOString(),
          last_connection_test_ok: true,
          last_connection_test_error: null,
        };
        await supa.from('stripe_settings').update(update).eq('id', SETTINGS_ID);
        const fresh = await loadSettings(supa);
        return res.status(200).json({ ok: true, settings: sanitize(fresh) });
      }

      case 'test_connection': {
        const settings = await loadSettings(supa);
        if (!settings?.secret_key) return res.status(400).json({ error: 'Save your Stripe key first.' });
        try {
          const stripe = new Stripe(settings.secret_key);
          const account = await stripe.accounts.retrieve();
          await supa.from('stripe_settings').update({
            last_connection_test_at: new Date().toISOString(),
            last_connection_test_ok: true,
            last_connection_test_error: null,
            account_id: account.id,
            account_display_name:
              account.business_profile?.name || account.settings?.dashboard?.display_name || account.email || null,
          }).eq('id', SETTINGS_ID);
          const fresh = await loadSettings(supa);
          return res.status(200).json({ ok: true, settings: sanitize(fresh) });
        } catch (err) {
          await supa.from('stripe_settings').update({
            last_connection_test_at: new Date().toISOString(),
            last_connection_test_ok: false,
            last_connection_test_error: err.message,
          }).eq('id', SETTINGS_ID);
          return res.status(400).json({ error: err.message });
        }
      }

      case 'configure_product': {
        const { product_name, product_description, full_cents, plan_cents, plan_installments, currency } = payload;
        const settings = await loadSettings(supa);
        if (!settings?.secret_key) return res.status(400).json({ error: 'Save your Stripe key first.' });

        if (!Number.isFinite(full_cents) || full_cents <= 0) {
          return res.status(400).json({ error: 'Full-pay amount must be a positive number of cents.' });
        }
        if (plan_cents != null && (!Number.isFinite(plan_cents) || plan_cents <= 0)) {
          return res.status(400).json({ error: 'Payment-plan amount must be a positive number of cents (or blank).' });
        }

        const curr = (currency || 'usd').toLowerCase();
        const stripe = new Stripe(settings.secret_key);

        // Create or update the product.
        let productId = settings.product_id;
        if (productId) {
          await stripe.products.update(productId, {
            name: product_name || settings.product_name,
            description: product_description || settings.product_description || undefined,
            active: true,
          });
        } else {
          const product = await stripe.products.create({
            name: product_name || 'Method Accelerator Cohort',
            description: product_description || undefined,
          });
          productId = product.id;
        }

        // Stripe prices are immutable. If the amount changed (or none exists yet),
        // create a new price and archive the old one.
        const maybeReplacePrice = async (existingId, existingCents, newCents, recurring) => {
          if (newCents == null) return existingId;
          if (existingId && existingCents === newCents) return existingId;
          const price = await stripe.prices.create({
            product: productId,
            currency: curr,
            unit_amount: newCents,
            ...(recurring ? { recurring: { interval: 'month' } } : {}),
          });
          if (existingId) {
            try { await stripe.prices.update(existingId, { active: false }); } catch (_) { /* ignore */ }
          }
          return price.id;
        };

        const newFullId = await maybeReplacePrice(settings.price_full_id, settings.price_full_cents, full_cents, false);
        const newPlanId = plan_cents == null
          ? null
          : await maybeReplacePrice(settings.price_plan_id, settings.price_plan_cents, plan_cents, true);

        const update = {
          product_id: productId,
          product_name: product_name || settings.product_name,
          product_description: product_description ?? settings.product_description,
          price_full_id: newFullId,
          price_full_cents: full_cents,
          price_full_currency: curr,
          price_plan_id: newPlanId,
          price_plan_cents: plan_cents ?? null,
          price_plan_currency: plan_cents != null ? curr : null,
          price_plan_installments: plan_installments ?? null,
        };
        await supa.from('stripe_settings').update(update).eq('id', SETTINGS_ID);
        const fresh = await loadSettings(supa);
        return res.status(200).json({ ok: true, settings: sanitize(fresh) });
      }

      case 'setup_webhook': {
        const { webhook_url } = payload;
        const settings = await loadSettings(supa);
        if (!settings?.secret_key) return res.status(400).json({ error: 'Save your Stripe key first.' });

        const origin = req.headers.origin || (req.headers.host ? `https://${req.headers.host}` : null);
        const targetUrl = webhook_url || (origin ? `${origin}/api/stripe/webhook` : null);
        if (!targetUrl) return res.status(400).json({ error: 'Could not determine webhook URL; pass webhook_url explicitly.' });

        const stripe = new Stripe(settings.secret_key);

        // If we already have an endpoint, delete it so we can generate a fresh secret.
        if (settings.webhook_endpoint_id) {
          try { await stripe.webhookEndpoints.del(settings.webhook_endpoint_id); } catch (_) { /* ignore */ }
        }

        const endpoint = await stripe.webhookEndpoints.create({
          url: targetUrl,
          enabled_events: [
            'checkout.session.completed',
            'checkout.session.async_payment_succeeded',
            'checkout.session.async_payment_failed',
            'invoice.payment_succeeded',
            'charge.refunded',
          ],
        });

        const update = {
          webhook_endpoint_id: endpoint.id,
          webhook_secret: endpoint.secret,   // returned only on create
          webhook_url: endpoint.url,
        };
        await supa.from('stripe_settings').update(update).eq('id', SETTINGS_ID);
        const fresh = await loadSettings(supa);
        return res.status(200).json({ ok: true, settings: sanitize(fresh) });
      }

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }
  } catch (err) {
    console.error(`stripe/admin ${action} error:`, err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
