import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/dev.ts'],
  outDir: 'dist-dev',
  format: ['esm'],
  watch: true,
  clean: true,
  shims: true,
  sourcemap: true,
  define: {
    __DEV__: 'true',
  },
})
