import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path';

const backServer = `http://localhost:3000`;
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
   // 개발용 임시 서버
   server: {
    // Vue.js 실행 시 적용 PORT 변경
    port : 8099,
     // CORS(Cross Origin Resource Sharing) => proxy setting
    proxy: {
      '^/api': {
        target: backServer,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build : {
	//vite를 기반으로 배포를 할 때 추가적인 설정을 하는 것. 원래는 frontapp안에 빌드 결과물을 저장하는데 outDir를 해서 이 경로에 만드는?거 
	//자동으로 그 위치에 결과물 저장.
  // outDir :  '../backend/public'
  }
})
