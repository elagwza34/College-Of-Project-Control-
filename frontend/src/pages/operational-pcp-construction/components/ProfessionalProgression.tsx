const stages = [
  ['Operational foundation', 'Emerging controls professional', ['PMO Analyst', 'Project Controls Analyst', 'Planner / Scheduler', 'Assistant Project Manager']],
  ['Operational influence', 'Controls specialist', ['Senior Planner', 'Cost Engineer', 'Project Controls Manager', 'Risk or Assurance Specialist']],
  ['Strategic influence', 'Programme controls leader', ['Programme Manager', 'Head of Planning', 'Head of Project Controls', 'PMO Manager']],
  ['Enterprise influence', 'PMO and portfolio leadership', ['PMO Director', 'Portfolio Lead', 'Programme Controls Director', 'Governance or Transformation Lead']],
];

export default function ProfessionalProgression() {
  return (
    <section id="roles" className="scroll-mt-44 bg-white py-16 md:py-24">
      <div className="container-site">
        <header className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">Professional progression</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl">
            Prepare for roles that influence delivery, not only report it.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-600">
            The pathways are aligned to increasing levels of responsibility. Progression is illustrative and is not a guarantee of promotion or professional recognition.
          </p>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {stages.map(([level, title, roles], index) => (
            <article key={title as string} className="relative rounded-lg border border-background-200 bg-background-50 p-5 shadow-sm">
              <div className="absolute -top-4 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-primary-950 text-sm font-bold text-signal-300">{index + 1}</div>
              <p className="mt-3 text-xs font-bold uppercase tracking-[.14em] text-accent-700">{level as string}</p>
              <h3 className="mt-3 text-xl font-bold text-foreground-950">{title as string}</h3>
              <ul className="mt-5 space-y-2">
                {(roles as string[]).map((role) => (
                  <li key={role} className="flex gap-2 text-sm leading-relaxed text-foreground-700">
                    <i className="ri-arrow-right-s-line mt-0.5 text-primary-600" aria-hidden="true" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
