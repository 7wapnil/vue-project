import graphqlClient from '@/libs/apollo/'
import { NO_CACHE } from '@/constants/graphql/fetch-policy'
import { WALLETS_LIST_QUERY } from './queries/wallets'

/**
 * Wallets store module
 */
export default {
  state: {
    wallets: [],
    activeWalletId: null
  },
  actions: {
    changeActiveWallet (context, walletId) {
      context.commit('setActiveWalletId', walletId)
      context.commit('resetBetslipStakes')
    },
    fetchWallets: async function ({ commit }, activeWallet = undefined) {
      const response = await graphqlClient.query({
        query: WALLETS_LIST_QUERY,
        fetchPolicy: NO_CACHE
      })

      const wallets = response.data.wallets

      const activeWalletExists = activeWallet ? (wallets.find((wallet) => {
        return wallet.id === activeWallet.id
      })) : false
      const defaultActiveWallet = wallets[0]
      activeWallet = (activeWalletExists && activeWallet) ? activeWallet : defaultActiveWallet

      commit('storeWallets', { wallets: wallets, activeWallet: activeWallet })
    }
  },
  mutations: {
    storeWallets (state, { wallets, activeWallet }) {
      state.wallets = wallets
      state.activeWalletId = activeWallet.id
    },
    setActiveWalletId (state, id) {
      state.activeWalletId = id
    },
    clearWalletsStorage (state) {
      state.activeWalletId = null
      state.wallets = []
    }
  },
  getters: {
    getActiveWallet (state) {
      return state.wallets.find(el => el.id === state.activeWalletId)
    },
    getWallets (state) {
      return state.wallets
    }
  }
}
