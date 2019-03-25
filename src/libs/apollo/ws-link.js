import ActionCable from 'actioncable'
import { fetchToken } from './helpers'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'

export const wsClient = ActionCable.createConsumer(`${process.env.VUE_APP_WS_URL}?token=${fetchToken()}`)
export const wsLink = new ActionCableLink({ cable: wsClient })
