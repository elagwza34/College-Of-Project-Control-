export default function ForEmployers() {
  return (
    <section className="hero-image-documents relative flex min-h-[90vh] items-center overflow-hidden bg-primary-700">
      <div className="pattern-cubes-overlay pattern-cubes-overlay-dark pattern-cubes-animate" style={{ opacity: 0.08 }} />
      <div className="container-site relative z-10 w-full pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-highlight-400/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-highlight-300">
            <i className="ri-file-text-line text-sm" aria-hidden="true" />
            For Employers
          </span>
          <h1 className="text-display font-extrabold leading-tight text-white">
            Employer <span className="text-signal-400">Agreement</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Complete this form to confirm your organisation&apos;s participation and agree the next steps with Kent Business College.
          </p>
        </div>
      </div>
    </section>
  );
}
