import SiteLink from '@/components/base/SiteLink';
import {
  employerContributionPercent,
  formatGBP,
  formatPercent,
  fundingContributionPercent,
  fundingRoutes,
  fundingWindowPhrase,
  fundsUpToBandMaximum,
  type FundingRouteId,
} from '@/data/apprenticeshipFundingPolicy';
import { PCP_L6 } from '@/data/programmeFacts';

/**
 * One headline figure for a funding position.
 *
 * Percentage routes show the government contribution. Positions funded up to the
 * band maximum are described as "Band maximum" rather than "100%", because a
 * levy-paying employer is spending its own levy rather than receiving government
 * funding, and "100% government funded" would misstate that.
 */
function headlineFor(routeId: FundingRouteId, ageBandLabel: string): string | null {
  const percent = fundingContributionPercent(routeId, ageBandLabel);
  if (percent !== undefined) return formatPercent(percent);
  return fundsUpToBandMaximum(routeId, ageBandLabel) ? 'Band maximum' : null;
}

export default function FundingScenariosForStartsFrom1August2026() {
  const band = formatGBP(PCP_L6?.fundingBandMaximum ?? 0);
  return (
<section id="funding" className="scroll-mt-44 py-16 md:py-20 bg-white">
<div className="container-site space-y-8">
<div className="max-w-3xl space-y-4">
<div className="text-xs font-bold uppercase tracking-[.14em] text-accent-700">
{`Funding scenarios for starts ${fundingWindowPhrase()} `}
</div>
<h2 className="text-3xl font-bold leading-tight md:text-4xl">
{"How the apprenticeship may be funded "}
</h2>
<p className="text-base leading-relaxed">
{"The actual funding position depends on the employer, available funds, apprentice age and the agreed training price. "}
</p>
</div>
<div className="grid min-w-0 gap-6 lg:grid-cols-2">
<div className="space-y-3">
      {fundingRoutes.flatMap((route) =>
        route.contributions.map((contribution) => {
          const headline = headlineFor(route.id, contribution.ageBandLabel);
          if (!headline) return null;
          const employer = employerContributionPercent(route.id, contribution.ageBandLabel);
          const position = employer === undefined
            ? contribution.description
            : `${contribution.description} Employer co-investment ${formatPercent(employer)}.`;
          return (
            <article
              key={`${route.id}-${contribution.ageBandLabel}`}
              className="min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm"
            >
              <strong className="font-bold">{`${headline} `}</strong>
              <h3 className="text-xl font-bold leading-snug">
                {`${route.label}: ${contribution.ageBandLabel} `}
              </h3>
              <p className="text-base leading-relaxed">{`${position} `}</p>
            </article>
          );
        }),
      )}
</div>
<article className="min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm bg-background-100 text-foreground-800">
<span className="block text-4xl font-bold">
{`${band} `}
</span>
<h3 className="text-xl font-bold leading-snug">
{"Maximum funding band "}
</h3>
<p className="text-base leading-relaxed">
{"The final price must reflect prior learning and be agreed with the employer. "}
</p>
<ul className="list-disc space-y-2 pl-5">
<li className="leading-relaxed">
{"No apprentice contribution to eligible costs "}
</li>
<li className="leading-relaxed">
{"Employers pay costs above the funding-band maximum "}
</li>
<li className="leading-relaxed">
{"Exam costs are included only when confirmed in writing "}
</li>
</ul>
<div className="flex flex-wrap items-center gap-3 pt-4">
<SiteLink href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-bold btn-primary">
{"Discuss funding "}
</SiteLink>
</div>
</article>
</div>
<div className="rounded-xl border border-accent-200 bg-accent-50 p-5 text-primary-950 space-y-3">
<p className="text-base leading-relaxed">
{"Funding rules, standards, certification names and included benefits may change. The signed apprenticeship agreement, training plan, employer contract and learner offer take precedence over promotional material. "}
</p>
</div>
</div>
</section>
  );
}
