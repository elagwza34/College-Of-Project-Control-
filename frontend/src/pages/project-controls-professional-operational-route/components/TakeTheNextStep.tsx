import SiteLink from '@/components/base/SiteLink';

export default function TakeTheNextStep() {
  return (
<section id="operational-contact" className="scroll-mt-44 py-16 md:py-20 bg-white">
        <div className="container-site">
          <div className="rounded-2xl bg-primary-800 p-7 text-white md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div>
                <div className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-signal-300">
                  {"Take the next step "}
                </div>
                <h2 className="text-3xl font-bold leading-tight md:text-4xl text-white">
                  {"Apply or request a consultation "}
                </h2>
                <p className="text-sm leading-relaxed text-white/80">
                  {"Kent Business College will review your role, prior learning, employer support, funding eligibility and whether the Operational Pathway is the most appropriate route. "}
                </p>
                <div className="mt-6 grid gap-2 text-sm">
                  <strong>
                    {"Admissions and employer enquiries "}
                  </strong>
                  <SiteLink href="mailto:office@kentbusinesscollege.com" className="font-semibold underline underline-offset-4 text-signal-300">
                    {"office@kentbusinesscollege.com "}
                  </SiteLink>
                  <SiteLink target="_blank" rel="noopener noreferrer" href="https://kentbusinesscollege.com" className="font-semibold underline underline-offset-4 text-signal-300">
                    {"kentbusinesscollege.com "}
                  </SiteLink>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <SiteLink href="mailto:office@kentbusinesscollege.com?subject=Operational%20Pathway%20Enquiry%20-%20Project%20Controls%20Professional%20Level%206" className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-center text-sm font-bold btn-primary">
                  {"Contact admissions "}
                </SiteLink>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-accent-200 bg-accent-50 p-5 text-sm text-foreground-600">
            <strong>
              {"Information reviewed: 25 July 2026. "}
            </strong>
            {"Confirm the applicable standard version, funding year and professional-certification position before enrolment. "}
          </div>
        </div>
      </section>
  );
}
