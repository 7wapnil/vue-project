/**
 * Betslip store module
 */
export default {
    state: {
        bets: [],
        submitted: false
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
                state.bets.push({
                  odd: odd,
                  stake: 0,
                  frozen: false,
                  approvedValue: odd.value
                })
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
        resetBetslipStakes (state) {
          state.bets.forEach(function(bet){
            bet.stake = 0
          })
        },
        cleanBetslip (state) {
          state.bets = []
        },
        freezeBets (state) {
          state.bets = state.bets.map((bet) => {
            bet.frozen = true
            return bet
          })
        },
        setBetslipAsSubmitted(state){
          state.submitted = true
        }
    },
    getters: {
        isBetslipSubmitted(state){
          return state.submitted
        },
        getBets(state) {
            return state.bets
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
