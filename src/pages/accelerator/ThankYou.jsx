import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Mail, CalendarClock } from 'lucide-react';
import SEO from '../../components/SEO';
import StandaloneHeader from '../../components/StandaloneHeader';

export default function AcceleratorThankYou() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <>
      <SEO
        title="You're in — Method Accelerator Cohort"
        description="Your Method Accelerator enrollment is confirmed."
        canonical="/accelerator/thank-you"
      />
      <section className="bg-navy min-h-screen flex items-center justify-center px-6 pt-20 pb-16 relative">
        <StandaloneHeader />
        <div className="max-w-xl w-full text-center">
          <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle2 size={28} className="text-navy" />
          </div>
          <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-3">
            Enrollment Confirmed
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            You're in.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
            Your seat in the Method Accelerator Cohort is secured. Tracy will reach out personally with your kickoff info, cohort schedule, and pre-work.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 space-y-5 text-left">
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-semibold mb-1">Check your email</p>
                <p className="text-white/60 text-xs leading-relaxed">
                  A receipt is on its way from Stripe. Tracy will follow up within 24 hours with next steps.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarClock size={18} className="text-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-semibold mb-1">Hold the cohort dates</p>
                <p className="text-white/60 text-xs leading-relaxed">
                  Live sessions begin at the start of the cohort. Block the time now — you'll get calendar invites in your welcome email.
                </p>
              </div>
            </div>
          </div>

          {sessionId && (
            <p className="text-white/30 text-[0.65rem] tracking-[0.1em] uppercase font-mono mt-6 break-all">
              Ref: {sessionId}
            </p>
          )}

          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-gold text-xs uppercase tracking-[0.2em] no-underline transition-colors"
            >
              ← Back to the site
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
