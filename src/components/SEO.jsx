import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.conciergenursesociety.com';
const SITE_NAME = 'Concierge Nurse Business Society';
const DEFAULT_IMAGE = '/og-default.jpg';

export default function SEO({
  title = `${SITE_NAME} - Build, Launch & Scale Your Nursing Business`,
  description = 'Tracy Pekurny helps registered nurses build, launch, and scale independent private-pay concierge nursing businesses through education, strategic consulting, and hands-on coaching.',
  canonical = '/',
  type = 'website',
  schema = null,
  image = DEFAULT_IMAGE,
}) {
  const url = canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
