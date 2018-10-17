import gql from 'graphql-tag'
import { MARKET_FIELDS } from './markets'

export const EVENT_FIELDS = `
  id
  name
  description
  title_name
  start_at
  end_at
  markets @include(if: $withMarkets) {
    ${MARKET_FIELDS}
  }
`

export const EVENTS_LIST_QUERY = gql`
  query eventList (
    $limit: Int = null, 
    $titleId: ID = null, 
    $tournamentId: ID = null, 
    $withMarkets: Boolean = false
  ) {
    events (limit: $limit, filter: {
      titleId: $titleId,
      tournamentId: $tournamentId
    }) {
      ${EVENT_FIELDS}
    }
  }
`

export const EVENT_BY_ID_QUERY = gql`
  query event (
    $id: ID!, 
    $titleId: ID = null, 
    $tournamentId: ID = null, 
    $withMarkets: Boolean = false
  ) {
    events (filter: { 
      id: $id,
      titleId: $titleId,
      tournamentId: $tournamentId
    }) {
      ${EVENT_FIELDS}
    }
  }
`
