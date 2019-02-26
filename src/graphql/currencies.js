import gql from 'graphql-tag'

export const CURRENCIES_LIST_QUERY = gql`
    query currencies {
      currencies {
        id
        name
        kind
        primary
        code
      }
    }
`
