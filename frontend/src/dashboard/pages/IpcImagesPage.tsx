import { useEffect, useRef, useState, type FormEvent } from 'react';
import { cmsApi } from '../api/client';
import type { IpcImage } from '@/services/ipcImagesApi';

function readFields(form: HTMLFormElement) {
  const data = new FormData(form);
  const image_url = String(data.get('image_url') || '').trim();
  const url = new URL(image_url);
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Use a direct HTTP or HTTPS image link.');
  return { image_url, alt_text: String(data.get('alt_text') || '').trim(), order: Number(data.get('order') || 0), is_active: data.get('is_active') === 'on' };
}

function ImageFields({ item }: { item?: IpcImage }) {
  const prefix = item ? `ipc-${item.id}` : 'ipc-new';
  return <div className="grid gap-4 sm:grid-cols-2">
    <div className="sm:col-span-2"><label htmlFor={`${prefix}-url`} className="mb-2 block text-sm font-semibold">Direct image link (required)</label>
      <input id={`${prefix}-url`} type="url" name="image_url" defaultValue={item?.image_url} required maxLength={2000} placeholder="https://example.com/photo.jpg" className="form-control" /></div>
    <div><label htmlFor={`${prefix}-alt`} className="mb-2 block text-sm font-semibold">Image description</label>
      <input id={`${prefix}-alt`} name="alt_text" defaultValue={item?.alt_text} maxLength={255} className="form-control" /></div>
    <div><label htmlFor={`${prefix}-order`} className="mb-2 block text-sm font-semibold">Display order</label>
      <input id={`${prefix}-order`} name="order" type="number" min={0} max={32767} step={1} defaultValue={item?.order ?? 0} className="form-control" /></div>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" defaultChecked={item?.is_active ?? true} /> Show on website</label>
  </div>;
}

function ImageEditor({ item, onChanged }: { item: IpcImage; onChanged: () => void }) {
  const [busy, setBusy] = useState(false);
  const inFlight = useRef(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [broken, setBroken] = useState(false);
  useEffect(() => { setBroken(false); }, [item.image_url]);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (inFlight.current) return;
    const form = event.currentTarget;
    let payload: ReturnType<typeof readFields>;
    try { payload = readFields(form); }
    catch { setError('Use a valid direct HTTP or HTTPS image link.'); return; }
    inFlight.current = true; setBusy(true); setError(''); setMessage('');
    try { await cmsApi.patch(`/ipc-images/${item.id}/`, payload); setMessage('Saved. The updated image will appear on the website when the page reloads.'); onChanged(); }
    catch { setError('The server could not save this image. Your entries are still here. Please retry once the service is available.'); }
    finally { inFlight.current = false; setBusy(false); }
  }
  async function remove() {
    if (inFlight.current || !window.confirm('Remove this image from the IPC section?')) return;
    inFlight.current = true; setBusy(true); setError(''); setMessage('');
    try { await cmsApi.del(`/ipc-images/${item.id}/`); onChanged(); }
    catch { setError('Could not remove this image. Please try again.'); }
    finally { inFlight.current = false; setBusy(false); }
  }
  return <article className="rounded-card border border-background-200 bg-white p-5">
    <div className="mb-4 flex items-center gap-4"><img src={item.image_url} alt={item.alt_text} onError={() => setBroken(true)} loading="lazy" className="h-28 w-24 rounded-card object-cover" />
      <div><h2 className="text-lg">IPC image {item.id}</h2><p className="text-sm text-foreground-600">{item.is_active ? 'Visible on website' : 'Hidden from website'}</p>{broken && <p className="mt-2 text-sm text-status-error">Image preview unavailable. Check that the link opens an image directly.</p>}</div></div>
    <form onSubmit={save} aria-busy={busy}><fieldset disabled={busy}><ImageFields item={item} />
      <div className="mt-4 flex flex-wrap gap-4"><button type="submit" className="btn-primary">{busy ? 'Please wait…' : 'Save image'}</button><button type="button" onClick={remove} className="text-sm text-status-error underline">Remove image</button></div></fieldset></form>
    {error && <p role="alert" className="mt-3 text-sm text-status-error">{error}</p>}<p role="status" className="mt-3 text-sm">{message}</p>
  </article>;
}

export default function IpcImagesPage() {
  const [images, setImages] = useState<IpcImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [message, setMessage] = useState('');
  const [adding, setAdding] = useState(false);
  const inFlight = useRef(false);
  const [revision, setRevision] = useState(0);
  const reload = () => setRevision(value => value + 1);
  useEffect(() => {
    let active = true; setLoading(true); setError('');
    cmsApi.get<IpcImage[]>('/ipc-images/').then(data => { if (!Array.isArray(data)) throw new Error(); if (active) setImages(data); })
      .catch(() => { if (active) setError('Could not load IPC images.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [revision]);
  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (inFlight.current) return;
    const form = event.currentTarget;
    let payload: ReturnType<typeof readFields>;
    try { payload = readFields(form); }
    catch { setFormError('Use a valid direct HTTP or HTTPS image link.'); return; }
    inFlight.current = true; setAdding(true); setFormError(''); setMessage('');
    try { await cmsApi.post('/ipc-images/', payload); form.reset(); setMessage('Image added to IPC.'); reload(); }
    catch { setFormError('The server could not add this image. Your entries are still here. Please retry once the service is available.'); }
    finally { inFlight.current = false; setAdding(false); }
  }
  return <div><h1 className="text-3xl">IPC images</h1><p className="mt-3 max-w-3xl text-foreground-600">Manage the moving photo strip below the IPC logo. Paste direct image links, change their order, hide them or remove them. Lower order numbers appear first. Changes apply everywhere this section is shown.</p>
    <form onSubmit={add} aria-label="Add IPC image" aria-busy={adding} className="my-6 rounded-card border border-background-200 bg-white p-5"><h2 className="mb-4 text-xl">Add image by link</h2><fieldset disabled={adding}><ImageFields /><button type="submit" className="btn-primary mt-4">{adding ? 'Adding…' : 'Add image'}</button></fieldset>{formError && <p role="alert" className="mt-3 text-sm text-status-error">{formError}</p>}</form>
    <p role="status" className="mb-4 text-sm">{message}</p>
    {error ? <div role="alert"><p>{error}</p><button type="button" onClick={reload} className="btn-secondary mt-3">Try again</button></div> : loading && !images.length ? <p role="status">Loading IPC images…</p> : !images.length ? <p>No images yet. Add a link above to start the photo strip.</p> : null}
    <div className="grid gap-5 xl:grid-cols-2">{images.map(item => <ImageEditor key={item.id} item={item} onChanged={reload} />)}</div>
  </div>;
}
