import SiteLink from "@/components/base/SiteLink";
import { sectorConfig } from "../sectorData";

export default function ChooseYourPathwayCheckYourAccessRoute() {
  return (
    <section
      id="sector-section-16"
      className="scroll-mt-44 bg-white py-16 md:py-24"
    >
      <div className="container-site">
        <div className="relative overflow-hidden rounded-lg bg-primary-950 p-7 text-white md:p-10">
          <img
            src={sectorConfig.hero.sectorImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-18"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#001714_0%,rgba(0,23,20,.86)_65%,rgba(0,23,20,.35)_100%)]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <small className="text-xs font-bold uppercase tracking-[.15em] text-signal-300">
                Next step
              </small>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl">
                Choose your pathway. Check your access route.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/76">
                Complete a short assessment to identify the most suitable
                professional pathway and determine whether a funded route or
                bursary route may fit your circumstances.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <SiteLink
                href="#eligibility"
                className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-bold"
              >
                Check my eligibility
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </SiteLink>
              <SiteLink
                href="/book-a-session"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/35 bg-white/10 px-6 text-sm font-bold text-white transition-colors hover:bg-white/18"
              >
                Request a consultation
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
