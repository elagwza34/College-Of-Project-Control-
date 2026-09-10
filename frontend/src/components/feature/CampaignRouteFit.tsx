import SectionHeading from '@/components/base/SectionHeading';
import { useNavigate } from 'react-router-dom';

interface RouteFitCard {
  icon: string;
  title: string;
  description: string;
  href: string;
  tracking: string;
  recommended?: boolean;
}

interface CampaignRouteFitProps {
  tag?: string;
  title?: string;
  subtitle?: string;
  routes: RouteFitCard[];
}

export default function CampaignRouteFit({
  tag = 'Route Fit',
  title = 'Which Route Fits Your Team?',
  subtitle,
  routes,
}: CampaignRouteFitProps) {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 bg-background-100">
      <div className="container-site">
        <SectionHeading tag={tag} title={title} subtitle={subtitle} />

        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {routes.map((route) => (
            <div
              key={route.title}
              className={`group bg-background-50 border rounded-lg p-5 transition-all duration-300 cursor-pointer hover:border-primary-400 ${
                route.recommended
                  ? 'border-highlight-400/50 relative'
                  : 'border-background-200/70 hover:border-primary-400'
              }`}
            >
              {route.recommended && (
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-highlight-500 text-secondary-950 text-xs font-semibold rounded-full whitespace-nowrap">
                  Recommended
                </span>
              )}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary-500 transition-colors duration-300 mb-3">
                <i className={`${route.icon} text-lg text-primary-600 group-hover:text-background-50 transition-colors duration-300`}></i>
              </div>
              <h4 className="text-sm font-heading font-bold text-foreground-900">{route.title}</h4>
              <p className="text-xs text-foreground-600 mt-1.5 leading-relaxed">{route.description}</p>
              <button
                onClick={() => navigate(route.href)}
                data-gtm-event={route.tracking}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 group-hover:text-primary-700 cursor-pointer transition-colors whitespace-nowrap"
              >
                Explore Route
                <i className="ri-arrow-right-line text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}