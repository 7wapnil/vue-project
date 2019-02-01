import graphqlClient from '@/libs/apollo/'
import { WALLETS_LIST_QUERY, WALLET_UPDATED_SUBSCRIPTION } from '@/graphql/index'

export const STORE_WALLETS = 'STORE_WALLETS'
export const UPDATE_WALLET = 'UPDATE_WALLET'
export const SET_ACTIVE_WALLET = 'SET_ACTIVE_WALLET'
export const CLEAR_WALLETS = 'CLEAR_WALLETS'

/**
 * Wallets store module
 */
export default {
  namespaced: true,
  state: {
    wallets: [],
    activeWalletId: null
  },
  actions: {
    changeActiveWallet (context, walletId) {
      context.commit('setActiveWalletId', walletId)
      context.commit('resetBetslipStakes')
    },
    fetchWallets: async function ({ commit }) {

      // Load wallets
      const { data: { wallets } } = await graphqlClient.query({
        query: WALLETS_LIST_QUERY
      })

      commit(STORE_WALLETS, wallets)
      if (wallets.length) {
        commit(SET_ACTIVE_WALLET, wallets[0].id)
      }

      // Subscribe to updates
      const observer = graphqlClient.subscribe({
        query: WALLET_UPDATED_SUBSCRIPTION
      })

      observer.subscribe({
        next: ({ data }) => commit(UPDATE_WALLET, data.wallet_updated)
      })
    },
    refetchWallets () {

    }
  },
  mutations: {
    [STORE_WALLETS] (state, wallets) {
      console.log('STORE WALLETS')
      state.wallets = wallets
      if (!state.activeWalletId && wallets.length) {
        state.activeWalletId = wallets[0].id
      }
    },
    [UPDATE_WALLET] (state, wallet) {
      const index = state.wallets.findIndex(w => w.id === wallet.id)
      console.log(index)
      if (index > -1) {
        state.wallets.splice(index, 1, wallet)
      } else {
        state.wallets.push(wallet)
      }
    },
    [SET_ACTIVE_WALLET] (state, id) {
      state.activeWalletId = id
    },
    [CLEAR_WALLETS] (state) {
      state.activeWalletId = null
      state.wallets = []
    },
    clearWalletsStorage (state) {
      state.activeWalletId = null
      state.wallets = []
    }
  },
  getters: {
    activeWallet (state) {
      return state.wallets.find(el => el.id === state.activeWalletId)
    },
    wallets (state) {
      return state.wallets
    }
  }
}
