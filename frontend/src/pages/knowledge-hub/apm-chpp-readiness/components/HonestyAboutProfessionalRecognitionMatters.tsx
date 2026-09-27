import KBCComplianceNote from "./KBCComplianceNote";
import NextSteps from "./NextSteps";
import WhatChPPReadinessSupportDoesNOTGuarantee from "./WhatChPPReadinessSupportDoesNOTGuarantee";
import WhatChPPReadinessSupportMeans from "./WhatChPPReadinessSupportMeans";
import WhatIsAPMChPP from "./WhatIsAPMChPP";
import WhyChPPReadinessMattersEvenWithoutAGuarantee from "./WhyChPPReadinessMattersEvenWithoutAGuarantee";

/** Section: Honesty About Professional Recognition Matters. */
export default function HonestyAboutProfessionalRecognitionMatters() {
  return (
    <><h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">Honesty About Professional Recognition Matters</h2>
        <p className="mb-4">
          This guide explains how ChPP readiness support helps you prepare professional evidence, what support may include and why eligibility and Chartered status remain subject to APM’s independent assessment.
        </p>

        <WhatIsAPMChPP /><WhatChPPReadinessSupportMeans /><WhatChPPReadinessSupportDoesNOTGuarantee /><WhyChPPReadinessMattersEvenWithoutAGuarantee /><KBCComplianceNote /><NextSteps /></>
  );
}
