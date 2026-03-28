import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig(({ command }) => {
  return {
    // Se o comando for 'build' (usado no deploy do GitHub), usa a subpasta.
    // Se for 'serve' (npm run dev no seu PC ou Vercel), usa a raiz '/'.
    base: command === 'build' ? '/Rio-Elite-Cars/' : '/',
    plugins: [react()],
  }
})
