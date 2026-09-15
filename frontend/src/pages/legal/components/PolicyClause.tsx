import type { LegalSection } from '../LegalPageData';

export default function PolicyClause({ section, index }: { section: LegalSection; index: number }) {
  return (<article className="rounded-2xl border border-background-200 bg-white p-6 shadow-card md:p-8">
                <div className="flex gap-5">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground-950">{section.heading}</h2>
                    <p className="mt-3 text-sm leading-7 text-foreground-600 md:text-base">{section.body}</p>
                  </div>
                </div>
              </article>);
}
