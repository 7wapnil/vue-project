import gql from 'graphql-tag'
import { MARKET_FIELDS } from '@/stores/markets/queries'

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

export const LOAD_EVENTS_WITH_MARKETS_QUERY = gql`
  query eventListWithMarkets ($limit: Int, $priority: Int) {
    events (limit: $limit) @connection(key: "eventsWithMarkets") {
      ${EVENT_FIELDS}
      markets (priority: $priority) {
        ${MARKET_FIELDS}
      }
    }
  }
`
