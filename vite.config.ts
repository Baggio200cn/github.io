import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Important: GitHub Pages project site needs the repo name as base path
  base: '/github.io/',
})
