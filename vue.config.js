module.exports = {
  pluginOptions: {
    s3Deploy: {}
  },

  devServer: {
    disableHostCheck: true
  },

  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/main.scss";
        `
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule('custom-webfont')
      .test(/\.font\.js/)
      .use('webfonts-loader', 'sass-loader')
        .loader('webfonts-loader', 'sass-loader')
          .end()
  }

}
