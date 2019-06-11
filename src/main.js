import './assets/arcanefont.font'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuejs-noty/dist/vuejs-noty.css'
import 'bootstrap'
import Vue from 'vue'
import App from './App'
import router from '@/routes'
import store from '@/stores/index'
import globalMixin from '@/mixins/global'
import '@/components/global-components'
import globalConfig from '@/config/index'
import BodyScrollLockDirective from 'v-body-scroll-lock'

Vue.config.productionTip = false

Vue.mixin(globalMixin)
Vue.use(BodyScrollLockDirective)

new Vue({
  router,
  store,
  apolloProvider: globalConfig.apolloProvider,
  i18n: globalConfig.i18n,
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  },
  render: h => h(App)
}).$mount('#app')
