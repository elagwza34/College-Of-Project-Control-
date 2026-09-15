
/** Section: Step 1: Understand Your Funding Position. */
export default function Step1UnderstandYourFundingPosition() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Step 1: Understand Your Funding Position</h3>
        <p className="mb-4">
          The first step is understanding what funding is available to your organisation:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-background-200">
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">Organisation Type</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">Funding Mechanism</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">Employer Contribution</th>
              </tr>
            </thead>
            <tbody className="text-foreground-700">
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Levy-Paying (pay bill {'>'} £3M)</td>
                <td className="py-3 px-4">Apprenticeship levy funds via digital account</td>
                <td className="py-3 px-4">£0 (levy funds cover full cost up to band cap)</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Non-Levy (pay bill {'<'} £3M)</td>
                <td className="py-3 px-4">Government co-investment</td>
                <td className="py-3 px-4">5% of training cost (~£1,350 per learner)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-foreground-900">Non-Levy, fewer than 50 employees</td>
                <td className="py-3 px-4">Government co-investment + small employer waiver</td>
                <td className="py-3 px-4">£0 (government funds 100%)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4">
          <strong>Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility.</strong> If your organisation is not based in England, different apprenticeship funding rules apply. The commercial route is available for organisations and learners outside English funding eligibility.
        </p>

        </>
  );
}
