import gql from 'graphql-tag'

export const USER_VERIFICATION_QUERY = gql`
  query {
    user {
      id
      verified
    }
  }
`
