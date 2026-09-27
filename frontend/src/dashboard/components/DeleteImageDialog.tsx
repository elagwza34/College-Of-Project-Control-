import { useEffect, useId, useRef } from 'react';

interface Props {
  busy: boolean;
  error?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteImageDialog({ busy, error, message, onCancel, onConfirm }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    return () => {
      dialog?.close();
      previous?.focus();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onCancel();
      }}
      className="modal-panel fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-background-200 bg-white p-6 text-foreground-900 shadow-2xl backdrop:bg-primary-950/60 backdrop:backdrop-blur-sm"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700">
        <i className="ri-delete-bin-line text-2xl" aria-hidden="true" />
      </div>
      <h2 id={titleId} className="text-xl font-bold">Delete image?</h2>
      <p id={descriptionId} className="mt-3 text-sm leading-relaxed text-foreground-600">{message}</p>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
      <div className="mt-6 flex justify-end gap-3" aria-busy={busy}>
        <button type="button" autoFocus disabled={busy} onClick={onCancel} className="button-quiet px-5 disabled:opacity-50">
          Cancel
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={onConfirm}
          className="min-h-11 rounded-lg bg-red-700 px-5 text-sm font-semibold text-white transition-all hover:bg-red-800 hover:shadow-sm focus-visible:outline focus-visible:outline-2 disabled:opacity-50"
        >
          {busy ? 'Deleting...' : 'Delete image'}
        </button>
      </div>
    </dialog>
  );
}
