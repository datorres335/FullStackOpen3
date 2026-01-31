import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true, // With globals: true, there is no need to import keywords such as describe, test and expect into the tests. DOES NOT REMOVE IDE ERROR FLAGS!!! Need to edit the globals value in eslint.config.js to -> { ...globals.browser, ...globals.vitest }
    setupFiles: './testSetup.js'
  }
})
