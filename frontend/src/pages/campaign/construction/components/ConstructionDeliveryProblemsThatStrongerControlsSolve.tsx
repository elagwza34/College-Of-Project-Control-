import PcpPainPointsGrid from '@/components/feature/PcpPainPointsGrid';
import { painPoints } from "../campaignData";

/** Section: Construction Delivery Problems That Stronger Controls Solve. */
export default function ConstructionDeliveryProblemsThatStrongerControlsSolve() {
  return (
    <PcpPainPointsGrid
          title="Construction Delivery Problems That Stronger Controls Solve"
          subtitle="These are not inevitable. They are capability gaps the Operational PCP route closes."
          painPoints={painPoints}
        />
  );
}
