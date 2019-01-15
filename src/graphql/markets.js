import gql from 'graphql-tag'
import { MARKET_FIELDS } from './fields'

export const MARKETS_LIST_QUERY = gql`
  query marketsList ($id: ID = null, $eventId: ID!, $priority: Int, $limit: Int, $category: String) {
    markets (
      id: $id,
      eventId: $eventId,
      priority: $priority,
      limit: $limit,
      category: $category
    ) {
      ${MARKET_FIELDS}
    }
  }
`

export const MARKET_BY_ID_QUERY = gql`
  query market ($eventId: ID!, $id: ID!, $category: String) {
    markets (eventId: $eventId, id: $id, category: $category) {
      ${MARKET_FIELDS}
    }
  }
`
