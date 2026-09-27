import useCollection from '@/hooks/useCollection';
import CollectionState from '@/components/base/CollectionState';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import SectionHeading from '@/components/base/SectionHeading';
import { fetchCoaches, type Coach } from '@/services/coachesApi';

const supportAreas = [
  ['Portfolio Support', 'Structure strong and relevant workplace evidence.'],
  ['Progress Planning', 'Keep development aligned with programme expectations.'],
  ['Professional Reflection', 'Understand how your capability is developing.'],
  ['Career Development', 'Connect learning with longer-term professional goals.'],
];

function CoachAvatar({ coach }: { coach: Coach }) {
  if (coach.imageUrl) {
    return (
      <img loading="lazy" decoding="async"
        src={coach.imageUrl}
        alt={coach.name}
        className="h-14 w-14 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 font-heading text-lg font-bold text-white" aria-hidden="true">
      {coach.initials}
    </div>
  );
}

export default function CoachingSupport() {
  const { items: coaches, loading, error, retry } = useCollection(fetchCoaches);
  const trackId = useId();
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ index: 0, start: true, end: true });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0');
    const stride = card ? card.getBoundingClientRect().width + (Number.isFinite(gap) ? gap : 0) : 1;
    setPosition({
      index: Math.round(el.scrollLeft / stride),
      start: el.scrollLeft < 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  const move = useCallback((direction: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0');
    const stride = card.getBoundingClientRect().width + (Number.isFinite(gap) ? gap : 0);
    el.scrollTo({ left: (Math.round(el.scrollLeft / stride) + direction) * stride, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el || coaches.length === 0) return;
    el.scrollLeft = 0;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, [coaches, measure]);

  if (loading || error || coaches.length === 0) return <CollectionState id="coaching-support" label="Coaches" loading={loading} error={error} retry={retry} />;

  return (
    <section id="coaching-support" className="bg-primary-700 py-16 text-white md:py-24">
      <div className="container-site">
        <SectionHeading
          tag="Coaching and support"
          title="Support that connects learning with your professional development"
          subtitle="Coaching connects programme learning, portfolio evidence and career direction. Ask about available academic, wellbeing and professional-community support; inclusions depend on your agreed programme."
          light
          className="mb-12"
        />
        <div
          id={trackId}
          ref={track}
          onScroll={measure}
          tabIndex={0}
          aria-label="Coach carousel. Swipe or use the arrow buttons to browse."
          onKeyDown={(event) => {
            if (event.target === event.currentTarget && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
              event.preventDefault();
              move(event.key === 'ArrowRight' ? 1 : -1);
            }
          }}
          className="scrollbar-hide grid auto-cols-[84%] grid-flow-col gap-5 overflow-x-auto snap-x snap-mandatory pb-4 sm:auto-cols-[46%] lg:grid-flow-row lg:grid-cols-4 lg:auto-cols-auto lg:overflow-visible lg:snap-none"
        >
          {coaches.map(coach => (
            <div key={coach.id} className="min-w-0 snap-start">
              <article className="h-full rounded-xl border border-white/15 bg-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[.14]">
                <CoachAvatar coach={coach} />
                <h3 className="mt-5 text-xl text-white">{coach.name}</h3>
                <p className="mt-2 text-xs font-semibold text-signal-300">{coach.qualification}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{coach.focus}</p>
              </article>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 lg:hidden">
          <p className="text-sm text-white/65" aria-live="polite">{Math.min(position.index + 1, coaches.length)} / {coaches.length}</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => move(-1)} disabled={position.start} aria-label="Previous coach" aria-controls={trackId} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white disabled:opacity-30">
              <i className="ri-arrow-left-line text-lg" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => move(1)} disabled={position.end} aria-label="Next coach" aria-controls={trackId} className="flex h-11 w-11 items-center justify-center rounded-full bg-signal-500 text-primary-950 disabled:opacity-30">
              <i className="ri-arrow-right-line text-lg" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {supportAreas.map(([title, copy]) => (
            <div key={title} className="border-t border-white/20 pt-4">
              <h3 className="text-sm text-white">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
