import SiteLink from '@/components/base/SiteLink';
import type { CaseStudySummary } from '@/services/caseStudiesApi';

export default function CaseStudyCard({ item }: { item: CaseStudySummary }) {
  const href = `/case-studies/${item.slug}`;
  return (
    <article className="interactive-surface group flex h-full flex-col overflow-hidden rounded-2xl border border-background-200 bg-white shadow-sm hover:border-primary-200 hover:shadow-lg">
      <SiteLink href={href} className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500">
        <div className="aspect-[16/10] overflow-hidden bg-primary-950">
          <img
            src={item.image_url || '/images/employer-capability-team.webp'}
            alt={item.image_alt || ''}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = '/images/employer-capability-team.webp';
            }}
          />
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-800">{item.sector || 'Case study'}</span>
            {item.client_name && <span className="text-xs font-semibold text-foreground-500">{item.client_name}</span>}
          </div>
          <h3 className="mt-4 text-xl font-bold leading-snug text-foreground-950">{item.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground-600">{item.headline || item.summary}</p>
          {item.metrics.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-2">
              {item.metrics.slice(0, 2).map((metric) => (
                <div key={`${metric.label}-${metric.value}`} className="rounded-lg bg-background-50 p-3">
                  <p className="font-heading text-lg font-bold text-primary-950">{metric.value}</p>
                  <p className="mt-1 text-xs leading-snug text-foreground-600">{metric.label}</p>
                </div>
              ))}
            </div>
          )}
          <span className="interactive-arrow mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-primary-700">
            Read case study <i className="ri-arrow-right-line" aria-hidden="true" />
          </span>
        </div>
      </SiteLink>
    </article>
  );
}
