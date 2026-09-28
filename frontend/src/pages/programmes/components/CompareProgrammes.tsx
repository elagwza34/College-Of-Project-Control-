import SiteLink from '@/components/base/SiteLink';
import {
  APPRENTICESHIP_COMPARISON,
  APPRENTICESHIP_COMPARISON_COLUMNS,
  standardLabel,
} from '@/data/programmeFacts';
import { useEffect, useRef, useState } from 'react';

/**
 * Comparison of the two apprenticeships.
 *
 * Audit P01.3 / P01.6 / P04.1. This table previously hardcoded `pcp` / `apm` /
 * `pmo` keys inside every row and rendered Certified PMO Professional as a third
 * peer column. Two defects followed from that:
 *
 *   1. a key and its heading lived in different places, so ST0310 and ST0845
 *      could end up under swapped headings;
 *   2. a professional programme was presented as if it were an apprenticeship.
 *
 * Both are removed structurally rather than by care:
 *   • headings and cells resolve from the same programme record, via the
 *     id-keyed rows in APPRENTICESHIP_COMPARISON — never by array position;
 *   • the comparison covers only the two apprenticeships, filtered by offer
 *     type, so a new professional offer cannot appear here;
 *   • mobile renders stacked cards, because a min-width table pushed the Level 4
 *     column off screen entirely.
 */
export default function CompareProgrammes() {
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const columns = APPRENTICESHIP_COMPARISON_COLUMNS;

  return (
    <section className="py-16 md:py-20 bg-canvas relative overflow-hidden">
      <div className="container-site relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 reveal-blur-in is-visible">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-600 mb-4">
            Compare Programmes
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
            Which programme best fits your responsibilities?
          </h2>
          <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">
            Compare each programme against the responsibilities it is best suited to.
          </p>
        </div>

        <div
          ref={ref}
          className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Mobile: stacked cards, one per programme, every comparison point
              inside it. The previous `min-w-[720px]` table forced horizontal
              scrolling on a phone, which pushed the Level 4 column off screen. */}
          <div className="md:hidden space-y-4">
            {columns.map((programme) => (
              <article
                key={programme.id}
                className="rounded-xl border border-background-300 bg-white p-5"
              >
                <span className="inline-block rounded-full border border-primary-300 bg-primary-100 px-2.5 py-0.5 text-xs font-label font-semibold text-primary-700">
                  {programme.offerTypeLabel}
                </span>
                <h3 className="mt-2 text-lg font-heading font-bold text-primary-800 leading-tight">
                  {programme.shortTitle}
                </h3>
                <p className="mt-0.5 text-xs text-foreground-500">{standardLabel(programme)}</p>

                <dl className="mt-4 space-y-3">
                  {APPRENTICESHIP_COMPARISON.map((row) => (
                    <div
                      key={row.label}
                      className="border-t border-background-200 pt-3 first:border-0 first:pt-0"
                    >
                      <dt className="text-xs font-label font-semibold uppercase tracking-wider text-foreground-500">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-foreground-700">
                        {row.valueById[programme.id] ?? 'Not published — contact our admissions team.'}
                      </dd>
                    </div>
                  ))}
                </dl>

                <SiteLink
                  href={programme.url}
                  className="btn-primary mt-5 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap px-5 py-3 text-sm font-bold transition-colors duration-300"
                  data-gtm-event={`${programme.id}_programmes_compare_explore`}
                  data-gtm-location="programmes-comparison"
                >
                  Explore {programme.shortTitle}
                  <i className="ri-arrow-right-line text-sm" aria-hidden="true"></i>
                </SiteLink>
              </article>
            ))}
          </div>

          {/* Desktop: one row per comparison point, two programme columns.
              Headings and cells both resolve by programme id, so a column can
              never be relabelled without its data moving with it. */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-background-300 bg-white">
            <table className="w-full min-w-[640px] table-fixed">
              <caption className="sr-only">
                Comparison of the two apprenticeships offered by Kent Business College
              </caption>
              <colgroup>
                <col className="w-56" />
                {columns.map((programme) => (
                  <col key={programme.id} />
                ))}
              </colgroup>
              <thead>
                <tr className="bg-primary-500 border-b border-background-50/20">
                  <th scope="col" className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-background-50">
                    <span className="sr-only">Comparison point</span>
                  </th>
                  {columns.map((programme) => (
                    <th
                      key={programme.id}
                      scope="col"
                      className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-background-50"
                    >
                      <span className="block normal-case tracking-normal text-sm font-heading font-bold">
                        {programme.shortTitle}
                      </span>
                      <span className="mt-0.5 block normal-case tracking-normal font-normal opacity-80">
                        {standardLabel(programme)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {APPRENTICESHIP_COMPARISON.map((row) => (
                  <tr
                    key={row.label}
                    className={`border-b border-background-200 last:border-b-0 transition-colors duration-200 ${
                      highlightedRow === row.label ? 'bg-primary-50' : 'bg-white'
                    }`}
                    onMouseEnter={() => setHighlightedRow(row.label)}
                    onMouseLeave={() => setHighlightedRow(null)}
                  >
                    <th scope="row" className="px-4 py-4 text-left align-top">
                      <span className="block text-sm font-label font-semibold text-foreground-700">
                        {row.label}
                      </span>
                      {row.hint ? (
                        <span className="mt-1 block text-xs leading-relaxed text-foreground-500">
                          {row.hint}
                        </span>
                      ) : null}
                    </th>
                    {columns.map((programme) => (
                      <td
                        key={programme.id}
                        className="px-4 py-4 align-top text-sm leading-relaxed text-foreground-600"
                      >
                        {row.valueById[programme.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <SiteLink
            href="#how-to-choose"
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap lift-hover"
          >
            Help Me Choose
            <i className="ri-arrow-right-line text-sm"></i>
          </SiteLink>
        </div>
      </div>
    </section>
  );
}