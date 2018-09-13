import gql from 'graphql-tag'

export const EVENT_FIELDS = `
  id
  name
  description
  title_name
  start_at
  end_at
`

export const LOAD_EVENTS_QUERY = gql`
  query eventList ($limit: Int) {
    events (limit: $limit) {
      ${EVENT_FIELDS}
    }
  }
`

export const LOAD_EVENT_BY_ID_QUERY = gql`
  query event($id: ID!) {
    event (id: $id) {
      ${EVENT_FIELDS}
    }
  }
`
