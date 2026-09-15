import { useEffect, useState } from 'react';
import { cmsApi } from '../api/client';

interface Source { id: number; title: string; kind: 'website' | 'faq' | 'document'; reference_path: string; content: string; is_active: boolean; updated_at: string }
interface Status { configured: boolean; model: string; active_sources: number; daily_limit: number }
const blank = { title: '', kind: 'faq' as Source['kind'], reference_path: '', content: '', is_active: false };
const field = 'mt-1 w-full rounded-lg border border-background-300 bg-white px-3 py-2 text-sm';

export default function ChatbotPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [status, setStatus] = useState<Status | null>(null);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [filter, setFilter] = useState('');

  async function refresh() {
    const [items, health] = await Promise.all([cmsApi.get<Source[]>('/chatbot/sources/'), cmsApi.get<Status>('/chatbot/status/')]);
    setSources(items); setStatus(health);
  }
  useEffect(() => { refresh().catch(() => setError('Could not load the assistant settings. Please refresh the page.')); }, []);

  async function save() {
    setBusy(true); setError(''); setNotice('');
    try {
      if (editing) await cmsApi.patch(`/chatbot/sources/${editing}/`, form);
      else await cmsApi.post('/chatbot/sources/', form);
      setForm(blank); setEditing(null); await refresh(); setNotice('Source saved. Only active sources are used in answers.');
    } catch { setError('Could not save. Check the title, source text (20–80,000 characters) and public page path.'); }
    finally { setBusy(false); }
  }

  async function upload(file: File | undefined) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('Use a file smaller than 5 MB.'); return; }
    setBusy(true); setError(''); setNotice('');
    try {
      const data = new FormData(); data.append('file', file);
      const item = await cmsApi.post<Source>('/chatbot/sources/upload/', data);
      setEditing(item.id); setForm(item); await refresh();
      setNotice('Text extracted into a draft. Review it, then activate the source when it is ready for public answers.');
    } catch { setError('Could not extract this file. Use a readable PDF (up to 100 pages), DOCX, TXT or Markdown file. Scanned PDFs need OCR; extracted text must be 20–80,000 characters.'); }
    finally { setBusy(false); }
  }

  return <div className="mx-auto max-w-6xl space-y-6">
    <div><h1 className="text-3xl font-bold">Programme assistant</h1><p className="mt-2 text-foreground-600">Manage the website sources, questions and documents used to answer visitors in English.</p></div>
    {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    {notice && <p role="status" className="rounded-lg border border-primary-200 bg-primary-50 p-4 text-sm">{notice}</p>}
    <div className="grid gap-4 rounded-xl border border-background-200 bg-white p-5 md:grid-cols-3">
      <div><p className="text-xs text-foreground-500">Connection</p><strong>{status ? status.configured ? 'API configured' : 'API key required / assistant disabled' : 'Loading…'}</strong></div>
      <div><p className="text-xs text-foreground-500">Active sources</p><strong>{status?.active_sources ?? '—'}</strong></div>
      <div><p className="text-xs text-foreground-500">Model / daily request limit</p><strong>{status ? `${status.model} / ${status.daily_limit}` : '—'}</strong></div>
      <p className="text-sm text-foreground-600 md:col-span-3">Set <code>OPENAI_API_KEY</code>, or select <code>CHATBOT_PROVIDER=openrouter</code> and set <code>OPENROUTER_API_KEY</code>, in the backend environment, then restart Django. The key stays on the server. Uploaded files are extracted into draft text; only activate information approved for public use. Website snapshots are refreshed with the export/import commands in <code>docs/CHATBOT.md</code>.</p>
    </div>
    <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <section className="space-y-4 rounded-xl border border-background-200 bg-white p-5">
        <div className="flex items-center justify-between"><h2 className="text-xl font-bold">Knowledge sources</h2><button disabled={busy} type="button" className="text-sm font-bold underline" onClick={() => { setEditing(null); setForm(blank); setNotice(''); }}>Add Q&A</button></div>
        <label className="block text-sm">Find a source<input className={field} value={filter} onChange={e => setFilter(e.target.value)} /></label>
        <label className="block rounded-lg border border-dashed border-primary-300 p-4 text-sm">Upload a document<input type="file" accept=".pdf,.docx,.txt,.md" disabled={busy} className="mt-2 block w-full text-xs" onChange={e => { void upload(e.target.files?.[0]); e.target.value = ''; }} /><span className="mt-2 block text-xs text-foreground-500">PDF, DOCX, TXT, Markdown · up to 5 MB</span></label>
        <div className="max-h-[600px] space-y-2 overflow-y-auto">{sources.filter(item => item.title.toLowerCase().includes(filter.toLowerCase())).map(item => <button key={item.id} type="button" disabled={busy} onClick={() => { setEditing(item.id); setForm(item); setError(''); setNotice(''); }} className={`block w-full rounded-lg border p-3 text-left ${editing === item.id ? 'border-primary-500 bg-primary-50' : 'border-background-200'}`}><strong className="block text-sm">{item.title}</strong><span className="text-xs text-foreground-500">{item.kind} · {item.is_active ? 'Active' : 'Draft'} · {new Date(item.updated_at).toLocaleDateString('en-GB')}</span></button>)}{!sources.length && <p className="text-sm text-foreground-500">No sources yet. Import the website snapshot or add a Q&A.</p>}</div>
      </section>
      <form onSubmit={e => { e.preventDefault(); void save(); }} className="space-y-4 rounded-xl border border-background-200 bg-white p-5">
        <h2 className="text-xl font-bold">{editing ? 'Edit source' : 'New question & answer'}</h2>
        <label className="block text-sm">Title / question<input required maxLength={200} className={field} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></label>
        <label className="block text-sm">Source type<select className={field} value={form.kind} onChange={e => setForm({ ...form, kind: e.target.value as Source['kind'] })}><option value="faq">Question & answer</option><option value="document">Document</option><option value="website">Website</option></select></label>
        <label className="block text-sm">Public page path (optional)<input className={field} placeholder="/programmes" value={form.reference_path} onChange={e => setForm({ ...form, reference_path: e.target.value })} /></label>
        <label className="block text-sm">Approved information / answer<textarea required minLength={20} maxLength={80000} rows={15} className={field} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></label>
        <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} /><span>Active — allow the assistant to use this information in public answers.</span></label>
        <div className="flex gap-3"><button type="submit" disabled={busy} className="rounded-lg bg-primary-700 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{busy ? 'Saving…' : 'Save source'}</button>{editing && <button type="button" disabled={busy} className="rounded-lg border border-background-300 px-5 py-3 text-sm" onClick={() => { setEditing(null); setForm(blank); }}>Cancel</button>}</div>
        <p className="text-xs text-foreground-500">Deactivate an outdated source and save to stop using it immediately. Do not upload private learner or staff records.</p>
      </form>
    </div>
  </div>;
}
