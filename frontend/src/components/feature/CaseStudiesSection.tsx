import CaseStudyCard from '@/components/feature/CaseStudyCard';
import { fetchCaseStudies, type CaseStudyPage } from '@/services/caseStudiesApi';
import { useEffect, useState } from 'react';
import SiteLink from '../base/SiteLink';

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

  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="container-site">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="font-label text-xs font-bold uppercase tracking-[.18em] text-accent-700">Case studies</p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground-950 md:text-5xl">
              Evidence of project controls capability in action.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-600">
              Explore how structured learning, workplace evidence and stronger controls can support better delivery decisions.
            </p>
          </div>
          {showLink && (
            <SiteLink href="/case-studies" className="btn-primary inline-flex min-h-12 w-fit items-center gap-2 px-5 text-sm font-bold">
              View all case studies
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </SiteLink>
          )}
        </div>

        <div className="mt-10">
          {loading ? (
            <p role="status">Loading case studies...</p>
          ) : error ? (
            <p role="alert">Case studies could not be loaded.</p>
          ) : data?.results.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {data.results.slice(0, limit).map((item) => <CaseStudyCard key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-background-200 bg-white p-8 text-center">
              <h3 className="text-xl font-bold text-foreground-950">Case studies are on the way</h3>
              <p className="mt-3 text-sm text-foreground-600">Add and publish case studies from the dashboard to show them here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
