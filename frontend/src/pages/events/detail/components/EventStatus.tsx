import SiteLink from '@/components/base/SiteLink';
import type * as React from 'react';

/** Section: Event status (loading or unavailable). */
interface EventStatusProps {
  status: string;
  setRevision: React.Dispatch<React.SetStateAction<number>>;
}

export default function EventStatus({ status, setRevision }: EventStatusProps) {
  return (
    <section className="bg-primary-950 pb-20 pt-36 text-white"><div className="container-site"><h1 className="text-3xl font-bold text-white">{status === 'loading' ? 'Loading event…' : status === 'missing' ? 'Event not available' : 'Unable to load event'}</h1><p className="mt-4" role="status">{status === 'missing' ? 'This event may be private or no longer published.' : status === 'error' ? 'Please try again in a moment.' : 'Fetching the latest details.'}</p>{status === 'error' && <button onClick={() => setRevision(v => v + 1)} className="btn-primary mt-6 px-5 py-3">Try again</button>}<SiteLink href="/events" className="mt-6 block text-signal-300 underline">Browse all events</SiteLink></div></section>
  );
}
