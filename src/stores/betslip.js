/**
 * Betslip store module
 */

import Bet from '@/models/bet'
import graphqlClient from '@/libs/apollo/'
import { BETSLIP_PLACEMENT_QUERY } from '@/graphql/index'

const mockMarketsArray = [
  {
    odds: [
      {
        id: '3897271',
        name: 'Hv 71',
        status: 'active',
        value: 2.79
      }, {
        id: '3905832',
        name: 'Hv 71',
        status: 'active',
        value: 2.03
      },
      {
        id: '8392981',
        name: 'Hv 71',
        status: 'active',
        value: 2.03
      }
    ]
  },
  {
    odds: [
      {
        id: '8392981',
        name: 'Hv 71',
        status: 'active',
        value: 2.03
      }, {
        id: '3905831',
        name: 'Hv 71',
        status: 'active',
        value: 2.03
      },
      {
        id: '3897273',
        name: 'Hv 71',
        status: 'active',
        value: 2.03
      }
    ]
  }
]

const getBetsFromStorage = () => {
  const json = localStorage.getItem('bets')
  if (!json) {
    return []
  }

  return JSON.parse(json).map((betAttributes) => {
    return new Bet(betAttributes)
  })
}

const setBetsToStorage = (bets) => {
  localStorage.setItem('bets', JSON.stringify(bets))
}

export const mutations = {
  updateOdds (state, markets) {
    markets = mockMarketsArray
    markets.forEach(function getOdds (market) {
      market.odds.forEach(function (odd) {
        let bet = state.bets.find(el => el.oddId === odd.id)
        if (!bet) return

        Object.assign(bet, {
          currentOddValue: odd.value
        })

        if (state.acceptAll) {
          Object.assign(bet, {
            approvedOddValue: odd.value
          })
        }
        setBetsToStorage(state.bets)
      })
    })
  },
  updateBet (state, { oddId, payload }) {
    let bet = state.bets.find(el => el.oddId === oddId)
    if (!bet) return
    bet = Object.assign(bet, payload)
    setBetsToStorage(state.bets)
  },
  setBetStake (state, { oddId, stakeValue }) {
    let bet = state.bets.find(bet => bet.oddId === oddId)
    if (!bet) { return }
    bet.stake = stakeValue
    setBetsToStorage(state.bets)
  },
  removeBetFromBetslip (state, oddId) {
    state.bets = state.bets.filter(e => e.oddId !== oddId)
    setBetsToStorage(state.bets)
  },
  resetBetslipStakes (state) {
    state.bets.forEach(function (bet) {
      bet.stake = 0
    })
    setBetsToStorage(state.bets)
  },
  clearBetslip (state) {
    state.bets = []
    setBetsToStorage(state.bets)
  },
  freezeBets (state) {
    state.bets = state.bets.map((bet) => {
      bet.status = Bet.statuses.submitting
      return bet
    })
    setBetsToStorage(state.bets)
  },
  updateAcceptAll (state, acceptValue) {
    state.acceptAll = acceptValue
  }
}

export const getters = {
  betslipSubmittable: (state, getters, rootState, rootGetters) => {
    const activeWallet = rootGetters['wallets/activeWallet']
    if (activeWallet === undefined) {
      return false
    }
    let enabled = false

    if (getters.betslipValuesConfirmed &&
      getters.getTotalStakes > 0 &&
      getters.getTotalStakes <= activeWallet.amount
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
  acceptAllChecked (state) {
    return state.acceptAll
  },
  getBetsMarketIds(state) {
    return state.bets.map(x => x.marketId)
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
  },
}

export const actions = {
  pushBet ({ state }, { event, market, odd }) {
    if (state.bets.find(bet => bet.oddId === odd.id)) { return }
    state.bets.push(Bet.initial(event, market, odd))
    setBetsToStorage(state.bets)
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
    bets: getBetsFromStorage(),
    acceptAll: false
  },
  actions,
  mutations,
  getters
}
