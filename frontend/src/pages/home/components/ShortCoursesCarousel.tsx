import { useCallback, useEffect, useId, useRef, useState } from 'react';
import SiteLink from '@/components/base/SiteLink';
import { fetchShortCourses, type ShortCourse } from '@/services/shortCoursesApi';
import { shortCourses as fallbackCourses } from '@/pages/short-courses/data/shortCourses';

export default function ShortCoursesCarousel() {
  const trackId = useId();
  const track = useRef<HTMLDivElement>(null);
  const [courses, setCourses] = useState<ShortCourse[]>(fallbackCourses);
  const [failed, setFailed] = useState(false);
  const [position, setPosition] = useState({ index: 0, start: true, end: true });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const stride = card ? card.getBoundingClientRect().width + gap : 1;
    setPosition({
      index: Math.round(el.scrollLeft / stride),
      start: el.scrollLeft < 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchShortCourses(controller.signal)
      .then((items) => {
        if (items.length) setCourses(items);
        setFailed(false);
      })
      .catch(() => setFailed(true));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, [courses, measure]);

  const move = (direction: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const stride = card.getBoundingClientRect().width + gap;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    el.scrollTo({ left: (Math.round(el.scrollLeft / stride) + direction) * stride, behavior });
  };

  return (
    <section id="short-courses-preview" className="relative overflow-hidden bg-background-50 py-16 md:py-24" aria-label="Short courses">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_12%,oklch(var(--highlight-300)/0.22),transparent_30%)]" />
      <div className="container-site relative z-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">Short courses</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground-950 md:text-4xl">Build one specialist capability at a time.</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-600">
              Focused courses for planning, cost, risk, AI, PMO and professional certification preparation.
              {failed ? ' Showing saved course content while live course data is unavailable.' : ''}
            </p>
          </div>
          <SiteLink href="/short-courses" className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-700">
            View all short courses <i className="ri-arrow-right-line" aria-hidden="true" />
          </SiteLink>
        </div>

        <div
          id={trackId}
          ref={track}
          onScroll={measure}
          tabIndex={0}
          aria-label="Short courses carousel. Use the arrow keys to browse."
          onKeyDown={(event) => {
            if (event.target === event.currentTarget && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
              event.preventDefault();
              move(event.key === 'ArrowRight' ? 1 : -1);
            }
          }}
          className="scrollbar-hide grid auto-cols-[84%] grid-flow-col gap-5 overflow-x-auto snap-x snap-mandatory pb-4 sm:auto-cols-[calc((100%-1.25rem)/2)] lg:auto-cols-[calc((100%-2.5rem)/3)]"
        >
          {courses.map((course) => (
            <SiteLink key={course.slug} href={`/short-courses/${course.slug}`} className="group min-w-0 snap-start overflow-hidden rounded-2xl border border-background-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden bg-primary-950">
                {course.imageUrl ? (
                  <img loading="lazy" decoding="async" src={course.imageUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <div className="signal-pattern h-full w-full opacity-30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/82 via-primary-950/20 to-transparent" />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/92 text-primary-700">
                  <i className={`${course.icon} text-lg`} aria-hidden="true" />
                </span>
                <span className="absolute bottom-4 left-4 right-4 text-xs font-bold uppercase tracking-[.14em] text-signal-300">
                  {course.category}
                </span>
              </div>
              <div className="flex min-h-56 flex-col p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-background-100 px-3 py-1 text-[11px] font-semibold text-foreground-700">{course.duration}</span>
                  <span className="text-xs font-semibold text-foreground-500">{course.format}</span>
                </div>
                <h3 className="text-xl font-bold leading-tight text-foreground-950">{course.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-600">{course.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700">
                  View course <i className="ri-arrow-right-line transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </SiteLink>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-sm text-foreground-600" aria-live="polite">{position.index + 1} / {courses.length}</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => move(-1)} disabled={position.start} aria-label="Previous course" aria-controls={trackId} className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-300 bg-white text-primary-800 disabled:opacity-30">
              <i className="ri-arrow-left-line text-lg" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => move(1)} disabled={position.end} aria-label="Next course" aria-controls={trackId} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-700 text-white disabled:opacity-30">
              <i className="ri-arrow-right-line text-lg" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
