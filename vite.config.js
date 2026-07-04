import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // WalletConnect v2 / @reown/appkit needs these Node built-ins in the browser
      include: ['buffer', 'crypto', 'events', 'stream', 'util', 'process'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    open: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    commonjsOptions: {
      // Ensure CJS deps like 'events' are bundled correctly
      transformMixedEsModules: true,
    },
  }
})
