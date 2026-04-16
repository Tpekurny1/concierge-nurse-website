-- ============================================
-- Backfill existing contacts into pipelines
-- Run this in your Supabase SQL Editor
-- ============================================

-- Put Accelerator Waitlist contacts into Accelerator pipeline
INSERT INTO pipeline_contacts (pipeline_id, contact_id, stage)
SELECT p.id, ct.contact_id, 'New'
FROM contact_tags ct
JOIN tags t ON t.id = ct.tag_id
JOIN pipelines p ON p.name = 'Accelerator'
WHERE t.name = 'Accelerator Waitlist'
ON CONFLICT (pipeline_id, contact_id) DO NOTHING;

-- Put Consulting Inquiry contacts into Consulting pipeline
INSERT INTO pipeline_contacts (pipeline_id, contact_id, stage)
SELECT p.id, ct.contact_id, 'New'
FROM contact_tags ct
JOIN tags t ON t.id = ct.tag_id
JOIN pipelines p ON p.name = 'Consulting'
WHERE t.name = 'Consulting Inquiry'
ON CONFLICT (pipeline_id, contact_id) DO NOTHING;

-- Put everyone else into General pipeline (anyone not already in a pipeline)
INSERT INTO pipeline_contacts (pipeline_id, contact_id, stage)
SELECT p.id, c.id, 'New'
FROM contacts c
CROSS JOIN pipelines p
WHERE p.name = 'General'
AND c.id NOT IN (SELECT contact_id FROM pipeline_contacts)
ON CONFLICT (pipeline_id, contact_id) DO NOTHING;
