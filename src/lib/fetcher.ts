import { ApiError, ForbiddenError, NetworkError } from './errors';

export type Fetcher = <T>(path: string, init?: RequestInit) => Promise<T>;

export function createHttpFetcher(baseUrl: string): Fetcher {
  return async <T>(path: string, init?: RequestInit): Promise<T> => {
    let response: Response;

    try {
      response = await fetch(`${baseUrl}${path}`, {
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers
        },
        ...init,
      });

    } catch (cause) {
      throw new NetworkError(undefined, cause);
    }

    if (response.status === 403) throw new ForbiddenError();
    if (!response.ok) throw new ApiError(response.status);
    if (response.status === 204) return undefined as T;

    try {
      return (await response.json()) as T;

    } catch (cause) {
      throw new NetworkError('Respuesta del servidor no válida.', cause);
    }
  };
}
