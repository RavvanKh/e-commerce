import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Vercel'in otomatik tanıdığı klasör
    sourcemap: true, // Production'da hata ayıklama
  },
  base: "/", // Vercel'de root domain için
});
