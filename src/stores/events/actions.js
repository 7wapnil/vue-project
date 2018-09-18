/**
 * Events store module
 */

import graphqlClient from '@/libs/apollo'
import { LOAD_EVENT_BY_ID_QUERY, LOAD_EVENTS_QUERY, LOAD_EVENTS_WITH_MARKETS_QUERY } from './queries'

export default {
  loadList: async function ({ commit }, options = {}) {
    return graphqlClient.query({
      query: LOAD_EVENTS_QUERY,
      ...options
    })
  },
  loadOne: async function ({ commit }, options = {}) {
    return graphqlClient.query({
      query: LOAD_EVENT_BY_ID_QUERY,
      ...options
    })
  },
  loadListWithMarkets ({ commit }, options = {}) {
    return graphqlClient.query({
      query: LOAD_EVENTS_WITH_MARKETS_QUERY,
      ...options
    })
  }
}
