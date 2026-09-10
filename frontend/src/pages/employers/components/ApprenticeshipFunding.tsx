import CardGrid from './CardGrid';
import type { CardItem } from './cardTypes';

import SiteLink from '@/components/base/SiteLink';
import SectionHeading from '@/components/base/SectionHeading';

const fundingRoutes: CardItem[] = [
  { title: 'Levy funding', description: 'Employers with available apprenticeship levy funds may be able to use their Apprenticeship Service account to fund eligible training.', icon: 'ri-bank-line' },
  { title: 'Government co-investment', description: 'Where applicable, government co-investment may support eligible apprenticeship training, with the employer contribution determined by the rules in force.', icon: 'ri-government-line' },
  { title: 'Other development routes', description: 'Where apprenticeship funding is not appropriate, KBC may discuss employer-funded training or other available development and bursary routes where applicable.', icon: 'ri-road-map-line' },
];

export default function ApprenticeshipFunding() {
  return (
<section id="funding" className="py-16 md:py-24"><div className="container-site"><SectionHeading tag="Apprenticeship funding" title="Understand the funding route before you commit." subtitle="Apprenticeship funding depends on the programme, employee, employer, available funds and the rules applicable to the intended start date. KBC reviews the funding position before enrolment so that the employer understands the agreed training cost and funding route." className="mb-12" /><CardGrid items={fundingRoutes} /><div className="mt-8 rounded-xl border border-highlight-300 bg-highlight-50 p-5 text-sm text-foreground-700"><strong>Before enrolment:</strong> Funding is subject to eligibility, programme requirements, prior-learning review, employer agreement and the rules applicable to the relevant intake. Final terms are confirmed before enrolment.</div><div className="mt-7 text-center"><SiteLink href="/knowledge-hub/employer-apprenticeship-funding" className="btn-primary inline-flex min-h-12 items-center px-6 text-sm font-bold">Discuss Funding</SiteLink></div></div></section>
  );
}
