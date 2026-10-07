import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={ref}
      className="modal"
      onClose={onClose}
      onCancel={onClose}
      aria-labelledby="modal-title"
    >
      <header className="modal__header">
        <h2 id="modal-title" className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          ×
        </button>
      </header>
      <div className="modal__body">{children}</div>
      {footer &&
        <footer className="modal__footer">{footer}</footer>
      }
    </dialog>
  );
}
