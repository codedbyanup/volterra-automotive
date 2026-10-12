import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// VITE_BASE is set by the GitHub Pages workflow to "/<repo-name>/".
// Locally (and for any other static host) a relative base keeps every asset URL valid.
export default defineConfig({
  base: process.env.VITE_BASE || './',
  plugins: [react(), tailwindcss()],
})
