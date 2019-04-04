import arcanebetSession from '@/services/local-storage/session'
import graphqlClient from '@/libs/apollo/'
import { AUTH_INFO_QUERY, SIGN_IN_MUTATION, SIGN_UP_MUTATION } from '@/graphql/index'
import { NO_CACHE } from '@/constants/graphql/fetch-policy'
import { wsClient } from '@/libs/apollo/ws-link'

/**
 * User store module
 */
export default {
  state: {
    session: arcanebetSession.getSession() || {},
    isSuspicious: null,
    lastLogin: null
  },
  actions: {
    logout (context, componentContext) {
      context.commit('clearSession')
      context.commit('clearBetslip')
      context.commit('clearWalletsStorage')
      arcanebetSession.dropSession()
      context.commit('resetConnection')
      componentContext.$apollo.getClient().cache.reset()
      componentContext.$router.push({ name: 'home' })
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
      context.commit('setLCParams')
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
    }
  },
  mutations: {
    storeSession (state, sessionData) {
      state.session = sessionData
      state.isSuspicious = null
      state.lastLogin = null
    },
    clearSession (state) {
      state.session = {}
    },
    setLCParams (state) {
      let extraParams = [
        { name: 'username', value: state.session.user.username },
        { name: 'name', value: state.session.user.first_name + ' ' + state.session.user.last_name },
        { name: 'email', value: state.session.user.email }
      ]
      window.__lc.params = extraParams
      window.__lc.visitor =
        { name: state.session.user.first_name + ' ' + state.session.user.last_name, email: state.session.user.email }
    },
    resetConnection (state) {
      wsClient.url = `${process.env.VUE_APP_WS_URL}?token=${state.session.token || null}`
      wsClient.connection.reopen()
    },
    userData (state, data) {
      const session = state.session
      if (session.user) {
        Object.keys(data).forEach((key) => {
          session.user[key] = data[key]
        })
      }
      state.session = session
      arcanebetSession.storeSession(state.session)
    },
    updateLoginInfo (state, data) {
      state.isSuspicious = data.is_suspicious
      state.lastLogin = data.login
    }
  },
  getters: {
    getToken (state) {
      return state.session.token
    },
    isLoggedIn (state) {
      return Boolean(state.session.token)
    },
    getUser (state) {
      return state.session.user
    },
    getUserData: (state, getters) => (attribute) => {
      const userData = getters['getUser']
      if (userData) {
        return userData[attribute]
      }
      return null
    },
    isSuspicious (state) {
      return state.isSuspicious
    },
    getLastLogin (state) {
      return state.lastLogin
    }
  }
}
