import gql from 'graphql-tag'
import { PROVIDER_FIELDS, PAGINATION_FIELDS, PLAY_ITEM_FIELDS } from './fields'

export const PROVIDERS_QUERY = gql`
  query providersQuery {
    providers {
      ${PROVIDER_FIELDS}
    }
  }
`

export const PROVIDER_SUBSCRIPTION = gql`
  subscription providerUpdated {
    providerUpdated {
      ${PROVIDER_FIELDS}
    }
  }
`

export const GAMES_BY_PROVIDER = gql`
  query gamesByProvider($providerSlug: String = null, $page: Int, $perPage: Int) {
    gamesByProvider(providerSlug: $providerSlug, page: $page, perPage: $perPage) {
       collection {
        ${PLAY_ITEM_FIELDS}
       }
      pagination {
        ${PAGINATION_FIELDS}
      }
    }
  }
`
