import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@toast-ui/editor', '@toast-ui/editor/dist/toastui-editor.css']
    }
  },
  plugins: [
    vue(),

    AutoImport({
      // global imports to register
      imports: ['vue', 'vue-router', '@vueuse/core', { '@unhead/vue': ['useHead'] }],
      dirs: ['@src/composables']
    }),
    Components({
      dirs: ['src/components', 'src/layouts']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      find: '@toast-ui/editor',
      replacement: '/node_modules/@toast-ui/editor/dist'
    }
  },
  optimizeDeps: {
    include: ['@toast-ui/editor']
  },
  server: {
    host: '0.0.0.0',
    port: 8085,
    proxy: {
      '/api': {
        target: 'http://211.218.223.120:30002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/design/index.scss" as *;'
      }
    }
  }
})
