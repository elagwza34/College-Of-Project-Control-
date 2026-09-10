import CardGrid from './CardGrid';
import type { CardItem } from './cardTypes';

import SectionHeading from '@/components/base/SectionHeading';

const employerResponsibilities: CardItem[] = [
  { title: 'Provide a suitable role', description: 'The employee needs responsibilities that allow meaningful development and workplace application.', icon: 'ri-briefcase-line' },
  { title: 'Protect learning time', description: 'Support the agreed learning commitments and applicable off-the-job training requirements.', icon: 'ri-time-line' },
  { title: 'Take part in reviews', description: 'A suitable manager or employer representative participates in progress discussions.', icon: 'ri-team-line' },
  { title: 'Provide workplace opportunities', description: 'Where appropriate, enable the learner to apply new knowledge and develop evidence through relevant work.', icon: 'ri-door-open-line' },
  { title: 'Tell us when things change', description: 'Role, manager or employment changes can affect the training plan and should be communicated promptly.', icon: 'ri-notification-3-line' },
];

export default function ARealPartnership() {
  return (
<section id="responsibilities" className="bg-white py-16 md:py-24"><div className="container-site"><SectionHeading tag="A real partnership" title="What we need from the employer" subtitle="Strong work-based development depends on active employer involvement." className="mb-12" /><CardGrid items={employerResponsibilities} columns="lg:grid-cols-5" /></div></section>
  );
}
