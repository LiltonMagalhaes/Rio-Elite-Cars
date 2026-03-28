import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  // Se estiver na Vercel, a base deve ser '/'
  // Se for o build do GitHub Pages, a base deve ser '/Rio-Elite-Cars/'
  const isVercel = process.env.VERCEL === 'true'
  
  return {
    base: isVercel ? '/' : (command === 'build' ? '/Rio-Elite-Cars/' : '/'),
    plugins: [react()],
  }
})
