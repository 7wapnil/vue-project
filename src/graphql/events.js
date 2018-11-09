import gql from 'graphql-tag'
import { MARKET_FIELDS } from './markets'

export const EVENT_FIELDS = `
  id
  name
  description
  title_name
  start_at
  end_at
  details @include (if: $withDetails) {
    competitors {
      id
      name
    }
  }
  scopes @include (if: $withScopes) {
    id
    name
    kind
  }
  markets @include(if: $withMarkets) {
    ${MARKET_FIELDS}
  }
`

export const EVENTS_LIST_QUERY = gql`
  query eventList (
    $limit: Int = 5,
    $titleId: ID = null,
    $tournamentId: ID = null,
    $inPlay: Boolean = false,
    $upcoming: Boolean = false,
    $withDetails: Boolean = false,
    $withScopes: Boolean = false,
    $withMarkets: Boolean = false
  ) {
    events (limit: $limit, filter: {
      titleId: $titleId,
      tournamentId: $tournamentId,
      inPlay: $inPlay,
      upcoming: $upcoming
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
    $withDetails: Boolean = false,
    $withScopes: Boolean = false,
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
