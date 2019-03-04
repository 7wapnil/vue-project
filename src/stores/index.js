import Vue from 'vue'
import Vuex from 'vuex'
import providers from './providers'
import user from './user'
import betslip from './betslip'
import wallets from './wallets'
import account from './account'
import tabs from './tabs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    providers,
    user,
    betslip,
    wallets,
    account,
    tabs
  }
})
