import SiteLink from '@/components/base/SiteLink';
import { eventDate,type EventItem } from '@/services/eventsApi';

/** Section: Event details. */
interface EventDetailsSectionProps {
  event: EventItem;
}

export default function EventDetailsSection({ event }: EventDetailsSectionProps) {
  return (
    <aside className="rounded-2xl border border-background-200 bg-white p-7 shadow-sm lg:sticky lg:top-28"><h2 className="text-xl font-bold">Event details</h2><dl className="mt-6 space-y-5 text-sm"><div><dt className="font-semibold">Starts</dt><dd className="mt-1">{eventDate(event)}</dd></div>{event.ends_at && <div><dt className="font-semibold">Ends</dt><dd className="mt-1">{eventDate(event, true)}</dd></div>}{event.starts_at && <div><dt className="font-semibold">Time zone</dt><dd className="mt-1">{event.timezone}</dd></div>}<div><dt className="font-semibold">Location</dt><dd className="mt-1">{event.location || (event.format === 'online' ? 'Online' : 'To be confirmed')}</dd></div>{event.organizer && <div><dt className="font-semibold">Organiser</dt><dd className="mt-1">{event.organizer}</dd></div>}{event.price_label && !event.availability_stale && <div><dt className="font-semibold">Tickets</dt><dd className="mt-1">{event.price_label}</dd></div>}</dl>
        {event.booking_url ? <SiteLink href={event.booking_url} className="btn-primary mt-7 flex min-h-12 items-center justify-center px-4 py-3 text-center">{event.booking_label}</SiteLink> : <p className="mt-7 rounded-lg bg-background-100 p-4 text-center font-semibold" role="status">{event.booking_label}</p>}
        {event.state === 'ended' && event.highlights_url && <SiteLink href={event.highlights_url} className="mt-5 block font-semibold text-primary-700 underline">Watch event highlights</SiteLink>}
        {event.source === 'eventbrite' && <p className="mt-4 text-xs leading-relaxed text-foreground-500">Registration and final ticket availability are managed on Eventbrite.</p>}
      </aside>
  );
}
