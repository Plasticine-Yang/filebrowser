import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  clean: true,
  shims: true,
  sourcemap: true,
  external: ['fastify', 'resolve'],
})
