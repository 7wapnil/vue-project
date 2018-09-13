/**
 * Events store module
 */

import graphqlClient from '@/libs/apollo'
import { LOAD_EVENT_BY_ID_QUERY, LOAD_EVENTS_QUERY } from './queries'

export default {
  loadList: async function ({ commit }, variables = {}) {
    return graphqlClient.query({
      query: LOAD_EVENTS_QUERY,
      variables: variables
    })
  },
  loadOne: async function ({ commit }, variables) {
    return graphqlClient.query({
      query: LOAD_EVENT_BY_ID_QUERY,
      variables
    })
  }
}
