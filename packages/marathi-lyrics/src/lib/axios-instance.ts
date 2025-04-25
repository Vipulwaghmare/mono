import { Configuration } from "@vipulwaghmare/apis";
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Initialize the Configuration
export const axiosConfig = new Configuration({
  basePath: process.env.NEXT_PUBLIC_BACKEND_URL,
});
