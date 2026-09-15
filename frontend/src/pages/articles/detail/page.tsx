import Footer from '@/components/feature/Footer';
import { ArticleRequestError,fetchArticle,type ArticleDetail } from '@/services/articlesApi';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleContent from "./components/ArticleContent";
import KeepExploring from "./components/KeepExploring";
import ArticleStatus from "./components/ArticleStatus";

export default function ArticleDetailPage() {
  const { slug = '' } = useParams();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading'); setArticle(null);
    fetchArticle(slug, controller.signal).then(data => { if (!controller.signal.aborted) { setArticle(data); setStatus('ready'); } })
      .catch(error => { if (!controller.signal.aborted) setStatus(error instanceof ArticleRequestError && error.status === 404 ? 'missing' : 'error'); });
    return () => controller.abort();
  }, [slug, revision]);
  useEffect(() => {
    if (status === 'loading') return;
    window.dispatchEvent(new CustomEvent('article-seo', { detail: article ? { title: `${article.title} | CPCM`, description: article.excerpt, image: article.image_url, author: article.author, published: article.published_at, updated: article.updated_at } : { title: 'Article unavailable | CPCM', noIndex: true } }));
  }, [article, status]);
  return <div className="min-h-screen bg-background-50"><main>
    {status !== 'ready' || !article ? <ArticleStatus status={status} setRevision={setRevision} /> : <>
      <ArticleContent article={article} />
      <KeepExploring article={article} />
    </>}
  </main><Footer /></div>;
}
