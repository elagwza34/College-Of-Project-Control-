import CampaignTransformation from '@/components/feature/CampaignTransformation';
import { afterItems,beforeItems } from "../campaignData";

/** Section: Traditional Training vs Funded Professional Development. */
export default function TraditionalTrainingVsFundedProfessionalDevelopment() {
  return (
    <CampaignTransformation
          title="Traditional Training vs Funded Professional Development"
          subtitle="The difference between spending your training budget and building measurable organisational capability."
          beforeTitle="Traditional Training"
          afterTitle="College of Project Controls Pathway"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />
  );
}
