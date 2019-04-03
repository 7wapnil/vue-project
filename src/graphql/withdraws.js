import gql from 'graphql-tag'

export const WITHDRAW_MUTATION = gql`
  mutation ($input: WithdrawInput!) {
    withdraw(input: $input)
  }
`
