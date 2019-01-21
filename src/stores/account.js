import graphqlClient from '@/libs/apollo/'
import { DEPOSIT_FUNDS_MUTATION, CALCULATE_BONUS } from '@/graphql/account'

/**
 * Account store module
 */
export default {
  state: {
    deposit: null,
    tab: null
  },
  // placeholders, not a real functionality
  actions: {
    submitDepositFunds (context, depositData) {
      const response = graphqlClient.mutate({
        mutation: DEPOSIT_FUNDS_MUTATION,
        variables: {
          input: depositData
        }
      })
      return response
    },
    calculateBonus (context, bonusData) {
      const response = graphqlClient.mutate({
        query: CALCULATE_BONUS,
        variables: {
          input: bonusData
        }
      })
      return response
    }
  },
  mutations: {
  },
  getters: {
  }
}
