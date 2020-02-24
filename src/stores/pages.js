/**
 * Page store module to keep page settings
 */

export default {
  state: {
    lazyloadPageNumber: 1,
    lazyloadPosition: null,
    scrollStatus: false
  },
  mutations: {
    storeLazyLoadPageNumber (state, number) {
      state.lazyloadPageNumber = number
    },
    storeLazyLoadPosition (state, position) {
      state.lazyloadPosition = position
    },
    storeScrollStatus (state, status) {
      state.scrollStatus = status
    }
  },
  getters: {
    getLazyLoadPageNumber (state) {
      return state.lazyloadPageNumber
    },
    getLazyLoadPosition (state) {
      return state.lazyloadPosition
    },
    getScrollStatus (state) {
      return state.scrollStatus
    }
  }
}
