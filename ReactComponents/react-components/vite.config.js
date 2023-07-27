import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import * as packageJson from './package.json'
// https://vitejs.dev/config/

export default defineConfig(() => ({
  plugins: [
    react()
  ],
  define: {
    'process.env': {},
  },
  build: {
    lib: {
      entry: resolve('src', 'index.js'),
      name: 'ReactViteLibrary',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `react-vite-library.${format}.js`,
    },
    manifest: true,
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  }
}))
