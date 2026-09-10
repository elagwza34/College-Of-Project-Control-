import SiteLink from '@/components/base/SiteLink';

const insightsArticles = [
  {
    title: 'Why Strong PMOs Focus on Decision Confidence',
    size: 'large',
  },
  {
    title: 'From Status Reporting to Executive Insight',
    size: 'small',
  },
  {
    title: 'How Integrated Controls Improve Governance',
    size: 'small',
  },
  {
    title: 'APM Recognition and the ChPP Journey',
    size: 'small',
  },
];

export default function Insights() {
  return (
<section className="py-16 md:py-24 bg-canvas">
            <div className="container-site">
              <div className="divider-ink mb-10"></div>
              <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl mb-10 md:mb-14">
                PMO INSIGHTS
              </h2>

              <div className="max-w-5xl mx-auto">
                {/* Main article */}
                <div className="card-editorial p-6 md:p-8 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <span className="text-sm font-label font-bold text-ink/70 uppercase tracking-wider mb-2 block">Featured</span>
                      <h3 className="heading-editorial text-xl md:text-2xl mb-3">
                        {insightsArticles[0].title}
                      </h3>
                      <p className="text-xs text-ink/70 leading-relaxed mb-4">
                        Strong PMOs do not simply report status. They build the confidence that enables better decisions, clearer governance and more reliable delivery.
                      </p>
                      <SiteLink href="/knowledge-hub" className="inline-flex items-center gap-2 text-sm font-label font-semibold text-secondary-500 hover:text-primary-500 transition-colors">
                        Read More <i className="ri-arrow-right-line"></i>
                      </SiteLink>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-secondary-500/5 flex items-center justify-center">
                        <i className="ri-article-line text-3xl text-secondary-500/30"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side articles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {insightsArticles.slice(1).map((article) => (
                    <div key={article.title} className="card-editorial p-5">
                      <h3 className="font-heading text-base text-ink mb-2">{article.title}</h3>
                      <SiteLink href="/knowledge-hub" className="text-sm font-label font-semibold text-secondary-500 hover:text-primary-500 transition-colors">
                        Read <i className="ri-arrow-right-line"></i>
                      </SiteLink>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <SiteLink href="/knowledge-hub" className="inline-flex items-center gap-2 text-sm font-label font-semibold text-ink/70 border border-ink/15 px-5 py-2.5 rounded-full hover:border-ink/30 hover:text-ink transition-all">
                  Explore PMO Insights <i className="ri-arrow-right-line"></i>
                </SiteLink>
              </div>

              <div className="divider-ink mt-10"></div>
            </div>
          </section>
  );
}
