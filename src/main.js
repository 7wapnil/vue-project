import './assets/arcanefont.font'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuejs-noty/dist/vuejs-noty.css'
import 'bootstrap'
import Vue from 'vue'
import App from './App'
import Router from '@/routes'
import Store from '@/stores/index'
import globalMixin from '@/mixins/global'
import '@/components/global-components'
import globalConfig from '@/config/index'

Vue.config.productionTip = false

Vue.mixin(globalMixin)

new Vue({
  router: Router,
  store: Store,
  apolloProvider: globalConfig.apolloProvider,
  i18n: globalConfig.i18n,
  render: h => h(App)
}).$mount('#app')
