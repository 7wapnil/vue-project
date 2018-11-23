import arcanebetSession from '@/services/local-storage/session'
import graphqlClient from '@/libs/apollo'
import { SIGN_IN_MUTATION, SIGN_UP_MUTATION } from '@/stores/queries/user'
import { AUTH_INFO_QUERY } from '@/graphql/index'

/**
 * User store module
 */
export default {
  state: {
    session: arcanebetSession.getSession() || {},
    loginAttempts: 0,
    maxLoginAttempts: null,
    lastLogin: null
  },
  actions: {
    logout (context, componentContext) {
      context.commit('clearSession')
      context.commit('clearBetslip')
      context.commit('clearWalletsStorage')
      arcanebetSession.dropSession()
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
      context.commit('updateLoginInfo', { login_attempts: 0, lastLogin: null })
      arcanebetSession.storeSession(sessionData)
    },
    unsuccessfulLogin ({ state, commit }, authData) {
      let login = authData.login
      let response

      if (login && login === state.lastLogin) {
        response = commit('updateLoginInfo', { login_attempts: state.loginAttempts + 1 })
      } else {
        response = graphqlClient
          .query({
            query: AUTH_INFO_QUERY,
            variables: { login: login },
            fetchPolicy: 'network-only'
          })
          .then(({ data: { authInfo } }) => {
            commit('updateLoginInfo', { login: login, ...authInfo })
          })
      }

      return response
    }
  },
  mutations: {
    storeSession (state, sessionData) {
      state.session = sessionData
    },
    clearSession (state) {
      state.session = {}
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
      state.loginAttempts = data.login_attempts

      if (!state.maxLoginAttempts) {
        state.maxLoginAttempts = data.max_login_attempts
      }

      if (data.login) {
        state.lastLogin = data.login
      }
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
    getLastLogin (state) {
      return state.lastLogin
    },
    isSuspectedLogin (state) {
      return state.maxLoginAttempts && state.loginAttempts >= state.maxLoginAttempts
    }
  }
}
