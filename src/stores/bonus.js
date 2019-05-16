import { BONUSES_LIST_QUERY } from '@/graphql'
import graphqlClient from '@/libs/apollo/'

export const STORE_BONUSES = 'STORE_BONUSES'
export const SET_MAIN_BONUS = 'SET_MAIN_BONUS'
export const CLEAR_BONUSES = 'CLEAR_BONUSES'

const getters = {
  getMainBonus (state) {
    return state.mainBonus
  },
  getBonuses (state) {
    return state.bonuses
  },
  getCurrentBonusValue (state) {
    if (state.mainBonus) {
      return state.mainBonus.rollover_initial_value - state.mainBonus.rollover_balance
    }
  },
  getMainBonusPercentageValue: (state, getters) => {
    if (state.mainBonus) {
      return (getters.getCurrentBonusValue / state.mainBonus.rollover_initial_value) * 100
    }
  }
}

const mutations = {
  [STORE_BONUSES] (state, bonuses) {
    state.bonuses = bonuses
  },
  [SET_MAIN_BONUS] (state) {
    state.mainBonus = state.bonuses.find((bonus) => bonus.status === 'active') || state.bonuses[0]
  },
  [CLEAR_BONUSES] (state) {
    state.mainBonus = null
    state.bonuses = null
  }
}

const actions = {
  fetchBonuses: async function ({ commit }) {
    const { data: { customer_bonuses: customerBonuses } } = await graphqlClient.query({
      query: BONUSES_LIST_QUERY
    })

    commit(STORE_BONUSES, customerBonuses)

    if (customerBonuses.length) {
      commit(SET_MAIN_BONUS)
    }
  }
}

export default {
  namespaced: true,
  state: {
    mainBonus: null,
    bonuses: null
  },
  mutations,
  getters,
  actions
}
