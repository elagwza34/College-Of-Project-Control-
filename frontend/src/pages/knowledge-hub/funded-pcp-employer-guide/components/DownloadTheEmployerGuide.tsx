import SiteLink from '@/components/base/SiteLink';

/** Section: Download the Employer Guide. */
export default function DownloadTheEmployerGuide() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Download the Employer Guide</h3>
        <p className="mb-4">
          For a detailed, practical guide covering funding eligibility, route selection, learner support and employer value,{' '}
          <SiteLink href="/contact?context=Employer%20guide" className="text-primary-600 hover:text-primary-700 underline">download the Employer Guide to Project Controls Funding</SiteLink>.
        </p>
      </>
  );
}
