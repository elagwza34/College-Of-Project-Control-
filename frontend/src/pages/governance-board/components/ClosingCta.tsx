import SiteLink from '@/components/base/SiteLink';

export default function ClosingCta() {
  return (
<section className="bg-highlight-500 py-14 md:py-16">
          <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-800">Help shape the future of professional education</p>
              <h2 className="mt-2 text-2xl font-bold text-primary-950 md:text-3xl">If you have strategic experience and a commitment to supporting educational excellence, we welcome your expression of interest.</h2>
            </div>
            <SiteLink href="#eoi-form" className="btn-primary inline-flex shrink-0 items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-colors">
              Submit Expression of Interest
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </SiteLink>
          </div>
        </section>
  );
}
