import gql from 'graphql-tag'
import { EVENT_FIELDS, MARKET_FIELDS, SCOPE_FIELDS } from './fields'

export const EVENTS_LIST_QUERY = gql`
  query eventList (
    $titleId: ID = null,
    $titleKind: String = null,
    $tournamentId: ID = null,
    $inPlay: Boolean = false,
    $upcoming: Boolean = false,
    $withScopes: Boolean = false,
    $context: String = null,
    $categoryId: ID = null
  ) {
    events (
      context: $context,
      filter: {
        titleId: $titleId,
        titleKind: $titleKind,
        tournamentId: $tournamentId,
        inPlay: $inPlay,
        upcoming: $upcoming,
        categoryId: $categoryId
    }) {
      ${EVENT_FIELDS}
      scopes @include (if: $withScopes) {
        ${SCOPE_FIELDS}
      }
      dashboard_market {
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
    $withScopes: Boolean = true,
    $context: String = null
  ) {
    events (
    context: $context,
    filter: {
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
