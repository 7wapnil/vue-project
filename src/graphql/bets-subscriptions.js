import gql from 'graphql-tag'
import { BET_FIELDS } from './fields'

export const BET_UPDATED = gql`
  subscription bet_updated ($id: ID) {
    bet_updated (id: $id) {
      ${BET_FIELDS}
    }
  }
`
