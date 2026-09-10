import SiteLink from '@/components/base/SiteLink';

export default function CareerSupport() {
  return (
<section id="career-support" className="scroll-mt-44 py-16 odd:bg-background-100 md:py-20"><div className="container-site space-y-8"><div className="max-w-3xl space-y-4"><p className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">{"Career development"}</p><h2 className="text-3xl md:text-4xl">{"Plan your next professional step."}</h2><p className="leading-relaxed text-foreground-600">{"Discuss role progression, planning, cost, risk, reporting, public-sector governance and preparation for senior responsibility."}</p></div><SiteLink href="/contact" className="btn-primary inline-flex min-h-12 items-center px-6 font-bold">Discuss your career development</SiteLink></div></section>
  );
}
