const cycle = [
  {
    title: 'Prepare',
    label: 'Role and context',
    description: 'Review responsibilities, project context, available evidence and the current energy control challenge.',
  },
  {
    title: 'Explore',
    label: 'Guided learning',
    description: 'Use live teaching, energy-sector cases, worked examples and professional discussion.',
  },
  {
    title: 'Apply',
    label: 'Workplace use',
    description: 'Use the framework or technique in an approved energy workplace context.',
  },
  {
    title: 'Evidence and reflect',
    label: 'Professional output',
    description: 'Capture the output, professional judgement, delivery impact and the next improvement action.',
  },
];

export default function TheLearningExperience() {
  return (
    <section id="sector-section-12" className="scroll-mt-44 bg-primary-950 py-16 text-white md:py-24">
      <div className="container-site">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">
            Applied energy-sector learning
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
            From live learning to
            <br />
            energy programme decisions.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/72">
            Bring real energy delivery challenges into the learning process through structured professional learning, workplace evidence, guided reflection and employer-supported improvement.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-white/16 lg:block" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cycle.map((step, index) => (
              <article
                key={step.title}
                className="relative flex min-h-[245px] flex-col rounded-lg border border-white/14 bg-white/[.07] p-5 shadow-[0_22px_55px_rgba(0,0,0,.22)] backdrop-blur"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary-950/20 bg-signal-400 text-lg font-bold text-primary-950 shadow-[0_0_0_8px_rgba(255,255,255,.06)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded-full border border-white/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[.13em] text-white/58">
                    {step.label}
                  </span>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold leading-snug text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/72">{step.description}</p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-signal-400" style={{ width: `${(index + 1) * 25}%` }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
