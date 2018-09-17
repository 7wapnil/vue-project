/**
 * Events store module
 */

import graphqlClient, { updateCache } from '@/libs/apollo'
import { LOAD_MARKETS_QUERY, LOAD_MARKET_BY_ID } from './queries'

export default {
  loadList: async function ({ commit }, options = {}) {
    return graphqlClient.query({
      query: LOAD_MARKETS_QUERY,
      ...options
    }).then(({ data: { markets } }) => {
      commit('setMarkets', markets)
    })
  },
  loadOne (ctx, options = {}) {
    return graphqlClient.query({
      query: LOAD_MARKET_BY_ID,
      ...options
    })
  },
  addMarket ({ dispatch, commit }, { variables, id }) {
    const query = {
      query: LOAD_MARKETS_QUERY,
      variables
    }

    return dispatch('loadOne', {
      variables: { id },
      fetchPolicy: 'network-only'
    }).then(({ data: { market } }) => {
      if (market) {
        updateCache(query, (cache) => {
          cache.markets.push({
            ...market,
            __typename: 'Market'
          })
          commit('setMarkets', cache.markets)
        })
      }
    })
  },
  updateMarket ({ commit, dispatch }, { variables, id, changes }) {
    updateCache({
      query: LOAD_MARKETS_QUERY,
      variables
    }, (cache) => {
      Object.assign(cache.markets.find(market => market.id === id), changes)
      commit('setMarkets', cache.markets)
    })
  }
}
