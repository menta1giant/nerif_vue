import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
 plugins: [vue({
  template: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('v-'),
    }
  }
})],
 test:{
   globals:true,
   environment: "jsdom",
 },
 resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  },
},
})