import SiteLink from '@/components/base/SiteLink';
import ArticleBody from '@/components/feature/ArticleBody';
import { type ArticleDetail } from '@/services/articlesApi';

/** Section: Article content. */
interface ArticleContentProps {
  article: ArticleDetail;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article className="text-left">
        <header className="bg-gradient-to-br from-primary-950 via-primary-800 to-primary-950 pb-16 pt-32 md:pt-40"><div className="container-site"><div className="mr-auto w-full max-w-4xl"><SiteLink href="/articles" className="text-sm text-accent-200 underline underline-offset-4">All articles</SiteLink><p className="mt-8 text-xs font-bold uppercase tracking-wider text-signal-300">{article.category || 'Insights'}</p><h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">{article.title}</h1><p className="mt-6 text-lg leading-relaxed text-white/80">{article.excerpt}</p><div className="mt-6 flex flex-wrap gap-4 text-sm text-white/75"><span>{article.author}</span><time dateTime={article.published_at}>{new Date(article.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time><span>{article.read_minutes} min read</span></div></div></div></header>
        <div className="container-site py-12 md:py-16"><div className="mr-auto w-full max-w-4xl"><img src={article.image_url || '/images/hero-professional.webp'} alt={article.image_alt || ''} className="mb-10 aspect-video w-full rounded-2xl object-cover" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/images/hero-professional.webp'; }} /><ArticleBody content={article.content} /></div></div>
      </article>
  );
}
