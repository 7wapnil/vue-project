import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import user from './user'
import betslip from './betslip'
import wallets from './wallets'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    betslip,
    wallets
  }
})
