import CardGrid from './CardGrid';
import type { CardItem } from './cardTypes';

import SectionHeading from '@/components/base/SectionHeading';

const employerNeeds: CardItem[] = [
  { title: 'Develop an existing professional', description: 'Give a current team member structured project controls or project management development aligned with their role and live responsibilities.', icon: 'ri-user-settings-line', cta: 'Develop My Team', href: '/book-a-session' },
  { title: 'Build specialist controls capability', description: 'Strengthen planning, scheduling, cost, risk, change, reporting, assurance or governance capability.', icon: 'ri-tools-line', cta: 'Explore Specialist Training', href: '#programmes' },
  { title: 'Build a project controls team', description: 'Create a consistent capability pathway across project controls, PMO and project delivery roles.', icon: 'ri-team-line', cta: 'Discuss a Team Pathway', href: '/book-a-session' },
  { title: 'Choose the right development route', description: 'Map role responsibilities, current capability and progression goals to the most suitable project controls pathway.', icon: 'ri-route-line', cta: 'Compare Project Routes', href: '#programmes' },
];

export default function StartWithYourNeed() {
  return (
<section id="employer-needs" className="py-16 md:py-24"><div className="container-site"><SectionHeading tag="Start with your need" title="What are you trying to achieve?" subtitle="Choose the situation closest to your organisation. We will help you identify the most appropriate next step." className="mb-12" /><CardGrid items={employerNeeds} columns="lg:grid-cols-4" /></div></section>
  );
}
