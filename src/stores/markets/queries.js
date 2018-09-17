import gql from 'graphql-tag'

export const MARKET_FIELDS = `
  id
  name
  priority
  status
  odds {
    id
    name
    value
    status
  }
`

export const LOAD_MARKETS_QUERY = gql`
  query marketsList ($eventId: ID!, $priority: Int, $limit: Int) {
    markets (
      eventId: $eventId,
      priority: $priority,
      limit: $limit
    ) {
      ${MARKET_FIELDS}
    }
  }
`

export const LOAD_MARKET_BY_ID = gql`
  query market ($id: ID!) {
    market (id: $id) {
      ${MARKET_FIELDS}
    }
  }
`
