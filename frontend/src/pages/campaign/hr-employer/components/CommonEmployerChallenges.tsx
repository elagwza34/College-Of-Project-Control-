import PcpPainPointsGrid from '@/components/feature/PcpPainPointsGrid';
import { painPoints } from "../campaignData";

/** Section: Common Employer Challenges. */
export default function CommonEmployerChallenges() {
  return (
    <PcpPainPointsGrid
          title="Common Employer Challenges"
          subtitle="The problems that drive HR and L&amp;D teams to look beyond traditional training."
          painPoints={painPoints}
        />
  );
}
