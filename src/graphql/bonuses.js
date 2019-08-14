import gql from 'graphql-tag'

export const BONUS_CALCULATION_MUTATION = gql`
        mutation depositBonus($amount: Float!, $code: String!, $currencyCode: String!) {
          depositBonus(amount: $amount, code: $code, currencyCode: $currencyCode) {
            bonus
            realMoney
          }
        }
      `

export const BONUSES_LIST_QUERY = gql`
  query customerBonuses {
    customerBonuses {
      id
      code
      expiresAt
      validForDays
      rolloverBalance
      rolloverInitialValue
      maxRolloverPerBet
      minOddsPerBet
      status
      amount
    }
  }
`
