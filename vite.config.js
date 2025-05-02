import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/Thumb.js',
      name: 'Thumb',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'thumb.esm.min.js';
        if (format === 'umd') return 'thumb.min.js';
        return `thumb.${format}.js`;
      }
    },
    minify: 'esbuild',
    target: 'es2015',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Avoid code splitting for single output
        inlineDynamicImports: true,
      }
    }
  }
});
