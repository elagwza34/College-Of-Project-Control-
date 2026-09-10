import SiteLink from '@/components/base/SiteLink';

export default function Hero() {
  return (
<header id="operational-top" className="bg-gradient-to-br from-primary-950 via-primary-800 to-primary-950 pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-signal-300">
              <span>
                {"2026/27 Learner and Employer Pathway "}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl [&_span]:mt-4 [&_span]:block [&_span]:text-xl [&_span]:font-semibold [&_span]:text-signal-300 md:[&_span]:text-2xl">
              {"Operational Pathway "}
              <br />
              <span>
                {"Project Controls Professional Level 6 "}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {"An operational route built around control, assurance and action. Develop professionals who do more than report project status. They establish credible controls, challenge data, model outcomes and provide evidence-based recommendations that influence delivery. "}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 [&_strong]:block [&_strong]:text-2xl [&_strong]:font-bold [&_strong]:text-signal-300 [&_span]:mt-2 [&_span]:block [&_span]:text-xs [&_span]:text-white/75">
              <div>
                <strong>
                  {"6 "}
                </strong>
                <span>
                  {"Credits Level 6 selected operational route "}
                </span>
              </div>
              <div>
                <strong>
                  {"835 "}
                </strong>
                <span>
                  {"Published minimum training hours "}
                </span>
              </div>
              <div>
                <strong>
                  {"£27k "}
                </strong>
                <span>
                  {"Maximum apprenticeship funding band "}
                </span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <SiteLink href="/book-a-session" className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-center text-sm font-bold btn-primary">
                {"book an information session "}
              </SiteLink>
              <SiteLink href="#operational-overview" className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-center text-sm font-bold border border-primary-300 bg-white text-primary-800 hover:bg-background-100">
                {"Explore the pathway "}
              </SiteLink>
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-7 shadow-lg">
            <h3 className="mb-3 text-xl font-bold leading-snug text-white">
              {"What the pathway is designed to build "}
            </h3>
            <ul className="space-y-3 pl-5 list-disc">
              <li className="text-sm leading-relaxed text-white/80">
                {"Integrated planning, cost, risk and performance control. "}
              </li>
              <li className="text-sm leading-relaxed text-white/80">
                {"Operational project leadership and decision support. "}
              </li>
              <li className="text-sm leading-relaxed text-white/80">
                {"Data assurance, forecasting and recovery recommendations. "}
              </li>
              <li className="text-sm leading-relaxed text-white/80">
                {"Credible workplace evidence mapped to the apprenticeship. "}
              </li>
              <li className="text-sm leading-relaxed text-white/80">
                {"Preparation for selected external professional examinations. "}
              </li>
            </ul>
          </div>
        </div>
      </header>
  );
}
