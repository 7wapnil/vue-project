import Vue from 'vue'
import i18n from './plugins/I18n'
import GTMPlugin from './plugins/google-tag-manager'
import Sticky from 'vue-sticky-directive'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import VueScrollConfig from './plugins/vue-scroll'
import apolloProvider from '@/libs/apollo/'
import VueNoty from 'vuejs-noty'
import VueLogger from 'vuejs-logger'
import LiveChatPlugin from './plugins/livechat'
import SourceBusterPlugin from './plugins/sb'
import ContentfulPlugin from '@/libs/contentful/contentful-client'
import airbrakeClient from './plugins/airbrake-client'
import arcanebetSession from '@/services/local-storage/session'
import VueMeta from 'vue-meta'
import BodyScrollLockDirective from 'v-body-scroll-lock'
import VueMq from 'vue-mq'

const isProduction = process.env.NODE_ENV === 'production'

Vue.use(VueMeta)

Vue.use(VueLogger, {
  logLevel: isProduction ? 'error' : 'debug'
})

Vue.use(vuescroll, VueScrollConfig)
Vue.use(Sticky)

Vue.use(VueNoty, {
  timeout: 2000,
  layout: 'topRight'
})
Vue.use(BodyScrollLockDirective)
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
