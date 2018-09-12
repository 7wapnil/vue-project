/**
 * Events store module
 */

import graphqlClient from '@/libs/apollo'
import { LOAD_EVENT_BY_ID_QUERY, LOAD_EVENTS_QUERY } from './queries/events'

export const actions = {
  loadEvents: async function ({ commit }, variables) {
    return graphqlClient.query({
      query: LOAD_EVENTS_QUERY,
      variables: variables
    })
  },
  loadEventById: async function ({ commit }, eventId) {
    return graphqlClient.query({
      query: LOAD_EVENT_BY_ID_QUERY,
      variables: { id: eventId }
    })
  }
}

export default {
  actions
}
