const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  pwa: {
    name: 'BUCM Lectures'
  },

  outputDir: './dist',
  assetsDir: '',
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css$/,
          threshold: 10240,
          deleteOriginalAssets: false,
        })]
      }
    }
  }
}