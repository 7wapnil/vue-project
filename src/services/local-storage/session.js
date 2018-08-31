const storageKey = 'session'

class ArcanebetSession {
  static storeSession = (sessionData) => {
    localStorage.setItem(storageKey, JSON.stringify(sessionData))
  }

  static getSession = () => {
    const data = localStorage.getItem(storageKey)
    if (!data) {
      return null
    }
    return JSON.parse(data)
  }

  static dropSession = () => {
    localStorage.removeItem(storageKey)
  }
}

export default ArcanebetSession
