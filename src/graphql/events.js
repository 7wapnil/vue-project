import gql from 'graphql-tag'
import { EVENT_FIELDS, MARKET_FIELDS, SCOPE_FIELDS } from './fields'

const EVENT_FIELDS_WITH_SCOPES = `
  ${EVENT_FIELDS}
  scopes @include (if: $withScopes) {
    ${SCOPE_FIELDS}
  }
`

export const EVENTS_LIST_QUERY = gql`
  query eventList (
    $titleId: ID = null,
    $titleKind: String = null,
    $tournamentId: ID = null,
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
        categoryId: $categoryId
    }) {
      ${EVENT_FIELDS_WITH_SCOPES}
      dashboard_market {
        ${MARKET_FIELDS}
      }
    }
  }
`

export const EVENT_BY_ID_QUERY = gql`
  query event ($id: ID!, $withScopes: Boolean = false) {
    event (id: $id) {
      ${EVENT_FIELDS_WITH_SCOPES}
    }
  }
`
