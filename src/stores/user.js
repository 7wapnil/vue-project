import arcanebetSession from '@/services/local-storage/session'
import graphqlClient from '@/libs/apollo/client'
import { AUTH_INFO_QUERY,
  SIGN_IN_MUTATION,
  SIGN_UP_MUTATION,
  PASSWORD_RESET_REQUEST_MUTATION,
  PASSWORD_RESET_MUTATION } from '@/graphql/index'
import { NO_CACHE } from '@/constants/graphql/fetch-policy'
import { wsClient } from '@/libs/apollo/ws-link'
import router from '@/routes'

/**
 * User store module
 */
export const actions = {
  logout (context) {
    context.commit('clearSession')
    context.commit('wallets/CLEAR_WALLETS')
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
  registerNewUser (context, sessionData) {
    const response = graphqlClient.mutate({
      mutation: SIGN_UP_MUTATION,
      variables: {
        input: sessionData
      }
    })
    return response
  },
  login (context, sessionData) {
    context.commit('storeSession', sessionData)
    arcanebetSession.storeSession(sessionData)
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
  }
}

export const mutations = {
  storeSession (state, sessionData) {
    state.session = sessionData
    state.isSuspicious = null
    state.lastLogin = null
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
  }
}

export default {
  state: {
    session: arcanebetSession.getSession() || {},
    isSuspicious: null,
    lastLogin: null
  },
  actions,
  mutations,
  getters
}
