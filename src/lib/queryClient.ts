import { QueryClient } from '@tanstack/react-query';
import { ForbiddenError } from './errors';

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10_000,
        retry: (failureCount, error) =>
          !(error instanceof ForbiddenError) && failureCount < 2,
      },
    },
  });
}