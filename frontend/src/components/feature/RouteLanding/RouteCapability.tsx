interface RouteCapabilityProps {
  sectionLabel: string;
  heading: string;
  description: string;
  features: { icon: string; title: string; description: string }[];
}

export default function RouteCapability({ sectionLabel, heading, description, features }: RouteCapabilityProps) {
  return (
    <section className="py-16 md:py-20 bg-background-50">
      <div className="container-site">
        <div className="bg-white rounded-xl border border-background-200/80 p-8 md:p-12 max-w-[1100px] mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-px rounded-full" style={{ background: 'oklch(var(--primary-400) / 0.6)' }}></div>
            <span className="text-xs font-label font-semibold uppercase tracking-[0.15em] text-primary-500">{sectionLabel}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            <div className="lg:w-[420px] shrink-0">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 leading-tight">{heading}</h2>
            </div>

            <div className="flex-1">
              <p className="text-sm text-foreground-600 leading-relaxed mb-8">{description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {features.map((f) => (
                  <div key={f.title} className="group">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
                      <i className={`${f.icon} text-primary-600 text-lg`}></i>
                    </div>
                    <h3 className="text-sm font-label font-semibold text-foreground-900 mb-1.5">{f.title}</h3>
                    <p className="text-xs text-foreground-600 leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}