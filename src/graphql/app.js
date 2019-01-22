import gql from 'graphql-tag'
import { APP_FIELDS } from './fields'

export const APP_STATE_QUERY = gql`
  query appState {
    app {
      ${APP_FIELDS}
    }
  }
`

export const APP_STATE_SUBSCRIPTION = gql`
  subscription appStateUpdated {
    app_state_updated {
      ${APP_FIELDS}
    }
  }
`
