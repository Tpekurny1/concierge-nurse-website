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
    id: 'info-collect',
    title: 'Information We Collect',
    body: (
      <>
        <p className="mb-4">
          We collect information you provide directly to us when you use the
          Website, including when you:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            Sign up for our newsletter, free downloadable resources, or updates
            (name, email address).
          </li>
          <li>
            Fill out contact, consultation, or waitlist forms (name, email,
            phone if provided, messages or questions you send us).
          </li>
          <li>
            Enroll in a program, coaching offering, or membership (billing
            information, service preferences, business information you share
            with us).
          </li>
          <li>
            Book a call or strategy session (scheduling information, preferred
            times, notes about your business).
          </li>
        </ul>
        <p className="mb-4">
          We also collect certain information automatically when you visit the
          Website, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Device and browser type, operating system, and screen size.</li>
          <li>
            IP address, approximate location (country, state, or city level),
            and referral source.
          </li>
          <li>
            Pages you visit, time spent on pages, and interaction data (such as
            links clicked).
          </li>
          <li>
            Cookies and similar tracking technologies (see &ldquo;Cookies and
            Tracking&rdquo; below).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-use',
    title: 'How We Use Your Information',
    body: (
      <>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Deliver the resources, content, and services you request.</li>
          <li>
            Communicate with you about your account, purchases, enrollment, and
            membership.
          </li>
          <li>
            Send marketing emails, newsletters, program announcements, and
            educational content (you can unsubscribe at any time).
          </li>
          <li>Process payments and manage subscriptions.</li>
          <li>
            Respond to inquiries, provide customer support, and follow up on
            consultations.
          </li>
          <li>
            Improve the Website, our programs, and our content based on how
            users interact with us.
          </li>
          <li>
            Comply with legal obligations and enforce our Terms and
            Conditions.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-share',
    title: 'How We Share Your Information',
    body: (
      <>
        <p className="mb-4">
          We do not sell your personal information. We share your information
          only as described below:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Service providers.</strong> We work with third-party
            vendors who help us operate the Website and our business,
            including email service providers, payment processors, hosting
            providers, CRM platforms, analytics providers, and scheduling
            tools.
          </li>
          <li>
            <strong>Legal requirements.</strong> We may disclose your
            information if required to do so by law, court order, or
            government request, or to protect our rights, property, or safety
            or that of others.
          </li>
          <li>
            <strong>Business transfers.</strong> If we are involved in a
            merger, acquisition, financing, or sale of assets, your information
            may be transferred as part of that transaction.
          </li>
          <li>
            <strong>With your consent.</strong> We may share your information
            in other ways if you give us explicit permission.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking',
    body: (
      <>
        <p className="mb-4">
          We use cookies and similar tracking technologies to operate the
          Website, remember your preferences, understand how visitors use the
          Website, and serve relevant content. Cookies are small data files
          stored on your device.
        </p>
        <p className="mb-4">Types of cookies we may use include:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Essential cookies</strong> required for the Website to
            function properly.
          </li>
          <li>
            <strong>Analytics cookies</strong> that help us understand how
            users interact with the Website.
          </li>
          <li>
            <strong>Marketing cookies</strong> that help us understand which
            channels bring visitors to the Website.
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling
          cookies may affect some Website functionality.
        </p>
      </>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-Party Services',
    body: (
      <>
        <p className="mb-4">
          The Website may use third-party services that collect information
          about your use of the Website. These services include, but are not
          limited to, email marketing platforms, payment processors (such as
          Stripe), website analytics, content delivery networks, and hosting
          providers.
        </p>
        <p>
          Each third-party service handles information according to its own
          privacy policy. We encourage you to review the privacy policies of
          any third-party services that appear on the Website before providing
          your information to them.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'Data Retention',
    body: (
      <p>
        We retain your information for as long as necessary to provide the
        services you request, comply with our legal obligations, resolve
        disputes, and enforce our agreements. When information is no longer
        needed, we will delete or anonymize it.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    body: (
      <>
        <p className="mb-4">
          Depending on where you live, you may have certain rights regarding
          your personal information, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            The right to access the personal information we hold about you.
          </li>
          <li>The right to correct inaccurate information.</li>
          <li>The right to request deletion of your information.</li>
          <li>
            The right to opt out of marketing emails (use the unsubscribe link
            in any email, or contact us directly).
          </li>
          <li>
            The right to object to or restrict certain processing of your
            information.
          </li>
        </ul>
        <p>
          To exercise any of these rights, email us at{' '}
          <a href={`mailto:${EMAIL}`} className="text-gold underline">
            {EMAIL}
          </a>
          . We will respond within the timeframes required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'california',
    title: 'California Residents',
    body: (
      <p>
        If you are a California resident, you have additional rights under the
        California Consumer Privacy Act (CCPA) and the California Privacy
        Rights Act (CPRA), including the right to know what personal
        information we collect about you, the right to request deletion of
        your personal information, the right to correct inaccurate personal
        information, and the right to opt out of the sale or sharing of your
        personal information. We do not sell personal information. To exercise
        your California privacy rights, contact us at{' '}
        <a href={`mailto:${EMAIL}`} className="text-gold underline">
          {EMAIL}
        </a>
        .
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children\u2019s Privacy',
    body: (
      <p>
        The Website is not directed to children under the age of 13, and we do
        not knowingly collect personal information from children under 13. If
        we learn that we have collected personal information from a child
        under 13, we will delete that information as quickly as possible. If
        you believe that a child under 13 may have provided us with personal
        information, please contact us at{' '}
        <a href={`mailto:${EMAIL}`} className="text-gold underline">
          {EMAIL}
        </a>
        .
      </p>
    ),
  },
  {
    id: 'international',
    title: 'International Users',
    body: (
      <p>
        The Website is operated in the United States. If you are accessing the
        Website from outside the United States, please be aware that your
        information may be transferred to, stored, and processed in the United
        States, where our servers and service providers are located. By using
        the Website, you consent to the transfer of your information to the
        United States.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        We take reasonable measures to protect the information we collect from
        loss, misuse, unauthorized access, disclosure, alteration, and
        destruction. However, no Internet transmission or electronic storage
        system is 100% secure, and we cannot guarantee the absolute security
        of your information.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time. The date of the
        most recent update will be shown at the top of this page. If we make
        material changes, we will notify you by posting the updated Privacy
        Policy on the Website or by sending an email when appropriate. Your
        continued use of the Website after changes have been posted
        constitutes your acceptance of the revised Privacy Policy.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    body: (
      <p>
        If you have any questions about this Privacy Policy or our privacy
        practices, please contact us at{' '}
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

export default function Privacy() {
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
        title="Privacy Policy — Concierge Nurse Business Society"
        description="How the Concierge Nurse Business Society collects, uses, and protects your information on conciergenursesociety.com."
        canonical="/privacy"
      />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-4">Legal</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-5">
            Privacy <span className="text-gold-gradient">Policy</span>
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
              {BUSINESS_NAME} (&ldquo;Company,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy.
              This Privacy Policy explains what information we collect through
              {' '}{DOMAIN} and any subdomains (the &ldquo;Website&rdquo;), how
              we use it, who we share it with, and the choices you have.
            </p>
            <p className="font-medium text-navy">
              By using the Website, you agree to the collection and use of
              information in accordance with this Privacy Policy. If you do
              not agree with this Privacy Policy, please do not use the
              Website.
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
            Questions about our privacy practices? Contact us at{' '}
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
            <Link to="/disclaimer" className="hover:text-gold transition-colors">
              Disclaimer
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
