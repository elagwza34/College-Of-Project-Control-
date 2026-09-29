/**
 * Canonical apprenticeship funding policy.
 *
 * Funding rules are a REGULATORY fact, not editorial copy. Before this module
 * the same rules were retyped by hand across roughly forty-five files, which
 * allowed competing figures to appear side by side on the same site. This file
 * owns the structured values; components render them and never re-type them.
 *
 * Scope note: this module deliberately holds FACTS ONLY. Marketing sentences
 * such as "fully funded" or "DfE funded" are editorial claims and are NOT
 * modelled here, because they are neither true on their own nor a substitute
 * for the conditional rules below.
 *
 * Evidence keys refer to the audit source register used by programmeFacts.ts:
 *   [O03] GOV.UK: Apprenticeship funding rules 2026/27
 *   [K03] KBC: Project Controls Professional Level 6
 *   [K04] KBC: Associate Project Manager Level 4
 */

/**
 * One employer/apprentice-age funding position.
 *
 * A position is expressed either as a percentage split (`governmentPercent` +
 * `employerPercent`) or as full funding of eligible costs up to the band
 * maximum (`governmentFundsUpToBandMaximum`). Never both, and never a bare
 * "100% government funded" claim: levy-paying employers using account funds are
 * NOT described as government funded, because the money is the employer's own
 * levy.
 */
export interface FundingContribution {
  /** Short label for cards and tables, e.g. "Age 25+". */
  ageBandLabel: string;
  /**
   * Government share of eligible costs, as a percentage. Absent where funding is
   * expressed as "up to the funding-band maximum" rather than a fixed split.
   */
  governmentPercent?: number;
  /** Employer co-investment share, as a percentage. */
  employerPercent?: number;
  /**
   * True where government may fund eligible training and assessment costs up to
   * the applicable funding-band maximum, subject to the rules in force.
   */
  governmentFundsUpToBandMaximum?: boolean;
  /** Plain-language statement of the position, safe to render directly. */
  description: string;
}

/**
 * The employer situations the policy describes.
 *
 * Declared as a union so a typo in a route id is a compile error rather than a
 * silently empty lookup at runtime.
 */
export type FundingRouteId = 'levy-sufficient' | 'levy-insufficient' | 'non-levy';

/** A named employer funding situation (levy status and available funds). */
export interface FundingRoute {
  /** Stable identifier for use in keys and tests. */
  id: FundingRouteId;
  /** Heading shown to the visitor. */
  label: string;
  /** How this route is funded, stated without over-claiming. */
  summary: string;
  /** Per-apprentice-age positions within this route. */
  contributions: FundingContribution[];
}

export interface ApprenticeshipFundingPolicy {
  /** Funding year these rules describe, e.g. "2026/27". */
  fundingYear: string;
  /** ISO date of the first apprenticeship start these rules apply to. */
  appliesFrom: string;
  /** ISO date of the last apprenticeship start these rules apply to. */
  appliesTo: string;
  /** Human-readable window, derived from the two ISO dates. */
  appliesFromLabel: string;
  appliesToLabel: string;
  /**
   * Employer situations. Ordered for display: account-funded first, then
   * shortfall, then non-levy.
   */
  routes: FundingRoute[];
  /** Date these values were last checked against the funding rules. */
  lastVerified: string;
  /** Audit source-register keys supporting this policy. */
  evidence: string[];
}

export const apprenticeshipFundingPolicy: ApprenticeshipFundingPolicy = {
  fundingYear: '2026/27',
  appliesFrom: '2026-08-01',
  appliesTo: '2027-07-31',
  appliesFromLabel: '1 August 2026',
  appliesToLabel: '31 July 2027',
  routes: [
    {
      id: 'levy-sufficient',
      label: 'Employer has sufficient levy funds',
      summary:
        "Eligible apprenticeship training and assessment costs can normally be paid through the employer's apprenticeship service account, subject to available funds, the applicable funding rules and the funding-band maximum.",
      contributions: [
        {
          ageBandLabel: 'Age 16-24',
          governmentFundsUpToBandMaximum: true,
          description: 'Government may fund eligible training and assessment costs up to the funding-band maximum.',
        },
        {
          ageBandLabel: 'Age 25+',
          governmentFundsUpToBandMaximum: true,
          description: 'Government may fund eligible training and assessment costs up to the funding-band maximum.',
        },
      ],
    },
    {
      id: 'levy-insufficient',
      label: 'Levy-paying employer with insufficient account funds',
      summary: 'For eligible new starts under the current funding rules:',
      contributions: [
        {
          ageBandLabel: 'Age 16-24',
          governmentFundsUpToBandMaximum: true,
          description: 'Government may fund eligible training and assessment costs up to the funding-band maximum.',
        },
        {
          ageBandLabel: 'Age 25+',
          governmentPercent: 75,
          employerPercent: 25,
          description:
            'Government currently contributes 75% of eligible costs up to the funding-band maximum, with 25% employer co-investment.',
        },
      ],
    },
    {
      id: 'non-levy',
      label: 'Employer does not pay the apprenticeship levy',
      summary: 'For eligible new starts under the current funding rules:',
      contributions: [
        {
          ageBandLabel: 'Age 16-24',
          governmentFundsUpToBandMaximum: true,
          description: 'Government may fund eligible training and assessment costs up to the funding-band maximum.',
        },
        {
          ageBandLabel: 'Age 25+',
          governmentPercent: 95,
          employerPercent: 5,
          description:
            'Government currently contributes 95% of eligible costs up to the funding-band maximum, with 5% employer co-investment.',
        },
      ],
    },
  ],
  lastVerified: '2026-09-29',
  evidence: ['O03'],
};

/* ─────────────────── Lookups ─────────────────── */

/** Every funding route in display order. */
export const fundingRoutes: FundingRoute[] = apprenticeshipFundingPolicy.routes;

/**
 * Look up a single funding route by id.
 *
 * Exported for tests and for any future consumer that needs one specific
 * employer situation. Throws rather than returning undefined so a typo or a
 * removed route fails at the point of use instead of rendering an empty card.
 */
export function routeById(id: FundingRouteId): FundingRoute {
  const route = fundingRoutes.find((candidate) => candidate.id === id);
  if (!route) throw new Error(`Unknown funding route: ${id}`);
  return route;
}

function contribution(routeId: FundingRouteId, ageBandLabel: string): FundingContribution {
  const found = routeById(routeId).contributions.find((entry) => entry.ageBandLabel === ageBandLabel);
  if (!found) throw new Error(`Unknown funding contribution: ${routeId}/${ageBandLabel}`);
  return found;
}

/** Age band used for apprentices aged 16 to 24. */
export const AGE_16_TO_24 = 'Age 16-24';
/** Age band used for apprentices aged 25 and over. */
export const AGE_25_PLUS = 'Age 25+';

/**
 * A single percentage contribution, or `undefined` where the position is
 * expressed as "up to the funding-band maximum" rather than a fixed split.
 */
export function fundingContributionPercent(
  routeId: FundingRouteId,
  ageBandLabel: string,
): number | undefined {
  return contribution(routeId, ageBandLabel).governmentPercent;
}

/** Employer co-investment percentage for a contribution, or `undefined`. */
export function employerContributionPercent(
  routeId: FundingRouteId,
  ageBandLabel: string,
): number | undefined {
  return contribution(routeId, ageBandLabel).employerPercent;
}

/** True when a position is funded up to the band maximum rather than split. */
export function fundsUpToBandMaximum(routeId: FundingRouteId, ageBandLabel: string): boolean {
  return contribution(routeId, ageBandLabel).governmentFundsUpToBandMaximum === true;
}

/* ─────────────────── Formatting helpers ─────────────────── */

/**
 * Format a sterling amount for display, e.g. 27000 -> "£27,000".
 *
 * The canonical value is always a number. Formatting lives here so a component
 * never re-types "£27,000" and creates a second, independently editable copy of
 * a regulatory figure.
 */
export function formatGBP(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a contribution percentage for display, e.g. 95 -> "95%". */
export function formatPercent(percent: number): string {
  return `${percent}%`;
}

/** The funding-year window as a single phrase, e.g. "from 1 August 2026 to 31 July 2027". */
export function fundingWindowPhrase(): string {
  const { appliesFromLabel, appliesToLabel } = apprenticeshipFundingPolicy;
  return `from ${appliesFromLabel} to ${appliesToLabel}`;
}
