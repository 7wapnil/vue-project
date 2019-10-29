import gql from 'graphql-tag'
import { CASINO_CATEGORIES_FIELDS, PLAY_ITEM_FIELDS } from './fields'

export const PLAY_ITEMS_UPDATED = gql`
  subscription playItemsUpdated ($context: String) {
    playItemsUpdated (context: $context) {
      ${PLAY_ITEM_FIELDS}
    }
  }
`

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
