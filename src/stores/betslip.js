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
import { ODDS_TOO_HIGH_ERROR } from '@/constants/notification-codes'
import { REJECTED } from '@/constants/bet-fail-statuses'
import { INITIAL } from '@/constants/bet-ok-statuses'
import { BETSLIP_PLACEMENT_QUERY, BETSLIP_PLACEMENT_COMBO_QUERY, BETSLIP_BETS_QUERY, BET_UPDATED } from '@/graphql/index'
import { ACTIVE_STATUS } from '@/models/market'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import VueLogger from 'vuejs-logger'

const BET_DESTROY_TIMEOUT = 3000

const isProduction = process.env.NODE_ENV === 'production'
Vue.use(VueLogger, {
  logLevel: isProduction ? 'error' : 'debug'
})

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

    if (payload.status === REJECTED && payload.notificationCode === ODDS_TOO_HIGH_ERROR && bet.oddsChanged) {
      payload.status = INITIAL
      Vue.$log.debug(`Got status "rejected" when odds has been changed, "Accept new odds" block will be shown instead
        of an error`)
    }

    Vue.$log.debug(`Update bet ID = ${bet.id}, eventName = ${bet.eventName}, marketName = ${bet.marketName},
      oddName = ${bet.oddName}, status = ${bet.status}, new data:`, payload)
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
  betslipComboSubmittable: (state, getters) => {
    return getters.betslipValuesConfirmed &&
      !getters.getAnyInactiveMarket &&
      getters.getAllBetsAcceptable &&
      getters.getBets.length > 1
  },
  getIsEnoughFundsToBet: (state, getters, rootState, rootGetters) => {
    const activeWallet = rootGetters['getUserActiveWallet']
    if (activeWallet === null) {
      return false
    }

    return getters.getTotalStakes <= activeWallet.amount
  },
  getFundsToBet: (state, getters, rootState, rootGetters) => {
    const activeWallet = rootGetters['getUserActiveWallet']
    if (activeWallet === null) {
      return false
    }

    return activeWallet.amount
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
  },
  placingBetInProgress (state, getters) {
    return getters.getAnySubmittedBet || getters.getAnyBetInValidation
  }
}

export const actions = {
  subscribeBets ({ dispatch, getters }) {
    const bets = getters.getBets

    bets
      .filter(bet => !!bet.id)
      .filter((bet, index) => bets.findIndex(savedBet => savedBet['id'] === bet['id']) === index)
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
              notificationCode: betUpdated.notificationCode,
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
  removeAcceptedBet ({ state, commit }, { betLegs, status }) {
    if (status !== Bet.statuses.accepted) return

    betLegs.forEach(betLeg => {
      setTimeout(() => { commit('removeBetFromBetslip', betLeg.oddId) }, BET_DESTROY_TIMEOUT)
    })
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
  placeBets (context, { payload, isCombo }) {
    if (isCombo) {
      return graphqlClient.mutate({
        mutation: BETSLIP_PLACEMENT_COMBO_QUERY,
        variables: {
          bet: payload
        }
      })
    } else {
      return graphqlClient.mutate({
        mutation: BETSLIP_PLACEMENT_QUERY,
        variables: {
          bets: payload
        }
      })
    }
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
          const betLegs = bet.betLegs || []

          betLegs.forEach((betLeg) => {
            bet.oddId = betLeg.oddId

            commit('updateBet', {
              oddId: bet.oddId,
              payload: {
                status: bet.status,
                message: bet.message
              }
            })
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
