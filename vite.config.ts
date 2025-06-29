import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["**/*.test.*", "**/*.spec.*", "src/App.tsx", "src/main.tsx"],
      insertTypesEntry: true,
      outDir: "dist",
      entryRoot: "src",
      tsconfigPath: "./tsconfig.dts.json",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ChatWidgetLib",
      formats: ["es", "umd"],
      fileName: (format) => `chat-widget-lib.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
    copyPublicDir: false,
  },
  server: {
    port: 5174,
    open: true,
  },
});
