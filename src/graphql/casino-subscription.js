import gql from 'graphql-tag'
import { CASINO_CATEGORIES_FIELDS } from './fields'

export const GAME_CATEGORIES_UPDATED = gql`
  subscription categoriesUpdated ($device: String) {
    categoriesUpdated (kind: "casino", device: $device) {
      ${CASINO_CATEGORIES_FIELDS}
    }
  }
`

export const TABLE_CATEGORIES_UPDATED = gql`
  subscription categoriesUpdated ($device: String) {
    categoriesUpdated (kind: "live_casino", device: $device) {
      ${CASINO_CATEGORIES_FIELDS}
    }
  }
`
