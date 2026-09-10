import SectionHeading from '@/components/base/SectionHeading';
import { phases } from '../programmeData';

export default function Your12MonthDevelopmentJourney() {
  return (
<section id="pathway" className="bg-white py-16 md:py-24"><div className="container-site">
        <SectionHeading tag="Your 12-month development journey" title="Project Management Professional preparation + AI in Project Controls" subtitle="First establish strong professional project management capability, then develop practical AI skills for modern project delivery and project controls." className="mb-12" />
        <ol className="relative grid gap-6 lg:grid-cols-2 lg:gap-8"><div className="absolute left-1/2 top-16 hidden h-px w-10 -translate-x-1/2 bg-signal-400 lg:block" aria-hidden="true" />{phases.map((phase, index) => <li key={phase.phase} className={`overflow-hidden rounded-2xl border ${index === 0 ? 'border-primary-200 bg-background-50' : 'border-accent-200 bg-accent-50/40'}`}><div className={`${index === 0 ? 'bg-primary-700' : 'bg-accent-700'} p-6 text-white`}><div className="flex items-center justify-between gap-4"><span className="text-xs font-bold uppercase tracking-[.16em] text-white/70">{phase.phase}</span><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{phase.months}</span></div><h3 className="mt-4 text-2xl text-white">{phase.title}</h3></div><div className="p-6 md:p-8"><p className="text-sm leading-relaxed text-foreground-600">{phase.description}</p><div className="mt-6 flex flex-wrap gap-2">{phase.themes.map(theme => <span key={theme} className="rounded-full border border-background-200 bg-white px-3 py-1.5 text-xs font-semibold text-foreground-700">{theme}</span>)}</div></div></li>)}</ol>
      </div></section>
  );
}
