import './assets/arcanefont.font'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuejs-noty/dist/vuejs-noty.css'
import 'bootstrap'
import Vue from 'vue'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import VueNoty from 'vuejs-noty'
import App from './App'
import Router from '@/routes'
import apolloClient from '@/libs/apollo/'
import Store from '@/stores/index'
import globalMixin from '@/mixins/global'
import '@/components/global-components'
import VueApollo from 'vue-apollo'
import VueLogger from 'vuejs-logger'
import ContentfulPlugin from '@/libs/contentful/contentful-client'
import AirbrakePlugin from '@/libs/airbrake/airbrake-client'
import Sticky from 'vue-sticky-directive'
import { LiveChatPlugin, GTMPlugin } from '@/plugins/'
import VueI18n from 'vue-i18n'
import { messages } from '@/translations/'

import arcanebetSession from '@/services/local-storage/session'

const isProduction = process.env.NODE_ENV === 'production'

Vue.config.productionTip = false

Vue.mixin(globalMixin)

Vue.use(VueNoty, {
  timeout: 2000,
  layout: 'topRight'
})

Vue.use(VueApollo)
Vue.use(VueLogger, {
  logLevel: isProduction ? 'error' : 'debug'
})

Vue.use(ContentfulPlugin, {
  space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN
})
Vue.use(Sticky)
Vue.use(VueI18n)
Vue.use(vuescroll)

Vue.use(LiveChatPlugin, {
  license: process.env.VUE_APP_LIVECHAT_LICENSE
})

Vue.use(GTMPlugin, {
  id: process.env.VUE_APP_GTM_ID
})

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE,
  messages
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $query: {
      loadingKey: 'loading'
    }
  }
})

if (isProduction) {
  Vue.use(AirbrakePlugin, {
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

new Vue({
  router: Router,
  store: Store,
  apolloProvider,
  i18n,
  render: h => h(App),
}).$mount('#app')
