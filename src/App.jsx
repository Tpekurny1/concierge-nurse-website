import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import PageTracker from './components/PageTracker';

import Home from './pages/Home';
import About from './pages/About';
import StartHere from './pages/StartHere';
import Accelerator from './pages/Accelerator';
import Toolkits from './pages/Toolkits';
import Strategy from './pages/Strategy';
import Consulting from './pages/Consulting';
import Community from './pages/Community';
import Contact from './pages/Contact';
import Resources from './pages/Resources';

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminLeads = lazy(() => import('./pages/admin/Leads'));
const AdminLeadDetail = lazy(() => import('./pages/admin/LeadDetail'));
const AdminSegments = lazy(() => import('./pages/admin/Segments'));
const AdminCampaigns = lazy(() => import('./pages/admin/Campaigns'));
const AdminNewEmailCampaign = lazy(() => import('./pages/admin/NewEmailCampaign'));
const AdminNewSMSCampaign = lazy(() => import('./pages/admin/NewSMSCampaign'));
const AdminCampaignDetail = lazy(() => import('./pages/admin/CampaignDetail'));
const AdminPipelines = lazy(() => import('./pages/admin/Pipelines'));
const AdminImport = lazy(() => import('./pages/admin/Import'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

const L = (p) => lazy(() => import(`./pages/resources/${p}.jsx`));
const LN = (p) => lazy(() => import(`./pages/resources/niches/${p}.jsx`));
const LL = (p) => lazy(() => import(`./pages/resources/legal/${p}.jsx`));
const LO = (p) => lazy(() => import(`./pages/resources/operations/${p}.jsx`));
const LM = (p) => lazy(() => import(`./pages/resources/marketing/${p}.jsx`));
const LF = (p) => lazy(() => import(`./pages/resources/financial/${p}.jsx`));
const LC = (p) => lazy(() => import(`./pages/resources/career/${p}.jsx`));
const LCo = (p) => lazy(() => import(`./pages/resources/compare/${p}.jsx`));
const LG = (p) => lazy(() => import(`./pages/resources/glossary/${p}.jsx`));
const LS = (p) => lazy(() => import(`./pages/resources/states/${p}.jsx`));
const LCi = (p) => lazy(() => import(`./pages/resources/cities/${p}.jsx`));
const LR = (p) => lazy(() => import(`./pages/resources/referrals/${p}.jsx`));
const LSv = (p) => lazy(() => import(`./pages/resources/services/${p}.jsx`));
const LT = (p) => lazy(() => import(`./pages/resources/templates/${p}.jsx`));
const LGu = (p) => lazy(() => import(`./pages/resources/guides/${p}.jsx`));
const LMi = (p) => lazy(() => import(`./pages/resources/mindset/${p}.jsx`));
const LP = (p) => lazy(() => import(`./pages/resources/procedures/${p}.jsx`));
const LD = (p) => lazy(() => import(`./pages/resources/day-in-the-life/${p}.jsx`));
const LCe = (p) => lazy(() => import(`./pages/resources/certifications/${p}.jsx`));
const LPl = (p) => lazy(() => import(`./pages/resources/planning/${p}.jsx`));
const LB = (p) => lazy(() => import(`./pages/resources/best/${p}.jsx`));
const LSc = (p) => lazy(() => import(`./pages/resources/scaling/${p}.jsx`));
const LTr = (p) => lazy(() => import(`./pages/resources/trends/${p}.jsx`));
const LFo = (p) => lazy(() => import(`./pages/resources/for/${p}.jsx`));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Loading...</p>
      </div>
    </div>
  );
}

// Public layout — Navbar + Footer
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// All resource page routes
const resourceRoutes = [
  // Pillar Guides
  ['/resources/what-is-a-concierge-nurse', L('what-is-a-concierge-nurse')],
  ['/resources/how-to-start-a-concierge-nursing-business', L('how-to-start-a-concierge-nursing-business')],
  ['/resources/hipaa-compliance-for-concierge-nurses', L('hipaa-compliance-for-concierge-nurses')],
  ['/resources/concierge-nurse-pricing-guide', L('concierge-nurse-pricing-guide')],
  ['/resources/concierge-nursing-vs-private-duty-vs-home-health', L('concierge-nursing-vs-private-duty-vs-home-health')],
  ['/resources/how-to-get-concierge-nursing-clients', L('how-to-get-concierge-nursing-clients')],
  ['/resources/concierge-nursing-startup-costs', L('concierge-nursing-startup-costs')],
  ['/resources/concierge-nursing-niches', L('concierge-nursing-niches-guide')],
  ['/resources/concierge-nurse-business-plan', L('concierge-nurse-business-plan')],
  ['/resources/concierge-nursing-faq', L('concierge-nursing-faq')],
  // Hub Extras
  ['/resources/checklist', L('checklist')],
  ['/resources/timeline', L('timeline')],
  ['/resources/glossary', L('glossary-index')],
  ['/resources/reading-list', L('reading-list')],
  // Niches
  ['/resources/niches/post-op-recovery-nursing-business', LN('post-op-recovery')],
  ['/resources/niches/postpartum-concierge-nursing-business', LN('postpartum')],
  ['/resources/niches/geriatric-concierge-nursing-business', LN('geriatric')],
  ['/resources/niches/executive-health-concierge-nursing', LN('executive-health')],
  ['/resources/niches/pediatric-special-needs-concierge-nursing', LN('pediatric-special-needs')],
  ['/resources/niches/travel-medicine-concierge-nursing', LN('travel-medicine')],
  ['/resources/niches/iv-therapy-nursing-business', LN('iv-therapy')],
  ['/resources/niches/chronic-disease-management-nursing', LN('chronic-disease')],
  ['/resources/niches/medication-management-concierge-nursing', LN('medication-management')],
  ['/resources/niches/luxury-vip-concierge-nursing', LN('luxury-vip')],
  ['/resources/niches/wellness-preventive-care-nursing', LN('wellness-preventive')],
  ['/resources/niches/post-discharge-transitional-care-nursing', LN('post-discharge')],
  // Legal
  ['/resources/legal/nursing-business-llc-vs-pllc', LL('llc-vs-pllc')],
  ['/resources/legal/concierge-nurse-insurance-requirements', LL('insurance-requirements')],
  ['/resources/legal/concierge-nurse-scope-of-practice', LL('scope-of-practice')],
  ['/resources/legal/concierge-nurse-collaborative-agreement', LL('collaborative-agreements')],
  ['/resources/legal/concierge-nursing-business-licenses', LL('business-licenses')],
  ['/resources/legal/hipaa-cash-pay-nursing-practice', LL('hipaa-cash-pay')],
  ['/resources/legal/concierge-nursing-client-contracts', LL('client-contracts')],
  ['/resources/legal/telehealth-virtual-concierge-nursing', LL('telehealth')],
  // Operations
  ['/resources/operations/concierge-nursing-home-office-setup', LO('home-office-setup')],
  ['/resources/operations/best-ehr-emr-concierge-nurses', LO('ehr-emr-systems')],
  ['/resources/operations/concierge-nursing-service-packages', LO('service-packages')],
  ['/resources/operations/concierge-nurse-after-hours-calls', LO('after-hours')],
  ['/resources/operations/concierge-nursing-client-onboarding', LO('client-onboarding')],
  ['/resources/operations/concierge-nursing-sops', LO('sops')],
  ['/resources/operations/concierge-nursing-tools-software', LO('tools-software')],
  ['/resources/operations/concierge-nurse-scheduling', LO('scheduling')],
  ['/resources/operations/when-to-hire-concierge-nursing', LO('hiring')],
  ['/resources/operations/concierge-nurse-fire-client', LO('firing-clients')],
  // Marketing
  ['/resources/marketing/concierge-nursing-business-marketing', LM('marketing-guide')],
  ['/resources/marketing/physician-referral-relationships', LM('physician-referrals')],
  ['/resources/marketing/concierge-nurse-social-media', LM('social-media')],
  ['/resources/marketing/concierge-nursing-website', LM('build-website')],
  ['/resources/marketing/concierge-nurse-google-business-profile', LM('google-business')],
  ['/resources/marketing/concierge-nurse-plastic-surgeon-referrals', LM('plastic-surgeon-referrals')],
  ['/resources/marketing/concierge-nurse-networking', LM('networking')],
  ['/resources/marketing/how-to-explain-concierge-nursing', LM('explain-concierge-nursing')],
  ['/resources/marketing/concierge-nurse-email-marketing', LM('email-marketing')],
  ['/resources/marketing/concierge-nurse-local-media', LM('local-media')],
  // Financial
  ['/resources/financial/concierge-nurse-income', LF('income-breakdown')],
  ['/resources/financial/concierge-nurse-rates', LF('set-rates')],
  ['/resources/financial/concierge-nursing-revenue-models', LF('revenue-models')],
  ['/resources/financial/concierge-nursing-first-year-finances', LF('first-year-finances')],
  ['/resources/financial/concierge-nurse-tax-guide', LF('tax-guide')],
  ['/resources/financial/concierge-nursing-profitability', LF('profitability')],
  ['/resources/financial/replace-hospital-income-concierge-nursing', LF('replace-hospital-income')],
  // Career
  ['/resources/career/leave-bedside-nursing-start-business', LC('leave-bedside')],
  ['/resources/career/concierge-nursing-part-time', LC('part-time')],
  ['/resources/career/nurse-burnout-to-business-owner', LC('burnout-to-business')],
  ['/resources/career/best-nursing-specialties-concierge-nursing', LC('best-specialties')],
  ['/resources/career/concierge-nursing-rn-vs-np', LC('rn-vs-np')],
  ['/resources/career/icu-nurse-to-concierge-nurse', LC('icu-to-concierge')],
  ['/resources/career/er-nurse-to-concierge-nurse', LC('er-to-concierge')],
  ['/resources/career/med-surg-nurse-to-concierge-nurse', LC('medsurg-to-concierge')],
  // Compare
  ['/resources/compare/concierge-nursing-vs-nurse-coaching', LCo('vs-nurse-coaching')],
  ['/resources/compare/concierge-nursing-vs-travel-nursing', LCo('vs-travel-nursing')],
  ['/resources/compare/concierge-nursing-vs-agency-per-diem', LCo('vs-agency')],
  ['/resources/compare/start-nursing-business-vs-franchise', LCo('vs-franchise')],
  ['/resources/compare/solo-concierge-nurse-vs-multi-nurse-practice', LCo('solo-vs-multi')],
  ['/resources/compare/cash-pay-nursing-vs-insurance-based', LCo('cash-pay-vs-insurance')],
  ['/resources/compare/concierge-nursing-vs-nursing-consulting', LCo('vs-consulting')],
  // Glossary
  ['/resources/glossary/what-is-a-cash-pay-nursing-practice', LG('cash-pay-practice')],
  ['/resources/glossary/what-is-a-nurse-entrepreneur', LG('nurse-entrepreneur')],
  ['/resources/glossary/what-is-private-pay-nursing', LG('private-pay-nursing')],
  ['/resources/glossary/what-is-a-nursing-pllc', LG('nursing-pllc')],
  ['/resources/glossary/concierge-medicine-vs-concierge-nursing', LG('concierge-medicine-vs-nursing')],
  ['/resources/glossary/what-is-a-nurse-owned-business', LG('nurse-owned-business')],
  ['/resources/glossary/what-is-scope-of-practice-nurse-business', LG('scope-of-practice-definition')],
  ['/resources/glossary/what-is-a-concierge-nurse-business-coach', LG('concierge-nurse-business-coach')],
  // States
  ...['alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','new-hampshire','new-jersey','new-mexico','new-york','north-carolina','north-dakota','ohio','oklahoma','oregon','pennsylvania','rhode-island','south-carolina','south-dakota','tennessee','texas','utah','vermont','virginia','washington','west-virginia','wisconsin','wyoming'].map(s => [`/resources/states/concierge-nursing-business-in-${s}`, LS(s)]),
  // Cities
  ...['houston','dallas','austin','san-antonio','miami','orlando','tampa','jacksonville','atlanta','charlotte','raleigh','nashville','memphis','chicago','phoenix','scottsdale','denver','seattle','portland','los-angeles','san-diego','san-francisco','sacramento','las-vegas','new-york-city','boston','philadelphia','washington-dc','baltimore','detroit','minneapolis','st-louis','kansas-city','indianapolis','columbus','cleveland','cincinnati','pittsburgh','new-orleans','birmingham','louisville','richmond','san-jose','honolulu','anchorage','boise','salt-lake-city','albuquerque','oklahoma-city','milwaukee'].map(c => [`/resources/cities/concierge-nursing-business-in-${c}`, LCi(c)]),
  // Referrals
  ['/resources/referrals/partner-with-plastic-surgeons', LR('plastic-surgeons')],
  ['/resources/referrals/partner-with-obgyns', LR('obgyns')],
  ['/resources/referrals/partner-with-geriatricians', LR('geriatricians')],
  ['/resources/referrals/partner-with-orthopedic-surgeons', LR('orthopedic-surgeons')],
  ['/resources/referrals/partner-with-dermatologists', LR('dermatologists')],
  ['/resources/referrals/partner-with-primary-care-physicians', LR('primary-care')],
  ['/resources/referrals/partner-with-pediatricians', LR('pediatricians')],
  ['/resources/referrals/partner-with-home-health-agencies', LR('home-health-agencies')],
  ['/resources/referrals/partner-with-assisted-living-facilities', LR('assisted-living')],
  ['/resources/referrals/partner-with-concierge-medicine-practices', LR('concierge-medicine')],
  // Services
  ['/resources/services/concierge-nurse-after-facelift', LSv('after-facelift')],
  ['/resources/services/concierge-nurse-postpartum-care', LSv('postpartum-mothers')],
  ['/resources/services/concierge-nurse-elderly-parents', LSv('elderly-parents')],
  ['/resources/services/concierge-nurse-after-bbl', LSv('after-bbl')],
  ['/resources/services/concierge-nurse-after-tummy-tuck', LSv('after-tummy-tuck')],
  ['/resources/services/concierge-nurse-chronic-illness', LSv('chronic-illness')],
  ['/resources/services/concierge-nurse-iv-therapy', LSv('iv-therapy-home')],
  ['/resources/services/concierge-nurse-medication-management', LSv('medication-management')],
  ['/resources/services/concierge-nurse-after-hospital-discharge', LSv('after-hospital')],
  ['/resources/services/concierge-nurse-executive-health', LSv('executive-health')],
  ['/resources/services/concierge-nurse-pediatric-special-needs', LSv('pediatric-special-needs')],
  ['/resources/services/concierge-nurse-travel-health', LSv('travel-health')],
  // Templates
  ['/resources/templates/post-op-recovery-care-package', LT('post-op-care-package')],
  ['/resources/templates/postpartum-care-package', LT('postpartum-care-package')],
  ['/resources/templates/wellness-visit-package', LT('wellness-visit-package')],
  ['/resources/templates/iv-therapy-service-menu', LT('iv-therapy-menu')],
  ['/resources/templates/chronic-care-management-plan', LT('chronic-care-plan')],
  ['/resources/templates/concierge-nursing-service-agreement', LT('service-agreement')],
  ['/resources/templates/concierge-nursing-welcome-packet', LT('welcome-packet')],
  ['/resources/templates/concierge-nursing-intake-form', LT('intake-form')],
  ['/resources/templates/discharge-follow-up-protocol', LT('discharge-followup')],
  ['/resources/templates/client-emergency-action-plan', LT('emergency-plan')],
  // Guides
  ['/resources/guides/concierge-nurse-npi-number', LGu('npi-number')],
  ['/resources/guides/nursing-business-ein', LGu('ein')],
  ['/resources/guides/nursing-business-bank-account', LGu('bank-account')],
  ['/resources/guides/hipaa-compliant-email-nursing', LGu('hipaa-email')],
  ['/resources/guides/hipaa-compliant-phone-nursing', LGu('hipaa-phone')],
  ['/resources/guides/concierge-nurse-accept-payments', LGu('accept-payments')],
  ['/resources/guides/concierge-nursing-brand-logo', LGu('branding')],
  ['/resources/guides/concierge-nurse-liability-insurance', LGu('liability-insurance')],
  ['/resources/guides/concierge-nursing-elevator-pitch', LGu('elevator-pitch')],
  ['/resources/guides/concierge-nurse-social-media-photography', LGu('photography')],
  ['/resources/guides/concierge-nurse-testimonials', LGu('testimonials')],
  ['/resources/guides/concierge-nurse-client-boundaries', LGu('boundaries')],
  ['/resources/guides/concierge-nurse-medical-emergency', LGu('medical-emergency')],
  ['/resources/guides/concierge-nurse-client-documentation', LGu('documentation')],
  ['/resources/guides/concierge-nurse-cancellation-policy', LGu('cancellation-policy')],
  // Mindset
  ['/resources/mindset/is-concierge-nursing-saturated', LMi('is-it-saturated')],
  ['/resources/mindset/can-concierge-nurses-make-six-figures', LMi('six-figures')],
  ['/resources/mindset/too-old-to-start-nursing-business', LMi('too-old')],
  ['/resources/mindset/start-nursing-business-no-experience', LMi('no-business-experience')],
  ['/resources/mindset/nurse-entrepreneur-imposter-syndrome', LMi('imposter-syndrome')],
  ['/resources/mindset/is-it-selfish-to-leave-bedside-nursing', LMi('leaving-bedside')],
  ['/resources/mindset/what-if-nursing-business-fails', LMi('fear-of-failure')],
  ['/resources/mindset/family-support-nursing-business', LMi('family-support')],
  // Procedures
  ['/resources/procedures/concierge-nursing-after-rhinoplasty', LP('rhinoplasty')],
  ['/resources/procedures/concierge-nursing-after-breast-augmentation', LP('breast-augmentation')],
  ['/resources/procedures/concierge-nursing-after-liposuction', LP('liposuction')],
  ['/resources/procedures/concierge-nursing-after-mommy-makeover', LP('mommy-makeover')],
  ['/resources/procedures/concierge-nursing-after-knee-replacement', LP('knee-replacement')],
  ['/resources/procedures/concierge-nursing-after-hip-replacement', LP('hip-replacement')],
  ['/resources/procedures/concierge-nursing-after-bariatric-surgery', LP('bariatric-surgery')],
  ['/resources/procedures/concierge-nursing-after-c-section', LP('c-section')],
  ['/resources/procedures/concierge-nursing-after-cosmetic-eye-surgery', LP('cosmetic-eye-surgery')],
  ['/resources/procedures/concierge-nursing-after-hair-transplant', LP('hair-transplant')],
  ['/resources/procedures/concierge-nursing-after-dental-surgery', LP('dental-surgery')],
  ['/resources/procedures/concierge-nursing-after-spinal-surgery', LP('spinal-surgery')],
  // Day in the Life
  ['/resources/day-in-the-life/post-op-recovery-concierge-nurse', LD('post-op-nurse')],
  ['/resources/day-in-the-life/postpartum-concierge-nurse', LD('postpartum-nurse')],
  ['/resources/day-in-the-life/geriatric-concierge-nurse', LD('geriatric-nurse')],
  ['/resources/day-in-the-life/luxury-vip-concierge-nurse', LD('luxury-vip-nurse')],
  ['/resources/day-in-the-life/part-time-concierge-nurse', LD('part-time-nurse')],
  ['/resources/day-in-the-life/multi-nurse-practice-owner', LD('practice-owner')],
  // Certifications
  ['/resources/certifications/concierge-nurse-certifications', LCe('certifications-overview')],
  ['/resources/certifications/concierge-nursing-certification-worth-it', LCe('is-certification-worth-it')],
  ['/resources/certifications/concierge-nurse-bls-acls', LCe('bls-acls')],
  ['/resources/certifications/concierge-nurse-iv-certification', LCe('iv-certification')],
  ['/resources/certifications/concierge-nurse-wound-care-certification', LCe('wound-care')],
  ['/resources/certifications/concierge-nurse-msn-dnp', LCe('msn-dnp')],
  // Planning
  ['/resources/planning/concierge-nursing-q1-planning', LPl('q1-planning')],
  ['/resources/planning/concierge-nursing-tax-season', LPl('tax-season')],
  ['/resources/planning/concierge-nurse-vacation-policy', LPl('summer-vacation')],
  ['/resources/planning/concierge-nurse-holiday-season', LPl('holiday-season')],
  ['/resources/planning/concierge-nursing-year-end-review', LPl('year-end-review')],
  // Best Of
  ['/resources/best/books-for-nurse-entrepreneurs', LB('books')],
  ['/resources/best/podcasts-for-nurse-entrepreneurs', LB('podcasts')],
  ['/resources/best/conferences-for-concierge-nurses', LB('conferences')],
  ['/resources/best/facebook-groups-nurse-entrepreneurs', LB('facebook-groups')],
  ['/resources/best/medical-bags-supplies-concierge-nurses', LB('medical-bags')],
  ['/resources/best/accounting-software-nursing-business', LB('accounting-software')],
  ['/resources/best/crm-software-concierge-nurses', LB('crm-software')],
  ['/resources/best/scheduling-software-concierge-nurses', LB('scheduling-software')],
  // Scaling
  ['/resources/scaling/solo-nurse-to-nursing-agency', LSc('solo-to-agency')],
  ['/resources/scaling/hire-first-subcontractor-nursing', LSc('first-subcontractor')],
  ['/resources/scaling/concierge-nursing-training-manual', LSc('training-manual')],
  ['/resources/scaling/open-second-location-nursing-business', LSc('second-location')],
  ['/resources/scaling/add-virtual-services-concierge-nursing', LSc('virtual-services')],
  ['/resources/scaling/passive-income-concierge-nurse', LSc('passive-income')],
  ['/resources/scaling/sell-exit-concierge-nursing-business', LSc('sell-exit')],
  // Trends
  ['/resources/trends/future-of-concierge-nursing', LTr('future-of-concierge-nursing')],
  ['/resources/trends/concierge-nursing-fastest-growing-niche', LTr('fastest-growing-niche')],
  ['/resources/trends/nursing-shortage-concierge-nursing-opportunity', LTr('nursing-shortage-opportunity')],
  ['/resources/trends/patients-choosing-private-pay-nursing', LTr('patients-choosing-private-pay')],
  ['/resources/trends/rise-of-cash-pay-healthcare', LTr('cash-pay-healthcare-rise')],
  ['/resources/trends/ai-and-concierge-nursing', LTr('ai-concierge-nursing')],
  ['/resources/trends/nurses-leaving-hospitals-entrepreneurship', LTr('nurses-leaving-hospitals')],
  ['/resources/trends/concierge-nursing-vs-traditional-employment', LTr('business-model-comparison')],
  // For You
  ['/resources/for/concierge-nursing-military-spouses', LFo('military-spouses')],
  ['/resources/for/concierge-nursing-new-grad-nurses', LFo('new-grads')],
  ['/resources/for/concierge-nursing-nurse-practitioners', LFo('nurse-practitioners')],
  ['/resources/for/concierge-nursing-rural-nurses', LFo('rural-nurses')],
  ['/resources/for/concierge-nursing-nurses-over-50', LFo('nurses-over-50')],
  ['/resources/for/concierge-nursing-male-nurses', LFo('male-nurses')],
  ['/resources/for/concierge-nursing-international-nurses', LFo('international-nurses')],
  ['/resources/for/concierge-nursing-nurses-with-disabilities', LFo('nurses-with-disabilities')],
];

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <PageTracker />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public site — with Navbar + Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/start-here" element={<StartHere />} />
            <Route path="/accelerator" element={<Accelerator />} />
            <Route path="/toolkits" element={<Toolkits />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/consulting" element={<Consulting />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            {resourceRoutes.map(([path, Component]) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>

          {/* Admin — no Navbar/Footer, own layout */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="leads/:id" element={<AdminLeadDetail />} />
            <Route path="pipelines" element={<AdminPipelines />} />
            <Route path="segments" element={<AdminSegments />} />
            <Route path="campaigns" element={<AdminCampaigns />} />
            <Route path="campaigns/email/new" element={<AdminNewEmailCampaign />} />
            <Route path="campaigns/sms/new" element={<AdminNewSMSCampaign />} />
            <Route path="campaigns/:id" element={<AdminCampaignDetail />} />
            <Route path="import" element={<AdminImport />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
