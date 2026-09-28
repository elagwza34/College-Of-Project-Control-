import type { CaseStudyDetail } from '@/services/caseStudiesApi';

interface CaseStudyDetailBodyProps {
  item: CaseStudyDetail;
}

export default function CaseStudyDetailBody({ item }: CaseStudyDetailBodyProps) {
  const sections = [
    ['Challenge', item.challenge],
    ['Approach', item.approach],
    ['Outcome', item.outcome],
  ].filter(([, body]) => Boolean(body));

  return (
    <section className="py-14 md:py-20">
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-background-200 bg-white p-6 shadow-sm lg:sticky lg:top-32">
          {item.client_name && (
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-[.16em] text-foreground-500">Organisation</p>
              <p className="mt-2 text-lg font-bold text-foreground-950">{item.client_name}</p>
            </div>
          )}
          {item.metrics.length > 0 && (
            <div className="mt-6 grid gap-3">
              {item.metrics.map((metric) => (
                <div key={`${metric.label}-${metric.value}`} className="rounded-lg bg-background-50 p-4">
                  <p className="font-heading text-2xl font-bold text-primary-950">{metric.value}</p>
                  <p className="mt-1 text-sm text-foreground-600">{metric.label}</p>
                </div>
              ))}
            </div>
          )}
        </aside>

        <article className="rounded-2xl border border-background-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-lg leading-relaxed text-foreground-700">{item.summary}</p>
          {sections.map(([title, body]) => (
            <div key={title} className="mt-10 border-t border-background-200 pt-8">
              <h1 className="font-heading text-3xl font-bold text-foreground-950">{title}</h1>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-foreground-600">{body}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
