
/** Section: Side-by-Side Comparison. */
export default function SideBySideComparison() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Side-by-Side Comparison</h3>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-background-200">
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">Factor</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900 bg-primary-50/50">PCP Level 6</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">PMP Certification</th>
              </tr>
            </thead>
            <tbody className="text-foreground-700">
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Type</td>
                <td className="py-3 px-4 bg-primary-50/30">Structured professional development pathway (apprenticeship)</td>
                <td className="py-3 px-4">Standalone certification exam</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Duration</td>
                <td className="py-3 px-4 bg-primary-50/30">24-36 months</td>
                <td className="py-3 px-4">Self-paced; typically 3-6 months preparation</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Funding (UK)</td>
                <td className="py-3 px-4 bg-primary-50/30">Funding subject to eligibility for employers in England via apprenticeship funding</td>
                <td className="py-3 px-4">Self-funded or employer-sponsored (typically £500-£2,000)</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Assessment</td>
                <td className="py-3 px-4 bg-primary-50/30">Workplace evidence portfolio, professional discussion, end-point assessment</td>
                <td className="py-3 px-4">180-question multiple-choice exam</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Focus</td>
                <td className="py-3 px-4 bg-primary-50/30">Project controls: planning, cost, risk, reporting, governance</td>
                <td className="py-3 px-4">General project management knowledge areas</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Workplace evidence</td>
                <td className="py-3 px-4 bg-primary-50/30">Required — you prove capability through real work</td>
                <td className="py-3 px-4">Experience hours required but not formally assessed as evidence</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">APM recognition</td>
                <td className="py-3 px-4 bg-primary-50/30">APM ChPP readiness support included</td>
                <td className="py-3 px-4">No APM recognition pathway</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Sector focus</td>
                <td className="py-3 px-4 bg-primary-50/30">Sector-specific routes available</td>
                <td className="py-3 px-4">Generic; not sector-specific</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Tutoring</td>
                <td className="py-3 px-4 bg-primary-50/30">One-to-one tutoring included</td>
                <td className="py-3 px-4">Self-study or optional paid courses</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-foreground-900">Global recognition</td>
                <td className="py-3 px-4 bg-primary-50/30">UK apprenticeship standard; growing employer recognition</td>
                <td className="py-3 px-4">Widely recognised internationally</td>
              </tr>
            </tbody>
          </table>
        </div>

        </>
  );
}
