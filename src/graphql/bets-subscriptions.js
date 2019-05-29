import gql from 'graphql-tag'
import { BET_FIELDS } from './fields'

export const BET_UPDATED = gql`
  subscription betUpdated ($id: ID) {
    betUpdated (id: $id) {
      ${BET_FIELDS}
    }
  }
`
