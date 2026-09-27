const roles = [
  ['01', 'Project support', 'Project Support Officer, Project Coordinator or Junior PMO Analyst.'],
  ['02', 'Project delivery', 'Project Manager, Workstream Lead or developing delivery professional.'],
  ['03', 'Specialist controls', 'Planner, Scheduler, Cost Engineer, Risk Professional or Controls Engineer.'],
  ['04', 'Controls leadership', 'Project Controls Lead, Programme Controller or PMO Controls Manager.'],
  ['05', 'Programme leadership', 'Programme Controls Manager, Head of PMO or senior project-delivery leader.'],
];

export default function CareerProgression() {
  return (
    <section id="careers" className="scroll-mt-44 bg-white py-16 md:py-24">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">Career progression</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-foreground-950 md:text-4xl">
            Build a visible project-delivery capability pipeline.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-600">
            Develop capability from project support through specialist controls and senior programme leadership. These
            are illustrative progression opportunities, not guaranteed promotions.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {roles.map(([number, title, copy]) => (
            <article key={title} className="rounded-lg border border-background-200 bg-background-50 p-5">
              <span className="text-xs font-bold uppercase tracking-[.16em] text-accent-700">{number}</span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-foreground-950">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-600">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
