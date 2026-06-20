import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

// Library config: `npm run build`.
// Compiles the component library into ./dist (ESM + UMD + .d.ts + CSS).
// This is the artifact a tool like claude.ai/design consumes.
export default defineConfig({
  // The demo's public/ assets belong to the showcase, not the shipped library.
  publicDir: false,
  plugins: [
    react(),
    dts({ include: ["src"], exclude: ["src/main.tsx", "src/Demo.tsx"], rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MaisonUI",
      fileName: "maison-ui",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
