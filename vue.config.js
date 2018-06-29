module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('define')
      .tap((args) => {
        args[0]['process.env']['API_URL'] = `"${process.env.API_URL}"`
        return args
      })
  },

  pluginOptions: {
    s3Deploy: {
      assetPath: 'dist'
    }
  }
}
