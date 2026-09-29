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

/** Section: For Energy, Utilities and Capital Programme Teams. */
export default function ForEnergyUtilitiesAndCapitalProgrammeTeams() {
  return (
    <PcpHero
          tag="For Energy, Utilities &amp; Capital Programme Teams"
          headline="Project controls skills for complex energy programmes"
          subheadline="Develop project controls professionals who can strengthen baseline control, risk visibility, cost assurance, outage planning, commissioning milestones and governance confidence."
          description="In capital programmes, the cost of weak controls compounds over years — not months. Build the capability to protect programme outcomes from day one."
          fundingLine={`Apprenticeship funding may be available, subject to current eligibility rules. Government apprenticeship funding has a funding-band maximum of up to ${fundingBandMaximum} for eligible employers in England. Delivered by Kent Business College.`}
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20energy%20facility%20control%20room%20with%20large%20digital%20screens%20showing%20programme%20dashboards%20and%20schedule%20data%2C%20navy%20and%20cream%20interior%2C%20warm%20professional%20lighting%2C%20clean%20industrial%20design%2C%20British%20corporate%20atmosphere%2C%20sophisticated%20technology%20environment%2C%20no%20people%2C%20editorial%20photography%20style&width=1920&height=1080&seq=campaign-energy-hero&orientation=landscape"
          heroImageAlt="Energy Project Controls for Capital Programmes"
          primaryCta={{ label: 'Explore Energy Project Controls Route', href: '#lead-form' }}
          secondaryCta={{ label: 'Check Funding Availability', href: '#lead-form' }}
          badges={heroBadges}
          urgencyMessage="Limited KBC-funded support available — secure your place before the current support allocation closes."
          bestFor={['Cost Engineers', 'Planners', 'Risk Managers', 'Project Controllers', 'Programme Controls Teams']}
          sectors={['Energy', 'Oil & Gas', 'Utilities', 'Infrastructure', 'Net Zero']}
        />
  );
}
