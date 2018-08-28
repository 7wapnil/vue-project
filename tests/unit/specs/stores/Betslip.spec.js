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
    describe('updateBet', () => {
      it('updates bet with correct id according to payload', () => {
        const state = {
          bets: [ { odd: { id: 1 }}, { odd: { id: 2 }, status: 'xxx'} ]
        }

        store.mutations.updateBet(state, {oddId: 2, payload: {status: 'foo'} })

        expect(state.bets).to.eql([ { odd: { id: 1 }}, { odd: { id: 2 }, status: 'foo'} ])
      })
    })
  })
})
