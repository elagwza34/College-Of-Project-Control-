import { articles as allArticles } from '@/data/articles';
import ArticleCard from './ArticleCard';

import SectionHeading from '@/components/base/SectionHeading';
import { SkeletonArticleCard } from '@/components/base/Skeleton';

export default function SectorGuides() {
  const loading = false;
  const sectorGuides = allArticles.filter((a) => a.category === 'Sector Guides');
  return (
<section id="sector-guides" className="py-14 md:py-20 bg-background-50">
          <div className="container-site">
            <SectionHeading
              title="Sector Guides"
              subtitle="Sector-specific project controls training guidance for construction, energy, oil and gas, utilities, public sector, councils, engineering, manufacturing and aerospace."
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="reveal-scale-in" style={{ transitionDelay: `${i * 80}ms` }}>
                      <SkeletonArticleCard />
                    </div>
                  ))
                : sectorGuides.map((article) => (
                    <ArticleCard key={article.title} article={article} />
                  ))}
            </div>
          </div>
        </section>
  );
}
