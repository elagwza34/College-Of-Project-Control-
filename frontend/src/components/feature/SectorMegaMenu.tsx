import SiteLink from '@/components/base/SiteLink';
import { sectorCards } from './navMegaMenuData';

/** Desktop mega menu for the Sectors header item. */
export default function SectorMegaMenu() {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <p className="text-sm font-label font-semibold uppercase tracking-[0.12em] text-foreground-400">
          Sectors
        </p>
        <SiteLink
          href="/sectors"
          className="interactive-arrow inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          All sectors
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </SiteLink>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {sectorCards.map((sector) => (
          <SiteLink
            key={sector.href}
            href={sector.href}
            className="group flex flex-col overflow-hidden rounded-xl border border-background-200 bg-white transition-colors duration-200 hover:border-primary-300"
          >
            <img
              src={sector.image}
              alt={sector.imageAlt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <span className="flex flex-1 flex-col p-4">
              <span className="text-sm font-bold leading-snug text-foreground-950 group-hover:text-primary-800">
                {sector.label}
              </span>
              <span className="mt-1.5 text-xs leading-relaxed text-foreground-600">
                {sector.description}
              </span>
            </span>
          </SiteLink>
        ))}
      </div>
    </div>
  );
}
