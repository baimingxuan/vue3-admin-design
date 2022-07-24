import { defineConfig } from 'vite'
import { createVitePlugins } from './build/vite/plugin'
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
  // The project uses lots of vite plugins, so they are extracted and managed separately
  plugins: createVitePlugins(false),
  build: {
    target: 'es2015',
    cssTarget: 'chrome86',
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_infinity: true,
        // Used to delete console in production environment
        drop_console: false,
      },
    },
    chunkSizeWarningLimit: 2000
  },
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      }
    ]
  }
})
