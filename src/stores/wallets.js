/**
 * Wallets store module
 */
export default {
  state: {
    wallets: [],
    activeWalletId: null
  },
  actions: {
    changeActiveWallet (context, walletId){
      context.commit('setActiveWalletId', walletId)
      context.commit('resetBetslipStakes')
    }
  },
  mutations: {
    storeWallets (state, { wallets, activeWallet }) {
      state.wallets = wallets
      state.activeWalletId = activeWallet.id
    },
    setActiveWalletId (state, id) {
      state.activeWalletId =id
    },
    clearWalletsStorage (state){
      state.activeWalletId = null
      state.wallets = []
    }
  },
  getters: {
    getActiveWallet (state) {
      return state.wallets.find(el => el.id == state.activeWalletId)
    },
    getWallets (state) {
      return state.wallets
    }
  }
}
