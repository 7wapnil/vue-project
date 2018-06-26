import Vue from 'vue'

const sessionKey = 'session_key'

export default {
  _session: {},
  _options: {},
  install(Vue, options = {}) {
    Vue.prototype.$auth = Vue.$auth = this
    this._options = Object.assign({}, {}, options)

    this._session = this.getSession()
  },

  login(token, user) {
    this.storeSession({
      token,
      user
    })
  },

  logout() {
    this.resetSession()
  },

  get token() {
    return this.getSession().token
  },

  get user() {
    return this.getSession().user
  },

  get authenticated() {
    return !!this.token
  },

  storeSession(sessionData) {
    localStorage.setItem(sessionKey, JSON.stringify(sessionData))
    this._session = sessionData
  },

  getSession() {
    const sessionData = localStorage.getItem(sessionKey)
    if (sessionData) {
      return JSON.parse(sessionData)
    }
    return {}
  },

  resetSession() {
    localStorage.removeItem(sessionKey)
    this._session = {}
  }
}
