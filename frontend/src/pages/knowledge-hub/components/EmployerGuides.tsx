import ArticleCard from './ArticleCard';
import { articles as allArticles } from '@/data/articles';

import SectionHeading from '@/components/base/SectionHeading';
import { SkeletonArticleCard } from '@/components/base/Skeleton';

export default function EmployerGuides() {
  const loading = false;
  const employerGuides = allArticles.filter((a) => a.category === 'Employer Decision Guides');
  return (
<section id="employer-guides" className="py-14 md:py-20 bg-background-50">
          <div className="container-site">
            <SectionHeading
              title="Employer Decision Guides"
              subtitle="For HR, L&D, Heads of PMO and senior leaders who need to understand employer value, capability building, ROI and governance maturity."
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="reveal-scale-in" style={{ transitionDelay: `${i * 80}ms` }}>
                      <SkeletonArticleCard />
                    </div>
                  ))
                : employerGuides.map((article) => (
                    <ArticleCard key={article.title} article={article} />
                  ))}
            </div>
          </div>
        </section>
  );
}
