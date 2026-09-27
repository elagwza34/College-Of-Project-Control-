import SiteLink from '@/components/base/SiteLink';

export default function AssociatePathwayCallout() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container-site">
        <div className="grid gap-6 rounded-lg border border-background-200 bg-accent-50 p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-8">
          <div>
            <p className="text-sm font-semibold text-primary-900">Earlier in your project-management career?</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-foreground-950 md:text-3xl">
              Explore the Associate Project Management Pathway.
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-foreground-700 md:text-base">
              A focused three-credit route combining PMP development with the AI in Project Controls Certificate. Commercial instalments may be available for up to 24 months; funded and bursary terms are assessed separately.
            </p>
            <p className="mt-4 text-sm font-bold text-primary-900">
              3 credits · PMP 2 credits · AI in Project Controls 1 credit · Up to 24 months instalments
            </p>
          </div>
          <SiteLink href="/associate-project-manager-level-4" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-bold">
            Explore the entry pathway
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
