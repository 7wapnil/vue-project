import gql from 'graphql-tag'
import { MTS_CONNECTION_STATUS_FIELDS } from './fields'

export const MTS_CONNECTION_STATUS_UPDATED = gql`
  subscription mtsConnectionStatusUpdated {
    mtsConnectionStatusUpdated {
      ${MTS_CONNECTION_STATUS_FIELDS}
    }
  }
`
