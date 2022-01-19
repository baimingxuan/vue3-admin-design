import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// need install plugin @types/node -> yarn add @types/node -D
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8888
  },
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      }
    ]
  }
})
