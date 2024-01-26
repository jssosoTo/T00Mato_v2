import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    origin: 'https://bored-woolens-fly.cyclic.app',
    proxy: {
      '/api': {
        target: 'https://bored-woolens-fly.cyclic.app',
        changeOrigin: true,
      },
    },
  },
  base: 'https://bored-woolens-fly.cyclic.app',
  plugins: [react()],
});
