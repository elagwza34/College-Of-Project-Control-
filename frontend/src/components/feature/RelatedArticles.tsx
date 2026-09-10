import SiteLink from '@/components/base/SiteLink';
interface RelatedArticle {
  title: string;
  description: string;
  href: string;
  category: string;
  readTime: string;
  tracking: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-site max-w-4xl">
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 text-center mb-8">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <SiteLink
              key={article.href}
              href={article.href}
              data-gtm-event={article.tracking}
              className="group bg-background-100 border border-background-200/70 rounded-lg p-5 cursor-pointer hover:border-primary-300 hover:bg-background-50 transition-all duration-200"
            >
              <span className="text-xs font-label font-semibold uppercase tracking-wider text-foreground-600">
                {article.category}
              </span>
              <h3 className="mt-2 text-sm font-heading font-semibold text-foreground-900 group-hover:text-primary-600 transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="mt-2 text-xs text-foreground-600 leading-relaxed">
                {article.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-primary-500 font-medium">
                <span>Read article</span>
                <i className="ri-arrow-right-line text-xs"></i>
              </div>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}