import { expect } from 'chai'
import { mutations, getters, actions } from '@/stores/betslip'
import Bet from '@/models/bet'

describe('betslip store', () => {
  describe('actions', () => {
    describe('pushBet', () => {
      it('adds new bet to empty betslip based on odd', () => {
        const state = { bets: [] }
        const dispatch = sinon.spy()

        actions.pushBet({ dispatch, state }, { event: {}, market: {}, odd: { id: 1, value: 2 } })

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

    describe('removeBetFromBetslip', () => {
      it('removes one item from betslip', () => {
        const state = {
          bets: [ { oddId: 1 }, { oddId: 2, status: 'xxx' } ]
        }
        const dispatch = sinon.spy()
        const commit = sinon.spy()

        actions.removeBetFromBetslip({ dispatch, state, commit }, 1)

        expect(state.bets).to.eql([{ oddId: 2, status: 'xxx' }])
      })
    })
  })

  describe('mutations', () => {
    describe('setBetStatusAsSubmitted', () => {
      it('change state of all bets to submitted', () => {
        const state = {
          bets: [{ status: 'initial' }, { status: 'initial' }]
        }

        mutations.setBetStatusAsSubmitted(state)

        expect(state.bets).to.eql([{ status: 'submitted' }, { status: 'submitted' }])
      })
    })

    describe('updateBet', () => {
      it('updates bet accept all boolean value', () => {
        const state = {
          bets: [ { oddId: 1 }, { oddId: 2, status: 'xxx' } ]
        }

        mutations.updateBet(state, { oddId: 2, payload: { status: 'foo' } })

        expect(state.bets).to.eql([{ oddId: 1 }, { oddId: 2, status: 'foo' }])
      })
    })

    describe('clearBets', () => {
      it('clears all bets', () => {
        const state = {
          bets: [ { oddId: 1 }, { oddId: 2, status: 'xxx' } ]
        }

        mutations.clearBets(state)

        expect(state.bets).to.eql([])
      })
    })

    describe('setAcceptAll', () => {
      it('updates bet with correct id according to payload', () => {
        const state = {
          acceptAll: false
        }

        mutations.setAcceptAll(state, true)

        expect(state.acceptAll).to.eql(true)
      })
    })

    describe('setBetStake', () => {
      it('updates bet stake', () => {
        const state = {
          bets: [{ oddId: 1, stake: 5 }]
        }
        mutations.setBetStake(state, { oddId: 1, stakeValue: 123 })
        expect(state.bets[0].stake).to.eql(123)
      })
    })
  })

  describe('getters', () => {
    describe('betslipSubmittable', () => {
      const validGettersState = {
        getTotalStakes: 2,
        getAllBetsAcceptable: true,
        betslipValuesConfirmed: true,
        hasInactiveBets: false,
        getIsEnoughFundsToBet: true
      }

      it('is submittable when all rules valid', () => {
        const state = {}
        expect(getters.betslipSubmittable(state, validGettersState, {})).to.eql(true)
      })

      describe('fails', () => {
        it('with zero stakes', () => {
          const state = {}

          const invalidGetters = {
            ...validGettersState,
            getIsEnoughFundsToBet: false
          }

          expect(getters.betslipSubmittable(state, invalidGetters, {})).to.eql(false)
        })

        it('with unconfirmed odd values in betslip', () => {
          const state = {}

          const invalidGetters = {
            ...validGettersState,
            betslipValuesConfirmed: false
          }

          expect(getters.betslipSubmittable(state, invalidGetters, {})).to.eql(false)
        })

        it('fails without enough balance in active wallet', () => {
          const state = {}

          const invalidGetters = {
            ...validGettersState,
            getIsEnoughFundsToBet: false
          }

          expect(getters.betslipSubmittable(state, invalidGetters, {})).to.eql(false)
        })

        it('fails when at least one market status is inactive', () => {
          const state = {}

          const invalidGetters = {
            ...validGettersState,
            hasInactiveBets: true
          }

          expect(getters.betslipSubmittable(state, invalidGetters, {})).to.eql(false)
        })
      })
    })

    describe('betslipValuesConfirmed', () => {
      it('returns true when all bets confirmed', () => {
        const oddId = 3
        const confirmedValue = 1.11
        const currentOddValue = 1.11
        const betsState = [
          { currentOddValue: currentOddValue, approvedOddValue: confirmedValue, oddId: oddId }
        ]

        const state = { bets: betsState, acceptAll: false }
        const events = [
          { id: 1, markets: [{ id: 2, odds: [{ id: oddId, value: currentOddValue }] }] }
        ]

        const gettersWithEvents = { getEvents: events }

        expect(getters.betslipValuesConfirmed(state, gettersWithEvents)).to.eql(true)
      })

      it('returns true on accepting all odds', () => {
        const oddId = 3
        const confirmedValue = 1.11
        const currentOddValue = 1.12
        const betsState = [
          new Bet({ currentOddValue: currentOddValue, approvedOddValue: confirmedValue, oddId: oddId })
        ]

        const state = { bets: betsState, acceptAll: true }
        const events = [
          new Bet({ id: 1, markets: [{ id: 2, odds: [{ id: oddId, value: currentOddValue }] }] })
        ]

        const gettersWithEvents = { getEvents: events }

        expect(getters.betslipValuesConfirmed(state, gettersWithEvents)).to.eql(true)
      })

      it('returns false when one of bets not confirmed', () => {
        const oddId = 3
        const confirmedValue = 1.11
        const currentOddValue = 1.12
        const betsState = [
          new Bet({ currentOddValue: currentOddValue, approvedOddValue: confirmedValue, oddId: oddId })
        ]

        const state = { bets: betsState, acceptAll: false }
        const events = [
          { id: 1, markets: [{ id: 2, odds: [{ id: oddId, value: currentOddValue }] }] }
        ]

        const gettersWithEvents = { getEvents: events }

        expect(getters.betslipValuesConfirmed(state, gettersWithEvents)).to.eql(false)
      })
    })

    describe('getIsEnoughFundsToBet', () => {
      it('returns false when wallet is empty', () => {
        const invalidGetters = {
          'getUserActiveWallet': {
            id: 1,
            amount: 10,
            currency: {
              code: 'EUR',
              name: 'Euro'
            },
            realMoneyBalance: 0,
            bonusMoney: 10,
            userBonus: {
              casino: true,
              sportsbook: false
            }
          },
          getTotalStakes: 1
        }

        expect(getters.getIsEnoughFundsToBet({}, invalidGetters, {}, invalidGetters)).to.eql(false)
      })

      it('returns true when wallet has enough funds', () => {
        const localGetters = {
          'getUserActiveWallet': {
            id: 1,
            amount: 200,
            currency: {
              code: 'EUR',
              name: 'Euro'
            },
            realMoneyBalance: 100,
            bonusMoney: 100,
            userBonus: {
              casino: true,
              sportsbook: false
            }
          },
          getTotalStakes: 2
        }

        expect(getters.getIsEnoughFundsToBet({}, localGetters, {}, localGetters)).to.eql(true)
      })

      it('returns false when there is no wallet', () => {
        const localGetters = {
          'getUserActiveWallet': null,
          getTotalStakes: 2
        }

        expect(getters.getIsEnoughFundsToBet({}, localGetters, {}, localGetters)).to.eql(false)
      })
    })

    describe('getPlacedBetIds', () => {
      it('returns correct array with all bets IDs', () => {
        const state = {
          bets: [
            { id: 1 },
            { id: 3 },
            { id: 1142 },
            { id: 12 },
            { id: 1 },
            { id: 12 },
            { id: 5 }
          ]
        }
        expect(getters.getPlacedBetIds(state)).to.eql([1, 3, 1142, 12, 5])
      })
    })

    describe('acceptAllChecked', () => {
      it('returns correct value of accept All checked boolean', () => {
        const state = {
          acceptAll: false
        }
        expect(getters.acceptAllChecked(state)).to.eql(false)
      })
    })

    describe('hasInactiveBets', () => {
      it('returns true when there is at least one bet with inactive event', () => {
        const state = {
          bets: [
            { eventEnabled: true, marketEnabled: true, oddEnabled: true },
            { eventEnabled: false, marketEnabled: true, oddEnabled: true }
          ]
        }
        expect(getters.hasInactiveBets(state)).to.eql(true)
      })

      it('returns true when there is at least one bet with inactive market', () => {
        const state = {
          bets: [
            { eventEnabled: true, marketEnabled: true, oddEnabled: true },
            { eventEnabled: true, marketEnabled: false, oddEnabled: true }
          ]
        }
        expect(getters.hasInactiveBets(state)).to.eql(true)
      })

      it('returns true when there is at least one bet with inactive odd', () => {
        const state = {
          bets: [
            { eventEnabled: true, marketEnabled: true, oddEnabled: true },
            { eventEnabled: true, marketEnabled: true, oddEnabled: false }
          ]
        }
        expect(getters.hasInactiveBets(state)).to.eql(true)
      })

      it('returns false when there is no bets with inactive associations', () => {
        const state = {
          bets: [
            { eventEnabled: true, marketEnabled: true, oddEnabled: true },
            { eventEnabled: true, marketEnabled: true, oddEnabled: true }
          ]
        }
        expect(getters.hasInactiveBets(state)).to.eql(false)
      })
    })

    describe('getAnyEmptyStake', () => {
      it('returns true when the stake is 0', () => {
        const state = {
          bets: [
            { stake: 0 }
          ]
        }
        expect(getters.getAnyEmptyStake(state)).to.eql(true)
      })

      it('returns true when the stake is null', () => {
        const state = {
          bets: [
            { stake: null }
          ]
        }
        expect(getters.getAnyEmptyStake(state)).to.eql(true)
      })

      it('returns false when the stake is more than 0', () => {
        const state = {
          bets: [
            { stake: 2 }
          ]
        }
        expect(getters.getAnyEmptyStake(state)).to.eql(false)
      })
    })

    describe('getAnyBetInValidation', () => {
      it('returns true when the bet status is "sent to internal validation"', () => {
        const state = {
          bets: [
            { status: 'sent_to_internal_validation' }
          ]
        }
        expect(getters.getAnyBetInValidation(state)).to.eql(true)
      })

      it('returns true when the bet status is "validated_internally"', () => {
        const state = {
          bets: [
            { status: 'validated_internally' }
          ]
        }
        expect(getters.getAnyBetInValidation(state)).to.eql(true)
      })

      it('returns true when the bet status is "sent_to_external_validation"', () => {
        const state = {
          bets: [
            { status: 'sent_to_external_validation' }
          ]
        }
        expect(getters.getAnyBetInValidation(state)).to.eql(true)
      })

      it('returns false when the bet status is something else', () => {
        const state = {
          bets: [
            { status: 'something else' }
          ]
        }
        expect(getters.getAnyBetInValidation(state)).to.eql(false)
      })
    })

    describe('getAnySubmittedBet', () => {
      it('returns true when the bet status is "submitted"', () => {
        const state = {
          bets: [
            { status: 'submitted' }
          ]
        }
        expect(getters.getAnySubmittedBet(state)).to.eql(true)
      })

      it('returns false when the bet status is "whatever"', () => {
        const state = {
          bets: [
            { status: 'whatever' }
          ]
        }
        expect(getters.getAnySubmittedBet(state)).to.eql(false)
      })
    })

    describe('hasAnyFrozenBet', () => {
      it('returns true when the bet status is "submitted"', () => {
        const state = {
          bets: [
            { frozen: true }
          ]
        }
        expect(getters.hasAnyFrozenBet(state)).to.eql(true)
      })

      it('returns false when the bet status is "not frozen"', () => {
        const state = {
          bets: [
            { status: 'not_frozen' }
          ]
        }
        expect(getters.hasAnyFrozenBet(state)).to.eql(false)
      })
    })
  })
})
