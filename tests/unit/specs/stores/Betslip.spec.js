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
  describe('getters', () => {
    describe('betslipSubmittable', () => {

      const validGettersState = {
        getTotalStakes: 2,
        getActiveWallet: { amount: 2},
        anyInitialBet: true,
        betslipValuesConfirmed: () => { return true }
      }

      it('is submittable when all rules valid', () => {
        const state = {}
        expect(store.getters.betslipSubmittable(state, validGettersState)({})).to.eql(true)
      })

      describe('fails', () => {
        it('with zero stakes', () => {
          const state = {}

          const invalidGetters = {}
          Object.assign(invalidGetters, validGettersState)
          invalidGetters.getTotalStakes = 0

          expect(store.getters.betslipSubmittable(state, invalidGetters)({})).to.eql(false)
        })

        it('with unconfirmed odd values in betslip', () => {
          const state = {}

          const invalidGetters = {}
          Object.assign(invalidGetters, validGettersState)
          invalidGetters.betslipValuesConfirmed = () => { return false }

          expect(store.getters.betslipSubmittable(state, invalidGetters)({})).to.eql(false)
        })

        it('fails without enough balance in active wallet', () => {
          const state = {}

          const invalidGetters = {}
          Object.assign(invalidGetters, validGettersState)
          invalidGetters.getActiveWallet = { amount: 1}

          expect(store.getters.betslipSubmittable(state, invalidGetters)({})).to.eql(false)
        })

        it('fails without any intial bet in betslip', () => {
          const state = {}

          const invalidGetters = {}
          Object.assign(invalidGetters, validGettersState)
          invalidGetters.anyInitialBet = false

          expect(store.getters.betslipSubmittable(state, invalidGetters)({})).to.eql(false)
        })
      })

      describe('betslipValuesConfirmed', () => {
        it('returns true when all bets confirmed', () => {
          const state = {
            bets: [{confirmedValue: 1.11},{confirmedValue: 2.21}]
          }

          const getters = {
            getBets: [{confirmedValue: 1.11},{confirmedValue: 2.21}]
          }

          const events = [
            { id:1, markets: [ { id:2, odds: [ { id:3 }]}] }
          ]

          const invalidGetters = {}
          Object.assign(invalidGetters, validGettersState)
          invalidGetters.getTotalStakes = 0

          expect(store.getters.betslipValuesConfirmed(state, getters)(events)).to.eql(true)
        })
      })
    })
  })
})
