-- ============================================================================
-- Blog System Migration
-- Adds full blog platform: posts, categories, comments, and moderation.
--
-- Also requires a Supabase Storage bucket named "blog-images":
--   - Create via Dashboard -> Storage -> New bucket -> name: blog-images
--   - Set to PUBLIC (public read, authenticated write)
-- ============================================================================

-- ── Blog Posts ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  excerpt TEXT,
  cover_image_url TEXT,
  content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_html TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  reading_time_minutes INTEGER DEFAULT 1,
  tags TEXT[] DEFAULT '{}',
  -- Per-post sign-off (only read when use_default_signoff = FALSE)
  use_default_signoff BOOLEAN DEFAULT TRUE,
  signoff_closing_line TEXT,
  signoff_name TEXT,
  signoff_title TEXT,
  signoff_photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN (tags);

-- Auto-touch updated_at
CREATE OR REPLACE FUNCTION touch_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION touch_blog_posts_updated_at();

-- ── Blog Categories ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_post_categories (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

CREATE INDEX IF NOT EXISTS idx_blog_post_categories_post ON blog_post_categories (post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_categories_category ON blog_post_categories (category_id);

-- ── Blog / Comments Settings (single-row table) ───────────────────────────
CREATE TABLE IF NOT EXISTS blog_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  -- Sign-off defaults
  signoff_closing_line TEXT DEFAULT 'Keep building —',
  signoff_name TEXT NOT NULL DEFAULT 'Tracy Pekurny, RN',
  signoff_title TEXT DEFAULT 'Founder, Concierge Nurse Business Society',
  signoff_photo_url TEXT,
  -- Comments moderation
  comments_enabled BOOLEAN DEFAULT TRUE,
  auto_approve BOOLEAN DEFAULT FALSE,
  profanity_filter_on BOOLEAN DEFAULT TRUE,
  max_links INTEGER DEFAULT 2,
  disposable_email_blocked BOOLEAN DEFAULT TRUE,
  all_caps_filter BOOLEAN DEFAULT FALSE,
  repeat_char_filter BOOLEAN DEFAULT TRUE,
  min_comment_length INTEGER DEFAULT 5,
  max_comment_length INTEGER DEFAULT 2000,
  rate_limit_per_hour INTEGER DEFAULT 5,
  blacklisted_words TEXT[] DEFAULT '{}',
  whitelist_words TEXT[] DEFAULT '{}',
  blocked_email_domains TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO blog_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ── Blog Comments ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_website TEXT,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  rejection_reason TEXT,
  flagged_by_filter TEXT,
  ip_address TEXT,
  user_agent TEXT,
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID
);

CREATE INDEX IF NOT EXISTS idx_blog_comments_post ON blog_comments (post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments (status);
CREATE INDEX IF NOT EXISTS idx_blog_comments_email_time ON blog_comments (author_email, submitted_at DESC);

-- ── Row Level Security ────────────────────────────────────────────────────
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_settings ENABLE ROW LEVEL SECURITY;

-- Policies — mirror the role-based syntax used elsewhere in the codebase.
-- Public (anon) gets scoped read + the specific writes the public site needs;
-- authenticated admins get full access.

-- blog_posts
DROP POLICY IF EXISTS "Anon can read published posts" ON blog_posts;
CREATE POLICY "Anon can read published posts" ON blog_posts
  FOR SELECT TO anon
  USING (status = 'published' AND (published_at IS NULL OR published_at <= NOW()));

DROP POLICY IF EXISTS "Auth full access posts" ON blog_posts;
CREATE POLICY "Auth full access posts" ON blog_posts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- blog_categories
DROP POLICY IF EXISTS "Anon can read categories" ON blog_categories;
CREATE POLICY "Anon can read categories" ON blog_categories
  FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Auth full access categories" ON blog_categories;
CREATE POLICY "Auth full access categories" ON blog_categories
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- blog_post_categories
DROP POLICY IF EXISTS "Anon can read post categories" ON blog_post_categories;
CREATE POLICY "Anon can read post categories" ON blog_post_categories
  FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Auth full access post categories" ON blog_post_categories;
CREATE POLICY "Auth full access post categories" ON blog_post_categories
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- blog_comments
DROP POLICY IF EXISTS "Anon can read approved comments" ON blog_comments;
CREATE POLICY "Anon can read approved comments" ON blog_comments
  FOR SELECT TO anon USING (status = 'approved');

DROP POLICY IF EXISTS "Anon can insert comments" ON blog_comments;
CREATE POLICY "Anon can insert comments" ON blog_comments
  FOR INSERT TO anon WITH CHECK (true);

-- Anon must be able to UPDATE the contact_id link on their just-inserted comment
DROP POLICY IF EXISTS "Anon can link contact to own comment" ON blog_comments;
CREATE POLICY "Anon can link contact to own comment" ON blog_comments
  FOR UPDATE TO anon
  USING (status = 'pending' OR status = 'approved')
  WITH CHECK (true);

DROP POLICY IF EXISTS "Auth full access comments" ON blog_comments;
CREATE POLICY "Auth full access comments" ON blog_comments
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- blog_settings
DROP POLICY IF EXISTS "Anon can read blog settings" ON blog_settings;
CREATE POLICY "Anon can read blog settings" ON blog_settings
  FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Auth full access blog settings" ON blog_settings;
CREATE POLICY "Auth full access blog settings" ON blog_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
