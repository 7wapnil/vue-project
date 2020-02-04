import gql from 'graphql-tag'
import { TITLE_FIELDS, SCOPE_FIELDS } from './fields'

export const TITLES_QUERY = gql`
  query titlesList(
    $kind: String, 
    $context: String, 
    $withScopes: Boolean = false,
    $withTournaments: Boolean = false
  ) {
    titles (kind: $kind, context: $context) {
      ${TITLE_FIELDS}
      eventScopes @include (if: $withScopes) {
        ${SCOPE_FIELDS}
      }
      tournaments @include (if: $withTournaments) {
        ${SCOPE_FIELDS}
      }
    }
  }
`

export const TITLE_QUERY = gql`
  query title($slug: String!) {
    title (slug: $slug) {
      ${TITLE_FIELDS}
    }
  }
`
