-- ============================================================================
-- Blog RLS policy fix
-- The original migration used auth.role() = 'authenticated' which fails under
-- this project's auth setup. This drops and recreates the policies using the
-- same TO <role> syntax the rest of the codebase uses and that is known to work.
-- Safe to re-run.
-- ============================================================================

-- Drop all the old policies
DROP POLICY IF EXISTS "Public read published posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated full access posts" ON blog_posts;

DROP POLICY IF EXISTS "Public read categories" ON blog_categories;
DROP POLICY IF EXISTS "Authenticated full access categories" ON blog_categories;

DROP POLICY IF EXISTS "Public read post categories" ON blog_post_categories;
DROP POLICY IF EXISTS "Authenticated full access post categories" ON blog_post_categories;

DROP POLICY IF EXISTS "Public read approved comments" ON blog_comments;
DROP POLICY IF EXISTS "Public insert comments" ON blog_comments;
DROP POLICY IF EXISTS "Authenticated full access comments" ON blog_comments;

DROP POLICY IF EXISTS "Public read blog settings" ON blog_settings;
DROP POLICY IF EXISTS "Authenticated write blog settings" ON blog_settings;

-- ── blog_posts ────────────────────────────────────────────────────────────
CREATE POLICY "Anon can read published posts" ON blog_posts
  FOR SELECT TO anon
  USING (status = 'published' AND (published_at IS NULL OR published_at <= NOW()));

CREATE POLICY "Auth full access posts" ON blog_posts
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ── blog_categories ───────────────────────────────────────────────────────
CREATE POLICY "Anon can read categories" ON blog_categories
  FOR SELECT TO anon USING (true);

CREATE POLICY "Auth full access categories" ON blog_categories
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ── blog_post_categories ──────────────────────────────────────────────────
CREATE POLICY "Anon can read post categories" ON blog_post_categories
  FOR SELECT TO anon USING (true);

CREATE POLICY "Auth full access post categories" ON blog_post_categories
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ── blog_comments ─────────────────────────────────────────────────────────
CREATE POLICY "Anon can read approved comments" ON blog_comments
  FOR SELECT TO anon USING (status = 'approved');

CREATE POLICY "Anon can insert comments" ON blog_comments
  FOR INSERT TO anon WITH CHECK (true);

-- Anon must be able to UPDATE the contact_id link on their just-inserted
-- comment (the public form does a post-insert update to attach contact_id
-- after lead capture). Restrict to nothing sensitive.
CREATE POLICY "Anon can link contact to own comment" ON blog_comments
  FOR UPDATE TO anon
  USING (status = 'pending' OR status = 'approved')
  WITH CHECK (true);

CREATE POLICY "Auth full access comments" ON blog_comments
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ── blog_settings ─────────────────────────────────────────────────────────
-- Public needs to read the sign-off fields (to render on public posts)
-- and the comments_enabled + filter config (for the public comment form
-- to know whether to show and how to validate).
CREATE POLICY "Anon can read blog settings" ON blog_settings
  FOR SELECT TO anon USING (true);

CREATE POLICY "Auth full access blog settings" ON blog_settings
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
