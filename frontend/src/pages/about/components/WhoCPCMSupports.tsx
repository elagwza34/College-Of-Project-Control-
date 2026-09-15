import SiteLink from '@/components/base/SiteLink';

const audiences = [
  {
    eyebrow: 'For professionals',
    title: 'Build capability you can explain and demonstrate',
    copy: 'Whether you work in planning, cost, risk, project management, PMO or governance, the aim is to strengthen current practice and make the next professional step clearer.',
    href: '/apprentices',
    cta: 'Explore professional routes',
  },
  {
    eyebrow: 'For employers',
    title: 'Develop the capability your portfolio needs',
    copy: 'Create a shared controls language, improve decision support and connect development investment to specific workplace priorities across project-driven teams.',
    href: '/employers',
    cta: 'Explore employer development',
  },
];

export default function WhoCPCMSupports() {
  return (
<section className="bg-background-50 py-16 md:py-24" aria-labelledby="audiences-title">
          <div className="container-site">
            <h2 id="audiences-title" className="sr-only">Who CPCM supports</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {audiences.map((audience, index) => (
                <article key={audience.eyebrow} className={`rounded-2xl p-7 md:p-9 ${index === 0 ? 'bg-secondary-500 text-white' : 'border border-background-200 bg-white'}`}>
                  <span className={`text-xs font-semibold uppercase tracking-[0.16em] ${index === 0 ? 'text-highlight-300' : 'text-accent-700'}`}>{audience.eyebrow}</span>
                  <h3 className={`mt-3 text-2xl font-bold md:text-3xl ${index === 0 ? 'text-white' : 'text-foreground-900'}`}>{audience.title}</h3>
                  <p className={`mt-4 text-sm leading-relaxed md:text-base ${index === 0 ? 'text-white/75' : 'text-foreground-600'}`}>{audience.copy}</p>
                  <SiteLink href={audience.href} className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${index === 0 ? 'text-highlight-300 hover:text-highlight-200' : 'text-primary-700 hover:text-primary-800'}`}>
                    {audience.cta}
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </SiteLink>
                </article>
              ))}
            </div>
          </div>
        </section>
  );
}
