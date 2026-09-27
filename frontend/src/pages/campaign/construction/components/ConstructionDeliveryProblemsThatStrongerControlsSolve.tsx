import PcpPainPointsGrid from '@/components/feature/PcpPainPointsGrid';
import { painPoints } from "../campaignData";

/** Section: Construction Delivery Problems That Stronger Controls Solve. */
export default function ConstructionDeliveryProblemsThatStrongerControlsSolve() {
  return (
    <PcpPainPointsGrid
          title="Construction Delivery Problems That Stronger Controls Solve"
          subtitle="Develop planning, cost and change-control skills to address these construction challenges."
          painPoints={painPoints}
        />
  );
}
