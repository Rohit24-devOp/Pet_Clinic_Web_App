import axios from 'axios';
import { matchRoute } from './mockData';

// Use mock data in production (Vercel) or when backend is unavailable
const USE_MOCK = import.meta.env.PROD || !import.meta.env.VITE_USE_BACKEND;

const realApi = axios.create({
  baseURL: 'http://localhost:8081/api',
});

// Response interceptor to format errors and extract data
realApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we have a structured error from backend, we throw that message
    if (error.response && error.response.data && error.response.data.error) {
      return Promise.reject(new Error(error.response.data.error));
    }
    return Promise.reject(error);
  }
);

// Mock API proxy that intercepts calls and returns mock data
const mockApiProxy = {
  get: async (url) => {
    const match = matchRoute('GET', url);
    if (match) return match.handler(null, match.id);
    throw new Error(`Mock: No handler for GET ${url}`);
  },
  post: async (url, data) => {
    const match = matchRoute('POST', url);
    if (match) return match.handler(data, match.id);
    throw new Error(`Mock: No handler for POST ${url}`);
  },
  put: async (url, data) => {
    const match = matchRoute('PUT', url);
    if (match) return match.handler(data, match.id);
    throw new Error(`Mock: No handler for PUT ${url}`);
  },
  delete: async (url) => {
    const match = matchRoute('DELETE', url);
    if (match) return match.handler(null, match.id);
    throw new Error(`Mock: No handler for DELETE ${url}`);
  },
};

// Export the appropriate API based on environment
const api = USE_MOCK ? mockApiProxy : realApi;

export default api;
