import SideBySideComparison from "./SideBySideComparison";
import TheBottomLine from "./TheBottomLine";
import WhatAboutTheCommercialPCPRoute from "./WhatAboutTheCommercialPCPRoute";
import WhenPMPMayBeTheBetterChoice from "./WhenPMPMayBeTheBetterChoice";
import WhenThePCPLevel6IsTheBetterChoice from "./WhenThePCPLevel6IsTheBetterChoice";

/** Section: Two Different Paths. Two Different Purposes.. */
export default function TwoDifferentPathsTwoDifferentPurposes() {
  return (
    <><h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">Two Different Paths. Two Different Purposes.</h2>
        <p className="mb-4">
          If you are a project professional in the UK trying to decide between the Level 6 Project Controls Professional apprenticeship and the PMP certification, the honest answer is: they serve different purposes and suit different career stages. <strong>Project controls capability is cheaper to build than project failure is to fix</strong> — but which route helps you build it depends on where you are now and where you want to go.
        </p>

        <SideBySideComparison /><WhenThePCPLevel6IsTheBetterChoice /><WhenPMPMayBeTheBetterChoice /><WhatAboutTheCommercialPCPRoute /><TheBottomLine /></>
  );
}
