const principles = [
  { icon: 'ri-shield-star-line', title: 'Integrity', description: 'Making decisions with transparency and responsibility.' },
  { icon: 'ri-compass-3-line', title: 'Independence', description: 'Providing objective advice and constructive challenge.' },
  { icon: 'ri-award-line', title: 'Excellence', description: 'Supporting high standards across education and operations.' },
  { icon: 'ri-team-line', title: 'Collaboration', description: 'Working with leadership teams to achieve shared goals.' },
];

export default function OurApproach() {
  return (
<section id="principles" className="bg-white py-16 md:py-24" aria-labelledby="principles-title">
          <div className="container-site">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-highlight-700">Our approach</span>
              <h2 id="principles-title" className="mt-3 text-3xl font-bold text-foreground-900 md:text-4xl">Our approach to governance</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {principles.map((item) => (
                <article key={item.title} className="rounded-xl border border-background-200 bg-background-50 p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white" aria-hidden="true">
                    <i className={`${item.icon} text-xl`} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foreground-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
  );
}
