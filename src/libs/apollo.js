import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { from, ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import Store from '@/stores'

const authLink = new ApolloLink((operation, forward) => {
  const headers = operation.getContext().headers || {}

  if (Store.getters['isLoggedIn']) {
    const token = Store.getters['getToken']
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }
  operation.setContext({ headers: headers })

  return forward(operation)
})

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_API_URL || ''
})

/**
 * @todo Add error handler to logout user when unauthorized error received
 */
const apolloClient = new ApolloClient({
  link: from([
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

export default new VueApollo({
  defaultClient: apolloClient
})
