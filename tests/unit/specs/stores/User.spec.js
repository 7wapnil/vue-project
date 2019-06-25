import { expect } from 'chai'
import { getters } from '@/stores/user'

describe('user store', () => {
  describe('getters', () => {
    describe('getToken', () => {
      it('gets correct token', () => {
        const state = {
          session: { 'user': { 'id': '4', 'email': 'email@email.com' }, 'token': 'sdvhiqdjosfnkjefasladflnkdfkjdsj' }
        }
        expect(getters.getToken(state)).to.eql('sdvhiqdjosfnkjefasladflnkdfkjdsj')
      })
    })

    describe('isLoggedIn', () => {
      it('returns true when user session is present', () => {
        const state = {
          session: { 'user': { 'id': '4', 'email': 'email@email.com' }, 'token': 'sdvhiqdjosfnkjefasladflnkdfkjdsj' }
        }

        expect(getters.isLoggedIn(state)).to.eql(true)
      })

      it('returns false when no session', () => {
        const state = {
          session: { }
        }

        expect(getters.isLoggedIn(state)).to.eql(false)
      })
    })
  })
})
