-- ============================================================================
-- Directory Seed — 9 members from the existing CNBS directory
-- Run AFTER supabase-directory-migration.sql.
--
-- Data extracted from the public directory shared by the client (phones,
-- names, credentials, specialties, taglines, locations). The email/website/
-- social URLs were not visible in the source (buttons hide their targets)
-- and are left null for Tracy to fill in via the CRM editor.
-- ============================================================================

INSERT INTO directory_members
  (name, credentials, business_name, specialty, tagline, location, phone, display_order, status)
VALUES
  (
    'Ana Camargo',
    'MSN, CNOR, FNP-S',
    'Peony Concierge Nursing LLC',
    'Post-Operative Concierge Nursing',
    'Specialized post-operative recovery nursing care delivered in the comfort of your home.',
    'Maryland, District of Columbia, Northern Virginia',
    '(240) 253-9664',
    10,
    'active'
  ),
  (
    'Corey Green',
    'RN, CCM',
    'Wellness Solutions Co. by Corey, LLC',
    'Aging Well at Home',
    'Helping aging adults thrive independently at home with personalized wellness support.',
    'Central Florida, Orlando Area',
    '(248) 379-6586',
    20,
    'active'
  ),
  (
    'Geneva Miller',
    'RN, MSN, CNL',
    'Equipped Healthcare Solutions',
    'Aging Well at Home',
    'Equipping families with expert nursing guidance for aging loved ones at home.',
    'South Carolina',
    '(864) 524-7954',
    30,
    'active'
  ),
  (
    'Vanessa Chambers',
    'RN, BSN',
    'Care For Lives',
    'Post-Op Orthopedic Care at Home',
    'Personalized post-operative orthopedic recovery care in the comfort of your home.',
    'New York, NY',
    '(347) 594-4101',
    40,
    'active'
  ),
  (
    'Giannina Falla',
    'RN, BSN',
    'Grande Vida Concierge LLC',
    'White Glove Post-Op Recovery (Plastic, Cosmetic, Ortho)',
    'White glove post-op plastic, cosmetic, and orthopedic at-home recovery services.',
    'DC, Maryland, Virginia',
    '(941) 224-6142',
    50,
    'active'
  ),
  (
    'Jessica Morse',
    'RN, CMSRN, BSN',
    'Signature Wellness LLC',
    'Concierge Nursing',
    'Personalized concierge nursing care designed around your needs and your schedule.',
    'Chester County, PA',
    '(484) 630-0593',
    60,
    'active'
  ),
  (
    'Allie Alonzo',
    'RN, BSN, MSN, CBS',
    'Sacred Journey Premier Perinatal Nursing LLC',
    'Perinatal Concierge Nursing',
    'Premier perinatal nursing for families navigating the sacred journey of birth and postpartum.',
    'Wichita, KS',
    '(316) 202-8789',
    70,
    'active'
  ),
  (
    'Lacey Ruff',
    'RN',
    'The Village Nurse Concierge Services',
    'Aging Well at Home',
    'Private nurse concierge services for aging loved ones who value trust, continuity, and peace of mind.',
    'Wichita, KS',
    NULL,
    80,
    'active'
  ),
  (
    'Michele Morris',
    'RN, BSN',
    'Trusted Hands Nurse Concierge',
    'Pre and Post-Operative Concierge Nursing',
    'You scheduled the surgery, together we plan the healing.',
    'Southeastern Massachusetts',
    '(508) 927-1065',
    90,
    'active'
  );
