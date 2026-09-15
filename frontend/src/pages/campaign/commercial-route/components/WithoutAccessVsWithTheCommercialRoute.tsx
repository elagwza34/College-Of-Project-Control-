import CampaignTransformation from '@/components/feature/CampaignTransformation';
import { afterItems,beforeItems } from "../campaignData";

/** Section: Without Access vs With the Commercial Route. */
export default function WithoutAccessVsWithTheCommercialRoute() {
  return (
    <CampaignTransformation
          title="Without Access vs With the Commercial Route"
          subtitle="The commercial pathway opens professional project controls development when apprenticeship funding is not available."
          beforeTitle="Limited Options"
          afterTitle="Commercial Route Access"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />
  );
}
