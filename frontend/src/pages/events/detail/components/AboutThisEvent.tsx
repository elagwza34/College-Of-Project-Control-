import SiteLink from '@/components/base/SiteLink';
import { type EventItem } from '@/services/eventsApi';

/** Section: About this event. */
interface AboutThisEventProps {
  event: EventItem;
}

export default function AboutThisEvent({ event }: AboutThisEventProps) {
  return (
    <article><img src={event.image_url || '/images/hero-professional.webp'} alt={event.image_alt || ''} className="aspect-video w-full rounded-2xl object-cover" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/hero-professional.webp'; }} /><h2 className="mt-10 text-2xl font-bold">About this event</h2><div className="mt-5 whitespace-pre-line leading-relaxed text-foreground-700">{event.description || event.display_summary}</div><div className="mt-8 flex flex-wrap gap-2">{event.classifications.map(t => <SiteLink key={t.id} href={`/events?${t.kind === 'programme' ? 'programme' : 'classification'}=${encodeURIComponent(t.slug)}`} className="rounded-full bg-background-200 px-4 py-2 text-sm text-primary-800">{t.name}</SiteLink>)}</div></article>
  );
}
