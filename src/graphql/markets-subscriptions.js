import gql from 'graphql-tag'
import { MARKET_FIELDS } from './fields'

export const CATEGORY_MARKET_UPDATED = gql`
  subscription categoryMarketUpdated ($eventId: ID, $category: String) {
    categoryMarketUpdated (eventId: $eventId, category: $category) {
      ${MARKET_FIELDS}
    }
  }
`

export const UPDATE_MARKET_BY_ID = gql`
  subscription marketUpdated ($marketId: ID){
    marketUpdated (id: $marketId) {
      ${MARKET_FIELDS}
    }
  }
`
