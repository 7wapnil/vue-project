import gql from 'graphql-tag'
import { BONUSES_LIST_FIELDS, BONUS_SUBSCTIPTION_LIST_FIELDS } from './fields'

export const BONUS_CALCULATION_MUTATION = gql`
  mutation depositBonus($amount: Float!, $code: String!, $currencyCode: String!) {
    depositBonus(amount: $amount, code: $code, currencyCode: $currencyCode) {
      bonus
      realMoney
    }
  }
`

export const BONUS_CANCELLATION_MUTATION = gql`
  mutation{
    cancelActiveBonus
  }
`

export const BONUSES_LIST_QUERY = gql`
  query bonuses(
    $status: String = null
  ) {
    bonuses(
      status: $status
    ) {
      ${BONUSES_LIST_FIELDS}
    }
  }
`

export const CUSTOMER_BONUSES_UPDATED_SUBSCRIPTION = gql`
  subscription customerBonusUpdated {
    customerBonusUpdated {
      ${BONUS_SUBSCTIPTION_LIST_FIELDS}
    }
  }
`
