/**
 * Scroll position for History API store module
 */

export default {
  state: {
    lazyLoadPage: null,
    isReturned: false
  },
  mutations: {
    storeLazyLoadPage (state, name) {
      state.lazyLoadPage = name
    },
    isReturned (state, status) {
      state.isReturned = status
    }
  },
  getters: {
    getLazyLoadPage (state) {
      return state.lazyLoadPage
    },
    getIsReturned (state) {
      return state.isReturned
    }
  }
}
