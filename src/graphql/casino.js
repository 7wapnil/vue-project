import gql from 'graphql-tag'
import { CASINO_CATEGORIES_FIELDS, PLAY_ITEM_FIELDS, OVERVIEW_FIELDS } from './fields'

export const GAMES_QUERY = gql`
  query games($context: String = null) {
    games(context: $context)  {
      ${PLAY_ITEM_FIELDS}
    }
  }
`

export const TABLES_QUERY = gql`
  query tables($context: String = null) {
    tables(context: $context)  {
      ${PLAY_ITEM_FIELDS}
    }
  }
`

export const GAMES_CATEGORIES_QUERY = gql`
  query categories {
    categories(kind: "casino") {
      ${CASINO_CATEGORIES_FIELDS}
    }
  }
`

export const TABLES_CATEGORIES_QUERY = gql`
  query categories {
    categories(kind: "live_casino") {
      ${CASINO_CATEGORIES_FIELDS}
    }
  }
`

export const GAMES_OVERVIEW_QUERY = gql`
  query gamesOverview {
    gamesOverview {
     ${OVERVIEW_FIELDS}
    }
  }
`
