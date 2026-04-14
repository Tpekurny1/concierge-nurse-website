-- ============================================
-- Pipelines — Lead Journey Tracking
-- Run this in your Supabase SQL Editor
-- ============================================

CREATE TABLE pipelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  stages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE pipeline_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  stage TEXT NOT NULL,
  entered_stage_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(pipeline_id, contact_id)
);

CREATE INDEX pipeline_contacts_pipeline_idx ON pipeline_contacts (pipeline_id);
CREATE INDEX pipeline_contacts_contact_idx ON pipeline_contacts (contact_id);
CREATE INDEX pipeline_contacts_stage_idx ON pipeline_contacts (stage);

-- RLS
ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_contacts ENABLE ROW LEVEL SECURITY;

-- Anon can insert pipeline_contacts (auto-assignment from forms)
CREATE POLICY "Anon can insert pipeline_contacts"
  ON pipeline_contacts FOR INSERT TO anon WITH CHECK (true);

-- Anon can select pipelines (need IDs for auto-assignment)
CREATE POLICY "Anon can select pipelines"
  ON pipelines FOR SELECT TO anon USING (true);

-- Anon can select pipeline_contacts (dedup check)
CREATE POLICY "Anon can select pipeline_contacts"
  ON pipeline_contacts FOR SELECT TO anon USING (true);

-- Auth full access
CREATE POLICY "Auth full access pipelines"
  ON pipelines FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Auth full access pipeline_contacts"
  ON pipeline_contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed the three pipelines
INSERT INTO pipelines (name, stages) VALUES
  ('Accelerator', '["New", "Contacted", "Consult Booked", "Enrolled", "Completed"]'),
  ('Consulting', '["New", "Contacted", "Discovery Call", "Proposal Sent", "Active Client"]'),
  ('General', '["New", "Contacted", "Nurturing", "Converted", "Closed"]');
