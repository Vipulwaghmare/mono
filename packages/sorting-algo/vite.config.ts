import { defineConfig } from 'vite';
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import { VitePWA } from "vite-plugin-pwa";
import pwaManifest from './pwa-manifest';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler"],
        ],
      },
    }),
    tailwindcss(),
    VitePWA(pwaManifest)
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
