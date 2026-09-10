import SectionHeading from '@/components/base/SectionHeading';

const partnershipSteps = [
  { title: 'Understand', subtitle: 'Identify the need', description: "We discuss the employee's role, current responsibilities, business priorities and intended progression." },
  { title: 'Match', subtitle: 'Confirm the right route', description: 'We review programme suitability, prior learning, workplace evidence opportunities and available funding routes.' },
  { title: 'Plan', subtitle: 'Agree the development plan', description: 'The College, the employer and the learner establish clear expectations around learning, workplace application and progression.' },
  { title: 'Apply', subtitle: 'Put learning into practice', description: 'Learners apply frameworks, tools and professional thinking directly within their workplace wherever appropriate.' },
  { title: 'Review', subtitle: 'Track progress and impact', description: 'Employer, learner and coach regularly review development, workplace evidence, risks and the next priorities.' },
];

export default function HowThePartnershipWorks() {
  return (
<section id="how-it-works" className="bg-white py-16 md:py-24"><div className="container-site"><SectionHeading tag="How the partnership works" title="From workforce need to measurable development" className="mb-14" /><ol className="grid gap-6 md:grid-cols-5">{partnershipSteps.map((s, i) => <li key={s.title} className="relative border-l-2 border-primary-200 pl-6 md:border-l-0 md:border-t-2 md:pl-0 md:pt-8"><span className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-xs font-bold text-white md:-top-[17px] md:left-0">{i + 1}</span><p className="text-xs font-semibold uppercase tracking-wider text-accent-700">{s.subtitle}</p><h3 className="mt-2 text-xl">{s.title}</h3><p className="mt-2 text-sm text-foreground-600">{s.description}</p></li>)}</ol></div></section>
  );
}
