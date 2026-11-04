import { defineConfig } from 'vite';
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

/* The MapLibre worker is copied next to the bundle; its version in the name keeps browsers from using an old cached worker */
const maplibreVersion = JSON.parse(readFileSync(resolve(__dirname, 'node_modules/maplibre-gl/package.json'), 'utf8')).version;
const maplibreWorker = `maplibre-gl-worker-${maplibreVersion}.js`;

export default defineConfig({
  define: {
    __MAPLIBRE_WORKER__: JSON.stringify('./' + maplibreWorker),
  },
  build: {
    outDir: 'assets/dist',
    // 'hidden': maps are generated but not referenced, since .distignore leaves them out of the package
    sourcemap: 'hidden',
    lib: {
      entry: resolve(__dirname, "assets/src/WP-GPX-Maps.ts"),
      name: "WPGPXMaps",
      fileName: (format) => `WP-GPX-Maps.${format}.js`,
      // ES module only: the Mapbox and MapLibre engines are separate files loaded when a map needs them
      formats: ["es"],
    },
    rollupOptions: {
      // .js and not .mjs: many web servers do not send .mjs files as JavaScript, and browsers refuse the module
      output: { chunkFileNames: '[name]-[hash].js' },
    },
  },
  plugins: [
    {
      name: 'copy-maplibre-worker',
      closeBundle() {
        // Without the sourceMappingURL line: the .map files are not in the package and browsers would ask for them (404)
        const worker = readFileSync(resolve(__dirname, 'node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs'), 'utf8');
        writeFileSync(resolve(__dirname, 'assets/dist', maplibreWorker), worker.replace(/\n\/\/# sourceMappingURL=.*\s*$/, '\n'));
      },
    },
  ],
});
