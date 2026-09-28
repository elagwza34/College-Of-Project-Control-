import CaseStudyCard from '@/components/feature/CaseStudyCard';
import { fetchCaseStudies, type CaseStudyPage, type CaseStudySummary } from '@/services/caseStudiesApi';
import { useEffect, useState } from 'react';
import SiteLink from '../base/SiteLink';

const blockedCaseStudyTerms = ['demo', 'sample', 'example', 'placeholder', 'test'];

function isRealPublishedCaseStudy(item: CaseStudySummary) {
  const searchableText = [
    item.title,
    item.slug,
    item.headline,
    item.summary,
    item.client_name,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return !blockedCaseStudyTerms.some((term) => searchableText.includes(term));
}

export default function CaseStudiesSection({ limit = 3, showLink = true }: { limit?: number; showLink?: boolean }) {
  const [data, setData] = useState<CaseStudyPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetchCaseStudies({ pageSize: limit }, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setData(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [limit]);

  const caseStudies = (data?.results ?? []).filter(isRealPublishedCaseStudy).slice(0, limit);

  if (loading || error || caseStudies.length === 0) return null;

  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="container-site">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="font-label text-xs font-bold uppercase tracking-[.18em] text-accent-700">Case studies</p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground-950 md:text-5xl">
              Evidence of learning applied at work
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-600">
              See how professionals and employers connect structured learning with real project responsibilities and development.
            </p>
          </div>
          {showLink && (
            <SiteLink href="/case-studies" className="btn-primary inline-flex min-h-12 w-fit items-center gap-2 px-5 text-sm font-bold">
              View all case studies
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </SiteLink>
          )}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {caseStudies.map((item) => (
            <CaseStudyCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
