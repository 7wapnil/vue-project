export const UPDATE_STATE = 'UPDATE'

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
  mutations,
  getters
}
