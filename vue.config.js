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
  }
}
