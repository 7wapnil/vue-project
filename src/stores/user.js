const storageKey = 'session'

const storeSession = (sessionData) => {
  localStorage.setItem(storageKey, JSON.stringify(sessionData))
}

const getSession = () => {
  const data = localStorage.getItem(storageKey)
  if (!data) {
    return null
  }

  return JSON.parse(data)
}

const dropSession = () => {
  localStorage.removeItem(storageKey)
}

/**
 * User store module
 */
export default {
  state: {
    session: getSession() || {}
  },
  mutations: {
    login (state, sessionData) {
      storeSession(sessionData)
      state.session = sessionData
    },
    logout (state) {
      state.session = {}
      dropSession()
    },
    userData(state, data) {
      const session = state.session
      if (session.user) {
        Object.keys(data).forEach((key) => {
          session.user[key] = data[key]
        })
      }
      state.session = session
      storeSession(state.session)
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
