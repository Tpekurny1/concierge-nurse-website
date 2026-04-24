import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-navy flex flex-col justify-between overflow-hidden h-[calc(100vh-72px)] md:h-[calc(100vh-114px)] max-md:h-screen max-md:-mt-[72px] max-md:pt-[72px] relative">
      
      {/* Top Part: Content Wrapper */}
      <div className="w-full flex-grow flex flex-col items-center pt-4 lg:pt-12 px-6 lg:px-8 xl:px-12 max-w-[1600px] mx-auto">
        
        {/* Desktop Layout Overlay */}
        <div 
          className="hidden md:flex relative w-full h-full min-h-[450px] items-center bg-cover border border-white/10"
          style={{ backgroundImage: 'url("https://i.imgur.com/jxBFHqK.jpeg")', backgroundPosition: 'center 15%' }}
        >
           <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.7)_0%,rgba(10,22,40,0.1)_60%,transparent_100%)]"></div>
           
           <div className="relative z-10 p-12 lg:p-16 max-w-3xl">
              <h1 className="font-heading font-normal text-6xl lg:text-[5.8rem] text-white mb-6 leading-[1.02] drop-shadow-md tracking-tight uppercase">
                BUILD, LAUNCH <br/>
                <span className="italic normal-case text-gold px-1">&</span> SCALE YOUR <br/>
                NURSING BUSINESS
              </h1>
              
              <p className="font-body text-white/90 text-sm lg:text-[1rem] leading-loose mb-10 max-w-md drop-shadow-md">
                Strategic business-building for nurses who refuse to settle for the bedside. Education, consulting, and hands-on coaching to scale to six figures and beyond.
              </p>
              
              <Link to="/start-here" className="btn-white text-white border-white bg-transparent hover:bg-white hover:text-navy hover:border-white shadow-sm">
                FIND YOUR PATH
              </Link>
           </div>
        </div>

        {/* Mobile Layout — Full-bleed hero image with overlay text */}
        <div className="flex md:hidden flex-col w-full h-full relative">
          {/* Full-bleed background image */}
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: 'url("https://i.imgur.com/jxBFHqK.jpeg")', backgroundPosition: '80% 15%' }}
          />
          {/* Gradient overlay — fades from navy at top (seamless with navbar) and bottom (text legibility) */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-transparent" style={{ height: '30%' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent" />

          {/* Content pinned to bottom */}
          <div className="relative z-10 w-full flex-grow flex flex-col justify-end px-6 pb-12 pt-20">
            {/* Small label */}
            <p className="font-body text-gold text-[0.6rem] tracking-[0.25em] uppercase mb-5">
              Concierge Nurse Business Society
            </p>

            <h1 className="font-heading font-normal text-[2.75rem] text-white mb-5 leading-[1.05] tracking-tight uppercase">
              BUILD, LAUNCH <br/>
              <span className="italic normal-case text-gold">&</span> SCALE YOUR <br/>
              NURSING BUSINESS
            </h1>

            <p className="font-body text-white/80 text-[0.85rem] leading-relaxed mb-8 max-w-[300px]">
              Strategic business-building for nurses ready to leave the bedside and scale to six figures and beyond.
            </p>

            <div className="flex flex-col gap-3 w-full">
              <Link to="/start-here" className="btn-white text-white border-white bg-transparent hover:bg-white hover:text-navy hover:border-white text-center py-3.5 text-[0.65rem] tracking-[0.2em] uppercase">
                FIND YOUR PATH
              </Link>
              <Link to="/community" className="text-center text-white/50 text-[0.6rem] tracking-[0.15em] uppercase py-2 hover:text-white/80 transition-colors">
                JOIN THE FREE COMMUNITY
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Trust Bar Row (Desktop Only) */}
      <div className="hidden md:flex w-full items-center justify-center gap-12 lg:gap-16 pb-10 pt-4">
          <p className="font-body text-white/40 text-[0.65rem] tracking-[0.2em] uppercase whitespace-nowrap pt-1">
            Featured In
          </p>
          <div className="flex items-center gap-12 lg:gap-20 opacity-80">
            <span className="font-heading text-3xl text-white tracking-[0.1em] font-light uppercase">
              LOGO
            </span>
            <span className="font-heading text-3xl text-white tracking-[0.1em] font-light uppercase">
              LOGO
            </span>
            <span className="font-heading text-3xl text-white tracking-[0.1em] font-light uppercase">
              LOGO
            </span>
            <span className="font-heading text-3xl text-white tracking-[0.1em] font-light uppercase">
              LOGO
            </span>
          </div>
      </div>
      
    </section>
  );
}
