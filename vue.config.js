const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    qna: {
      entry: 'src/app/qna/main.js',
      template: 'public/qna.html',
      filename: 'qna.html'
    },
    admin: {
      entry: 'src/app/admin/main.js',
      template: 'public/admin.html',
      filename: 'admin.html'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src/'))
  }
})
