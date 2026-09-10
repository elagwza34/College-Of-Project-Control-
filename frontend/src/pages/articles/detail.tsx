import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SiteLink from '@/components/base/SiteLink';
import Footer from '@/components/feature/Footer';
import ArticlesSection from '@/components/feature/ArticlesSection';
import ArticleBody from '@/components/feature/ArticleBody';
import { fetchArticle, ArticleRequestError, type ArticleDetail } from '@/services/articlesApi';

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
    {status !== 'ready' || !article ? <section className="bg-primary-950 pb-20 pt-36 text-white"><div className="container-site"><h1 className="text-3xl font-bold text-white">{status === 'loading' ? 'Loading article…' : status === 'missing' ? 'Article not found' : 'Unable to load this article'}</h1><p className="mt-4" role={status === 'error' ? 'alert' : 'status'}>{status === 'missing' ? 'This article may be unpublished or the link may have changed.' : status === 'error' ? 'Please try again in a moment.' : 'Fetching the latest content.'}</p>{status === 'error' && <button onClick={() => setRevision(v => v + 1)} className="btn-primary mt-6 px-5 py-3">Try again</button>}<SiteLink href="/articles" className="mt-6 inline-flex text-signal-300 underline">Browse all articles</SiteLink></div></section> : <>
      <article className="text-left">
        <header className="bg-gradient-to-br from-primary-950 via-primary-800 to-primary-950 pb-16 pt-32 md:pt-40"><div className="container-site"><div className="mr-auto w-full max-w-4xl"><SiteLink href="/articles" className="text-sm text-accent-200 underline underline-offset-4">All articles</SiteLink><p className="mt-8 text-xs font-bold uppercase tracking-wider text-signal-300">{article.category || 'Insights'}</p><h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">{article.title}</h1><p className="mt-6 text-lg leading-relaxed text-white/80">{article.excerpt}</p><div className="mt-6 flex flex-wrap gap-4 text-sm text-white/75"><span>{article.author}</span><time dateTime={article.published_at}>{new Date(article.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time><span>{article.read_minutes} min read</span></div></div></div></header>
        <div className="container-site py-12 md:py-16"><div className="mr-auto w-full max-w-4xl"><img src={article.image_url || '/images/hero-professional.webp'} alt={article.image_alt || ''} className="mb-10 aspect-video w-full rounded-2xl object-cover" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/images/hero-professional.webp'; }} /><ArticleBody content={article.content} /></div></div>
      </article>
      <ArticlesSection title="Keep exploring" excludeSlug={article.slug} />
    </>}
  </main><Footer /></div>;
}
