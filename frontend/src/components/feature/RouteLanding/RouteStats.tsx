interface RouteStatsProps {
  sectionLabel: string;
  heading: string;
  stats: { value: string; label: string; icon: string }[];
  description: string;
}

export default function RouteStats({ sectionLabel, heading, stats, description }: RouteStatsProps) {
  return (
    <section className="py-16 md:py-20 bg-background-50">
      <div className="container-site">
        <div className="flex items-center gap-2 mb-3 justify-center">
          <div className="w-4 h-px rounded-full" style={{ background: 'oklch(var(--primary-400) / 0.6)' }}></div>
          <span className="text-xs font-label font-semibold uppercase tracking-[0.15em] text-primary-500">{sectionLabel}</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 text-center leading-tight mb-10 md:mb-12">
          {heading}
        </h2>

        <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg border border-background-200/80 p-6 text-center card-scale-hover cursor-default">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-50 flex items-center justify-center">
                <i className={`${stat.icon} text-primary-500 text-xl`}></i>
              </div>
              <p className="text-4xl font-heading font-bold text-primary-600 mb-2">{stat.value}</p>
              <p className="text-xs text-foreground-600 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-foreground-600 text-center max-w-2xl mx-auto leading-relaxed">{description}</p>
      </div>
    </section>
  );
}