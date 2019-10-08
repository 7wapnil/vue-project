import gql from 'graphql-tag'
import { GAME_FIELDS, PAGINATION_FIELDS } from './fields'

export const GAMES_QUERY = gql`
  query games {
    games {
      collection {
        ${GAME_FIELDS}
      }
      pagination {
        ${PAGINATION_FIELDS}
      }
    }
  }
`
