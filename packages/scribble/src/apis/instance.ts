import { ScribbleApi, Configuration } from "@vipulwaghmare/apis";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // override if not already in swagger.json
  headers: {
    'Content-Type': 'application/json',
  },

});

// Initialize the Configuration
const config = new Configuration({
  basePath: import.meta.env.VITE_BASE_URL, // optional if already defined in swagger.json
});

const api = new ScribbleApi(config, '/scribble/', axiosInstance); // Create an API instance

export default api;