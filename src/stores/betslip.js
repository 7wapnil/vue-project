/**
 * Betslip store module
 */
import Vue from 'vue'
import Bet from '@/models/bet'
import graphqlClient from '@/libs/apollo/client'
import {
  SENT_TO_INTERNAL_VALIDATION,
  VALIDATED_INTERNALLY,
  SENT_TO_EXTERNAL_VALIDATION
} from '@/constants/bet-pending-statuses'
import { BETSLIP_PLACEMENT_QUERY, BETSLIP_BETS_QUERY, BET_UPDATED } from '@/graphql/index'
import { ACTIVE_STATUS } from '@/models/market'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

const BET_DESTROY_TIMEOUT = 3000

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
  clearBetslip (state) {
    state.bets = []
    setBetsToStorage(state.bets)
  },
  setBetStatusAsSubmitted (state) {
    state.bets = state.bets.map((bet) => {
      bet.status = Bet.statuses.submitted
      return bet
    })
    setBetsToStorage(state.bets)
  },
  updateAcceptAll (state, acceptValue) {
    state.acceptAll = acceptValue
  },
  toggleBetslip (state) {
    state.betslipSidebarState = !state.betslipSidebarState
  }
}

export const getters = {
  betslipSubmittable: (state, getters) => {
    let enabled = false
    if (getters.betslipValuesConfirmed &&
      getters.getIsEnoughFundsToBet &&
      getters.getTotalStakes > 0 &&
      !getters.getAnyInactiveMarket &&
      !getters.getAnyEmptyStake &&
      getters.getAllBetsAcceptable
    ) {
      enabled = true
    }

    return enabled
  },
  getIsEnoughFundsToBet: (state, getters, rootState, rootGetters) => {
    const activeWallet = rootGetters['getUserActiveWallet']
    if (activeWallet === null) {
      return false
    }

    return getters.getTotalStakes <= activeWallet.amount
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
  getPlacedBetIds (state) {
    return state.bets.map((item) => item.id).filter((item) => item)
  },
  acceptAllChecked (state) {
    return state.acceptAll
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
  getAnyInactiveMarket (state) {
    return state.bets.some((bet) => {
      return bet.marketStatus !== ACTIVE_STATUS
    })
  },
  getAnyEmptyStake (state) {
    return state.bets.some((bet) => {
      return bet.stake === 0 || bet.stake === null
    })
  },
  getAnyBetInValidation (state) {
    return state.bets.some((bet) => {
      return [SENT_TO_INTERNAL_VALIDATION,
        VALIDATED_INTERNALLY,
        SENT_TO_EXTERNAL_VALIDATION].includes(bet.status)
    })
  },
  getAnySubmittedBet (state) {
    return state.bets.some((bet) => {
      return bet.status === Bet.statuses.submitted
    })
  },
  getAnyFrozenBet (state) {
    return state.bets.some((bet) => bet.frozen)
  },
  getAllBetsAcceptable (state) {
    return !(state.bets.length) || state.bets.every((bet) => bet.isAcceptable)
  },
  isBetslipOpen (state) {
    return state.betslipSidebarState
  }
}

export const actions = {
  subscribeBets ({ dispatch, getters }) {
    getters
      .getBets
      .filter(bet => !!bet.id)
      .forEach(bet => dispatch('subscribeBet', bet))
  },
  subscribeBet ({ state, commit, dispatch, getters }, bet) {
    state.subscriptions[bet.id] = graphqlClient
      .subscribe({
        query: BET_UPDATED,
        variables: { id: bet.id }
      })
      .subscribe({
        next ({ data: { betUpdated } }) {
          betUpdated.oddId = bet.oddId

          commit('updateBet', {
            oddId: bet.oddId,
            payload: {
              status: betUpdated.status,
              message: betUpdated.message
            }
          })

          dispatch('removeAcceptedBet', betUpdated)
        },
        error (error) {
          Vue.$log.error(error)
        }
      })

    Vue.$log.debug(`Subscribed bet ID ${bet.id}`)
  },
  removeAcceptedBet ({ state, commit }, { oddId, status }) {
    if (status !== Bet.statuses.accepted) return

    setTimeout(() => { commit('removeBetFromBetslip', oddId) }, BET_DESTROY_TIMEOUT)
  },
  unsubscribeBet ({ state }, bet) {
    if (state.subscriptions[bet.id]) {
      state.subscriptions[bet.id].unsubscribe()
      delete state.subscriptions[bet.id]
      Vue.$log.debug(`Unsubscribed bet ID ${bet.id}`)
    }
  },
  unsubscribeBets ({ dispatch, getters }) {
    getters.getBets.forEach(bet => dispatch('unsubscribeBet', bet))
  },
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
  },
  refreshBetslip ({ state, commit, getters, dispatch }) {
    const ids = getters.getPlacedBetIds
    const idsCount = ids ? ids.length : 0

    if (!idsCount) return

    return graphqlClient
      .query({
        query: BETSLIP_BETS_QUERY,
        variables: { ids: ids, perPage: idsCount },
        fetchPolicy: NETWORK_ONLY
      })
      .then(({ data: { bets: { collection } } }) => {
        collection.forEach((bet) => {
          bet.oddId = bet.odd.id

          commit('updateBet', {
            oddId: bet.oddId,
            payload: {
              status: bet.status,
              message: bet.message
            }
          })

          dispatch('removeAcceptedBet', bet)
        })
      })
  }
}

export default {
  namespaced: true,
  state: {
    bets: getBetsFromStorage(),
    acceptAll: false,
    subscriptions: {},
    betslipSidebarState: false
  },
  actions,
  mutations,
  getters
}
