import gql from 'graphql-tag'

export const WALLETS_LIST_QUERY = gql`
    query WalletsList {
      wallets {
        id
        amount
        currency {
          code
          id
        }
      }
    }
`
