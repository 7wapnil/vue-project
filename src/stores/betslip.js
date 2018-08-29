/**
 * Betslip store module
 */

import Bet from '@/models/bet'
import EventsLookup from '@/services/helpers/events-lookup'

export default {
    state: {
        bets: []
    },
    actions: {
        addNewEmptyBet (context, odd) {
            context.commit('pushNewBetToBetslip', odd)
        }
    },
    mutations: {
        pushNewBetToBetslip (state, odd) {
          let exists = state.bets.find(bet => bet.odd.id === odd.id )
          if (exists === undefined) { state.bets.push(Bet.initial({ odd })) }
        },
        updateBet(state, { oddId, payload }) {
          let bet = state.bets.find(el => el.odd.id === oddId)
          if (!bet) return;
          bet = Object.assign(bet, payload)
        },
        setBetStake (state, { oddId, stakeValue }){
          let bet = state.bets.find(bet => bet.odd.id == oddId )
          if (!bet) { return; }
          bet.stake = stakeValue
        },
        removeBetFromBetslip (state, odd) {
            state.bets = state.bets.filter(e => e.odd.id !== odd.id)
        },
        resetBetslipStakes (state) {
          state.bets.forEach(function(bet){
            bet.stake = 0
          })
        },
        clearBetslip (state) {
          state.bets = []
        },
        freezeBets (state) {
          state.bets = state.bets.map((bet) => {
            bet.status = Bet.statuses.submitting
            return bet
          })
        }
    },
    getters: {
        betslipSubmittable:(state, getters) => (events) => {
          if(getters.getActiveWallet === undefined){
            return false
          }
          let enabled = false
          if (getters.betslipValuesConfirmed(events) &&
              getters.getTotalStakes > 0 &&
              getters.getTotalStakes <= getters.getActiveWallet.amount &&
              getters.anyInitialBet
          ) {
            enabled = true
          }
          return enabled
        },
        betslipValuesConfirmed: (state, getters) => (events) => {
          const betWithUnconfirmedValue = getters.getBets.find((bet) => {
            const currentOddValue =
              EventsLookup.from(events).findOddMapRowById(bet.odd.id).odd.value
            currentOddValue != bet.approvedValue
          })
          return (betWithUnconfirmedValue === undefined)
        },
        getBets(state) {
            return state.bets
        },
        anyInitialBet(state){
          return state.bets.some((bet) => {
            return bet.status === Bet.statuses.initial
          })
        },
        getBetsCount(state) {
            return state.bets.length
        },
        getTotalStakes(state) {
          return state.bets.map(el => el.stake > 0 ? el.stake : 0).reduce((a, b) => +a + +b, 0)
        },
        getTotalReturn(state){
          return state.bets.map(el => (el.stake > 0 ? el.stake : 0) * el.odd.value).reduce((a, b) => +a + +b, 0)
        }
    }
}
