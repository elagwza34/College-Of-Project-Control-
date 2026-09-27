import { useState } from 'react';
import type * as React from 'react';
import { type SetURLSearchParams } from 'react-router-dom';

import EventCard from '@/components/feature/EventCard';
import { type EventCategory, type EventResults } from '@/services/eventsApi';

interface FindEventsProps {
  update: (key: string, value: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  params: URLSearchParams;
  options: EventCategory[];
  setParams: SetURLSearchParams;
  error: boolean;
  setRevision: React.Dispatch<React.SetStateAction<number>>;
  data: EventResults;
  page: number;
}

export default function FindEvents({
  update,
  search,
  setSearch,
  params,
  options,
  setParams,
  error,
  setRevision,
  data,
  page,
}: FindEventsProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const totalPages = data ? Math.ceil(data.count / 12) : 1;

  const resetFilters = () => {
    setSearch('');
    setParams({});
    setFiltersOpen(false);
  };

  const filterPanel = (
    <div className="rounded-xl border border-background-200 bg-white p-5 shadow-sm lg:sticky lg:top-32">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">Filter events</p>
          <h2 className="mt-1 text-xl font-bold text-foreground-950">Find the right session</h2>
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen(false)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-background-200 text-foreground-700 lg:hidden"
          aria-label="Close filters"
        >
          <i className="ri-close-line text-xl" aria-hidden="true" />
        </button>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setFiltersOpen(false);
        }}
        className="space-y-4"
      >
        <FilterSelect label="When" value={params.get('scope') || 'upcoming'} onChange={(value) => update('scope', value)}>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past events</option>
          <option value="all">All events</option>
        </FilterSelect>

        <FilterSelect label="Format" value={params.get('format') || ''} onChange={(value) => update('format', value)}>
          <option value="">All formats</option>
          <option value="online">Online</option>
          <option value="in_person">In person</option>
        </FilterSelect>

        {(
          [
            ['category', 'Category', 'eventbrite'],
            ['classification', 'Topic', 'local'],
            ['programme', 'Programme', 'programme'],
          ] as const
        ).map(([key, label, kind]) => (
          <FilterSelect key={key} label={label} value={params.get(key) || ''} onChange={(value) => update(key, value)}>
            <option value="">All {key === 'category' ? 'categories' : `${label.toLowerCase()}s`}</option>
            {options
              .filter((option) => option.kind === kind)
              .map((option) => (
                <option key={option.id} value={option.slug}>
                  {option.name}
                </option>
              ))}
          </FilterSelect>
        ))}

        <div className="flex flex-col gap-3 pt-2">
          <button type="submit" className="btn-primary min-h-12 w-full justify-center px-5 py-3">
            Apply filters
          </button>
          <button type="button" onClick={resetFilters} className="min-h-11 text-sm font-semibold text-primary-700 underline">
            Clear filters
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <section className="container-site py-12" aria-label="Find events">
      <button
        type="button"
        onClick={() => setFiltersOpen((value) => !value)}
        className="mb-5 flex min-h-12 w-full items-center justify-between rounded-xl border border-background-200 bg-white px-5 text-left font-bold text-foreground-950 shadow-sm lg:hidden"
        aria-expanded={filtersOpen}
        aria-controls="event-filters"
      >
        <span className="inline-flex items-center gap-2">
          <i className="ri-filter-3-line text-primary-700" aria-hidden="true" />
          Filters
        </span>
        <i className={`ri-arrow-down-s-line text-xl transition-transform ${filtersOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
        <aside id="event-filters" className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
          {filterPanel}
        </aside>

        <div className="min-w-0">
          {error ? (
            <div role="alert" className="rounded-xl bg-white px-6 py-12">
              <p>Events could not be loaded.</p>
              <button onClick={() => setRevision((value) => value + 1)} className="btn-primary mt-4 px-5 py-3">
                Try again
              </button>
            </div>
          ) : !data ? (
            <p role="status" className="rounded-xl bg-white px-6 py-12">
              Loading events...
            </p>
          ) : (
            <>
              <div className="mb-6 grid gap-4 rounded-xl border border-background-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    update('search', search.trim());
                  }}
                  className="flex min-w-0 flex-col gap-3 sm:flex-row"
                >
                  <label className="sr-only" htmlFor="events-search">
                    Search events
                  </label>
                  <input
                    id="events-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search events, topics or locations"
                    className="min-h-12 min-w-0 flex-1 rounded-lg border border-background-300 px-4"
                  />
                  <button type="submit" className="btn-primary min-h-12 justify-center px-6 py-3">
                    Search
                  </button>
                </form>
                <p className="text-sm font-semibold text-foreground-700 md:justify-self-end" role="status">
                  {data.count} {data.count === 1 ? 'event' : 'events'} found
                </p>
              </div>
              {data.results.length ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {data.results.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-white px-6 py-16 text-center">
                  <h2 className="text-2xl font-bold">No events found</h2>
                  <p className="mt-3 text-foreground-600">Try another topic or check back for new dates.</p>
                </div>
              )}
              {data.count > 12 && (
                <nav aria-label="Events pagination" className="mt-10 flex flex-wrap items-center justify-center gap-5">
                  <button
                    disabled={!data.previous}
                    onClick={() => {
                      const next = new URLSearchParams(params);
                      next.set('page', String(page - 1));
                      setParams(next);
                    }}
                    className="rounded-lg border px-5 py-3 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={!data.next}
                    onClick={() => {
                      const next = new URLSearchParams(params);
                      next.set('page', String(page + 1));
                      setParams(next);
                    }}
                    className="rounded-lg border px-5 py-3 disabled:opacity-40"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-foreground-900">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-11 w-full rounded-lg border border-background-300 bg-white px-3"
      >
        {children}
      </select>
    </label>
  );
}
