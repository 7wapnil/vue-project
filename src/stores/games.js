/**
 * Casino games store module
 */

export default {
  state: {
    selectedGame: '',
  },
  mutations: {
    storeGameSlug (state, name) {
      state.selectedGame = name
    }
  },
  getters: {
    getGameSlug (state) {
      return state.selectedGame
    }
  }
}
