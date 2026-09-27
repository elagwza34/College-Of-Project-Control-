import ArticleCta from '@/components/feature/ArticleCta';

/** Section: Check Construction Route Eligibility. */
export default function CheckConstructionRouteEligibility() {
  return (
    <ArticleCta
            title="Check Construction Route Eligibility"
            body="Complete the form and an adviser will help you understand funding eligibility and how the construction PCP route fits your team's capability needs."
            primaryCta={{ label: 'Check Construction Route Eligibility', href: '/project-controls-professional-level-6#eligibility', tracking: 'eligibility_check_click' }}
            secondaryCta={{ label: 'Request a consultation', href: '/project-controls-professional-level-6#consultation', tracking: 'book_consultation_click' }}
            formFields={['name', 'email', 'phone', 'employer', 'job_title', 'learner_count', 'message']}
          />
  );
}
