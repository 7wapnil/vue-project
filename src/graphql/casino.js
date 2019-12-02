import gql from 'graphql-tag'
import { CASINO_CATEGORIES_FIELDS,
  PLAY_ITEM_FIELDS,
  OVERVIEW_FIELDS,
  PAGINATION_FIELDS,
  CASINO_RECOMMENDED_GAMES_FIELDS }
  from '@/graphql/fields'

export const GAMES_QUERY = gql`
  query games($context: String = null, $page: Int, $perPage: Int) {
    games(context: $context, page: $page, perPage: $perPage) {
      collection {
        ${PLAY_ITEM_FIELDS}
      }
      pagination {
        ${PAGINATION_FIELDS}
      }
    }
  }
`

export const TABLES_QUERY = gql`
  query tables($context: String = null, $page: Int, $perPage: Int) {
    tables(context: $context, page: $page, perPage: $perPage) {
      collection {
        ${PLAY_ITEM_FIELDS}
      }
      pagination {
        ${PAGINATION_FIELDS}
      }
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

export const RECOMMENDED_GAMES_QUERY = gql`
  query recommendedGames($original_game_id: Int!) {
    recommendedGames(original_game_id: $original_game_id) {
      ${CASINO_RECOMMENDED_GAMES_FIELDS}
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
