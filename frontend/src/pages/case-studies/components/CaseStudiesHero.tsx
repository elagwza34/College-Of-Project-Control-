export default function CaseStudiesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-950 pb-16 pt-36 text-white md:pb-20 md:pt-40">
      <div className="pattern-cubes-overlay pattern-cubes-overlay-dark" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary-950 via-primary-950/92 to-primary-950/72" aria-hidden="true" />
      <div className="container-site relative z-10">
        <p className="font-label text-xs font-bold uppercase tracking-[.18em] text-signal-300">Project evidence</p>
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-tight !text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-6xl">
          Case studies from project-driven environments.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed !text-white/85">
          See how professional learning, project controls discipline and workplace evidence translate into clearer decisions.
        </p>
      </div>
    </section>
  );
}
