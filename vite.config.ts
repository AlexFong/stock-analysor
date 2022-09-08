import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 应用服务器、代理配置
  server: {
    port: 5173,
    open: true,
    proxy: {
      // 字符串简写写法
      '/10jqka': 'http://localhost:8080/',
      '/api': 'http://localhost:8080/'
    },
    cors: true,
    headers: [

    ],
    fs: {
      strict: false
    }
  },
  // 部署配置
  build: {
    outDir: 'stockanalysor',
    assetsDir : 'assets'
  },
  /*
    设为项目部署的名称，保证build后资源路径正确
    Default: /
    Base public path (应用基础请求路径) when served in development or production. Valid values include:
    
    Absolute URL pathname, e.g. /foo/
    Full URL, e.g. https://foo.com/
    Empty string or ./ (for embedded deployment)
  */
  base: process.env.NODE_ENV === 'prod' ? '/stockanalysor/' : '/',
  resolve: {
    // 配置路径别名
    // 配置pathPath Intellisense插件 使得项目中可以通过 @/... 引用到src目录 
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
