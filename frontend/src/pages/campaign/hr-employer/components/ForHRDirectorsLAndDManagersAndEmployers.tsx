import PcpHero from '@/components/feature/PcpHero';
import { heroBadges } from "../campaignData";

/** Section: For HR Directors, L and D Managers and Employers. */
export default function ForHRDirectorsLAndDManagersAndEmployers() {
  return (
    <PcpHero
          tag="For HR Directors, L&amp;D Managers &amp; Employers"
          headline="Use Apprenticeship Funding to Build Project Controls Capability Your Business Can Actually Measure"
          subheadline="A Level 6 Project Controls Professional pathway where eligible, designed to help employers develop planning, cost, risk, reporting, governance and PMO capability across project-driven teams."
          description="Stop stretching training budgets for generic courses that do not produce workplace evidence. Build measurable project controls capability using Department for Education funding."
          fundingLine="Apprenticeship funding may be available, subject to current eligibility rules. Department for Education funding band up to £27,000 for eligible employers in England. Delivered by Kent Business College."
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20professional%20corporate%20learning%20environment%20with%20warm%20lighting%2C%20navy%20and%20gold%20accents%2C%20abstract%20geometric%20architecture%2C%20executive%20meeting%20space%2C%20British%20B2B%20atmosphere%2C%20clean%20lines%2C%20sophisticated%20interior%20design%2C%20no%20people%2C%20editorial%20photography%20style&width=1920&height=1080&seq=campaign-hr-employer-hero&orientation=landscape"
          heroImageAlt="Use Apprenticeship Funding to Build Project Controls Capability"
          primaryCta={{ label: 'Check Funding Availability', href: '#lead-form' }}
          secondaryCta={{ label: 'Request an employer consultation', href: '#lead-form' }}
          badges={heroBadges}
          urgencyMessage="Limited KBC-funded support available — secure your place before the current support allocation closes."
          bestFor={['HR Directors', 'L&D Managers', 'Talent Development Managers', 'Operations Directors']}
          sectors={['Construction', 'Energy', 'Public Sector', 'Engineering', 'Aerospace', 'Infrastructure', 'Consultancy']}
        />
  );
}
