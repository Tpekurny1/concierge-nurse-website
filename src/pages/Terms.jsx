import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';

const BUSINESS_NAME = 'Concierge Nurse Business Society';
const DOMAIN = 'conciergenursesociety.com';
const STATE = 'Colorado';
const COUNTY = 'El Paso County, Colorado';
const EMAIL = 'info@conciergenursesociety.com';
const LAST_UPDATED = 'April 20, 2026';

const sections = [
  {
    id: 'privacy-ref',
    title: 'Privacy Policy',
    body: (
      <p>
        Your use of the Website is also subject to our{' '}
        <Link to="/privacy" className="text-gold underline">
          Privacy Policy
        </Link>
        . Please review our Privacy Policy, which also governs the Website and
        informs users of our data collection practices. Your agreement to the
        Privacy Policy is hereby incorporated into these Terms.
      </p>
    ),
  },
  {
    id: 'disclaimer-ref',
    title: 'Disclaimer',
    body: (
      <p>
        Your use of the Website is also subject to our{' '}
        <Link to="/disclaimer" className="text-gold underline">
          Disclaimer
        </Link>
        . Please review our Disclaimer, which also governs the Website and
        informs users of various limitations regarding the information provided
        on the Website. Your agreement to the Disclaimer is hereby incorporated
        into these Terms.
      </p>
    ),
  },
  {
    id: 'no-minors',
    title: 'No Use By Minors',
    body: (
      <p>
        To access or use the Website, you must be 18 years of age or older and
        have the requisite power and authority to enter into these Terms.
        Children under the age of 18 are prohibited from using the Website.
      </p>
    ),
  },
  {
    id: 'lawful-purposes',
    title: 'Lawful Purposes',
    body: (
      <p>
        You may use the Website for lawful purposes only. You agree to be
        financially responsible for all purchases made by you or someone acting
        on your behalf through the Website. You agree to use the Website and to
        purchase services or products through the Website for legitimate,
        non-commercial purposes only. You shall not post or transmit through the
        Website any material that violates or infringes the rights of others, or
        that is threatening, abusive, defamatory, libelous, invasive of privacy
        or publicity rights, vulgar, obscene, profane, or otherwise
        objectionable, contains injurious formulas, recipes, or instructions,
        that encourages conduct that would constitute a criminal offense, give
        rise to civil liability, or otherwise violate any law.
      </p>
    ),
  },
  {
    id: 'gated-content',
    title: 'Use of Free Downloadable Content',
    body: (
      <>
        <p className="mb-4">
          We may make resources on this Website accessible to users in exchange
          for providing an e-mail address (&ldquo;Gated Content&rdquo;). We
          grant you a limited, personal, non-exclusive, non-transferable license
          to use the Gated Content for your own personal or internal business
          use. Except as otherwise provided, you acknowledge and agree that you
          have no right to modify, edit, copy, reproduce, create derivative
          works of, reverse engineer, alter, enhance or in any way exploit any
          of the Gated Content in any manner.
        </p>
        <p>
          You agree that you may only use the Gated Content for your personal or
          internal business use. You agree that you will not sell, redistribute,
          or create any derivative works based upon the Gated Content and you
          will not offer any competing products or services based upon any
          information contained in the Gated Content.
        </p>
      </>
    ),
  },
  {
    id: 'submissions',
    title: 'Material You Submit to the Website',
    body: (
      <>
        <p className="mb-4">
          By posting, uploading, submitting, inputting, providing, or otherwise
          making available any artwork, photos, written works, or other media,
          including feedback and suggestions, whether directly through our
          Website or a linked third-party form (collectively,
          &ldquo;Submissions&rdquo;), you grant us, our affiliated companies,
          and any necessary sub-licensees a worldwide, a nonexclusive,
          irrevocable license to use your Submission for promotional, business
          development, and marketing purposes including, without limitation, the
          right to: copy, distribute, transmit, publicly display, publicly
          perform, reproduce, edit, translate, and reformat your Submission; and
          to publish your name in connection with your Submission.
        </p>
        <p className="mb-4">
          We claim no intellectual property rights over your Submissions. You
          retain copyrights and any other rights you may rightfully hold in any
          Submissions that you submit through the Website.
        </p>
        <p className="mb-4">
          You shall not upload, post, submit, input, or otherwise make available
          on the Website any Submissions protected by copyright, trademark, or
          other proprietary right without the express written permission of the
          owner of the copyright, trademark, or other proprietary right, and the
          burden of determining that any Submissions are not so protected rests
          entirely with you. You shall be liable for any damage resulting from
          any infringement of copyrights, trademarks, or other proprietary
          rights, or any other harm resulting from such a Submission.
        </p>
        <p className="mb-4">
          By making a Submission to the Website, you represent or warrant that
          you own or otherwise control all the rights to your Submission,
          including the authority to use and distribute the Submission, and
          that the use or display of the Submission as contemplated in this
          section will not violate any laws, rules, regulations, or rights of
          third parties. You agree to hold us harmless from and against all
          claims, liabilities, and expenses arising out of any potential or
          actual copyright or trademark misappropriation or infringement claimed
          against you arising from your Submissions.
        </p>
        <p>
          You further grant us the right to use your Submission for the purpose
          of improving our Website, products, or services (and for any other
          purpose we deem necessary or desirable) without being obliged to pay
          you any compensation for our use of your Submission. We are under no
          obligation to post or use any Submission you may provide and may
          remove any Submission at any time at our sole discretion. If you send
          us unsolicited ideas, such ideas will be deemed non-confidential, and
          we will not be required to acknowledge their source.
        </p>
      </>
    ),
  },
  {
    id: 'ip',
    title: 'Our Intellectual Property',
    body: (
      <>
        <p className="mb-4">
          The Website contains intellectual property owned by us, including
          trademarks, copyrights, proprietary information, and other
          intellectual property. We reserve all rights in and to our common law
          and registered trademarks, service marks, copyrights, and other
          intellectual property rights, including but not limited to text,
          graphics, photographs, video, design, and packages, belonging to us
          or to our licensors (&ldquo;IP&rdquo;). You may not modify, publish,
          transmit, participate in the transfer or sale of, create derivative
          works from, distribute, display, reproduce or perform, or in any way
          exploit in any format whatsoever any of our IP in whole or in part,
          without our prior written consent. We reserve the right to
          immediately block your access to the Website and remove you from any
          service, without refund, if you are caught violating this
          intellectual property policy.
        </p>
        <p className="mb-4">
          You are granted a non-exclusive, non-transferable, revocable license
          to access and use the Website and the resources available for
          download from the Website (the &ldquo;Content&rdquo;) strictly in
          accordance with these Terms of Use.
        </p>
        <p className="mb-4">
          As a condition of your use of the Website, you warrant that you will
          not use the Content for any purpose that is unlawful or prohibited by
          these Terms. You may not use the Content in any manner that could
          damage, disable, overburden, or impair the Website or interfere with
          any other party&rsquo;s use and enjoyment of the Website. You may not
          obtain or attempt to obtain any materials or information through any
          means not intentionally made available or provided for through the
          Website.
        </p>
        <p className="mb-4">
          All content included as part of the Content, such as text, graphics,
          logos, images, as well as the compilation thereof, and any software
          used on the Website, is our property or the property of our licensors
          and is protected by copyright and other laws that protect intellectual
          property and proprietary rights. You agree to observe and abide by
          all copyright and other proprietary notices, legends or other
          restrictions contained in any such content.
        </p>
        <p className="mb-4">
          You will not modify, publish, transmit, reverse engineer, participate
          in the transfer or sale, create derivative works, or in any way
          exploit any of the Content, in whole or in part.
        </p>
        <p className="mb-4">
          The Content is not for resale. Your use of the Content does not
          entitle you to make any unauthorized use of any protected content.
          You agree not to delete or alter any proprietary rights or
          attribution notices in any Content. You will use protected content
          solely for your individual or internal business use and will make no
          other use of the Content without our express written permission or
          permission from the copyright owner. You agree that you do not
          acquire any ownership rights in any protected content. We do not
          grant you any licenses, express or implied, to our intellectual
          property or that of our licensors except as expressly authorized by
          these Terms.
        </p>
        <p>
          Our name, logo, slogan, and all related names, logos, product and
          service names, designs, and slogans are the trademarks of our Company
          or of our affiliates or licensors. You must not use such marks
          without our prior written permission. All other names, logos, product
          and service names, designs, and slogans on this Website are the
          trademarks of their respective owners.
        </p>
      </>
    ),
  },
  {
    id: 'changed-terms',
    title: 'Changed Terms',
    body: (
      <p>
        We may at any time amend these Terms, including our Privacy Policy and
        Disclaimers. The date of the last revision will be indicated by the
        &ldquo;Last updated&rdquo; date at the top of this page. Any such
        changes are effective immediately upon notice to you by us posting the
        new Terms on this Website. We reserve the right to update any portion
        of our Website, including these Terms, at any time. If you continue to
        use our Website after we have made revisions, your continued use
        constitutes consent to the revised Terms, Privacy Policy, and
        Disclaimers.
      </p>
    ),
  },
  {
    id: 'no-warranties',
    title: 'No Warranties',
    body: (
      <p>
        While we make every effort to ensure that the content on this Website
        is free from errors, we do not give any warranty or other assurance as
        to the accuracy, completeness, timeliness or fitness for any particular
        purpose of the content and materials on this site beyond reasonable
        efforts to maintain the site. To the maximum extent permitted by law,
        we provide our website and related information and services on an
        &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT ANY
        WARRANTIES, REPRESENTATIONS, OR GUARANTEES OF ANY KIND (WHETHER
        EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE) INCLUDING BUT NOT LIMITED
        TO WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR A
        PARTICULAR PURPOSE.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    body: (
      <>
        <p className="mb-4">
          YOU AGREE THAT UNDER NO CIRCUMSTANCES SHALL WE BE LIABLE FOR DIRECT,
          INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, EXEMPLARY, OR
          ANY OTHER DAMAGES ARISING OUT OF YOUR USE OF THE WEBSITE OR
          RESOURCES, PRODUCTS OR SERVICES AVAILABLE THROUGH THE WEBSITE.
        </p>
        <p className="mb-4">
          ADDITIONALLY, WE ARE NOT LIABLE FOR DAMAGES IN CONNECTION WITH (I)
          ANY FAILURE OF PERFORMANCE, ERROR, OMISSION, DENIAL OF SERVICE,
          ATTACK, INTERRUPTION, DELETION, DEFECT, DELAY IN OPERATION OR
          TRANSMISSION, COMPUTER VIRUS, OR LINE OR SYSTEM FAILURE; (II) LOSS OF
          REVENUE, ANTICIPATED PROFITS, BUSINESS, SAVINGS, GOODWILL OR DATA;
          AND (III) THIRD PARTY THEFT OF, DESTRUCTION OF, UNAUTHORIZED ACCESS
          TO, ALTERATION OF, OR USE OF YOUR INFORMATION OR PROPERTY, REGARDLESS
          OF OUR NEGLIGENCE, GROSS NEGLIGENCE, FAILURE OF AN ESSENTIAL PURPOSE
          AND WHETHER SUCH LIABILITY ARISES IN NEGLIGENCE, CONTRACT, TORT, OR
          ANY OTHER THEORY OF LEGAL LIABILITY, EVEN IF WE HAVE BEEN ADVISED OF
          THE POSSIBILITY OF OR COULD HAVE FORESEEN THE DAMAGES.
        </p>
        <p>
          IN THOSE STATES THAT DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
          LIABILITY FOR THE DAMAGES, OUR LIABILITY IS LIMITED TO THE FULLEST
          EXTENT PERMITTED BY LAW. IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU
          EXCEED THE TOTAL PURCHASE PRICE OF ANY PRODUCTS OR SERVICES YOU HAVE
          PURCHASED FROM US.
        </p>
      </>
    ),
  },
  {
    id: 'availability',
    title: 'No Guarantee of Availability',
    body: (
      <>
        <p className="mb-4">
          Your use of the Website and any associated services may sometimes be
          subject to interruption or delay. We reserve the right to withdraw or
          amend this Website and any service or material provided on the
          Website at our sole discretion without notice. Due to the nature of
          the Internet and electronic communications, we and our service
          providers do not make any warranty that our Website or any associated
          resources or services will be error-free, without interruption or
          delay, or free from defects in design. We will not be liable to you
          should our Website or the resources or services supplied through our
          Website become unavailable, interrupted or delayed for any reason.
          From time to time, we may restrict access to some parts of the
          Website, or the entire Website, to users, including registered users.
        </p>
        <p>
          Information provided on the Website and any resources provided on or
          available for download from the Website is subject to change. We make
          no representation or warranty that the information provided,
          regardless of its source, is accurate, complete, reliable, current,
          or error-free. We disclaim all liability for any inaccuracy, error,
          or incompleteness in the information provided.
        </p>
      </>
    ),
  },
  {
    id: 'malicious-code',
    title: 'Malicious Code',
    body: (
      <p>
        Although we endeavor to prevent the introduction of viruses or other
        malicious code (&ldquo;malicious code&rdquo;) to our Website, we do not
        guarantee or warrant that our Website, or any data available on the
        Website, does not contain malicious code. We will not be liable for
        any damages or harm attributable to malicious code. You are responsible
        for ensuring that the process you employ for accessing our Website does
        not expose your computer system to the risk of interference or damage
        from malicious code.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        The security of your contact information is of utmost importance to us.
        However, you acknowledge the risk of unauthorized access to, or
        alteration of, your data. We do not accept responsibility or liability
        of any nature for any losses you may sustain as a result of such
        unauthorized access or alteration. All information transmitted to or
        from you is transmitted at your own risk, and you assume all
        responsibility and risks arising in relation to your use of this
        Website and the internet. We do not accept responsibility for any
        interference or damage to your computer system that may arise in
        connection with your access to this Website or any outbound hyperlinks.
      </p>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-Party Resources',
    body: (
      <>
        <p className="mb-4">
          The Website may contain links to external websites that are not
          provided by, maintained by, or in any way affiliated with us. We do
          not guarantee and are not responsible for the availability, accuracy,
          relevance, timeliness, or completeness of these external websites or
          any information thereon. Links to such websites or resources do not
          imply any endorsement by or affiliation with us. You acknowledge sole
          responsibility for and assume all risk arising from your use of any
          such websites or resources.
        </p>
        <p>
          We may, from time to time, provide information from a third party in
          the form of a guest post or interview, in written, audio, video, or
          other medium. We do not control the information provided by such
          third-party guests, are not responsible for investigating the truth
          of any information provided, and cannot guarantee the veracity of any
          statements made by such guests.
        </p>
      </>
    ),
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    body: (
      <p>
        You shall indemnify and hold us harmless from and against any and all
        losses, damages, settlements, liabilities, costs, charges, assessments,
        and expenses, as well as third-party claims and causes of action,
        including, without limitation, attorney&rsquo;s fees, arising out of
        your breach of any of these Terms, your use of the Website, its
        content, and any product or service purchased from the Website, or
        your failure to maintain the confidentiality and/or security of your
        password or access rights to this Website and its resources. You shall
        provide us with such assistance, without charge, as we may request in
        connection with any such defense, including, without limitation,
        providing us with such information, documents, records, and reasonable
        access to you, as we deem necessary. You shall not settle any
        third-party claim or waive any defense without our prior written
        consent.
      </p>
    ),
  },
  {
    id: 'headings',
    title: 'Effect of Headings; Severability',
    body: (
      <p>
        The subject headings of the paragraphs and subparagraphs of these Terms
        are included for convenience only and shall not affect the
        construction or interpretation of any of its provisions. If any portion
        of these Terms is held to be unenforceable or contrary to law, such
        portion shall be construed in accordance with applicable law so as to
        best accomplish the objectives of the original provision to the
        fullest extent allowed by law, and the remainder of the provisions
        shall remain in full force and effect.
      </p>
    ),
  },
  {
    id: 'entire-agreement',
    title: 'Entire Agreement; Waiver',
    body: (
      <p>
        These Terms, together with the Privacy Policy and Disclaimers,
        constitute the entire agreement between us pertaining to the Website
        and supersedes all prior and contemporaneous agreements,
        representations, and understandings between us. Any waiver by us of a
        breach of or right under these Terms will not constitute a waiver of
        any other or subsequent breach or right. No waiver shall be binding
        unless executed in writing.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing Law; Jurisdiction',
    body: (
      <p>
        These Terms, including with the Privacy Policy and Disclaimers, shall
        be construed in accordance with, and governed by, the laws of the
        State of {STATE}, and the courts of {STATE} shall have jurisdiction to
        hear and determine any dispute arising in relation to these Terms. You
        agree that any proceeding relating to use of this site must be filed
        exclusively in the appropriate courts located in {COUNTY}, and you
        submit to the jurisdiction of those courts and waive any objection
        based on an inconvenient forum or other reasons.
      </p>
    ),
  },
  {
    id: 'adr',
    title: 'Alternative Dispute Resolution',
    body: (
      <p>
        The parties agree to attempt to resolve any dispute, claim, or
        controversy arising out of or relating to these Terms by mediation.
        The parties further agree that their respective good faith
        participation in mediation is a condition precedent to pursuing any
        other available legal or equitable remedy, including litigation,
        arbitration, or other dispute resolution procedures.
      </p>
    ),
  },
  {
    id: 'rights-reserved',
    title: 'All Rights Reserved',
    body: (
      <p>
        All rights not expressly granted in these Terms are reserved by us. If
        you do not see a usage scenario here that applies to your intended
        usage, contact us at{' '}
        <a href={`mailto:${EMAIL}`} className="text-gold underline">
          {EMAIL}
        </a>
        .
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Information',
    body: (
      <p>
        The owner of this website is {BUSINESS_NAME}. You may contact us by
        email at{' '}
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

export default function Terms() {
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
        title="Terms and Conditions — Concierge Nurse Business Society"
        description="The Terms and Conditions governing use of conciergenursesociety.com and services provided by the Concierge Nurse Business Society."
        canonical="/terms"
      />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-4">Legal</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-5">
            Terms and <span className="text-gold-gradient">Conditions</span> of Use
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-white/60 text-sm">
            Last Updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="space-y-4 text-charcoal text-[0.95rem] leading-relaxed">
            <p>
              The following Terms and Conditions of Use (&ldquo;Terms&rdquo;)
              are entered into by and between You and {BUSINESS_NAME}{' '}
              (&ldquo;Company,&rdquo; &ldquo;we&rdquo; or &ldquo;us&rdquo;).
            </p>
            <p>
              These Terms, together with our{' '}
              <Link to="/privacy" className="text-gold underline">
                Privacy Policy
              </Link>
              ,{' '}
              <Link to="/disclaimer" className="text-gold underline">
                Disclaimer
              </Link>
              , and any other documents expressly incorporated by reference,
              govern your use of the website {DOMAIN} and any subdomains
              (&ldquo;Website&rdquo;), including all materials, resources,
              information, and services on the Website, whether as a guest or
              registered user.
            </p>
            <p>
              Your access to and use of the Website is conditioned on your
              acceptance of and compliance with these Terms. These Terms apply
              to all visitors, users, customers, and others who access or use
              the Website.
            </p>
            <p className="font-medium text-navy">
              By accessing or using the Website you agree to be bound by these
              Terms, without modification, and acknowledge reading them. If you
              disagree with any part of the Terms, you may not access the
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
            Questions about these Terms? Contact us at{' '}
            <a href={`mailto:${EMAIL}`} className="text-gold underline">
              {EMAIL}
            </a>
            .
          </p>
          <div className="flex gap-6 justify-center text-xs uppercase tracking-widest font-body text-slate">
            <Link to="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
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
