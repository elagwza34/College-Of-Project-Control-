import CampaignRouteFit from '@/components/feature/CampaignRouteFit';
import { routeFitCards } from "../campaignData";

/** Section: Route Fit. */
export default function RouteFit() {
  return (
    <CampaignRouteFit
          tag="Route Fit"
          title="Which Route Fits Your Team?"
          subtitle="Select the route that matches the roles, sectors and capability goals of your organisation."
          routes={routeFitCards}
        />
  );
}
