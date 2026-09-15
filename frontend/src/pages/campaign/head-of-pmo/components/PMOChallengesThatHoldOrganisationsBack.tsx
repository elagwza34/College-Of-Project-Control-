import PcpPainPointsGrid from '@/components/feature/PcpPainPointsGrid';
import { painPoints } from "../campaignData";

/** Section: PMO Challenges That Hold Organisations Back. */
export default function PMOChallengesThatHoldOrganisationsBack() {
  return (
    <PcpPainPointsGrid
          title="PMO Challenges That Hold Organisations Back"
          subtitle="The symptoms of a PMO that produces data but does not drive decisions."
          painPoints={painPoints}
        />
  );
}
