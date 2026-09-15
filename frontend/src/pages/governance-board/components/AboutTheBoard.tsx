const pillars = [
  { icon: 'ri-award-line', title: 'Academic Excellence', description: 'Supporting quality education and learner outcomes.' },
  { icon: 'ri-compass-3-line', title: 'Strategic Direction', description: 'Providing insight into institutional growth and development.' },
  { icon: 'ri-shield-check-line', title: 'Integrity and Accountability', description: 'Supporting strong governance standards and responsible decision making.' },
  { icon: 'ri-seedling-line', title: 'Sustainable Growth', description: 'Helping guide long-term organisational sustainability.' },
];

export default function AboutTheBoard() {
  return (
<section id="about" className="bg-white py-16 md:py-24" aria-labelledby="about-title">
          <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">About the Board</span>
              <h2 id="about-title" className="mt-3 text-3xl font-bold text-foreground-900 md:text-4xl">A strategic body supporting institutional excellence</h2>
              <p className="mt-5 text-base leading-relaxed text-foreground-600">
                The Governance Board serves as the principal strategic oversight body of Kent Business College.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground-600">Members provide independent advice and oversight to support:</p>
              <ul className="mt-4 space-y-2.5">
                {['Academic standards', 'Institutional integrity', 'Strategic development', 'Financial sustainability', 'Risk management', 'Long-term organisational direction'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground-700">
                    <i className="ri-checkbox-circle-line mt-0.5 flex-shrink-0 text-base text-primary-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="card-premium p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500 text-white" aria-hidden="true">
                    <i className={`${pillar.icon} text-lg`} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foreground-900">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
  );
}
