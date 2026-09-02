import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'odin-sequencer-ui': resolve(__dirname, 'lib/index.js'),
    },
  },
  server: {
    port: 5173,
  },
})