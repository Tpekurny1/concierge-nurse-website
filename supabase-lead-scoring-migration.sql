-- ============================================================================
-- Lead Scoring Migration
-- Adds intent classification, lead_score, and score_reasons to contacts.
-- Includes a best-effort backfill for existing contacts based on tags,
-- lifecycle_stage, interest, and profile completeness.
-- ============================================================================

-- 1. Add new columns
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS intent TEXT,
  ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0 NOT NULL,
  ADD COLUMN IF NOT EXISTS score_reasons JSONB DEFAULT '[]'::jsonb NOT NULL;

-- 2. Indexes for the new CRM sort/filter defaults
CREATE INDEX IF NOT EXISTS idx_contacts_lead_score ON contacts (lead_score DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_intent ON contacts (intent);

-- 3. Backfill intent + lead_score for existing contacts.
--    Mirrors the logic in src/lib/leadScoring.js but skips signals we
--    don't have post-hoc (message length, page_url, utm_campaign).
UPDATE contacts c SET
  intent = CASE
    WHEN EXISTS (
      SELECT 1 FROM contact_tags ct JOIN tags t ON ct.tag_id = t.id
      WHERE ct.contact_id = c.id AND t.name = 'Consulting Inquiry'
    ) THEN 'consulting'
    WHEN EXISTS (
      SELECT 1 FROM contact_tags ct JOIN tags t ON ct.tag_id = t.id
      WHERE ct.contact_id = c.id AND t.name = 'Accelerator Waitlist'
    ) THEN 'accelerator'
    WHEN c.interest = 'accelerator_cohort' THEN 'accelerator'
    WHEN c.interest IN ('private_coaching', 'business_consulting', 'vip_bridge_session') THEN 'consulting'
    WHEN c.interest = 'clarity_consult' THEN 'strategy_call'
    WHEN c.interest = 'toolkits_resources' THEN 'toolkits'
    WHEN c.interest IN ('general_question', 'other') THEN 'general'
    WHEN EXISTS (
      SELECT 1 FROM contact_tags ct JOIN tags t ON ct.tag_id = t.id
      WHERE ct.contact_id = c.id AND t.name IN ('Newsletter Subscriber', 'Community Signup')
    ) THEN 'newsletter'
    ELSE 'general'
  END,
  lead_score = LEAST(100,
    -- Form-type / interest points
    (CASE
      WHEN EXISTS (
        SELECT 1 FROM contact_tags ct JOIN tags t ON ct.tag_id = t.id
        WHERE ct.contact_id = c.id AND t.name = 'Consulting Inquiry'
      ) THEN 40
      WHEN EXISTS (
        SELECT 1 FROM contact_tags ct JOIN tags t ON ct.tag_id = t.id
        WHERE ct.contact_id = c.id AND t.name = 'Accelerator Waitlist'
      ) THEN 30
      WHEN c.interest IN ('accelerator_cohort', 'private_coaching', 'business_consulting', 'vip_bridge_session') THEN 30
      WHEN c.interest = 'clarity_consult' THEN 25
      WHEN c.interest = 'toolkits_resources' THEN 15
      WHEN c.interest IN ('general_question', 'other') THEN 10
      WHEN EXISTS (
        SELECT 1 FROM contact_tags ct JOIN tags t ON ct.tag_id = t.id
        WHERE ct.contact_id = c.id AND t.name IN ('Newsletter Subscriber', 'Community Signup')
      ) THEN 5
      ELSE 0
    END)
    -- Lifecycle points
    + (CASE c.lifecycle_stage
        WHEN 'Established Owner' THEN 15
        WHEN 'Builder' THEN 10
        WHEN 'DIYer' THEN 5
        ELSE 0
      END)
    -- Profile completeness
    + (CASE WHEN c.business_name IS NOT NULL AND c.business_name <> '' THEN 5 ELSE 0 END)
    + (CASE WHEN c.annual_revenue IS NOT NULL AND c.annual_revenue <> '' THEN 5 ELSE 0 END)
    + (CASE WHEN c.phone IS NOT NULL AND c.phone <> '' THEN 5 ELSE 0 END)
  )
WHERE intent IS NULL OR lead_score = 0;
