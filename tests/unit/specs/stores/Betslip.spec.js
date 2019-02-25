import { expect } from 'chai'
import { mutations, getters, actions } from '@/stores/betslip'

describe('wallets store', () => {
  describe('mutations', () => {
    describe('freezeBets', () => {
      it('change state of all bets to submitting', () => {
        const state = {
          bets: [{ status: 'initial' }, { status: 'initial' }]
        }

        mutations.freezeBets(state)

        expect(state.bets).to.eql([{ status: 'submitting' }, { status: 'submitting' }])
      })
    })
    describe('pushBet', () => {
      it('adds new bet to empty betslip based on odd', () => {
        const state = {
          bets: []
        }

        actions.pushBet({ state }, { event: {}, market: {}, odd: { id: 1, value: 2 } })

        expect(state.bets.length).to.eql(1)
        expect(state.bets[0].oddId).to.eql(1)
      })

      it('does not add new bet when one exists in bets store', () => {
        const state = {
          bets: [{ oddId: 1 }]
        }

        actions.pushBet({ state }, { event: {}, market: {}, odd: { id: 1, value: 2 } })

        expect(state.bets.length).to.eql(1)
      })
    })
    describe('updateBet', () => {
      it('updates bet with correct id according to payload', () => {
        const state = {
          bets: [ { oddId: 1 }, { oddId: 2, status: 'xxx' } ]
        }

        mutations.updateBet(state, { oddId: 2, payload: { status: 'foo' } })

        expect(state.bets).to.eql([{ oddId: 1 }, { oddId: 2, status: 'foo' }])
      })
    })
  })
  describe('getters', () => {
    describe('betslipSubmittable', () => {
      const rootGetters = {
        'wallets/activeWallet': { amount: 2 }
      }

      const validGettersState = {
        getTotalStakes: 2,
        anyInitialBet: true,
        betslipValuesConfirmed: true,
        getStatusDisabled: false
      }

      it('is submittable when all rules valid', () => {
        const state = {}
        expect(getters.betslipSubmittable(state, validGettersState, {}, rootGetters)).to.eql(true)
      })

      describe('fails', () => {
        it('with zero stakes', () => {
          const state = {}

          const invalidGetters = {
            ...validGettersState,
            getTotalStakes: 0
          }

          expect(getters.betslipSubmittable(state, invalidGetters, {}, rootGetters)).to.eql(false)
        })

        it('with unconfirmed odd values in betslip', () => {
          const state = {}

          const invalidGetters = {
            ...validGettersState,
            betslipValuesConfirmed: false
          }

          expect(getters.betslipSubmittable(state, invalidGetters, {}, rootGetters)).to.eql(false)
        })

        it('fails without enough balance in active wallet', () => {
          const state = {}

          const invalidRootGetters = {
            ...rootGetters,
            'wallets/activeWallet': { amount: 1 }
          }

          expect(getters.betslipSubmittable(state, validGettersState, {}, invalidRootGetters)).to.eql(false)
        })

        it('does not fail without any initial bet in betslip', () => {
          const state = {}

          const invalidGetters = {
            ...validGettersState,
            anyInitialBet: false
          }

          expect(getters.betslipSubmittable(state, invalidGetters, {}, rootGetters)).to.eql(true)
        })
      })
    })

    describe('betslipValuesConfirmed', () => {
      it('returns true when all bets confirmed', () => {
        const oddId = 3
        const confirmedValue = 1.11
        const currentOddValue = 1.11
        const betsState = [
          { currentOddValue: currentOddValue, approvedOddValue: confirmedValue, odd: { id: oddId } },
        ]

        const state = { bets: betsState }
        const events = [
          { id: 1, markets: [{ id: 2, odds: [{ id: oddId, value: currentOddValue }] }] }
        ]

        const gettersWithEvents = {
          getEvents: events
        }

        expect(getters.betslipValuesConfirmed(state, gettersWithEvents)).to.eql(true)
      })

      it('returns false when one of bets not confirmed', () => {
        const oddId = 3
        const confirmedValue = 1.11
        const currentOddValue = 1.12
        const betsState = [
          { currentOddValue: currentOddValue, approvedOddValue: confirmedValue, odd: { id: oddId } },
        ]

        const state = { bets: betsState }
        const events = [
          { id: 1, markets: [{ id: 2, odds: [{ id: oddId, value: currentOddValue }] }] }
        ]

        const gettersWithEvents = {
          getEvents: events
        }

        expect(getters.betslipValuesConfirmed(state, gettersWithEvents)).to.eql(false)
      })
    })
  })
})
