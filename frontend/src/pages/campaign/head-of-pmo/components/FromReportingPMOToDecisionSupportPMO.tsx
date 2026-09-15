import CampaignTransformation from '@/components/feature/CampaignTransformation';
import { afterItems,beforeItems } from "../campaignData";

/** Section: From Reporting PMO to Decision-Support PMO. */
export default function FromReportingPMOToDecisionSupportPMO() {
  return (
    <CampaignTransformation
          title="From Reporting PMO to Decision-Support PMO"
          subtitle="The difference between producing reports and building decision confidence."
          beforeTitle="Reporting PMO"
          afterTitle="Decision-Support PMO"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />
  );
}
