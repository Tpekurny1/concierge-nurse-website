import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import AboutSection from '../components/AboutSection';
import FeaturedPrograms from '../components/FeaturedPrograms';
import TestimonialsSection from '../components/TestimonialsSection';
import AcceleratorSection from '../components/AcceleratorSection';
import ToolkitsSection from '../components/ToolkitsSection';
import StrategySection from '../components/StrategySection';
import ConsultingSection from '../components/ConsultingSection';
import CommunitySection from '../components/CommunitySection';
import FinalCTA from '../components/FinalCTA';

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Concierge Nurse Business Society",
    "alternateName": "CNBS",
    "description": "Business coaching and education helping registered nurses build, launch, and scale independent concierge nursing businesses",
    "url": "https://www.conciergenursesociety.com",
    "founder": {
      "@type": "Person",
      "name": "Tracy Pekurny",
      "jobTitle": "Founder & Business Strategist",
      "description": "Registered nurse, entrepreneur, and business strategist who helps nurses build concierge nursing businesses"
    },
    "email": "info@conciergenursesociety.com",
    "sameAs": []
  }
];

export default function Home() {
  return (
    <>
      <SEO
        title="Concierge Nurse Business Society - Build, Launch & Scale Your Nursing Business"
        description="Tracy Pekurny helps registered nurses build, launch, and scale independent private-pay concierge nursing businesses through education, strategic consulting, and hands-on coaching."
        canonical="/"
        type="website"
        schema={homeSchema}
      />
      <Hero />
      <TrustStrip />
      <AboutSection />
      <FeaturedPrograms />
      <TestimonialsSection />
      <AcceleratorSection />
      <ToolkitsSection />
      <StrategySection />
      <ConsultingSection />
      <CommunitySection />
      <FinalCTA />
    </>
  );
}
