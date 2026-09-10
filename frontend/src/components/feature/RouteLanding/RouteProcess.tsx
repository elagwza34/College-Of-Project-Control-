interface RouteProcessProps {
  heading: string;
  subheading: string;
  steps: { number: string; title: string; description: string }[];
}

export default function RouteProcess({ heading, subheading, steps }: RouteProcessProps) {
  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, oklch(var(--primary-900)), oklch(var(--primary-950)))' }}
    >
      <div className="pattern-cubes-overlay pattern-cubes-overlay-dark pattern-cubes-animate" style={{ opacity: 0.06 }}></div>

      <div className="container-site relative z-10">
        <div className="flex items-center gap-2 mb-3 justify-center">
          <div className="w-4 h-px rounded-full bg-highlight-400/60"></div>
          <span className="text-xs font-label font-semibold uppercase tracking-[0.15em] text-highlight-400">The Strategic Process</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-heading font-bold text-background-50 text-center leading-tight mb-3">
          {heading}
        </h2>
        <p className="text-sm text-background-50/70 text-center max-w-xl mx-auto mb-10 md:mb-14">{subheading}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
          {steps.map((step, i) => (
            <div key={step.number} className="relative bg-background-50/6 backdrop-blur-sm border border-background-50/10 rounded-xl p-6 flex flex-col">
              <span className="text-6xl font-heading font-bold text-background-50/10 absolute top-4 right-5 leading-none select-none">
                {i + 1}
              </span>
              <div className="relative z-1">
                <div className="w-10 h-10 rounded-lg bg-highlight-500/20 border border-highlight-400/30 flex items-center justify-center mb-4">
                  <span className="text-sm font-heading font-bold text-highlight-400">{step.number}</span>
                </div>
                <h3 className="text-base font-label font-semibold text-background-50 mb-2">{step.title}</h3>
                <p className="text-xs text-background-50/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-center mt-6">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-highlight-500/60"></div>
            <div className="w-16 h-px bg-background-50/15"></div>
            <div className="w-2 h-2 rounded-full bg-highlight-500/60"></div>
            <div className="w-16 h-px bg-background-50/15"></div>
            <div className="w-2 h-2 rounded-full bg-highlight-500/60"></div>
          </div>
        </div>
      </div>
    </section>
  );
}