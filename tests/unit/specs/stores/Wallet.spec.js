import { expect } from 'chai'
import { getters, mutations } from '@/stores/wallets'

describe('wallet store', () => {
  describe('getters', () => {
    describe('activeWallet', () => {
      it('returns null when active Wallet is not set', () => {
        const state = {
          wallets: [],
          activeWalletId: null
        }

        expect(getters.activeWallet(state)).to.eql(null)
      })

      it('returns active wallet', () => {
        const state = {
          wallets: [{ id: 1 }],
          activeWalletId: 1
        }

        expect(getters.activeWallet(state)).to.eql({ id: 1 })
      })
    })

    describe('wallets', () => {
      it('returns all wallets', () => {
        const state = {
          wallets: [{ id: 1 }, { id: 2 }],
          activeWalletId: 1
        }

        expect(getters.wallets(state)).to.eql([{ id: 1 }, { id: 2 }])
      })
    })
  })

  describe('mutations', () => {
    describe('STORE_WALLETS', () => {
      it('stores all wallets', () => {
        const state = {
          wallets: [],
          activeWalletId: null
        }

        const newWallets = [
          { id: 1, currency: 'EUR' },
          { id: 2, currency: 'BTC' }
        ]
        mutations['STORE_WALLETS'](state, newWallets)
        expect(getters.wallets(state)).to.eql([
          { id: 1, currency: 'EUR' },
          { id: 2, currency: 'BTC' }])
      })

      it('sets first wallet as active if no active wallet is set before', () => {
        const state = {
          wallets: [],
          activeWalletId: null
        }

        const newWallets = [
          { id: 1, currency: 'EUR' },
          { id: 2, currency: 'BTC' }
        ]

        mutations['STORE_WALLETS'](state, newWallets)
        expect(getters.activeWallet(state).id).to.eql(newWallets[0].id)
      })
    })

    describe('UPDATE_WALLET', () => {
      it('sets first wallet as active if no active wallet is set before', () => {
        const state = {
          wallets: [],
          activeWalletId: null
        }

        const newWallet = { id: 1, currency: 'EUR' }

        mutations['UPDATE_WALLET'](state, newWallet)

        expect(getters.wallets(state)).to.eql([newWallet])
      })

      describe('UPDATE_WALLET', () => {
        it('sets first wallet as active if no active wallet is set before', () => {
          const state = {
            wallets: [],
            activeWalletId: null
          }

          const newWallet = { id: 1, currency: 'EUR' }

          mutations['UPDATE_WALLET'](state, newWallet)

          expect(getters.wallets(state)).to.eql([newWallet])
        })
      })
    })
  })
})
