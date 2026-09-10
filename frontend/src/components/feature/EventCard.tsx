import SiteLink from '@/components/base/SiteLink';
import { eventDate, type EventItem } from '@/services/eventsApi';
export default function EventCard({ event }: { event: EventItem }) {
  return <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-background-200 bg-white shadow-sm">
    <SiteLink href={`/events/${event.slug}`} className="block overflow-hidden"><img src={event.image_url || '/images/hero-professional.webp'} alt={event.image_alt || ''} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-300 hover:scale-105" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/hero-professional.webp'; }} /></SiteLink>
    <div className="flex flex-1 flex-col p-5"><div className="flex flex-wrap gap-2 text-xs font-semibold text-primary-700"><span>{event.format === 'online' ? 'Online' : 'In person'}</span>{event.state !== 'upcoming' && <span className="rounded bg-background-100 px-2">{event.state === 'cancelled' ? 'Cancelled' : 'Ended'}</span>}{event.is_featured && <span className="text-signal-700">Featured</span>}</div>
      <h3 className="mt-3 text-xl font-bold text-foreground-950"><SiteLink href={`/events/${event.slug}`}>{event.title}</SiteLink></h3>
      <p className="mt-3 text-sm font-medium text-primary-700">{eventDate(event)}{event.starts_at && <span className="block text-xs font-normal">{event.timezone}</span>}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground-600">{event.display_summary}</p>
      <SiteLink href={`/events/${event.slug}`} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-semibold text-primary-700">View event <i className="ri-arrow-right-line" aria-hidden="true" /></SiteLink>
    </div>
  </article>;
}
