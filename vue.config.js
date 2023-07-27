const { defineConfig } = require('@vue/cli-service');

process.env.VUE_APP_API = process.env.NODE_ENV === 'development'
  ? 'http://5.228.130.64:8002' : 'https://nerif-vercel.vercel.app';

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/styles/_variables.scss";'
      }
    }
  }
})
