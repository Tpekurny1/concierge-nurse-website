-- Email sequences (automations) — replaces Flodesk-style workflows
-- Run in Supabase SQL editor.

-- Email sequences (automations)
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

-- Individual emails in a sequence
CREATE TABLE IF NOT EXISTS sequence_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sequence_id UUID REFERENCES sequences(id) ON DELETE CASCADE NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  subject TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  delay_days INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tracks which contacts are in which sequences and where they are
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

-- Tracks which sequence emails have been sent to which contacts
CREATE TABLE IF NOT EXISTS sequence_sends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sequence_email_id UUID REFERENCES sequence_emails(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  UNIQUE(sequence_email_id, contact_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS sequence_enrollments_status_idx ON sequence_enrollments (status);
CREATE INDEX IF NOT EXISTS sequence_enrollments_sequence_idx ON sequence_enrollments (sequence_id);
CREATE INDEX IF NOT EXISTS sequence_sends_email_idx ON sequence_sends (sequence_email_id);
CREATE INDEX IF NOT EXISTS sequence_emails_sequence_idx ON sequence_emails (sequence_id, position);

-- RLS
ALTER TABLE sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_sends ENABLE ROW LEVEL SECURITY;

-- Anon can insert enrollments (auto-triggered from form submissions)
DROP POLICY IF EXISTS "Anon can insert sequence_enrollments" ON sequence_enrollments;
CREATE POLICY "Anon can insert sequence_enrollments" ON sequence_enrollments FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Anon can select sequences" ON sequences;
CREATE POLICY "Anon can select sequences" ON sequences FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Anon can select sequence_enrollments" ON sequence_enrollments;
CREATE POLICY "Anon can select sequence_enrollments" ON sequence_enrollments FOR SELECT TO anon USING (true);

-- Auth full access
DROP POLICY IF EXISTS "Auth full access sequences" ON sequences;
CREATE POLICY "Auth full access sequences" ON sequences FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Auth full access sequence_emails" ON sequence_emails;
CREATE POLICY "Auth full access sequence_emails" ON sequence_emails FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Auth full access sequence_enrollments" ON sequence_enrollments;
CREATE POLICY "Auth full access sequence_enrollments" ON sequence_enrollments FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Auth full access sequence_sends" ON sequence_sends;
CREATE POLICY "Auth full access sequence_sends" ON sequence_sends FOR ALL TO authenticated USING (true) WITH CHECK (true);
