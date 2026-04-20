import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function HamburgerIcon({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <div className="w-7 h-5 relative flex flex-col justify-between">
        <span
          className="block h-[2.5px] bg-white rounded-full origin-center"
          style={{
            transition: 'transform 0.35s cubic-bezier(0.68, -0.6, 0.32, 1.6), top 0.2s ease, width 0.2s ease',
            transitionDelay: isOpen ? '0.15s' : '0s',
            transform: isOpen ? 'translateY(9px) rotate(45deg)' : 'translateY(0) rotate(0)',
            width: '100%',
          }}
        />
        <span
          className="block h-[2.5px] bg-white rounded-full"
          style={{
            transition: 'opacity 0.15s ease, transform 0.15s ease',
            transitionDelay: isOpen ? '0s' : '0.1s',
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
          }}
        />
        <span
          className="block h-[2.5px] bg-white rounded-full origin-center"
          style={{
            transition: 'transform 0.35s cubic-bezier(0.68, -0.6, 0.32, 1.6), bottom 0.2s ease, width 0.2s ease',
            transitionDelay: isOpen ? '0.15s' : '0s',
            transform: isOpen ? 'translateY(-9px) rotate(-45deg)' : 'translateY(0) rotate(0)',
            width: isOpen ? '100%' : '75%',
            marginLeft: 'auto',
          }}
        />
      </div>
    </button>
  );
}

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Start Here', path: '/start-here' },
  { label: 'Accelerator', path: '/accelerator' },
  { label: 'Society', path: '/society' },
  { label: 'Toolkits', path: '/toolkits' },
  { label: 'Strategy', path: '/strategy' },
  { label: 'Consulting', path: '/consulting' },
  { label: 'Community', path: '/community' },
  { label: 'Resources', path: '/resources' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-navy transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-black/20' : ''}`}>

      {/* Top Bar: Logo centered, CTA right */}
      <div className="hidden xl:block border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-8 h-[72px] flex items-center justify-between">
          {/* Left: social */}
          <div className="flex gap-5 text-white/50 text-[0.6rem] uppercase tracking-[0.2em] font-body w-40">
            <span className="cursor-pointer hover:text-white transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-white transition-colors">Facebook</span>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="flex flex-col items-center leading-none text-center no-underline gap-1">
            <span className="avery-title text-3xl tracking-[0.12em] text-white">
              CONCIERGE NURSE
            </span>
            <span className="font-body text-[0.55rem] tracking-[0.35em] font-medium text-gold uppercase">
              Business Society
            </span>
          </Link>

          {/* Right: CTA */}
          <div className="w-40 flex justify-end">
            <Link to="/contact" className="btn-white text-white border-white/40 hover:bg-white hover:text-navy hover:border-white" style={{ padding: '0.5rem 1.4rem', fontSize: '0.6rem' }}>
              CONTACT / BOOK
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Navigation links centered */}
      <div className="hidden xl:block">
        <div className="max-w-[1400px] mx-auto px-8 h-[42px] flex items-center justify-center">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-[0.65rem] uppercase tracking-[0.18em] transition-colors ${
                  location.pathname === link.path ? 'text-gold' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <nav className="xl:hidden max-w-[1400px] mx-auto px-6 h-[70px] flex items-center justify-between">
        <div className="w-1/3" />
        <div className="w-1/3 flex justify-center">
          <Link to="/" className="flex flex-col items-center leading-none text-center no-underline gap-1 pt-1" onClick={() => setMobileOpen(false)}>
            <span className="avery-title text-2xl tracking-[0.1em] text-white">
              CONCIERGE NURSE
            </span>
            <span className="font-body text-[0.55rem] tracking-[0.3em] font-medium text-gold uppercase hidden sm:block">
              Business Society
            </span>
          </Link>
        </div>
        <div className="w-1/3 flex justify-end">
          <HamburgerIcon isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="mobile-menu-overlay animate-menu-fade">
          <div className="h-[70px] px-6 flex items-center justify-between border-b border-white/5">
            <div className="w-1/3" />
            <div className="w-1/3 flex justify-center">
              <span className="avery-title text-xl tracking-[0.1em] text-white">CNS</span>
            </div>
            <div className="w-1/3 flex justify-end">
              <HamburgerIcon isOpen={mobileOpen} onClick={() => setMobileOpen(false)} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center space-y-2 py-12">
            {navLinks.map((link, index) => (
              <div
                key={link.path}
                className="animate-link-slide"
                style={{ animationDelay: `${index * 0.05 + 0.1}s` }}
              >
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </div>
            ))}

            <div
              className="animate-link-slide pt-8 pb-4"
              style={{ animationDelay: `${navLinks.length * 0.05 + 0.1}s` }}
            >
              <div className="w-8 h-[1px] bg-white/40 mx-auto" />
            </div>

            <div
              className="animate-link-slide w-full px-12"
              style={{ animationDelay: `${navLinks.length * 0.05 + 0.2}s` }}
            >
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-white w-full text-white border-white/30"
                style={{ fontSize: '0.75rem', padding: '1rem' }}
              >
                CONTACT / BOOK NOW
              </Link>
            </div>
          </div>

          <div className="p-12 pb-16 flex flex-col items-center gap-6 animate-link-slide" style={{ animationDelay: `${navLinks.length * 0.05 + 0.3}s` }}>
            <div className="flex gap-8 text-white/60 text-[0.7rem] uppercase tracking-[0.3em] font-body">
              <span className="cursor-pointer hover:text-gold transition-colors">Instagram</span>
              <span className="cursor-pointer hover:text-gold transition-colors">Facebook</span>
            </div>
            <p className="text-white/30 text-[0.55rem] uppercase tracking-[0.2em] font-body">
              &copy; 2026 Concierge Nurse Business Society
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
