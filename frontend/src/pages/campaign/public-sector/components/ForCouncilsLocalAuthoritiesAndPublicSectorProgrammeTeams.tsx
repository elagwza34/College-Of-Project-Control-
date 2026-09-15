import PcpHero from '@/components/feature/PcpHero';
import { heroBadges } from "../campaignData";

/** Section: For Councils, Local Authorities and Public Sector Programme Teams. */
export default function ForCouncilsLocalAuthoritiesAndPublicSectorProgrammeTeams() {
  return (
    <PcpHero
          tag="For Councils, Local Authorities &amp; Public Sector Programme Teams"
          headline="Build Project Controls Capability for Public Money, Public Scrutiny and Better Delivery Confidence"
          subheadline="A funding-supported route, subject to eligibility, for public sector and council teams that need stronger governance, audit-ready evidence, risk control and decision-ready programme reporting."
          description="Public sector programme delivery faces unique pressures: value-for-money, public accountability, audit requirements and political scrutiny. Build the controls capability that turns these pressures into delivery confidence."
          fundingLine="Apprenticeship funding may be available, subject to current eligibility rules. Department for Education funding band up to £27,000 for eligible employers in England. Delivered by Kent Business College."
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20civic%20building%20interior%20with%20large%20programme%20dashboard%20displays%20showing%20governance%20and%20performance%20data%2C%20navy%20and%20cream%20colour%20scheme%2C%20warm%20professional%20lighting%2C%20clean%20architectural%20design%2C%20British%20public%20sector%20atmosphere%2C%20sophisticated%20environment%2C%20no%20people%2C%20editorial%20photography%20style&width=1920&height=1080&seq=campaign-public-sector-hero&orientation=landscape"
          heroImageAlt="Public Sector Project Controls Capability"
          primaryCta={{ label: 'Explore Public Sector Route', href: '#lead-form' }}
          secondaryCta={{ label: 'Request an employer consultation', href: '#lead-form' }}
          badges={heroBadges}
          urgencyMessage="Limited KBC-funded support available — secure your place before the current support allocation closes."
          bestFor={['Programme Managers', 'PMO Leads', 'Delivery Teams', 'Governance Officers', 'Transformation Teams']}
          sectors={['Public Sector', 'Councils', 'Local Authorities', 'Government', 'Transformation']}
        />
  );
}
