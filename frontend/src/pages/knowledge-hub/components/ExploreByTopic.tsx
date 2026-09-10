import SiteLink from '@/components/base/SiteLink';

import SectionHeading from '@/components/base/SectionHeading';
import { SkeletonCategoryCard } from '@/components/base/Skeleton';
import { articleCategories as categories } from '@/data/articles';

function CategoryCard({ icon, title, description, href }: { icon: string; title: string; description: string; href: string }) {
  return (
    <SiteLink
      href={href}
      className="group bg-background-100 border border-background-200/70 rounded-lg p-6 cursor-pointer hover:border-highlight-300 hover:bg-background-50 transition-all duration-200"
    >
      <div className="w-11 h-11 flex items-center justify-center rounded-full bg-highlight-100 group-hover:bg-highlight-200 transition-colors duration-200 mb-4">
        <i className={`${icon} text-xl text-highlight-600`}></i>
      </div>
      <h3 className="text-base font-heading font-semibold text-foreground-900 group-hover:text-highlight-700 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-foreground-600 leading-relaxed">{description}</p>
    </SiteLink>
  );
}


export default function ExploreByTopic() {
  const loading = false;
  return (
<section className="py-14 md:py-20 bg-background-50">
          <div className="container-site">
            <SectionHeading
              tag="Explore by Topic"
              title="Find the Insight You Need"
              subtitle="Five knowledge categories built around the questions HR, L&D, PMO and project controls professionals actually ask."
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="reveal-scale-in" style={{ transitionDelay: `${i * 80}ms` }}>
                      <SkeletonCategoryCard />
                    </div>
                  ))
                : categories.map((cat) => (
                    <CategoryCard key={cat.title} {...cat} />
                  ))}
            </div>
          </div>
        </section>
  );
}
