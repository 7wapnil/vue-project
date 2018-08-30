import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuejs-noty/dist/vuejs-noty.css'
import 'bootstrap'
import '@/assets/main.scss'
import Vue from 'vue'
import VueNoty from 'vuejs-noty'
import App from './App'
import Router from '@/routes'
import apolloClient from '@/libs/apollo'
import Store from '@/stores/index'
import globalMixin from '@/mixins/global'
import '@/components/global-components'
import WebSocket from 'vue-socket.io'
import VueApollo from "vue-apollo";

Vue.config.productionTip = false

Vue.mixin(globalMixin)

Vue.use(VueNoty, {
  timeout: 2000,
  layout: 'topRight'
})

Vue.use(WebSocket, process.env.VUE_APP_WEB_SOCKET_URL)

Vue.use(VueApollo)

const ApolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  router: Router,
  store: Store,
  provide: ApolloProvider.provide(),
  render: h => h(App),
}).$mount('#app')
