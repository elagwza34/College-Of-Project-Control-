import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { cmsApi } from '../api/client';
import { DashboardAlert, DashboardPageHeader, StatusBadge } from '../components/DashboardPrimitives';

interface MaintenanceSettings {
  enabled: boolean;
  authenticated: boolean;
  heading: string;
  message: string;
  pinSet: boolean;
}

const input = 'mt-2 w-full rounded-lg border border-background-300 bg-white px-3 py-3 text-sm';

export default function MaintenancePage() {
  const [settings, setSettings] = useState<MaintenanceSettings | null>(null);
  const [form, setForm] = useState({ enabled: false, heading: 'Website under construction', message: '', pin: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    cmsApi.get<MaintenanceSettings>('/maintenance/')
      .then((data) => {
        setSettings(data);
        setForm({ enabled: data.enabled, heading: data.heading, message: data.message, pin: '' });
      })
      .catch((event) => setError(event instanceof Error ? event.message : 'Could not load maintenance settings.'));
  }, []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.pin && !/^\d{6}$/.test(form.pin)) {
      setError('The preview PIN must be exactly 6 digits.');
      return;
    }
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const data = await cmsApi.patch<MaintenanceSettings>('/maintenance/', form);
      setSettings(data);
      setForm({ enabled: data.enabled, heading: data.heading, message: data.message, pin: '' });
      setNotice('Maintenance settings saved.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save maintenance settings.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Website access"
        title="Maintenance mode"
        description="Control whether the public website is visible, or replaced by an under-construction screen protected by a 6-digit preview code."
        meta={<StatusBadge tone={settings?.enabled ? 'warning' : 'success'}>{settings?.enabled ? 'Maintenance enabled' : 'Website public'}</StatusBadge>}
      />

      {error && <DashboardAlert tone="error" title="Could not save" onDismiss={() => setError('')}><p>{error}</p></DashboardAlert>}
      {notice && <DashboardAlert tone="success" title="Saved" onDismiss={() => setNotice('')}><p>{notice}</p></DashboardAlert>}

      {!settings ? <p role="status">Loading maintenance settings...</p> : (
        <form onSubmit={save} className="max-w-4xl rounded-xl border border-background-200 bg-white p-6 shadow-sm">
          <label className="flex items-start gap-3 rounded-xl border border-background-200 bg-background-50 p-4">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(event) => setForm({ ...form, enabled: event.target.checked })}
              className="mt-1"
            />
            <span>
              <span className="block text-sm font-bold text-foreground-950">Enable maintenance mode</span>
              <span className="mt-1 block text-sm text-foreground-600">Visitors will see the under-construction screen unless they enter the correct 6-digit code. The dashboard remains accessible.</span>
            </span>
          </label>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="text-sm font-semibold md:col-span-2">Maintenance heading
              <input required maxLength={120} className={input} value={form.heading} onChange={(event) => setForm({ ...form, heading: event.target.value })} />
            </label>
            <label className="text-sm font-semibold md:col-span-2">Maintenance message
              <textarea required maxLength={1000} rows={4} className={input} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
            </label>
            <label className="text-sm font-semibold">Preview PIN
              <input
                value={form.pin}
                onChange={(event) => setForm({ ...form, pin: event.target.value.replace(/\D/g, '').slice(0, 6) })}
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                autoComplete="new-password"
                placeholder={settings.pinSet ? 'PIN saved - leave blank to keep it' : 'Set a 6-digit PIN'}
                className={input}
              />
              <span className="mt-2 block text-xs font-normal text-foreground-500">Saved as a secure hash. The current PIN is never shown.</span>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" disabled={busy || (form.enabled && !settings.pinSet && form.pin.length !== 6)} className="rounded-lg bg-primary-700 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">
              {busy ? 'Saving...' : 'Save maintenance settings'}
            </button>
            <a href="/" target="_blank" rel="noreferrer" className="rounded-lg border border-background-300 px-5 py-3 text-sm font-bold text-primary-800 transition hover:border-primary-300 hover:bg-background-50">
              Preview public site
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
