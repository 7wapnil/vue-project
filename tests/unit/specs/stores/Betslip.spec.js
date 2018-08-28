import { expect } from 'chai'
import store from '@/stores/betslip'


describe('wallets store', () => {
  describe('mutations', () => {
    describe('freezeBets', () => {
      it('change state of all bets to submitting', () => {
        const state = {
           bets: [ { status: 'initial'}, { status: 'initial'} ]
        }

        store.mutations.freezeBets(state)

        expect(state.bets).to.eql([ { status: 'submitting'}, { status: 'submitting'}])
      })
    })
  })
})
