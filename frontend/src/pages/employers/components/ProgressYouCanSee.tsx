import CardGrid from './CardGrid';
import type { CardItem } from './cardTypes';

import SiteLink from '@/components/base/SiteLink';
import SectionHeading from '@/components/base/SectionHeading';

const progressFeatures: CardItem[] = [
  { title: 'Structured Progress Reviews', description: 'Learner, employer and KBC coach meet approximately every 10 weeks to review progress and agree the next priorities.', icon: 'ri-calendar-check-line' },
  { title: 'Workplace Application', description: "Discuss how new knowledge and skills are being applied in the employee's actual role.", icon: 'ri-building-4-line' },
  { title: 'Development Targets', description: 'Agree clear actions and development priorities for the next review period.', icon: 'ri-flag-line' },
  { title: 'Early Risk Identification', description: 'Identify attendance, engagement, evidence or development concerns before they become larger problems.', icon: 'ri-shield-check-line' },
  { title: 'Employer Feedback', description: "Bring line-manager observations directly into the employee's development journey.", icon: 'ri-feedback-line' },
  { title: 'Employer Dashboard', description: "Access relevant employer information and support through KBC's employer systems.", icon: 'ri-dashboard-line' },
];

export default function ProgressYouCanSee() {
  return (
<section id="progress" className="py-16 md:py-24"><div className="container-site"><SectionHeading tag="Progress you can see" title="Know how your employee is progressing, not just that they are enrolled." subtitle="Employer involvement continues throughout the learning journey. Structured progress reviews help connect training with performance, workplace application and future development." className="mb-12" /><CardGrid items={progressFeatures} /><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><SiteLink href="#resources" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold">View Employer Progress Review Guide</SiteLink><SiteLink href="https://employer.kentbusinesscollege.net/" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-md border border-primary-300 px-6 text-sm font-bold text-primary-800">Employer Dashboard</SiteLink></div></div></section>
  );
}
