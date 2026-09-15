import SiteLink from '@/components/base/SiteLink';
import { type EventItem } from '@/services/eventsApi';

/** Section: Event details. */
interface EventDetailsProps {
  event: EventItem;
}

export default function EventDetails({ event }: EventDetailsProps) {
  return (
    <header className="bg-gradient-to-br from-primary-950 via-primary-800 to-primary-950 pb-16 pt-36"><div className="container-site"><SiteLink href="/events" className="text-accent-200 underline">All events</SiteLink><p className="mt-8 text-sm font-bold uppercase tracking-wider text-signal-300">{event.source_category?.name || event.category || 'Professional development'} · {event.format === 'online' ? 'Online' : 'In person'}</p><h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">{event.title}</h1><p className="mt-5 max-w-3xl text-lg text-white/80">{event.display_summary}</p></div></header>
  );
}
