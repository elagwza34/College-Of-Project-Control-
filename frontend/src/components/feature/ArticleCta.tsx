import SiteLink from '@/components/base/SiteLink';
interface ArticleCtaProps {
  title: string;
  body: string;
  primaryCta: { label: string; href: string; tracking: string };
  secondaryCta?: { label: string; href: string; tracking: string };
  formFields?: ('name' | 'email' | 'phone' | 'employer' | 'job_title' | 'learner_count' | 'sector' | 'england_based' | 'levy_payer' | 'route' | 'employment_status' | 'payment_option' | 'bursary_interest' | 'message')[];
}

export default function ArticleCta({
  title,
  body,
  primaryCta,
  secondaryCta,
}: ArticleCtaProps) {
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-site max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950">{title}</h2>
            <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">{body}</p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <SiteLink
                href={primaryCta.href}
                data-gtm-event={primaryCta.tracking}
                className="btn-primary inline-flex items-center justify-center px-5 py-3 font-semibold text-sm cursor-pointer transition-all duration-200 whitespace-nowrap"
              >
                <i className="ri-arrow-right-line mr-2"></i>
                {primaryCta.label}
              </SiteLink>
              {secondaryCta && (
                <SiteLink
                  href={secondaryCta.href}
                  data-gtm-event={secondaryCta.tracking}
                  className="cta-button inline-flex items-center justify-center px-5 py-3 border border-background-200/70 text-foreground-700 font-semibold text-sm rounded-md cursor-pointer hover:bg-background-50 transition-all duration-200 whitespace-nowrap"
                >
                  {secondaryCta.label}
                </SiteLink>
              )}
            </div>
          </div>
          <div className="lg:col-span-2 flex items-center justify-center">
            <SiteLink
              href="/book-a-session"
              className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-7 text-sm font-bold transition-colors"
            >
              Request a consultation
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
