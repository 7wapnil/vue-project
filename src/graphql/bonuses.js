import gql from 'graphql-tag'

export const BONUS_CALCULATION_MUTATION = gql`
        mutation deposit_bonus($amount: Float!, $code: String!) {
          deposit_bonus(amount: $amount, code: $code) {
            bonus
            real_money
          }
        }
      `

export const BONUSES_LIST_QUERY = gql`
  query customer_bonuses {
    customer_bonuses {
      id
      code
      expires_at
      valid_for_days
      rollover_balance
      rollover_initial_value
      max_rollover_per_bet
      min_odds_per_bet
      status
    }
  }
`
