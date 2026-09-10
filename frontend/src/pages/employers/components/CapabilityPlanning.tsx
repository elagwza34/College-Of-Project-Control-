import CardGrid from './CardGrid';
import type { CardItem } from './cardTypes';

import SectionHeading from '@/components/base/SectionHeading';

const workforceServices: CardItem[] = [
  { title: 'Project Controls Capability Mapping', description: 'Identify strengths and development gaps across planning, cost, risk, change, reporting and governance.', icon: 'ri-list-check-3' },
  { title: 'Role-to-Route Review', description: 'Map real project responsibilities to the appropriate level, route and specialist development priorities.', icon: 'ri-route-line' },
  { title: 'Team and Cohort Planning', description: 'Build a coordinated pathway for individuals, project controls teams or a wider PMO function.', icon: 'ri-group-line' },
  { title: 'PMO Maturity Conversations', description: 'Explore where governance, assurance, reporting and integrated controls practice need to become stronger.', icon: 'ri-building-2-line' },
  { title: 'Workplace Evidence Planning', description: 'Identify suitable live outputs and responsibilities through which learning can be applied and evidenced.', icon: 'ri-file-chart-line' },
  { title: 'Progress and Impact Planning', description: 'Agree useful indicators, review points and manager feedback around the capability being developed.', icon: 'ri-bar-chart-grouped-line' },
];

export default function CapabilityPlanning() {
  return (
<section id="workforce-services" className="py-16 md:py-24"><div className="container-site"><SectionHeading tag="Capability planning" title="Understand and strengthen your project controls function." subtitle="Start with the roles, controls disciplines and project environment before deciding how development should be structured." className="mb-12" /><CardGrid items={workforceServices} /></div></section>
  );
}
