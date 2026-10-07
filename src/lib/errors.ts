/**
 * Jerarquía de errores de la app.
 */

export abstract class AppError extends Error {
  abstract readonly kind: 'forbidden' | 'api' | 'network';
}

/** 403: usuario autenticado pero sin permisos para la acción. */
export class ForbiddenError extends AppError {
  readonly kind = 'forbidden' as const;
  constructor(message = 'No tenés permiso para realizar esta acción.') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

/** Error HTTP del servidor: 4xx/5xx. */
export class ApiError extends AppError {
  readonly kind = 'api' as const;
  constructor(
    readonly status: number,
    message = `El servidor respondió con un error (${status}).`,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** No se pudo contactar al servidor. */
export class NetworkError extends AppError {
  readonly kind = 'network' as const;
  constructor(
    message = 'No pudimos conectarnos con el servidor. Vuelve a intentarlo en unos segundos.',
    override readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

/** Normaliza cualquier `unknown` capturado a un AppError conocido. */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;
  return new NetworkError(undefined, error);
}
