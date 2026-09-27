const steps = [
  ['Capability review', 'Discuss roles, organisational priorities and target capability.'],
  ['Eligibility and prior learning', 'Review the employee, workplace, existing knowledge and funding route.'],
  ['Enrolment and learning plan', 'Agree responsibilities, support, development goals and evidence opportunities.'],
  ['Applied development', 'Live online sessions, coaching, workplace application and progress reviews.'],
  ['Gateway and EPA', 'Review occupational competence, required evidence and readiness for assessment.'],
];

export default function EmployerJourney() {
  return (
    <section id="delivery" className="scroll-mt-44 bg-background-100 py-16 md:py-24">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">Employer journey</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-foreground-950 md:text-4xl">
              Learn, apply, assure and evidence.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              The employer, learner and College agree the development need, learning plan, responsibilities and evidence
              approach before enrolment.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-6 hidden h-[calc(100%-3rem)] w-px bg-accent-500/35 md:block" aria-hidden="true" />
            <div className="space-y-4">
              {steps.map(([title, copy], index) => (
                <article key={title} className="relative grid gap-4 rounded-lg border border-background-200 bg-white p-5 shadow-sm md:grid-cols-[56px_minmax(0,1fr)]">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary-950 text-xs font-bold text-signal-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground-950">{title}</h3>
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
