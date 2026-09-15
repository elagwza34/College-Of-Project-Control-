import type { ArticleLayoutProps } from '../ArticleLayout';

type Props = Required<Pick<ArticleLayoutProps, 'meta' | 'heroImageUrl' | 'heroHeadline' | 'heroSubheadline'>>;

export default function ArticleIntroduction({ meta, heroImageUrl, heroHeadline, heroSubheadline }: Props) {
  return (<section className="hero-align-left relative w-full min-h-[90vh] flex items-center overflow-hidden">
          <img
            src={heroImageUrl}
            alt=""
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = '/images/hero-professional.webp';
            }}
          />
          <div className="hero-contrast-overlay absolute inset-0"></div>
          <div className="relative w-full container-site py-16 md:py-20">
            <span className="mb-4 inline-block rounded-full border border-signal-400/55 bg-signal-500/10 px-3 py-1 text-xs font-label font-semibold uppercase tracking-wider text-signal-300">
              {meta.category}
            </span>
            <h1 className="text-display font-heading font-bold text-background-50 leading-tight max-w-4xl">
              {heroHeadline}
            </h1>
            <p className="mt-4 md:mt-5 text-sm md:text-lg text-background-50/70 max-w-3xl leading-relaxed">
              {heroSubheadline}
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs text-background-50/70">
              <span className="flex items-center gap-1.5">
                <i className="ri-time-line"></i>
                {meta.readTime}
              </span>
              <span>·</span>
              <img loading="lazy" decoding="async"
                src="https://storage.readdy-site.link/project_files/2c065606-36c7-4cac-81e4-2edb67f93f84/d2ef7095-693a-4784-87e8-224835456a02_compressed_ChatGPT-Image-Jun-25-2026-07_04_12-PM.webp"
                alt="College of Project Controls"
                className="h-4 w-auto object-contain"
              />
            </div>
          </div>
        </section>);
}
