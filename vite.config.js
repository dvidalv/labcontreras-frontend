import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Asegúrate de que process.env.VITE_MAP_KEY esté definido en tu entorno
const mapKey = process.env.VITE_MAP_KEY;

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_MAP_KEY': JSON.stringify(mapKey),
  },
});

