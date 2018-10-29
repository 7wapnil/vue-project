import gql from 'graphql-tag'

export const APP_FIELDS = `
  status
  statuses
`

export const APP_STATE_QUERY = gql`
  query appState {
    app {
      ${APP_FIELDS}
    }
  }
`
