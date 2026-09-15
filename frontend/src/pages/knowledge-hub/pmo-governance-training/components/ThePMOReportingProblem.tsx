
/** Section: The PMO Reporting Problem. */
export default function ThePMOReportingProblem() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">The PMO Reporting Problem</h3>
        <p className="mb-4">
          Most PMO reporting answers the wrong question. It answers "What happened?" when senior leaders need to know "What should we do now?" The gap between reporting activity and decision confidence is where PMO value is lost — and where governance maturity is measured.
        </p>
        <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 my-6">
          <h4 className="text-base font-heading font-semibold text-foreground-900 mb-3">Before and After Stronger PMO Governance</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-label font-semibold uppercase tracking-wider text-foreground-600 mb-2">Before</p>
              <ul className="space-y-1.5 text-foreground-600">
                <li className="flex items-start gap-1.5"><i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0"></i><span>Reports describe what happened</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0"></i><span>Risks escalated after they become issues</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0"></i><span>Governance evidence assembled for audits, not used for decisions</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0"></i><span>Portfolio visibility is patchy and inconsistent</span></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-label font-semibold uppercase tracking-wider text-primary-600 mb-2">After</p>
              <ul className="space-y-1.5 text-foreground-700">
                <li className="flex items-start gap-1.5"><i className="ri-checkbox-circle-line text-primary-500 mt-0.5 flex-shrink-0"></i><span>Reports highlight decisions needed, not just activity completed</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-checkbox-circle-line text-primary-500 mt-0.5 flex-shrink-0"></i><span>Risks identified early enough to act</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-checkbox-circle-line text-primary-500 mt-0.5 flex-shrink-0"></i><span>Governance evidence drives decisions and satisfies audits</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-checkbox-circle-line text-primary-500 mt-0.5 flex-shrink-0"></i><span>Portfolio visibility is consistent and decision-ready</span></li>
              </ul>
            </div>
          </div>
        </div>

        </>
  );
}
