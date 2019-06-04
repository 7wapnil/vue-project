import Vue from 'vue'
import i18n from './plugins/I18n'
import GTMPlugin from './plugins/google-tag-manager'
import Sticky from 'vue-sticky-directive'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import apolloProvider from '@/libs/apollo/'
import VueNoty from 'vuejs-noty'
import VueLogger from 'vuejs-logger'
import LiveChatPlugin from './plugins/livechat'
import ContentfulPlugin from '@/libs/contentful/contentful-client'
import airbrakeClient from './plugins/airbrake-client'
import arcanebetSession from '@/services/local-storage/session'
const isProduction = process.env.NODE_ENV === 'production'

Vue.use(VueLogger, {
  logLevel: isProduction ? 'error' : 'debug'
})

Vue.use(vuescroll)
Vue.use(Sticky)
Vue.use(VueNoty, {
  timeout: 2000,
  layout: 'topRight'
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
