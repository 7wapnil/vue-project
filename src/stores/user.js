import arcanebetSession from '@/services/local-storage/session'
import graphqlClient from '@/libs/apollo/client'
import { AUTH_INFO_QUERY,
  SIGN_IN_MUTATION,
  SIGN_UP_MUTATION,
  PASSWORD_RESET_REQUEST_MUTATION,
  PASSWORD_RESET_MUTATION,
  USER_QUERY,
  WALLET_UPDATED_SUBSCRIPTION } from '@/graphql/index'
import { NO_CACHE } from '@/constants/graphql/fetch-policy'
import { wsClient } from '@/libs/apollo/ws-link'
import router from '@/routes'
import { FIAT } from '@/constants/currency-kinds'

export const UPDATE_WALLET = 'updateWallet'
export const SET_ACTIVE_WALLET = 'setActiveWallet'
/**
 * User store module
 */
export const actions = {
  logout (context) {
    context.commit('clearSession')
    arcanebetSession.dropSession()
    context.commit('resetConnection')
    graphqlClient.cache.reset()
    router.push({ name: 'home' })
  },
  authenticate (context, sessionData) {
    const response = graphqlClient.mutate({
      mutation: SIGN_IN_MUTATION,
      variables: {
        input: sessionData
      }
    })
    return response
  },
  registerNewUser (context, [sessionData, sbjsData]) {
    const response = graphqlClient.mutate({
      mutation: SIGN_UP_MUTATION,
      variables: {
        input: sessionData,
        customerData: sbjsData
      }
    })
    return response
  },
  login (context, sessionData) {
    context.commit('storeSession', sessionData)
    context.commit('setActiveWallet', sessionData.user.wallets[0].id)
    arcanebetSession.storeSession(sessionData)
    context.dispatch('subscribeToWallets')
    context.commit('resetConnection')
  },
  rejectLogin ({ state, commit }, authData) {
    let login = authData.login

    return graphqlClient
      .query({
        query: AUTH_INFO_QUERY,
        variables: { login: login },
        fetchPolicy: NO_CACHE
      })
      .then(({ data: { authInfo } }) => {
        commit('updateLoginInfo', { login: login, ...authInfo })
      })
  },
  requestPasswordReset (context, sessionData) {
    const response = graphqlClient.mutate({
      mutation: PASSWORD_RESET_REQUEST_MUTATION,
      variables: {
        email: sessionData.email
      }
    })
    return response
  },
  resetPassword (context, sessionData) {
    const response = graphqlClient.mutate({
      mutation: PASSWORD_RESET_MUTATION,
      variables: {
        password: sessionData.password,
        confirmation: sessionData.confirmation,
        token: sessionData.token
      }
    })
    return response
  },
  requestUser (context) {
    graphqlClient.query({
      query: USER_QUERY
    }).then(res => {
      arcanebetSession.storeImpersonatedSession(context.getters.getToken, res.data.user)
      context.commit('updateUser', { token: context.getters.getToken, user: res.data.user })
      context.commit('setActiveWallet', res.data.user.wallets[0].id)
      context.dispatch('subscribeToWallets')
    })
  },
  subscribeToWallets ({ commit }) {
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
  storeSession (state, sessionData) {
    state.session = sessionData
    state.isSuspicious = null
    state.lastLogin = null
  },
  updateUser (state, { token, user }) {
    state.session.user = user
    state.session.token = token
  },
  clearSession (state) {
    state.session = {}
  },
  resetConnection (state) {
    wsClient.url = `${process.env.VUE_APP_WS_URL}?token=${state.session.token || null}`
    wsClient.connection.reopen()
  },
  updateLoginInfo (state, data) {
    state.isSuspicious = data.isSuspicious
    state.lastLogin = data.login
  },
  updateWallet (state, wallet) {
    const index = state.session.user.wallets.findIndex(w => w.id === wallet.id)
    if (index > -1) {
      state.session.user.wallets.splice(index, 1, wallet)
    } else {
      state.session.user.wallets.push(wallet)
    }
  },
  setActiveWallet (state, id) {
    state.activeWalletId = id
  }
}

export const getters = {
  getToken (state) {
    return state.session.token
  },
  isLoggedIn (state) {
    return Boolean(state.session.token)
  },
  getUser (state) {
    return state.session.user || null
  },
  isSuspicious (state) {
    return state.isSuspicious
  },
  getLastLogin (state) {
    return state.lastLogin
  },
  getUserWallets (state) {
    return state.session.user.wallets
  },
  getUserActiveWallet (state) {
    return state.session.user.wallets.find(el => el.id === state.activeWalletId) || null
  },
  getUserFiatWallet (state) {
    return state.session.user.wallets.find(el => el.currency.kind === FIAT)
  }
}

export default {
  state: {
    session: arcanebetSession.getSession() || {},
    isSuspicious: null,
    lastLogin: null,
    activeWalletId: null
  },
  actions,
  mutations,
  getters
}
