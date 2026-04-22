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

-- Blog posts: public can read published ones; auth users can do anything
DROP POLICY IF EXISTS "Public read published posts" ON blog_posts;
CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT USING (status = 'published' AND (published_at IS NULL OR published_at <= NOW()));

DROP POLICY IF EXISTS "Authenticated full access posts" ON blog_posts;
CREATE POLICY "Authenticated full access posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Categories: public read; auth full access
DROP POLICY IF EXISTS "Public read categories" ON blog_categories;
CREATE POLICY "Public read categories" ON blog_categories
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Authenticated full access categories" ON blog_categories;
CREATE POLICY "Authenticated full access categories" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Post/Category join: public read; auth full access
DROP POLICY IF EXISTS "Public read post categories" ON blog_post_categories;
CREATE POLICY "Public read post categories" ON blog_post_categories
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Authenticated full access post categories" ON blog_post_categories;
CREATE POLICY "Authenticated full access post categories" ON blog_post_categories
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Comments: public can INSERT + read approved; auth full access
DROP POLICY IF EXISTS "Public read approved comments" ON blog_comments;
CREATE POLICY "Public read approved comments" ON blog_comments
  FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Public insert comments" ON blog_comments;
CREATE POLICY "Public insert comments" ON blog_comments
  FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Authenticated full access comments" ON blog_comments;
CREATE POLICY "Authenticated full access comments" ON blog_comments
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Blog settings: public can read sign-off fields (needed for public render);
-- auth can read/write everything
DROP POLICY IF EXISTS "Public read blog settings" ON blog_settings;
CREATE POLICY "Public read blog settings" ON blog_settings
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Authenticated write blog settings" ON blog_settings;
CREATE POLICY "Authenticated write blog settings" ON blog_settings
  FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
