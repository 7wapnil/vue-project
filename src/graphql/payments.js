import gql from 'graphql-tag'

export const DEPOSIT_METHODS_QUERY = gql`
  query depositMethods {
    depositMethods {
      code
      name
      note
      currencyCode
    }
  }
`

export const WITHDRAW_MUTATION = gql`
  mutation ($input: WithdrawInput!) {
    withdraw(input: $input)
  }
`

export const DEPOSIT_MUTATION = gql`
  mutation ($input: DepositInput!) {
    deposit(input: $input) {
      url
      message
    }
  }
`
