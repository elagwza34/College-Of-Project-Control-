import CampaignRouteFit from '@/components/feature/CampaignRouteFit';
import { routeFitCards } from "../campaignData";

/** Section: Route Fit. */
export default function RouteFit() {
  return (
    <CampaignRouteFit
          tag="Route Fit"
          title="Which Route Matches Your Career Goals?"
          subtitle="Three routes are available through the commercial pathway, each designed for different career stages and ambitions."
          routes={routeFitCards}
        />
  );
}
