import gql from 'graphql-tag'

export const EVENT_FIELDS = `
  id
  name
  description
  title_name
  start_at
  end_at
  markets @include(if: $withMarkets) {
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
`

export const EVENTS_LIST_QUERY = gql`
  query eventList ($limit: Int, $withMarkets: Boolean = false) {
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
