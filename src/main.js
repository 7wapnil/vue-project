import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './global-components'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

