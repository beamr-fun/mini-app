import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['ref-label-beaches-level.trycloudflare.com'],
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['mini-app-production-96b0.up.railway.app'],
  },
});
