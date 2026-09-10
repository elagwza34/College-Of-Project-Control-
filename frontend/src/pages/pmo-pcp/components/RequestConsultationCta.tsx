import SiteLink from '@/components/base/SiteLink';

export default function RequestConsultationCta() {
  return (
<section className="py-16 md:py-20 text-center">
            <div className="container-site">
              <SiteLink
                href="/book-a-session"
                className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-7 text-sm font-bold transition-colors"
              >
                Request a consultation
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </SiteLink>
            </div>
          </section>
  );
}
