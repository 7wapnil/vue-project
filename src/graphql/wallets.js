import gql from 'graphql-tag'
import { WALLET_FIELDS } from './fields'

export const WALLETS_LIST_QUERY = gql`
  query WalletsList {
    wallets {
      ${WALLET_FIELDS}
    }
  }
`

export const WALLET_UPDATED_SUBSCRIPTION = gql`
  subscription walletUpdated {
    walletUpdated {
      ${WALLET_FIELDS}
    }
  }
`
