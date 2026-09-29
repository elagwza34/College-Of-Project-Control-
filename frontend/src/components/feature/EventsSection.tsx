import { useCallback, useEffect, useId, useRef, useState } from 'react';
import SiteLink from '@/components/base/SiteLink';
import EventCard from './EventCard';
import { getHomepageEventDisplayTitle } from './homepageEventTitle';
import { fetchEventLibrary, type EventItem } from '@/services/eventsApi';

interface Props {
  id?: string;
  title?: string;
  description?: string;
  excludeSlug?: string;
  className?: string;
  programme?: string;
  category?: string;
  classification?: string;
  homepageCpcmOnly?: boolean;
  maxItems?: number;
}

const eventRelevanceTerms = [
  'project controls',
  'project control',
  'project management',
  'pmo',
  'planning',
  'scheduling',
  'controls',
  'chpp',
  'cpcm',
  'masterclass',
  'earned value',
  'risk management',
];

const unrelatedEventTerms = [
  'marketing executive',
  'marketing manager',
  'digital marketing',
  'cim',
  'chartered institute of marketing',
];

const blockedEventTerms = ['demo', 'sample', 'placeholder', 'test'];

export { getHomepageEventDisplayTitle } from './homepageEventTitle';

function eventText(event: EventItem) {
  return [
    event.title,
    event.slug,
    event.category,
    event.display_summary,
    event.source_category?.name,
    event.source_category?.slug,
    ...event.classifications.flatMap((classification) => [classification.name, classification.slug]),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function isUpcomingEvent(event: EventItem) {
  if (event.state !== 'upcoming') return false;
  if (!event.starts_at) return true;
  return new Date(event.starts_at).getTime() >= Date.now();
}

function isRelevantHomepageEvent(event: EventItem) {
  const text = eventText(event);
  if (unrelatedEventTerms.some((term) => text.includes(term))) return false;
  if (blockedEventTerms.some((term) => text.includes(term))) return false;
  return eventRelevanceTerms.some((term) => text.includes(term));
}

export default function EventsSection({
  id,
  title = 'Events & masterclasses',
  description = 'Meet our team, explore your next step and build your professional knowledge.',
  excludeSlug,
  programme,
  category,
  classification,
  className = '',
  homepageCpcmOnly = false,
  maxItems = homepageCpcmOnly ? 3 : 8,
}: Props) {
  const trackId = useId();
  const track = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  const [position, setPosition] = useState({ index: 0, start: true, end: true });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const stride = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap) : 1;
    setPosition({
      index: Math.round(el.scrollLeft / stride),
      start: el.scrollLeft < 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetchEventLibrary({ page_size: homepageCpcmOnly ? 24 : maxItems, exclude: excludeSlug, programme, category, classification }, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          const results = homepageCpcmOnly
            ? data.results
              .filter(isUpcomingEvent)
              .filter(isRelevantHomepageEvent)
              .sort((a, b) => new Date(a.starts_at || 0).getTime() - new Date(b.starts_at || 0).getTime())
              .slice(0, maxItems)
            : data.results;
          setEvents(results);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [excludeSlug, programme, category, classification, revision, homepageCpcmOnly, maxItems]);

  useEffect(() => {
    const el = track.current;
    if (!el || homepageCpcmOnly) return;
    el.scrollLeft = 0;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, [events, loading, measure, homepageCpcmOnly]);

  const move = (direction: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const stride = card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap);
    el.scrollTo({
      left: (Math.round(el.scrollLeft / stride) + direction) * stride,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  if (homepageCpcmOnly && (loading || error || events.length === 0)) return null;

  return (
    <section id={id} className={`bg-background-100 py-16 md:py-20 ${className}`} aria-label="Events">
      <div className="container-site">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-primary-600">
              {homepageCpcmOnly ? 'Events & masterclasses' : 'Learn together'}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground-950 md:text-4xl">{title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-600">{description}</p>
          </div>
          <SiteLink href="/events" className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-700">
            View all events <i className="ri-arrow-right-line" aria-hidden="true" />
          </SiteLink>
        </div>

        {loading ? (
          <p role="status">Loading events...</p>
        ) : error ? (
          <div role="alert">
            <p>Events could not be loaded.</p>
            <button onClick={() => setRevision((value) => value + 1)} className="btn-primary mt-4 px-5 py-3">Try again</button>
          </div>
        ) : events.length === 0 ? (
          <p>No upcoming events match this selection.</p>
        ) : (
          <>
            <div
              id={trackId}
              ref={track}
              onScroll={homepageCpcmOnly ? undefined : measure}
              tabIndex={homepageCpcmOnly ? undefined : 0}
              aria-label={homepageCpcmOnly ? undefined : 'Event carousel. Use the arrow keys to browse.'}
              onKeyDown={homepageCpcmOnly ? undefined : (event) => {
                if (event.target === event.currentTarget && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
                  event.preventDefault();
                  move(event.key === 'ArrowRight' ? 1 : -1);
                }
              }}
              className={homepageCpcmOnly
                ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3'
                : 'scrollbar-hide grid auto-cols-[84%] grid-flow-col gap-5 overflow-x-auto snap-x snap-mandatory pb-4 sm:auto-cols-[calc((100%_-_1.25rem)/2)] lg:auto-cols-[calc((100%_-_3rem)/3)] lg:gap-6'}
            >
              {events.map((event) => (
                <div key={event.id} className={homepageCpcmOnly ? 'min-w-0' : 'min-w-0 snap-start'}>
                  <EventCard event={event} displayTitle={homepageCpcmOnly ? getHomepageEventDisplayTitle(event.title) : undefined} />
                </div>
              ))}
            </div>

            {!homepageCpcmOnly && (
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-sm text-foreground-600" aria-live="polite">{position.index + 1} / {events.length}</p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => move(-1)} disabled={position.start} aria-label="Previous event" aria-controls={trackId} className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-300 bg-white text-primary-800 disabled:opacity-30">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
                  </button>
                  <button type="button" onClick={() => move(1)} disabled={position.end} aria-label="Next event" aria-controls={trackId} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-700 text-white disabled:opacity-30">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
