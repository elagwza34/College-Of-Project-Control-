import ArticleCta from '@/components/feature/ArticleCta';

/** Section: Check Your Organisation's Funding Eligibility. */
export default function CheckYourOrganisationsFundingEligibility() {
  return (
    <ArticleCta
            title="Check Your Organisation's Funding Eligibility"
            body="Complete the form and an adviser will help you understand your funding position, how many learners you can support and the best route for your team."
            primaryCta={{ label: 'Check Funding Availability', href: '/project-controls-professional-level-6#eligibility', tracking: 'eligibility_check_click' }}
            secondaryCta={{ label: 'Request an employer consultation', href: '/project-controls-professional-level-6#consultation', tracking: 'book_consultation_click' }}
            formFields={['name', 'email', 'phone', 'employer', 'job_title', 'learner_count', 'sector', 'message']}
          />
  );
}
