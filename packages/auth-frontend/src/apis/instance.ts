import { AuthApi, Configuration } from "@vipulwaghmare/apis";
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Initialize the Configuration
export const config = new Configuration({
  basePath: import.meta.env.VITE_BASE_URL,
});

const api = new AuthApi(config, undefined, axiosInstance);

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


export default api;