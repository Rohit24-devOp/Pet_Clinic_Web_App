import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
});

// Response interceptor to format errors and extract data
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we have a structured error from backend, we throw that message
    if (error.response && error.response.data && error.response.data.error) {
      return Promise.reject(new Error(error.response.data.error));
    }
    return Promise.reject(error);
  }
);

export default api;
