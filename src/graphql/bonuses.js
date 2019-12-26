import gql from 'graphql-tag'
import { BONUSES_LIST_FIELDS } from './fields'

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
      ${BONUSES_LIST_FIELDS}
    }
  }
`
