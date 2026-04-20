import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { submitContactForm } from '../lib/api';

const INTEREST_OPTIONS = [
  { label: 'Clarity Consult', value: 'clarity_consult' },
  { label: 'Accelerator Cohort', value: 'accelerator_cohort' },
  { label: 'Toolkits & Resources', value: 'toolkits_resources' },
  { label: '1:1 Private Coaching', value: 'private_coaching' },
  { label: 'Business Consulting (Established Owners)', value: 'business_consulting' },
  { label: 'VIP Bridge Session', value: 'vip_bridge_session' },
  { label: 'General Question', value: 'general_question' },
  { label: 'Other', value: 'other' },
];

export default function Contact() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    interest: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      await submitContactForm(form);
      setStatus('success');
      setForm({ first_name: '', last_name: '', email: '', interest: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <SEO
        title="Contact & Book - Concierge Nurse Business Society"
        description="Book a session, ask a question, or explore how to work with Concierge Nurse Business Society. Contact Tracy Pekurny and her team."
        canonical="/contact"
      />
      {/* Hero */}
      <section className="bg-navy pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="section-label mb-4">Get In Touch</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
            Contact <span className="text-gold-gradient">& Book</span>
          </h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Ready to take the next step? Whether you want to book a session,
            ask a question, or explore how we can work together, we are here to
            help.
          </p>
        </div>
      </section>

      {/* Quick Links + Form */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-navy mb-2">
                Quick Actions
              </h2>
              <div className="gold-divider mb-4" />

              <Link to="/strategy" className="flex items-center gap-4 p-5 bg-cream border border-cream-dark hover:border-gold/40 transition-all no-underline group">
                <Calendar size={22} className="text-gold flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-navy font-semibold text-sm">Book a Clarity Consult</p>
                  <p className="text-slate text-xs">60-minute strategy session</p>
                </div>
                <ArrowRight size={14} className="text-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link to="/accelerator" className="flex items-center gap-4 p-5 bg-cream border border-cream-dark hover:border-gold/40 transition-all no-underline group">
                <MessageCircle size={22} className="text-gold flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-navy font-semibold text-sm">Join the Accelerator Waitlist</p>
                  <p className="text-slate text-xs">Next cohort: May 2026</p>
                </div>
                <ArrowRight size={14} className="text-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link to="/community" className="flex items-center gap-4 p-5 bg-cream border border-cream-dark hover:border-gold/40 transition-all no-underline group">
                <Mail size={22} className="text-gold flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-navy font-semibold text-sm">Join Free Community</p>
                  <p className="text-slate text-xs">Facebook or Heartbeat</p>
                </div>
                <ArrowRight size={14} className="text-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="bg-navy p-6 mt-6">
                <p className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-3">
                  Email
                </p>
                <a href="mailto:info@conciergenursesociety.com" className="text-white/70 text-sm no-underline hover:text-gold transition-colors">
                  info@conciergenursesociety.com
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-cream border border-cream-dark p-8 lg:p-10">
              <h2 className="font-heading text-2xl font-bold text-navy mb-2">
                Send a Message
              </h2>
              <p className="text-slate text-sm mb-8">
                Have a question or want to discuss how we can work together? Fill
                out the form and we will get back to you within 48 hours.
              </p>

              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 p-6 text-center">
                  <p className="text-green-800 font-semibold mb-1">Message sent!</p>
                  <p className="text-green-700 text-sm">We will get back to you within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/60 mb-2 block">
                        First Name
                      </label>
                      <input type="text" required value={form.first_name} onChange={update('first_name')} className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/60 mb-2 block">
                        Last Name
                      </label>
                      <input type="text" required value={form.last_name} onChange={update('last_name')} className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/60 mb-2 block">
                      Email
                    </label>
                    <input type="email" required value={form.email} onChange={update('email')} className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
                  </div>

                  <div>
                    <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/60 mb-2 block">
                      I am interested in
                    </label>
                    <select required value={form.interest} onChange={update('interest')} className="w-full px-4 py-3 border border-cream-dark bg-white text-sm text-charcoal focus:outline-none focus:border-gold transition-colors">
                      <option value="">Select an option</option>
                      {INTEREST_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/60 mb-2 block">
                      Message
                    </label>
                    <textarea rows={5} value={form.message} onChange={update('message')} className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors resize-none" />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-600 text-sm">{errorMsg}</p>
                  )}

                  <button type="submit" disabled={status === 'submitting'} className="btn-primary disabled:opacity-60">
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
