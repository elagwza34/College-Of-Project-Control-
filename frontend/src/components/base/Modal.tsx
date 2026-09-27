import { useEffect, useId, useRef, type ReactNode } from 'react';

/** Native dialog supplies focus containment and makes the background inert. */
export default function Modal({ open, onClose, title, id, children, header, footer, panelClassName = '', bodyClassName = '', closeButtonContent = 'Close', closeButtonClassName = 'btn-secondary px-4 py-2' }: {
  open: boolean; onClose: () => void; title: string; id?: string; children: ReactNode; header?: ReactNode; footer?: ReactNode; panelClassName?: string; bodyClassName?: string; closeButtonContent?: ReactNode; closeButtonClassName?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const requestClose = () => {
    if (dialog.current?.open) dialog.current.close();
    onClose();
  };
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!open) {
      if (element.open) element.close();
      return;
    }
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    if (!element.open) element.showModal();
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    return () => {
      if (element.open) element.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [open]);
  return <dialog ref={dialog} id={id} aria-labelledby={titleId}
    onClose={onClose}
    onCancel={(event) => { event.preventDefault(); requestClose(); }}
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
    className={`modal-panel m-auto flex max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg flex-col overflow-hidden rounded-lg bg-white p-0 text-foreground-900 shadow-overlay backdrop:bg-black/60 ${panelClassName}`}>
    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-background-200/70 p-5">
      {header ? (
        <>
          <h2 id={titleId} className="sr-only">{title}</h2>
          <div className="min-w-0 flex-1">{header}</div>
        </>
      ) : (
        <h2 id={titleId} className="font-heading text-xl font-bold">{title}</h2>
      )}
      <button ref={closeButton} type="button" onClick={requestClose} className={`${closeButtonClassName} transition-all`} aria-label="Close">
        {closeButtonContent}
      </button>
    </div>
    <div className={`min-h-0 flex-1 overflow-y-auto p-5 ${bodyClassName}`}>
      {children}
    </div>
    {footer && <div className="shrink-0 border-t border-background-200/70 bg-white p-4">{footer}</div>}
  </dialog>;
}
