import Footer from '@/components/feature/Footer';
import CaseStudiesHero from './components/CaseStudiesHero';
import CaseStudiesGrid from './components/CaseStudiesGrid';
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
        <CaseStudiesHero />
        <CaseStudiesGrid
          query={query}
          page={page}
          data={data}
          loading={loading}
          error={error}
          onClearSearch={() => setParams({})}
          onRetry={() => setRevision((value) => value + 1)}
          onNavigatePage={navigatePage}
        />
      </main>
      <Footer />
    </div>
  );
}
