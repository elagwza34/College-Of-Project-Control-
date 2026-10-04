import SiteLink from '@/components/base/SiteLink';
import PathwayMegaMenu from './PathwayMegaMenu';
import SectorMegaMenu from './SectorMegaMenu';
import { pathwayCards, sectorCards } from './navMegaMenuData';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/* ── Route groups for the mega dropdown ─────────────────────── */

interface NavigationRoute {
  label: string;
  href: string;
  icon: string;
}

/** The mega-menu panel a header item opens, or none for a plain link. */
export type MegaMenuPanel = 'programmes' | 'pathways' | 'sectors' | 'about';

export interface NavLink {
  label: string;
  href: string;
  /** Present when hovering this item opens a panel. */
  panel?: MegaMenuPanel;
}

interface NavigationRouteGroup {
  title: string;
  color: string;
  /** Clarifies the group's status where the classification is easy to misread. */
  note?: string;
  /**
   * Landing page for the group title itself. Without it the title is plain text and
   * only opens the list on hover, which reads as a broken link.
   */
  href?: string;
  routes: NavigationRoute[];
}

/* Approved classification (audit P0 · offer taxonomy):
   two apprenticeships → three internal Level 6 pathways → separate professional study. */
const routeGroups: NavigationRouteGroup[] = [
  {
    title: 'Apprenticeships',
    color: 'primary',
    note: 'The two work-based programmes we offer.',
    routes: [
      { label: 'Compare both programmes', href: '/programmes', icon: 'ri-layout-grid-line' },
      { label: 'PCP Level 6', href: '/project-controls-professional-level-6', icon: 'ri-line-chart-line' },
      { label: 'APM Level 4', href: '/associate-project-manager-level-4', icon: 'ri-briefcase-4-line' },
    ],
  },
  {
    title: 'Professional study',
    color: 'secondary',
    note: 'Separate commercial programmes — not an apprenticeship.',
    routes: [
      { label: 'Certified PMO Level 6', href: '/project-controls-professional/pmo-governance-route', icon: 'ri-building-4-line' },
      { label: 'Commercial Project Controls', href: '/commercial-project-controls-route', icon: 'ri-bank-card-line' },
      { label: 'Short courses', href: '/short-courses', icon: 'ri-graduation-cap-line' },
    ],
  },
];

/* About and support destinations. These used to sit as a third column inside the
   Apprenticeships menu, where they were easy to miss and duplicated the header
   link. They now have their own menu. */
const aboutRoutes: NavigationRoute[] = [
  { label: 'About the College', href: '/about', icon: 'ri-information-line' },
  { label: 'For Employers', href: '/employers', icon: 'ri-building-line' },
  { label: 'For Professionals', href: '/apprentices', icon: 'ri-user-star-line' },
  { label: 'Events', href: '/events', icon: 'ri-calendar-event-line' },
  { label: 'Articles & guides', href: '/articles', icon: 'ri-book-open-line' },
  { label: 'Case studies', href: '/case-studies', icon: 'ri-briefcase-4-line' },
  { label: 'FAQ', href: '/faq', icon: 'ri-question-line' },
  { label: 'Contact', href: '/contact', icon: 'ri-mail-line' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routesOpen, setRoutesOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<MegaMenuPanel | null>(null);
  const [desktopViewport, setDesktopViewport] = useState(false);
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
    const media = window.matchMedia('(min-width: 1024px)');
    const syncViewport = () => {
      setDesktopViewport(media.matches);
      if (media.matches) setMobileOpen(false);
    };
    syncViewport();
    media.addEventListener('change', syncViewport);
    return () => { media.removeEventListener('change', syncViewport); if (routesTimeoutRef.current) clearTimeout(routesTimeoutRef.current); };
  }, []);
  useEffect(() => {
    if (!mobileOpen || desktopViewport) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen, desktopViewport]);
  const handleRoutesEnter = (panel: MegaMenuPanel) => {
    if (routesTimeoutRef.current) clearTimeout(routesTimeoutRef.current);
    setOpenPanel(panel);
    setRoutesOpen(true);
  };

  const handleRoutesLeave = () => {
    if (routesTimeoutRef.current) clearTimeout(routesTimeoutRef.current);
    routesTimeoutRef.current = setTimeout(() => {
      setRoutesOpen(false);
      setOpenPanel(null);
    }, 200);
  };

  /* Primary navigation follows the approved journey order
     (audit REVIEW 09): the apprenticeship offer comes before supporting
     destinations, and professional study stays a labelled secondary branch.

     Sectors and Pathways each own their panel. They used to live as columns
     inside the Apprenticeships menu, which made them hard to find and left the
     group titles as dead text. */
  const navLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Apprenticeships', href: '/programmes', panel: 'programmes' },
    { label: 'Pathways', href: '/project-controls-professional-level-6', panel: 'pathways' },
    { label: 'Sectors', href: '/sectors', panel: 'sectors' },
    { label: 'How learning works', href: '/how-to-apply' },
    { label: 'About & Support', href: '/about', panel: 'about' },
  ];

  const linkTextClass = scrolled
    ? 'text-foreground-700 hover:text-primary-600'
    : 'text-white/90 hover:text-white';

  return (
    <header
      className={`header-entrance relative w-full overflow-visible transition-all duration-500 ease-out ${
        scrolled
          ? 'border-b border-background-200/80 bg-background-50/95 shadow-sm backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
    <nav aria-label="Primary">
      <div
        className="container-site relative overflow-visible"
      >
        <div className="flex h-[104px] items-center">
          <SiteLink href="/" className="relative flex h-[76px] w-[176px] shrink-0 cursor-pointer items-center md:h-[90px] md:w-[208px]" aria-label="College of Project Controls & Management home">
            <img decoding="async" width="208" height="90"
              src={scrolled ? '/images/cpcm-logo-dark.webp' : '/images/cpcm-logo-light.webp'}
              alt="College of Project Controls" className="h-full w-full object-contain" />
          </SiteLink>

          <div className="ml-6 hidden items-center gap-4 lg:flex xl:ml-8 xl:gap-5">
            {navLinks.map((link) => (
              <div
                key={link.label}
                /* `relative` makes the panel a real DOM descendant of this hover target,
                   so React keeps it "entered" while the pointer is over the menu. The
                   panel is positioned against the viewport with `fixed` so it still
                   centres on the window rather than on this narrow item. */
                className="relative"
                ref={link.panel ? dropdownRef : undefined}
                onMouseEnter={link.panel ? () => handleRoutesEnter(link.panel as MegaMenuPanel) : undefined}
                onMouseLeave={link.panel ? handleRoutesLeave : undefined}
              >
                {link.panel ? (
                  <button
                    type="button"
                    data-navigation-control
                    ref={triggerRef}
                    aria-expanded={routesOpen && openPanel === link.panel}
                    aria-controls="desktop-routes-menu"
                    className={`nav-underline-slide flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-1 text-sm font-medium transition-colors duration-200 ${linkTextClass}`}
                    onClick={() => {
                      const nextOpen = !(routesOpen && openPanel === link.panel);
                      setOpenPanel(nextOpen ? (link.panel as MegaMenuPanel) : null);
                      setRoutesOpen(nextOpen);
                    }}
                  >
                    {link.label}
                    <i
                      className={`ri-arrow-down-s-line transition-transform duration-300 ${routesOpen && openPanel === link.panel ? 'rotate-180' : ''}`}
                    ></i>
                  </button>
                ) : (
                  <SiteLink
                    href={link.href}
                    className={`nav-underline-slide cursor-pointer whitespace-nowrap rounded-md px-1.5 py-1 text-sm font-medium transition-colors duration-200 ${
                      pathname === link.href ? 'text-signal-500' : linkTextClass
                    }`}
                  >
                    {link.label}
                  </SiteLink>
                )}

                {/* ── Mega Dropdown ── */}
                {link.panel && routesOpen && openPanel === link.panel && (
                  <div
                    id="desktop-routes-menu"
                    data-navigation-menu
                    className="fixed left-4 right-4 top-[104px] z-[80] max-h-[calc(100vh-120px)] xl:left-1/2 xl:right-auto xl:w-[min(1180px,calc(100vw-2rem))] xl:-translate-x-1/2"
                    style={{ animation: 'navbar-dropdown-in 350ms cubic-bezier(0.22,1,0.36,1) forwards' }}
                  >
                    {/* Bridge over the header's bottom padding. The panel hangs from the
                        header, so a strip of dead space sits between the trigger and the
                        menu. The pointer crossing it leaves the trigger's hover chain and
                        the close timer runs. This transparent block sits inside the same
                        wrapper, so the pointer never leaves. */}
                    <div className="pointer-events-none h-6" aria-hidden="true" />
                    <div className="-mt-6 overflow-x-hidden overflow-y-auto rounded-2xl border border-background-200 bg-white shadow-card">
                    {openPanel === 'sectors' ? (
                      <SectorMegaMenu />
                    ) : openPanel === 'pathways' ? (
                      <PathwayMegaMenu />
                    ) : openPanel === 'about' ? (
                      <div className="p-5">
                        <p className="mb-4 text-sm font-label font-semibold uppercase tracking-[0.12em] text-foreground-400">
                          About &amp; Support
                        </p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-3 xl:grid-cols-4">
                          {aboutRoutes.map((route) => (
                            <SiteLink
                              key={route.label}
                              href={route.href}
                              aria-current={pathname === route.href ? 'page' : undefined}
                              className={`group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors duration-200 ${
                                pathname === route.href ? 'bg-signal-50' : 'hover:bg-background-50'
                              }`}
                            >
                              <i
                                className={`${route.icon} text-sm flex-shrink-0 ${
                                  pathname === route.href ? 'text-signal-600' : 'text-secondary-500'
                                }`}
                              ></i>
                              <p
                                className={`min-w-0 truncate text-sm font-medium transition-colors ${
                                  pathname === route.href
                                    ? 'font-semibold text-signal-600'
                                    : 'text-foreground-800 group-hover:text-primary-700'
                                }`}
                              >
                                {route.label}
                              </p>
                            </SiteLink>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                    {/* Route groups */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-5 sm:grid-cols-3 xl:grid-cols-5">
                      {routeGroups.map((group) => (
                        <div key={group.title}>
                          <p className="mb-2 text-sm font-label font-semibold uppercase tracking-[0.12em] text-foreground-400">
                            {group.href ? (
                              <SiteLink
                                href={group.href}
                                className="rounded transition-colors duration-200 hover:text-primary-700 focus-visible:text-primary-700"
                              >
                                {group.title}
                              </SiteLink>
                            ) : (
                              group.title
                            )}
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

                    </>
                    )}

                    {/* IPC feature strip — part of the programmes menu only. */}
                    {openPanel === 'programmes' && (
                      <SiteLink
                        href="/institute-of-project-controls"
                        className="interactive-arrow group flex items-center gap-3 border-t border-[#C99A49]/25 bg-ipc-surface px-5 py-3 transition-colors duration-200 hover:bg-[#0D1418]"
                      >
                        <img loading="lazy" decoding="async" src="/images/ipc-logo.webp" alt="" className="h-6 w-6 flex-shrink-0 object-contain" />
                        <span className="text-xs font-bold uppercase tracking-[.14em] text-ipc-gold">Institute of Project Controls</span>
                        <span className="hidden text-xs text-white/50 sm:inline">— professional standards &amp; recognition</span>
                        <i className="ri-arrow-right-line ml-auto text-sm text-ipc-gold transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                      </SiteLink>
                    )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="ml-auto hidden items-center pl-4 xl:flex xl:pl-6">
            <SiteLink
              href="/book-a-session"
              className="btn-primary min-w-[220px] cursor-pointer whitespace-nowrap px-10 py-3 text-sm font-bold transition-colors duration-300"
            >
              Book a Session
            </SiteLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`ml-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 hover:bg-white/10 lg:hidden ${scrolled ? 'text-foreground-800 hover:bg-background-100' : 'text-white'}`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && !desktopViewport && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-navigation-title"
          className="fixed inset-0 z-[1000] bg-black/60 px-4 py-6 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="drawer-panel-center mx-auto flex h-[min(88dvh,760px)] max-w-[424px] flex-col overflow-hidden rounded-lg bg-white text-foreground-900 shadow-overlay"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-background-200/70 p-4">
              <h2 id="mobile-navigation-title" className="sr-only">Site navigation</h2>
              <SiteLink href="/" onClick={() => setMobileOpen(false)} className="flex h-11 w-[118px] items-center" aria-label="College of Project Controls & Management home">
                <img decoding="async" width="118" height="44" src="/images/cpcm-logo-dark.webp" alt="College of Project Controls" className="h-full w-full object-contain" />
              </SiteLink>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-foreground-800 transition-colors hover:bg-background-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-500"
                aria-label="Close menu"
              >
                <i className="ri-close-line text-2xl" aria-hidden="true" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navLinks.filter(l => l.label !== 'Explore').map((link) => (
                  <SiteLink
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`cursor-pointer py-1 text-sm font-semibold transition-colors ${
                      pathname === link.href ? 'text-signal-500' : 'text-foreground-700 hover:text-primary-600'
                    }`}
                  >
                    {link.label}
                  </SiteLink>
                ))}

                <div data-navigation-menu className="border-t border-background-200/70 pt-4">
                  <p className="mb-4 text-sm font-label font-semibold uppercase tracking-[0.12em] text-foreground-400">
                    Sectors
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {sectorCards.map((sector) => (
                      <SiteLink
                        key={sector.href}
                        href={sector.href}
                        onClick={() => setMobileOpen(false)}
                        className="group overflow-hidden rounded-lg border border-background-200 bg-white"
                      >
                        <img
                          src={sector.image}
                          alt={sector.imageAlt}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-full object-cover"
                        />
                        <span className="block px-3 py-2 text-xs font-semibold leading-snug text-foreground-800 group-hover:text-primary-700">
                          {sector.label}
                        </span>
                      </SiteLink>
                    ))}
                  </div>

                  <p className="mb-4 mt-8 text-sm font-label font-semibold uppercase tracking-[0.12em] text-foreground-400">
                    Pathways
                  </p>
                  <div className="space-y-2">
                    {pathwayCards.map((pathway) => (
                      <SiteLink
                        key={pathway.href}
                        href={pathway.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-start gap-3 rounded-lg px-2 py-2 text-foreground-800 hover:bg-background-50 hover:text-primary-700"
                      >
                        <i className={`${pathway.icon} text-base text-primary-600`} aria-hidden="true" />
                        <span>
                          <span className="block text-sm font-semibold">{pathway.label}</span>
                          <span className="block text-xs leading-relaxed text-foreground-600">
                            {pathway.description}
                          </span>
                        </span>
                      </SiteLink>
                    ))}
                  </div>
                </div>

                <div data-navigation-menu className="border-t border-background-200/70 pt-4">
                  <section>
                    <h3 className="text-sm font-bold text-foreground-950">About &amp; Support</h3>
                    <div className="mt-2 grid gap-1">
                      {aboutRoutes.map((route) => {
                        const active = pathname === route.href;
                        return (
                          <SiteLink
                            key={route.label}
                            href={route.href}
                            onClick={() => setMobileOpen(false)}
                            aria-current={active ? 'page' : undefined}
                            className={`flex min-h-9 cursor-pointer items-center gap-2 rounded-md px-1 text-sm transition-colors ${
                              active
                                ? 'font-semibold text-signal-700'
                                : 'text-foreground-700 hover:bg-background-50 hover:text-primary-700'
                            }`}
                          >
                            <i className={`${route.icon} text-base ${active ? 'text-signal-600' : 'text-primary-600'}`} aria-hidden="true" />
                            <span>{route.label}</span>
                          </SiteLink>
                        );
                      })}
                    </div>
                  </section>

                  <p className="mb-4 text-sm font-label font-semibold uppercase tracking-[0.12em] text-foreground-400">
                    Explore all pages
                  </p>
                  <div className="space-y-5">
                    {routeGroups.map((group) => {
                      const activeInGroup = group.routes.some((route) => pathname === route.href);
                      return (
                        <section key={group.title}>
                          <h3 className={`text-sm font-bold ${activeInGroup ? 'text-signal-700' : 'text-foreground-950'}`}>
                            {group.href ? (
                              <SiteLink
                                href={group.href}
                                onClick={() => setMobileOpen(false)}
                                className="rounded transition-colors duration-200 hover:text-primary-700 focus-visible:text-primary-700"
                              >
                                {group.title}
                              </SiteLink>
                            ) : (
                              group.title
                            )}
                          </h3>
                          <div className="mt-2 grid gap-1">
                            {group.routes.map((route) => {
                              const active = pathname === route.href;
                              return (
                                <SiteLink
                                  key={route.label}
                                  href={route.href}
                                  onClick={() => setMobileOpen(false)}
                                  aria-current={active ? 'page' : undefined}
                                  className={`flex min-h-9 cursor-pointer items-center gap-2 rounded-md px-1 text-sm transition-colors ${
                                    active ? 'font-semibold text-signal-700' : 'text-foreground-700 hover:bg-background-50 hover:text-primary-700'
                                  }`}
                                >
                                  <i className={`${route.icon} text-base ${active ? 'text-signal-600' : 'text-primary-600'}`} aria-hidden="true" />
                                  <span>{route.label}</span>
                                </SiteLink>
                              );
                            })}
                          </div>
                        </section>
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
              </div>
            </div>

            <div className="shrink-0 border-t border-background-200/70 bg-white p-4">
              <SiteLink
                href="/book-a-session"
                onClick={() => setMobileOpen(false)}
                className="cta-button flex min-h-12 w-full items-center justify-center rounded-lg bg-signal-500 px-7 text-center text-sm font-bold text-primary-950 shadow-card transition-colors hover:bg-signal-400"
              >
                Book a Session
              </SiteLink>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown + header entrance keyframes */}
      <style>{`
        @keyframes navbar-dropdown-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 1280px) {
          @keyframes navbar-dropdown-in {
            from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
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
    </header>
  );
}
