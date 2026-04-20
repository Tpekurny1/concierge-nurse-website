import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Calendar, Star, Users, Play, Award, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { submitAcceleratorWaitlist } from '../lib/api';

const methodSteps = [
  { num: '01', title: 'Foundation', desc: 'Establish your business identity, niche, and positioning in the concierge nursing market.' },
  { num: '02', title: 'Structure', desc: 'Build the legal, financial, and operational framework your business needs to operate.' },
  { num: '03', title: 'Services', desc: 'Design and package your concierge nursing service offerings strategically.' },
  { num: '04', title: 'Systems', desc: 'Implement the tools, workflows, and processes that run your business efficiently.' },
  { num: '05', title: 'Clients', desc: 'Create your client acquisition strategy and marketing foundation.' },
  { num: '06', title: 'Launch', desc: 'Bring it all together and launch your concierge nursing business with confidence.' },
];

const included = [
  { icon: Play, label: 'Six weeks of live cohort sessions' },
  { icon: Users, label: 'Private cohort community access' },
  { icon: Clock, label: 'Full interactive on-demand replays' },
  { icon: Star, label: 'Complete Business Toolkit included' },
  { icon: Award, label: 'Lifetime alumni status' },
  { icon: Users, label: 'Invitation to the Concierge Nurse Business Society Membership' },
];

export default function Accelerator() {
  const [form, setForm] = useState({ full_name: '', email: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      await submitAcceleratorWaitlist(form);
      setStatus('success');
      setForm({ full_name: '', email: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  }

  const acceleratorSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "The Concierge Nurse Business Method Accelerator",
    "description": "A 6-week live cohort program where nurses build their entire concierge nursing business from the ground up using a proprietary six-step method.",
    "provider": { "@type": "Organization", "name": "Concierge Nurse Business Society" },
    "instructor": { "@type": "Person", "name": "Tracy Pekurny" },
    "courseMode": "online",
    "duration": "P6W",
    "educationalLevel": "Professional",
    "teaches": "How to build, launch, and operate a concierge nursing business"
  };

  return (
    <>
      <SEO
        title="Concierge Nurse Business Accelerator - 6-Week Live Cohort Program"
        description="The Concierge Nurse Business Method Accelerator is a 6-week live cohort where you build your entire concierge nursing business using a proprietary six-step method. Five-star rated by every graduate."
        canonical="/accelerator"
        type="article"
        schema={acceleratorSchema}
      />
      {/* Hero */}
      <section className="bg-navy pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="section-label mb-4">Flagship Program</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-5">
              The Concierge Nurse Business Method{' '}
              <span className="text-gold-gradient">Accelerator</span>
            </h1>
            <div className="gold-divider mb-6" />
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
              A six-week live cohort where you build your entire concierge
              nursing business from the ground up using a proprietary six-step
              method. This is not theory. This is real business building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#enroll" className="btn-primary flex items-center justify-center gap-2">
                Join the Waitlist <ArrowRight size={14} />
              </a>
              <a href="#method" className="btn-secondary flex items-center justify-center gap-2">
                See the Method
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-cream border-y border-cream-dark py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center gap-10">
          {[
            { val: '5-Star', label: 'Rated by Every Graduate' },
            { val: '6 Weeks', label: 'Live Cohort Experience' },
            { val: '6-Step', label: 'Proprietary Method' },
            { val: '100%', label: 'Business Toolkit Included' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-xl font-bold text-navy">{s.val}</p>
              <p className="text-slate text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Method */}
      <section id="method" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label mb-4">The Method</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-5">
              Six Steps. Six Weeks. One Complete Business.
            </h2>
            <div className="gold-divider mx-auto mb-6" />
            <p className="text-slate text-[0.95rem] leading-relaxed">
              Each week builds on the last. By the end of six weeks, you will
              have a fully structured, launch-ready concierge nursing business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodSteps.map((step) => (
              <div key={step.num} className="bg-cream/50 border border-cream-dark p-7">
                <span className="text-gold font-heading text-3xl font-bold">{step.num}</span>
                <h3 className="font-heading text-xl font-bold text-navy mt-3 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Included */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label mb-4">Everything You Get</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-5">
              What is Included
            </h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {included.map((item) => (
              <div key={item.label} className="flex items-start gap-4 bg-white p-6 border border-cream-dark">
                <item.icon size={20} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-charcoal text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not a course */}
      <section className="py-24 bg-navy">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">
            This Is Not a Course
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            There are no passive video modules to watch on your own. The
            Accelerator is a live, interactive cohort experience where you build
            your business in real time with expert guidance, peer accountability,
            and a proven framework. Every single graduate has rated this program
            five stars.
          </p>
          <div className="flex gap-1 justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={28} className="text-gold fill-gold" />
            ))}
          </div>
          <p className="text-white/40 text-sm">Rated five stars by every cohort graduate</p>
        </div>
      </section>

      {/* What happens after graduation — Society */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <p className="section-label mb-4">After You Graduate</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-5">
                Your Seat in the{' '}
                <span className="text-gold-gradient">Society</span> Is Waiting
              </h2>
              <div className="gold-divider mb-6" />
              <p className="text-charcoal text-[0.95rem] leading-relaxed mb-4">
                Graduation is not the end. It is the moment your invitation
                opens. The Concierge Nurse Business Society Membership is the
                only ongoing room for Accelerator graduates — where you stay
                connected, keep your momentum, and build alongside the nurses
                who speak your language.
              </p>
              <p className="text-charcoal text-[0.95rem] leading-relaxed mb-6">
                Founding member pricing is available in Week 6. That window
                does not stay open.
              </p>
              <Link
                to="/society"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                See the Society <ArrowRight size={14} />
              </Link>
            </div>
            <div className="md:col-span-2 bg-cream/50 border border-cream-dark p-8">
              <p className="section-label mb-3">Inside the Society</p>
              <ul className="space-y-3 text-slate text-sm">
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-gold flex-shrink-0 mt-0.5" /> Private community on Heartbeat</li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-gold flex-shrink-0 mt-0.5" /> Two monthly group coaching sessions</li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-gold flex-shrink-0 mt-0.5" /> Discounted HIPAA charting system</li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-gold flex-shrink-0 mt-0.5" /> Member directory &amp; cross-marketing</li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-gold flex-shrink-0 mt-0.5" /> Quarterly guest experts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment */}
      <section id="enroll" className="py-24 bg-cream">
        <div className="max-w-xl mx-auto px-6 lg:px-10 text-center">
          <div className="bg-white border border-cream-dark p-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar size={24} className="text-gold" />
              <span className="font-heading text-2xl font-bold text-navy">May 2026</span>
            </div>
            <p className="text-slate text-sm mb-6">Next Enrollment Window</p>
            <p className="text-charcoal text-[0.95rem] leading-relaxed mb-8">
              Spots are limited each cohort. Join the waitlist to be notified
              when enrollment opens and to receive early access and bonuses.
            </p>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 p-6">
                <p className="text-green-800 font-semibold mb-1">You are on the waitlist!</p>
                <p className="text-green-700 text-sm">We will notify you when enrollment opens.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 mb-6">
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={form.full_name}
                  onChange={update('full_name')}
                  className="w-full px-4 py-3 border border-cream-dark text-sm focus:outline-none focus:border-gold transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={form.email}
                  onChange={update('email')}
                  className="w-full px-4 py-3 border border-cream-dark text-sm focus:outline-none focus:border-gold transition-colors"
                />

                {status === 'error' && (
                  <p className="text-red-600 text-sm">{errorMsg}</p>
                )}

                <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
                  {status === 'submitting' ? 'Joining...' : 'Join the Waitlist'}
                </button>
              </form>
            )}

            <p className="text-slate text-xs">
              Already interested?{' '}
              <Link to="/strategy" className="text-gold underline">
                Book a Clarity Consult
              </Link>{' '}
              to discuss if the Accelerator is right for you.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
