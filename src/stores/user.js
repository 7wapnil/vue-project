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
      console.log(state)
      return state.session.user
    }
  }
}
