import ArticleCta from '@/components/feature/ArticleCta';

/** Section: Find Your Best Route. */
export default function FindYourBestRoute() {
  return (
    <ArticleCta
            title="Find Your Best Route"
            body="Not sure whether strategic, operational or the combined route fits your career? Speak to an adviser who understands both pathways and can help you choose with confidence."
            primaryCta={{ label: 'Find Your Best Route', href: '/project-controls-professional-level-6#routes', tracking: 'article_find_route_click' }}
            secondaryCta={{ label: 'Request a consultation', href: '/project-controls-professional-level-6#consultation', tracking: 'book_consultation_click' }}
          />
  );
}
