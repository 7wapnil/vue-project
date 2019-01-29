import Vue from 'vue'
import Vuex from 'vuex'
import providers from './providers'
import user from './user'
import betslip from './betslip'
import wallets from './wallets'
import titleFilters from './title-filters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    providers,
    user,
    betslip,
    wallets,
    titleFilters
  }
})
