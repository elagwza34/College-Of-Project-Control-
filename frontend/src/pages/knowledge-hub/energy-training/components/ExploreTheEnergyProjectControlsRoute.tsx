import ArticleCta from '@/components/feature/ArticleCta';

/** Section: Explore the Energy Project Controls Route. */
export default function ExploreTheEnergyProjectControlsRoute() {
  return (
    <ArticleCta
            title="Explore the Energy Project Controls Route"
            body="Complete the form and an adviser will help you understand funding eligibility and how the energy PCP route builds the project controls capability your capital programmes need."
            primaryCta={{ label: 'Explore Energy PCP Route', href: '/operational-pcp-energy', tracking: 'energy_route_click' }}
            secondaryCta={{ label: 'Check Funding Availability', href: '/pcp-master#eligibility', tracking: 'eligibility_check_click' }}
            formFields={['name', 'email', 'phone', 'employer', 'job_title', 'learner_count', 'message']}
          />
  );
}
