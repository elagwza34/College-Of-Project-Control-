import SiteLink from '@/components/base/SiteLink';

/** Section: Taking the Next Step. */
export default function TakingTheNextStep() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Taking the Next Step</h3>
        <p className="mb-4">
          <strong>Build the project controls capability your career cannot afford to be without.</strong> If apprenticeship funding is not available for your situation, the commercial route provides a serious, structured professional development pathway. The best next step is to speak to an adviser who understands your circumstances and can discuss the commercial route options, payment plans and any bursary support that may be available.
        </p>
        <p className="mb-4">
          <SiteLink href="/campaign/commercial-route" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the Commercial Route Landing Page →</SiteLink>
        </p>
      </>
  );
}
