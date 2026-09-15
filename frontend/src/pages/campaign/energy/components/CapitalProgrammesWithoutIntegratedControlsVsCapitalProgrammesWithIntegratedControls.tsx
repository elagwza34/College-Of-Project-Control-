import CampaignTransformation from '@/components/feature/CampaignTransformation';
import { afterItems,beforeItems } from "../campaignData";

/** Section: Capital Programmes Without Integrated Controls vs Capital Programmes With Integrated Controls. */
export default function CapitalProgrammesWithoutIntegratedControlsVsCapitalProgrammesWithIntegratedControls() {
  return (
    <CampaignTransformation
          title="Capital Programmes Without Integrated Controls vs Capital Programmes With Integrated Controls"
          subtitle="The difference between hoping for the best and building the capability to control delivery."
          beforeTitle="Fragmented Controls"
          afterTitle="Integrated Project Controls"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />
  );
}
