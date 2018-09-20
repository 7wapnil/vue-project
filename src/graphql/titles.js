import gql from 'graphql-tag'

export const TITLES_QUERY = gql`
  query titlesList($kind: String) {
    titles (kind: $kind) {
      id
      name
    }
  }
`

export const TITLE_BY_ID_QUERY = gql`
  query title($id: ID!) {
    titles (id: $id) {
      id
      name
    }
  }
`
