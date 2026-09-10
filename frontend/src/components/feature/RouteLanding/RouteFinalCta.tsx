import SiteLink from '@/components/base/SiteLink';
interface RouteFinalCtaProps {
  heading: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
}

export default function RouteFinalCta({ heading, description, primaryCta, primaryHref, secondaryCta, secondaryHref }: RouteFinalCtaProps) {
  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, oklch(var(--primary-700)), oklch(var(--primary-900)))' }}
    >
      <div className="pattern-cubes-overlay pattern-cubes-overlay-dark pattern-cubes-animate" style={{ opacity: 0.06 }}></div>

      <div className="container-site relative z-10 text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-background-50 leading-tight mb-3 max-w-xl mx-auto">
          {heading}
        </h2>
        <p className="text-sm md:text-base text-background-50/70 leading-relaxed mb-8 max-w-lg mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <SiteLink
            href={primaryHref}
            className="btn-primary px-6 py-3.5 text-secondary-950 font-semibold text-sm cursor-pointer transition-colors whitespace-nowrap"
          >
            {primaryCta}
            <i className="ri-arrow-right-line ml-2"></i>
          </SiteLink>
          <SiteLink
            href={secondaryHref}
            className="px-6 py-3.5 border border-background-50/30 text-background-50 font-semibold text-sm rounded-md cursor-pointer hover:bg-background-50/10 transition-colors whitespace-nowrap"
          >
            {secondaryCta}
          </SiteLink>
        </div>
      </div>
    </section>
  );
}