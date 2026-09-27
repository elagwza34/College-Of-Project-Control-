import SiteLink from '@/components/base/SiteLink';
import Footer from '@/components/feature/Footer';
import { fetchCaseStudy, type CaseStudyDetail } from '@/services/caseStudiesApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CaseStudyDetailPage() {
  const { slug = '' } = useParams();
  const [item, setItem] = useState<CaseStudyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetchCaseStudy(slug, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setItem(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background-50">
      <main>
        {loading ? (
          <section className="container-site py-40" role="status">Loading case study...</section>
        ) : error || !item ? (
          <section className="container-site py-40">
            <h1 className="font-heading text-4xl font-bold text-foreground-950">Case study not found</h1>
            <SiteLink href="/case-studies" className="btn-primary mt-6 inline-flex min-h-12 items-center px-5 text-sm font-bold">Back to case studies</SiteLink>
          </section>
        ) : (
          <>
            <section className="relative isolate overflow-hidden bg-primary-950 pb-16 pt-36 text-white md:pb-20 md:pt-40">
              <div className="pattern-cubes-overlay pattern-cubes-overlay-dark" />
              <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary-950 via-primary-950/92 to-primary-950/72" aria-hidden="true" />
              <div className="container-site relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.7fr)] lg:items-end">
                <div>
                  <SiteLink href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-signal-300">
                    <i className="ri-arrow-left-line" aria-hidden="true" />
                    Case studies
                  </SiteLink>
                  <p className="mt-6 font-label text-xs font-bold uppercase tracking-[.18em] text-signal-300">{item.sector || 'Case study'}</p>
                  <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-tight !text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-6xl">{item.title}</h1>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed !text-white/85">{item.headline || item.summary}</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/10 shadow-card">
                  <img
                    src={item.image_url || '/images/employer-capability-team.webp'}
                    alt={item.image_alt || ''}
                    className="aspect-[4/3] w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = '/images/employer-capability-team.webp';
                    }}
                  />
                </div>
              </div>
            </section>

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
                  {[
                    ['Challenge', item.challenge],
                    ['Approach', item.approach],
                    ['Outcome', item.outcome],
                  ].filter(([, body]) => body).map(([title, body]) => (
                    <section key={title} className="mt-10 border-t border-background-200 pt-8">
                      <h2 className="font-heading text-3xl font-bold text-foreground-950">{title}</h2>
                      <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-foreground-600">{body}</p>
                    </section>
                  ))}
                </article>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
