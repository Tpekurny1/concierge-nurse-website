-- ============================================
-- Missing tables — Run in Supabase SQL Editor
-- ============================================

-- Enable UUID generation (if not already)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TAGS (our code uses this, not segments)
-- ============================================
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO tags (name) VALUES
  ('Contact Form Lead'),
  ('Consulting Inquiry'),
  ('Accelerator Waitlist'),
  ('Community Signup'),
  ('Newsletter Subscriber')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- CONTACT_TAGS (junction)
-- ============================================
CREATE TABLE IF NOT EXISTS contact_tags (
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (contact_id, tag_id)
);

-- ============================================
-- PAGE_VIEWS (analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  screen_width INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS page_views_path_idx ON page_views (path);

-- ============================================
-- CAMPAIGN_STATS
-- ============================================
CREATE TABLE IF NOT EXISTS campaign_stats (
  campaign_id UUID PRIMARY KEY REFERENCES campaigns(id) ON DELETE CASCADE,
  sent INTEGER DEFAULT 0,
  delivered INTEGER DEFAULT 0,
  opened INTEGER DEFAULT 0,
  clicked INTEGER DEFAULT 0,
  bounced INTEGER DEFAULT 0,
  unsubscribed INTEGER DEFAULT 0
);

-- ============================================
-- SEQUENCES (email automations)
-- ============================================
CREATE TABLE IF NOT EXISTS sequences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  trigger_tag_id UUID REFERENCES tags(id) ON DELETE SET NULL,
  from_name TEXT DEFAULT 'Concierge Nurse Business Society',
  from_email TEXT DEFAULT 'hello@conciergenursesociety.com',
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sequence_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sequence_id UUID REFERENCES sequences(id) ON DELETE CASCADE NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  subject TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  delay_days INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sequence_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sequence_id UUID REFERENCES sequences(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  current_position INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(sequence_id, contact_id)
);

CREATE TABLE IF NOT EXISTS sequence_sends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sequence_email_id UUID REFERENCES sequence_emails(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  UNIQUE(sequence_email_id, contact_id)
);

CREATE INDEX IF NOT EXISTS sequence_enrollments_status_idx ON sequence_enrollments (status);
CREATE INDEX IF NOT EXISTS sequence_enrollments_sequence_idx ON sequence_enrollments (sequence_id);
CREATE INDEX IF NOT EXISTS sequence_sends_email_idx ON sequence_sends (sequence_email_id);
CREATE INDEX IF NOT EXISTS sequence_emails_sequence_idx ON sequence_emails (sequence_id, position);

-- ============================================
-- AUTO-UPDATE updated_at ON CONTACTS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS contacts_updated_at ON contacts;
CREATE TRIGGER contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- PIPELINES (if not already seeded)
-- ============================================
INSERT INTO pipelines (name, stages) VALUES
  ('Accelerator', '["New", "Contacted", "Consult Booked", "Enrolled", "Completed"]'),
  ('Consulting', '["New", "Contacted", "Discovery Call", "Proposal Sent", "Active Client"]'),
  ('General', '["New", "Contacted", "Nurturing", "Converted", "Closed"]')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- RLS POLICIES
-- ============================================

-- tags
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon can read tags" ON tags;
CREATE POLICY "Anon can read tags" ON tags FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Auth full access tags" ON tags;
CREATE POLICY "Auth full access tags" ON tags FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- contact_tags
ALTER TABLE contact_tags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon can insert contact_tags" ON contact_tags;
CREATE POLICY "Anon can insert contact_tags" ON contact_tags FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Anon can select contact_tags" ON contact_tags;
CREATE POLICY "Anon can select contact_tags" ON contact_tags FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Auth full access contact_tags" ON contact_tags;
CREATE POLICY "Auth full access contact_tags" ON contact_tags FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- page_views
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon can insert page_views" ON page_views;
CREATE POLICY "Anon can insert page_views" ON page_views FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Auth full access page_views" ON page_views;
CREATE POLICY "Auth full access page_views" ON page_views FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- campaign_stats
ALTER TABLE campaign_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Auth full access campaign_stats" ON campaign_stats;
CREATE POLICY "Auth full access campaign_stats" ON campaign_stats FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- sequences
ALTER TABLE sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_sends ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anon can select sequences" ON sequences;
CREATE POLICY "Anon can select sequences" ON sequences FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Anon can insert sequence_enrollments" ON sequence_enrollments;
CREATE POLICY "Anon can insert sequence_enrollments" ON sequence_enrollments FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Anon can select sequence_enrollments" ON sequence_enrollments;
CREATE POLICY "Anon can select sequence_enrollments" ON sequence_enrollments FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Auth full access sequences" ON sequences;
CREATE POLICY "Auth full access sequences" ON sequences FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth full access sequence_emails" ON sequence_emails;
CREATE POLICY "Auth full access sequence_emails" ON sequence_emails FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth full access sequence_enrollments" ON sequence_enrollments;
CREATE POLICY "Auth full access sequence_enrollments" ON sequence_enrollments FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth full access sequence_sends" ON sequence_sends;
CREATE POLICY "Auth full access sequence_sends" ON sequence_sends FOR ALL TO authenticated USING (true) WITH CHECK (true);
