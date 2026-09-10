import SiteLink from '@/components/base/SiteLink';
import { useRef, useState } from 'react';

interface RouteHeroProps {
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  fundingLine: string;
  primaryCta: string;
  secondaryCta: string;
  commercialLink?: string;
  trustItems: { icon: string; text: string }[];
  dashboardTitle: string;
  routeTitle: string;
  routeSubtitle: string;
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
  accentColor?: string;
}

export default function RouteHero({
  badge,
  headline,
  subheadline,
  description,
  fundingLine,
  primaryCta,
  secondaryCta,
  commercialLink,
  trustItems,
  dashboardTitle,
  routeTitle,
  routeSubtitle,
  metrics,
  accentColor,
}: RouteHeroProps) {
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

  const ac = accentColor || 'oklch(var(--primary-500))';
  const acLight = accentColor ? `${accentColor}18` : 'oklch(var(--primary-50))';
  const acMid = accentColor ? `${accentColor}33` : 'oklch(var(--primary-100))';
  const acText = accentColor || 'oklch(var(--primary-700))';
  const acTextLight = accentColor || 'oklch(var(--primary-600))';

  return (
    <section id="hero" className="relative isolate flex min-h-[90vh] items-center overflow-hidden bg-primary-950 pb-14 pt-28 text-white md:pb-20 md:pt-36">
      <img loading="lazy" decoding="async"
        src="https://images.pexels.com/photos/6285078/pexels-photo-6285078.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        aria-hidden="true"
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
        style={{ background: 'radial-gradient(circle, rgb(252 99 19 / 0.18), transparent 68%)' }}
      ></div>

      <div className="container-site relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* Left Column */}
          <div className="flex-1 w-full lg:max-w-[560px]">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-signal-400/50 bg-signal-500/10 px-3 py-1.5 text-xs font-label font-semibold uppercase tracking-wider text-signal-300">
              <div className="w-1.5 h-1.5 rounded-full bg-signal-500"></div>
              {badge}
            </span>

            <h1 className="mb-4 text-display font-heading font-bold leading-[1.15] text-white">
              {headline}
            </h1>

            <p className="mb-3 text-base font-body leading-relaxed text-white/85 md:text-lg">
              {subheadline}
            </p>

            <p className="mb-5 text-sm font-body leading-relaxed text-white/70">
              {description}
            </p>

            <div className="mb-6 flex items-start gap-2 rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
              <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                <i className="ri-information-line text-signal-400 text-sm"></i>
              </div>
              <p className="text-sm font-body leading-relaxed text-white/80">{fundingLine}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
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

            <div className="flex flex-wrap gap-x-5 gap-y-2">
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

          {/* Right Column: Dashboard Mockup */}
          <div className="flex-1 w-full lg:max-w-[520px] relative">
            <p className="mb-3 text-sm text-white/80">Illustrative controls view — sample data, not measured programme results.</p>
            <div className="relative">
              <div className="bg-white rounded-xl border border-background-200/80 p-5 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-highlight-500"></div>
                    <span className="text-xs font-label font-semibold text-foreground-700 uppercase tracking-wider">
                      {dashboardTitle}
                    </span>
                  </div>
                  <span className="text-sm font-label text-foreground-400 bg-background-100 px-2 py-0.5 rounded-full">
                    Example
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="rounded-lg p-3 text-center border" style={{ backgroundColor: acLight, borderColor: acMid }}>
                    <div className="w-6 h-6 mx-auto mb-1.5 rounded-full flex items-center justify-center" style={{ backgroundColor: acMid }}>
                      <i className="ri-shield-check-line text-xs" style={{ color: acTextLight }}></i>
                    </div>
                    <p className="text-sm text-foreground-600 font-label uppercase tracking-wider leading-tight">Governance</p>
                    <p className="text-lg font-heading font-bold" style={{ color: acText }}>{metrics.governance}</p>
                  </div>
                  <div className="rounded-lg p-3 text-center border" style={{ backgroundColor: acLight, borderColor: acMid }}>
                    <div className="w-6 h-6 mx-auto mb-1.5 rounded-full flex items-center justify-center" style={{ backgroundColor: acMid }}>
                      <i className="ri-bar-chart-grouped-line text-xs" style={{ color: acTextLight }}></i>
                    </div>
                    <p className="text-sm text-foreground-600 font-label uppercase tracking-wider leading-tight">PMO Maturity</p>
                    <p className="text-lg font-heading font-bold" style={{ color: acText }}>{metrics.pmoMaturity}</p>
                  </div>
                  <div className="bg-highlight-50 rounded-lg p-3 text-center border border-highlight-100/50">
                    <div className="w-6 h-6 mx-auto mb-1.5 rounded-full bg-highlight-100 flex items-center justify-center">
                      <i className="ri-alert-fill text-highlight-600 text-xs"></i>
                    </div>
                    <p className="text-sm text-foreground-600 font-label uppercase tracking-wider leading-tight">Risk</p>
                    <p className="text-lg font-heading font-bold text-highlight-700" style={{ color: '#D6A85F' }}>{metrics.risk}</p>
                  </div>
                </div>

                <div className="bg-background-50/80 rounded-lg p-4 mb-4 border border-background-200/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-label text-foreground-400 uppercase tracking-wider">{metrics.chartLabel}</span>
                    <span className="text-sm font-label font-semibold" style={{ color: acText }}>{metrics.chartValue}</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-20">
                    {metrics.chartBars.map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${v}%`,
                          backgroundColor: ac,
                          opacity: i >= 9 ? 0.85 : 0.3,
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
                      <span key={m} className="text-sm text-foreground-400 font-label uppercase">{m}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-background-50/80 rounded-lg p-3 border border-background-200/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: acMid }}>
                      <i className="ri-line-chart-line text-sm" style={{ color: acTextLight }}></i>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-400 font-label uppercase tracking-wider">Forecast</p>
                      <p className="text-sm font-semibold" style={{ color: acText }}>{metrics.forecast}</p>
                    </div>
                  </div>
                  <div className="bg-background-50/80 rounded-lg p-3 border border-background-200/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-highlight-100 flex items-center justify-center shrink-0">
                      <i className="ri-error-warning-line text-highlight-600 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-400 font-label uppercase tracking-wider">Decision</p>
                      <p className="text-sm font-semibold text-highlight-700" style={{ color: '#D6A85F' }}>{metrics.decision}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-500 rounded-lg px-4 py-2.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-background-50/15 flex items-center justify-center shrink-0">
                    <i className="ri-compass-3-line text-background-50 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-xs font-label font-semibold text-background-50 uppercase tracking-wider">{routeTitle}</p>
                    <p className="text-sm text-background-50/70">{routeSubtitle}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 left-6 right-6 h-6 bg-white/40 rounded-xl border border-background-200/50 -z-1"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
