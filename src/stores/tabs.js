
/**
 * Tabs store module
 */

export default {
  namespaced: true,
  state: {
    currentTabIndex: 0
  },
  mutations: {
    changeTabIndex (state, data) {
      state.currentTabIndex = data
    }
  },
  getters: {
    getCurrentTabIndex (state) {
      return state.currentTabIndex
    }
  }
}
