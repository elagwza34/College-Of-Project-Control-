import SiteLink from '@/components/base/SiteLink';
interface RouteWhoForProps {
  heading: string;
  professionals: { title: string; subtitle: string; items: string[] };
  employers: { title: string; subtitle: string; items: string[] };
}

export default function RouteWhoFor({ heading, professionals, employers }: RouteWhoForProps) {
  return (
    <section id="who-for" className="py-16 md:py-20 bg-background-50">
      <div className="container-site">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 text-center leading-tight mb-10 md:mb-12">
          {heading}
        </h2>

        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-background-200/80 p-6 md:p-8 card-scale-hover cursor-default">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <i className="ri-user-star-line text-primary-600 text-lg"></i>
              </div>
              <div>
                <h3 className="text-base font-label font-semibold text-foreground-950">{professionals.title}</h3>
                <p className="text-xs text-foreground-600">{professionals.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {professionals.items.map((role) => (
                <li key={role} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0"></div>
                  <span className="text-sm text-foreground-700">{role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-background-200/80 p-6 md:p-8 card-scale-hover cursor-default">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <i className="ri-building-2-line text-primary-600 text-lg"></i>
              </div>
              <div>
                <h3 className="text-base font-label font-semibold text-foreground-950">{employers.title}</h3>
                <p className="text-xs text-foreground-600">{employers.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {employers.items.map((need) => (
                <li key={need} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0"></div>
                  <span className="text-sm text-foreground-700">{need}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <SiteLink
            href="/book-a-session"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm cursor-pointer transition-colors whitespace-nowrap"
          >
            Request a consultation
            <i className="ri-arrow-right-line"></i>
          </SiteLink>
        </div>
      </div>
    </section>
  );
}