import gql from 'graphql-tag'

export const SIGN_IN_MUTATION = gql`
        mutation($input: AuthInput!) {
          signIn(input: $input) {
            user {
              id
              email
              username
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
