var path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

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
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.font\.js/,
          use: [
            'style-loader',
            'css-loader',
            'webfonts-loader'
          ]
        }
      ]
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.configureWebpack.plugins = (module.exports.configureWebpack.plugins || []).concat([
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      outputDir: path.join(__dirname, 'prerendered'),
      routes: ['/',
        '/esports',
        '/sports',
        '/support/contact-us',
        '/support/betting-rules',
        '/support/privacy-policy',
        '/support/cookie-policy',
        '/support/faq',
        '/promotions',
        'responsible-gaming/introduction',
        'responsible-gaming/limits',
        '/support/terms-and-conditions'],
      renderer: new Renderer({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        renderAfterDocumentEvent: 'render-event'
      })
    })
  ])
}
