import { getCookie } from '@/helpers/cookies'
import GTMPlugin from '@/config/plugins/google-tag-manager'

const storageKey = 'session'
const nullStorage = {
  setItem: function () {},
  removeItem: function () {},
  key: function () {},
  getItem: function () {},
  length: 0
}

class ArcanebetSession {
  constructor (storage = null) {
    this.storage = storage || nullStorage
  }

  storeSession = (sessionData) => {
    this.storage.setItem(storageKey, JSON.stringify(sessionData))
  }

   getSession = () => {
     const data = this.storage.getItem(storageKey)
     if (!data) {
       return null
     }

     const userData = JSON.parse(data)
     const ga = (getCookie('_ga') || '').substring('GA1.2.'.length)

     GTMPlugin.push({
       'event': 'customerLogin',
       'gaClientID': ga || null,
       'customerID': userData.user.id || null
     })

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

export default new ArcanebetSession(typeof localStorage === 'undefined' ? null : localStorage)
