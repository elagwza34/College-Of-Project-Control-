import SiteLink from '@/components/base/SiteLink';
import { pathwayCards } from './navMegaMenuData';

/** Desktop mega menu for the Pathways header item. */
export default function PathwayMegaMenu() {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <p className="text-sm font-label font-semibold uppercase tracking-[0.12em] text-foreground-400">
          Level 6 pathways
        </p>
        <SiteLink
          href="/project-controls-professional-level-6"
          className="interactive-arrow inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          All pathways
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </SiteLink>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {pathwayCards.map((pathway) => (
          <SiteLink
            key={pathway.href}
            href={pathway.href}
            className="group flex flex-col gap-2 rounded-xl border border-background-200 bg-white p-4 transition-colors duration-200 hover:border-primary-300"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
              <i className={`${pathway.icon} text-lg text-primary-600`} aria-hidden="true" />
            </span>
            <span className="text-sm font-bold leading-snug text-foreground-950 group-hover:text-primary-800">
              {pathway.label}
            </span>
            <span className="text-xs leading-relaxed text-foreground-600">
              {pathway.description}
            </span>
          </SiteLink>
        ))}
      </div>
    </div>
  );
}
