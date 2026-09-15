import PcpPainPointsGrid from '@/components/feature/PcpPainPointsGrid';
import { painPoints } from "../campaignData";

/** Section: Public Sector Delivery Challenges That Stronger Controls Address. */
export default function PublicSectorDeliveryChallengesThatStrongerControlsAddress() {
  return (
    <PcpPainPointsGrid
          title="Public Sector Delivery Challenges That Stronger Controls Address"
          subtitle="These are not just programme problems — they affect public trust and political confidence."
          painPoints={painPoints}
        />
  );
}
