import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_BASE_URL?.replace(/\/$/, '')

  const proxy = apiTarget
    ? {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
        // Backend sets Cross-Origin-Resource-Policy: same-origin on uploads,
        // so browsers block cross-origin <img> tags from localhost.
        '/uploads': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      }
    : undefined

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy,
    },
  }
})
