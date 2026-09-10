import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { cmsApi } from '../api/client';
import { reportCmsError } from '../api/reportError';

interface MediaItem { id: number; file: string; alt_text: string; }
export default function MediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const load = () => {
    setFailed(false);
    return cmsApi.get<MediaItem[]>('/media/').then(setItems).catch((error) => { setFailed(true); reportCmsError(error); });
  };
  useEffect(() => { void load(); }, []);
  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true); setMessage('');
    try {
      const body = new FormData(); body.append('file', file);
      await cmsApi.post('/media/', body); setMessage('Image uploaded. Add its alternative text below.'); await load();
    } catch (error) { reportCmsError(error); }
    finally { setUploading(false); if (input.current) input.current.value = ''; }
  };
  const remove = async (id: number) => {
    if (!window.confirm('Delete this image? Pages using its URL may display a missing image.')) return;
    try { await cmsApi.del(`/media/${id}/`); setMessage('Image deleted.'); await load(); }
    catch (error) { reportCmsError(error); }
  };
  const saveAlt = async (event: FormEvent<HTMLFormElement>, id: number) => {
    event.preventDefault();
    const alt_text = new FormData(event.currentTarget).get('alt_text');
    try { await cmsApi.patch(`/media/${id}/`, { alt_text }); setMessage('Alternative text saved.'); }
    catch (error) { reportCmsError(error); }
  };
  const copy = async (url: string) => {
    try { await navigator.clipboard.writeText(url); setMessage('Image URL copied.'); }
    catch { setMessage('Could not copy automatically. Select and copy the image URL.'); }
  };
  return <div>
    <h1 className="font-heading text-2xl font-bold">Media library</h1>
    <p className="mt-2 text-sm text-foreground-600">Upload images for CMS resources. Public image descriptions belong to each resource; library alternative text is not automatically copied into linked resources.</p>
    <button type="button" className="btn-primary mt-6 px-5 py-3" disabled={uploading} onClick={() => input.current?.click()}>{uploading ? 'Uploading…' : 'Upload image'}</button>
    <input ref={input} type="file" accept="image/*" className="hidden" onChange={upload} disabled={uploading} aria-label="Choose image" />
    <p role="status" className="mt-4 text-sm">{message}</p>
    {failed ? <button type="button" onClick={() => void load()} className="btn-secondary mt-4 px-4 py-2">Retry loading images</button> : items === null ? <p role="status">Loading images…</p> : !items.length ? <p>No images uploaded yet.</p> :
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map(item => <article key={item.id} className="rounded-card border border-background-200 bg-white p-4">
        <img src={item.file} alt={item.alt_text} loading="lazy" decoding="async" className="h-32 w-full object-contain" />
        <label htmlFor={`url-${item.id}`} className="mt-3 block text-sm font-semibold">Image URL</label>
        <input id={`url-${item.id}`} className="form-control mt-1" readOnly value={item.file} />
        <button type="button" className="my-3 text-sm underline" onClick={() => void copy(item.file)}>Copy URL</button>
        <form onSubmit={event => void saveAlt(event, item.id)}>
          <label htmlFor={`alt-${item.id}`} className="block text-sm font-semibold">Alternative text</label>
          <input id={`alt-${item.id}`} name="alt_text" defaultValue={item.alt_text} maxLength={255} className="form-control mt-1" aria-describedby={`alt-help-${item.id}`} />
          <p id={`alt-help-${item.id}`} className="mt-2 text-sm text-foreground-600">Describe meaningful content. Leave empty for a decorative image.</p>
          <button type="submit" className="btn-secondary mt-3 px-4 py-2">Save description</button>
        </form>
        <button type="button" onClick={() => void remove(item.id)} className="mt-4 text-sm text-status-error underline">Delete image</button>
      </article>)}</div>}
  </div>;
}
