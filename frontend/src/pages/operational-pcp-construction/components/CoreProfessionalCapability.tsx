const workflow = ['Plan', 'Analyse', 'Forecast', 'Challenge', 'Recommend', 'Govern'];

export default function CoreProfessionalCapability() {
  return (
    <section id="ai" className="scroll-mt-44 bg-primary-950 py-16 text-white md:py-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_430px]">
        <div>
          <span className="text-xs font-bold uppercase tracking-[.15em] text-signal-300">Core professional capability</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            AI accelerates the work. Human judgement remains accountable.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/76">
            AI in Project Controls develops responsible use of AI across planning, scheduling, earned value, risk analysis, reporting, assurance and management information without removing professional review, confidentiality or decision accountability.
          </p>
          <p className="mt-4 max-w-3xl rounded-lg border border-white/12 bg-white/8 p-4 text-sm leading-relaxed text-white/72">
            Partnership model: the specialist certificate is owned and strongly supported by the Institute of Project Controls and delivered through Kent Business College. Final awarding arrangements are confirmed within the learner agreement.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Validated data', 'Bounded workflow', 'Human approval'].map((item) => (
              <div key={item} className="rounded-lg border border-white/15 bg-white/8 p-4">
                <i className="ri-checkbox-circle-line text-2xl text-signal-300" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/15 bg-white/8 p-5 shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-signal-300">AI control workflow</p>
          <div className="mt-5 grid gap-3">
            {workflow.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-md bg-white/10 p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-signal-400 text-sm font-bold text-primary-950">{index + 1}</span>
                <span className="font-semibold">{step}</span>
                <span className="ml-auto text-xs font-bold uppercase tracking-[.12em] text-white/45">{index < workflow.length - 1 ? 'next' : 'approve'}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-md bg-signal-400 p-4 text-primary-950">
            <p className="text-sm font-bold">Human professional judgement remains in the loop.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
