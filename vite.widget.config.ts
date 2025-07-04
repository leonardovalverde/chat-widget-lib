import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/global/widget.ts"),
      name: "ChatWidget",
      formats: ["umd"],
      fileName: () => "widget.umd.js",
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
    minify: true,
    target: "es2015",
    outDir: "dist",
    emptyOutDir: false,
    copyPublicDir: false,
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
