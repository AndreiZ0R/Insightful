import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': "http://192.168.35.228:8080"
    }
  },
  plugins: [react()],
})
