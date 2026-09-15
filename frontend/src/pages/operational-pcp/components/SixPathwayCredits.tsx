import SiteLink from '@/components/base/SiteLink';
import CoreCreditAIInProjectControls from "./CoreCreditAIInProjectControls";
import CoreCreditPMPPreparation from "./CoreCreditPMPPreparation";
import CoreCreditProjectPlanningAndControl from "./CoreCreditProjectPlanningAndControl";
import SpecialistElectiveAPMRiskManagement from "./SpecialistElectiveAPMRiskManagement";
import SpecialistElectiveEarnedValueManagement from "./SpecialistElectiveEarnedValueManagement";
import SpecialistElectivePMISchedulingProfessional from "./SpecialistElectivePMISchedulingProfessional";

export default function SixPathwayCredits() {
  return (
<section id="operational-modules" className="scroll-mt-44 py-16 md:py-20 bg-white">
        <div className="container-site">
          <div className="mb-10 max-w-3xl space-y-4">
            <div className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-accent-700">
              {"Six pathway credits "}
            </div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl text-foreground-950">
              {"Six credits that build operational capability "}
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-foreground-600">
              {"Each credit provides a structured context for applying the full Project Controls Professional occupational standard. "}
            </p>
          </div>
          <div aria-label="Recommended six-credit pathway structure" className="mb-10 rounded-2xl border border-background-200 bg-background-50 p-5 md:p-7">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-5">
              <div>
                <h3 className="mb-3 text-xl font-bold leading-snug text-foreground-950">
                  {"How the six-credit pathway flows "}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-600">
                  {"Complete the five core credits, then select one specialist elective to complete the recommended six-credit structure. "}
                </p>
              </div>
              <div className="shrink-0 rounded-xl bg-primary-800 px-5 py-3 text-center text-white [&_strong]:block [&_strong]:text-3xl [&_span]:text-xs">
                <strong>
                  {"6 "}
                </strong>
                <span>
                  {"Total credits "}
                </span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-background-200 bg-white p-5">
                <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-accent-700">
                  {"Core stage 01 "}
                </span>
                <h3 className="mb-3 text-xl font-bold leading-snug text-foreground-950">
                  {"PMP preparation "}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-600">
                  {"Project leadership, value, people, process and business environment. "}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary-800">
                  <strong>
                    {"2 "}
                  </strong>
                  <span>
                    {"Credits "}
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-background-200 bg-white p-5">
                <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-accent-700">
                  {"Core stage 02 "}
                </span>
                <h3 className="mb-3 text-xl font-bold leading-snug text-foreground-950">
                  {"AI in Project Controls "}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-600">
                  {"Responsible AI workflows, dashboards, automation and governed decisions. "}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary-800">
                  <strong>
                    {"1 "}
                  </strong>
                  <span>
                    {"Credit "}
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-background-200 bg-white p-5">
                <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-accent-700">
                  {"Core stage 03 "}
                </span>
                <h3 className="mb-3 text-xl font-bold leading-snug text-foreground-950">
                  {"Project Planning and Control "}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-600">
                  {"Integrated planning, monitoring, schedule, cost, progress and change control. "}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary-800">
                  <strong>
                    {"2 "}
                  </strong>
                  <span>
                    {"Credits "}
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-background-200 bg-white p-5">
                <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-accent-700">
                  {"Specialist choice "}
                </span>
                <h3 className="mb-3 text-xl font-bold leading-snug text-foreground-950">
                  {"Choose one specialist elective "}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-600">
                  {"APM Risk Management, Earned Value Management or PMI Scheduling Professional. "}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary-800">
                  <strong>
                    {"1 "}
                  </strong>
                  <span>
                    {"Credit "}
                  </span>
                </div>
              </div>
            </div>
            <div aria-label="Specialist elective options" className="mt-6 flex flex-wrap gap-3 [&_a]:rounded-lg [&_a]:border [&_a]:border-primary-200 [&_a]:bg-white [&_a]:px-4 [&_a]:py-3">
              <SiteLink href="#credit-apm-risk" className="font-semibold underline underline-offset-4 text-primary-700">
                {"View APM Risk Management "}
              </SiteLink>
              <SiteLink href="#credit-evm" className="font-semibold underline underline-offset-4 text-primary-700">
                {"View Earned Value Management "}
              </SiteLink>
              <SiteLink href="#credit-pmi-sp" className="font-semibold underline underline-offset-4 text-primary-700">
                {"View PMI Scheduling Professional "}
              </SiteLink>
            </div>
          </div>
          <div className="space-y-6">
            <CoreCreditPMPPreparation />
            <CoreCreditAIInProjectControls />
            <CoreCreditProjectPlanningAndControl />
            <SpecialistElectiveAPMRiskManagement />
            <SpecialistElectiveEarnedValueManagement />
            <SpecialistElectivePMISchedulingProfessional />
          </div>
          <div className="mt-8 rounded-xl border border-accent-200 border-l-4 border-l-accent-600 bg-accent-50 p-5">
            <p className="text-sm leading-relaxed text-foreground-600">
              <strong>
                {"Assessment and award boundary: "}
              </strong>
              {"KBC learning and pathway assessment support the apprenticeship and exam preparation. Any external professional qualification is subject to the owner's current syllabus, eligibility, registration, examination and award decisions. "}
            </p>
          </div>
        </div>
      </section>
  );
}
