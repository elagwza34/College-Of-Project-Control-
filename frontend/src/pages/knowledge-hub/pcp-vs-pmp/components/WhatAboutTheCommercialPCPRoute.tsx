import SiteLink from '@/components/base/SiteLink';

/** Section: What About the Commercial PCP Route?. */
export default function WhatAboutTheCommercialPCPRoute() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">What About the Commercial PCP Route?</h3>
        <p className="mb-4">
          If apprenticeship funding is not available — for example, you are self-employed, a career changer or employed outside England — the{' '}
          <SiteLink href="/campaign/commercial-route" className="text-primary-600 hover:text-primary-700 underline">commercial PCP route</SiteLink>{' '}
          still gives access to professional project controls development. This includes flexible payment options, discretionary KBC bursary options and interest-free instalments where available.
        </p>

        </>
  );
}
