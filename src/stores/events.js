/**
 * Events store module
 */

import graphqlClient from '@/libs/apollo'
import { LOAD_EVENT_BY_ID_QUERY, LOAD_EVENTS_QUERY } from './queries/events'

export const actions = {
  loadEvents: async function ({ commit }, variables) {
    const response = await graphqlClient.query({
      query: LOAD_EVENTS_QUERY,
      variables: variables
    })

    const events = response.data.events
    commit('storeEvents', events)
  },
  loadEventById: async function ({ commit }, eventId) {
    const response = await graphqlClient.query({
      query: LOAD_EVENT_BY_ID_QUERY,
      variables: { id: eventId }
    })
    const event = response.data.event
    commit('storeEventById', event)
  }
}

export const mutations = {
  storeEvents: (state, events) => {
    state.events = events
  },
  storeEventById: (state, event) => {
    throw new Error('NotImplementedError')
  }
}

export const getters = {
  getEvents: (state) => {
    return state.events
  },
}

export default {
  state: {
    events: []
  },
  actions,
  mutations,
  getters
}
