const whyJoin = [
  { icon: 'ri-focus-3-line', title: 'Strategic Influence', description: 'Help shape decisions that influence the future direction of a growing education institution.' },
  { icon: 'ri-user-star-line', title: 'Professional Contribution', description: 'Share your expertise and experience with academic and organisational leaders.' },
  { icon: 'ri-global-line', title: 'Industry Perspective', description: 'Bring external insight from your professional sector.' },
  { icon: 'ri-building-4-line', title: 'Institutional Impact', description: 'Support the development of education that connects professional knowledge with workplace needs.' },
];

export default function WhyJoin() {
  return (
<section id="why-join" className="bg-background-50 py-16 md:py-24" aria-labelledby="why-join-title">
          <div className="container-site">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-highlight-700">Why join</span>
              <h2 id="why-join-title" className="mt-3 text-3xl font-bold text-foreground-900 md:text-4xl">Contribute your expertise where it matters</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {whyJoin.map((item) => (
                <article key={item.title} className="rounded-xl border border-background-200 bg-white p-6">
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
