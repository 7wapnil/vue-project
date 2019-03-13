import gql from 'graphql-tag'

export const BONUS_CALCULATION_MUTATION = gql`
        mutation deposit_bonus($amount: Float!, $code: String!) {
          deposit_bonus(amount: $amount, code: $code) {
            bonus
            real_money
          }
        }
      `
