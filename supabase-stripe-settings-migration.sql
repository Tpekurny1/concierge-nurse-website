-- ============================================================================
-- Stripe Settings Migration
--
-- Single-row `stripe_settings` table that the serverless handlers read to get
-- Stripe API credentials, price IDs, and webhook secret. Admins configure it
-- through /admin/settings — no Stripe dashboard or Vercel env vars required.
--
-- Security: RLS blocks all direct access. The API keys and webhook secret are
-- never served to the browser. The Settings UI reads a sanitized status view
-- through a serverless endpoint that runs with the service role key.
--
-- Safe to re-run.
-- ============================================================================

CREATE TABLE IF NOT EXISTS stripe_settings (
  id TEXT PRIMARY KEY DEFAULT 'default' CHECK (id = 'default'),

  -- Credentials
  secret_key TEXT,                        -- sk_live_... or sk_test_...
  publishable_key TEXT,                   -- pk_live_... or pk_test_... (not sensitive, but kept here)
  account_id TEXT,                        -- acct_... resolved from the key
  account_display_name TEXT,              -- cached on save for the status UI

  -- Accelerator product + prices (all created via the Stripe API)
  product_id TEXT,                        -- prod_...
  product_name TEXT NOT NULL DEFAULT 'Method Accelerator Cohort',
  product_description TEXT DEFAULT 'Six-week live cohort building your concierge nursing business.',

  price_full_id TEXT,                     -- price_...
  price_full_cents INT,                   -- e.g. 249700
  price_full_currency TEXT DEFAULT 'usd',

  price_plan_id TEXT,                     -- price_...  (recurring)
  price_plan_cents INT,                   -- per-month amount
  price_plan_currency TEXT DEFAULT 'usd',
  price_plan_installments INT,            -- number of months to auto-cancel after (null = run indefinitely)

  -- Webhook
  webhook_endpoint_id TEXT,               -- we_...
  webhook_secret TEXT,                    -- whsec_...
  webhook_url TEXT,                       -- the URL we registered

  -- Telemetry
  last_connection_test_at TIMESTAMPTZ,
  last_connection_test_ok BOOLEAN,
  last_connection_test_error TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the singleton row if missing so the serverless endpoints can always
-- UPDATE it without having to branch on "does the row exist?".
INSERT INTO stripe_settings (id) VALUES ('default')
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION touch_stripe_settings_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_stripe_settings_updated_at ON stripe_settings;
CREATE TRIGGER trg_stripe_settings_updated_at
  BEFORE UPDATE ON stripe_settings
  FOR EACH ROW EXECUTE FUNCTION touch_stripe_settings_updated_at();

-- RLS: no client access at all. The serverless endpoints use the service
-- role key, which bypasses RLS. The browser never reads this table directly.
ALTER TABLE stripe_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "No client access to stripe_settings" ON stripe_settings;
CREATE POLICY "No client access to stripe_settings" ON stripe_settings
  FOR ALL TO authenticated
  USING (FALSE) WITH CHECK (FALSE);

-- ============================================================================
-- Migration complete.
-- ============================================================================
