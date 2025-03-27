import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Asegúrate de que process.env.VITE_MAP_KEY esté definido en tu entorno
const mapKey = process.env.VITE_MAP_KEY;

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_MAP_KEY": JSON.stringify(mapKey),
  },
  // Configuración de servidor de desarrollo
  server: {
    port: 3000,
    open: true, // Abre el navegador automáticamente
    cors: true, // Habilita CORS
  },
  // Configuración de build para producción
  build: {
    outDir: "dist",
    minify: "esbuild", // Cambiado de 'terser' a 'esbuild'
    sourcemap: false, // Deshabilita sourcemaps en producción
    chunkSizeWarningLimit: 1000, // Aumenta el límite de advertencia de tamaño de chunk
    rollupOptions: {
      output: {
        // Mejor manejo de caché y assets
        manualChunks: undefined,
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  // Optimizaciones de rendimiento
  optimizeDeps: {
    include: ["react", "react-dom"], // Incluye dependencias principales
  },
  // Configuración de resolución de módulos
  resolve: {
    alias: {
      "@": "/src", // Permite usar @ como alias para la carpeta src
    },
  },
});
