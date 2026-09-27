import ArticleCta from '@/components/feature/ArticleCta';

/** Section: Explore the Commercial Route. */
export default function ExploreTheCommercialRoute() {
  return (
    <ArticleCta
            title="Explore the Commercial Route"
            body="Complete the form and an adviser will discuss your situation, the commercial route options and whether a discretionary KBC bursary might be available to support your development."
            primaryCta={{ label: 'Speak to an Adviser', href: '/project-controls-professional-level-6#consultation', tracking: 'book_consultation_click' }}
            secondaryCta={{ label: 'Explore the Commercial Route', href: '/campaign/commercial-route', tracking: 'commercial_route_click' }}
            formFields={['name', 'email', 'phone', 'employment_status', 'route', 'message']}
          />
  );
}
