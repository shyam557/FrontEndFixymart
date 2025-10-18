// Universal API wrapper for React Query (GET, POST, PATCH, DELETE)
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1',
  withCredentials: true,
});

export const apiWrapper = async ({ method = 'get', url, data = {}, params = {}, headers = {} }) => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    // Optionally handle error globally
    throw error.response?.data || error;
  }
};

// Usage in React Query:
// queryFn: () => apiWrapper({ method: 'get', url: '/services' })
// mutationFn: (data) => apiWrapper({ method: 'post', url: '/services', data })
