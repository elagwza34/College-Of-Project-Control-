import CardGrid from './CardGrid';
import type { CardItem } from './cardTypes';

import SectionHeading from '@/components/base/SectionHeading';

const employerValueProps: CardItem[] = [
  { title: 'Develop existing professionals', description: 'Build deeper project controls, project management and PMO capability without removing employees from the workplace.', icon: 'ri-user-star-line' },
  { title: 'Align learning to real roles', description: 'Connect programme outcomes with actual responsibilities, projects, systems and development needs.', icon: 'ri-focus-3-line' },
  { title: 'Create workplace value', description: 'Turn learning into practical outputs, stronger decisions, improved processes and evidence of professional capability.', icon: 'ri-briefcase-4-line' },
  { title: 'See progress clearly', description: 'Stay involved through structured reviews, employer feedback, progress information and agreed next actions.', icon: 'ri-line-chart-line' },
];

export default function WhyWorkWithKBC() {
  return (
<section id="overview" className="bg-white py-16 md:py-24"><div className="container-site"><SectionHeading tag="Why work with KBC" title="Training should solve a workforce need, not simply deliver a qualification." subtitle="We start with the role, the employee and the capability your organisation needs. Training is then aligned with workplace responsibilities so that learning can be applied, evidenced and reviewed throughout the programme." className="mb-12" /><CardGrid items={employerValueProps} columns="lg:grid-cols-4" /></div></section>
  );
}
