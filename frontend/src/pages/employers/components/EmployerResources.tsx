import type { CardItem } from './cardTypes';

import SectionHeading from '@/components/base/SectionHeading';
import SiteLink from '@/components/base/SiteLink';

const employerResources: CardItem[] = [
  { title: 'Employer Dashboard', description: 'Access employer systems and progress information.', icon: 'ri-dashboard-line', href: 'https://employer.kentbusinesscollege.net/', external: true },
  { title: 'Employer Agreement', description: 'Review or complete the relevant employer documentation.', icon: 'ri-file-sign-line', href: 'https://kentbusinesscollege.com/employer-agreement/', external: true },
  { title: 'Progress Review Guide', description: 'Understand what happens before, during and after a learner progress review.', icon: 'ri-calendar-todo-line', href: '#progress' },
  { title: 'Funding Guidance', description: 'Understand apprenticeship and programme funding routes.', icon: 'ri-funds-line', href: '/knowledge-hub/employer-apprenticeship-funding' },
  { title: 'Safeguarding & Support', description: 'Find the relevant KBC support and safeguarding information.', icon: 'ri-shield-user-line', href: 'https://kentbusinesscollege.com/safeguarding-handbook/', external: true },
];

export default function EmployerResources() {
  return (
<section id="resources" className="py-16 md:py-24"><div className="container-site"><SectionHeading tag="Employer resources" title="Employer resources in one place" className="mb-12" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{employerResources.map(r => <SiteLink key={r.title} href={r.href} target={r.external ? '_blank' : undefined} rel={r.external ? 'noreferrer' : undefined} className="group flex min-h-32 items-start gap-4 rounded-xl border border-background-200 bg-white p-5 transition hover:border-primary-300"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700"><i className={`${r.icon} text-lg`} /></span><span><strong className="block text-sm">{r.title}</strong><span className="mt-1 block text-xs text-foreground-600">{r.description}</span></span><i className="ri-arrow-right-up-line ml-auto text-primary-500" /></SiteLink>)}</div></div></section>
  );
}
