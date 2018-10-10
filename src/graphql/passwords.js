import gql from 'graphql-tag';

export const CHANGE_PASSWORD = gql`
  mutation ($existing_password: String!,
            $new_password: String!,
            $new_password_confirmation: String!
  ) { changePassword(existing_password: $existing_password,
                     new_password: $new_password,
                     new_password_confirmation: $new_password_confirmation)
    }
`
