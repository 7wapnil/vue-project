import gql from 'graphql-tag'

export const LOAD_EVENTS_QUERY = gql`
  query eventList ($priority: Int) {
      events {
        id
        name
        description
        title_name
        start_at
        end_at
        markets (priority: $priority) {
          id
          name
          priority
          status
          odds {
            id
            name
            value
            status
          }
        }
      }
    }
`

export const LOAD_EVENT_BY_ID_QUERY = gql`
  query event($id: ID!) {
      event (id: $id) {
        id
        name
        description
        title_name
        start_at
        end_at
        markets {
          id
          name
          priority
          status
          odds {
            id
            name
            value
            status
          }
        }
      }
    }
`
