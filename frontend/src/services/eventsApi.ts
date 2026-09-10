const BASE = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');
export interface EventCategory { id: number; name: string; slug: string; kind: 'eventbrite' | 'local' | 'programme'; is_visible: boolean; order: number; remote_id: string }
export interface EventItem {
  id: number; slug: string; title: string; category: string; source: 'manual' | 'eventbrite';
  source_category: EventCategory | null; classifications: EventCategory[]; format: 'online' | 'in_person';
  cadence: string; display_summary: string; description?: string; image_url: string; image_alt: string;
  starts_at: string | null; ends_at: string | null; timezone: string; location: string; organizer: string;
  state: 'upcoming' | 'ended' | 'cancelled'; sales_status: string; price_label: string; is_featured: boolean;
  highlights_url: string; booking_url: string; booking_label: string; last_synced_at: string | null; availability_stale: boolean;
}
export interface EventResults { count: number; results: EventItem[]; next: string | null; previous: string | null }
export class EventRequestError extends Error { status: number; constructor(status: number) { super('Unable to load events'); this.status = status; } }
async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE}${path}`, { signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000) });
  if (!response.ok) throw new EventRequestError(response.status);
  return response.json();
}
export const fetchEventOptions = (signal?: AbortSignal) => get<EventCategory[]>('/events/options/', signal);
export const fetchEvent = (slug: string, signal?: AbortSignal) => get<EventItem>(`/events/${encodeURIComponent(slug)}/`, signal);
export const fetchEventLibrary = (params: Record<string, string | number | undefined> = {}, signal?: AbortSignal) => {
  const query = new URLSearchParams(); Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, String(value)); });
  return get<EventResults>(`/events/library/?${query}`, signal);
};
export function eventDate(event: EventItem, end = false) {
  const value = end ? event.ends_at : event.starts_at;
  if (!value) return end ? '' : event.cadence || 'Date to be confirmed';
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: event.timezone || 'Europe/London' }).format(new Date(value));
}
