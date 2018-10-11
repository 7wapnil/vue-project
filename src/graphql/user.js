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
export const CHANGE_USER_PASSWORD = gql`
  mutation ($existing_password: String!,
            $new_password: String!,
            $new_password_confirmation: String!
  ) { changePassword(existing_password: $existing_password,
                     new_password: $new_password,
                     new_password_confirmation: $new_password_confirmation)
    }
`
