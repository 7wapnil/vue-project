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
import { REJECTED, CONFLICTED } from '@/constants/bet-fail-statuses'
import { INITIAL } from '@/constants/bet-ok-statuses'
import {
  BETSLIP_PLACEMENT_QUERY,
  BETSLIP_PLACEMENT_COMBO_QUERY,
  BETSLIP_BETS_QUERY,
  BET_UPDATED,
  BETSLIP_VALIDATE_COMBO_BETS_QUERY
} from '@/graphql'
import { ACTIVE_STATUS } from '@/models/market'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import VueLogger from 'vuejs-logger'

const BET_DESTROY_TIMEOUT = 3000

const isProduction = process.env.NODE_ENV === 'production'
Vue.use(VueLogger, { logLevel: isProduction ? 'error' : 'debug' })

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

const getBettingModeFromStorage = () => {
  const rawData = localStorage.getItem('isComboBetsMode')

  return rawData ? JSON.parse(rawData) : false
}

const setBettingModeToStorage = (isComboBetsMode) => {
  localStorage.setItem('isComboBetsMode', isComboBetsMode)
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
  },
  setComboBetsMode (state, { enabled }) {
    state.isComboBetsMode = enabled

    setBettingModeToStorage(enabled)
  },
  updateBetAfterValidation (state, { oddId, valid, errorMessages }) {
    let bet = state.bets.find(el => el.oddId === oddId)
    if (!bet) return

    let attributes = {}

    if (valid) {
      attributes = { status: INITIAL, message: null, success: null }
    } else {
      attributes = { status: CONFLICTED, message: errorMessages.join('</br>'), success: false }
    }

    bet = Object.assign(bet, attributes)
    setBetsToStorage(state.bets)
  },
  cleanBetErrors (state) {
    state.bets.forEach((bet) => {
      if (!bet.hasFailureStatus) return

      Object.assign(bet, { status: INITIAL, message: null, success: null })
    })
    setBetsToStorage(state.bets)
  },
  startValidation (state) {
    state.validating = true
  },
  finishValidation (state) {
    state.validating = false
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
      !getters.anyConflictedBets &&
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
  getOddIds (state) {
    return state.bets.map((bet) => bet.oddId)
  },
  acceptAllChecked (state) {
    return state.acceptAll
  },
  getBetsCount (state) {
    return state.bets.length
  },
  getTotalStakes (state) {
    return state
      .bets
      .map(el => el.stake > 0 ? el.stake : 0)
      .reduce((a, b) => Number(a) + Number(b), 0)
  },
  getTotalReturn (state) {
    return state
      .bets
      .map(el => (el.stake > 0 ? el.stake : 0) * el.approvedOddValue)
      .reduce((a, b) => Number(a) + Number(b), 0)
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
  },
  isComboBetsMode (state) {
    return state.isComboBetsMode
  },
  anyConflictedBets (state) {
    return state.bets.filter((bet) => bet.status === CONFLICTED).length > 0
  },
  isValidating (state) {
    return state.validating
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
  removeAcceptedBet ({ state, commit, dispatch }, { betLegs, status }) {
    if (status !== Bet.statuses.accepted) return

    betLegs.forEach(betLeg => {
      setTimeout(() => { dispatch('removeBetFromBetslip', betLeg.oddId) }, BET_DESTROY_TIMEOUT)
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
  pushBet ({ dispatch, state }, { event, market, odd }) {
    if (state.bets.find(bet => bet.oddId === odd.id)) { return }
    state.bets.push(Bet.initial(event, market, odd))
    setBetsToStorage(state.bets)
    dispatch('validateBets')
  },
  removeBetFromBetslip ({ dispatch, state }, oddId) {
    state.bets = state.bets.filter(e => e.oddId !== oddId)
    setBetsToStorage(state.bets)
    dispatch('validateBets')
  },
  placeBets ({ state }, payload) {
    if (state.isComboBetsMode) {
      return graphqlClient.mutate({
        mutation: BETSLIP_PLACEMENT_COMBO_QUERY,
        variables: { bet: payload }
      })
    } else {
      return graphqlClient.mutate({
        mutation: BETSLIP_PLACEMENT_QUERY,
        variables: { bets: payload }
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
  },
  validateBets ({ dispatch, commit, state }) {
    commit('startValidation')

    if (state.isComboBetsMode) {
      dispatch('validateComboBets')
    } else {
      dispatch('validateSingleBets')
    }
  },
  validateComboBets ({ commit, getters }) {
    commit('startValidation')

    graphqlClient
      .query({
        query: BETSLIP_VALIDATE_COMBO_BETS_QUERY,
        variables: { odds: getters.getOddIds },
        fetchPolicy: NETWORK_ONLY
      })
      .then(({ data }) => {
        const odds = data.validateComboBets

        odds.forEach((oddResponse) => commit('updateBetAfterValidation', oddResponse))
        commit('finishValidation')
      })
  },
  validateSingleBets ({ commit }) {
    commit('cleanBetErrors')
    commit('finishValidation')
  },
  updateComboBetsMode ({ dispatch, commit, state }, { enabled }) {
    commit('setComboBetsMode', { enabled })
    dispatch('validateBets')
  },
}

export default {
  namespaced: true,
  state: {
    validating: false,
    bets: getBetsFromStorage(),
    acceptAll: false,
    subscriptions: {},
    betslipSidebarState: false,
    isComboBetsMode: getBettingModeFromStorage()
  },
  actions,
  mutations,
  getters
}
