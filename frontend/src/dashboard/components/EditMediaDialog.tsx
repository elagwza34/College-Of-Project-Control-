import { useEffect, useId, useRef, useState, type FormEvent } from 'react';

interface MediaItem { id: number; url: string; alt_text: string; }

interface Props {
  item: MediaItem;
  onClose: () => void;
  onSaveAlt: (altText: string) => Promise<void>;
  onDelete: () => void;
}

export default function EditMediaDialog({ item, onClose, onSaveAlt, onDelete }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    return () => { dialog?.close(); previous?.focus(); };
  }, []);

  const copy = async () => {
    try { await navigator.clipboard.writeText(item.url); setStatus('Image URL copied.'); }
    catch { setStatus('Could not copy automatically. Select and copy the image URL.'); }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const alt_text = String(new FormData(event.currentTarget).get('alt_text') ?? '');
    setSaving(true); setStatus('');
    try { await onSaveAlt(alt_text); setStatus('Alternative text saved.'); }
    catch { setStatus('Unable to save the alternative text. Please try again.'); }
    finally { setSaving(false); }
  };

  return <dialog ref={ref} aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); onClose(); }}
    className="modal-panel fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-background-200 bg-white p-6 text-foreground-900 shadow-2xl backdrop:bg-primary-950/60 backdrop:backdrop-blur-sm">
    <div className="flex items-start justify-between gap-4">
      <h2 id={titleId} className="text-xl font-bold">Edit image</h2>
      <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-2 text-foreground-600 transition-colors hover:bg-background-100 focus-visible:outline focus-visible:outline-2">
        <i className="ri-close-line text-xl" aria-hidden="true" />
      </button>
    </div>
    <img src={item.url} alt={item.alt_text} className="mt-4 max-h-64 w-full rounded-lg bg-background-50 object-contain" />
    <div className="mt-4 flex flex-wrap gap-3">
      <button type="button" onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')} className="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm">
        <i className="ri-download-line" aria-hidden="true" /> Download
      </button>
      <button type="button" onClick={() => void copy()} className="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm">
        <i className="ri-links-line" aria-hidden="true" /> Copy URL
      </button>
    </div>
    <form onSubmit={event => void submit(event)} className="mt-4">
      <label htmlFor="edit-alt" className="block text-sm font-semibold">Alternative text</label>
      <input id="edit-alt" name="alt_text" defaultValue={item.alt_text} maxLength={255} className="form-control mt-1" />
      <p className="mt-2 text-sm text-foreground-600">Describe meaningful content. Leave empty for a decorative image.</p>
      <button type="submit" disabled={saving} className="btn-secondary mt-3 px-4 py-2">{saving ? 'Saving description...' : 'Save description'}</button>
    </form>
    <p role="status" className="mt-3 text-sm">{status}</p>
    <button type="button" onClick={onDelete} className="mt-4 text-sm text-status-error underline transition-colors hover:text-red-800">Delete image</button>
  </dialog>;
}
