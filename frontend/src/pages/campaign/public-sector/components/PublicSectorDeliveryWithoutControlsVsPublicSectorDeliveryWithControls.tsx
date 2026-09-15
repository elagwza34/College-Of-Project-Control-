import CampaignTransformation from '@/components/feature/CampaignTransformation';
import { afterItems,beforeItems } from "../campaignData";

/** Section: Public Sector Delivery Without Controls vs Public Sector Delivery With Controls. */
export default function PublicSectorDeliveryWithoutControlsVsPublicSectorDeliveryWithControls() {
  return (
    <CampaignTransformation
          title="Public Sector Delivery Without Controls vs Public Sector Delivery With Controls"
          subtitle="The difference between surviving scrutiny and building delivery confidence."
          beforeTitle="Without Strong Controls"
          afterTitle="With Professional Controls"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />
  );
}
