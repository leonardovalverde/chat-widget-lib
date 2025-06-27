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
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      output: {
        globals: {},
        inlineDynamicImports: true,
        // CRÍTICO: Extrair CSS para arquivo separado
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "widget.css";
          }
          return assetInfo.name || "";
        },
      },
    },
    cssCodeSplit: false,
    minify: true,
    target: "es2015",
    outDir: "dist",
    emptyOutDir: false,
    copyPublicDir: false,
  },
  css: {
    transformer: "postcss",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "import.meta.env.VITE_OPENAI_API_KEY": JSON.stringify(
      process.env.VITE_OPENAI_API_KEY || ""
    ),
  },
});
