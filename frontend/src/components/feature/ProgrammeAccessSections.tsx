import PcpFundingStrip from './PcpFundingStrip';
import IpcAuthority from '@/components/feature/IpcAuthority';
import EligibilityCheckerSection from './EligibilityCheckerSection';

interface ProgrammeAccessSectionsProps {
  programmeName?: string;
}

/**
 * Funding, eligibility and IPC are intentionally kept in one component.
 * Use this component whenever the programme-access block is needed so the
 * three sections always remain adjacent and in the same order.
 */
export default function ProgrammeAccessSections({
  programmeName = 'your professional programme',
}: ProgrammeAccessSectionsProps) {
  return (
    <div id="funding" aria-label={`${programmeName} funding, eligibility and IPC support`}>
      <PcpFundingStrip />
      <EligibilityCheckerSection />

      <IpcAuthority />
    </div>
  );
}
