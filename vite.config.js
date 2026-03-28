import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Carrega as variáveis de ambiente (incluindo as da Vercel)
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    // Se a Vercel estiver rodando o build, usa a raiz '/'. 
    // Se for o build manual do GitHub, usa '/Rio-Elite-Cars/'.
    base: env.VERCEL === 'true' ? '/' : (command === 'build' ? '/Rio-Elite-Cars/' : '/'),
    plugins: [react()],
  }
})
