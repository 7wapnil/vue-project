import Vue from 'vue'
import { APP_STATE_QUERY } from '@/graphql'
import { NO_CACHE } from '@/constants/graphql/fetch-policy'
import graphqlClient from '@/libs/apollo'

export const UPDATE_STATE = 'UPDATE'

/**
 * @TODO There is a problem in library itself
 * Socket event name mapping to action name is not working
 * @see https://github.com/MetinSeylan/Vue-Socket.io/issues/151
 * I fixed it that way temporary
 */
const fixSocketActionName = (eventName) => {
  const event = `SOCKET_${eventName}`

  return 'socket_' + event.toLowerCase()
    .replace('SOCKET_', '')
    .replace(/[\W\s_]+(\w)/g, (match, p1) => p1.toUpperCase())
}

const actions = {
  loadState ({ state, commit }) {
    graphqlClient.query({
      query: APP_STATE_QUERY,
      fetchPolicy: NO_CACHE
    }).then(({ data: { app } }) => {
      commit(UPDATE_STATE, app)
    })
  },
  [fixSocketActionName('appStateUpdated')] ({ commit }, message) {
    Vue.$log.debug('App state update socket event', message)
    commit(UPDATE_STATE, message[0])
  }
}

const mutations = {
  [UPDATE_STATE] (state, attributes = {}) {
    state.app = {
      ...state.app,
      ...attributes
    }
  }
}

const getters = {
  appState (state) {
    return state.app || {}
  }
}

export default {
  namespaced: true,
  state: {
    app: null
  },
  actions,
  mutations,
  getters
}
