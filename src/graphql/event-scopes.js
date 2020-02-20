import gql from 'graphql-tag'
import { SCOPE_FIELDS, TITLE_FIELDS } from './fields'

export const SCOPE_QUERY = gql`
  query eventScope($slug: String!, $kind: EventScopesKindEnum) {
    eventScope (slug: $slug, kind: $kind) {
      ${SCOPE_FIELDS}
      title {
        ${TITLE_FIELDS}
      }
    }
  }
`
