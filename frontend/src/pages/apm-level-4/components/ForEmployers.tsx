import SiteLink from '@/components/base/SiteLink';
import SectionHeading from '@/components/base/SectionHeading';

export default function ForEmployers() {
  return (
<section className="py-16 md:py-24"><div className="container-site"><SectionHeading tag="For employers" title="Develop stronger project capability inside your organisation" className="mb-12" /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">{[['Better Project Planning', 'Structure and coordinate projects more effectively.'], ['Improved Project Visibility', 'Strengthen reporting, risk and stakeholder communication.'], ['Workplace Application', 'Connect learning directly with relevant responsibilities.'], ['Modern AI Capability', 'Use AI responsibly in analysis, reporting and workflows.'], ['Professional Development', 'Support progression, engagement and organisational capability.']].map(([title, copy]) => <article key={title} className="card-premium p-5"><h3 className="text-base">{title}</h3><p className="mt-3 text-sm leading-relaxed text-foreground-600">{copy}</p></article>)}</div><div className="mt-8 text-center"><SiteLink href="/employers" className="inline-flex min-h-12 items-center rounded-md bg-primary-700 px-6 text-sm font-bold text-white">Speak to Our Employer Team <i className="ri-arrow-right-line ml-2" aria-hidden="true" /></SiteLink></div></div></section>
  );
}
