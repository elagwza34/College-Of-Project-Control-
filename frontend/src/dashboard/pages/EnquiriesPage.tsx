import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cmsApi } from '../api/client';
import { DashboardAlert, DashboardEmptyState, DashboardPageHeader, StatusBadge } from '../components/DashboardPrimitives';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  roleTitle: string;
  enquiryType: string;
  message: string;
  sourcePath: string;
  status: string;
  created_at: string;
  read_at: string | null;
  internal_notes: string;
  assigned_to: number | null;
  assigned_name: string | null;
  follow_up_at: string | null;
}

const states = ['new', 'contacted', 'qualified', 'closed'];
const fieldClass = 'mt-2 w-full rounded-lg border border-background-200 bg-white p-3 text-base focus:border-primary-400 focus:outline-none';
const announce = () => window.dispatchEvent(new Event('enquiries-updated'));

function statusTone(status: string) {
  if (status === 'new') return 'info';
  if (status === 'qualified') return 'success';
  if (status === 'closed') return 'neutral';
  return 'warning';
}

function Detail({ id, onSaved }: { id: string; onSaved: () => void }) {
  const [item, setItem] = useState<Enquiry | null>(null);
  const [team, setTeam] = useState<{ id: number; username: string }[]>([]);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    setItem(null);
    setError('');
    setSaved('');
    Promise.all([cmsApi.post<Enquiry>(`/enquiries/${id}/read/`, {}), cmsApi.get<{ id: number; username: string }[]>('/enquiries/team/')])
      .then(([value, users]) => {
        if (active) {
          setItem(value);
          setTeam(users);
          announce();
          onSaved();
        }
      })
      .catch(() => {
        if (active) setError('Could not open this enquiry. Select another enquiry or retry loading the page.');
      });
    return () => {
      active = false;
    };
    // onSaved refreshes the list; opening an enquiry is keyed to its ID.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function save() {
    if (!item) return;
    setBusy(true);
    setError('');
    setSaved('');
    try {
      const value = await cmsApi.patch<Enquiry>(`/enquiries/${id}/`, {
        status: item.status,
        internal_notes: item.internal_notes,
        assigned_to: item.assigned_to,
        follow_up_at: item.follow_up_at,
      });
      setItem(value);
      setSaved('Follow-up saved.');
      announce();
      onSaved();
    } catch {
      setError('Could not save this enquiry. Your changes are still here; check the connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-6 rounded-xl border border-background-200 bg-white p-5 shadow-sm md:p-6" aria-label="Enquiry details">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-primary-700">Selected enquiry</p>
          <h2 className="mt-1 text-xl font-bold">Enquiry #{id}</h2>
        </div>
        {item && <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>}
      </div>

      {error && <div className="mt-4"><DashboardAlert tone="error">{error}</DashboardAlert></div>}
      {saved && <div className="mt-4"><DashboardAlert tone="success">{saved}</DashboardAlert></div>}

      {!item ? (
        <p className="mt-5 text-sm text-foreground-600">{error ? 'Open another enquiry or reload the list to retry.' : 'Loading enquiry...'}</p>
      ) : (
        <>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Name', item.name],
              ['Email', item.email],
              ['Phone', item.phone],
              ['Organisation', item.organisation],
              ['Role', item.roleTitle],
              ['Enquiry type', item.enquiryType],
              ['Source page', item.sourcePath],
              ['Received', new Date(item.created_at).toLocaleString('en-GB')],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0 rounded-lg bg-background-50 p-3">
                <dt className="text-xs font-bold uppercase tracking-wide text-foreground-500">{label}</dt>
                <dd className="mt-1 break-words text-sm text-foreground-900">{value || '-'}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <h3 className="font-bold">Message</h3>
            <p className="mt-2 whitespace-pre-wrap break-words rounded-lg border border-background-200 bg-background-50 p-4 text-sm leading-relaxed">
              {item.message || 'No message provided.'}
            </p>
          </div>

          <form className="mt-6" onSubmit={(event) => { event.preventDefault(); void save(); }}>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="text-sm font-semibold">
                Status
                <select className={fieldClass} value={item.status} onChange={(event) => setItem({ ...item, status: event.target.value })}>
                  {states.map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold">
                Assigned to
                <select className={fieldClass} value={item.assigned_to ?? ''} onChange={(event) => setItem({ ...item, assigned_to: event.target.value ? Number(event.target.value) : null })}>
                  <option value="">Unassigned</option>
                  {team.map((user) => <option key={user.id} value={user.id}>{user.username}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold">
                Follow-up time
                <input
                  type="datetime-local"
                  className={fieldClass}
                  value={item.follow_up_at ? new Date(new Date(item.follow_up_at).getTime() - new Date(item.follow_up_at).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                  onChange={(event) => setItem({ ...item, follow_up_at: event.target.value ? new Date(event.target.value).toISOString() : null })}
                />
              </label>
            </div>
            <label className="mt-4 block text-sm font-semibold">
              Internal notes
              <textarea rows={5} maxLength={20000} className={fieldClass} value={item.internal_notes} onChange={(event) => setItem({ ...item, internal_notes: event.target.value })} />
            </label>
            <button disabled={busy} className="btn-primary mt-4">{busy ? 'Saving...' : 'Save follow-up'}</button>
          </form>
        </>
      )}
    </section>
  );
}

export default function EnquiriesPage() {
  const [params, setParams] = useSearchParams();
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const [search, setSearch] = useState(params.get('search') || '');
  const query = new URLSearchParams(params);
  query.delete('enquiry');
  const filter = query.toString();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    cmsApi.get<Enquiry[]>(`/enquiries/?${filter}`)
      .then((data) => {
        if (active) setRows(data);
      })
      .catch(() => {
        if (active) setError('Could not load enquiries. Check the connection and retry.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [filter, revision]);

  function setFilter(name: string, value: string) {
    const next = new URLSearchParams(params);
    next.delete('enquiry');
    if (value) next.set(name, value);
    else next.delete(name);
    setParams(next);
  }

  const selected = params.get('enquiry');
  const unreadCount = rows.filter((row) => !row.read_at).length;

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Workspace"
        title="Enquiries"
        description="Read requests, assign follow-up and keep track of the next step without losing the enquiry context."
        meta={
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="info">{rows.length} loaded</StatusBadge>
            <StatusBadge tone={unreadCount ? 'warning' : 'neutral'}>{unreadCount} unread</StatusBadge>
          </div>
        }
      />

      <form onSubmit={(event) => { event.preventDefault(); setFilter('search', search); }} className="rounded-xl border border-background-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto_auto_auto] lg:items-end">
          <label className="min-w-0 text-sm font-semibold">
            Search enquiries
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} className={fieldClass} placeholder="Name, email, organisation or message" />
          </label>
          <label className="text-sm font-semibold">
            Status
            <select className={fieldClass} value={params.get('status') || ''} onChange={(event) => setFilter('status', event.target.value)}>
              <option value="">All statuses</option>
              {states.map((state) => <option key={state}>{state}</option>)}
            </select>
          </label>
          <label className="flex min-h-12 items-center gap-2 rounded-lg border border-background-200 px-3 text-sm">
            <input type="checkbox" checked={params.get('unread') === 'true'} onChange={(event) => setFilter('unread', event.target.checked ? 'true' : '')} />
            Unread only
          </label>
          <label className="flex min-h-12 items-center gap-2 rounded-lg border border-background-200 px-3 text-sm">
            <input type="checkbox" checked={params.get('due') === 'true'} onChange={(event) => setFilter('due', event.target.checked ? 'true' : '')} />
            Follow-up due
          </label>
          <div className="flex gap-2">
            <button className="btn-secondary px-4 py-3">Search</button>
            <button type="button" className="rounded-lg border border-background-300 bg-white px-4 py-3 text-sm font-semibold" onClick={() => setRevision((value) => value + 1)}>Refresh</button>
          </div>
        </div>
      </form>

      {error && <div className="mt-4"><DashboardAlert tone="error">{error}</DashboardAlert></div>}
      {selected && <Detail key={selected} id={selected} onSaved={() => setRevision((value) => value + 1)} />}

      <div className="mt-6 overflow-x-auto rounded-xl border border-background-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Dashboard enquiries</caption>
          <thead className="bg-background-50 text-xs uppercase tracking-wide text-foreground-500">
            <tr>
              {['Name', 'Type', 'Received', 'Status', 'Assigned to', 'Follow-up'].map((heading) => (
                <th key={heading} scope="col" className="px-4 py-3 font-bold">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-foreground-600">Loading enquiries...</td></tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6">
                  <DashboardEmptyState title="No enquiries match these filters" description="Try a broader search, clear one of the status filters, or refresh the list." />
                </td>
              </tr>
            ) : rows.map((enquiry) => (
              <tr key={enquiry.id} className={`border-t border-background-200 align-top ${!enquiry.read_at ? 'bg-primary-50/50' : ''}`}>
                <td className="min-w-64 px-4 py-3">
                  <button className="min-h-11 text-left font-semibold text-primary-800 underline-offset-4 hover:underline" onClick={() => { const next = new URLSearchParams(params); next.set('enquiry', String(enquiry.id)); setParams(next); }}>
                    {enquiry.name || 'Unnamed enquiry'}
                  </button>
                  <p className="mt-1 text-xs text-foreground-600">{enquiry.email}</p>
                  {!enquiry.read_at && <span className="mt-2 inline-block"><StatusBadge tone="warning">Unread</StatusBadge></span>}
                </td>
                <td className="px-4 py-3">{enquiry.enquiryType || 'General'}</td>
                <td className="whitespace-nowrap px-4 py-3">{new Date(enquiry.created_at).toLocaleDateString('en-GB')}</td>
                <td className="px-4 py-3"><StatusBadge tone={statusTone(enquiry.status)}>{enquiry.status}</StatusBadge></td>
                <td className="px-4 py-3">{enquiry.assigned_name || 'Unassigned'}</td>
                <td className="px-4 py-3">{enquiry.follow_up_at ? new Date(enquiry.follow_up_at).toLocaleString('en-GB') : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
