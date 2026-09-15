import CampaignRouteFit from '@/components/feature/CampaignRouteFit';
import { routeFitCards } from "../campaignData";

/** Section: Route Fit. */
export default function RouteFit() {
  return (
    <CampaignRouteFit
          tag="Route Fit"
          title="Routes for Capital Programme Environments"
          subtitle="Select the route that matches the scale and complexity of your capital programmes."
          routes={routeFitCards}
        />
  );
}
