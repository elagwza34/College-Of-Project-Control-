import ArticleCard from './ArticleCard';
import { articles as allArticles } from '@/data/articles';

import SectionHeading from '@/components/base/SectionHeading';
import { SkeletonArticleCard } from '@/components/base/Skeleton';

export default function FundingGuides() {
  const loading = false;
  const fundingGuides = allArticles.filter((a) => a.category === 'Funding Guides');
  return (
<section id="funding-guides" className="py-14 md:py-20 bg-background-50">
          <div className="container-site">
            <SectionHeading
              title="Funding Guides"
              subtitle="Clear, honest information about apprenticeship funding options, employer eligibility, apprenticeship funding, levy and non-levy employers and commercial alternatives."
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="reveal-scale-in" style={{ transitionDelay: `${i * 80}ms` }}>
                      <SkeletonArticleCard />
                    </div>
                  ))
                : fundingGuides.map((article) => (
                    <ArticleCard key={article.title} article={article} />
                  ))}
            </div>
          </div>
        </section>
  );
}
