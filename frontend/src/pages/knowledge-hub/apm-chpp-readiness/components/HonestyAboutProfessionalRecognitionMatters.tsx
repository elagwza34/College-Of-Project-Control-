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
          When a professional development programme mentions "ChPP readiness," it is easy to misunderstand what that means. Some providers blur the line between preparation and guarantee. At the College of Project Controls, we believe honesty about professional recognition matters. This article explains exactly what APM ChPP readiness support includes, how it helps and — equally important — what it does not promise.
        </p>

        <WhatIsAPMChPP /><WhatChPPReadinessSupportMeans /><WhatChPPReadinessSupportDoesNOTGuarantee /><WhyChPPReadinessMattersEvenWithoutAGuarantee /><KBCComplianceNote /><NextSteps /></>
  );
}
