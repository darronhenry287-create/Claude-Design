import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Demo-site config: `npm run dev` and `npm run build:demo`.
// Multi-page: the showcase storefront (index.html) and Brand Studio (studio.html).
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist-demo",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        studio: resolve(__dirname, "studio.html"),
      },
    },
  },
});
