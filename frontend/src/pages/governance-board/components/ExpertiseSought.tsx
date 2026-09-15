const expertiseAreas = [
  { icon: 'ri-government-line', title: 'Governance & Leadership', description: 'Experience in board-level governance, strategic leadership and institutional oversight.' },
  { icon: 'ri-file-chart-line', title: 'Finance & Audit', description: 'Experience in financial management, audit processes, investment strategy and financial responsibility.' },
  { icon: 'ri-shield-check-line', title: 'Risk & Compliance', description: 'Knowledge of risk frameworks, regulatory requirements and organisational resilience.' },
  { icon: 'ri-graduation-cap-line', title: 'Higher Education', description: 'Understanding of academic environments, educational policy and learner experience.' },
  { icon: 'ri-scales-line', title: 'Legal Affairs', description: 'Experience related to contracts, employment law and governance frameworks.' },
  { icon: 'ri-line-chart-line', title: 'Strategic Development', description: 'Experience in transformation, organisational development and long-term strategy.' },
];

export default function ExpertiseSought() {
  return (
<section id="expertise" className="bg-white py-16 md:py-24" aria-labelledby="expertise-title">
          <div className="container-site">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-highlight-700">Expertise sought</span>
              <h2 id="expertise-title" className="mt-3 text-3xl font-bold text-foreground-900 md:text-4xl">We welcome expertise across key areas of governance</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {expertiseAreas.map((item) => (
                <article key={item.title} className="card-premium p-6">
                  <i className={`${item.icon} text-2xl text-primary-600`} aria-hidden="true" />
                  <h3 className="mt-4 text-base font-bold text-foreground-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
  );
}
