import CampaignTransformation from '@/components/feature/CampaignTransformation';
import { afterItems,beforeItems } from "../campaignData";

/** Section: Construction Without Controls vs Construction With Controls. */
export default function ConstructionWithoutControlsVsConstructionWithControls() {
  return (
    <CampaignTransformation
          title="Construction Without Controls vs Construction With Controls"
          subtitle="The difference between accepting delay as normal and building the capability to control delivery."
          beforeTitle="Weak Project Controls"
          afterTitle="Professional Project Controls"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />
  );
}
