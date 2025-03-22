import { defineConfig } from 'vite'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import ReactCompilerConfig from "babel-plugin-react-compiler";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        ["babel-plugin-react-compiler", ReactCompilerConfig],
      ],
    },
  }), tailwindcss()], resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
