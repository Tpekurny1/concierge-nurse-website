import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Minimal top bar for standalone pages (ambassador login/signup, thank-you,
// etc.) that don't render the main site Navbar. Gives visitors a way to get
// back to the marketing site without using the browser back button.
export default function StandaloneHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-white/60 hover:text-gold text-xs uppercase tracking-[0.18em] no-underline transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to site</span>
        </Link>
        <Link
          to="/"
          className="flex flex-col items-center leading-none text-center no-underline gap-1"
        >
          <span className="font-heading text-sm font-bold text-white tracking-wide">
            Concierge Nurse
          </span>
          <span className="text-gold text-[0.55rem] tracking-[0.3em] uppercase">
            Business Society
          </span>
        </Link>
        <div className="w-[92px] hidden sm:block" aria-hidden />
      </div>
    </header>
  );
}
