import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes the build deployable to any static host (Surge, GitHub Pages subpath, etc.)
export default defineConfig({
  plugins: [react()],
  base: './',
})
