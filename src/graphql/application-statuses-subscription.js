import gql from 'graphql-tag'
import { APPLICATION_STATUS_FIELDS } from './fields'

export const APPLICATION_STATUS_UPDATED = gql`
  subscription applicationStatusUpdated {
    application_status_updated {
      ${APPLICATION_STATUS_FIELDS}
    }
  }
`
