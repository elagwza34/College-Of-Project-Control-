import PcpHero from '@/components/feature/PcpHero';
import { heroBadges } from "../campaignData";

import { formatGBP } from '@/data/apprenticeshipFundingPolicy';
import { PCP_L6 } from '@/data/programmeFacts';

/**
 * Maximum government apprenticeship funding for the ST0845 standard.
 *
 * Rendered as a funding-band maximum, not a cash amount: it is the ceiling for
 * eligible training and assessment costs for one standard, not money paid to the
 * learner or a guaranteed saving for the employer.
 */
const fundingBandMaximum = formatGBP(PCP_L6?.fundingBandMaximum ?? 0);

/** Section: For Heads of PMO, PMO Leads and Governance Professionals. */
export default function ForHeadsOfPMOPMOLeadsAndGovernanceProfessionals() {
  return (
    <PcpHero
          tag="For Heads of PMO, PMO Leads &amp; Governance Professionals"
          headline="Your PMO Does Not Need More Reports. It Needs Stronger Decision Confidence"
          subheadline="Develop PMO and project controls professionals who can turn schedule, cost, risk and performance data into governance insight senior leaders can trust."
          description="Stop producing reports that describe problems. Build the PMO capability to present options, forecasts and recommended actions that give senior leaders confidence before key decisions."
          fundingLine={`Apprenticeship funding may be available, subject to current eligibility rules. Government apprenticeship funding has a funding-band maximum of up to ${fundingBandMaximum} for eligible employers in England. Delivered by Kent Business College.`}
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20executive%20boardroom%20with%20large%20digital%20dashboard%20displays%20showing%20project%20data%20and%20KPIs%2C%20navy%20and%20cream%20interior%2C%20warm%20professional%20lighting%2C%20clean%20architectural%20lines%2C%20British%20corporate%20atmosphere%2C%20sophisticated%20design%2C%20no%20people%2C%20editorial%20photography&width=1920&height=1080&seq=campaign-pmo-hero&orientation=landscape"
          heroImageAlt="PMO Decision Confidence and Governance"
          primaryCta={{ label: 'Discuss the PMO Route', href: '#lead-form' }}
          secondaryCta={{ label: 'Explore APM ChPP Readiness Support', href: '#lead-form' }}
          badges={heroBadges}
          urgencyMessage="Limited KBC-funded support available — secure your place before the current support allocation closes."
          bestFor={['Heads of PMO', 'PMO Leads', 'Programme Directors', 'Portfolio Managers', 'Governance Leads']}
          sectors={['Public Sector', 'Defence', 'Energy', 'Infrastructure', 'Consultancy', 'Digital Transformation']}
        />
  );
}
