import gql from 'graphql-tag'
import { EVENT_FIELDS, MARKET_FIELDS, SCOPE_FIELDS } from './fields'

export const EVENTS_LIST_QUERY = gql`
  query eventList (
    $limit: Int = null,
    $offset: Int = 0,
    $titleId: ID = null,
    $titleKind: String = null,
    $tournamentId: ID = null,
    $inPlay: Boolean = false,
    $upcoming: Boolean = false,
    $withScopes: Boolean = false,
    $withMarkets: Boolean = false,
    $marketsLimit: Int = 10
  ) {
    events (
      limit: $limit,
      offset: $offset,
      filter: {
        titleId: $titleId,
        titleKind: $titleKind,
        tournamentId: $tournamentId,
        inPlay: $inPlay,
        upcoming: $upcoming
    }) {
      ${EVENT_FIELDS}
      scopes @include (if: $withScopes) {
        ${SCOPE_FIELDS}
      }
      markets (limit: $marketsLimit) @include(if: $withMarkets) {
        ${MARKET_FIELDS}
      }
    }
  }
`

export const EVENT_BY_ID_QUERY = gql`
  query event (
    $id: ID!,
    $titleId: ID = null,
    $tournamentId: ID = null,
    $withScopes: Boolean = true
  ) {
    events (filter: {
      id: $id,
      titleId: $titleId,
      tournamentId: $tournamentId
    }) {
      ${EVENT_FIELDS}
      scopes @include (if: $withScopes) {
        ${SCOPE_FIELDS}
      }
    }
  }
`
