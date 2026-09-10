import { facts } from '../programmeData';

export default function Facts() {
  return (
<section aria-label="Key programme facts" className="border-b border-background-200 bg-white py-6"><div className="container-site grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 lg:grid-cols-6">{facts.map(([value, label]) => <div key={value} className="border-l-2 border-signal-400 pl-3"><p className="text-sm font-bold text-primary-800">{value}</p><p className="mt-1 text-xs leading-snug text-foreground-600">{label}</p></div>)}</div></section>
  );
}
