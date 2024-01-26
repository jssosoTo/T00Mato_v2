import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    origin: 'https://t00-mato-v2-theta.vercel.app',
    proxy: {
      '/api': {
        target: 'https://bored-woolens-fly.cyclic.app/',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
