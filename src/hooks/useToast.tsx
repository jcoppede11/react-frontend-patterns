import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ToastVariant = 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastApi {
  toasts: readonly Toast[];
  /** Muestra un toast y lo autodescarta a los `duration` ms (default 4000). */
  show: (message: string, variant?: ToastVariant, duration?: number) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

/** Hook reutilizable para disparar notificaciones desde cualquier componente. */
export function useToast(): ToastApi {
  const api = use(ToastContext);
  if (!api) throw new Error('useToast debe usarse dentro de <ToastProvider>.');
  return api;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<readonly Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const show = useCallback<ToastApi['show']>(
    (message, variant = 'success', duration = 4000) => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, message, variant }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({ toasts, show, dismiss }),
    [toasts, show, dismiss],
  );

  return <ToastContext value={api}>{children}</ToastContext>;
}
