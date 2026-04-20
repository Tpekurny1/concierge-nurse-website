import { Link } from 'react-router-dom';

export default function AcceleratorSection() {
  return (
    <section className="bg-navy py-12 lg:py-24 flex flex-col items-center overflow-hidden">

      <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-12">

        {/* Large Typography Block for Accelerator */}
        <div className="relative w-full min-h-[65vh] lg:min-h-[85vh] flex items-center justify-center bg-navy border border-gold/20 overflow-hidden">

          {/* Subtle gold corner ornaments */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-gold/50" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-gold/50" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-gold/50" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-gold/50" />

          {/* Faint oversized decorative number */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-heading text-[24rem] lg:text-[36rem] text-white/[0.04] leading-none tracking-tighter">
              06
            </span>
          </div>

          {/* Text Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-4xl text-center flex flex-col items-center">
            <p className="font-body text-gold text-[0.65rem] lg:text-[0.7rem] tracking-[0.35em] uppercase mb-6">
              Flagship Program · Six Weeks · Live Cohort
            </p>
            <h2 className="font-heading font-normal text-5xl lg:text-[6rem] text-white mb-8 leading-tight tracking-tight uppercase">
              THE <br/>
              ACCELERATOR
            </h2>
            <div className="gold-divider mx-auto mb-8" />

            <p className="font-body text-white/90 text-sm lg:text-[1.1rem] leading-loose mb-12 max-w-2xl">
              A six-week live cohort where you build your entire concierge nursing business from the ground up. Not a course. Not theory. Real business, built step by step.
            </p>

            <Link to="/accelerator" className="btn-white text-white border-white bg-transparent hover:bg-white hover:text-navy hover:border-white px-10 py-4 text-xs tracking-[0.3em] uppercase">
              JOIN THE WAITLIST
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
