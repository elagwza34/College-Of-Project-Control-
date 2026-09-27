import ArticleCta from '@/components/feature/ArticleCta';

/** Section: Not Sure Which Route Fits You?. */
export default function NotSureWhichRouteFitsYou() {
  return (
    <ArticleCta
            title="Not Sure Which Route Fits You?"
            body="Speak to an adviser about your career goals, current experience and sector. We will help you understand which pathway gives you the strongest professional return."
            primaryCta={{ label: 'Find Your Best Route', href: '/project-controls-professional-level-6#routes', tracking: 'article_find_route_click' }}
            secondaryCta={{ label: 'Request a consultation', href: '/project-controls-professional-level-6#consultation', tracking: 'book_consultation_click' }}
          />
  );
}
