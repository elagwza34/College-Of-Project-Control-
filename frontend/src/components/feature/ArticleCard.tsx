import SiteLink from '@/components/base/SiteLink';
import type { ArticleSummary } from '@/services/articlesApi';

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className="interactive-surface group flex h-full flex-col overflow-hidden rounded-2xl border border-background-200 bg-white shadow-sm hover:border-primary-200 hover:shadow-lg">
      <SiteLink href={`/articles/${article.slug}`} className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500">
        <div className="aspect-[16/10] overflow-hidden bg-primary-900">
          <img src={article.image_url || '/images/hero-professional.webp'} alt={article.image_alt || ''} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/images/hero-professional.webp'; }} />
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-primary-600">{article.category || 'Insights'}</p>
          <h3 className="mt-3 text-xl font-bold leading-snug text-foreground-950">{article.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground-600">{article.excerpt}</p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-6 text-xs text-foreground-600">
            <span>{article.read_minutes} min read</span>
            <span className="interactive-arrow inline-flex items-center gap-2 font-bold text-primary-700">Read article <i className="ri-arrow-right-line" aria-hidden="true" /></span>
          </div>
        </div>
      </SiteLink>
    </article>
  );
}
