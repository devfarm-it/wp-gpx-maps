import { defineConfig } from 'vite';
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: 'assets/dist',
    // 'hidden': maps are generated but not referenced, since .distignore leaves them out of the package
    sourcemap: 'hidden',
    lib: {
      entry: resolve(__dirname, "assets/src/WP-GPX-Maps.ts"),
      name: "WPGPXMaps",
      fileName: (format) => `WP-GPX-Maps.${format}.js`,
      formats: ["es", "umd"],
    },
  }
});


