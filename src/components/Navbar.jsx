import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

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

// Nav structure: 5 top-level items. Dropdowns group related destinations.
const NAV = [
  { label: 'About', path: '/about' },
  { label: 'Start Here', path: '/start-here' },
  {
    label: 'Programs',
    children: [
      { label: 'Accelerator', path: '/accelerator', description: 'Six-week live cohort' },
      { label: 'Society Membership', path: '/society', description: 'Exclusive to graduates' },
      { label: 'Ambassador Pathway', path: '/ambassador', description: 'For Accelerator graduates' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'Clarity Consult', path: '/strategy', description: '60-minute strategy session' },
      { label: 'Consulting', path: '/consulting', description: 'For six-to-seven-figure owners' },
      { label: 'Toolkits', path: '/toolkits', description: 'Self-serve frameworks' },
    ],
  },
  {
    label: 'Learn',
    children: [
      { label: 'Blog', path: '/blog', description: 'Notes from the build' },
      { label: 'Find a Nurse', path: '/directory', description: 'Concierge nurse directory' },
      { label: 'Resources', path: '/resources', description: 'Guides and references' },
      { label: 'Community', path: '/community', description: 'Free Facebook group' },
    ],
  },
];

// Flatten for determining active state
function isItemActive(item, pathname) {
  if (item.path) return pathname === item.path;
  return (item.children || []).some((c) => pathname.startsWith(c.path));
}

function DesktopDropdown({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const active = isItemActive(item, pathname);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`font-body text-[0.65rem] uppercase tracking-[0.18em] transition-colors flex items-center gap-1 py-3 ${
          active ? 'text-gold' : 'text-white/60 hover:text-white'
        }`}
      >
        {item.label}
        <ChevronDown size={10} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-navy border border-white/10 min-w-[260px] shadow-2xl">
          {item.children.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              className="block px-5 py-3.5 border-b border-white/5 last:border-none hover:bg-white/5 transition-colors no-underline"
            >
              <p className={`font-body text-[0.7rem] uppercase tracking-[0.2em] ${pathname.startsWith(child.path) ? 'text-gold' : 'text-white'}`}>
                {child.label}
              </p>
              {child.description && (
                <p className="text-white/40 text-[0.65rem] mt-0.5">{child.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
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
          <div className="flex gap-5 text-white/50 text-[0.6rem] uppercase tracking-[0.2em] font-body w-48">
            <span className="cursor-pointer hover:text-white transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-white transition-colors">Facebook</span>
          </div>

          <Link to="/" className="flex flex-col items-center leading-none text-center no-underline gap-1">
            <span className="avery-title text-3xl tracking-[0.12em] text-white">
              CONCIERGE NURSE
            </span>
            <span className="font-body text-[0.55rem] tracking-[0.35em] font-medium text-gold uppercase">
              Business Society
            </span>
          </Link>

          <div className="w-48 flex justify-end items-center gap-5">
            <Link
              to="/ambassador/login"
              className="text-white/50 hover:text-gold text-[0.6rem] uppercase tracking-[0.2em] font-body no-underline transition-colors"
            >
              Ambassador Login
            </Link>
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
            {NAV.map((item) => (
              item.children
                ? <DesktopDropdown key={item.label} item={item} pathname={location.pathname} />
                : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-body text-[0.65rem] uppercase tracking-[0.18em] transition-colors py-3 ${
                      location.pathname === item.path ? 'text-gold' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
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

          <div className="flex-1 overflow-y-auto py-8 px-6">
            {NAV.map((item, index) => {
              if (!item.children) {
                return (
                  <div
                    key={item.path}
                    className="animate-link-slide border-b border-white/5"
                    style={{ animationDelay: `${index * 0.05 + 0.1}s` }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`mobile-nav-link block py-4 ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              }
              const isOpen = openGroup === item.label;
              return (
                <div
                  key={item.label}
                  className="animate-link-slide border-b border-white/5"
                  style={{ animationDelay: `${index * 0.05 + 0.1}s` }}
                >
                  <button
                    onClick={() => setOpenGroup(isOpen ? null : item.label)}
                    className={`mobile-nav-link w-full flex items-center justify-between py-4 ${isItemActive(item, location.pathname) ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="pb-4 pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className={`block py-2.5 text-sm font-body uppercase tracking-[0.18em] no-underline ${
                            location.pathname.startsWith(child.path) ? 'text-gold' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          {child.label}
                          {child.description && (
                            <span className="block text-[0.65rem] normal-case tracking-normal text-white/40 mt-0.5">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div
              className="animate-link-slide w-full mt-8 space-y-3"
              style={{ animationDelay: `${NAV.length * 0.05 + 0.2}s` }}
            >
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-white w-full text-white border-white/30"
                style={{ fontSize: '0.75rem', padding: '1rem' }}
              >
                CONTACT / BOOK NOW
              </Link>
              <Link
                to="/ambassador/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-white/50 hover:text-gold text-[0.7rem] uppercase tracking-[0.2em] font-body no-underline transition-colors pt-2"
              >
                Ambassador Login
              </Link>
            </div>
          </div>

          <div className="p-12 pb-16 flex flex-col items-center gap-6 animate-link-slide" style={{ animationDelay: `${NAV.length * 0.05 + 0.3}s` }}>
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
