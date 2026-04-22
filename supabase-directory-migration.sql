-- ============================================================================
-- Directory Migration
-- Adds a member directory Tracy can manage from the CRM and that appears
-- publicly at /directory.
-- Safe to re-run: uses IF NOT EXISTS and DROP POLICY IF EXISTS.
-- ============================================================================

CREATE TABLE IF NOT EXISTS directory_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  credentials TEXT,                 -- "RN, BSN" or "MSN, CNOR, FNP-S"
  business_name TEXT,
  specialty TEXT,                   -- Single category label for filter chip
  tagline TEXT,                     -- The italic one-liner
  location TEXT,
  email TEXT,
  phone TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  photo_url TEXT,
  bio TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'hidden')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_directory_status ON directory_members (status);
CREATE INDEX IF NOT EXISTS idx_directory_specialty ON directory_members (specialty);
CREATE INDEX IF NOT EXISTS idx_directory_display_order ON directory_members (display_order, name);

-- Auto-touch updated_at
CREATE OR REPLACE FUNCTION touch_directory_members_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_directory_members_updated_at ON directory_members;
CREATE TRIGGER trg_directory_members_updated_at
  BEFORE UPDATE ON directory_members
  FOR EACH ROW EXECUTE FUNCTION touch_directory_members_updated_at();

-- ── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE directory_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anon can read active directory members" ON directory_members;
CREATE POLICY "Anon can read active directory members" ON directory_members
  FOR SELECT TO anon USING (status = 'active');

DROP POLICY IF EXISTS "Auth full access directory members" ON directory_members;
CREATE POLICY "Auth full access directory members" ON directory_members
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
