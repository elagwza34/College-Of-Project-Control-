import { reportCmsError } from '../api/reportError';
import { useEffect, useState } from 'react';
import { cmsApi } from '../api/client';

interface Event {
  id: number;
  title: string;
  category: string;
  format: 'online' | 'in_person';
  cadence: string;
  description: string;
  cta_label: string;
  cta_href: string;
  external_id: string;
  source_url: string;
  order: number;
  is_active: boolean;
}

const emptyEvent = {
  title: 'New Event',
  category: '',
  format: 'online' as const,
  cadence: '',
  description: '',
  cta_label: 'Register Your Interest',
  cta_href: '/contact',
  external_id: '',
  source_url: '',
  order: 0,
  is_active: true,
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [adding, setAdding] = useState(false);

  const load = () => cmsApi.get<Event[]>('/events/').then(setEvents).catch(reportCmsError);

  useEffect(() => {
    load();
  }, []);

  const createEvent = async () => {
    try {
    setAdding(true);
    try {
      await cmsApi.post('/events/', emptyEvent);
      load();
    } finally {
      setAdding(false);
    }
  
    } catch (error) { reportCmsError(error); }
};

  const deleteEvent = async (id: number) => {
    try {
    if (!window.confirm('Delete this event?')) return;
    await cmsApi.del(`/events/${id}/`);
    load();
  
    } catch (error) { reportCmsError(error); }
};

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground-900">Events</h1>
          <p className="mt-1 text-sm text-foreground-600">Shown on the public Events page. Use the external link fields once events are linked to an outside source (e.g. Eventbrite).</p>
        </div>
        <button
          type="button"
          onClick={createEvent}
          disabled={adding}
          className="btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          + Add Event
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {events === null ? (
          <p className="text-sm text-foreground-400">Loading…</p>
        ) : events.length === 0 ? (
          <p className="text-sm text-foreground-400">No events yet.</p>
        ) : (
          events.map((event) => (
            <EventEditor key={event.id} event={event} onDelete={() => deleteEvent(event.id)} onSaved={load} />
          ))
        )}
      </div>
    </div>
  );
}

function EventEditor({ event, onDelete, onSaved }: { event: Event; onDelete: () => void; onSaved: () => void }) {
  const [form, setForm] = useState(event);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const set = <K extends keyof Event>(key: K, value: Event[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    try {
    setSaving(true);
    try {
      await cmsApi.patch(`/events/${event.id}/`, form);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2500);
      onSaved();
    } finally {
      setSaving(false);
    }
  
    } catch (error) { reportCmsError(error); }
};

  return (
    <div className="rounded-xl border border-background-200/70 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-background-200/60 pb-3">
        <span className="font-heading text-sm font-bold text-foreground-900">{form.title || 'Untitled event'}</span>
        <button type="button" onClick={onDelete} className="text-xs font-semibold text-red-600 hover:text-red-700">
          Delete event
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField id={`title-${event.id}`} label="Title" value={form.title} onChange={(v) => set('title', v)} />
        <TextField id={`category-${event.id}`} label="Category" value={form.category} onChange={(v) => set('category', v)} />
        <div>
          <label htmlFor={`format-${event.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Format</label>
          <select
            id={`format-${event.id}`}
            value={form.format}
            onChange={(e) => set('format', e.target.value as Event['format'])}
            className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
          >
            <option value="online">Online</option>
            <option value="in_person">In Person</option>
          </select>
        </div>
        <TextField id={`cadence-${event.id}`} label="Cadence (e.g. Monthly)" value={form.cadence} onChange={(v) => set('cadence', v)} />
        <TextField id={`cta-label-${event.id}`} label="CTA button label" value={form.cta_label} onChange={(v) => set('cta_label', v)} />
        <TextField id={`cta-href-${event.id}`} label="CTA link" value={form.cta_href} onChange={(v) => set('cta_href', v)} />
        <TextField id={`external-id-${event.id}`} label="External ID (optional)" value={form.external_id} onChange={(v) => set('external_id', v)} />
        <TextField id={`source-url-${event.id}`} label="External source link (optional)" value={form.source_url} onChange={(v) => set('source_url', v)} />
        <div className="sm:col-span-2">
          <label htmlFor={`description-${event.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Description</label>
          <textarea
            id={`description-${event.id}`}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={3}
            className="w-full resize-y rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
          />
        </div>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label htmlFor={`order-${event.id}`} className="mb-1 block text-xs font-semibold text-foreground-600">Order</label>
            <input
              id={`order-${event.id}`}
              type="number"
              value={form.order}
              onChange={(e) => set('order', Number(e.target.value))}
              className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
            />
          </div>
          <label className="flex items-center gap-2 py-2 text-sm text-foreground-700">
            <input type="checkbox" checked={form.is_active} onChange={(e) => set('is_active', e.target.checked)} />
            Published
          </label>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="btn-primary px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Event'}
        </button>
        {!form.is_active && <span className="text-xs font-semibold text-background-600">Draft — hidden from the live site</span>}
        {savedMsg && <span className="text-xs font-medium text-highlight-700">Saved successfully!</span>}
      </div>
    </div>
  );
}

function TextField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-foreground-600">{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-background-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
      />
    </div>
  );
}
