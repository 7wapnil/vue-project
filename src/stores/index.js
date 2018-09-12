import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import betslip from './betslip'
import wallets from './wallets'
import events from './events'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    betslip,
    wallets,
    events
  }
})
