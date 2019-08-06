import { expect } from 'chai'
import { getters, mutations } from '@/stores/user'

describe('user store', () => {
  describe('getters', () => {
    describe('getUserActiveWallet', () => {
      it('returns null when active Wallet is not set', () => {
        const state = {
          session: {
            user: {
              wallets: [],
            }
          },
          activeWalletId: null
        }

        expect(getters.getUserActiveWallet(state)).to.eql(null)
      })

      it('returns active wallet', () => {
        const state = {
          session: {
            user: {
              wallets: [{ id: 1 }],
            }
          },
          activeWalletId: 1
        }

        expect(getters.getUserActiveWallet(state)).to.eql({ id: 1 })
      })
    })

    describe('wallets', () => {
      it('returns all wallets', () => {
        const state = {
          session: {
            user: {
              wallets: [{ id: 1 }, { id: 2 }],
            }
          },
          activeWalletId: 1
        }

        expect(getters.getUserWallets(state)).to.eql([{ id: 1 }, { id: 2 }])
      })
    })

    describe('getToken', () => {
      it('gets correct token', () => {
        const state = {
          session: {
            user: {
              id: 4,
              email: 'email@email.com'
            },
            token: 'sdvhiqdjosfnkjefasladflnkdfkjdsj'
          }
        }
        expect(getters.getToken(state)).to.eql('sdvhiqdjosfnkjefasladflnkdfkjdsj')
      })
    })

    describe('isLoggedIn', () => {
      it('returns true when user session is present', () => {
        const state = {
          session: {
            user: {
              id: 4,
              email: 'email@email.com'
            },
            token: 'sdvhiqdjosfnkjefasladflnkdfkjdsj'
          }
        }

        expect(getters.isLoggedIn(state)).to.eql(true)
      })

      it('returns false when no session', () => {
        const state = {
          session: {}
        }

        expect(getters.isLoggedIn(state)).to.eql(false)
      })
    })

    describe('getUser', () => {
      it('returns user object when user is present', () => {
        const state = {
          session: {
            user: {
              id: 4,
              email: 'email@email.com'
            }
          }
        }

        expect(getters.getUser(state)).to.eql({
          id: 4,
          email: 'email@email.com'
        })
      })

      it('returns null when no session', () => {
        const state = {
          session: {}
        }

        expect(getters.getUser(state)).to.eql(null)
      })
    })

    describe('isSuspicious', () => {
      it('returns true when isSuspicious set to true', () => {
        const state = {
          isSuspicious: true
        }

        expect(getters.isSuspicious(state)).to.eql(true)
      })

      it('returns null when isSuspicious is not set', () => {
        const state = {
          isSuspicious: null
        }

        expect(getters.isSuspicious(state)).to.eql(null)
      })
    })
  })

  describe('mutations', () => {
    describe('SET_ACTIVE_WALLET', () => {
      it('sets given id as activeWalletId', () => {
        const state = {
          user: {},
          activeWalletId: null
        }

        const id = 2

        mutations.setActiveWallet(state, id)
        expect(state.activeWalletId).to.eql(id)
      })
    })

    describe('storeSession', () => {
      it('stores session when called', () => {
        const state = {}
        const sessionData = {
          user: {
            id: 4,
            email: 'email@email.com',
            name: 'test'
          },
          token: 'sdvhiqdjosfnkjefasladflnkdfkjdsj'
        }

        mutations.storeSession(state, sessionData)
        expect(state.session).to.eql(sessionData)
      })

      it('clears up isSuspicious', () => {
        const state = { isSuspicious: true }
        const sessionData = {}

        mutations.storeSession(state, sessionData)
        expect(state.isSuspicious).to.eql(null)
      })

      it('clears up lastLogin', () => {
        const state = { lastLogin: { someData: 'someData' } }
        const sessionData = {}

        mutations.storeSession(state, sessionData)
        expect(state.lastLogin).to.eql(null)
      })
    })

    describe('clearSession', () => {
      it('clears up the session, returns {}', () => {
        const state = {
          session: {
            user: {
              id: 4,
              email: 'email@email.com',
              name: 'test'
            },
            token: 'sdvhiqdjosfnkjefasladflnkdfkjdsj'
          }
        }

        mutations.clearSession(state)
        expect(state.session).to.eql({})
      })
    })

    describe('updateLoginInfo', () => {
      it('updates lastLogin param', () => {
        const state = {
          lastLogin: null
        }
        const newData = {
          login: {
            someData: 'adadsads'
          }
        }

        mutations.updateLoginInfo(state, newData)
        expect(state.lastLogin).to.eql({ someData: 'adadsads' })
      })

      it('updates isSuspicious param', () => {
        const state = {
          isSuspicious: null
        }
        const newData = {
          isSuspicious: true
        }

        mutations.updateLoginInfo(state, newData)
        expect(state.isSuspicious).to.eql(true)
      })
    })
  })
})
