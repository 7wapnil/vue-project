/**
 * Betslip store module
 */

import Bet from '@/models/bet'

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
          return state.bets.map(el => el.stake).reduce((a, b) => +a + +b, 0)
        },
        getTotalReturn(state){
          return state.bets.map(el => el.stake * el.odd.value).reduce((a, b) => +a + +b, 0)
        }
    }
}
