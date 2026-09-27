import { useEffect, useState } from 'react';
import type { EventCategory } from '@/services/eventsApi';
import { cmsApi } from '../api/client';
import EventCategories from './EventCategories';
import EventbriteSettings from './EventbriteSettings';
import { DashboardAlert, DashboardEmptyState, DashboardPageHeader, DashboardSkeletonList, StatusBadge } from '../components/DashboardPrimitives';

interface ManagedEvent {
  id: number;
  title: string;
  slug: string;
  source: string;
  description: string;
  summary: string;
  image_url: string;
  image_alt: string;
  starts_at: string | null;
  ends_at: string | null;
  timezone: string;
  location: string;
  format: string;
  cta_href: string;
  cta_label: string;
  remote_status: string;
  sales_status: string;
  is_active: boolean;
  is_featured: boolean;
  order: number;
  classifications: number[];
  highlights_url: string;
  source_url: string;
  sync_error: string;
  public_visible: boolean;
}

interface SyncResult {
  job_id: number;
  status: string;
  result: Record<string, number>;
  error: string;
  worker_ran: boolean;
}

const localKeys = ['summary', 'image_alt', 'is_active', 'is_featured', 'order', 'classifications', 'highlights_url'] as const;
type EventScope = 'all' | 'upcoming' | 'past' | 'hidden';

function isPastEvent(event: ManagedEvent, now = Date.now()) {
  const marker = event.ends_at || event.starts_at;
  return marker ? new Date(marker).getTime() <= now : false;
}

export default function EventsManager() {
  const [tab, setTab] = useState('events');
  const [eventScope, setEventScope] = useState<EventScope>('all');
  const [events, setEvents] = useState<ManagedEvent[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);

  const reload = async () => {
    const [items, terms] = await Promise.all([
      cmsApi.get<ManagedEvent[]>('/events/'),
      cmsApi.get<EventCategory[]>('/event-categories/'),
    ]);
    setEvents(items);
    setCategories(terms);
  };

  useEffect(() => {
    reload().catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  const syncNow = async () => {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const result = await cmsApi.post<SyncResult>('/eventbrite/sync/', {});
      await reload();
      const imported = Object.entries(result.result || {})
        .map(([key, value]) => `${key}: ${value}`)
        .join(' · ');
      setMessage(result.error ? `Sync ${result.status}: ${result.error}` : `Sync ${result.status}${imported ? ` · ${imported}` : ''}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to sync Eventbrite events. Check the connection settings and try again.');
    } finally {
      setBusy(false);
    }
  };

  const switchTab = (key: string) => {
    setTab(key);
    setError('');
    setMessage('');
    if (key === 'events' || key === 'categories') reload().catch((e) => setError(e.message));
  };

  const eventbriteEvents = events.filter((event) => event.source === 'eventbrite');
  const eventCounts = eventbriteEvents.reduce(
    (counts, event) => {
      if (!event.public_visible) counts.hidden += 1;
      else if (isPastEvent(event)) counts.past += 1;
      else counts.upcoming += 1;
      return counts;
    },
    { all: eventbriteEvents.length, upcoming: 0, past: 0, hidden: 0 },
  );
  const scopedEvents = eventbriteEvents.filter((event) => {
    if (eventScope === 'past') return event.public_visible && isPastEvent(event);
    if (eventScope === 'upcoming') return event.public_visible && !isPastEvent(event);
    if (eventScope === 'hidden') return !event.public_visible;
    return true;
  });
  const filteredEvents = scopedEvents.filter((event) => event.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Website content"
        title="Events"
        description="Manage events, publication rules and your Eventbrite connection."
        meta={<StatusBadge tone={eventCounts.upcoming ? 'info' : 'neutral'}>{eventCounts.upcoming} public upcoming</StatusBadge>}
      />

      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Events management">
        {[
          ['events', 'Events'],
          ['categories', 'Categories & visibility'],
          ['connection', 'Eventbrite connection'],
          ['history', 'Sync history'],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => switchTab(key)}
            className={`rounded-lg px-4 py-3 text-sm font-semibold ${tab === key ? 'bg-primary-800 text-white' : 'border bg-white text-primary-800'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <div className="mb-5"><DashboardAlert tone="error">{error}</DashboardAlert></div>}
      {message && <div className="mb-5"><DashboardAlert tone="success">{message}</DashboardAlert></div>}

      {tab === 'connection' || tab === 'history' ? (
        <EventbriteSettings key={tab} history={tab === 'history'} />
      ) : loading ? (
        <DashboardSkeletonList rows={4} />
      ) : tab === 'categories' ? (
        <EventCategories categories={categories} reload={reload} />
      ) : (
        <>
          <div className="mb-5 rounded-xl border border-background-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap gap-4">
            <input
              type="search"
              aria-label="Search managed events"
              placeholder="Search events"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-0 flex-1 rounded-lg border p-3"
            />
            <button
              disabled={busy}
              onClick={syncNow}
              className="rounded-lg border border-primary-700 bg-primary-50 px-5 py-3 font-semibold text-primary-800 disabled:opacity-40"
            >
              Sync Eventbrite
            </button>
            <button onClick={() => reload().catch((e) => setError(e.message))} className="rounded-lg border bg-white px-5 py-3">
              Refresh
            </button>
            </div>
          </div>

          <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Event status filters">
            {[
              ['all', 'Eventbrite total', eventCounts.all],
              ['upcoming', 'Public upcoming', eventCounts.upcoming],
              ['past', 'Public past', eventCounts.past],
              ['hidden', 'Hidden / draft', eventCounts.hidden],
            ].map(([key, label, count]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={eventScope === key}
                onClick={() => setEventScope(key as EventScope)}
                className={`rounded-xl border p-4 text-left transition ${eventScope === key ? 'border-primary-800 bg-primary-800 text-white shadow-sm' : 'border-background-200 bg-white text-foreground-800 hover:border-primary-300'}`}
              >
                <span className={`block text-xs font-bold uppercase tracking-[.14em] ${eventScope === key ? 'text-white/65' : 'text-foreground-500'}`}>{label}</span>
                <span className="mt-2 block text-3xl font-bold">{count}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Editor key={`${event.id}-${JSON.stringify(event)}`} event={event} categories={categories} reload={reload} />
            ))}
            {eventbriteEvents.length === 0 && (
              <DashboardEmptyState icon="ri-calendar-event-line" title="No Eventbrite events yet" description="Connect Eventbrite, then run sync to import the events that should appear on the website." action={<button disabled={busy} onClick={syncNow} className="btn-primary px-5 py-3">{busy ? 'Syncing...' : 'Sync Eventbrite'}</button>} />
            )}
            {eventbriteEvents.length > 0 && scopedEvents.length === 0 && <DashboardEmptyState title="No events in this filter" description="Choose another status filter or sync Eventbrite to refresh the event list." />}
            {scopedEvents.length > 0 && filteredEvents.length === 0 && <DashboardEmptyState title="No events match your search" description="Try a shorter search term or clear the search box." />}
          </div>
        </>
      )}
    </div>
  );
}

function Editor({ event, categories, reload }: { event: ManagedEvent; categories: EventCategory[]; reload: () => Promise<void> }) {
  const [form, setForm] = useState(event);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const imported = event.source === 'eventbrite';
  const set = <K extends keyof ManagedEvent>(key: K, value: ManagedEvent[K]) => setForm((prev) => ({ ...prev, [key]: value }));
  const act = async (work: () => Promise<unknown>, message: string) => {
    setBusy(true);
    setError('');
    try {
      await work();
      setMessage(message);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save this event. Your changes are still here; check the fields and try again.');
    } finally {
      setBusy(false);
    }
  };
  const save = () => act(() => cmsApi.patch(`/events/${event.id}/`, imported ? Object.fromEntries(localKeys.map((key) => [key, form[key]])) : { ...form, starts_at: form.starts_at || null, ends_at: form.ends_at || null }), 'Saved.');
  const text = (key: 'title' | 'image_url' | 'image_alt' | 'timezone' | 'location' | 'cta_href' | 'cta_label' | 'highlights_url', label: string, disabled = false) => (
    <label className="text-sm font-semibold">
      {label}
      <input value={form[key]} disabled={disabled} onChange={(e) => set(key, e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2 text-sm font-normal disabled:bg-background-100" />
    </label>
  );

  return (
    <details className="rounded-xl border bg-white p-5">
      <summary className="cursor-pointer font-semibold">
        {event.title}
        <span className={`ml-3 inline-block rounded px-2 py-1 text-xs ${event.public_visible ? 'bg-green-50 text-green-800' : 'bg-background-100 text-foreground-600'}`}>
          {event.public_visible ? 'Visible' : 'Hidden'}
        </span>
        <span className="ml-3 text-xs font-normal">{imported ? 'Eventbrite' : 'Manual'} · {event.remote_status}</span>
      </summary>
      <form onSubmit={(e) => { e.preventDefault(); save(); }} className="mt-5">
        {imported && <p className="mb-5 rounded-lg bg-background-100 p-4 text-sm">Edit the title, description, date, location and ticket details in Eventbrite. Local display settings below are preserved during sync.</p>}
        {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}
        {message && <p role="status" className="mb-4 text-sm text-green-700">{message}</p>}
        {event.sync_error && <p className="mb-4 text-sm text-amber-800">{event.sync_error}</p>}

        <div className="grid gap-4 md:grid-cols-2">
          {text('title', 'Title', imported)}
          {text('image_url', 'Image URL', imported)}
          {text('image_alt', 'Image alternative text')}
          {text('timezone', 'Time zone', imported)}
          {(['starts_at', 'ends_at'] as const).map((key) => (
            <label key={key} className="text-sm font-semibold">
              {key === 'starts_at' ? 'Starts (ISO date with UTC offset)' : 'Ends (ISO date with UTC offset)'}
              <input
                value={form[key] || ''}
                disabled={imported}
                placeholder="2026-10-01T14:00:00+01:00"
                onChange={(e) => set(key, e.target.value || null)}
                className="mt-2 w-full rounded-lg border px-3 py-2 text-sm font-normal disabled:bg-background-100"
              />
            </label>
          ))}
          {text('location', 'Location', imported)}
          <label className="text-sm font-semibold">
            Format
            <select value={form.format} disabled={imported} onChange={(e) => set('format', e.target.value)} className="mt-2 w-full rounded-lg border bg-white px-3 py-2">
              <option value="online">Online</option>
              <option value="in_person">In person</option>
            </select>
          </label>
          <label className="text-sm font-semibold md:col-span-2">
            Description
            <textarea rows={5} value={form.description} disabled={imported} onChange={(e) => set('description', e.target.value)} className="mt-2 w-full rounded-lg border p-3 text-sm font-normal disabled:bg-background-100" />
          </label>
          <label className="text-sm font-semibold md:col-span-2">
            Local summary
            <textarea rows={3} maxLength={600} value={form.summary} onChange={(e) => set('summary', e.target.value)} className="mt-2 w-full rounded-lg border p-3 text-sm font-normal" />
          </label>
          {text('cta_href', 'Registration link', imported)}
          {text('cta_label', 'Registration button label', imported)}
          {text('highlights_url', 'Highlights URL (shown after event ends)')}
          <label className="text-sm font-semibold">
            Display order
            <input type="number" min="0" value={form.order} onChange={(e) => set('order', Number(e.target.value))} className="mt-2 w-full rounded-lg border px-3 py-2" />
          </label>
          {!imported && (
            <>
              <label className="text-sm font-semibold">
                Event status
                <select value={form.remote_status} onChange={(e) => set('remote_status', e.target.value)} className="mt-2 w-full rounded-lg border bg-white p-2">
                  <option value="live">Live</option>
                  <option value="draft">Draft</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>
              <label className="text-sm font-semibold">
                Registration status
                <select value={form.sales_status} onChange={(e) => set('sales_status', e.target.value)} className="mt-2 w-full rounded-lg border bg-white p-2">
                  {['unknown', 'available', 'sold_out', 'unavailable'].map((value) => (
                    <option key={value} value={value}>{value.replaceAll('_', ' ')}</option>
                  ))}
                </select>
              </label>
            </>
          )}
          <fieldset className="md:col-span-2">
            <legend className="text-sm font-semibold">Topics & programmes</legend>
            <div className="mt-3 flex flex-wrap gap-4">
              {categories.filter((category) => category.kind !== 'eventbrite').map((category) => (
                <label key={category.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.classifications.includes(category.id)}
                    onChange={(e) => set('classifications', e.target.checked ? [...form.classifications, category.id] : form.classifications.filter((id) => id !== category.id))}
                  />
                  {category.name}
                  {!category.is_visible && ' (hidden)'}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-wrap gap-5 md:col-span-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_active} onChange={(e) => set('is_active', e.target.checked)} />
              Allow on public site
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => set('is_featured', e.target.checked)} />
              Featured
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button disabled={busy} className="btn-primary px-5 py-3 disabled:opacity-40">Save event</button>
          {event.public_visible && <a href={`/events/${event.slug}`} target="_blank" rel="noreferrer" className="text-sm underline">View event</a>}
          {imported ? (
            <button type="button" disabled={busy} onClick={() => act(() => cmsApi.post(`/events/${event.id}/sync/`, {}), 'Sync queued.')} className="text-sm underline">
              Sync this event
            </button>
          ) : (
            <button type="button" disabled={busy} onClick={() => { if (window.confirm('Delete this manual event? It will be removed from the website events list. This action cannot be undone.')) act(() => cmsApi.del(`/events/${event.id}/`), 'Manual event deleted.'); }} className="text-sm text-red-700 underline">
              Delete event
            </button>
          )}
        </div>
      </form>
    </details>
  );
}
