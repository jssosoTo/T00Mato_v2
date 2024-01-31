import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://bored-woolens-fly.cyclic.app',
        changeOrigin: true,
      },
      '/ai': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
