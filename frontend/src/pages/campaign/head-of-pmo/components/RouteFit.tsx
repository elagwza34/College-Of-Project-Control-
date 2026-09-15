import CampaignRouteFit from '@/components/feature/CampaignRouteFit';
import { routeFitCards } from "../campaignData";

/** Section: Route Fit. */
export default function RouteFit() {
  return (
    <CampaignRouteFit
          tag="Route Fit"
          title="Routes Built for PMO and Governance Professionals"
          subtitle="Select the route that aligns with your PMO maturity and career progression goals."
          routes={routeFitCards}
        />
  );
}
