import SiteLink from '@/components/base/SiteLink';
import type { CaseStudyDetail } from '@/services/caseStudiesApi';

interface CaseStudyDetailHeroProps {
  item: CaseStudyDetail;
}

export default function CaseStudyDetailHero({ item }: CaseStudyDetailHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary-950 pb-16 pt-36 text-white md:pb-20 md:pt-40">
      <div className="pattern-cubes-overlay pattern-cubes-overlay-dark" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary-950 via-primary-950/92 to-primary-950/72" aria-hidden="true" />
      <div className="container-site relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.7fr)] lg:items-end">
        <div>
          <SiteLink href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-signal-300">
            <i className="ri-arrow-left-line" aria-hidden="true" />
            Case studies
          </SiteLink>
          <p className="mt-6 font-label text-xs font-bold uppercase tracking-[.18em] text-signal-300">{item.sector || 'Case study'}</p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-tight !text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-6xl">{item.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed !text-white/85">{item.headline || item.summary}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/10 shadow-card">
          <img
            src={item.image_url || '/images/employer-capability-team.webp'}
            alt={item.image_alt || ''}
            className="aspect-[4/3] w-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = '/images/employer-capability-team.webp';
            }}
          />
        </div>
      </div>
    </section>
  );
}
