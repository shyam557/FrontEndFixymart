import { useApiMutation } from '../../../../src/shared/hooks/useApiMutation';
import { useApiQuery } from '../../../../src/shared/hooks/useApiQuery';

// Service add mutation hook (shared)
export function useAddServiceMutation() {
  return useApiMutation({ url: '/services', method: 'POST' });
}

// Service fetch query hook (shared)
export function useGetServices() {
  return useApiQuery({ url: '/services' });
}
