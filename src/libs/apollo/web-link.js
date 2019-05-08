import fetch from 'unfetch'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { wsLink } from './ws-link'

const httpLink = new HttpLink({
  // uri: process.env.VUE_APP_API_URL || '',
  uri: 'https://backend.arcanedemo.com/graphql',
  fetch: fetch
})

/**
 * split checks every query made by Apollo and
 * defines what link to use depends on operation
 */
export default split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)

    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  wsLink,
  httpLink
)
