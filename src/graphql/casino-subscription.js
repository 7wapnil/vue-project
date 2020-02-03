import gql from 'graphql-tag'
import { CASINO_CATEGORIES_FIELDS } from '@/graphql/fields'

export const GAME_CATEGORIES_UPDATED = gql`
  subscription categoriesUpdated {
    categoriesUpdated (kind: "casino") {
      ${CASINO_CATEGORIES_FIELDS}
    }
  }
`

export const TABLE_CATEGORIES_UPDATED = gql`
  subscription categoriesUpdated {
    categoriesUpdated (kind: "live_casino") {
      ${CASINO_CATEGORIES_FIELDS}
    }
  }
`
