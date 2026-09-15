import ArticleCta from '@/components/feature/ArticleCta';

/** Section: Explore APM ChPP Readiness Support. */
export default function ExploreAPMChPPReadinessSupport() {
  return (
    <ArticleCta
            title="Explore APM ChPP Readiness Support"
            body="Speak to an adviser about how ChPP readiness support fits your professional development pathway and which PCP route gives you the strongest preparation."
            primaryCta={{ label: 'Request a consultation', href: '/pcp-master#consultation', tracking: 'book_consultation_click' }}
            secondaryCta={{ label: 'Check Eligibility', href: '/pcp-master#eligibility', tracking: 'eligibility_check_click' }}
          />
  );
}
