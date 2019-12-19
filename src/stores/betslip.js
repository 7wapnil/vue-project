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
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import VueLogger from 'vuejs-logger'
import { MESSAGE_SUCCESS, SUCCESS, DANGER } from '@/constants/betslip-messages'

const BET_DESTROY_TIMEOUT = 3000

const isProduction = process.env.NODE_ENV === 'production'
Vue.use(VueLogger, { logLevel: isProduction ? 'error' : 'debug' })

const getFieldFromStorage = (fieldName, defaultValue) => {
  const rawData = localStorage.getItem(fieldName)

  if (!rawData) return defaultValue

  try {
    return JSON.parse(rawData)
  } catch (error) {
    return rawData
  }
}

const setFieldToStorage = (fieldName, value, context = {}) => {
  const item = context.array ? JSON.stringify(value) : value

  localStorage.setItem(fieldName, item)
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
    setFieldToStorage('bets', state.bets, { array: true })
  },
  setBetStake (state, { oddId, stakeValue }) {
    let bet = state.bets.find(bet => bet.oddId === oddId)
    if (!bet) { return }
    bet.stake = stakeValue
    setFieldToStorage('bets', state.bets, { array: true })
  },
  clearBets (state) {
    state.bets = []
    setFieldToStorage('bets', state.bets, { array: true })
  },
  setBetStatusAsSubmitted (state) {
    state.bets = state.bets.map((bet) => {
      bet.status = Bet.statuses.submitted
      return bet
    })
    setFieldToStorage('bets', state.bets, { array: true })
  },
  setAcceptAll (state, value) {
    state.acceptAll = value
    setFieldToStorage('acceptAllOddsChanges', value)
  },
  toggleBetslip (state) {
    state.betslipSidebarState = !state.betslipSidebarState
  },
  setComboBetsMode (state, { enabled }) {
    state.isComboBetsMode = enabled

    setFieldToStorage('isComboBetsMode', enabled)
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
    setFieldToStorage('bets', state.bets, { array: true })
  },
  cleanBetErrors (state) {
    state.bets.forEach((bet) => {
      if (!bet.hasFailureStatus) return

      Object.assign(bet, { status: INITIAL, message: null, success: null })
    })
    setFieldToStorage('bets', state.bets, { array: true })

    state.validationMessages = []
    setFieldToStorage('betslipValidationMessages', state.validationMessages, { array: true })
  },
  startValidation (state) {
    state.validating = true
  },
  finishValidation (state) {
    state.validating = false
  },
  setValidationMessages (state, { messages }) {
    state.validationMessages = messages || []
    setFieldToStorage('betslipValidationMessages', state.validationMessages, { array: true })
  },
  clearBetIds (state) {
    state.bets.forEach((bet) => Object.assign(bet, { id: null }))
    setFieldToStorage('bets', state.bets, { array: true })
  },
  updateBetslipMessages (state, { messages, variant }) {
    state.betslipMessages = messages
    setFieldToStorage('betslipMessages', state.betslipMessages, { array: true })

    state.betslipMessageVariant = variant
    setFieldToStorage('betslipMessageVariant', state.betslipMessageVariant)
  },
  clearBetslipMessages (state) {
    state.betslipMessages = []
    setFieldToStorage('betslipMessages', [], { array: true })

    state.betslipMessageVariant = null
    setFieldToStorage('betslipMessageVariant', null)
  },
  setBetslipStake (state, stake) {
    state.betslipStake = stake
    setFieldToStorage('betslipStake', state.betslipStake)
  },
  clearBetslipStake (state) {
    state.betslipStake = null
    setFieldToStorage('betslipStake', null)
  },
  setKeepAllSelections (state, value) {
    state.keepAllSelections = value
    setFieldToStorage('keepAllSelections', value)
  },
  resetBet (state, oddId) {
    let bet = state.bets.find(el => el.oddId === oddId)

    if (!bet) return

    bet = Object.assign(bet, {
      id: null,
      status: Bet.statuses.initial,
      message: null,
      success: null
    })
    setFieldToStorage('bets', state.bets, { array: true })
  },
  clearCheckboxes (state) {
    state.acceptAll = false
    setFieldToStorage('acceptAllOddsChanges', state.acceptAll)

    state.keepAllSelections = false
    setFieldToStorage('keepAllSelections', state.keepAllSelections)
  }
}

export const getters = {
  betslipSubmittable: (state, getters) => {
    let enabled = false
    if (getters.betslipValuesConfirmed &&
      getters.getIsEnoughFundsToBet &&
      getters.getTotalStakes > 0 &&
      !getters.hasInactiveBets &&
      !getters.getAnyEmptyStake &&
      getters.getAllBetsAcceptable
    ) {
      enabled = true
    }

    return enabled
  },
  betslipComboSubmittable: (state, getters) => {
    return getters.betslipValuesConfirmed &&
      !getters.hasInactiveBets &&
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
    return state.acceptAll || !state.bets.some((bet) => bet.oddsChanged)
  },
  getBets (state) {
    return state.bets
  },
  getPlacedBetIds (state) {
    const list = state.bets.map((item) => item.id).filter((item) => item)

    return [...new Set(list)]
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
  hasInactiveBets (state) {
    return state.bets.some(bet => !(bet.eventEnabled && bet.marketEnabled && bet.oddEnabled))
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
  hasAnyFrozenBet (state) {
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
  },
  getValidationMessages (state) {
    return state.validationMessages || []
  },
  hasValidationMessages (state) {
    return state.validationMessages && state.validationMessages.length
  },
  getBetslipMessageObject (state) {
    return {
      text: state.betslipMessages.join('\r\n'),
      variant: state.betslipMessageVariant
    }
  },
  getBetslipMessageVariant (state) {
    return state.betslipMessageVariant
  },
  hasBetslipMessages (state) {
    return !!(state.betslipMessageVariant && state.betslipMessages.length)
  },
  getBetslipStake (state) {
    return state.betslipStake
  },
  getBetslipStakeFloat (state) {
    return state.betslipStake ? Number(state.betslipStake) : 0.0
  },
  keepAllSelectionsChecked (state) {
    return state.keepAllSelections
  }
}

export const actions = {
  subscribeBets ({ dispatch, getters }) {
    getters
      .getPlacedBetIds
      .forEach(betId => dispatch('subscribeBet', betId))
  },
  subscribeBet ({ state, commit, dispatch, getters }, betId) {
    state.subscriptions[betId] = graphqlClient
      .subscribe({
        query: BET_UPDATED,
        variables: { id: betId }
      })
      .subscribe({
        next ({ data: { betUpdated } }) {
          const betLegs = betUpdated.betLegs || []

          betLegs.forEach(betLeg => {
            let betItemPayload = {
              status: betUpdated.status,
              eventEnabled: betLeg.eventEnabled,
              marketStatus: betLeg.marketStatus,
              marketVisible: betLeg.marketVisible,
              marketEnabled: betLeg.marketEnabled,
              oddEnabled: betLeg.oddEnabled
            }

            if (state.isComboBetsMode) {
              Object.assign(betItemPayload, {
                notificationCode: betLeg.notificationCode,
                message: betLeg.message
              })
            } else {
              Object.assign(betItemPayload, {
                notificationCode: betUpdated.notificationCode,
                message: betUpdated.message
              })
            }

            commit('updateBet', { oddId: betLeg.oddId, payload: betItemPayload })
          })

          if (state.isComboBetsMode) dispatch('updateBetslipMessagesForComboBets', betUpdated)

          dispatch('removeAcceptedBet', betUpdated)
        },
        error (error) {
          Vue.$log.error(error)
        }
      })

    Vue.$log.debug(`Subscribed bet ID ${betId}`)
  },
  removeAcceptedBet ({ state, dispatch }, { betLegs, status }) {
    if (status !== Bet.statuses.accepted) return

    betLegs.forEach(betLeg => {
      setTimeout(() => {
        if (state.keepAllSelections) {
          dispatch('resetBetInBetslip', betLeg.oddId)
        } else {
          dispatch('removeBetFromBetslip', betLeg.oddId)
        }
      }, BET_DESTROY_TIMEOUT)
    })
  },
  unsubscribeBet ({ state }, bet) {
    if (state.subscriptions[bet.id]) {
      state.subscriptions[bet.id].unsubscribe()
      delete state.subscriptions[bet.id]
      Vue.$log.debug(`Unsubscribed bet ID ${bet.id}`)
    }
  },
  unsubscribeBets ({ dispatch, state }) {
    state.bets.forEach(bet => dispatch('unsubscribeBet', bet))
  },
  pushBet ({ dispatch, state }, { event, market, odd }) {
    if (state.bets.find(bet => bet.oddId === odd.id)) return
    const betSameMarket = state.bets.find(bet => bet.marketId === market.id)
    if (betSameMarket) dispatch('removeBetFromBetslip', betSameMarket.oddId)

    state.bets.push(Bet.initial(event, market, odd))
    setFieldToStorage('bets', state.bets, { array: true })
    dispatch('validateBets')
  },
  removeBetFromBetslip ({ dispatch, commit, state }, oddId) {
    const foundBet = state.bets.find(e => e.oddId === oddId) || {}

    state.bets = state.bets.filter(e => e.oddId !== oddId)
    setFieldToStorage('bets', state.bets, { array: true })

    dispatch('unsubscribeBet', foundBet)
    dispatch('validateBets')

    if (!state.bets.length) {
      commit('clearBetslipMessages')
      commit('clearBetslipStake')
      commit('clearCheckboxes')
    }
  },
  placeBets ({ commit, state }, payload) {
    commit('clearBetslipMessages')

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
            const betItem = state.bets.find(item => item.oddId === betLeg.oddId)

            bet.oddId = betLeg.oddId

            commit('updateBet', {
              oddId: bet.oddId,
              payload: {
                message: bet.message,
                status: bet.status !== INITIAL ? bet.status : betItem.status,
                eventEnabled: betLeg.eventEnabled,
                marketStatus: betLeg.marketStatus,
                marketVisible: betLeg.marketVisible,
                marketEnabled: betLeg.marketEnabled,
                oddEnabled: betLeg.oddEnabled
              }
            })
          })

          if (state.isComboBetsMode) dispatch('updateBetslipMessagesForComboBets', bet)

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
    commit('cleanBetErrors')
    commit('clearBetslipMessages')
    commit('startValidation')

    graphqlClient
      .query({
        query: BETSLIP_VALIDATE_COMBO_BETS_QUERY,
        variables: { odds: getters.getOddIds },
        fetchPolicy: NETWORK_ONLY
      })
      .then(({ data }) => {
        const response = data.validateComboBets

        commit('setValidationMessages', { messages: response.generalMessages })
        response.odds.forEach((oddResponse) => commit('updateBetAfterValidation', oddResponse))
        commit('finishValidation')
      })
  },
  validateSingleBets ({ commit }) {
    commit('cleanBetErrors')
    commit('finishValidation')
  },
  updateComboBetsMode ({ dispatch, commit, state }, { enabled }) {
    commit('clearBetIds')
    commit('clearBetslipMessages')
    commit('setComboBetsMode', { enabled })
    dispatch('validateBets')
  },
  updateBetslipMessagesForComboBets ({ commit, state }, bet) {
    if (bet.status === Bet.statuses.accepted || bet.status === Bet.statuses.settled) {
      commit('updateBetslipMessages', { messages: [MESSAGE_SUCCESS], variant: SUCCESS })
    } else {
      if (bet.message) commit('updateBetslipMessages', { messages: [bet.message], variant: DANGER })
    }
  },
  clearBetslip ({ dispatch, commit }) {
    dispatch('unsubscribeBets')

    commit('clearBets')
    commit('clearBetslipMessages')
    commit('clearBetslipStake')
    commit('clearCheckboxes')
  },
  resetBetInBetslip ({ commit, state }, oddId, areMessagesCleared) {
    commit('resetBet', oddId)

    if (areMessagesCleared || state.bets.every(bet => bet.status === Bet.statuses.initial)) {
      commit('clearBetslipMessages')
    }
  }
}

export default {
  namespaced: true,
  state: {
    validating: false,
    bets: getFieldFromStorage('bets', []).map((betAttributes) => new Bet(betAttributes)),
    acceptAll: getFieldFromStorage('acceptAllOddsChanges', false),
    keepAllSelections: getFieldFromStorage('keepAllSelections', false),
    subscriptions: {},
    betslipSidebarState: false,
    validationMessages: getFieldFromStorage('betslipValidationMessages', []),
    isComboBetsMode: getFieldFromStorage('isComboBetsMode', false),
    betslipMessages: getFieldFromStorage('betslipMessages', []),
    betslipMessageVariant: getFieldFromStorage('betslipMessageVariant'),
    betslipStake: getFieldFromStorage('betslipStake')
  },
  actions,
  mutations,
  getters
}
