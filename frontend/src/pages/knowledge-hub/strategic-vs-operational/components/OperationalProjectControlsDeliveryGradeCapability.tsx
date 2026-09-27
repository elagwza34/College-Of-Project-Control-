import SiteLink from '@/components/base/SiteLink';

/** Section: Operational Project Controls: Delivery-Grade Capability. */
export default function OperationalProjectControlsDeliveryGradeCapability() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Operational Project Controls: Delivery-Grade Capability</h3>
        <p className="mb-4">
          The operational route is for professionals who work on live projects every day — the planners, schedulers, cost engineers, risk managers and performance analysts who make sure projects stay on track. This is where project controls capability meets project reality.
        </p>
        <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 my-6">
          <h4 className="text-base font-heading font-semibold text-foreground-900 mb-3">Operational PCP — Best For:</h4>
          <ul className="space-y-2 text-sm text-foreground-700">
            <li className="flex items-start gap-2"><i className="ri-check-line text-primary-500 mt-0.5 flex-shrink-0"></i><span><strong>Roles:</strong> Planners, Schedulers, Cost Engineers, Risk Managers, Project Controls Analysts, Performance Reporting Specialists</span></li>
            <li className="flex items-start gap-2"><i className="ri-check-line text-primary-500 mt-0.5 flex-shrink-0"></i><span><strong>Sectors:</strong> Construction, energy, public sector, engineering, manufacturing, aerospace, pharmaceuticals</span></li>
            <li className="flex items-start gap-2"><i className="ri-check-line text-primary-500 mt-0.5 flex-shrink-0"></i><span><strong>Pain point:</strong> "We report delays after they happen. We need to see them earlier."</span></li>
          </ul>
        </div>
        <p className="mb-4">
          <strong>Stop reporting project problems after they happen. Build the capability to see them earlier.</strong> Operational project controls capability means you produce schedules that drive delivery, cost forecasts that finance directors trust, risk registers that actually influence decisions and reports that tell the truth before it is too late to act.
        </p>
        <p className="mb-4">
          <SiteLink href="/project-controls-professional/operational-route" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the Operational PCP Route →</SiteLink>
        </p>

        </>
  );
}
