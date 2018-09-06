import { expect } from 'chai'

const store = {}

describe.skip('wallets store', () => {
  describe('mutations', () => {
    describe('freezeBets', () => {
      it('change state of all bets to submitting', () => {
        const state = {
          bets: [{ status: 'initial' }, { status: 'initial' }]
        }

        store.mutations.freezeBets(state)

        expect(state.bets).to.eql([{ status: 'submitting' }, { status: 'submitting' }])
      })
    })
    describe('pushNewBetToBetslip', () => {
      it('adds new bet to empty betslip based on odd', () => {
        const state = {
          bets: []
        }

        store.mutations.pushNewBetToBetslip(state, { id: 1, value: 2 })

        expect(state.bets.length).to.eql(1)
        expect(state.bets[0].odd.id).to.eql(1)
      })

      it('does not add new bet when one exists in bets store', () => {
        const state = {
          bets: [{ odd: { id: 1 } }]
        }

        store.mutations.pushNewBetToBetslip(state, { id: 1, value: 2 })

        expect(state.bets.length).to.eql(1)
      })

      it('does not add new bet when one exists in bets store and id provided in string', () => {
        const state = {
          bets: [{ odd: { id: 1 } }]
        }

        store.mutations.pushNewBetToBetslip(state, { id: '1', value: 2 })

        expect(state.bets.length).to.eql(1)
      })
    })
    describe('updateBet', () => {
      it('updates bet with correct id according to payload', () => {
        const state = {
          bets: [ { odd: { id: 1 } }, { odd: { id: 2 }, status: 'xxx' } ]
        }

        store.mutations.updateBet(state, { oddId: 2, payload: { status: 'foo' } })

        expect(state.bets).to.eql([{ odd: { id: 1 } }, { odd: { id: 2 }, status: 'foo' }])
      })
    })
  })
  describe('getters', () => {
    describe('betslipSubmittable', () => {
      const validGettersState = {
        getTotalStakes: 2,
        getActiveWallet: { amount: 2 },
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
          invalidGetters.getActiveWallet = { amount: 1 }

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
    })

    describe('betslipValuesConfirmed', () => {
      it('returns true when all bets confirmed', () => {
        const oddId = 3
        const confirmedValue = 1.11
        const currentOddValue = 1.11
        const betsState = [{ approvedValue: confirmedValue, odd: { id: oddId } }, { approvedValue: 2.21, odd: { id: 4 } }];

        const state = { bets: betsState }
        const getters = { getBets: betsState }
        const events = [
          { id: 1, markets: [{ id: 2, odds: [{ id: oddId, value: currentOddValue }, { id: 4, value: 2.21 }] }] }
        ]

        expect(store.getters.betslipValuesConfirmed(state, getters)(events)).to.eql(true)
      })

      it('returns false when one of bets not confirmed', () => {
        const oddId = 3
        const confirmedValue = 1.11
        const currentOddValue = 1.12
        const betsState = [{ approvedValue: confirmedValue, odd: { id: oddId } }, { approvedValue: 2.21, odd: { id: 4 } }];

        const state = { bets: betsState }
        const getters = { getBets: betsState }
        const events = [
          { id: 1, markets: [{ id: 2, odds: [{ id: oddId, value: currentOddValue }, { id: 4, value: 2.21 }] }] }
        ]

        expect(store.getters.betslipValuesConfirmed(state, getters)(events)).to.eql(false)
      })
    })
  })
})
