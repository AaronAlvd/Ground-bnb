import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: false,
      failOnError: false
    })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
}));
