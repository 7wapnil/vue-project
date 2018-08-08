/**
 * Betslip store module
 */
export default {
    state: {
        bets: []
    },
    actions: {
        addOddtoBetslip (context, odd) {
            context.commit('pushOddToBetslip', odd)
        }
    },
    mutations: {
        pushOddToBetslip (state, odd) {
            let exists = state.bets.find(bet => bet.odd.id == odd.id )
            if(exists == undefined) {
                state.bets.push({odd: odd, stake: 0})
            }
        }
    },
    getters: {
        getBets (state) {
            return state.bets
        }
    }
}
