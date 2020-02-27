import Vue from 'vue'
import Vuex from 'vuex'
import providers from './providers'
import user from './user'
import betslip from './betslip'
import account from './account'
import tabs from './tabs'
import sidebar from './sidebar'
import games from './games'
import pages from './pages'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null
  },
  getters: {
    auth (state) { return state.auth }
  },
  mutations: {
    updateAuth (state, auth) {
      state.auth = auth
    }
  },
  modules: {
    providers,
    user,
    betslip,
    account,
    tabs,
    sidebar,
    games,
    pages
  }
})
