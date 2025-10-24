import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['actors-right-lynn-duration.trycloudflare.com'],
  },
});

// 0xFDa7981E3d5a0f338a8AD40dA2f7E563BFa420e8
