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
      address_country
      address_city
      address_zip_code
      address_street_address
      address_state
    }
  }
`

export const USER_PAYMENT_METHODS_QUERY = gql`
  query {
    user {
      id
      available_withdraw_methods
    }
  }
`

export const ACTIVATE_ACCOUNT = gql`
  mutation ($token: String!) {
    activate (token: $token)
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

export const AUTH_INFO_QUERY = gql`
  query($login: String!) {
    authInfo(login: $login) {
      is_suspicious
    }
  }
`
export const SIGN_IN_MUTATION = gql`
  mutation($input: AuthInput!) {
    signIn(input: $input) {
      user {
        id
        email
        username
        first_name
        last_name
      }
      token
    }
  }
`

export const SIGN_UP_MUTATION = gql`
  mutation($input: RegisterInput!) {
    signUp(input: $input) {
       user {
        id
        email
        username
      }
      token
    }
  }
`
