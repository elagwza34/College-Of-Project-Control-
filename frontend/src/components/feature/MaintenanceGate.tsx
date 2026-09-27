import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');
const TOKEN_KEY = 'maintenance_access_token';

interface MaintenanceStatus {
  enabled: boolean;
  authenticated: boolean;
  heading: string;
  message: string;
  pinSet: boolean;
}

async function loadStatus(): Promise<MaintenanceStatus> {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${API_BASE_URL}/maintenance/`, {
    headers: token ? { 'X-Maintenance-Access': token } : undefined,
  });
  if (!response.ok) throw new Error('Could not load maintenance status.');
  return response.json() as Promise<MaintenanceStatus>;
}

export default function MaintenanceGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<MaintenanceStatus | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    loadStatus()
      .then((data) => {
        setStatus(data);
        if (!data.enabled) localStorage.removeItem(TOKEN_KEY);
      })
      .catch(() => setStatus({ enabled: false, authenticated: true, heading: '', message: '', pinSet: false }));
  }, []);

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{6}$/.test(pin)) {
      setError('Enter the 6-digit access code.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/maintenance/verify/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await response.json().catch(() => ({})) as MaintenanceStatus & { accessToken?: string; detail?: string };
      if (!response.ok || !data.accessToken) throw new Error(data.detail || 'Invalid access code.');
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      setStatus({ ...data, authenticated: true });
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : 'Invalid access code.');
    } finally {
      setBusy(false);
    }
  }

  if (!status) {
    return <main className="flex min-h-screen items-center justify-center bg-primary-950 text-white" role="status">Loading website</main>;
  }

  if (!status.enabled || status.authenticated) return <>{children}</>;

  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden bg-primary-950 px-4 py-12 text-white">
      <div className="signal-pattern absolute inset-0 -z-10 opacity-20" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_25%_20%,rgba(255,169,83,.18),transparent_35%),linear-gradient(135deg,rgba(0,0,0,.38),transparent)]" />
      <section className="mx-auto w-full max-w-xl rounded-2xl border border-white/12 bg-white/[0.06] p-6 shadow-overlay backdrop-blur md:p-8">
        <p className="font-label text-xs font-bold uppercase tracking-[.22em] text-signal-300">Private preview</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">{status.heading || 'Website under construction'}</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/72 md:text-base">{status.message}</p>
        <form onSubmit={verify} className="mt-7 space-y-4">
          <label className="block text-sm font-semibold text-white/86">
            Access code
            <input
              value={pin}
              onChange={(event) => setPin(event.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{6}"
              maxLength={6}
              className="mt-2 w-full rounded-xl border border-white/16 bg-white px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] text-primary-950 outline-none transition focus:border-signal-400 focus:ring-4 focus:ring-signal-400/20"
              aria-describedby={error ? 'maintenance-error' : undefined}
            />
          </label>
          {error && <p id="maintenance-error" role="alert" className="text-sm font-semibold text-signal-300">{error}</p>}
          <button type="submit" disabled={busy || pin.length !== 6} className="w-full rounded-full bg-signal-400 px-5 py-3 text-sm font-bold text-primary-950 transition hover:bg-signal-300 disabled:opacity-50">
            {busy ? 'Checking...' : 'Enter website'}
          </button>
        </form>
      </section>
    </main>
  );
}
