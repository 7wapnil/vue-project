import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from '@/routes'
import '@/components/global-components'
import apolloProvider from '@/libs/apollo'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  router,
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount('#app')

