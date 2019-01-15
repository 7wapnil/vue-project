import gql from 'graphql-tag'
import { TITLE_FIELDS, SCOPE_FIELDS } from './fields'

export const TITLES_QUERY = gql`
  query titlesList(
    $kind: String, 
    $withScopes: Boolean = false,
    $withTournaments: Boolean = false
  ) {
    titles (kind: $kind) {
      ${TITLE_FIELDS}
      event_scopes @include (if: $withScopes) {
        ${SCOPE_FIELDS}
      }
      tournaments @include (if: $withTournaments) {
        ${SCOPE_FIELDS}
      }
    }
  }
`

export const TITLE_BY_ID_QUERY = gql`
  query title(
    $id: ID!,
    $withTournaments: Boolean = false
  ) {
    titles (id: $id) {
      ${TITLE_FIELDS}
      tournaments @include (if: $withTournaments) {
        ${SCOPE_FIELDS}
      }
    }
  }
`
