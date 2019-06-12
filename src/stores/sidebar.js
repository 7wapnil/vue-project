/**
 * Sidebar store module
 */

export default {
  state: {
    sidebarState: false,
    sidebarKind: ''
  },
  mutations: {
    toggleSidebar (state) {
      state.sidebarState = !state.sidebarState
    },
    changeSidebarKind (state, kind) {
      state.sidebarKind = kind
    }
  },
  getters: {
    isSidebarOpen (state) {
      return state.sidebarState
    },
    getSidebarKind (state) {
      return state.sidebarKind
    }
  }
}
