import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';

const BUSINESS_NAME = 'Concierge Nurse Business Society';
const DOMAIN = 'conciergenursesociety.com';
const EMAIL = 'info@conciergenursesociety.com';
const LAST_UPDATED = 'April 20, 2026';

const sections = [
  {
    id: 'educational',
    title: 'Educational and Informational Purpose Only',
    body: (
      <p>
        All content on {DOMAIN}, including articles, guides, resources,
        templates, downloads, programs, coaching sessions, membership content,
        and any other materials (collectively, the &ldquo;Content&rdquo;), is
        provided for educational and informational purposes only. The Content
        is not a substitute for independent professional judgment, research,
        or advice tailored to your specific situation.
      </p>
    ),
  },
  {
    id: 'not-professional-advice',
    title: 'Not Legal, Financial, Tax, or Medical Advice',
    body: (
      <>
        <p className="mb-4">
          Nothing on the Website should be construed as legal, accounting,
          tax, financial, investment, medical, clinical, nursing, or any other
          form of professional advice. The Content is not a substitute for
          advice from a licensed attorney, accountant, financial advisor,
          physician, nurse practitioner, or any other qualified professional
          in your jurisdiction.
        </p>
        <p>
          Before making decisions about your business structure, contracts,
          taxes, insurance, scope of practice, clinical services, or any
          related matter, you should consult with licensed professionals who
          are qualified to advise you under the laws of your state and the
          specifics of your situation.
        </p>
      </>
    ),
  },
  {
    id: 'no-professional-relationship',
    title: 'No Professional Relationship Is Formed',
    body: (
      <p>
        Your use of the Website, your participation in any program or
        membership, and your communication with us do not create a
        professional relationship of any kind, including but not limited to an
        attorney-client relationship, accountant-client relationship,
        physician-patient relationship, or nurse-patient relationship. Nothing
        said or written by us should be relied upon as professional advice
        specific to your situation.
      </p>
    ),
  },
  {
    id: 'nursing-scope',
    title: 'Nursing Practice, Scope of Practice, and Licensure',
    body: (
      <>
        <p className="mb-4">
          {BUSINESS_NAME} provides business education and coaching for nurses
          who are building or operating concierge nursing businesses. We do
          not provide clinical training, continuing nursing education, scope
          of practice determinations, or state licensure guidance.
        </p>
        <p className="mb-4">
          You are solely responsible for understanding and complying with the
          nursing practice act, scope of practice, licensure requirements,
          collaborative agreement requirements, and all other laws and
          regulations that apply to you in the state(s) where you practice.
          Rules vary significantly by state and change over time.
        </p>
        <p>
          Any mention of clinical services, procedures, medications, or
          patient care on the Website is intended to provide context about the
          business of concierge nursing, not to teach or endorse any clinical
          practice. You are responsible for determining whether any service
          you offer is within your scope of practice in your state.
        </p>
      </>
    ),
  },
  {
    id: 'hipaa-compliance',
    title: 'HIPAA and Regulatory Compliance',
    body: (
      <p>
        Any references to HIPAA, patient privacy, charting, documentation,
        billing, payment processing, telehealth, or other regulatory topics
        are provided for educational purposes only. You are solely responsible
        for your own HIPAA compliance, patient privacy practices, and
        compliance with all other applicable federal, state, and local laws
        and regulations. We recommend that you work with a qualified
        healthcare compliance professional or attorney to evaluate and
        maintain your compliance program.
      </p>
    ),
  },
  {
    id: 'no-results-guarantee',
    title: 'No Guarantee of Results',
    body: (
      <>
        <p className="mb-4">
          Building a business requires time, effort, skill, resources, market
          conditions, and circumstances that vary from person to person. We
          make no representations, warranties, or guarantees that you will
          earn any specific income, attract any specific number of clients,
          launch a successful business, or achieve any particular result as a
          result of using the Content, participating in our programs, or
          joining our membership.
        </p>
        <p>
          Any income examples, case studies, client stories, or success
          stories shared on the Website reflect the experience of specific
          individuals and are not typical. Your results will depend on your
          own effort, decisions, skills, and many factors outside of our
          control. By using the Website, you accept full responsibility for
          the outcomes of your business and your decisions.
        </p>
      </>
    ),
  },
  {
    id: 'testimonials',
    title: 'Testimonials and Endorsements',
    body: (
      <p>
        Any testimonials, reviews, or endorsements on the Website reflect the
        real experiences of the individuals who provided them at the time they
        provided them. Testimonials are not claims about what you can expect.
        They are examples of what is possible. Individual results will vary
        based on effort, commitment, business decisions, and other factors.
      </p>
    ),
  },
  {
    id: 'affiliate',
    title: 'Affiliate Links and Third-Party Products',
    body: (
      <p>
        The Website may contain links to third-party products, services, or
        tools. In some cases, we may receive a commission or other
        compensation if you purchase through those links, at no additional
        cost to you. We only recommend products, services, and tools we
        believe are useful to concierge nurse business owners. We are not
        responsible for the quality, accuracy, availability, or legality of
        any third-party product or service, and our recommendation does not
        constitute an endorsement of all aspects of that product or service.
      </p>
    ),
  },
  {
    id: 'external-links',
    title: 'External Links',
    body: (
      <p>
        The Website may contain links to external websites that we do not own
        or control. We are not responsible for the content, accuracy,
        availability, or practices of any external website. A link to an
        external website does not mean we endorse that website or its
        operators. Your use of any external website is at your own risk and
        subject to that website&rsquo;s own terms and policies.
      </p>
    ),
  },
  {
    id: 'accuracy',
    title: 'Accuracy of Information',
    body: (
      <p>
        We make reasonable efforts to keep the Content accurate and up to
        date. However, laws, regulations, business practices, and market
        conditions change frequently. We make no representation or warranty
        that the Content is complete, current, or error-free. You should
        verify any information you rely on with a qualified professional in
        your jurisdiction.
      </p>
    ),
  },
  {
    id: 'use-at-own-risk',
    title: 'Use at Your Own Risk',
    body: (
      <p>
        Your use of the Website and the Content is at your own risk. To the
        fullest extent permitted by law, {BUSINESS_NAME} and its owners,
        employees, contractors, and affiliates shall not be liable for any
        loss, damage, or injury of any kind arising out of or in connection
        with your use of the Website or the Content, your participation in any
        program or membership, or any business decision you make based on
        information you learn from us.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Disclaimer',
    body: (
      <p>
        We may update this Disclaimer from time to time. The date of the most
        recent update will be shown at the top of this page. Your continued
        use of the Website after any update constitutes your acceptance of
        the revised Disclaimer.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    body: (
      <p>
        If you have any questions about this Disclaimer, please contact us at{' '}
        <a href={`mailto:${EMAIL}`} className="text-gold underline">
          {EMAIL}
        </a>
        .
      </p>
    ),
  },
];

function AccordionItem({ section, isOpen, onToggle }) {
  return (
    <div className="border-b border-cream-dark">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-heading text-base sm:text-lg font-bold text-navy group-hover:text-gold transition-colors">
          {section.title}
        </span>
        <ChevronDown
          size={20}
          className={`text-slate flex-shrink-0 ml-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-gold' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pr-6 text-slate text-sm leading-relaxed">
            {section.body}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Disclaimer() {
  const [openIds, setOpenIds] = useState(new Set());

  function toggle(id) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function expandAll() {
    setOpenIds(new Set(sections.map((s) => s.id)));
  }

  function collapseAll() {
    setOpenIds(new Set());
  }

  return (
    <>
      <SEO
        title="Disclaimer — Concierge Nurse Business Society"
        description="Important disclaimers about the educational content, programs, and services provided by the Concierge Nurse Business Society."
        canonical="/disclaimer"
      />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-4">Legal</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-5">
            <span className="text-gold-gradient">Disclaimer</span>
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-white/60 text-sm">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="space-y-4 text-charcoal text-[0.95rem] leading-relaxed">
            <p>
              Please read this Disclaimer carefully before using {DOMAIN} (the
              &ldquo;Website&rdquo;) or participating in any programs,
              coaching, membership, or other services offered by{' '}
              {BUSINESS_NAME} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;).
            </p>
            <p className="font-medium text-navy">
              By using the Website or any of our services, you acknowledge
              that you have read, understood, and agree to this Disclaimer.
              If you do not agree, please do not use the Website or our
              services.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-cream-dark">
            <p className="section-label">Sections</p>
            <div className="flex gap-6 text-xs uppercase tracking-widest font-body">
              <button
                onClick={expandAll}
                className="text-slate hover:text-gold transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="text-slate hover:text-gold transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div>
            {sections.map((section) => (
              <AccordionItem
                key={section.id}
                section={section}
                isOpen={openIds.has(section.id)}
                onToggle={() => toggle(section.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <section className="py-16 bg-cream border-t border-cream-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-slate text-sm mb-6">
            Questions? Contact us at{' '}
            <a href={`mailto:${EMAIL}`} className="text-gold underline">
              {EMAIL}
            </a>
            .
          </p>
          <div className="flex gap-6 justify-center text-xs uppercase tracking-widest font-body text-slate">
            <Link to="/terms" className="hover:text-gold transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-slate/30">·</span>
            <Link to="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate/30">·</span>
            <Link to="/contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
