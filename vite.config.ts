import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'therapy-sufficient-reform-sat.trycloudflare.com',
      'https://mini-app-production-96b0.up.railway.app',
    ],
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['https://mini-app-production-96b0.up.railway.app'],
  },
});
