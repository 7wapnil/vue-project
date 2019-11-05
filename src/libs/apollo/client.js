import { ApolloClient } from 'apollo-client'
import { from } from 'apollo-link'
import authLink from './auth-link'
import webLink from './web-link'
import cache from './cache'
import { onError } from 'apollo-link-error'
import store from '@/stores/index'

/**
 * @todo Add error handler to logout user when unauthorized error received
 */

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors[0].message === 'AUTH_REQUIRED') {
    store.commit('storeAuthError', graphQLErrors[0].message)
    store.dispatch('logout')
    store.commit('updateAuth', 0)
  }
})

const client = new ApolloClient({
  link: from([
    errorLink,
    authLink,
    webLink
  ]),
  cache,
  connectToDevTools: true
})

export default client
