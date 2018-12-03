const storageKey = 'session'

class ArcanebetSession {
  constructor (storage) {
    this.storage = storage
  }

  storeSession = (sessionData) => {
    this.storage.setItem(storageKey, JSON.stringify(sessionData))
  }

   getSession = () => {
     const data = this.storage.getItem(storageKey)
     if (!data) {
       return null
     }
     return JSON.parse(data)
   }

   dropSession = () => {
     this.storage.removeItem(storageKey)
   }

   storeImpersonatedSession = (token, customer) => {
     customer.__typename = 'User'
     const newSession = this.getSession() || {}
     newSession.user = customer
     newSession.token = token
     newSession.__typename = 'Account'
     this.storeSession(newSession)
   }
}

export default new ArcanebetSession(localStorage)
