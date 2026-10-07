import { createContext, use, type ReactNode } from 'react';
import type { Fetcher } from '../lib/fetcher';

/**
 * Se inyecta el `Fetcher` en el árbol de componentes. Los hooks de datos lo consumen
 * sin saber si es el fetcher HTTP real o el mock.
 */
const FetcherContext = createContext<Fetcher | null>(null);

export function FetcherProvider({ fetcher, children }: { fetcher: Fetcher; children: ReactNode }) {
  return <FetcherContext value={fetcher}>{children}</FetcherContext>;
}

export function useFetcher(): Fetcher {
  const fetcher = use(FetcherContext);

  if (!fetcher) throw new Error('useFetcher debe usarse dentro de <FetcherProvider>.');
  return fetcher;
}
