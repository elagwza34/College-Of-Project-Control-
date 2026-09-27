import { useEffect, useState } from 'react';
import { cmsApi } from '../api/client';

interface Settings { token_saved: boolean; organization_id: string; public_base_url: string; auto_sync: boolean; interval_minutes: number; show_uncategorized: boolean; connection_ok: boolean; connection_checked_at: string | null; last_full_sync: string | null; worker_online: boolean; webhook_url: string }
interface Job { id: number; kind: string; reason: string; status: string; attempts: number; created_at: string; due_at: string; result: Record<string, number>; error: string }
const input = 'mt-2 w-full rounded-lg border border-background-300 bg-white px-3 py-3 text-sm';
const date = (v: string | null) => v ? new Date(v).toLocaleString('en-GB') : 'Not yet';

export default function EventbriteSettings({ history = false }: { history?: boolean }) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [form, setForm] = useState({ organization_id: '', public_base_url: '', auto_sync: true, interval_minutes: 15, show_uncategorized: true });
  const [token, setToken] = useState('');
  const [clear, setClear] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const reload = async (fill = false) => {
    const [data, queue] = await Promise.all([cmsApi.get<Settings>('/eventbrite/settings/'), cmsApi.get<Job[]>('/eventbrite/jobs/')]);
    setSettings(data); setJobs(queue);
    if (fill) setForm({ organization_id: data.organization_id, public_base_url: data.public_base_url, auto_sync: data.auto_sync, interval_minutes: data.interval_minutes, show_uncategorized: data.show_uncategorized });
  };
  useEffect(() => {
    let active = true;
    reload(true).catch(e => { if (active) setError(String(e.message)); });
    const timer = window.setInterval(() => { if (active) reload().catch(() => {}); }, 15000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);
  const act = async (action: () => Promise<unknown>, success: string) => { setBusy(true); setError(''); setMessage(''); try { await action(); setMessage(success); await reload(); } catch (e) { setError(e instanceof Error ? e.message : 'Unable to update Eventbrite settings. Check the saved details and try again.'); } finally { setBusy(false); } };
  const save = () => act(async () => { await cmsApi.patch('/eventbrite/settings/', { ...form, token, clear_token: clear }); setToken(''); setClear(false); }, 'Settings saved. Test the connection after changing account details.');
  return <div className="space-y-6">
    {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}{message && <p role="status" className="rounded-lg bg-green-50 p-4 text-sm text-green-800">{message}</p>}
    {!settings ? <p role="status">Loading Eventbrite settings…</p> : <>
      <div className="flex flex-wrap gap-6 rounded-xl border bg-white p-5 text-sm"><span>Connection: <strong>{settings.connection_ok ? 'Verified' : 'Not verified'}</strong></span><span>Worker: <strong>{settings.worker_online ? 'Online' : 'Offline'}</strong></span><span>Last full sync: <strong>{date(settings.last_full_sync)}</strong></span></div>
      {!settings.worker_online && <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">The background worker is offline. Queued jobs will run when the server worker starts.</p>}
      {!history && <>
        <form onSubmit={e => { e.preventDefault(); save(); }} className="rounded-xl border bg-white p-6"><h2 className="text-xl font-bold">Eventbrite connection</h2><p className="mt-2 text-sm text-foreground-600">Save your account details here, then test the connection. Eventbrite remains the source for event details and registration.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold">Private API token<input type="password" autoComplete="new-password" value={token} onChange={e => setToken(e.target.value)} placeholder={settings.token_saved ? 'Token saved — leave blank to keep it' : 'Enter your Eventbrite private token'} className={input} /><span className="mt-2 block text-xs font-normal text-foreground-500">Stored encrypted. The saved token is never returned to the dashboard.</span></label><label className="text-sm font-semibold">Organization ID<input inputMode="numeric" pattern="[0-9]*" value={form.organization_id} onChange={e => setForm({ ...form, organization_id: e.target.value })} className={input} /></label><label className="text-sm font-semibold md:col-span-2">Public backend URL (HTTPS)<input type="url" value={form.public_base_url} onChange={e => setForm({ ...form, public_base_url: e.target.value })} placeholder="https://api.example.com" className={input} /><span className="mt-2 block text-xs font-normal text-foreground-500">Needed for webhooks. Scheduled and manual sync can work without this URL.</span></label><label className="text-sm font-semibold">Sync interval (minutes)<input type="number" min="5" max="1440" value={form.interval_minutes} onChange={e => setForm({ ...form, interval_minutes: Number(e.target.value) })} className={input} /></label><div className="space-y-4 pt-3"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.auto_sync} onChange={e => setForm({ ...form, auto_sync: e.target.checked })} />Enable automatic sync and webhook processing</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.show_uncategorized} onChange={e => setForm({ ...form, show_uncategorized: e.target.checked })} />Show events without a category or classification</label>{settings.token_saved && <label className="flex items-center gap-2 text-sm text-red-700"><input type="checkbox" checked={clear} onChange={e => setClear(e.target.checked)} />Remove saved token when saving</label>}</div></div>
          <div className="mt-6 flex flex-wrap gap-3"><button disabled={busy} className="btn-primary px-5 py-3 disabled:opacity-40">Save settings</button><button type="button" disabled={busy || !settings.token_saved} onClick={() => act(() => cmsApi.post('/eventbrite/test/', {}), 'Connection verified. Automatic sync can now run.')} className="rounded-lg border px-5 py-3 disabled:opacity-40">Test saved connection</button><button type="button" disabled={busy || !settings.token_saved} onClick={() => act(() => cmsApi.post('/eventbrite/sync/', {}), 'Sync queued. Follow its progress in Sync history.')} className="rounded-lg border px-5 py-3 disabled:opacity-40">Sync now</button></div>
        </form>
        <div className="rounded-xl border bg-white p-6"><h2 className="text-xl font-bold">Webhook notifications</h2><p className="mt-2 text-sm text-foreground-600">In your Eventbrite developer account, create a webhook using this URL and enable event create, update, publish, unpublish and delete actions. Scheduled sync also reconciles changes and ticket availability.</p>{settings.webhook_url ? <><label className="mt-4 block text-sm font-semibold">Webhook URL<input readOnly value={settings.webhook_url} className={input} /></label><button onClick={() => act(() => navigator.clipboard.writeText(settings.webhook_url), 'Webhook URL copied.')} className="mt-3 text-sm font-semibold text-primary-700 underline">Copy webhook URL</button></> : <p className="mt-4 text-sm">Save your public HTTPS backend URL to generate the webhook address.</p>}</div>
      </>}
      {history && <div className="rounded-xl border bg-white p-6"><div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold">Sync history</h2><button disabled={busy} onClick={() => act(() => reload(), 'History refreshed.')} className="text-sm font-semibold underline">Refresh</button></div><p className="mt-2 text-sm text-foreground-500">Latest 50 jobs. Temporary failures retry automatically up to 5 attempts.</p><div className="mt-5 space-y-4">{jobs.length === 0 ? <p>No sync jobs yet.</p> : jobs.map(job => <div key={job.id} className="rounded-lg border p-4"><div className="flex flex-wrap justify-between gap-3"><strong>#{job.id} · {job.kind} · {job.status}</strong><span className="text-xs text-foreground-500">{date(job.created_at)}</span></div><p className="mt-2 text-sm">{job.reason} · Attempt {job.attempts}</p>{Object.keys(job.result).length > 0 && <p className="mt-2 text-sm">{Object.entries(job.result).map(([key, value]) => `${key}: ${value}`).join(' · ')}</p>}{job.error && <p className="mt-2 text-sm text-red-700">{job.error}</p>}{job.status === 'pending' && <p className="mt-2 text-xs">Due: {date(job.due_at)}</p>}{['pending', 'failed'].includes(job.status) && <button disabled={busy} onClick={() => act(() => cmsApi.post(`/eventbrite/jobs/${job.id}/retry/`, {}), 'Retry queued.')} className="mt-3 text-sm font-semibold underline">Retry now</button>}</div>)}</div></div>}
    </>}
  </div>;
}
