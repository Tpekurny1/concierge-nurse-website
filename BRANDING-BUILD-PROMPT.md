# Email Branding & Image Upload Build Prompt

## Context

This is a Vite + React 19 project with Tailwind CSS 4, Supabase, and Lucide React. The CRM admin panel lives at `/admin`. Email campaigns are sent via Resend through Vercel serverless functions.

The domain `conciergenursesociety.com` is verified in Resend.

**ImgBB API key for image hosting:** `21c70359a24d1d10335f4f41a8867b08`
ImgBB API endpoint: `https://api.imgbb.com/1/upload?key=21c70359a24d1d10335f4f41a8867b08`
Method: POST with form data, field name `image` (base64 or file). Returns JSON with `data.url` for the hosted image URL.

**Existing relevant files:**
- `src/pages/admin/Settings.jsx` — Settings page (currently stores to localStorage)
- `src/components/admin/EmailCampaignForm.jsx` — Shared email campaign form (new + edit)
- `api/send-campaign.js` — Serverless function that sends campaign emails via Resend
- `api/process-sequences.js` — Serverless function that sends sequence emails via Resend
- `src/lib/supabase.js` — Supabase client

**Database tables available:**
- All CRM tables (contacts, campaigns, sequences, etc.)

## Design System (match existing)
- Navy: `#0A1628`, Gold: `#C9A84C`, Cream: `#FAF7F2`, Cream Dark: `#F0EBE1`
- Labels: `text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40`
- Inputs: `px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors`
- Cards: `bg-white border border-cream-dark p-6`

## What to Build

### 1. Create a `brand_settings` table in Supabase

Create migration file `supabase-brand-settings-migration.sql`:

```sql
CREATE TABLE IF NOT EXISTS brand_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT DEFAULT 'Concierge Nurse Business Society',
  logo_url TEXT,
  photo_url TEXT,
  from_name TEXT DEFAULT 'Concierge Nurse Business Society',
  from_email TEXT DEFAULT 'hello@conciergenursesociety.com',
  brand_color TEXT DEFAULT '#C9A84C',
  footer_text TEXT DEFAULT 'Concierge Nurse Business Society',
  website_url TEXT DEFAULT 'https://www.conciergenursesociety.com',
  social_facebook TEXT,
  social_instagram TEXT,
  social_linkedin TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE brand_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Auth full access brand_settings"
  ON brand_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Anon can read brand settings (needed by serverless functions)
CREATE POLICY "Anon can read brand_settings"
  ON brand_settings FOR SELECT TO anon USING (true);

-- Insert default row
INSERT INTO brand_settings (business_name) VALUES ('Concierge Nurse Business Society');
```

Print this SQL to the console.

### 2. Update Settings page with Branding section

In `src/pages/admin/Settings.jsx`, add a **Branding** section at the top (above the existing sections) that loads from and saves to the `brand_settings` table in Supabase (NOT localStorage).

**Branding section fields:**

- **Business Name** (text input)
- **Logo Upload** — Click to upload area showing current logo (or placeholder). On upload:
  1. Convert file to base64
  2. POST to ImgBB API: `https://api.imgbb.com/1/upload?key=21c70359a24d1d10335f4f41a8867b08` with form data field `image` containing the base64 string
  3. Get back the hosted URL from `response.data.data.url`
  4. Save the URL to `brand_settings.logo_url`
  5. Show the uploaded logo as a preview
- **Profile Photo Upload** — Same upload flow as logo, saves to `brand_settings.photo_url`. This is Tracy's headshot for email signatures.
- **Default From Name** (text input)
- **Default From Email** (text input)
- **Brand Color** (color input or text input, default `#C9A84C`)
- **Footer Text** (text input — what appears at the bottom of every email)
- **Website URL** (text input)
- **Social Links** — Facebook URL, Instagram URL, LinkedIn URL (all optional)

**Save button** — upserts to the `brand_settings` table. Show success feedback.

Load the settings on page mount from `brand_settings` table (there's only ever one row).

### 3. Create a reusable image upload component

Create `src/components/admin/ImageUpload.jsx`:

Props: `currentUrl`, `onUpload(url)`, `label`, `shape` ("square" or "circle")

Features:
- Shows current image if `currentUrl` is set, otherwise a placeholder with upload icon
- Click to browse for file (accept images only)
- Drag and drop support
- On file select: show loading spinner, upload to ImgBB, call `onUpload(url)` with the hosted URL
- Circle shape for profile photo, square for logo
- Size: logo ~200x80 area, photo ~120x120 area

The ImgBB upload logic:
```js
async function uploadToImgBB(file) {
  const base64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });

  const formData = new FormData();
  formData.append('image', base64);

  const res = await fetch('https://api.imgbb.com/1/upload?key=21c70359a24d1d10335f4f41a8867b08', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  if (data.success) return data.data.url;
  throw new Error('Upload failed');
}
```

### 4. Auto-inject branding into campaign emails

Update `api/send-campaign.js` — before sending each email, wrap the user's HTML body in a branded email template:

```html
<div style="max-width: 600px; margin: 0 auto; font-family: Georgia, serif;">
  <!-- Header with logo -->
  {logo_url ? <img src="{logo_url}" alt="{business_name}" style="max-height: 60px; margin-bottom: 24px;" /> : ''}
  
  <!-- User's email body here -->
  {body}
  
  <!-- Branded footer -->
  <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #E5E7EB;">
    <table cellpadding="0" cellspacing="0" style="width: 100%;">
      <tr>
        {photo_url ? <td style="width: 60px; vertical-align: top; padding-right: 16px;"><img src="{photo_url}" width="50" height="50" style="border-radius: 50%;" /></td> : ''}
        <td style="vertical-align: top;">
          <p style="margin: 0; font-size: 14px; color: #0A1628; font-weight: bold;">{from_name}</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #6B7280;">{footer_text}</p>
          {website_url ? <p style="margin: 4px 0 0;"><a href="{website_url}" style="font-size: 12px; color: {brand_color};">{website_url}</a></p> : ''}
        </td>
      </tr>
    </table>
    
    <!-- Social links -->
    {social links if any, as small text links}
    
    <!-- Unsubscribe (keep existing unsubscribe footer) -->
    <p style="margin-top: 24px; text-align: center; font-size: 11px; color: #999;">
      <a href="https://www.conciergenursesociety.com/api/unsubscribe?id={CONTACT_ID}&campaign={CAMPAIGN_ID}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
    </p>
  </div>
</div>
```

To get the brand settings in the serverless function, fetch from Supabase:
```js
const { data: brand } = await supabase
  .from('brand_settings')
  .select('*')
  .single();
```

Then use the brand values to build the wrapper. If no brand settings exist, use sensible defaults.

Also apply the same branding wrapper in `api/process-sequences.js` for sequence emails.

### 5. Update EmailCampaignForm with branding preview

In `src/components/admin/EmailCampaignForm.jsx`, the preview panel should show the email with the branding applied — logo at top, signature at bottom, not just the raw HTML body.

Fetch brand settings on component mount and apply them to the preview:
```js
const [brand, setBrand] = useState(null);

useEffect(() => {
  supabase.from('brand_settings').select('*').single().then(({ data }) => setBrand(data));
}, []);
```

Then in the preview render, wrap the body HTML with the logo header and signature footer using the brand settings.

### 6. Update the default from_name/from_email in campaign forms

In `src/components/admin/EmailCampaignForm.jsx`, instead of hardcoding the defaults, load them from `brand_settings`:

```js
useEffect(() => {
  supabase.from('brand_settings').select('from_name, from_email').single().then(({ data }) => {
    if (data && mode === 'new') {
      setForm(prev => ({
        ...prev,
        from_name: data.from_name || prev.from_name,
        from_email: data.from_email || prev.from_email,
      }));
    }
  });
}, []);
```

Same for `src/pages/admin/SequenceEditor.jsx`.

### 7. Add image insert to email body

In the email body editor (in `EmailCampaignForm.jsx`), add an "Insert Image" button alongside the personalization buttons:

- Clicking it opens a file picker
- Uploads the image to ImgBB
- Inserts `<img src="{uploaded_url}" style="max-width: 100%;" />` at the cursor position in the textarea

This lets Tracy add inline images to any campaign email.

## Important Rules

1. **Vite + React, JavaScript only.** No TypeScript, no Next.js.
2. **ImgBB API key is public** (it's a free image hosting API) so it's fine to use directly from the frontend. No need for a serverless function.
3. **Brand settings live in Supabase**, not localStorage. There's only ever one row in `brand_settings`.
4. **Match the existing design system.** Look at the current Settings page and other admin pages for patterns.
5. **Run `npm run build` after all changes.**
6. **Do not modify public-facing pages.**
7. The branding wrapper must be applied in BOTH `api/send-campaign.js` AND `api/process-sequences.js`.
8. The unsubscribe link must still be present in every email.
9. Print the migration SQL to the console.
10. After all changes, commit and push to `origin main`.
