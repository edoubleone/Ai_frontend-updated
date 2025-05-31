import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // vite.config.ts
  server: {
    proxy: {
      '/assistants': {
        target: 'https://web-production-51907.up.railway.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/assistants/, '/assistants'),
      },
    },
  },
});

