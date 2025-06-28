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
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
    minify: false,
    target: "es2015",
    outDir: "dist",
    emptyOutDir: false,
    copyPublicDir: false,
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "import.meta.env.VITE_OPENAI_API_KEY": JSON.stringify(
      process.env.VITE_OPENAI_API_KEY || ""
    ),
  },
});
