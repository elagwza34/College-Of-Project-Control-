import SiteLink from '@/components/base/SiteLink';
import { useRef, useState } from 'react';

interface SectorHeroProps {
  badge: string;
  headline: string;
  headlineHighlight?: string;
  subheadline: string;
  description: string;
  fundingLine: string;
  primaryCta: string;
  secondaryCta: string;
  commercialLink?: string;
  trustItems: { icon: string; text: string }[];
  sectorImage: string;
  sectorLabel: string;
  accentColor?: string;
  metrics: {
    governance: string;
    pmoMaturity: string;
    risk: string;
    forecast: string;
    decision: string;
    chartLabel: string;
    chartValue: string;
    chartBars: number[];
  };
}

export default function SectorHero({
  badge,
  headline,
  headlineHighlight,
  subheadline,
  description,
  fundingLine,
  primaryCta,
  secondaryCta,
  commercialLink,
  trustItems,
  sectorImage,
  sectorLabel,
  accentColor = '#D6A85F',
  metrics,
}: SectorHeroProps) {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [ctaTransform, setCtaTransform] = useState('translate(0, 0)');

  const handleCtaMouseMove = (e: React.MouseEvent) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      setCtaTransform(`translate(${(dx * 0.12).toFixed(1)}px, ${(dy * 0.12).toFixed(1)}px)`);
    }
  };

  const handleCtaMouseLeave = () => setCtaTransform('translate(0, 0)');

  const renderHeadline = () => {
    if (!headlineHighlight) return headline;
    const highlightIndex = headline.toLowerCase().indexOf(headlineHighlight.toLowerCase());
    if (highlightIndex === -1) return headline;

    return <>
      {headline.slice(0, highlightIndex)}
      <span className="text-signal-400">{headline.slice(highlightIndex, highlightIndex + headlineHighlight.length)}</span>
      {headline.slice(highlightIndex + headlineHighlight.length)}
    </>;
  };

  return (
    <section id="hero" className="relative isolate flex min-h-[90vh] items-center overflow-hidden bg-primary-950 pb-14 pt-28 text-white md:pb-20 md:pt-36">
      <img
        src={sectorImage}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = '/images/hero-professional.webp';
        }}
      />
      <div className="hero-contrast-overlay absolute inset-0 -z-20" />
      <div className="signal-pattern absolute inset-0 -z-10 opacity-20" />
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor}12, transparent 70%)` }}
      ></div>

      <div className="container-site relative z-10">
        <div className="flex max-w-4xl flex-col items-start text-left">
          <div className="flex w-full flex-col items-start">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-signal-400/50 bg-signal-500/10 px-3 py-1.5 text-xs font-label font-semibold uppercase tracking-wider text-signal-300">
              <div className="w-1.5 h-1.5 rounded-full bg-signal-500"></div>
              {badge}
            </span>

            <h1 className="mb-4 text-display font-heading font-bold leading-[1.08] tracking-tight text-white">
              {renderHeadline()}
            </h1>

            <p className="mb-3 max-w-3xl text-base font-body leading-relaxed text-white/85 md:text-lg">
              {subheadline}
            </p>

            <p className="mb-5 max-w-2xl text-sm font-body leading-relaxed text-white/70">
              {description}
            </p>

            <div className="mb-6 flex max-w-3xl items-start gap-2 rounded-lg border border-white/15 bg-primary-950/35 p-3 text-left backdrop-blur-sm">
              <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                <i className="ri-information-line text-signal-400 text-sm"></i>
              </div>
              <p className="text-sm font-body leading-relaxed text-white/80">{fundingLine}</p>
            </div>

            <div className="mb-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start">
              <SiteLink
                ref={ctaRef}
                href="/book-a-session"
                style={{ transform: ctaTransform, transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)' }}
                onMouseMove={handleCtaMouseMove}
                onMouseLeave={handleCtaMouseLeave}
                className="btn-primary magnetic-btn px-6 py-3.5 text-center text-sm font-bold transition-colors whitespace-nowrap"
              >
                {primaryCta}
                <i className="ri-arrow-right-line ml-2"></i>
              </SiteLink>
              <SiteLink
                href="/apprenticeship-eligibility-checker"
                className="rounded-md border border-white/55 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:border-signal-400 hover:bg-white/10 whitespace-nowrap"
              >
                {secondaryCta}
              </SiteLink>
            </div>

            {commercialLink && (
              <SiteLink
                href={commercialLink}
                className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-signal-300 transition-colors hover:text-signal-200"
              >
                Explore Commercial Route
                <i className="ri-arrow-right-up-line text-xs"></i>
              </SiteLink>
            )}

            <div className="flex flex-wrap justify-start gap-x-5 gap-y-2">
              {trustItems.map((item) => (
                <div key={item.text} className="flex items-center gap-1.5">
                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                    <i className={`${item.icon} text-signal-400 text-sm`}></i>
                  </div>
                  <span className="text-xs font-medium text-white/70">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
