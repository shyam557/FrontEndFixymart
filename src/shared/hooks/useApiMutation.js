import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '../api/apiWrapper';

/**
 * Generic API mutation hook for POST/PATCH/DELETE requests using React Query and apiWrapper
 * @param {Object} config
 * @param {string} config.url - API endpoint
 * @param {string} [config.method='post'] - HTTP method
 * @param {string[]} [config.invalidateKeys] - Query keys to invalidate on success
 * @param {object} [config.options] - Additional React Query mutation options
 * @returns {object} - React Query mutation object
 */
export function useApiMutation({ url, method = 'post', invalidateKeys = [], options = {} }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => apiWrapper({ method, url, data }),
    onSuccess: (...args) => {
      invalidateKeys.forEach(key => queryClient.invalidateQueries([key]));
      if (options.onSuccess) options.onSuccess(...args);
    },
    ...options,
  });
}

// Example usage:
// const mutation = useApiMutation({
//   url: '/api/services',
//   method: 'post',
//   invalidateKeys: ['services'],
// });
// mutation.mutate({ name: 'Service', ... })
