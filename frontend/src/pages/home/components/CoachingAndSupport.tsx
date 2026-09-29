const supportAreas = [
  {
    title: 'Academic guidance',
    copy: 'Get help understanding programme expectations, learning activities and areas that need further development.',
    icon: 'ri-book-open-line',
  },
  {
    title: 'Workplace evidence',
    copy: 'Build relevant evidence that reflects your responsibilities and the capability you are developing.',
    icon: 'ri-file-list-3-line',
  },
  {
    title: 'Progress planning',
    copy: 'Review your progress, identify priorities and keep development aligned with programme expectations.',
    icon: 'ri-compass-3-line',
  },
  {
    title: 'Professional development',
    copy: 'Connect your learning with wider professional goals and future development.',
    icon: 'ri-user-star-line',
  },
];

/** Section: Coaching and support. */
export default function CoachingAndSupport() {
  return (
    <section id="coaching-support" className="bg-white py-16 md:py-24" aria-labelledby="coaching-support-heading">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-accent-700">Coaching & support</p>
          <h2 id="coaching-support-heading" className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground-950 md:text-5xl">
            Support throughout your development
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-600 md:text-lg">
            Programme support connects learning, workplace application, evidence development and your next steps.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {supportAreas.map((area) => (
            <article key={area.title} className="rounded-xl border border-background-200 bg-background-50 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                <i className={`${area.icon} text-xl`} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground-950">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-600">{area.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
