module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  // this rule enforces image compression on build
  chainWebpack: config => {
    config.module
    .rule('compression')
    .test(/\.(jpg|png|gif|svg|jpeg)$/)
    .pre()
    .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: {
          progressive: true,
          quality: 50
        }
      })
      .end()
  },

  outputDir: 'dist/app'
}