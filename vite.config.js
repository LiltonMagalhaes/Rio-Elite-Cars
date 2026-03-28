import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // A Vercel sempre injeta VERCEL_URL ou CI=true. 
  // Se não detectar ambiente de CI, usa o caminho do GitHub.
  base: process.env.VERCEL || process.env.CI ? '/' : '/Rio-Elite-Cars/',
  plugins: [react()],
})