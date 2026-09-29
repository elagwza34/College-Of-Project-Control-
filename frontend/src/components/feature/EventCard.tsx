import SiteLink from '@/components/base/SiteLink';
import { eventDate, type EventItem } from '@/services/eventsApi';

interface Props {
  event: EventItem;
  /**
   * Presentation-only title override. Supplied by the homepage to strip a leading
   * promotional funding prefix; when omitted the exact source title is used, so
   * the events library and the event detail page are unaffected.
   */
  displayTitle?: string;
}

/**
 * One keyboard destination per card.
 *
 * The image, the heading and the "View event" affordance all pointed at the same
 * URL, so a single card cost three tab stops to express one intent. Only the
 * heading is a real link now; it carries a stretched ::after overlay so the whole
 * card remains clickable and tappable. The image and the "View event" label are
 * decorative siblings rather than nested anchors or tabindex hacks, and the
 * card grows a focus ring via focus-within so the focus target is visible.
 */
export default function EventCard({ event, displayTitle = event.title }: Props) {
  return <article className="interactive-surface group relative flex h-full flex-col overflow-hidden rounded-2xl border border-background-200 bg-white shadow-sm hover:border-primary-200 hover:shadow-lg focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-300">
    <img src={event.image_url || '/images/hero-professional.webp'} alt={event.image_alt || ''} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/hero-professional.webp'; }} />
    <div className="flex flex-1 flex-col p-5"><div className="flex flex-wrap gap-2 text-xs font-semibold text-primary-700"><span>{event.format === 'online' ? 'Online' : 'In person'}</span>{event.state !== 'upcoming' && <span className="rounded bg-background-100 px-2">{event.state === 'cancelled' ? 'Cancelled' : 'Ended'}</span>}{event.is_featured && <span className="text-signal-700">Featured</span>}</div>
      <h3 className="mt-3 text-xl font-bold text-foreground-950"><SiteLink href={`/events/${event.slug}`} className="after:absolute after:inset-0 after:content-[''] after:rounded-2xl">{displayTitle}</SiteLink></h3>
      <p className="mt-3 text-sm font-medium text-primary-700">{eventDate(event)}{event.starts_at && <span className="block text-xs font-normal">{event.timezone}</span>}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground-600">{event.display_summary}</p>
      <p className="interactive-arrow pointer-events-none mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-semibold text-primary-700 group-hover:text-primary-800">View event <i className="ri-arrow-right-line" aria-hidden="true" /></p>
    </div>
  </article>;
}
