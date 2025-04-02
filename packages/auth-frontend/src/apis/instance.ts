import { AuthApi, Configuration } from "@vipulwaghmare/apis";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear localStorage
      localStorage.clear();
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Initialize the Configuration
const config = new Configuration({
  basePath: import.meta.env.VITE_BASE_URL,
});

const api = new AuthApi(config, undefined, axiosInstance);

export default api;