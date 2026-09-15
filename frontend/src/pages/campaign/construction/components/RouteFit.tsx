import CampaignRouteFit from '@/components/feature/CampaignRouteFit';
import { routeFitCards } from "../campaignData";

/** Section: Route Fit. */
export default function RouteFit() {
  return (
    <CampaignRouteFit
          tag="Route Fit"
          title="Routes Built for Construction Reality"
          subtitle="Select the route that matches your role and the complexity of your construction programmes."
          routes={routeFitCards}
        />
  );
}
