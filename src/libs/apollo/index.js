import VueApollo from 'vue-apollo'
import Vue from 'vue'
import client from './client'

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: client,
  defaultOptions: {
    $query: {
      loadingKey: 'loading'
    }
  }
})

export default apolloProvider
