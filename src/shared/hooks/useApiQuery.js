import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '../api/apiWrapper';

/**
 * Generic API hook for GET/POST/PATCH/DELETE requests using React Query and apiWrapper
 * @param {Object} config
 * @param {string[]} config.queryKey - React Query key
 * @param {string} config.url - API endpoint
 * @param {string} [config.method='get'] - HTTP method
 * @param {object} [config.options] - Additional React Query options
 * @param {object} [config.apiOptions] - Additional apiWrapper options (params, data, headers)
 */
export function useApiQuery({ queryKey, url, method = 'get', options = {}, apiOptions = {} }) {
  return useQuery({
    queryKey,
    queryFn: () => apiWrapper({ method, url, ...apiOptions }),
    staleTime: 1000 * 60, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
}

// Example usage:
// const { data, isLoading } = useApiQuery({
//   queryKey: ['dummyService'],
//   url: 'https://jsonplaceholder.typicode.com/posts/1',
// });
