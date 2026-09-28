import CaseStudyCard from '@/components/feature/CaseStudyCard';
import type { CaseStudyPage } from '@/services/caseStudiesApi';

interface CaseStudiesGridProps {
  query: string;
  page: number;
  data: CaseStudyPage | null;
  loading: boolean;
  error: boolean;
  onClearSearch: () => void;
  onRetry: () => void;
  onNavigatePage: (next: number) => void;
}

export default function CaseStudiesGrid({
  query,
  page,
  data,
  loading,
  error,
  onClearSearch,
  onRetry,
  onNavigatePage,
}: CaseStudiesGridProps) {
  return (
    <section id="case-study-grid" className="scroll-mt-28 py-14 md:py-20">
      <div className="container-site">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-foreground-950">
            {query ? `Results for "${query}"` : 'Latest case studies'}
          </h2>
          {query && (
            <button
              type="button"
              onClick={onClearSearch}
              className="min-h-11 text-sm font-semibold text-primary-700 underline"
            >
              Clear search
            </button>
          )}
        </div>
        {loading ? (
          <p role="status">Loading case studies...</p>
        ) : error ? (
          <div role="alert">
            <p>We could not load the case studies. Please try again.</p>
            <button onClick={onRetry} className="btn-primary mt-4 px-5 py-3">
              Try again
            </button>
          </div>
        ) : data && (
          <>
            <p role="status" className="mb-6 text-sm text-foreground-600">
              {data.count} {data.count === 1 ? 'case study' : 'case studies'}
              {query ? ' found' : ' to explore'}
            </p>
            {data.results.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.results.map((item) => (
                  <CaseStudyCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-background-200 bg-white p-10 text-center">
                <h3 className="text-xl font-bold">
                  {query ? 'No matching case studies' : 'Case studies are on the way'}
                </h3>
                <p className="mt-3 text-foreground-600">
                  {query
                    ? 'Try a different keyword or clear your search.'
                    : 'Publish case studies from the dashboard to show them here.'}
                </p>
              </div>
            )}
            {(data.next || data.previous) && (
              <nav aria-label="Case study pages" className="mt-10 flex items-center justify-center gap-6">
                <button
                  disabled={!data.previous}
                  onClick={() => onNavigatePage(page - 1)}
                  className="min-h-11 rounded-lg border border-primary-300 px-5 disabled:opacity-40"
                >
                  Previous
                </button>
                <span>
                  Page {page} of {Math.ceil(data.count / 12)}
                </span>
                <button
                  disabled={!data.next}
                  onClick={() => onNavigatePage(page + 1)}
                  className="min-h-11 rounded-lg border border-primary-300 px-5 disabled:opacity-40"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
