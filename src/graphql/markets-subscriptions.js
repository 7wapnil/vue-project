import gql from 'graphql-tag'
import { MARKET_FIELDS } from './fields'

export const CATEGORY_MARKET_UPDATED = gql`
  subscription categoryMarketUpdated ($eventId: ID, $category: String) {
    category_market_updated (eventId: $eventId, category: $category) {
      ${MARKET_FIELDS}
    }
  }
`
