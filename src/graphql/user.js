import gql from 'graphql-tag'
import { WALLET_FIELDS, USER_FIELDS } from './fields'

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
      ${USER_FIELDS}
      wallets {
        ${WALLET_FIELDS}
      }
    }
  }
`

export const USER_DEPOSIT_METHODS_QUERY = gql`
  query {
    user {
      id
      availableDepositMethods {
        code
        currency {
          id
          code
          kind
        }
        maxAmount
        minAmount
        name
        note
      }
    }
  }
`

export const USER_WITHDRAWAL_METHODS_QUERY = gql`
  query {
    user {
      id
      availableWithdrawalMethods {
        id
        code
        name
        note
        description
        currencyCode
        details {
          ... on PaymentMethodCreditCard {
            id
            title
            holderName
            lastFourDigits
            tokenId
            maskedAccountNumber
          }
          ... on PaymentMethodBitcoin {
            id
            title
            isEditable
          }
          ... on PaymentMethodSkrill {
            id
            title
            userPaymentOptionId
            name
          }
          ... on PaymentMethodNeteller {
            id
            title
            userPaymentOptionId
            name
          }
          ... on PaymentMethodEcoPayz {
            id
            title
            userPaymentOptionId
            name
          }
          ... on PaymentMethodIdebit {
            id
            title
            userPaymentOptionId
            name
          }
        }
      }
    }
  }
`

export const IMPERSONATE_MUTATION = gql`
  mutation ($token: String!) {
    impersonate (token: $token) {
      user {
        ${USER_FIELDS}
        wallets {
          ${WALLET_FIELDS}
        }
      }
      token
    }
  }
`

export const VERIFY_EMAIL = gql`
  mutation ($token: String!) {
    verifyEmail (token: $token) {
      userId
    }
  }
`

export const CHANGE_USER_PASSWORD = gql`
  mutation ($existingPassword: String!,
            $newPassword: String!,
            $newPasswordConfirmation: String!
  ) { changePassword(existingPassword: $existingPassword,
                     newPassword: $newPassword,
                     newPasswordConfirmation: $newPasswordConfirmation)
    }
`

export const PASSWORD_RESET_REQUEST_MUTATION = gql`
  mutation ($email: String!, $captcha: String!) {
    requestPasswordReset (email: $email, captcha: $captcha)
  }
`

export const PASSWORD_RESET_MUTATION = gql`
  mutation ($token: String!,
            $password: String!,
            $confirmation: String!) {
    resetPassword (
      token: $token,
      password: $password,
      confirmation: $confirmation
    )
  }
`

export const AUTH_INFO_QUERY = gql`
  query($login: String!) {
    authInfo(login: $login) {
      isSuspicious
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
        firstName
        lastName
        addressCountry
        wallets {
          ${WALLET_FIELDS}
        }
        needMoreInfo
      }
      token
    }
  }
`

export const SIGN_UP_MUTATION = gql`
  mutation($input: RegisterInput!, $userData: UserDataInput) {
    signUp(input: $input, userData: $userData) {
       user {
        id
        email
        username
        wallets {
          ${WALLET_FIELDS}
        }
        firstName
        lastName
        phone
        addressCountry
        addressCity
        addressStreetAddress
        needMoreInfo
      }
      token
    }
  }
`
export const TOKEN_VERIFICATION_QUERY = gql`
  query($token: String!) {
    verifyPasswordToken(token: $token) {
      message
      success
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser(input: $input) {
      firstName
      lastName
      phone
      addressState
      addressCity
      addressZipCode
      addressStreetAddress
      needMoreInfo
    }
  }
`

export const COUNTRY_BY_REQUEST_QUERY = gql`
  query {
    countryByRequest {
      country
    }
  }
`
