import { ApolloClient } from 'apollo-client'
import { from } from 'apollo-link'
import cache from './cache'
import authLink from './auth-link'
import webLink from './web-link'

/**
 * @todo Add error handler to logout user when unauthorized error received
 */
const client = new ApolloClient({
  link: from([
    authLink,
    webLink
  ]),
  cache,
  connectToDevTools: true
})

export default client
