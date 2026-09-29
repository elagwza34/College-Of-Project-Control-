import SiteLink from '@/components/base/SiteLink';
import {
  employerContributionPercent,
  formatGBP,
  formatPercent,
  fundingContributionPercent,
  fundingRoutes,
  fundsUpToBandMaximum,
  type FundingRouteId,
} from '@/data/apprenticeshipFundingPolicy';
import { PCP_L6 } from '@/data/programmeFacts';

/** Government contribution text for a position, with the employer share appended. */
function contributionText(routeId: FundingRouteId, ageBandLabel: string): string {
  const employer = employerContributionPercent(routeId, ageBandLabel);
  const base = employer === undefined
    ? 'funded up to the band maximum when all conditions are met'
    : formatPercent(fundingContributionPercent(routeId, ageBandLabel) ?? 0);
  return employer === undefined
    ? base
    : `government contributes ${base}; the employer is responsible for the remaining ${formatPercent(employer)} up to the band maximum`;
}

/**
 * Headline figure for a position.
 *
 * Percentage routes show the government contribution. Positions funded up to the
 * band maximum read "Band maximum" rather than "100%", because a levy-paying
 * employer spends its own levy rather than receiving government funding.
 */
function headlineFor(routeId: FundingRouteId, ageBandLabel: string): string | null {
  const percent = fundingContributionPercent(routeId, ageBandLabel);
  if (percent !== undefined) return formatPercent(percent);
  return fundsUpToBandMaximum(routeId, ageBandLabel) ? 'Band maximum' : null;
}

export default function FundingScenariosFor202627Starts() {
  const band = formatGBP(PCP_L6?.fundingBandMaximum ?? 0);
  return (
<section id="operational-funding" className="scroll-mt-44 py-16 md:py-20 bg-white">
        <div className="container-site">
          <div className="mb-10 max-w-3xl space-y-4">
            <div className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-accent-700">
              {"Funding scenarios for 2026/27 starts "}
            </div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl text-foreground-950">
              {"How the apprenticeship may be funded "}
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-foreground-600">
              {"The actual funding position depends on the employer, available funds, apprentice age and the agreed training price. "}
            </p>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="grid gap-5 sm:grid-cols-2">
              {fundingRoutes.map((route) => {
                const position = route.contributions[route.contributions.length - 1];
                const headline = headlineFor(route.id, position.ageBandLabel);
                if (!headline) return null;
                const detail = contributionText(route.id, position.ageBandLabel);
                const body = route.id === 'levy-sufficient'
                  ? 'Eligible training and assessment costs are paid from available employer account funds, up to the negotiated price and funding-band maximum.'
                  : `For ${route.id === 'non-levy' ? 'non-levy employers' : 'levy-paying employers with insufficient account funds'} and apprentices aged 25+, ${detail}.`;
                return (
                  <article key={route.id} className="rounded-2xl border border-background-200 bg-white p-6 shadow-sm">
                    <strong className="mb-4 text-3xl font-extrabold text-primary-700">{`${headline} `}</strong>
                    <h3 className="mb-3 text-xl font-bold leading-snug text-foreground-950">{`${route.label} `}</h3>
                    <p className="text-sm leading-relaxed text-foreground-600">{`${body} `}</p>
                  </article>
                );
              })}
            </div>
            <article className="rounded-2xl border border-primary-700 bg-primary-800 p-7 text-white">
              <strong className="mb-3 block text-4xl font-extrabold text-signal-300">
                {`${band} `}
              </strong>
              <h3 className="mb-3 text-xl font-bold leading-snug text-white">
                {"Maximum funding band "}
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                {"The final price must reflect prior learning and be agreed with the employer. "}
              </p>
              <ul className="space-y-3 pl-5 list-disc">
                <li className="text-sm leading-relaxed text-white/80">
                  {"The apprentice must not be charged eligible apprenticeship training or assessment costs. "}
                </li>
                <li className="text-sm leading-relaxed text-white/80">
                  {`Employers are responsible for costs above the ${band} funding-band maximum. `}
                </li>
                <li className="text-sm leading-relaxed text-white/80">
                  {"Memberships, professional exams or resits are included only when expressly confirmed and eligible. "}
                </li>
              </ul>
              <SiteLink href="mailto:office@kentbusinesscollege.com?subject=Operational%20Pathway%20Funding%20Enquiry" className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-center text-sm font-bold btn-primary">
                {"Discuss funding "}
              </SiteLink>
            </article>
          </div>
          <div className="mt-8 rounded-xl border border-accent-200 border-l-4 border-l-accent-600 bg-accent-50 p-5">
            <p className="text-sm leading-relaxed text-foreground-600">
              <strong>
                {"No funding guarantee from a catalogue: "}
              </strong>
              {"Funding is confirmed only after learner eligibility, employer account arrangements, negotiated price, prior learning and the applicable funding rules are checked. The apprentice must not be charged eligible apprenticeship training or assessment costs. "}
            </p>
          </div>
        </div>
      </section>
  );
}
