import type { Fetcher } from './fetcher';
import { ApiError, ForbiddenError } from './errors';
import type { Article, ArticleStatus, NewArticle } from '../types/article';

/**
 * Fetcher en memoria.
 * Simula latencia y un 403 real: los artículos `locked` no se pueden eliminar.
 */
export function createMockFetcher(seed?: Article[]): Fetcher {
  const db = new Map<string, Article>(
    (seed ?? defaultSeed()).map((article) => [article.id, article]),
  );
  let counter = db.size;

  const delay = () => new Promise((r) => setTimeout(r, 250));

  return async <T>(path: string, init?: RequestInit): Promise<T> => {
    await delay();
    const method = (init?.method ?? 'GET').toUpperCase();
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;

    if (method === 'GET' && path === '/articles') return [...db.values()] as T;

    if (method === 'POST' && path === '/articles') {
      const input = body as NewArticle;
      const article: Article = {
        id: `a${++counter}`,
        title: input.title,
        status: input.status,
        locked: false,
      };
      db.set(article.id, article);
      return article as T;
    }

    const patchMatch = method === 'PATCH' && path.match(/^\/articles\/(.+)$/);
    if (patchMatch) {
      const article = db.get(patchMatch[1]!);
      if (!article) throw new ApiError(404);
      const updated: Article = { ...article, status: (body as { status: ArticleStatus }).status };
      db.set(updated.id, updated);
      return updated as T;
    }

    const deleteMatch = method === 'DELETE' && path.match(/^\/articles\/(.+)$/);
    if (deleteMatch) {
      const article = db.get(deleteMatch[1]!);
      if (!article) throw new ApiError(404);
      if (article.locked) throw new ForbiddenError('Este artículo es premium: sólo un admin puede eliminarlo.');
      db.delete(article.id);
      return undefined as T;
    }

    throw new ApiError(404, `Ruta mock no soportada: ${method} ${path}`);
  };
}

function defaultSeed(): Article[] {
  return [
    { id: 'a1', title: 'Introducción a arquitectura EDA para backends escalables', status: 'published', locked: false },
    { id: 'a2', title: 'Estrategias de caching de datos en APIs y frontends', status: 'review', locked: false },
    { id: 'a3', title: 'DDD en la práctica: bounded contexts y agregados', status: 'draft', locked: false },
    { id: 'a4', title: 'Cloud native: despliegue y observabilidad (guía premium)', status: 'draft', locked: true },
  ];
}
