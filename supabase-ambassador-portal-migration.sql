-- ============================================================================
-- Ambassador Portal Migration
--
-- Adds:
--   - profiles (admin vs ambassador role)
--   - is_admin() helper
--   - cohort_cycles
--   - ambassadors
--   - referrals (with unique-per-cycle email guard)
--   - payouts (auto-created when a referral hits 'paid')
--   - Founding Ambassador badge auto-award at 3 paid referrals in a cycle
--
-- Also HARDENS existing RLS:
--   Every `FOR ALL TO authenticated USING (true)` policy is replaced with
--   `USING (is_admin())` so that ambassadors (who are also authenticated
--   users) cannot read/write admin-only data like leads, campaigns, blog
--   drafts, pipelines, etc.
--
-- Safe to re-run: uses IF NOT EXISTS, DROP POLICY IF EXISTS, etc.
-- Tracy is auto-seeded as admin on first run (backfill of existing
-- auth.users rows). Future signups default to 'ambassador' role.
-- ============================================================================


-- ─────────────────────────────────────────────────────────────────────────────
-- 1. profiles + is_admin()
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'ambassador'
    CHECK (role IN ('admin', 'ambassador')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- Every new auth.users row gets a matching profile (default role: ambassador).
CREATE OR REPLACE FUNCTION handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (user_id, role)
  VALUES (NEW.id, 'ambassador')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_auth_user();

-- Backfill: every existing user becomes admin (Tracy is the only current user).
-- Re-runs after this migration will not change roles — the INSERT is a no-op
-- because ON CONFLICT DO NOTHING once the row exists.
INSERT INTO profiles (user_id, role)
SELECT id, 'admin' FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own profile" ON profiles;
CREATE POLICY "Users read own profile" ON profiles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS "Admins full access profiles" ON profiles;
CREATE POLICY "Admins full access profiles" ON profiles
  FOR ALL TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. cohort_cycles (single source of truth for "current cycle")
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS cohort_cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL UNIQUE,          -- e.g., "May 2026"
  starts_on DATE,
  ends_on DATE,
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Only one cycle can be active at a time.
CREATE UNIQUE INDEX IF NOT EXISTS idx_cohort_cycles_one_active
  ON cohort_cycles (is_active) WHERE is_active;

CREATE OR REPLACE FUNCTION touch_cohort_cycles_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_cohort_cycles_updated_at ON cohort_cycles;
CREATE TRIGGER trg_cohort_cycles_updated_at
  BEFORE UPDATE ON cohort_cycles
  FOR EACH ROW EXECUTE FUNCTION touch_cohort_cycles_updated_at();

-- Seed a placeholder so the system has an active cycle on day one.
INSERT INTO cohort_cycles (label, is_active) VALUES ('Current Cycle', TRUE)
ON CONFLICT (label) DO NOTHING;

ALTER TABLE cohort_cycles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anon read active cohort_cycles" ON cohort_cycles;
CREATE POLICY "Anon read active cohort_cycles" ON cohort_cycles
  FOR SELECT TO anon USING (is_active);

DROP POLICY IF EXISTS "Auth read cohort_cycles" ON cohort_cycles;
CREATE POLICY "Auth read cohort_cycles" ON cohort_cycles
  FOR SELECT TO authenticated USING (TRUE);

DROP POLICY IF EXISTS "Admins full access cohort_cycles" ON cohort_cycles;
CREATE POLICY "Admins full access cohort_cycles" ON cohort_cycles
  FOR ALL TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());


-- ─────────────────────────────────────────────────────────────────────────────
-- 3. ambassadors
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ambassadors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  venmo_handle TEXT,
  cohort_graduated TEXT,                                 -- "Pilot 2025", "May 2025", etc
  referral_code TEXT UNIQUE,                             -- auto-assigned on 'active'
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'active', 'paused', 'removed')),
  founding_ambassador BOOLEAN NOT NULL DEFAULT FALSE,
  founding_ambassador_at TIMESTAMPTZ,
  featured_in_directory BOOLEAN NOT NULL DEFAULT FALSE,
  directory_member_id UUID REFERENCES directory_members(id) ON DELETE SET NULL,
  lifetime_referrals INT NOT NULL DEFAULT 0,
  lifetime_earned_cents INT NOT NULL DEFAULT 0,
  notes TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ambassadors_user_id ON ambassadors (user_id);
CREATE INDEX IF NOT EXISTS idx_ambassadors_status ON ambassadors (status);
CREATE INDEX IF NOT EXISTS idx_ambassadors_referral_code ON ambassadors (referral_code);

-- Generate a human-friendly referral code from the ambassador's full name.
--   "Sarah Jones" -> "SARAH-J"
--   If collision: "SARAH-J-2", "SARAH-J-3", ...
CREATE OR REPLACE FUNCTION generate_referral_code(in_name TEXT, in_ambassador_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  name_parts TEXT[];
  first_name TEXT;
  last_initial TEXT;
  base_code TEXT;
  candidate TEXT;
  suffix INT := 1;
BEGIN
  name_parts := string_to_array(upper(trim(in_name)), ' ');
  first_name := regexp_replace(COALESCE(name_parts[1], ''), '[^A-Z]', '', 'g');
  last_initial := CASE
    WHEN array_length(name_parts, 1) >= 2
      THEN SUBSTRING(regexp_replace(name_parts[array_length(name_parts, 1)], '[^A-Z]', '', 'g') FROM 1 FOR 1)
    ELSE ''
  END;

  IF first_name = '' THEN
    base_code := 'AMB';
  ELSIF last_initial = '' THEN
    base_code := first_name;
  ELSE
    base_code := first_name || '-' || last_initial;
  END IF;

  candidate := base_code;
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM ambassadors
      WHERE referral_code = candidate AND id IS DISTINCT FROM in_ambassador_id
    ) THEN
      RETURN candidate;
    END IF;
    suffix := suffix + 1;
    candidate := base_code || '-' || suffix::TEXT;
  END LOOP;
END;
$$;

-- On transition to 'active': assign referral_code + approved_at.
CREATE OR REPLACE FUNCTION ambassadors_before_write()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status = 'active'
     AND (NEW.referral_code IS NULL OR NEW.referral_code = '') THEN
    NEW.referral_code := generate_referral_code(NEW.full_name, NEW.id);
  END IF;

  IF TG_OP = 'UPDATE'
     AND NEW.status = 'active' AND OLD.status IS DISTINCT FROM 'active'
     AND NEW.approved_at IS NULL THEN
    NEW.approved_at := NOW();
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_ambassadors_before_write ON ambassadors;
CREATE TRIGGER trg_ambassadors_before_write
  BEFORE INSERT OR UPDATE ON ambassadors
  FOR EACH ROW EXECUTE FUNCTION ambassadors_before_write();

-- Lock admin-only fields from self-edits by the ambassador.
CREATE OR REPLACE FUNCTION protect_ambassador_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT is_admin() THEN
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      RAISE EXCEPTION 'Only admins can change ambassador status';
    END IF;
    IF NEW.referral_code IS DISTINCT FROM OLD.referral_code THEN
      RAISE EXCEPTION 'Only admins can change referral_code';
    END IF;
    IF NEW.founding_ambassador IS DISTINCT FROM OLD.founding_ambassador THEN
      RAISE EXCEPTION 'Only admins can change founding_ambassador';
    END IF;
    IF NEW.featured_in_directory IS DISTINCT FROM OLD.featured_in_directory THEN
      RAISE EXCEPTION 'Only admins can change featured_in_directory';
    END IF;
    IF NEW.lifetime_referrals IS DISTINCT FROM OLD.lifetime_referrals THEN
      RAISE EXCEPTION 'Only admins can change lifetime_referrals';
    END IF;
    IF NEW.lifetime_earned_cents IS DISTINCT FROM OLD.lifetime_earned_cents THEN
      RAISE EXCEPTION 'Only admins can change lifetime_earned_cents';
    END IF;
    IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
      RAISE EXCEPTION 'Cannot change user_id';
    END IF;
    IF NEW.approved_at IS DISTINCT FROM OLD.approved_at THEN
      RAISE EXCEPTION 'Only admins can change approved_at';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_ambassador_fields ON ambassadors;
CREATE TRIGGER trg_protect_ambassador_fields
  BEFORE UPDATE ON ambassadors
  FOR EACH ROW EXECUTE FUNCTION protect_ambassador_fields();

ALTER TABLE ambassadors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins full access ambassadors" ON ambassadors;
CREATE POLICY "Admins full access ambassadors" ON ambassadors
  FOR ALL TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Ambassadors read own row" ON ambassadors;
CREATE POLICY "Ambassadors read own row" ON ambassadors
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Ambassadors insert own row" ON ambassadors;
CREATE POLICY "Ambassadors insert own row" ON ambassadors
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND status = 'pending');

DROP POLICY IF EXISTS "Ambassadors update own row" ON ambassadors;
CREATE POLICY "Ambassadors update own row" ON ambassadors
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());


-- ─────────────────────────────────────────────────────────────────────────────
-- 4. referrals
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ambassador_id UUID NOT NULL REFERENCES ambassadors(id) ON DELETE RESTRICT,
  cohort_cycle_id UUID REFERENCES cohort_cycles(id) ON DELETE SET NULL,
  cohort_cycle_label TEXT,              -- snapshot at write time
  referred_name TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_phone TEXT,
  preferred_contact TEXT CHECK (preferred_contact IN ('text', 'email', 'call')),
  source_channel TEXT
    CHECK (source_channel IN ('text', 'email', 'social', 'dm', 'in_person', 'qr', 'other')),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'enrolled', 'paid', 'declined', 'no_response')),
  enrollment_date DATE,
  payment_cleared_date DATE,
  payment_plan BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- First-to-log wins: only one referral per email per cycle.
  UNIQUE (cohort_cycle_id, referred_email)
);

CREATE INDEX IF NOT EXISTS idx_referrals_ambassador ON referrals (ambassador_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals (status);
CREATE INDEX IF NOT EXISTS idx_referrals_cycle ON referrals (cohort_cycle_id);

-- Snapshot the cohort cycle label + touch updated_at.
CREATE OR REPLACE FUNCTION referrals_before_write()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.cohort_cycle_id IS NOT NULL THEN
    SELECT label INTO NEW.cohort_cycle_label
    FROM cohort_cycles WHERE id = NEW.cohort_cycle_id;
  END IF;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_referrals_before_write ON referrals;
CREATE TRIGGER trg_referrals_before_write
  BEFORE INSERT OR UPDATE ON referrals
  FOR EACH ROW EXECUTE FUNCTION referrals_before_write();

-- Maintain ambassadors.lifetime_referrals.
CREATE OR REPLACE FUNCTION maintain_ambassador_referral_count()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE ambassadors
    SET lifetime_referrals = lifetime_referrals + 1
    WHERE id = NEW.ambassador_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE ambassadors
    SET lifetime_referrals = GREATEST(0, lifetime_referrals - 1)
    WHERE id = OLD.ambassador_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS trg_referrals_maintain_count ON referrals;
CREATE TRIGGER trg_referrals_maintain_count
  AFTER INSERT OR DELETE ON referrals
  FOR EACH ROW EXECUTE FUNCTION maintain_ambassador_referral_count();

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins full access referrals" ON referrals;
CREATE POLICY "Admins full access referrals" ON referrals
  FOR ALL TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Ambassadors read own referrals" ON referrals;
CREATE POLICY "Ambassadors read own referrals" ON referrals
  FOR SELECT TO authenticated
  USING (
    ambassador_id IN (SELECT id FROM ambassadors WHERE user_id = auth.uid())
  );

-- Active ambassadors can log a new referral as 'pending'. They cannot insert
-- with any other status. They cannot update referrals after submission
-- (no UPDATE policy for them — admin policy is the only UPDATE path).
DROP POLICY IF EXISTS "Ambassadors insert own referrals" ON referrals;
CREATE POLICY "Ambassadors insert own referrals" ON referrals
  FOR INSERT TO authenticated
  WITH CHECK (
    status = 'pending'
    AND ambassador_id IN (
      SELECT id FROM ambassadors
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );


-- ─────────────────────────────────────────────────────────────────────────────
-- 5. payouts
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ambassador_id UUID NOT NULL REFERENCES ambassadors(id) ON DELETE RESTRICT,
  referral_id UUID REFERENCES referrals(id) ON DELETE SET NULL,
  cohort_cycle_label TEXT,
  amount_cents INT NOT NULL CHECK (amount_cents >= 0),
  tier INT CHECK (tier IN (1, 2, 3)),
  status TEXT NOT NULL DEFAULT 'due'
    CHECK (status IN ('due', 'paid', 'cancelled')),
  venmo_transaction_id TEXT,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payouts_ambassador ON payouts (ambassador_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON payouts (status);

CREATE OR REPLACE FUNCTION touch_payouts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_payouts_updated_at ON payouts;
CREATE TRIGGER trg_payouts_updated_at
  BEFORE UPDATE ON payouts
  FOR EACH ROW EXECUTE FUNCTION touch_payouts_updated_at();

-- Maintain ambassadors.lifetime_earned_cents when payouts flip paid/unpaid.
CREATE OR REPLACE FUNCTION maintain_ambassador_earnings()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.status = 'paid' AND OLD.status IS DISTINCT FROM 'paid' THEN
      UPDATE ambassadors
      SET lifetime_earned_cents = lifetime_earned_cents + NEW.amount_cents
      WHERE id = NEW.ambassador_id;
      -- stamp paid_at if not set
      IF NEW.paid_at IS NULL THEN
        NEW.paid_at := NOW();
      END IF;
    ELSIF OLD.status = 'paid' AND NEW.status IS DISTINCT FROM 'paid' THEN
      UPDATE ambassadors
      SET lifetime_earned_cents = GREATEST(0, lifetime_earned_cents - OLD.amount_cents)
      WHERE id = OLD.ambassador_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'paid' THEN
    UPDATE ambassadors
    SET lifetime_earned_cents = GREATEST(0, lifetime_earned_cents - OLD.amount_cents)
    WHERE id = OLD.ambassador_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS trg_payouts_maintain_earnings_upd ON payouts;
CREATE TRIGGER trg_payouts_maintain_earnings_upd
  BEFORE UPDATE ON payouts
  FOR EACH ROW EXECUTE FUNCTION maintain_ambassador_earnings();

DROP TRIGGER IF EXISTS trg_payouts_maintain_earnings_del ON payouts;
CREATE TRIGGER trg_payouts_maintain_earnings_del
  AFTER DELETE ON payouts
  FOR EACH ROW EXECUTE FUNCTION maintain_ambassador_earnings();

ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins full access payouts" ON payouts;
CREATE POLICY "Admins full access payouts" ON payouts
  FOR ALL TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Ambassadors read own payouts" ON payouts;
CREATE POLICY "Ambassadors read own payouts" ON payouts
  FOR SELECT TO authenticated
  USING (
    ambassador_id IN (SELECT id FROM ambassadors WHERE user_id = auth.uid())
  );


-- ─────────────────────────────────────────────────────────────────────────────
-- 6. Auto-create payout + award founding badge on referral→paid transition
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION referrals_auto_payout_on_paid()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  paid_count INT;
  bump_cents INT;
  tier_num INT;
BEGIN
  IF NEW.status = 'paid' AND (OLD.status IS DISTINCT FROM 'paid') THEN
    -- Count paid referrals for this ambassador/cycle INCLUDING this one.
    SELECT COUNT(*) INTO paid_count
    FROM referrals
    WHERE ambassador_id = NEW.ambassador_id
      AND cohort_cycle_id = NEW.cohort_cycle_id
      AND status = 'paid';

    -- Tier bumps: 1st = $300, 2nd = $400, 3rd = $500. 4+ = $0 (policy cap).
    IF paid_count = 1 THEN
      bump_cents := 30000; tier_num := 1;
    ELSIF paid_count = 2 THEN
      bump_cents := 40000; tier_num := 2;
    ELSIF paid_count = 3 THEN
      bump_cents := 50000; tier_num := 3;
    ELSE
      bump_cents := 0; tier_num := NULL;
    END IF;

    IF bump_cents > 0 THEN
      INSERT INTO payouts (ambassador_id, referral_id, cohort_cycle_label, amount_cents, tier, status)
      VALUES (NEW.ambassador_id, NEW.id, NEW.cohort_cycle_label, bump_cents, tier_num, 'due');
    END IF;

    -- Founding Ambassador badge is awarded the first time an ambassador
    -- hits 3 paid referrals in any cycle. Permanent.
    IF tier_num = 3 THEN
      UPDATE ambassadors
      SET founding_ambassador = TRUE,
          founding_ambassador_at = COALESCE(founding_ambassador_at, NOW()),
          featured_in_directory = TRUE
      WHERE id = NEW.ambassador_id AND founding_ambassador = FALSE;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_referrals_auto_payout ON referrals;
CREATE TRIGGER trg_referrals_auto_payout
  AFTER UPDATE OF status ON referrals
  FOR EACH ROW EXECUTE FUNCTION referrals_auto_payout_on_paid();


-- ─────────────────────────────────────────────────────────────────────────────
-- 7. RLS HARDENING: existing tables
--
-- Every existing `FOR ALL TO authenticated USING (true)` policy is dropped
-- and recreated with `USING (is_admin())`. Ambassadors who authenticate can
-- no longer read admin-only data. Tracy is unaffected — she is admin.
-- Anon policies (public reads/inserts) are untouched.
-- ─────────────────────────────────────────────────────────────────────────────

-- blog_posts
DROP POLICY IF EXISTS "Auth full access posts" ON blog_posts;
CREATE POLICY "Admins full access posts" ON blog_posts
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- blog_categories
DROP POLICY IF EXISTS "Auth full access categories" ON blog_categories;
CREATE POLICY "Admins full access categories" ON blog_categories
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- blog_post_categories
DROP POLICY IF EXISTS "Auth full access post categories" ON blog_post_categories;
CREATE POLICY "Admins full access post categories" ON blog_post_categories
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- blog_comments
DROP POLICY IF EXISTS "Auth full access comments" ON blog_comments;
CREATE POLICY "Admins full access comments" ON blog_comments
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- blog_settings
DROP POLICY IF EXISTS "Auth full access blog settings" ON blog_settings;
CREATE POLICY "Admins full access blog settings" ON blog_settings
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- brand_settings
DROP POLICY IF EXISTS "Auth full access brand_settings" ON brand_settings;
CREATE POLICY "Admins full access brand_settings" ON brand_settings
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- directory_members
DROP POLICY IF EXISTS "Auth full access directory members" ON directory_members;
CREATE POLICY "Admins full access directory members" ON directory_members
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- campaigns / campaign_recipients / campaign_stats
DROP POLICY IF EXISTS "Auth full access campaigns" ON campaigns;
CREATE POLICY "Admins full access campaigns" ON campaigns
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Auth full access campaign_recipients" ON campaign_recipients;
CREATE POLICY "Admins full access campaign_recipients" ON campaign_recipients
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Auth full access campaign_stats" ON campaign_stats;
CREATE POLICY "Admins full access campaign_stats" ON campaign_stats
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- sequences / sequence_emails / sequence_enrollments / sequence_sends
DROP POLICY IF EXISTS "Auth full access sequences" ON sequences;
CREATE POLICY "Admins full access sequences" ON sequences
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Auth full access sequence_emails" ON sequence_emails;
CREATE POLICY "Admins full access sequence_emails" ON sequence_emails
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Auth full access sequence_enrollments" ON sequence_enrollments;
CREATE POLICY "Admins full access sequence_enrollments" ON sequence_enrollments
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Auth full access sequence_sends" ON sequence_sends;
CREATE POLICY "Admins full access sequence_sends" ON sequence_sends
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- pipelines / pipeline_contacts
DROP POLICY IF EXISTS "Auth full access pipelines" ON pipelines;
CREATE POLICY "Admins full access pipelines" ON pipelines
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Auth full access pipeline_contacts" ON pipeline_contacts;
CREATE POLICY "Admins full access pipeline_contacts" ON pipeline_contacts
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- tags / contact_tags
DROP POLICY IF EXISTS "Auth full access tags" ON tags;
CREATE POLICY "Admins full access tags" ON tags
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Auth full access contact_tags" ON contact_tags;
CREATE POLICY "Admins full access contact_tags" ON contact_tags
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- page_views (analytics — admin only)
DROP POLICY IF EXISTS "Auth full access page_views" ON page_views;
CREATE POLICY "Admins full access page_views" ON page_views
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- contacts (leads) — the existing policy is named "Admin full access to
-- contacts" but uses `USING (true)`, which means every authenticated user
-- could read/write leads. Tighten it.
DROP POLICY IF EXISTS "Admin full access to contacts" ON contacts;
CREATE POLICY "Admins full access contacts" ON contacts
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- ============================================================================
-- Migration complete.
-- ============================================================================
