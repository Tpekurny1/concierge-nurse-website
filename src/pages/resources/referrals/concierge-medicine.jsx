import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ResourceLayout from '../../../components/ResourceLayout';
import QuickAnswer from '../../../components/QuickAnswer';

const faqItems = [
  {
    question: "What is a concierge medicine practice?",
    answer: "A concierge medicine practice is a physician-run practice where patients pay an annual retainer or membership fee for enhanced access, longer appointments, and more personalized care. These physicians typically have smaller patient panels and provide a premium healthcare experience."
  },
  {
    question: "How do concierge medicine patients differ from typical patients?",
    answer: "Concierge medicine patients are already investing in premium healthcare and value personalized service. They tend to be health-conscious, have higher expectations for care quality, and are willing to pay for additional services that enhance their health experience."
  },
  {
    question: "Is there overlap between concierge nursing and concierge medicine?",
    answer: "Yes, and this is an advantage. Both models share the philosophy of personalized, unhurried care. Concierge physicians and concierge nurses naturally complement each other. The physician provides the medical oversight and prescribing, while the nurse provides hands-on care, education, and monitoring."
  },
  {
    question: "Do concierge physicians typically have in-house nurses?",
    answer: "Some do, but many operate lean offices with minimal staff. Even those with in-house nurses may not have the capacity for home visits, extended patient education, or after-hours support. This is where an external concierge nurse adds value."
  },
  {
    question: "How should I price services for concierge medicine patients?",
    answer: "Concierge medicine patients expect premium service and are generally willing to pay accordingly. Your pricing should reflect the level of personalization and expertise you bring. Consider retainer models or premium package pricing rather than basic hourly rates. Consult our pricing guide for frameworks."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Partner with Concierge Medicine Practices as a Concierge Nurse",
  "description": "Build referral relationships with concierge medicine physicians to serve their premium patients with personalized nursing care, health monitoring, and wellness services.",
  "author": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "publisher": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
  "datePublished": "2026-04-09",
  "dateModified": "2026-04-09"
};

const headings = [
  { id: 'why-concierge-medicine', text: 'Why Concierge Medicine Is a Natural Fit' },
  { id: 'what-these-practices-need', text: 'What These Practices Need from You' },
  { id: 'approaching-concierge-physicians', text: 'Approaching Concierge Physicians' },
  { id: 'services-for-premium-patients', text: 'Services for Premium Patients' },
  { id: 'pricing-and-positioning', text: 'Pricing and Positioning' },
  { id: 'building-the-partnership', text: 'Building the Partnership' },
  { id: 'faq', text: 'Frequently Asked Questions' },
];

const relatedResources = [
  {
    title: 'What Does a Concierge Nurse Do for Executive Health?',
    description: 'Learn about health services tailored to busy professionals and executives.',
    link: '/resources/services/concierge-nurse-executive-health',
    category: 'Client Services',
  },
  {
    title: 'How to Create a Wellness Visit Package',
    description: 'Design premium wellness visit packages that align with concierge medicine standards.',
    link: '/resources/templates/wellness-visit-package',
    category: 'Templates',
  },
  {
    title: 'How to Partner with Primary Care Physicians',
    description: 'Broaden your physician referral network beyond concierge medicine practices.',
    link: '/resources/referrals/partner-with-primary-care-physicians',
    category: 'Referral Sources',
  },
];

export default function ConciergeMedicine() {
  return (
    <ResourceLayout
      title="How to Partner with Concierge Medicine Practices as a Concierge Nurse"
      description="Build referral relationships with concierge medicine physicians to serve their premium patients with personalized nursing care, health monitoring, and wellness services."
      canonical="https://www.conciergenursesociety.com/resources/referrals/partner-with-concierge-medicine-practices"
      schema={articleSchema}
      category="Referral Sources"
      categorySlug="/resources"
      lastUpdated="April 2026"
      headings={headings}
      relatedResources={relatedResources}
      cta={{
        title: 'Serve Premium Healthcare Clients',
        description: 'Get the strategies and support to build a concierge nursing practice aligned with premium healthcare.',
        buttonText: 'Start Here',
        buttonLink: '/start-here',
      }}
      faqSchema={faqSchema}
    >
      <QuickAnswer>
        <p>
          Concierge medicine practices are among the most natural referral partners for concierge nurses because both models share the same philosophy: personalized, patient-centered care. Concierge physicians serve patients who already value premium healthcare, and these patients often need nursing services that complement but exceed what the physician alone can provide.
        </p>
      </QuickAnswer>

      <h2 id="why-concierge-medicine">Why Concierge Medicine Is a Natural Fit</h2>

      <p>
        Concierge physicians have built practices around personalized care for patients who already pay for premium healthcare. However, even these physicians have limits on their time and scope. A concierge nurse who shares their values becomes a natural extension of their practice. From a business perspective, these patients understand private-pay healthcare and have the means to invest in additional services.
      </p>

      <h2 id="what-these-practices-need">What These Practices Need from You</h2>

      <p>
        Concierge medicine practices need home-based health services, extended patient education, care coordination between the physician and specialists, after-hours nursing support, and service delivery that matches their premium standards. Your professionalism must align with their brand.
      </p>

      <h2 id="approaching-concierge-physicians">Approaching Concierge Physicians</h2>

      <p>
        Concierge physicians are entrepreneurs who evaluate services with a business-minded eye. Research their practice thoroughly, reach out directly, meet their premium standards in your presentation, and propose specific service packages with clear communication frameworks.
      </p>

      <div className="bg-cream border border-cream-dark p-6 mb-6">
        <p className="font-heading text-lg font-bold text-navy mb-2">Serve Premium Healthcare Clients</p>
        <p className="mb-4">
          The <Link to="/accelerator" className="text-gold font-semibold hover:underline">CNBS Accelerator</Link> includes strategies for building partnerships with premium physician practices and designing retainer-based service packages.
        </p>
      </div>

      <h2 id="services-for-premium-patients">Services for Premium Patients</h2>

      <p>
        Services include executive health monitoring, wellness visit packages, travel health support, post-surgical recovery, and chronic condition management. These should be positioned as premium offerings. See our <Link to="/resources/services/concierge-nurse-executive-health">executive health</Link> and <Link to="/resources/templates/wellness-visit-package">wellness visit package</Link> guides.
      </p>

      <h2 id="pricing-and-positioning">Pricing and Positioning</h2>

      <p>
        When serving concierge medicine patients, your pricing should reflect the premium nature of the service. Retainer models align with the concierge medicine payment model and create predictable revenue for your practice. Your branding and communication must match the premium standard their patients expect.
      </p>

      <h2 id="building-the-partnership">Building the Partnership</h2>

      <p>
        Concierge medicine partnerships are built on shared values and consistent excellence. A single concierge physician partnership can become a significant and stable source of referrals for your practice.
      </p>

      <section className="bg-cream border border-cream-dark p-8 mt-12">
        <h2 id="faq" className="font-heading text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index}>
              <h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </ResourceLayout>
  );
}
