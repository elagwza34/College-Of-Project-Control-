import ArticleCard from './ArticleCard';
import { articles as allArticles } from '@/data/articles';

import SectionHeading from '@/components/base/SectionHeading';
import { SkeletonArticleCard } from '@/components/base/Skeleton';

export default function RouteComparisons() {
  const loading = false;
  const routeComparisons = allArticles.filter((a) => a.category === 'Route Comparisons');
  return (
<section id="route-comparisons" className="py-14 md:py-20 bg-background-100">
          <div className="container-site">
            <SectionHeading
              title="Route Comparisons"
              subtitle="Honest comparisons between Project Controls Professional Level 6, PMP, APM PMQ, PMO training, strategic routes, operational routes and commercial routes."
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="reveal-scale-in" style={{ transitionDelay: `${i * 80}ms` }}>
                      <SkeletonArticleCard />
                    </div>
                  ))
                : routeComparisons.map((article) => (
                    <ArticleCard key={article.title} article={article} />
                  ))}
            </div>
          </div>
        </section>
  );
}
