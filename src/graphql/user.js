import gql from 'graphql-tag'

export const USER_VERIFICATION_QUERY = gql`
  query {
    user {
      id
      verified
    }
  }
`

export const USER_QUERY = gql`
  query {
    user {
      id
      date_of_birth
      email
      first_name
      last_name
      gender
      phone
      username
    }
  }
`
