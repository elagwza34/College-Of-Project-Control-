import ApprenticeshipEligibility from './ApprenticeshipEligibility';
import FundingAndCosts from './FundingAndCosts';
import InstituteOfProjectControls from './InstituteOfProjectControls';

/** Section: Funding eligibility and IPC support. */
export default function FundingEligibilityAndIPCSupport() {
  return (
    <div id="funding" aria-label={("Certified PMO Professional Level 6") + ' funding, eligibility and IPC support'}>
      <FundingAndCosts />
      <ApprenticeshipEligibility />
      <InstituteOfProjectControls />
    </div>
  );
}
