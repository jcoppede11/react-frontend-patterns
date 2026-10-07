/**
 * Lógica de negocio (dominio): artículos para emprendedores.
 */
export const ARTICLE_STATUSES = ['draft', 'review', 'published'] as const;

export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];

export interface Article {
  id: string;
  title: string;
  status: ArticleStatus;
  locked: boolean;  // artículo premium: sólo un admin puede eliminarlo (→ 403).
}

export interface NewArticle {
  title: string;
  status: ArticleStatus;
}

export const STATUS_LABELS: Record<ArticleStatus, string> = {
  draft: 'Borrador',
  review: 'En revisión',
  published: 'Publicado',
};
