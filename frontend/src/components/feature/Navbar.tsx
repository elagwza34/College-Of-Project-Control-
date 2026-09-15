import Modal from '@/components/base/Modal';
import SiteLink from '@/components/base/SiteLink';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/* ── Route groups for the mega dropdown ─────────────────────── */

interface NavigationRoute {
  label: string;
  href: string;
  icon: string;
}

interface NavigationRouteGroup {
  title: string;
  color: string;
  routes: NavigationRoute[];
}

const routeGroups: NavigationRouteGroup[] = [
  {
    title: 'Programmes',
    color: 'primary',
    routes: [
      { label: 'All Programmes', href: '/programmes', icon: 'ri-layout-grid-line' },
      { label: 'PCP Level 6', href: '/project-controls-professional-level-6', icon: 'ri-line-chart-line' },
      { label: 'APM Level 4', href: '/associate-project-manager-level-4', icon: 'ri-briefcase-4-line' },
      { label: 'Certified PMO Level 6', href: '/project-controls-professional/pmo-governance-route', icon: 'ri-building-4-line' },
    ],
  },
  {
    title: 'PCP Pathways',
    color: 'primary',
    routes: [
      { label: 'Strategic Route', href: '/project-controls-professional/strategic-route', icon: 'ri-compass-3-line' },
      { label: 'Operational Route', href: '/project-controls-professional/operational-route', icon: 'ri-calendar-check-line' },
      { label: 'Chartered Route', href: '/project-controls-professional/chartered-pmo-pathway', icon: 'ri-shield-star-line' },
      { label: 'Commercial Route', href: '/commercial-project-controls-route', icon: 'ri-bank-card-line' },
    ],
  },
  {
    title: 'Sectors',
    color: 'accent',
    routes: [
      { label: 'Construction', href: '/project-controls-professional/construction-route', icon: 'ri-building-2-line' },
      { label: 'Engineering', href: '/project-controls-professional/engineering-manufacturing-aerospace-route', icon: 'ri-tools-line' },
      { label: 'Public Sector', href: '/project-controls-professional/public-sector-councils-route', icon: 'ri-government-line' },
      { label: 'Energy & Utilities', href: '/project-controls-professional/energy-oil-gas-utilities-route', icon: 'ri-flashlight-line' },
    ],
  },
  {
    title: 'Resources',
    color: 'secondary',
    routes: [
      { label: 'Articles', href: '/articles', icon: 'ri-book-open-line' },
      
      { label: 'Events', href: '/events', icon: 'ri-calendar-event-line' },
      { label: 'FAQ', href: '/faq', icon: 'ri-question-line' },
      { label: 'Testimonials & reviews', href: '/testimonials', icon: 'ri-chat-quote-line' },
    ],
  },
  {
    title: 'College',
    color: 'secondary',
    routes: [
      { label: 'About the College', href: '/about', icon: 'ri-information-line' },
      { label: 'Governance Board', href: '/governance-board', icon: 'ri-government-line' },
      { label: 'For Employers', href: '/employers', icon: 'ri-building-line' },
      { label: 'For Professionals', href: '/apprentices', icon: 'ri-user-star-line' },
      { label: 'Contact', href: '/contact', icon: 'ri-mail-line' },
    ],
  },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routesOpen, setRoutesOpen] = useState(false);
  const routesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60 || pathname.startsWith('/mentors/'));
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoutesOpen(false);
      }
    };
    if (routesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [routesOpen]);

  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setRoutesOpen(false); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && routesOpen) { setRoutesOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [routesOpen]);
  useEffect(() => {
    const resize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); if (routesTimeoutRef.current) clearTimeout(routesTimeoutRef.current); };
  }, []);
  const handleRoutesEnter = () => {
    if (routesTimeoutRef.current) clearTimeout(routesTimeoutRef.current);
    setRoutesOpen(true);
  };

  const handleRoutesLeave = () => {
    routesTimeoutRef.current = setTimeout(() => setRoutesOpen(false), 200);
  };

  const navLinks = [
    { label: 'Home', href: '/', hasDropdown: false },
    { label: 'Programmes', href: '/programmes', hasDropdown: false },
    { label: 'Explore', href: '/about', hasDropdown: true },
  ];

  const linkTextClass = scrolled
    ? 'text-foreground-700 hover:text-primary-600'
    : 'text-white/90 hover:text-white';

  return (
    <nav
      className={`header-entrance relative w-full overflow-visible transition-all duration-500 ease-out ${
        scrolled
          ? 'border-b border-background-200/80 bg-background-50/95 shadow-sm backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div
        className="container-site relative overflow-visible"
      >
        <div className="flex h-[72px] items-center">
          <SiteLink href="/" className="relative flex h-14 w-[130px] shrink-0 cursor-pointer items-center md:h-16 md:w-[148px]" aria-label="College of Project Controls & Management home">
            <img decoding="async" width="148" height="64"
              src={scrolled ? '/images/cpcm-logo-dark.webp' : '/images/cpcm-logo-light.webp'}
              alt="College of Project Controls" className="h-full w-full object-contain" />
          </SiteLink>

          <div className="ml-7 hidden items-center gap-5 lg:flex xl:ml-10 xl:gap-7">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className={link.hasDropdown ? 'static' : 'relative'}
                ref={link.label === 'Explore' ? dropdownRef : undefined}
                onMouseEnter={link.hasDropdown ? handleRoutesEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleRoutesLeave : undefined}
              >
                {link.hasDropdown ? (
                  <button
                    type="button"
                    data-navigation-control
                    ref={triggerRef}
                    aria-expanded={routesOpen}
                    aria-controls="desktop-routes-menu"
                    className={`nav-underline-slide flex cursor-pointer items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors duration-500 ${linkTextClass}`}
                    onClick={() => setRoutesOpen(!routesOpen)}
                  >
                    {link.label}
                    <i
                      className={`ri-arrow-down-s-line transition-transform duration-300 ${routesOpen ? 'rotate-180' : ''}`}
                    ></i>
                  </button>
                ) : (
                  <SiteLink
                    href={link.href}
                    className={`nav-underline-slide cursor-pointer whitespace-nowrap text-sm font-medium transition-colors duration-500 ${
                      pathname === link.href ? 'text-signal-500' : linkTextClass
                    }`}
                  >
                    {link.label}
                  </SiteLink>
                )}

                {/* ── Mega Dropdown ── */}
                {link.hasDropdown && routesOpen && (
                  <div
                    id="desktop-routes-menu"
                    data-navigation-menu
                    className="absolute left-1/2 top-full mt-3 max-h-[calc(100vh-96px)] w-[calc(100vw-2rem)] max-w-[1180px] -translate-x-1/2 overflow-x-hidden overflow-y-auto rounded-2xl border border-background-200 bg-white shadow-card"
                    style={{ animation: 'dropdown-in 350ms cubic-bezier(0.22,1,0.36,1) forwards' }}
                  >
                    {/* Route groups */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-5 sm:grid-cols-3 xl:grid-cols-5">
                      {routeGroups.map((group) => (
                        <div key={group.title}>
                          <p className="mb-2 text-sm font-label font-semibold uppercase tracking-[0.12em] text-foreground-400">
                            {group.title}
                          </p>
                          <div className="flex flex-col gap-0.5">
                            {group.routes.map((route) => {
                              const active = pathname === route.href;
                              return (
                                <SiteLink
                                  key={route.label}
                                  href={route.href}
                                  aria-current={active ? 'page' : undefined}
                                  className={`group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors duration-200 ${
                                    active ? 'bg-signal-50' : 'hover:bg-background-50'
                                  }`}
                                >
                                  <i className={`${route.icon} text-sm flex-shrink-0 ${
                                    active ? 'text-signal-600' :
                                    group.color === 'primary' ? 'text-primary-500' :
                                    group.color === 'accent' ? 'text-signal-600' :
                                    'text-secondary-500'
                                  }`}></i>
                                  <p className={`min-w-0 truncate text-sm font-medium transition-colors ${
                                    active ? 'font-semibold text-signal-600' : 'text-foreground-800 group-hover:text-primary-700'
                                  }`}>
                                    {route.label}
                                  </p>
                                </SiteLink>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* IPC feature strip */}
                    <SiteLink
                      href="/institute-of-project-controls"
                      className="group flex items-center gap-3 border-t border-[#C99A49]/25 bg-ipc-surface px-5 py-3 transition-colors duration-200 hover:bg-[#0D1418]"
                    >
                      <img loading="lazy" decoding="async" src="/images/ipc-logo.webp" alt="" className="h-6 w-6 flex-shrink-0 object-contain" />
                      <span className="text-xs font-bold uppercase tracking-[.14em] text-ipc-gold">Institute of Project Controls</span>
                      <span className="hidden text-xs text-white/50 sm:inline">— professional standards &amp; recognition</span>
                      <i className="ri-arrow-right-line ml-auto text-sm text-ipc-gold transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </SiteLink>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <SiteLink
              href="/book-a-session"
              className="btn-primary cursor-pointer whitespace-nowrap px-7 py-3 text-sm font-bold transition-colors duration-300"
            >
              Request a consultation
            </SiteLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`ml-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-colors duration-500 lg:hidden ${scrolled ? 'text-foreground-800' : 'text-white'}`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <Modal open={mobileOpen} onClose={() => setMobileOpen(false)} title="Site navigation" id="mobile-navigation">
          <div className="px-4 py-4 flex flex-col gap-3">
            {/* Regular links */}
            {navLinks.filter(l => l.label !== 'Explore').map((link) => (
              <SiteLink
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-2 cursor-pointer transition-colors ${
                  pathname === link.href ? 'text-signal-500' : 'text-foreground-700 hover:text-primary-600'
                }`}
              >
                {link.label}
              </SiteLink>
            ))}

            {/* Complete mobile navigation */}
            <div data-navigation-menu className="border-t border-background-200/70 pt-3">
              <p className="text-sm font-label font-semibold uppercase tracking-[0.12em] text-foreground-400 mb-2">
                Explore all pages
              </p>
              <div className="flex flex-col gap-1 pl-2">
                {routeGroups.flatMap(g => g.routes).map((route) => {
                  const active = pathname === route.href;
                  return (
                    <SiteLink
                      key={route.label}
                      href={route.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`text-sm py-2 cursor-pointer transition-colors flex items-center gap-2 ${
                        active ? 'font-semibold text-signal-600' : 'text-foreground-700 hover:text-primary-600'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-signal-500 flex-shrink-0"></div>
                      {route.label}
                    </SiteLink>
                  );
                })}
              </div>
              <SiteLink
                href="/institute-of-project-controls"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center gap-3 rounded-lg bg-ipc-surface px-3 py-2.5"
              >
                <img loading="lazy" decoding="async" src="/images/ipc-logo.webp" alt="" className="h-5 w-5 flex-shrink-0 object-contain" />
                <span className="text-xs font-bold uppercase tracking-[.12em] text-ipc-gold">Institute of Project Controls</span>
                <i className="ri-arrow-right-line ml-auto text-sm text-ipc-gold" aria-hidden="true" />
              </SiteLink>
            </div>

            <div className="border-t border-background-200/70 pt-3 flex flex-col gap-3">
              <SiteLink
                href="/book-a-session"
                onClick={() => setMobileOpen(false)}
                className="cta-button bg-signal-500 text-primary-950 px-7 py-3 rounded-md text-sm font-bold text-center cursor-pointer hover:bg-signal-400 shadow-card transition-colors whitespace-nowrap"
              >
                Request a consultation
              </SiteLink>
            </div>
          </div>
      </Modal>

      {/* Dropdown + header entrance keyframes */}
      <style>{`
        @keyframes dropdown-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes header-entrance {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .header-entrance {
          animation: header-entrance 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </nav>
  );
}
