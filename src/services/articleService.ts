import type { Fetcher } from '../lib/fetcher';
import type { Article, ArticleStatus, NewArticle } from '../types/article';

/**
 * Capa de servicios tipada y desacoplada de React y de HTTP.
 * Cada función recibe el `Fetcher` por parámetro sin importar de dónde salen
 * los datos.
 */
export const articleService = {
  list: (fetcher: Fetcher): Promise<Article[]> => fetcher<Article[]>('/articles'),

  create: (fetcher: Fetcher, input: NewArticle): Promise<Article> =>
    fetcher<Article>('/articles', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  setStatus: (fetcher: Fetcher, id: string, status: ArticleStatus): Promise<Article> =>
    fetcher<Article>(`/articles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  remove: (fetcher: Fetcher, id: string): Promise<void> =>
    fetcher<void>(`/articles/${id}`, {
      method: 'DELETE'
    }),
};
