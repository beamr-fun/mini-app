import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDev = process.env.VITE_ENV === 'dev';

console.log('process.env.VITE_SOCKET_DEV', process.env.VITE_SOCKET_DEV);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['frozen-practices-infrastructure-at.trycloudflare.com'],
  },
});
