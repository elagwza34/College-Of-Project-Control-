import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { cmsApi } from '../api/client';
import { reportCmsError } from '../api/reportError';
import DeleteImageDialog from '../components/DeleteImageDialog';
import EditMediaDialog from '../components/EditMediaDialog';
import { DashboardAlert, DashboardEmptyState, DashboardPageHeader, DashboardSkeletonList, StatusBadge } from '../components/DashboardPrimitives';

interface MediaItem {
  id: number;
  url: string;
  source_url: string;
  alt_text: string;
}

export default function MediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const [linking, setLinking] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const deleteInFlight = useRef(false);
  const input = useRef<HTMLInputElement>(null);

  const load = () => {
    setFailed(false);
    return cmsApi.get<MediaItem[]>('/media/').then(setItems).catch((error) => {
      setFailed(true);
      reportCmsError(error);
    });
  };

  useEffect(() => {
    void load();
  }, []);

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage('');
    try {
      const body = new FormData();
      body.append('file', file);
      await cmsApi.post('/media/', body);
      setMessage('Image uploaded.');
      await load();
    } catch (error) {
      reportCmsError(error);
    } finally {
      setUploading(false);
      if (input.current) input.current.value = '';
    }
  };

  const addLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!linkUrl.trim()) return;
    setLinking(true);
    setMessage('');
    try {
      await cmsApi.post('/media/', { source_url: linkUrl.trim() });
      setMessage('Image link added.');
      setLinkUrl('');
      await load();
    } catch (error) {
      reportCmsError(error);
    } finally {
      setLinking(false);
    }
  };

  const saveAlt = async (id: number, alt_text: string) => {
    await cmsApi.patch(`/media/${id}/`, { alt_text });
    await load();
  };

  const remove = async (id: number) => {
    if (deleteInFlight.current) return;
    deleteInFlight.current = true;
    setDeleting(true);
    setDeleteError('');
    try {
      await cmsApi.del(`/media/${id}/`);
      setDeleteId(null);
      setMessage('Image deleted.');
      await load();
    } catch {
      setDeleteError('Unable to delete this image. Please try again.');
    } finally {
      deleteInFlight.current = false;
      setDeleting(false);
    }
  };

  const editItem = items?.find((item) => item.id === editId) ?? null;

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Website content"
        title="Media library"
        description="Upload images or add a link to externally hosted media. Click an image to edit its alternative text or remove it."
        meta={items && <StatusBadge tone="info">{items.length} images</StatusBadge>}
      />

      <section className="rounded-xl border border-background-200 bg-white p-4 shadow-sm" aria-label="Media upload actions">
        <div className="flex flex-wrap items-start gap-6">
          <div>
            <button type="button" className="btn-primary px-5 py-3" disabled={uploading} onClick={() => input.current?.click()}>
              {uploading ? 'Uploading...' : 'Upload image'}
            </button>
            <input ref={input} type="file" accept="image/*" className="hidden" onChange={upload} disabled={uploading} aria-label="Choose image" />
          </div>
          <form onSubmit={(event) => void addLink(event)} className="flex flex-wrap items-end gap-2">
            <div>
              <label htmlFor="link-url" className="block text-sm font-semibold">Add image by URL</label>
              <input id="link-url" type="url" required placeholder="https://example.com/image.jpg" className="form-control mt-1 w-72 max-w-full" value={linkUrl} onChange={(event) => setLinkUrl(event.target.value)} />
            </div>
            <button type="submit" className="btn-secondary px-4 py-3" disabled={linking}>{linking ? 'Adding...' : 'Add link'}</button>
          </form>
        </div>
      </section>

      {message && <div className="mt-4"><DashboardAlert tone="success">{message}</DashboardAlert></div>}
      {failed ? (
        <div className="mt-5">
          <DashboardAlert tone="error" title="Images could not be loaded">
            <p>Check the connection and retry. Existing media has not been changed.</p>
            <button type="button" onClick={() => void load()} className="mt-3 font-semibold underline">Retry loading images</button>
          </DashboardAlert>
        </div>
      ) : items === null ? (
        <div className="mt-6"><DashboardSkeletonList rows={4} /></div>
      ) : !items.length ? (
        <div className="mt-6">
          <DashboardEmptyState icon="ri-image-add-line" title="No images added yet" description="Upload a local image or add an external image URL to start building the shared media library." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setEditId(item.id)}
              className="group relative aspect-square overflow-hidden rounded-card border border-background-200 bg-white focus-visible:outline focus-visible:outline-2"
            >
              <img src={item.url} alt={item.alt_text} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <span className="absolute inset-0 hidden items-center justify-center bg-primary-950/50 group-hover:flex group-focus-visible:flex">
                <i className="ri-pencil-line text-2xl text-white" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      )}

      {editItem && <EditMediaDialog item={editItem} onClose={() => setEditId(null)} onSaveAlt={(alt) => saveAlt(editItem.id, alt)} onDelete={() => { setEditId(null); setDeleteError(''); setDeleteId(editItem.id); }} />}
      {deleteId !== null && <DeleteImageDialog busy={deleting} error={deleteError} message="Delete this image? Pages using its URL may display a missing image. This action cannot be undone." onCancel={() => setDeleteId(null)} onConfirm={() => void remove(deleteId)} />}
    </div>
  );
}
