const frameworks = [
  ['Project Delivery Functional Standard', 'Governance, assurance, roles and consistent delivery practice.'],
  ['Green Book and Five Case Model', 'Appraisal, business cases, options, benefits and demonstrable public value.'],
  ['Orange Book', 'Risk management embedded in governance, decisions and organisational objectives.'],
  ['Managing Public Money', 'Probity, regularity, affordability, financial discipline and responsible decisions.'],
];

export default function LearningGroundedInGovernmentDelivery() {
  return (
    <section id="governance" className="scroll-mt-44 bg-primary-950 py-16 text-white md:py-24">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">
              Learning grounded in government delivery
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.03] text-white md:text-5xl">
              Apply project capability within public-sector governance.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/72">
              Contextualise workplace learning to the frameworks, responsibilities and assurance arrangements that apply
              to the organisation.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {frameworks.map(([title, copy]) => (
              <article key={title} className="rounded-lg border border-white/12 bg-white/[.06] p-5">
                <i className="ri-government-line text-2xl text-signal-300" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/68">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
