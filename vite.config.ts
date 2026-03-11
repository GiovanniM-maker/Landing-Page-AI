import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contenuti: resolve(__dirname, 'contenuti.html'),
        assistente: resolve(__dirname, 'assistente.html'),
        lead: resolve(__dirname, 'lead.html'),
        documenti: resolve(__dirname, 'documenti.html'),
      },
    },
  },
})
