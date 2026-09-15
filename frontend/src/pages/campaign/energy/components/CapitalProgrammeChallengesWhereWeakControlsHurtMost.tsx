import PcpPainPointsGrid from '@/components/feature/PcpPainPointsGrid';
import { painPoints } from "../campaignData";

/** Section: Capital Programme Challenges Where Weak Controls Hurt Most. */
export default function CapitalProgrammeChallengesWhereWeakControlsHurtMost() {
  return (
    <PcpPainPointsGrid
          title="Capital Programme Challenges Where Weak Controls Hurt Most"
          subtitle="In capital programmes, these problems do not self-correct. They compound."
          painPoints={painPoints}
        />
  );
}
