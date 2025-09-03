import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Esta linha é essencial e deve estar exatamente assim:
  base: '/trilha-programacao/',
})