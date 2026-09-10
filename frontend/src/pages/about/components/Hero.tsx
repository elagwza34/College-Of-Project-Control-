import SiteLink from '@/components/base/SiteLink';

export default function Hero() {
  return (
<section className="hero-align-left relative isolate flex min-h-[90vh] items-center overflow-hidden bg-primary-500 pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <img loading="lazy" decoding="async"
            src="https://images.pexels.com/photos/6285078/pexels-photo-6285078.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Project controls professionals collaborating around project information"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = '/images/hero-professional.webp';
            }}
          />
          <div className="hero-contrast-overlay absolute inset-0 -z-10" />
          <div className="container-site">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-highlight-400/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-highlight-300">
                About CPCM
              </span>
              <h1 className="mt-6 max-w-3xl text-display font-extrabold text-white">
                A specialist college for the people behind confident project delivery
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                The College of Project Controls &amp; Management brings project controls, project management and PMO development into one coherent professional environment—built around workplace application, sound judgement and credible evidence.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <SiteLink href="/programmes" className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold transition-colors">
                  Explore programmes
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
                <SiteLink href="/contact" className="inline-flex items-center justify-center rounded-lg border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  Speak with an adviser
                </SiteLink>
              </div>
            </div>
          </div>
        </section>
  );
}
