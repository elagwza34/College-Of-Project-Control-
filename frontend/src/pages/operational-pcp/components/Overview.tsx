export default function Overview() {
  return (
<section id="operational-overview" className="scroll-mt-44 py-16 md:py-20 bg-white">
        <div className="container-site">
          <div className="mb-10 max-w-3xl space-y-4">
            <div className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-accent-700">
              {"The operational route "}
            </div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl text-foreground-950">
              {"An operational route built around control, assurance and action "}
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-foreground-600">
              {"The Operational Pathway develops professionals who do more than report project status. They establish credible controls, challenge data, model outcomes and provide evidence-based recommendations that influence delivery. "}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article className="min-w-0 rounded-2xl border border-background-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-2xl text-accent-700">
                {"📊 "}
              </div>
              <h3 className="mb-3 text-xl font-bold leading-snug text-foreground-950">
                {"Integrated control "}
              </h3>
              <p className="text-sm leading-relaxed text-foreground-600">
                {"Integrated planning, cost, risk and performance control. Operational project leadership and decision support. "}
              </p>
            </article>
            <article className="min-w-0 rounded-2xl border border-background-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-2xl text-accent-700">
                {"🔍 "}
              </div>
              <h3 className="mb-3 text-xl font-bold leading-snug text-foreground-950">
                {"Data assurance "}
              </h3>
              <p className="text-sm leading-relaxed text-foreground-600">
                {"Data assurance, forecasting and recovery recommendations. Credible workplace evidence mapped to the apprenticeship. "}
              </p>
            </article>
            <article className="min-w-0 rounded-2xl border border-background-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-2xl text-accent-700">
                {"📜 "}
              </div>
              <h3 className="mb-3 text-xl font-bold leading-snug text-foreground-950">
                {"Professional preparation "}
              </h3>
              <p className="text-sm leading-relaxed text-foreground-600">
                {"Preparation for selected external professional examinations including PMP, APM Risk, EVM, and PMI-SP. "}
              </p>
            </article>
          </div>
          <div className="mt-8 rounded-xl border border-accent-200 border-l-4 border-l-accent-600 bg-accent-50 p-5">
            <p className="text-sm leading-relaxed text-foreground-600">
              <strong>
                {"Important distinction: "}
              </strong>
              {"The apprenticeship, KBC pathway modules and external certifications are separate outcomes. The apprenticeship is awarded after successful end-point assessment. PMI, APM and APMG qualifications are awarded only by the relevant professional body after its own eligibility, registration and examination requirements are met. "}
            </p>
          </div>
        </div>
      </section>
  );
}
