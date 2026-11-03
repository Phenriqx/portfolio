import { defineConfig } from 'vite';

export default defineConfig({
  root: 'source',
  base: '/portfolio/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
