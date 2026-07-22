import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    dedupe: ['react', 'react-dom'],

    // Lets the demo import from the package name.
    // Change "sequencer-ui" to whatever your package.json name is.
    alias: {
      'odin-sequencer-ui': resolve(__dirname, 'lib/index.js'),
    },
  },

  build: {
    outDir: 'dist',
  },
})