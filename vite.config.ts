import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Demo-site config: `npm run dev` and `npm run build:demo`.
// Builds the showcase storefront in index.html into ./dist-demo.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist-demo",
  },
});
