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

/** Section: For Construction Employers, Planners and Project Controls Teams. */
export default function ForConstructionEmployersPlannersAndProjectControlsTeams() {
  return (
    <PcpHero
          tag="For Construction Employers, Planners &amp; Project Controls Teams"
          headline="Build stronger planning, cost and change-control skills"
          subheadline="Build project controls capability for construction, building and urban programmes where planning discipline, NEC change control, cost visibility and progress reporting matter."
          description="Delay and cost drift are not inevitable. They are symptoms of weak project controls capability. Build the discipline to see problems earlier and control them faster."
          fundingLine={`Apprenticeship funding may be available, subject to current eligibility rules. Government apprenticeship funding has a funding-band maximum of up to ${fundingBandMaximum} for eligible employers in England. Delivered by Kent Business College.`}
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20construction%20planning%20office%20with%20large%20Gantt%20charts%20and%20building%20plans%20on%20digital%20displays%2C%20navy%20and%20cream%20interior%2C%20warm%20lighting%2C%20architectural%20drawings%20visible%2C%20clean%20design%2C%20British%20professional%20atmosphere%2C%20no%20people%2C%20editorial%20photography%20style&width=1920&height=1080&seq=campaign-construction-hero&orientation=landscape"
          heroImageAlt="Construction Project Controls Capability"
          primaryCta={{ label: 'Check Construction Route Eligibility', href: '#lead-form' }}
          secondaryCta={{ label: 'Request a consultation', href: '#lead-form' }}
          badges={heroBadges}
          urgencyMessage="Limited KBC-funded support available — secure your place before the current support allocation closes."
          bestFor={['Planners', 'Schedulers', 'Cost Engineers', 'Project Controllers', 'Commercial Teams', 'NEC Project Teams']}
          sectors={['Construction', 'Building', 'Urban Development', 'Infrastructure', 'Civil Engineering']}
        />
  );
}
