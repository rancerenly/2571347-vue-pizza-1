import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ['tests/unit/**/*.spec.js'],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/scss/app.scss';`,
      },
    },
  },
  server: {
    host: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://backend:3000/",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
