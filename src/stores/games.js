/**
 * Casino games store module
 */

export default {
  state: {
    selectedGame: '',
  },
  mutations: {
    storeGameInformation (state, name) {
      state.selectedGame = name
    }
  },
  getters: {
    getGameInformation (state) {
      return state.selectedGame
    }
  }
}
