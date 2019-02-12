import fetch from 'unfetch'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { fetchToken } from './helpers'
import ActionCable from 'actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_API_URL || '',
  fetch: fetch
})

const wsClient = ActionCable.createConsumer(`${process.env.VUE_APP_WS_URL}?token=${fetchToken()}`)
const wsLink = new ActionCableLink({ cable: wsClient })

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
