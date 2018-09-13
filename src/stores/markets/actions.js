/**
 * Events store module
 */

import graphqlClient from '@/libs/apollo'
import { LOAD_MARKETS_QUERY } from './queries'

export default {
  loadList: async function ({ commit }, variables) {
    return graphqlClient.query({
      query: LOAD_MARKETS_QUERY,
      variables: variables
    })
  }
}
