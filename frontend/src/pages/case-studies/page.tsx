import Footer from '@/components/feature/Footer';
import CaseStudyCard from '@/components/feature/CaseStudyCard';
import { fetchCaseStudies, type CaseStudyPage } from '@/services/caseStudiesApi';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function CaseStudiesPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('search') || '';
  const page = Math.max(1, Number.parseInt(params.get('page') || '1', 10) || 1);
  const [data, setData] = useState<CaseStudyPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetchCaseStudies({ search: query, page }, controller.signal)
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
  }, [query, page, revision]);

  const navigatePage = (next: number) => {
    setParams({ ...(query ? { search: query } : {}), page: String(next) });
    document.getElementById('case-study-grid')?.scrollIntoView({ block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <section className="relative isolate overflow-hidden bg-primary-950 pb-16 pt-36 text-white md:pb-20 md:pt-40">
          <div className="pattern-cubes-overlay pattern-cubes-overlay-dark" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary-950 via-primary-950/92 to-primary-950/72" aria-hidden="true" />
          <div className="container-site relative z-10">
            <p className="font-label text-xs font-bold uppercase tracking-[.18em] text-signal-300">Project evidence</p>
            <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-tight !text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-6xl">Case studies from project-driven environments.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed !text-white/85">
              See how professional learning, project controls discipline and workplace evidence translate into clearer decisions.
            </p>
          </div>
        </section>

        <section id="case-study-grid" className="scroll-mt-28 py-14 md:py-20">
          <div className="container-site">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-foreground-950">{query ? `Results for "${query}"` : 'Latest case studies'}</h2>
              {query && <button type="button" onClick={() => setParams({})} className="min-h-11 text-sm font-semibold text-primary-700 underline">Clear search</button>}
            </div>
            {loading ? (
              <p role="status">Loading case studies...</p>
            ) : error ? (
              <div role="alert">
                <p>We could not load the case studies. Please try again.</p>
                <button onClick={() => setRevision((value) => value + 1)} className="btn-primary mt-4 px-5 py-3">Try again</button>
              </div>
            ) : data && (
              <>
                <p role="status" className="mb-6 text-sm text-foreground-600">{data.count} {data.count === 1 ? 'case study' : 'case studies'}{query ? ' found' : ' to explore'}</p>
                {data.results.length ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{data.results.map((item) => <CaseStudyCard key={item.id} item={item} />)}</div>
                ) : (
                  <div className="rounded-2xl border border-background-200 bg-white p-10 text-center">
                    <h3 className="text-xl font-bold">{query ? 'No matching case studies' : 'Case studies are on the way'}</h3>
                    <p className="mt-3 text-foreground-600">{query ? 'Try a different keyword or clear your search.' : 'Publish case studies from the dashboard to show them here.'}</p>
                  </div>
                )}
                {(data.next || data.previous) && (
                  <nav aria-label="Case study pages" className="mt-10 flex items-center justify-center gap-6">
                    <button disabled={!data.previous} onClick={() => navigatePage(page - 1)} className="min-h-11 rounded-lg border border-primary-300 px-5 disabled:opacity-40">Previous</button>
                    <span>Page {page} of {Math.ceil(data.count / 12)}</span>
                    <button disabled={!data.next} onClick={() => navigatePage(page + 1)} className="min-h-11 rounded-lg border border-primary-300 px-5 disabled:opacity-40">Next</button>
                  </nav>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
