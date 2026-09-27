const environments = [
  {
    title: 'Advanced manufacturing',
    summary: 'Production systems, automation and digital operations.',
    points: ['Industrialisation', 'Supplier readiness'],
    icon: 'ri-settings-3-line',
  },
  {
    title: 'Aerospace and defence',
    summary: 'High-integrity products, systems and assurance.',
    points: ['Configuration control', 'Verification gates'],
    icon: 'ri-plane-line',
  },
  {
    title: 'Future mobility',
    summary: 'Vehicle platforms, electrification and launch readiness.',
    points: ['Validation schedules', 'Launch control'],
    icon: 'ri-roadster-line',
  },
  {
    title: 'Rail and transport',
    summary: 'Rolling stock, signalling, fleets and operating assets.',
    points: ['Interface control', 'Commissioning plans'],
    icon: 'ri-train-line',
  },
  {
    title: 'Capital equipment',
    summary: 'Machinery, automation and engineered asset delivery.',
    points: ['Fabrication control', 'Handover readiness'],
    icon: 'ri-tools-line',
  },
];

export default function OneProfessionalFoundationAcrossComplexEngineeringEnvironments() {
  return (
    <section id="applications" className="scroll-mt-44 bg-background-100 py-16 md:py-20">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">
              Sector application
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl">
              One foundation for complex engineering environments.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              The same control discipline adapts across design, production, suppliers, testing and readiness decisions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {environments.map((environment) => (
              <article
                key={environment.title}
                className="rounded-lg border border-background-200 bg-white p-5 shadow-[0_14px_35px_rgba(2,20,28,.06)]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-950 text-xl text-signal-300">
                    <i className={environment.icon} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-snug text-foreground-950">{environment.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-600">{environment.summary}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {environment.points.map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-background-200 bg-background-50 px-3 py-1 text-xs font-semibold text-foreground-700"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
