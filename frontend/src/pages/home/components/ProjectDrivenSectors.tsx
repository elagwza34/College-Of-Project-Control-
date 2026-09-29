import SiteLink from '@/components/base/SiteLink';

const sectors = [
  {
    title: 'Construction & Infrastructure',
    description: 'Planning, controls, cost, contracts and risk across complex capital and infrastructure delivery.',
    href: '/project-controls-professional/construction-route',
    image: '/images/construction-sector-hero.webp',
    alt: 'Construction and infrastructure project environment',
  },
  {
    title: 'Engineering & Manufacturing',
    description: 'Integration, scheduling, cost and performance control across engineering and manufacturing environments.',
    href: '/project-controls-professional/engineering-manufacturing-aerospace-route',
    image: '/images/engineering-sector-hero.webp',
    alt: 'Engineering and manufacturing project environment',
  },
  {
    title: 'Public Sector',
    description: 'Governance, assurance, planning and accountable delivery across public programmes and projects.',
    href: '/project-controls-professional/public-sector-councils-route',
    image: '/images/public-sector-sector-hero.webp',
    alt: 'Public sector project delivery environment',
  },
  {
    title: 'Energy & Utilities',
    description: 'Planning, cost, risk and integrated controls across complex assets, programmes and operational environments.',
    href: '/project-controls-professional/energy-oil-gas-utilities-route',
    image: '/images/energy-sector-hero.jpg',
    alt: 'Energy and utilities project environment',
  },
];

export default function ProjectDrivenSectors() {
  return (
    <section id="sectors" className="bg-background-50 py-16 md:py-24" aria-labelledby="project-driven-sectors-heading">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-accent-700">Project-driven sectors</p>
          <h2
            id="project-driven-sectors-heading"
            className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground-950 md:text-5xl"
          >
            Built for complex project environments
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-600 md:text-lg">
            Apply project-controls capability where planning, cost, risk, governance and delivery performance matter.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {sectors.map((sector) => (
            <article key={sector.title} className="flex h-full flex-col overflow-hidden rounded-xl border border-background-200 bg-white shadow-sm">
              <img
                src={sector.image}
                alt={sector.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-xl font-bold leading-tight text-foreground-950">{sector.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-600">{sector.description}</p>
                <SiteLink
                  href={sector.href}
                  className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-primary-200 px-4 text-sm font-bold text-primary-900 transition-colors hover:border-primary-600 hover:bg-primary-50"
                >
                  Explore this sector
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-foreground-600">
          Sector context helps illustrate how Project Controls capability can be applied. Programme suitability depends on the
          learner&apos;s actual role, responsibilities, prior learning and workplace development opportunities.
        </p>
      </div>
    </section>
  );
}
