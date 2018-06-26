import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuejs-noty/dist/vuejs-noty.css'
import 'bootstrap'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueNoty from 'vuejs-noty'
import App from './App'
import Router from '@/routes'
import ApolloProvider from '@/libs/apollo'
import Store from '@/stores/index'
import '@/components/global-components'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueNoty, {
  timeout: 2000,
  layout: 'topRight'
})

new Vue({
  router: Router,
  store: Store,
  provide: ApolloProvider.provide(),
  render: h => h(App)
}).$mount('#app')

