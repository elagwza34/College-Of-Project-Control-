import { useEffect, useState } from 'react';
import { cmsApi } from '../api/client';

type SourceKind = 'website' | 'faq' | 'document';
type Provider = 'openai' | 'openrouter';

interface Source {
  id: number;
  title: string;
  kind: SourceKind;
  reference_path: string;
  content: string;
  is_active: boolean;
  updated_at: string;
}

interface Status {
  configured: boolean;
  provider: Provider;
  model: string;
  api_key_source: 'dashboard' | 'environment' | 'none';
  active_sources: number;
  daily_limit: number;
}

interface AssistantSettings {
  provider: Provider;
  model: string;
  api_key_saved: boolean;
  api_key_source: 'dashboard' | 'environment' | 'none';
  configured: boolean;
  hourly_limit: number;
  daily_limit: number;
  updated_at: string | null;
}

const blank = { title: '', kind: 'faq' as SourceKind, reference_path: '', content: '', is_active: false };
const settingsBlank = { provider: 'openai' as Provider, model: 'gpt-4.1-mini' };
const field = 'mt-1 w-full rounded-lg border border-background-300 bg-white px-3 py-2 text-sm';
const input = 'mt-2 w-full rounded-lg border border-background-300 bg-white px-3 py-3 text-sm';

const keySourceLabel = (source: Status['api_key_source'] | AssistantSettings['api_key_source'] | undefined) => {
  if (source === 'dashboard') return 'Dashboard key';
  if (source === 'environment') return 'Environment key';
  return 'No API key';
};

export default function ChatbotPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [status, setStatus] = useState<Status | null>(null);
  const [settings, setSettings] = useState<AssistantSettings | null>(null);
  const [settingsForm, setSettingsForm] = useState(settingsBlank);
  const [apiKey, setApiKey] = useState('');
  const [clearApiKey, setClearApiKey] = useState(false);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [settingsBusy, setSettingsBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [filter, setFilter] = useState('');

  async function refresh(fillSettings = false) {
    const [items, health, config] = await Promise.all([
      cmsApi.get<Source[]>('/chatbot/sources/'),
      cmsApi.get<Status>('/chatbot/status/'),
      cmsApi.get<AssistantSettings>('/chatbot/settings/'),
    ]);
    setSources(items);
    setStatus(health);
    setSettings(config);
    if (fillSettings) setSettingsForm({ provider: config.provider, model: config.model });
  }

  useEffect(() => {
    refresh(true).catch(() => setError('Could not load the assistant settings. Please refresh the page.'));
  }, []);

  async function saveAssistantSettings() {
    setSettingsBusy(true);
    setError('');
    setNotice('');
    try {
      await cmsApi.patch('/chatbot/settings/', {
        ...settingsForm,
        api_key: apiKey,
        clear_api_key: clearApiKey,
      });
      setApiKey('');
      setClearApiKey(false);
      await refresh(true);
      setNotice('Assistant API settings saved. New public answers will use the active saved configuration.');
    } catch (event) {
      setError(event instanceof Error ? event.message : 'Could not save assistant API settings.');
    } finally {
      setSettingsBusy(false);
    }
  }

  async function save() {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      if (editing) await cmsApi.patch(`/chatbot/sources/${editing}/`, form);
      else await cmsApi.post('/chatbot/sources/', form);
      setForm(blank);
      setEditing(null);
      await refresh();
      setNotice('Source saved. Only active sources are used in answers.');
    } catch {
      setError('Could not save. Check the title, source text (20-80,000 characters) and public page path.');
    } finally {
      setBusy(false);
    }
  }

  async function upload(file: File | undefined) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Use a file smaller than 5 MB.');
      return;
    }
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const data = new FormData();
      data.append('file', file);
      const item = await cmsApi.post<Source>('/chatbot/sources/upload/', data);
      setEditing(item.id);
      setForm(item);
      await refresh();
      setNotice('Text extracted into a draft. Review it, then activate the source when it is ready for public answers.');
    } catch {
      setError('Could not extract this file. Use a readable PDF, DOCX, TXT or Markdown file up to 5 MB.');
    } finally {
      setBusy(false);
    }
  }

  const filteredSources = sources.filter((item) => item.title.toLowerCase().includes(filter.toLowerCase()));

  return <div className="w-full max-w-none space-y-6">
    <div>
      <h1 className="text-3xl font-bold">Programme assistant</h1>
      <p className="mt-2 text-foreground-600">Manage the website sources, questions, documents and agent API used to answer visitors in English.</p>
    </div>

    {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    {notice && <p role="status" className="rounded-lg border border-primary-200 bg-primary-50 p-4 text-sm">{notice}</p>}

    <div className="grid gap-4 rounded-xl border border-background-200 bg-white p-5 md:grid-cols-4">
      <div>
        <p className="text-xs text-foreground-500">Connection</p>
        <strong>{status ? status.configured ? 'Assistant enabled' : 'Assistant disabled' : 'Loading...'}</strong>
      </div>
      <div>
        <p className="text-xs text-foreground-500">API source</p>
        <strong>{keySourceLabel(status?.api_key_source)}</strong>
      </div>
      <div>
        <p className="text-xs text-foreground-500">Active sources</p>
        <strong>{status?.active_sources ?? '-'}</strong>
      </div>
      <div>
        <p className="text-xs text-foreground-500">Model / daily limit</p>
        <strong>{status ? `${status.model} / ${status.daily_limit}` : '-'}</strong>
      </div>
      <p className="text-sm text-foreground-600 md:col-span-4">
        Save the assistant API key below when you want to change provider without editing the backend environment. Keys are stored encrypted and are never returned to the dashboard. Uploaded files are extracted into draft text; only activate information approved for public use.
      </p>
    </div>

    <form onSubmit={(event) => { event.preventDefault(); void saveAssistantSettings(); }} className="rounded-xl border border-background-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Assistant API settings</h2>
          <p className="mt-2 text-sm text-foreground-600">Choose the provider, model and saved API key used by the public assistant.</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${settings?.configured ? 'bg-primary-50 text-primary-800' : 'bg-red-50 text-red-700'}`}>
          {settings?.configured ? 'Configured' : 'Not configured'}
        </span>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <label className="text-sm font-semibold">Provider
          <select className={input} value={settingsForm.provider} onChange={(event) => setSettingsForm({ ...settingsForm, provider: event.target.value as Provider })}>
            <option value="openai">OpenAI</option>
            <option value="openrouter">OpenRouter</option>
          </select>
        </label>
        <label className="text-sm font-semibold">Model
          <input required maxLength={120} className={input} value={settingsForm.model} onChange={(event) => setSettingsForm({ ...settingsForm, model: event.target.value })} placeholder="gpt-4.1-mini" />
        </label>
        <label className="text-sm font-semibold">API key
          <input type="password" autoComplete="new-password" className={input} value={apiKey} onChange={(event) => { setApiKey(event.target.value); if (event.target.value) setClearApiKey(false); }} placeholder={settings?.api_key_saved ? 'Saved key stays unless replaced' : 'Paste API key'} />
          <span className="mt-2 block text-xs font-normal text-foreground-500">{settings?.api_key_saved ? 'A dashboard key is saved encrypted.' : `Current source: ${keySourceLabel(settings?.api_key_source)}.`}</span>
        </label>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        {settings?.api_key_saved && <label className="flex items-center gap-2 text-sm text-red-700">
          <input type="checkbox" checked={clearApiKey} onChange={(event) => { setClearApiKey(event.target.checked); if (event.target.checked) setApiKey(''); }} />
          Remove saved dashboard key when saving
        </label>}
        <button type="submit" disabled={settingsBusy} className="rounded-lg bg-primary-700 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">
          {settingsBusy ? 'Saving...' : 'Save API settings'}
        </button>
      </div>
      <p className="mt-4 text-xs text-foreground-500">If there is no dashboard key, the assistant falls back to the backend environment key when one is configured.</p>
    </form>

    <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]">
      <section className="space-y-4 rounded-xl border border-background-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Knowledge sources</h2>
          <button disabled={busy} type="button" className="text-sm font-bold underline" onClick={() => { setEditing(null); setForm(blank); setNotice(''); }}>Add Q&A</button>
        </div>
        <label className="block text-sm">Find a source
          <input className={field} value={filter} onChange={(event) => setFilter(event.target.value)} />
        </label>
        <label className="block rounded-lg border border-dashed border-primary-300 p-4 text-sm">Upload a document
          <input type="file" accept=".pdf,.docx,.txt,.md" disabled={busy} className="mt-2 block w-full text-xs" onChange={(event) => { void upload(event.target.files?.[0]); event.target.value = ''; }} />
          <span className="mt-2 block text-xs text-foreground-500">PDF, DOCX, TXT, Markdown - up to 5 MB</span>
        </label>
        <div className="max-h-[600px] space-y-2 overflow-y-auto">
          {filteredSources.map((item) => <button key={item.id} type="button" disabled={busy} onClick={() => { setEditing(item.id); setForm(item); setError(''); setNotice(''); }} className={`block w-full rounded-lg border p-3 text-left ${editing === item.id ? 'border-primary-500 bg-primary-50' : 'border-background-200'}`}>
            <strong className="block text-sm">{item.title}</strong>
            <span className="text-xs text-foreground-500">{item.kind} - {item.is_active ? 'Active' : 'Draft'} - {new Date(item.updated_at).toLocaleDateString('en-GB')}</span>
          </button>)}
          {!sources.length && <p className="text-sm text-foreground-500">No sources yet. Import the website snapshot or add a Q&A.</p>}
          {sources.length > 0 && filteredSources.length === 0 && <p className="text-sm text-foreground-500">No sources match your search.</p>}
        </div>
      </section>

      <form onSubmit={(event) => { event.preventDefault(); void save(); }} className="space-y-4 rounded-xl border border-background-200 bg-white p-5">
        <h2 className="text-xl font-bold">{editing ? 'Edit source' : 'New question & answer'}</h2>
        <label className="block text-sm">Title / question
          <input required maxLength={200} className={field} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        </label>
        <label className="block text-sm">Source type
          <select className={field} value={form.kind} onChange={(event) => setForm({ ...form, kind: event.target.value as SourceKind })}>
            <option value="faq">Question & answer</option>
            <option value="document">Document</option>
            <option value="website">Website</option>
          </select>
        </label>
        <label className="block text-sm">Public page path (optional)
          <input className={field} placeholder="/programmes" value={form.reference_path} onChange={(event) => setForm({ ...form, reference_path: event.target.value })} />
        </label>
        <label className="block text-sm">Approved information / answer
          <textarea required minLength={20} maxLength={80000} rows={15} className={field} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} />
        </label>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={(event) => setForm({ ...form, is_active: event.target.checked })} />
          <span>Active - allow the assistant to use this information in public answers.</span>
        </label>
        <div className="flex gap-3">
          <button type="submit" disabled={busy} className="rounded-lg bg-primary-700 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{busy ? 'Saving...' : 'Save source'}</button>
          {editing && <button type="button" disabled={busy} className="rounded-lg border border-background-300 px-5 py-3 text-sm" onClick={() => { setEditing(null); setForm(blank); }}>Cancel</button>}
        </div>
        <p className="text-xs text-foreground-500">Deactivate an outdated source and save to stop using it immediately. Do not upload private learner or staff records.</p>
      </form>
    </div>
  </div>;
}
