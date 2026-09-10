import SiteLink from '@/components/base/SiteLink';
import { articles as allArticles } from '@/data/articles';

export default function ArticleCard({ article, featured }: { article: typeof allArticles[0]; featured?: boolean }) {
  return (
    <SiteLink
      href={article.href}
      data-gtm-event={article.tracking}
      className={`group bg-background-50 border border-background-200/70 rounded-lg p-5 cursor-pointer hover:border-primary-300 transition-all duration-200 ${
        featured ? 'ring-1 ring-highlight-200' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-label font-semibold uppercase tracking-wider text-highlight-600">
          {article.category}
        </span>
        {featured && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-highlight-100 text-highlight-700 font-medium">
            Featured
          </span>
        )}
      </div>
      <h3 className="text-sm md:text-base font-heading font-semibold text-foreground-900 group-hover:text-primary-600 transition-colors leading-snug">
        {article.title}
      </h3>
      <p className="mt-2 text-xs md:text-sm text-foreground-600 leading-relaxed">
        {article.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-foreground-400">{article.readTime}</span>
        <span className="text-xs text-primary-500 font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
          Read article
          <i className="ri-arrow-right-line text-xs"></i>
        </span>
      </div>
    </SiteLink>
  );
}
