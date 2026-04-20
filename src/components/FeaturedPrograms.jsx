import { Link } from 'react-router-dom';

export default function FeaturedPrograms() {
  return (
    <section className="w-full flex flex-col bg-navy pt-8 pb-32">
      <div className="max-w-[1600px] w-full mx-auto p-4 lg:p-8 flex flex-col gap-4 lg:gap-8">

        {/* Top Split Row */}
        <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-8 h-auto lg:h-[650px]">

          {/* Left Block - The Accelerator (typography-forward, no photo) */}
          <div className="flex-1 relative bg-navy flex flex-col items-center justify-center p-12 min-h-[500px] max-md:hidden border border-gold/20">
            {/* Gold corner ornaments */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/50" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/50" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/50" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/50" />

            {/* Faint oversized number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-heading text-[16rem] lg:text-[22rem] text-white/[0.04] leading-none tracking-tighter">
                06
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
              <p className="font-body text-gold text-[0.6rem] tracking-[0.3em] uppercase mb-4">
                Flagship · Six Weeks · Live
              </p>
              <h3 className="avery-title text-4xl lg:text-5xl text-white mb-5 uppercase tracking-wider drop-shadow-md">
                THE ACCELERATOR
              </h3>
              <div className="gold-divider mx-auto mb-6" />
              <p className="font-body text-white/80 text-xs lg:text-[0.85rem] leading-relaxed mb-10 drop-shadow">
                A six-week live cohort where you build your entire concierge nursing business from the ground up. Not a course. Not theory. Real business, built step by step.
              </p>
              <Link to="/accelerator" className="btn-white text-white border-white bg-transparent hover:bg-white hover:text-navy hover:border-white text-[0.65rem] px-8 tracking-[0.2em]">
                JOIN THE WAITLIST
              </Link>
            </div>
          </div>

          {/* Mobile — Accelerator (typography-forward, no photo) */}
          <div className="md:hidden relative min-h-[75vh] flex flex-col bg-navy border border-gold/20">
            {/* Gold corner ornaments */}
            <div className="absolute top-4 left-4 w-7 h-7 border-t border-l border-gold/50" />
            <div className="absolute top-4 right-4 w-7 h-7 border-t border-r border-gold/50" />
            <div className="absolute bottom-4 left-4 w-7 h-7 border-b border-l border-gold/50" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b border-r border-gold/50" />

            {/* Faint oversized number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-heading text-[14rem] text-white/[0.04] leading-none tracking-tighter">
                06
              </span>
            </div>

            <div className="relative z-10 flex-grow flex flex-col justify-end px-6 pb-10">
              <p className="font-body text-gold text-[0.6rem] tracking-[0.25em] uppercase mb-4">
                Flagship Cohort
              </p>
              <h3 className="font-heading font-normal text-[2.25rem] text-white mb-4 leading-[1.05] tracking-tight uppercase">
                THE<br/>ACCELERATOR
              </h3>
              <div className="gold-divider mb-5" />
              <p className="font-body text-white/75 text-[0.8rem] leading-relaxed mb-7 max-w-[280px]">
                A six-week live cohort where you build your entire concierge nursing business from the ground up. Not a course. Not theory.
              </p>
              <Link to="/accelerator" className="btn-white text-white border-white bg-transparent hover:bg-white hover:text-navy hover:border-white text-center py-3.5 text-[0.65rem] tracking-[0.2em] uppercase">
                JOIN THE WAITLIST
              </Link>
            </div>
          </div>

          {/* Right Block - Clarity Consult */}
          <div
            className="flex-1 relative bg-cover bg-center flex items-center justify-center p-8 min-h-[500px] max-md:hidden"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200")'}}
          >
             <div className="absolute inset-0 bg-white/10 z-0 mix-blend-overlay"></div>
             <div className="relative z-10 bg-cream p-12 lg:p-16 w-full max-w-md flex flex-col items-center text-center shadow-2xl">
                <h3 className="avery-title text-3xl lg:text-[2.5rem] text-navy mb-6 tracking-normal">
                  CLARITY CONSULT
                </h3>
                <p className="font-body text-navy/70 text-xs lg:text-[0.8rem] leading-relaxed mb-10 pb-2 max-w-[280px]">
                  A 60-minute private strategy session to expose exactly where you are, what is holding you back, and what your next move should be. Walk away with a personalized 30-day action plan.
                </p>
                <Link to="/strategy" className="btn-secondary border-navy text-navy hover:bg-navy hover:text-white uppercase tracking-widest text-[0.65rem] px-8 py-[0.6rem]">
                  BOOK YOUR SESSION
                </Link>
             </div>
          </div>

          {/* Mobile — Clarity Consult (hero style) */}
          <div className="md:hidden relative min-h-[75vh] flex flex-col">
            <div
              className="absolute inset-0 bg-cover"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200")', backgroundPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
            <div className="relative z-10 flex-grow flex flex-col justify-end px-6 pb-10">
              <p className="font-body text-gold text-[0.6rem] tracking-[0.25em] uppercase mb-4">
                Strategy Session
              </p>
              <h3 className="font-heading font-normal text-[2.25rem] text-white mb-4 leading-[1.05] tracking-tight uppercase">
                CLARITY<br/>CONSULT
              </h3>
              <p className="font-body text-white/75 text-[0.8rem] leading-relaxed mb-7 max-w-[280px]">
                A 60-minute private strategy session to expose exactly where you are, what is holding you back, and what your next move should be.
              </p>
              <Link to="/strategy" className="btn-white text-white border-white bg-transparent hover:bg-white hover:text-navy hover:border-white text-center py-3.5 text-[0.65rem] tracking-[0.2em] uppercase">
                BOOK YOUR SESSION
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Full-Width Block - Business Diagnostics */}
        {/* Desktop */}
        <div
          className="w-full relative h-[450px] lg:h-[650px] bg-navy flex-col items-center justify-center p-8 hidden md:flex"
        >
           <div className="absolute inset-0 bg-navy z-0"></div>
           <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mt-auto lg:mt-32 pb-12 lg:pb-0">
             <h2 className="avery-title text-6xl md:text-[5.5rem] lg:text-[7.5rem] text-white tracking-widest leading-[0.9] mb-6 drop-shadow-xl select-none">
               CONSULTING
             </h2>
             <p className="avery-italic text-white/90 text-sm lg:text-md leading-relaxed mb-12 max-w-md font-light px-4 drop-shadow-md">
               For established concierge nurse business owners doing six to seven figures who have hit a ceiling. Deep diagnostics. Strategic implementation. Real results.
             </p>
             <Link to="/consulting" className="btn-white text-white border-white bg-transparent hover:bg-white hover:text-navy hover:border-white text-[0.65rem] px-8 tracking-widest">
               INQUIRE NOW
             </Link>
           </div>
        </div>

        {/* Mobile — Consulting (hero style, navy bg) */}
        <div className="md:hidden relative min-h-[60vh] flex flex-col bg-navy-light">
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy-light to-navy-light/80" />
          <div className="relative z-10 flex-grow flex flex-col justify-end px-6 pb-10">
            <p className="font-body text-gold text-[0.6rem] tracking-[0.25em] uppercase mb-4">
              For Established Owners
            </p>
            <h3 className="font-heading font-normal text-[2.25rem] text-white mb-4 leading-[1.05] tracking-tight uppercase">
              BUSINESS<br/>CONSULTING
            </h3>
            <p className="font-body text-white/75 text-[0.8rem] leading-relaxed mb-7 max-w-[300px]">
              For concierge nurse business owners doing six to seven figures who have hit a ceiling. Deep diagnostics. Strategic implementation.
            </p>
            <Link to="/consulting" className="btn-white text-white border-white bg-transparent hover:bg-white hover:text-navy hover:border-white text-center py-3.5 text-[0.65rem] tracking-[0.2em] uppercase">
              INQUIRE NOW
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
