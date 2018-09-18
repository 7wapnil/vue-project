/**
 * Events store module
 */

import graphqlClient, {updateCache} from '@/libs/apollo'
import { LOAD_EVENT_BY_ID_QUERY, LOAD_EVENTS_QUERY, LOAD_EVENTS_WITH_MARKETS_QUERY } from './queries'

export default {
  loadList: async function ({ commit }, options = {}) {
    return graphqlClient.query({
      query: LOAD_EVENTS_QUERY,
      ...options
    }).then(({ data: { events } }) => {
      commit('setEvents', events)
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
  },
  addEvent ({ dispatch, commit }, { variables, id }) {
    const query = {
      query: LOAD_EVENTS_QUERY,
      variables
    }

    return dispatch('loadOne', {
      variables: { id },
      fetchPolicy: 'network-only'
    }).then(({ data: { event } }) => {
      if (event) {
        updateCache(query, (cache) => {
          cache.events.push({
            ...event,
            __typename: 'Event'
          })
          commit('setEvents', cache.events)
        })
      }
    })
  },
  updateEvent ({ commit }, { variables, id, changes }) {
    updateCache({
      query: LOAD_EVENTS_QUERY,
      variables
    }, (cache) => {
      const event = cache.events.find(event => event.id === id)
      if (event) {
        Object.assign(event, changes)
        commit('setEvents', cache.events)
      }
    })
  },
}
