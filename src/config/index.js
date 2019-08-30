import Vue from 'vue'
import i18n from './plugins/I18n'
import GTMPlugin from './plugins/google-tag-manager'
import apolloProvider from '@/libs/apollo/'
import VueNoty from 'vuejs-noty'
import VueLogger from 'vuejs-logger'
import LiveChatPlugin from './plugins/livechat'
import SourceBusterPlugin from './plugins/sb'
import ContentfulPlugin from '@/libs/contentful/contentful-client'
import airbrakeClient from './plugins/airbrake-client'
import arcanebetSession from '@/services/local-storage/session'
import VueMeta from 'vue-meta'
import VueMq from 'vue-mq'
import VueClipboard from './plugins/vue-clipboard'
import visibility from 'vue-visibility-change'

const isProduction = process.env.NODE_ENV === 'production'

Vue.use(VueMeta)

Vue.use(VueLogger, {
  logLevel: isProduction ? 'error' : 'debug'
})

Vue.use(VueNoty, {
  timeout: 2000,
  layout: 'topRight'
})
Vue.use(VueMq, {
  breakpoints: {
    mobile: 720,
    tablet: 1250,
    desktop: Infinity
  }
})

Vue.use(LiveChatPlugin, {
  license: process.env.VUE_APP_LIVECHAT_LICENSE
})

Vue.use(ContentfulPlugin, {
  space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN
})

Vue.use(GTMPlugin, {
  id: process.env.VUE_APP_GTM_ID
})

Vue.use(SourceBusterPlugin)

Vue.use(VueClipboard)

Vue.use(visibility)

if (isProduction) {
  Vue.use(airbrakeClient, {
    projectId: 1,
    host: process.env.VUE_APP_AIRBRAKE_HOST,
    projectKey: process.env.VUE_APP_AIRBRAKE_KEY,
    environment: process.env.NODE_ENV
  })

  Vue.config.errorHandler = function (err, vm, info) {
    Vue.$airbrake.notify({
      error: err,
      params: { info: info },
      session: arcanebetSession.getSession() || null
    })
  }
}

export default {
  i18n,
  apolloProvider
}
