import arcanebetSession from '@/services/local-storage/session'
import graphqlClient from '@/libs/apollo'
import { SIGN_IN_MUTATION, SIGN_UP_MUTATION } from '@/stores/queries/user'

/**
 * User store module
 */
export default {
  state: {
    session: arcanebetSession.getSession() || {}
  },
  actions: {
    logout (context, componentContext) {
      context.commit('clearSession')
      context.commit('clearBetslip')
      context.commit('clearWalletsStorage')
      arcanebetSession.dropSession()
      componentContext.$apollo.getClient().cache.reset()
      componentContext.$router.push({name: 'home'})
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
    }
  }
}
