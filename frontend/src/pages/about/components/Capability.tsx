const capabilityAreas = [
  { icon: 'ri-calendar-check-line', title: 'Planning & scheduling', copy: 'Build credible plans, understand dependencies and communicate delivery confidence.' },
  { icon: 'ri-money-pound-circle-line', title: 'Cost & forecasting', copy: 'Interpret movement, variance and forecast information behind commercial decisions.' },
  { icon: 'ri-shield-check-line', title: 'Risk & assurance', copy: 'Strengthen ownership, escalation and evidence for proportionate assurance.' },
  { icon: 'ri-git-merge-line', title: 'Change & integration', copy: 'Connect scope, time, cost and risk so change is evaluated as one delivery picture.' },
  { icon: 'ri-dashboard-3-line', title: 'PMO & governance', copy: 'Turn reporting into concise governance insight and clear decision requests.' },
  { icon: 'ri-team-line', title: 'Leadership & communication', copy: 'Influence stakeholders and translate technical controls into useful business language.' },
];

export default function Capability() {
  return (
<section className="bg-primary-500 py-16 text-white md:py-24" aria-labelledby="capability-title">
          <div className="container-site">
            <div className="mb-12 max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-highlight-300">Our specialist focus</span>
              <h2 id="capability-title" className="mt-3 text-3xl font-bold text-white md:text-4xl">One connected view of project performance</h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">The disciplines reinforce one another. Development is organised to help professionals see those connections and communicate the complete delivery position.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilityAreas.map((area) => (
                <article key={area.title} className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <i className={`${area.icon} text-2xl text-highlight-300`} aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-white">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{area.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
  );
}
