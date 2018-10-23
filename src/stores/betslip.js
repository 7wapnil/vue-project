/**
 * Betslip store module
 */

import Bet from '@/models/bet'

import graphqlClient from '@/libs/apollo'
import { BETSLIP_PLACEMENT_QUERY } from './queries/betslip'

export const mutations = {
  updateBet (state, { oddId, payload }) {
    let bet = state.bets.find(el => el.oddId === oddId)
    if (!bet) return
    bet = Object.assign(bet, payload)
  },
  setBetStake (state, { oddId, stakeValue }) {
    let bet = state.bets.find(bet => bet.oddId === oddId)
    if (!bet) { return }
    bet.stake = stakeValue
  },
  removeBetFromBetslip (state, oddId) {
    state.bets = state.bets.filter(e => e.oddId !== oddId)
  },
  resetBetslipStakes (state) {
    state.bets.forEach(function (bet) {
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
}

export const getters = {
  betslipSubmittable: (state, getters, rootState, rootGetters) => {
    const activeWallet = rootGetters.getActiveWallet
    if (activeWallet === undefined) {
      return false
    }
    let enabled = false

    if (getters.betslipValuesConfirmed &&
      getters.getTotalStakes > 0 &&
      getters.getTotalStakes <= activeWallet.amount &&
      getters.anyInitialBet
    ) {
      enabled = true
    }
    return enabled
  },
  betslipValuesConfirmed: (state) => {
    const betWithUnconfirmedValue = state.bets.find((bet) => {
      return bet.currentOddValue !== bet.approvedOddValue
    })
    return (betWithUnconfirmedValue === undefined)
  },
  getBets (state) {
    return state.bets
  },
  anyInitialBet (state) {
    return state.bets.some((bet) => {
      return bet.status === Bet.statuses.initial
    })
  },
  getBetsCount (state) {
    return state.bets.length
  },
  getTotalStakes (state) {
    return state.bets.map(el => el.stake > 0 ? el.stake : 0).reduce((a, b) => +a + +b, 0)
  },
  getTotalReturn (state) {
    return state.bets.map(el => (el.stake > 0 ? el.stake : 0) * el.approvedOddValue).reduce((a, b) => +a + +b, 0)
  }
}

export const actions = {
  pushBet ({ state }, { event, market, odd }) {
    if (state.bets.find(bet => bet.oddId === odd.id)) { return }
    state.bets.push(Bet.initial(event, market, odd))
  },
  placeBets (context, betsPayload) {
    return graphqlClient.mutate({
      mutation: BETSLIP_PLACEMENT_QUERY,
      variables: {
        bets: betsPayload
      }
    })
  }
}

export default {
  namespaced: true,
  state: {
    bets: []
  },
  actions,
  mutations,
  getters
}
