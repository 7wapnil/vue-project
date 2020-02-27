/**
 * Page store module to keep page settings
 */

export default {
  namespaced: true,
  state: {
    lazyloadPosition: null,
    scrollStatus: false
  },
  mutations: {
    storeLazyLoadPosition (state, position) {
      state.lazyloadPosition = position
    },
    storeScrollStatus (state, status) {
      state.scrollStatus = status
    }
  },
  getters: {
    getLazyLoadPosition (state) {
      return state.lazyloadPosition
    },
    getScrollStatus (state) {
      return state.scrollStatus
    }
  }
}
