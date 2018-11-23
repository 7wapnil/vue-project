import gql from 'graphql-tag'

export const APP_FIELDS = `
  status
  statuses
  live_connected
  pre_live_connected
`

export const APP_STATE_QUERY = gql`
  query appState {
    app {
      ${APP_FIELDS}
    }
  }
`
