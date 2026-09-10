import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SiteLink from '@/components/base/SiteLink';
import Footer from '@/components/feature/Footer';
import EventsSection from '@/components/feature/EventsSection';
import { fetchEvent, EventRequestError, eventDate, type EventItem } from '@/services/eventsApi';

export default function EventDetailPage() {
  const { slug = '' } = useParams();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [status, setStatus] = useState('loading');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); setStatus('loading'); setEvent(null);
    fetchEvent(slug, controller.signal).then(data => { if (!controller.signal.aborted) { setEvent(data); setStatus('ready'); } }).catch(error => { if (!controller.signal.aborted) setStatus(error instanceof EventRequestError && error.status === 404 ? 'missing' : 'error'); });
    return () => controller.abort();
  }, [slug, revision]);
  useEffect(() => { if (status !== 'loading') window.dispatchEvent(new CustomEvent('event-seo', { detail: { event, noIndex: !event } })); }, [event, status]);
  return <div className="min-h-screen bg-background-50"><main>
    {!event ? <section className="bg-primary-950 pb-20 pt-36 text-white"><div className="container-site"><h1 className="text-3xl font-bold text-white">{status === 'loading' ? 'Loading event…' : status === 'missing' ? 'Event not available' : 'Unable to load event'}</h1><p className="mt-4" role="status">{status === 'missing' ? 'This event may be private or no longer published.' : status === 'error' ? 'Please try again in a moment.' : 'Fetching the latest details.'}</p>{status === 'error' && <button onClick={() => setRevision(v => v + 1)} className="btn-primary mt-6 px-5 py-3">Try again</button>}<SiteLink href="/events" className="mt-6 block text-signal-300 underline">Browse all events</SiteLink></div></section> : <>
      <header className="bg-gradient-to-br from-primary-950 via-primary-800 to-primary-950 pb-16 pt-36"><div className="container-site"><SiteLink href="/events" className="text-accent-200 underline">All events</SiteLink><p className="mt-8 text-sm font-bold uppercase tracking-wider text-signal-300">{event.source_category?.name || event.category || 'Professional development'} · {event.format === 'online' ? 'Online' : 'In person'}</p><h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">{event.title}</h1><p className="mt-5 max-w-3xl text-lg text-white/80">{event.display_summary}</p></div></header>
      <div className="container-site grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"><article><img src={event.image_url || '/images/hero-professional.webp'} alt={event.image_alt || ''} className="aspect-video w-full rounded-2xl object-cover" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/hero-professional.webp'; }} /><h2 className="mt-10 text-2xl font-bold">About this event</h2><div className="mt-5 whitespace-pre-line leading-relaxed text-foreground-700">{event.description || event.display_summary}</div><div className="mt-8 flex flex-wrap gap-2">{event.classifications.map(t => <SiteLink key={t.id} href={`/events?${t.kind === 'programme' ? 'programme' : 'classification'}=${encodeURIComponent(t.slug)}`} className="rounded-full bg-background-200 px-4 py-2 text-sm text-primary-800">{t.name}</SiteLink>)}</div></article>
      <aside className="rounded-2xl border border-background-200 bg-white p-7 shadow-sm lg:sticky lg:top-28"><h2 className="text-xl font-bold">Event details</h2><dl className="mt-6 space-y-5 text-sm"><div><dt className="font-semibold">Starts</dt><dd className="mt-1">{eventDate(event)}</dd></div>{event.ends_at && <div><dt className="font-semibold">Ends</dt><dd className="mt-1">{eventDate(event, true)}</dd></div>}{event.starts_at && <div><dt className="font-semibold">Time zone</dt><dd className="mt-1">{event.timezone}</dd></div>}<div><dt className="font-semibold">Location</dt><dd className="mt-1">{event.location || (event.format === 'online' ? 'Online' : 'To be confirmed')}</dd></div>{event.organizer && <div><dt className="font-semibold">Organiser</dt><dd className="mt-1">{event.organizer}</dd></div>}{event.price_label && !event.availability_stale && <div><dt className="font-semibold">Tickets</dt><dd className="mt-1">{event.price_label}</dd></div>}</dl>
        {event.booking_url ? <SiteLink href={event.booking_url} className="btn-primary mt-7 flex min-h-12 items-center justify-center px-4 py-3 text-center">{event.booking_label}</SiteLink> : <p className="mt-7 rounded-lg bg-background-100 p-4 text-center font-semibold" role="status">{event.booking_label}</p>}
        {event.state === 'ended' && event.highlights_url && <SiteLink href={event.highlights_url} className="mt-5 block font-semibold text-primary-700 underline">Watch event highlights</SiteLink>}
        {event.source === 'eventbrite' && <p className="mt-4 text-xs leading-relaxed text-foreground-500">Registration and final ticket availability are managed on Eventbrite.</p>}
      </aside></div><EventsSection title="More events to explore" excludeSlug={event.slug} />
    </>}
  </main><Footer /></div>;
}
