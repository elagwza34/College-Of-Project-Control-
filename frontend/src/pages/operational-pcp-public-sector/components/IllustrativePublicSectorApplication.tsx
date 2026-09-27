const scenario = [
  ['Challenge', 'Milestones, dependencies, risks and supplier updates arrive in different formats.'],
  ['Workplace application', 'Establish common data definitions, a controlled reporting cycle and clear ownership.'],
  ['Governance improvement', 'Link schedule, cost, risk and change to the approved baseline in board papers.'],
  ['Organisational value', 'Aim for earlier warning, clearer accountabilities and repeatable internal controls.'],
  ['Workplace evidence', 'Record applied activity, assignments, reflection and employer feedback.'],
];

export default function IllustrativePublicSectorApplication() {
  return (
    <section id="workplace-evidence" className="scroll-mt-44 bg-white py-16 md:py-24">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">Illustrative public-sector application</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-foreground-950 md:text-5xl">
              From fragmented reporting to defensible programme oversight.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              An illustrative workplace scenario showing how project-controls practice can be applied without claiming a
              guaranteed learner outcome.
            </p>
          </div>

          <div className="rounded-lg border border-background-200 bg-background-50 p-4 md:p-5">
            <div className="space-y-3">
              {scenario.map(([title, copy], index) => (
                <article key={title} className="flex gap-4 rounded-lg border border-background-200 bg-white p-5 shadow-sm">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-50 text-xs font-bold text-accent-800">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground-950">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-600">{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
