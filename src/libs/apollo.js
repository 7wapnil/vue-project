import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { from, ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

const authLink = new ApolloLink((operation, forward) => {
  const headers = operation.getContext().headers || {}

  if (Vue.$auth.authenticated) {
    headers['Authorization'] = `Bearer ${Vue.$auth.token}`
  }
  operation.setContext({ headers: headers })

  return forward(operation)
})

const httpLink = new HttpLink({
  uri: 'http://backend.test/graphql'
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
