import gql from 'graphql-tag'

export const WITHDRAWAL_METHODS_QUERY = gql`
  query withdrawalMethods {
    withdrawalMethods {
      code
      name
      note
    }
  }
`

export const DEPOSIT_METHODS_QUERY = gql`
  query depositMethods {
    depositMethods {
      code
      name
    }
  }
`
