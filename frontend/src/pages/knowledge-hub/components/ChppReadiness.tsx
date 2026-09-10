import ArticleCard from './ArticleCard';
import { articles as allArticles } from '@/data/articles';

import SectionHeading from '@/components/base/SectionHeading';
import { SkeletonArticleCard } from '@/components/base/Skeleton';

export default function ChppReadiness() {
  const loading = false;
  const chppReadiness = allArticles.filter((a) => a.category === 'APM ChPP Readiness');
  return (
<section id="chpp-readiness" className="py-14 md:py-20 bg-background-100">
          <div className="container-site">
            <SectionHeading
              title="APM ChPP Readiness"
              subtitle="Understand how APM Chartered Project Professional pathway support works, including professional evidence, reflective practice and CPD readiness."
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-1 max-w-2xl mx-auto">
              {loading
                ? (
                    <div className="reveal-scale-in">
                      <SkeletonArticleCard />
                    </div>
                  )
                : chppReadiness.map((article) => (
                    <ArticleCard key={article.title} article={article} />
                  ))}
            </div>
          </div>
        </section>
  );
}
