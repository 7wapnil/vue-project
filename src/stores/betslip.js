/**
 * Betslip store module
 */
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
            let exists = state.bets.find(bet => bet.odd.id == odd.id )
            if(exists == undefined) {
                state.bets.push({odd: odd, stake: 0})
            }
        },
        setBetStake (state, { oddId, stakeValue }){
          let bet = state.bets.find(bet => bet.odd.id == oddId )
          if (!bet) { return; }
          bet.stake = stakeValue
        },
        removeBetFromBetslip (state, odd) {
            state.bets = state.bets.filter(e => e.odd.id !== odd.id)
        },
        resetBetslipStakes (state){
          state.bets.forEach(function(bet){
            bet.stake = 0
          })
        },
        cleanBetslip (state){
          state.bets = []
        }
    },
    getters: {
        getBets(state) {
            return state.bets
        },
        getBetsCount(state) {
            return state.bets.length
        },
        getTotalStakes(state) {
          if( state.bets.length == 0) { return 0 }
          return state.bets.map(el => el.stake).reduce((a, b) => +a + +b, '') || 0
        },
        getTotalReturn(state){
          if( state.bets.length == 0) { return 0 }
          return Math.round(state.bets.map(el => el.stake * el.odd.value).reduce((a, b) => +a + +b, '')) || 0
        }
    }
}
