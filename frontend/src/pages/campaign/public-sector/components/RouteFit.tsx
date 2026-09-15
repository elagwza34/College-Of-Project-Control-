import CampaignRouteFit from '@/components/feature/CampaignRouteFit';
import { routeFitCards } from "../campaignData";

/** Section: Route Fit. */
export default function RouteFit() {
  return (
    <CampaignRouteFit
          tag="Route Fit"
          title="Routes Built for Public Sector Reality"
          subtitle="Select the route that matches your programme environment and governance requirements."
          routes={routeFitCards}
        />
  );
}
