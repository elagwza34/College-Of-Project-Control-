import SiteLink from '@/components/base/SiteLink';
interface RouteChooseProps {
  heading: string;
  routes: {
    title: string;
    badge: string;
    description: string;
    cta: string;
    ctaHref: string;
    highlighted?: boolean;
  }[];
}

export default function RouteChoose({ heading, routes }: RouteChooseProps) {
  return (
    <section className="py-16 md:py-20 bg-background-50">
      <div className="container-site">
        <div className="flex items-center gap-2 mb-3 justify-center">
          <div className="w-4 h-px rounded-full" style={{ background: 'oklch(var(--primary-400) / 0.6)' }}></div>
          <span className="text-xs font-label font-semibold uppercase tracking-[0.15em] text-primary-500">Access Routes</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 text-center leading-tight mb-10 md:mb-12">
          {heading}
        </h2>

        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {routes.map((route) => (
            <div
              key={route.title}
              className={`relative bg-white rounded-xl overflow-hidden card-scale-hover cursor-default ${
                route.highlighted ? '' : 'border border-background-200/80'
              }`}
              style={route.highlighted ? { border: '2px solid oklch(var(--highlight-500) / 0.5)' } : undefined}
            >
              {route.highlighted && (
                <div className="flex items-center justify-center gap-2 bg-highlight-500 px-4 py-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary-950/40"></div>
                  <span className="text-xs font-label font-bold text-secondary-950 uppercase tracking-wider">{route.badge}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary-950/40"></div>
                </div>
              )}

              <div className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-50 flex items-center justify-center">
                  <i className={`${route.highlighted ? 'ri-government-line' : 'ri-briefcase-4-line'} text-primary-600 text-2xl`}></i>
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground-950 mb-3">{route.title}</h3>
                {!route.highlighted && (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-50 border border-primary-200/50 text-xs font-label font-semibold text-primary-700 uppercase tracking-wider mb-3">
                    {route.badge}
                  </span>
                )}
                <p className="text-sm text-foreground-600 leading-relaxed mb-6">{route.description}</p>
                <SiteLink
                  href={route.ctaHref}
                  className={`inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-md cursor-pointer transition-colors whitespace-nowrap ${
                    route.highlighted
                      ? 'bg-highlight-500 text-secondary-950 hover:bg-highlight-600'
                      : 'border border-primary-400/50 text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  {route.cta}
                  <i className="ri-arrow-right-line"></i>
                </SiteLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}