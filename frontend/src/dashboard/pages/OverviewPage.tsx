import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cmsApi } from '../api/client';

interface Counts {
  events: number;
  enquiries: number;
  media: number;
}

export default function OverviewPage() {
  const [error, setError] = useState(false);
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    Promise.all([
      cmsApi.get<unknown[]>('/events/'),
      cmsApi.get<unknown[]>('/enquiries/'),
      cmsApi.get<unknown[]>('/media/'),
    ])
      .then(([events, enquiries, media]) => {
        setCounts({ events: events.length, enquiries: enquiries.length, media: media.length });
      })
      .catch(() => setError(true));
  }, []);

  const stats: { label: string; value: number | undefined; icon: string; href: string }[] = [
    { label: 'Events', value: counts?.events, icon: 'ri-calendar-line', href: '/dashboard/events' },
    { label: 'Enquiries', value: counts?.enquiries, icon: 'ri-mail-line', href: '/dashboard/enquiries' },
    { label: 'Media assets', value: counts?.media, icon: 'ri-image-line', href: '/dashboard/media' },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground-900">Overview</h1>
      <p className="mt-1 text-sm text-foreground-600">A quick look at what&apos;s in the dashboard.</p>
      {error && <p role="alert" className="mt-4 text-red-700">Counts could not be loaded. Refresh to try again.</p>}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} to={s.href} className="card-premium block p-6 transition-colors hover:border-primary-300">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <i className={`${s.icon} text-lg`} aria-hidden="true" />
            </span>
            <p className="mt-4 text-2xl font-bold text-foreground-900">{s.value ?? '—'}</p>
            <p className="mt-1 text-sm text-foreground-600">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
