import gql from 'graphql-tag'
import { PROVIDER_FIELDS } from './fields'

export const PROVIDERS_QUERY = gql`
  query providersQuery {
    providers {
      ${PROVIDER_FIELDS}
    }
  }
`

export const PROVIDERS_SUBSCRIPTION = gql`
  subscription providerUpdated {
    provider_updated {
      ${PROVIDER_FIELDS}
    }
  }
`
