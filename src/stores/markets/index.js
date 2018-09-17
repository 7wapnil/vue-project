import actions from './actions'

export default {
  namespaced: true,
  state: {
    markets: []
  },
  actions,
  mutations: {
    setMarkets (state, markets) {
      state.markets = markets
    }
  },
  getters: {
    markets (state) {
      return state.markets
    }
  }
}
