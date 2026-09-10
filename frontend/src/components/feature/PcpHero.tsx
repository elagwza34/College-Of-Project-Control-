import SiteLink from '@/components/base/SiteLink';
interface PcpHeroProps {
  tag?: string;
  headline: string;
  headlineHighlight?: string;
  subheadline: string;
  description?: string;
  fundingLine?: string;
  heroImageUrl: string;
  heroImageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryCta?: { label: string; href: string };
  badges?: { icon: string; text: string }[];
  urgencyMessage?: string;
  sectors?: string[];
  bestFor?: string[];
}

export default function PcpHero({
  tag,
  headline,
  headlineHighlight,
  subheadline,
  description,
  fundingLine,
  heroImageUrl,
  heroImageAlt,
  primaryCta,
  secondaryCta,
  tertiaryCta,
  badges,
  urgencyMessage,
  sectors,
  bestFor,
}: PcpHeroProps) {
  const highlightIndex = headlineHighlight
    ? headline.toLowerCase().indexOf(headlineHighlight.toLowerCase())
    : -1;
  const renderedHeadline = highlightIndex === -1 ? headline : <>
    {headline.slice(0, highlightIndex)}
    <span className="text-signal-400">{headline.slice(highlightIndex, highlightIndex + headlineHighlight!.length)}</span>
    {headline.slice(highlightIndex + headlineHighlight!.length)}
  </>;

  return (
    <section className="hero-align-left relative w-full min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImageUrl}
          alt={heroImageAlt}
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = '/images/hero-professional.webp';
          }}
        />
        <div className="hero-contrast-overlay absolute inset-0"></div>
      </div>

      <div className="relative z-10 w-full container-site py-20 md:py-24">
        <div className="max-w-4xl">
          {tag && (
            <span className="mb-6 inline-block rounded-full border border-signal-400/55 bg-signal-500/10 px-4 py-1.5 text-xs font-label font-semibold uppercase tracking-wider text-signal-300">
              {tag}
            </span>
          )}
          <h1 className="text-display font-heading font-bold text-background-50 leading-tight">
            {renderedHeadline}
          </h1>
          <p className="mt-4 text-lg font-heading font-semibold text-signal-400 md:text-xl">
            {subheadline}
          </p>
          {description && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-background-50/70 md:text-base">
              {description}
            </p>
          )}
          {fundingLine && (
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-background-50/70 md:text-sm">
              {fundingLine}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SiteLink
              href={primaryCta.href}
              className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm font-bold transition-all duration-200 whitespace-nowrap"
            >
              {primaryCta.label}
              <i className="ri-arrow-right-line ml-2"></i>
            </SiteLink>
            {secondaryCta && (
              <SiteLink
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-md border border-white/55 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-signal-400 hover:bg-background-50/10 whitespace-nowrap"
              >
                {secondaryCta.label}
              </SiteLink>
            )}
            {tertiaryCta && (
              <SiteLink
                href={tertiaryCta.href}
                className="inline-flex items-center justify-center px-6 py-3 border border-background-50/30 text-background-50 font-semibold text-sm rounded-md cursor-pointer hover:bg-background-50/10 transition-all duration-200 whitespace-nowrap"
              >
                {tertiaryCta.label}
              </SiteLink>
            )}
          </div>

          {badges && (
            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span key={badge.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-700/60 border border-background-50/10 rounded-full text-xs text-background-50/80 whitespace-nowrap">
                  <i className={`${badge.icon} text-highlight-400 text-xs`}></i>
                  {badge.text}
                </span>
              ))}
            </div>
          )}

          {bestFor && (
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs text-background-50/70 font-label uppercase tracking-wider mr-2 self-center">Best for:</span>
              {bestFor.map((role) => (
                <span key={role} className="px-2.5 py-1 bg-secondary-700/40 border border-background-50/10 rounded-full text-xs text-background-50/70 whitespace-nowrap">{role}</span>
              ))}
            </div>
          )}

          {sectors && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-background-50/70 font-label uppercase tracking-wider mr-2 self-center">Best sectors:</span>
              {sectors.map((s) => (
                <span key={s} className="px-2.5 py-1 bg-primary-700/30 border border-background-50/10 rounded-full text-xs text-highlight-300/80 whitespace-nowrap">{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {urgencyMessage && (
        <div className="absolute bottom-0 left-0 right-0 bg-signal-500/95">
          <div className="container-site py-3">
            <p className="text-center text-sm font-semibold text-secondary-950">
              {urgencyMessage}
              <span className="block text-xs font-normal mt-0.5 text-secondary-800">
                Kent Business College provides additional funded support for eligible learners, but places are limited and subject to availability. Early application is recommended.
              </span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
