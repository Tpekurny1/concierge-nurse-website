import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, BookOpen } from 'lucide-react';
import SEO from './SEO';

function TableOfContents({ headings }) {
  if (!headings || headings.length === 0) return null;
  return (
    <div className="bg-cream border border-cream-dark p-6">
      <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-gold mb-4">
        On This Page
      </p>
      <ul className="space-y-2">
        {headings.map((heading, i) => (
          <li key={i}>
            <a
              href={`#${heading.id}`}
              className="text-sm text-charcoal hover:text-gold transition-colors leading-snug block"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CTACard({ title, description, buttonText, buttonLink }) {
  return (
    <div className="bg-navy p-6 text-white">
      <p className="font-heading text-lg font-bold mb-2">{title}</p>
      <p className="text-white/60 text-sm leading-relaxed mb-4">{description}</p>
      <Link
        to={buttonLink}
        className="btn-secondary inline-flex items-center gap-2"
        style={{ fontSize: '0.6rem', padding: '0.6rem 1.2rem' }}
      >
        {buttonText} <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function RelatedCard({ title, description, link, category }) {
  return (
    <Link to={link} className="block bg-cream border border-cream-dark p-6 hover:border-navy transition-colors group">
      <p className="text-xs font-body font-medium uppercase tracking-[0.15em] text-gold mb-2">
        {category}
      </p>
      <h3 className="font-heading text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">
        {title}
      </h3>
      <p className="text-slate text-sm leading-relaxed line-clamp-2">{description}</p>
    </Link>
  );
}

export default function ResourceLayout({
  title,
  description,
  canonical,
  schema,
  category,
  categorySlug = '/resources',
  lastUpdated = 'April 2026',
  headings = [],
  relatedResources = [],
  cta = null,
  faqSchema = null,
  children,
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.conciergenursesociety.com/" },
      { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://www.conciergenursesociety.com/resources" },
      ...(category ? [{ "@type": "ListItem", "position": 3, "name": category, "item": `https://www.conciergenursesociety.com${categorySlug}` }] : []),
      { "@type": "ListItem", "position": category ? 4 : 3, "name": title }
    ]
  };

  const combinedSchema = [breadcrumbSchema];
  if (schema) combinedSchema.push(...(Array.isArray(schema) ? schema : [schema]));
  if (faqSchema) combinedSchema.push(faqSchema);

  const defaultCta = {
    title: 'Ready to Build Your Business?',
    description: 'Join the Concierge Nurse Business Society community and get the support you need to launch.',
    buttonText: 'Start Here',
    buttonLink: '/start-here',
  };

  const ctaData = cta || defaultCta;

  return (
    <>
      <SEO
        title={`${title} | Concierge Nurse Business Society`}
        description={description}
        canonical={canonical}
        type="article"
        schema={combinedSchema}
      />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/40 text-xs font-body mb-8 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/resources" className="hover:text-white transition-colors">Resources</Link>
            {category && (
              <>
                <ChevronRight size={12} />
                <Link to={categorySlug} className="hover:text-white transition-colors">{category}</Link>
              </>
            )}
          </nav>

          {category && (
            <p className="section-label mb-4">{category}</p>
          )}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.1] mb-5">
            {title}
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-white/60 text-base leading-relaxed max-w-2xl mb-4">
            {description}
          </p>
          <p className="text-white/30 text-xs font-body uppercase tracking-[0.15em]">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="prose-custom">
                {children}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-28 space-y-6">
                <TableOfContents headings={headings} />
                <CTACard {...ctaData} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <section className="bg-cream py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <p className="section-label mb-4">Related Resources</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy mb-8">
              Continue Learning
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedResources.map((resource, i) => (
                <RelatedCard key={i} {...resource} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="section-label mb-4">Take the Next Step</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            {ctaData.title}
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/60 text-base leading-relaxed mb-8">
            {ctaData.description}
          </p>
          <Link
            to={ctaData.buttonLink}
            className="btn-secondary inline-flex items-center gap-2"
          >
            {ctaData.buttonText} <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
