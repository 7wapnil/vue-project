
/**
 * Tabs store module
 */

export default {
  namespaced: true,
  state: {
    currentTabIndex: 0,
    isMenu: true,
    tabTitle: ''
  },
  mutations: {
    changeTabIndex (state, data) {
      state.currentTabIndex = data
      state.isMenu = false
    },
    toggleMenu (state) {
      state.isMenu = true
    },
    addTabName (state, data) {
      state.tabTitle = data
    }
  },
  getters: {
    getCurrentTabIndex (state) {
      return state.currentTabIndex
    },
    getMenuStatus (state) {
      return state.isMenu
    },
    getTabTitle (state) {
      return state.tabTitle
    }
  }
}
