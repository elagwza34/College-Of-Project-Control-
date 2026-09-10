import { useEffect, useId, useRef, type ReactNode } from 'react';

/** Native dialog supplies focus containment and makes the background inert. */
export default function Modal({ open, onClose, title, id, children }: {
  open: boolean; onClose: () => void; title: string; id?: string; children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [open]);
  return <dialog ref={dialog} id={id} aria-labelledby={titleId}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onKeyDown={(event) => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]'))
        .filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0);
      const first = controls[0]; const last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    }}
    className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-panel bg-white p-5 text-foreground-900 shadow-overlay backdrop:bg-black/60">
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 id={titleId} className="font-heading text-xl font-bold">{title}</h2>
      <button ref={closeButton} type="button" onClick={onClose} className="btn-secondary px-4 py-2">Close</button>
    </div>
    {children}
  </dialog>;
}
