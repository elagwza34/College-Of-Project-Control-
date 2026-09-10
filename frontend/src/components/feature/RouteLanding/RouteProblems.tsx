interface RouteProblemsProps {
  sectionLabel: string;
  heading: string;
  cards: { icon: string; title: string; description: string }[];
}

export default function RouteProblems({ sectionLabel, heading, cards }: RouteProblemsProps) {
  return (
    <section className="py-16 md:py-20 bg-background-50">
      <div className="container-site">
        <div className="flex items-center gap-2 mb-3 justify-center">
          <div className="w-4 h-px rounded-full" style={{ background: 'oklch(var(--primary-400) / 0.6)' }}></div>
          <span className="text-xs font-label font-semibold uppercase tracking-[0.15em] text-primary-500">{sectionLabel}</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 text-center leading-tight mb-10 md:mb-14 max-w-2xl mx-auto">
          {heading}
        </h2>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {cards.map((card) => (
            <div key={card.title} className="bg-white rounded-lg border border-background-200/80 p-5 card-scale-hover cursor-default">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <i className={`${card.icon} text-primary-500 text-lg`}></i>
                </div>
                <div>
                  <h3 className="text-sm font-label font-semibold text-foreground-900 mb-1">{card.title}</h3>
                  <p className="text-xs text-foreground-600 leading-relaxed">{card.description}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="md:col-span-2 bg-white rounded-lg border border-background-200/80 p-6 card-scale-hover cursor-default">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-400"></div>
              <span className="text-xs font-label font-semibold text-foreground-700 uppercase tracking-wider">
                From Reporting Activity to Decision Confidence
              </span>
            </div>
            <div className="relative h-24 flex items-end">
              <div className="flex flex-col justify-between h-full pr-3 text-sm text-foreground-400 font-label">
                <span>High</span>
                <span>Mid</span>
                <span>Low</span>
              </div>
              <div className="flex-1 relative h-full">
                <div className="absolute inset-0 flex flex-col justify-between">
                  <div className="border-t border-background-200/40 w-full"></div>
                  <div className="border-t border-background-200/40 w-full"></div>
                  <div className="border-t border-background-200/40 w-full"></div>
                </div>
                <svg className="absolute inset-0" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <polyline points="0,70 80,60 160,55 240,45 320,35 400,30" fill="none" stroke="oklch(var(--primary-500) / 0.8)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="absolute inset-0" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <polyline points="0,75 80,68 160,58 240,50 320,40 400,28" fill="none" stroke="oklch(var(--highlight-500) / 0.8)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="absolute inset-0" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <polyline points="0,80 80,75 160,65 240,52 320,42 400,25" fill="none" stroke="oklch(var(--secondary-500) / 0.6)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 3" />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded-full" style={{ background: 'oklch(var(--primary-500) / 0.8)' }}></div>
                <span className="text-sm text-foreground-600 font-label">PMO Maturity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded-full" style={{ background: 'oklch(var(--highlight-500) / 0.8)' }}></div>
                <span className="text-sm text-foreground-600 font-label">Governance Confidence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded-full" style={{ background: 'oklch(var(--secondary-500) / 0.6)' }}></div>
                <span className="text-sm text-foreground-600 font-label">Strategic Decision Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}