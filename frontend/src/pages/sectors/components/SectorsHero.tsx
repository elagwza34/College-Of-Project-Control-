/** Section: Sectors hero. */
export default function SectorsHero() {
  return (
    <section className="bg-foreground-950 py-20 md:py-28" aria-labelledby="sectors-hero-heading">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-signal-300">
            Project-driven sectors
          </p>
          <h1
            id="sectors-hero-heading"
            className="mt-4 font-heading text-4xl font-bold leading-tight text-white md:text-5xl"
          >
            Sector routes for project controls
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
            The same Level 6 occupational standard, applied to the planning, cost, risk and
            governance pressures that are specific to your sector. Each route keeps the same
            programme facts and the same assessment.
          </p>
        </div>
      </div>
    </section>
  );
}
