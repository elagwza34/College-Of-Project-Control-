import EventCard from '@/components/feature/EventCard';
import { type EventCategory,type EventResults } from '@/services/eventsApi';
import type * as React from 'react';

/** Section: Find events. */
interface FindEventsProps {
  update: (key: string, value: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  params: URLSearchParams;
  options: EventCategory[];
  setParams: import('react-router-dom').SetURLSearchParams;
  error: boolean;
  setRevision: React.Dispatch<React.SetStateAction<number>>;
  data: EventResults;
  page: number;
}

export default function FindEvents({ update, search, setSearch, params, options, setParams, error, setRevision, data, page }: FindEventsProps) {
  return (
    <section className="container-site py-12" aria-label="Find events">
      <div className="rounded-2xl border border-background-200 bg-white p-5 md:p-7">
        <form onSubmit={e => { e.preventDefault(); update('search', search.trim()); }} className="flex flex-wrap gap-3"><label className="min-w-0 flex-1"><span className="sr-only">Search events</span><input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events, topics or locations" className="min-h-12 w-full rounded-lg border border-background-300 px-4" /></label><button className="btn-primary px-6 py-3">Search</button></form>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <label className="text-sm font-semibold">When<select value={params.get('scope') || 'upcoming'} onChange={e => update('scope', e.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-background-300 bg-white px-3"><option value="upcoming">Upcoming</option><option value="past">Past events</option><option value="all">All events</option></select></label>
          <label className="text-sm font-semibold">Format<select value={params.get('format') || ''} onChange={e => update('format', e.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-background-300 bg-white px-3"><option value="">All formats</option><option value="online">Online</option><option value="in_person">In person</option></select></label>
          {([['category', 'Category', 'eventbrite'], ['classification', 'Topic', 'local'], ['programme', 'Programme', 'programme']] as const).map(([key, label, kind]) => <label key={key} className="text-sm font-semibold">{label}<select value={params.get(key) || ''} onChange={e => update(key, e.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-background-300 bg-white px-3"><option value="">All {key === 'category' ? 'categories' : `${label.toLowerCase()}s`}</option>{options.filter(t => t.kind === kind).map(t => <option key={t.id} value={t.slug}>{t.name}</option>)}</select></label>)}
        </div><button onClick={() => { setSearch(''); setParams({}); }} className="mt-4 text-sm font-semibold text-primary-700 underline">Clear filters</button>
      </div>
      {error ? <div role="alert" className="py-12"><p>Events could not be loaded.</p><button onClick={() => setRevision(v => v + 1)} className="btn-primary mt-4 px-5 py-3">Try again</button></div> : !data ? <p role="status" className="py-12">Loading events…</p> : <><p className="my-7 text-sm text-foreground-600" role="status">{data.count} {data.count === 1 ? 'event' : 'events'} found</p>{data.results.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{data.results.map(event => <EventCard key={event.id} event={event} />)}</div> : <div className="rounded-xl bg-white px-6 py-16 text-center"><h2 className="text-2xl font-bold">No events found</h2><p className="mt-3 text-foreground-600">Try another topic or check back for new dates.</p></div>}
        {data.count > 12 && <nav aria-label="Events pagination" className="mt-10 flex items-center justify-center gap-5"><button disabled={!data.previous} onClick={() => { const next = new URLSearchParams(params); next.set('page', String(page - 1)); setParams(next); }} className="rounded-lg border px-5 py-3 disabled:opacity-40">Previous</button><span>Page {page} of {Math.ceil(data.count / 12)}</span><button disabled={!data.next} onClick={() => { const next = new URLSearchParams(params); next.set('page', String(page + 1)); setParams(next); }} className="rounded-lg border px-5 py-3 disabled:opacity-40">Next</button></nav>}</>}
    </section>
  );
}
