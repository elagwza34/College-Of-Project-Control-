import ArticleCta from '@/components/feature/ArticleCta';

/** Section: Ready to Explore the PCP Route?. */
export default function ReadyToExploreThePCPRoute() {
  return (
    <ArticleCta
            title="Ready to Explore the PCP Route?"
            body="Check your eligibility and speak to an adviser about how the Level 6 Project Controls Professional apprenticeship fits your career goals or your organisation's capability needs."
            primaryCta={{ label: 'Check Eligibility', href: '/pcp-master#eligibility', tracking: 'eligibility_check_click' }}
            secondaryCta={{ label: 'Find Your Best Route', href: '/pcp-master#routes', tracking: 'article_find_route_click' }}
          />
  );
}
