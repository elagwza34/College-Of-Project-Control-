
/** Section: Core credit PMP preparation. */
export default function CoreCreditPMPPreparation() {
  return (
    <section id="credit-pmp" aria-labelledby="credit-pmp-title" className="scroll-mt-44 grid overflow-hidden rounded-2xl border border-background-200 bg-white shadow-sm md:grid-cols-[240px_minmax(0,1fr)]">
              <div className="bg-primary-50 p-6">
                <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-primary-700">
                  {"Core credit "}
                </span>
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-800 text-xl font-bold text-white">
                  {"01 "}
                </span>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs font-semibold text-foreground-500">
                      {"Owner "}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-primary-800">
                      {"PMI "}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-foreground-500">
                      {"Value "}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-primary-800">
                      {"2 credits "}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-foreground-500">
                      {"Duration "}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-primary-800">
                      {"8 months "}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="p-6 md:p-8">
                <h3 id="credit-pmp-title" className="mb-3 text-xl font-bold leading-snug text-foreground-950">
                  {"PMP preparation "}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-600">
                  {"Develop project leadership across people, process and the business environment, aligned to the revised PMP examination in force from July 2026. "}
                </p>
                <details className="group mt-5 rounded-xl border border-background-200">
                  <summary className="cursor-pointer p-4 text-sm font-semibold text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500">
                    <span className="group-open:hidden">
                      {"View more about PMP preparation "}
                    </span>
                    <span className="hidden group-open:inline">
                      {"Hide credit details "}
                    </span>
                  </summary>
                  <div className="border-t border-background-200 p-5">
                    <p className="text-sm leading-relaxed text-foreground-600">
                      <strong>
                        {"Indicative workplace outputs: "}
                      </strong>
                      {"Project management plan, stakeholder and communications strategy, integrated delivery dashboard, recovery or benefits realisation recommendation. "}
                    </p>
                  </div>
                </details>
              </div>
            </section>
  );
}
