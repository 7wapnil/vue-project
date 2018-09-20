import gql from 'graphql-tag'

export const TITLES_QUERY = gql`
  query titlesList($kind: String) {
    titles (kind: $kind) {
      id
      name
    }
  }
`
