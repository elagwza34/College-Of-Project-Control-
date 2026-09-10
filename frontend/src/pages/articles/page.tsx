import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '@/components/feature/Footer';
import { fetchArticles, type ArticlePage } from '@/services/articlesApi';

import Hero from './components/Hero';
import ResultsGrid from './components/ResultsGrid';

export default function ArticlesPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('search') || '';
  const page = Math.max(1, Number.parseInt(params.get('page') || '1', 10) || 1);
  const [input, setInput] = useState(query);
  const [data, setData] = useState<ArticlePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => { setInput(query); }, [query]);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(false);
    fetchArticles({ search: query, page }, controller.signal)
      .then(result => { if (!controller.signal.aborted) setData(result); })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [query, page, revision]);
  const navigatePage = (next: number) => { setParams({ ...(query ? { search: query } : {}), page: String(next) }); document.getElementById('article-grid')?.scrollIntoView({ block: 'start' }); };

  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <Hero
          input={input}
          onInputChange={setInput}
          onSubmit={event => { event.preventDefault(); setParams(input.trim() ? { search: input.trim() } : {}); }}
        />
        <ResultsGrid
          query={query}
          page={page}
          data={data}
          loading={loading}
          error={error}
          onRetry={() => setRevision(v => v + 1)}
          onClearSearch={() => { setInput(''); setParams({}); }}
          onNavigatePage={navigatePage}
        />
      </main>
      <Footer />
    </div>
  );
}
