import ArticleCard from './ArticleCard';
import { articles as allArticles } from '@/data/articles';

import SectionHeading from '@/components/base/SectionHeading';
import { SkeletonArticleCard } from '@/components/base/Skeleton';

export default function Featured() {
  const loading = false;
  const featuredArticles = allArticles.filter((a) => a.featured);
  return (
<section className="py-14 md:py-20 bg-background-100">
          <div className="container-site">
            <SectionHeading
              tag="Featured"
              title="Start Here"
              subtitle="These three articles answer the questions most employers and professionals ask first."
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="reveal-scale-in" style={{ transitionDelay: `${i * 100}ms` }}>
                      <SkeletonArticleCard />
                    </div>
                  ))
                : featuredArticles.map((article) => (
                    <ArticleCard key={article.title} article={article} featured={true} />
                  ))}
            </div>
          </div>
        </section>
  );
}
