import { useToast } from '../../hooks/useToast';

export function ToastViewport() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-viewport" role="region" aria-label="Notificaciones">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.variant}`}
          role={toast.variant === 'error' ? 'alert' : 'status'}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            className="toast__close"
            aria-label="Descartar"
            onClick={() => dismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
