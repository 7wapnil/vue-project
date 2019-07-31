import arcanebetSession from '@/services/local-storage/session'
import graphqlClient from '@/libs/apollo/client'
import { WALLET_UPDATED_SUBSCRIPTION } from '@/graphql/index'
import { FIAT } from '@/constants/currency-kinds'

export const STORE_WALLETS = 'STORE_WALLETS'
export const UPDATE_WALLET = 'UPDATE_WALLET'
export const SET_ACTIVE_WALLET = 'SET_ACTIVE_WALLET'
export const CLEAR_WALLETS = 'CLEAR_WALLETS'

/**
 * Wallets store module
 */

export const actions = {
  fetchWallets: function ({ commit }) {
    const wallets = arcanebetSession.getSession().user.wallets

    commit(STORE_WALLETS, wallets)
    if (wallets.length) {
      commit(SET_ACTIVE_WALLET, wallets[0].id)
    }

    // Subscribe to updates
    const observer = graphqlClient.subscribe({
      query: WALLET_UPDATED_SUBSCRIPTION
    })

    observer.subscribe({
      next: ({ data }) => commit(UPDATE_WALLET, data.walletUpdated)
    })
  }
}

export const mutations = {
  [STORE_WALLETS] (state, wallets) {
    state.wallets = wallets
    if (!state.activeWalletId && wallets.length) {
      state.activeWalletId = wallets[0].id
    }
  },
  [UPDATE_WALLET] (state, wallet) {
    const index = state.wallets.findIndex(w => w.id === wallet.id)
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
  }
}

export const getters = {
  activeWallet (state) {
    return state.wallets.find(el => el.id === state.activeWalletId) || null
  },
  fiatWallet (state) {
    return state.wallets.find(el => el.currency.kind === FIAT)
  },
  wallets (state) {
    return state.wallets
  }
}

export default {
  namespaced: true,
  state: {
    wallets: [],
    activeWalletId: null
  },
  getters,
  mutations,
  actions
}
