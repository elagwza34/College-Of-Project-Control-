import SiteLink from '@/components/base/SiteLink';
interface PageSectionNavProps {
  pageLabel: string;
  links: { label: string; href: string }[];
  ctaHref?: string;
  ctaLabel?: string;
  showCta?: boolean;
}

export default function PageSectionNav({
  pageLabel,
  links,
  ctaHref = '/book-a-session',
  ctaLabel = 'Request a consultation',
  showCta = true,
}: PageSectionNavProps) {
  return (
    <nav
      className="sticky top-[112px] z-40 border-b border-background-200 bg-white/95 shadow-card backdrop-blur-xl"
      aria-label={`${pageLabel} page sections`}
    >
      <div className="container-site flex h-14 items-center gap-4">
        <SiteLink
          href="#hero"
          className="hidden shrink-0 items-center gap-2 border-r border-background-200 pr-4 text-xs font-bold uppercase tracking-[0.12em] text-primary-700 lg:flex"
        >
          <span className="h-2 w-2 rounded-full bg-signal-500" aria-hidden="true" />
          {pageLabel}
        </SiteLink>

        <div className="scrollbar-hide min-w-0 flex-1 overflow-x-auto">
          <div className="flex w-max items-center gap-1">
            {links.map((link) => (
              <SiteLink
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="rounded-md px-3 py-2 text-xs font-semibold text-foreground-600 transition-all hover:bg-accent-50 hover:text-primary-700 focus-visible:bg-accent-50 md:text-sm"
              >
                {link.label}
              </SiteLink>
            ))}
          </div>
        </div>

        {showCta && <SiteLink
          href={ctaHref}
          className="btn-primary hidden shrink-0 items-center gap-2 px-4 py-2.5 text-xs font-bold md:inline-flex"
        >
          {ctaLabel}
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </SiteLink>}
      </div>
    </nav>
  );
}
