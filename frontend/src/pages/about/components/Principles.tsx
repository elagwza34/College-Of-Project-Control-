const principles = [
  {
    icon: 'ri-briefcase-4-line',
    title: 'Work before theory',
    description: 'Learning is connected to real responsibilities, live project information and the decisions professionals are expected to support.',
  },
  {
    icon: 'ri-focus-3-line',
    title: 'Clarity before complexity',
    description: 'We organise controls, governance and management concepts so professionals can explain what matters and act with confidence.',
  },
  {
    icon: 'ri-file-shield-2-line',
    title: 'Evidence before claims',
    description: 'Progress is grounded in applied work and credible evidence. Outcomes, funding and recognition are described with clear limits.',
  },
];

export default function Principles() {
  return (
<section className="bg-background-50 py-16 md:py-24" aria-labelledby="principles-title">
          <div className="container-site">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-highlight-700">Our point of view</span>
              <h2 id="principles-title" className="mt-3 text-3xl font-bold text-foreground-900 md:text-4xl">Professional development should change the work</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {principles.map((principle) => (
                <article key={principle.title} className="card-premium p-6 md:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white" aria-hidden="true">
                    <i className={`${principle.icon} text-xl`} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-foreground-900">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-600">{principle.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
  );
}
