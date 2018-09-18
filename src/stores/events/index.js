import actions from './actions'

export default {
  namespaced: true,
  state: {
    events: []
  },
  mutations: {
    setEvents (state, events) {
      state.events = events
    }
  },
  actions
}
