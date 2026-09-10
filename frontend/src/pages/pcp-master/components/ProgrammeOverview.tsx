import SectionHeading from '@/components/base/SectionHeading';
import { capabilityThemes } from '../programmeData';

export default function ProgrammeOverview() {
  return (
<section id="overview" className="bg-white py-16 md:py-24">
  <div className="container-site">
    <SectionHeading tag="Programme overview" title="From project controls practice to senior delivery confidence" subtitle="Develop the ability to turn project information into reliable plans, controlled costs, credible schedules, early warnings, governance decisions and executive confidence." className="mb-12" /><div className="grid gap-5 md:grid-cols-3">{capabilityThemes.map(theme => <article key={theme.title} className="card-premium-hover p-6"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-100 text-accent-700"><i className={`${theme.icon} text-xl`} /></span><h3 className="mt-5 text-xl">{theme.title}</h3><p className="mt-3 text-sm text-foreground-600">{theme.description}</p></article>)}</div><p className="mt-7 rounded-lg border border-highlight-300 bg-highlight-50 p-4 text-xs leading-relaxed text-foreground-700"><strong>Recognition condition:</strong> professional membership, examinations, Fellowship, Incorporated Cost Engineer and Chartered Project Professional status remain subject to each awarding organisation’s own assessment and requirements.</p></div></section>
  );
}
